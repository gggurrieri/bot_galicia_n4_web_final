import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from random import sample
import time

URL_BASE = "https://ayudaempresas.galicia.ar/AyudajuridicaSPA/ini/"
N4_SELECTOR = 'a[href*="/n4/"]'

def get_urls_n4():
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--blink-settings=imagesEnabled=false")
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(0.5)
    driver.get(URL_BASE)
    enlaces = driver.find_elements(By.CSS_SELECTOR, N4_SELECTOR)
    urls = list(set(e.get_attribute("href") for e in enlaces if e.get_attribute("href")))
    driver.quit()
    return urls

def calificar_url_individual(driver, url):
    driver.get(url)
    wait = WebDriverWait(driver, 3)
    try:
        wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Sí')]"))).click()
        time.sleep(0.3)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "i.fas.fa-star:nth-child(5)"))).click()
        return "✅ Calificada correctamente"
    except Exception as e:
        return f"⚠️ Error: {str(e)}"

def calificar_urls(cantidad=1):
    urls_disponibles = get_urls_n4()
    seleccionadas = sample(urls_disponibles, min(cantidad, len(urls_disponibles)))
    resultados = []

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--blink-settings=imagesEnabled=false")
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(0.5)

    for url in seleccionadas:
        t0 = time.time()
        resultado = calificar_url_individual(driver, url)
        t1 = time.time()
        resultados.append({"url": url, "resultado": resultado, "tiempo": round(t1 - t0, 2)})

    driver.quit()
    return {"mensaje": f"Se calificaron {len(resultados)} URLs", "calificadas": resultados}

def get_status():
    return {"total_calificadas": 0, "ultimas": []}