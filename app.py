
from flask import Flask, render_template, request
from calificador import calificar_urls, get_status

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

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)


