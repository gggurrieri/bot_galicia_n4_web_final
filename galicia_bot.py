import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

URLS_PATH = "urls_n4.txt"

def leer_urls():
    with open(URLS_PATH, "r") as f:
        urls = [line.strip() for line in f if line.strip()]
    print(f"📄 Se leyeron {len(urls)} URLs desde {URLS_PATH}")
    return urls

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
    urls = leer_urls()
    seleccionadas = urls[:cantidad]

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

    driver.quit()
    return {"mensaje": f"Se procesaron {len(resultados)} URLs", "calificadas": resultados}

def get_status():
    return {"total_calificadas": 0, "ultimas": []}