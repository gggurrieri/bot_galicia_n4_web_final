from flask import Flask, request, jsonify, render_template_string
from galicia_bot import calificar_urls, get_status

app = Flask(__name__)

HTML = """
<!DOCTYPE html>
<html>
<head>
    <title>Bot Galicia N4 - Barra de progreso</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        body { font-family: sans-serif; padding: 20px; background: #f9f9f9; }
        .progress-container { margin: 20px 0; background: #eee; border-radius: 10px; height: 25px; width: 100%; }
        .progress-bar { height: 100%; background: #4caf50; width: 0%; border-radius: 10px; text-align: center; color: white; line-height: 25px; transition: width 0.5s; }
        .resultado { margin-top: 15px; padding: 10px; background: white; border-radius: 8px; box-shadow: 0 0 5px rgba(0,0,0,0.1); }
        .ok { color: green; font-weight: bold; }
        .error { color: darkorange; font-weight: bold; }
    </style>
</head>
<body>
    <h2>🔧 Bot Galicia N4 - Calificador Automático</h2>

    <label>¿Cuántas URLs querés calificar?</label>
    <input type="number" id="cantidad" value="1" min="1" max="20">
    <button onclick="activar()">Activar</button>

    <div class="progress-container">
        <div id="progress-bar" class="progress-bar">0%</div>
    </div>

    <div id="resultados"></div>

    <script>
        async function activar() {
            const cantidad = document.getElementById("cantidad").value;
            const progressBar = document.getElementById("progress-bar");
            const resultadosDiv = document.getElementById("resultados");
            progressBar.style.width = "0%";
            progressBar.innerText = "0%";
            resultadosDiv.innerHTML = "<p>⏳ Calificando, por favor esperá...</p>";

            try {
                const response = await fetch(`/activar_json?cantidad=${cantidad}`);
                const data = await response.json();
                const resultados = data.calificadas || [];
                let html = "";

                resultados.forEach((r, i) => {
                    setTimeout(() => {
                        const porcentaje = Math.round(((i + 1) / resultados.length) * 100);
                        progressBar.style.width = porcentaje + "%";
                        progressBar.innerText = porcentaje + "%";

                        html += `
                            <div class="resultado">
                                <div><strong>URL:</strong> <a href="${r.url}" target="_blank">${r.url}</a></div>
                                <div>
                                    ${r.resultado.includes("✅")
                                        ? '<span class="ok">' + r.resultado + '</span>'
                                        : '<span class="error">' + r.resultado + '</span>'}
                                    <span>⏱ ${r.tiempo}s</span>
                                </div>
                            </div>`;
                        resultadosDiv.innerHTML = html;
                    }, i * 500);
                });
            } catch (err) {
                resultadosDiv.innerHTML = "<p style='color: red;'>❌ Error al calificar: " + err + "</p>";
            }
        }
    </script>
</body>
</html>
"""

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