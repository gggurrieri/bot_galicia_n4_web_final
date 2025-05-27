import json
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from random import sample

URLS_PATH = "urls_n4.txt"
HISTORIAL_PATH = "historial_urls.json"

def leer_urls():
    with open(URLS_PATH, "r") as f:
        return [line.strip() for line in f if line.strip()]

def cargar_historial():
    try:
        with open(HISTORIAL_PATH, "r") as f:
            return json.load(f)
    except:
        return []

def guardar_historial(historial):
    with open(HISTORIAL_PATH, "w") as f:
        json.dump(historial, f, indent=2)

def calificar_url(driver, url):
    print("➡️ Visitando:", url)
    try:
        driver.get(url)
        WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Sí')]"))
        ).click()
        print("✅ Clic en 'Sí' exitoso")
        return {"url": url, "resultado": "✅ Calificada"}
    except Exception as e:
        print("⚠️ Error al calificar:", url, "|", str(e))
        return {"url": url, "resultado": f"⚠️ {str(e)}"}

def calificar_urls(cantidad=1):
    todas = leer_urls()
    historial = cargar_historial()
    restantes = [u for u in todas if u not in historial]

    if not restantes:
        print("🎉 Todas las URLs ya fueron calificadas.")
        return {"mensaje": "Todas las URLs ya fueron calificadas.", "calificadas": []}

    seleccionadas = sample(restantes, min(cantidad, len(restantes)))

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--blink-settings=imagesEnabled=false")
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(1)

    resultados = []
    for url in seleccionadas:
        resultado = calificar_url(driver, url)
        resultados.append(resultado)
        historial.append(url)

    driver.quit()
    guardar_historial(historial)
    return {"mensaje": f"Se calificaron {len(resultados)} URLs", "calificadas": resultados}

def get_status():
    historial = cargar_historial()
    return {"total_calificadas": len(historial), "ultimas": historial[-5:]}