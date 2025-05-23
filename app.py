
from flask import Flask, render_template, request, Response
from calificador import calificar_urls, get_status
import os
import time

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/status")
def status():
    return get_status(), 200, {'Content-Type': 'text/plain; charset=utf-8'}

@app.route("/api/calificar")
def api_calificar():
    cantidad = int(request.args.get("cantidad", 1))

    def generate():
        resultados = calificar_urls(cantidad)
        for r in resultados:
            yield r + "\n"
            time.sleep(0.05)

    return Response(generate(), mimetype='text/plain')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    debug_mode = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug_mode)
