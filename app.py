from flask import Flask, request, render_template_string
from galicia_bot import calificar_urls, get_status

app = Flask(__name__)

HTML = """
<!DOCTYPE html>
<html>
<head>
    <title>Bot Galicia N4</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        body { font-family: sans-serif; padding: 20px; background: #f9f9f9; }
        .resultado { margin: 10px 0; padding: 10px; background: white; border-radius: 8px; box-shadow: 0 0 5px rgba(0,0,0,0.1); }
        .ok { color: green; font-weight: bold; }
        .error { color: darkorange; font-weight: bold; }
        input[type=number] { width: 60px; padding: 5px; }
        button { padding: 10px 15px; margin-left: 10px; font-size: 16px; }
    </style>
</head>
<body>
    <h2>🔧 Bot Galicia N4 - Calificador Automático</h2>
    <form method="get" action="/activar">
        <label>¿Cuántas URLs querés calificar?</label>
        <input type="number" name="cantidad" value="1" min="1" max="20">
        <button type="submit">Activar</button>
    </form>

    {% if resultados %}
        <h3>📋 Resultados:</h3>
        {% for r in resultados %}
            <div class="resultado">
                <div><strong>URL:</strong> <a href="{{ r.url }}" target="_blank">{{ r.url }}</a></div>
                <div>
                    {% if "✅" in r.resultado %}
                        <span class="ok">{{ r.resultado }}</span>
                    {% else %}
                        <span class="error">{{ r.resultado }}</span>
                    {% endif %}
                    <span>⏱ {{ r.tiempo }}s</span>
                </div>
            </div>
        {% endfor %}
    {% elif mensaje %}
        <p>{{ mensaje }}</p>
    {% endif %}
</body>
</html>
"""

@app.route("/")
def home():
    return "Bot Galicia N4 Web activo"

@app.route("/activar")
def activar():
    cantidad = int(request.args.get("cantidad", 1))
    resultado = calificar_urls(cantidad)
    return render_template_string(HTML, resultados=resultado.get("calificadas", []), mensaje=resultado.get("mensaje"))

@app.route("/status")
def status():
    return get_status()