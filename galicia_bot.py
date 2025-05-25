from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from random import sample
import time
import json

URL_BASE = "https://ayudaempresas.galicia.ar/AyudajuridicaSPA/ini/"
N4_SELECTOR = 'a[href*="/n4/"]'
HISTORIAL_PATH = "historial_urls.json"

def get_urls_n4():
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--log-level=3")
    options.add_argument("--blink-settings=imagesEnabled=false")

    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(0.2)

    driver.get(URL_BASE)
    enlaces = driver.find_elements(By.CSS_SELECTOR, N4_SELECTOR)
    urls = list(set(e.get_attribute("href") for e in enlaces if e.get_attribute("href")))
    driver.quit()
    return urls

def cargar_historial():
    try:
        with open(HISTORIAL_PATH, "r") as f:
            return json.load(f)
    except:
        return []

def guardar_historial(historial):
    with open(HISTORIAL_PATH, "w") as f:
        json.dump(historial, f, indent=2)

def calificar_url_individual(driver, url):
    driver.get(url)
    wait = WebDriverWait(driver, 3)
    try:
        wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Sí')]"))).click()
        time.sleep(0.2)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "i.fas.fa-star:nth-child(5)"))).click()
        return "✅ Calificada correctamente"
    except Exception as e:
        return f"⚠️ Error: {e}"

def calificar_urls(cantidad=1):
    urls_disponibles = get_urls_n4()
    historial = cargar_historial()
    urls_nuevas = [u for u in urls_disponibles if u not in historial]

    if not urls_nuevas:
        return {"mensaje": "No hay URLs nuevas para calificar", "calificadas": []}

    seleccionadas = sample(urls_nuevas, min(cantidad, len(urls_nuevas)))
    resultados = []

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--log-level=3")
    options.add_argument("--blink-settings=imagesEnabled=false")

    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(0.2)

    for url in seleccionadas:
        t0 = time.time()
        try:
            resultado = calificar_url_individual(driver, url)
        except Exception as e:
            resultado = f"⚠️ Fallo inesperado: {e}"
        t1 = time.time()
        resultados.append({"url": url, "resultado": resultado, "tiempo": round(t1 - t0, 2)})
        historial.append(url)

    driver.quit()
    guardar_historial(historial)
    return {"mensaje": f"Se calificaron {len(resultados)} URLs", "calificadas": resultados}

def get_status():
    historial = cargar_historial()
    return {"total_calificadas": len(historial), "ultimas": historial[-5:]}