from flask import Flask, request, jsonify, render_template_string
from galicia_bot import calificar_urls, get_status
import os

app = Flask(__name__)

HTML = """..."""  # El contenido real fue generado previamente

@app.route("/")
def home():
    return render_template_string(HTML)

@app.route("/activar_json")
def activar_json():
    cantidad = int(request.args.get("cantidad", 1))
    resultado = calificar_urls(cantidad)
    return jsonify(resultado)

@app.route("/status")
def status():
    return get_status()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)