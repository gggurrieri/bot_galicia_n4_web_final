
from flask import Flask, render_template, request
from calificador import calificar_urls, get_status
import os

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    resumen = ""
    if request.method == "POST":
        cantidad = int(request.form.get("cantidad", 1))
        resultado = calificar_urls(cantidad)
        resumen = "\n".join(resultado)
    status = get_status()
    return render_template("index.html", resumen=resumen, status=status)

@app.route("/status", methods=["GET"])
def status_text():
    return get_status(), 200, {'Content-Type': 'text/plain; charset=utf-8'}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    debug_mode = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug_mode)
