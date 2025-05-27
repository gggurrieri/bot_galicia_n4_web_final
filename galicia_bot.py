import json
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from random import sample

URL_N4 = "https://ayudaempresas.galicia.ar/AyudajuridicaSPA/ini/n4/"
HISTORIAL_PATH = "historial_urls.json"

def get_urls_n4():
    print("🚀 Entrando a get_urls_n4()")
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--blink-settings=imagesEnabled=false")

    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(0.5)

    print("🌐 Abriendo:", URL_N4)
    driver.get(URL_N4)

    all_links = driver.find_elements(By.TAG_NAME, "a")
    urls = []
    for link in all_links:
        href = link.get_attribute("href")
        if href and "/AyudajuridicaSPA/ini/n4/" in href:
            urls.append(href)

    driver.quit()
    print(f"🔗 URLs N4 encontradas: {len(urls)}")
    return list(set(urls))

def calificar_url_individual(driver, url):
    print("➡️ Calificando URL:", url)
    driver.get(url)
    wait = WebDriverWait(driver, 3)
    try:
        wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Sí')]"))).click()
        time.sleep(0.3)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "i.fas.fa-star:nth-child(5)"))).click()
        print("✅ Calificada correctamente")
        return "✅ Calificada correctamente"
    except Exception as e:
        print("⚠️ Error al calificar:", str(e))
        return f"⚠️ Error: {str(e)}"

def calificar_urls(cantidad=1):
    print("🧪 Ejecutando calificar_urls() con cantidad =", cantidad)
    urls_disponibles = get_urls_n4()

    if not urls_disponibles:
        print("❌ No se encontraron URLs N4")
        return {"mensaje": "No se encontraron URLs N4", "calificadas": []}

    seleccionadas = sample(urls_disponibles, min(cantidad, len(urls_disponibles)))
    resultados = []

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--blink-settings=imagesEnabled=false")
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(0.5)

    for url in seleccionadas:
        t0 = time.time()
        resultado = calificar_url_individual(driver, url)
        t1 = time.time()
        resultados.append({
            "url": url,
            "resultado": resultado,
            "tiempo": round(t1 - t0, 2)
        })

    driver.quit()
    return {"mensaje": f"Se calificaron {len(resultados)} URLs", "calificadas": resultados}

def get_status():
    return {"total_calificadas": 0, "ultimas": []}