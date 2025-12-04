import os
from flask import Flask, request, jsonify, render_template, redirect
from galicia_bot import calificar_urls, get_status, reset_status

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/activar_json")
def activar_json():
    """
    Endpoint que dispara la calificación de N URLs.
    Se ejecuta en un hilo del servidor, mientras que /status
    se puede consultar desde otro hilo para ver el progreso.
    """
    cantidad = request.args.get("cantidad", default=1, type=int)

    if cantidad < 1:
        cantidad = 1

    try:
        resultado = calificar_urls(cantidad)
        return jsonify(resultado)
    except Exception as e:
        print("❌ Error en /activar_json:", repr(e))
        return jsonify({"error": str(e)}), 500


@app.route("/status")
def status():
    """
    Devuelve el estado global de la ejecución:
    - total: total de URLs a procesar
    - done: cantidad ya procesadas
    - running: si sigue en curso o ya terminó
    - items: lista con {"url", "ok", "msg"}
    """
    return jsonify(get_status())


@app.route("/reset", methods=["POST"])
def reset():
    """
    Resetea el historial (borra historial_urls.json) y
    limpia el estado en memoria.
    """
    try:
        if os.path.exists("historial_urls.json"):
            os.remove("historial_urls.json")
            print("🧹 historial_urls.json eliminado")
    except Exception as e:
        print("⚠️ No se pudo borrar historial:", repr(e))

    reset_status(total=0)
    return redirect("/")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    # threaded=True permite que /status responda mientras /activar_json
    # sigue corriendo la calificación de URLs.
    app.run(host="0.0.0.0", port=port, debug=True, threaded=True)
