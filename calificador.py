
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
    driver = webdriver.Chrome(options=chrome_options)

    for url in seleccionadas:
        try:
            driver.get(url)
            WebDriverWait(driver, 5).until(
                EC.element_to_be_clickable((By.XPATH, "//button[@aria-label='Si']"))
            ).click()
            resultados.append(f"✅ {url}")
            time.sleep(0.2)
        except Exception as e:
            resultados.append(f"⚠️ {url} - {str(e)}")
        with open(ARCHIVO_REGISTRO, "a", encoding="utf-8") as f:
            f.write(url + "\n")

    driver.quit()
    return resultados
