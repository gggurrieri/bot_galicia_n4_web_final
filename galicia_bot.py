import json
import threading
from datetime import datetime

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager


# -------------------------
# Estado global de la tarea
# -------------------------

STATUS_LOCK = threading.Lock()
STATUS = {
    "total": 0,
    "done": 0,
    "running": False,
    "items": []  # lista de {"url": ..., "ok": bool, "msg": str}
}


def reset_status(total: int = 0):
    """Reinicia el estado global."""
    with STATUS_LOCK:
        STATUS["total"] = total
        STATUS["done"] = 0
        STATUS["running"] = total > 0
        STATUS["items"] = []


def update_status(url: str, ok: bool, msg: str):
    """Actualiza el estado cuando se termina de procesar una URL."""
    with STATUS_LOCK:
        STATUS["done"] += 1
        STATUS["items"].append(
            {
                "url": url,
                "ok": ok,
                "msg": msg,
            }
        )
        if STATUS["done"] >= STATUS["total"]:
            STATUS["running"] = False


def get_status():
    """Devuelve una copia segura del estado actual (lo usa Flask en /status)."""
    with STATUS_LOCK:
        return {
            "total": STATUS["total"],
            "done": STATUS["done"],
            "running": STATUS["running"],
            "items": list(STATUS["items"]),
        }


# -------------------------
# Manejo de archivos / URLs
# -------------------------

HISTORIAL_FILE = "historial_urls.json"
URLS_FILE = "urls_n4.txt"  # listado de URLs N4 a calificar


def cargar_historial():
    """Carga historial_urls.json si existe, sino estructura vacía."""
    try:
        with open(HISTORIAL_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            if "calificadas" not in data:
                data["calificadas"] = []
            return data
    except Exception:
        return {"calificadas": []}


def guardar_historial(historial):
    """Guarda el historial completo."""
    try:
        with open(HISTORIAL_FILE, "w", encoding="utf-8") as f:
            json.dump(historial, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print("⚠️ Error guardando historial:", repr(e))


def obtener_urls_calificadas_set(historial):
    """Devuelve un set de URLs ya calificadas para evitar repeticiones."""
    urls = set()
    for item in historial.get("calificadas", []):
        url = item.get("url")
        if url:
            urls.add(url)
    return urls


def cargar_lista_urls():
    """Carga todas las URLs desde urls_n4.txt."""
    urls = []
    try:
        with open(URLS_FILE, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    urls.append(line)
    except Exception as e:
        print("⚠️ Error leyendo urls_n4.txt:", repr(e))
    return urls


def obtener_urls_para_calificar(cantidad: int):
    """
    Devuelve hasta 'cantidad' URLs que todavía no se hayan calificado
    según historial_urls.json.
    """
    historial = cargar_historial()
    ya_calificadas = obtener_urls_calificadas_set(historial)
    todas = cargar_lista_urls()

    pendientes = [u for u in todas if u not in ya_calificadas]
    return pendientes[:cantidad]


# -------------------------
# Selenium / ChromeDriver
# -------------------------

def crear_driver():
    """Crea una instancia de Chrome en modo headless optimizado."""
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1280,800")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.set_page_load_timeout(25)
    return driver


def calificar_una_url(driver, url: str, timeout: int = 10):
    """
    Lógica de calificación de UNA URL.
    Acá tiene que:
    - abrir la URL
    - clickear "Sí" (¿te fue útil?)
    - marcar 5 estrellas
    - lo que ya tenías implementado

    Devuelve (ok: bool, msg: str)
    """
    try:
        driver.get(url)
        wait = WebDriverWait(driver, timeout)

        # -----------------------------
        # 🔴 ACÁ PEGÁ TU LÓGICA ACTUAL 🔴
        # (Reemplazá estos selectores por los que ya usás en tu bot)
        # -----------------------------
        # EJEMPLO ORIENTATIVO, ajustá los XPATH/CSS a tu HTML real:

        # 1) Botón "Sí" / "Si" / "Sí, me fue útil"
        try:
            btn_si = wait.until(
                EC.element_to_be_clickable(
                    (By.XPATH, "//button[contains(translate(., 'Íí', 'Ii'), 'si')]")
                )
            )
            btn_si.click()
        except Exception:
            # Si no hay botón "Sí", no tiramos error fuerte
            pass

        # 2) Estrellas de rating (ejemplo: 5 estrellas dentro de algún contenedor)
        try:
            estrellas = wait.until(
                EC.presence_of_all_elements_located(
                    (By.CSS_SELECTOR, ".rating-star, .star, .estrellas .estrella")
                )
            )
            if len(estrellas) >= 5:
                estrellas[4].click()  # índice 4 = 5ta estrella
        except Exception:
            pass

        # Si llegaste acá sin excepciones "graves", consideramos OK
        return True, "Calificado OK"

    except Exception as e:
        return False, f"Error al calificar: {e}"


# -------------------------
# Orquestador principal
# -------------------------

def calificar_urls(cantidad: int):
    """
    Función principal que usa Flask:
    - elige URLs no calificadas aún
    - inicia estado global
    - crea 1 driver
    - recorre las URLs actualizando STATUS y el historial
    """
    urls = obtener_urls_para_calificar(cantidad)

    # Resetear estado global
    reset_status(total=len(urls))

    if not urls:
        msg_vacio = "No hay URLs pendientes para calificar."
        print("ℹ️", msg_vacio)
        return {
            "total": 0,
            "calificadas": [],
            "mensaje": msg_vacio,
        }

    historial = cargar_historial()
    resultados = []

    driver = None
    try:
        driver = crear_driver()
        print(f"🚀 Iniciando calificación de {len(urls)} URLs...")

        for url in urls:
            try:
                ok, msg = calificar_una_url(driver, url)
            except Exception as e:
                ok = False
                msg = f"Excepción no controlada: {e}"

            registro = {
                "url": url,
                "ok": ok,
                "msg": msg,
                "timestamp": datetime.utcnow().isoformat() + "Z",
            }
            resultados.append(registro)

            # Actualizar historial en memoria
            historial.setdefault("calificadas", []).append(registro)

            # Actualizar estado global para /status
            update_status(url, ok, msg)

        print("✅ Proceso de calificación finalizado.")

    finally:
        if driver:
            driver.quit()
        # Guardar historial al final (1 sola escritura)
        guardar_historial(historial)

    return {
        "total": len(urls),
        "calificadas": resultados,
    }


# Permite probar rápido por consola:
if __name__ == "__main__":
    # Ejemplo: calificar 3 URLs
    resultado = calificar_urls(3)
    print(json.dumps(resultado, ensure_ascii=False, indent=2))
