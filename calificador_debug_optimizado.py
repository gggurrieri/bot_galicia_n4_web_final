
import random
import os
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

ARCHIVO_URLS = "urls.txt"
ARCHIVO_REGISTRO = "calificadas.txt"

def get_status():
    with open(ARCHIVO_URLS, "r", encoding="utf-8") as f:
        total = len([l for l in f if l.strip()])
    if os.path.exists(ARCHIVO_REGISTRO):
        with open(ARCHIVO_REGISTRO, "r", encoding="utf-8") as f:
            hechos = len([l for l in f if l.strip()])
    else:
        hechos = 0
    return f"{hechos} de {total} URLs ya fueron calificadas."

def calificar_urls(cantidad):
    with open(ARCHIVO_URLS, "r", encoding="utf-8") as f:
        todas = [line.strip() for line in f if line.strip()]
    hechas = set()
    if os.path.exists(ARCHIVO_REGISTRO):
        with open(ARCHIVO_REGISTRO, "r", encoding="utf-8") as f:
            hechas = set(line.strip() for line in f if line.strip())
    pendientes = [u for u in todas if u not in hechas]
    if not pendientes:
        with open(ARCHIVO_REGISTRO, "w", encoding="utf-8") as f:
            pass
        pendientes = todas
        hechas = set()

    seleccionadas = random.sample(pendientes, min(cantidad, len(pendientes)))
    resultados = []

    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920x1080")

    # Desactivar imágenes, hojas de estilo y fuentes para acelerar la carga
    prefs = {
        "profile.managed_default_content_settings.images": 2,
        "profile.managed_default_content_settings.stylesheets": 2,
        "profile.managed_default_content_settings.fonts": 2,
    }
    chrome_options.add_experimental_option("prefs", prefs)

    driver = webdriver.Chrome(options=chrome_options)

    tiempo_inicio_total = time.time()

    for url in seleccionadas:
        inicio_url = time.time()
        try:
            driver.get(url)
            WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//button[@aria-label='Si']"))
            ).click()
            resultados.append(f"✅ {url}")
        except Exception as e:
            resultados.append(f"⚠️ {url} - {str(e)}")
        with open(ARCHIVO_REGISTRO, "a", encoding="utf-8") as f:
            f.write(url + "\n")
        duracion_url = round(time.time() - inicio_url, 2)
        print(f"⏱️ {url} → {duracion_url}s")

    driver.quit()
    tiempo_total = round(time.time() - tiempo_inicio_total, 2)
    print(f"⏲️ Tiempo total para {len(seleccionadas)} URLs: {tiempo_total}s")

    return resultados
