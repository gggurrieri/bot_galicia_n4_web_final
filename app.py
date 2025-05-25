from flask import Flask, request, jsonify, render_template_string
from galicia_bot import calificar_urls, get_status
import os

app = Flask(__name__)

HTML = """
<!DOCTYPE html>
<html>
<head>
    <title>Bot Galicia N4 - Calificador Automático</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        body { font-family: "Segoe UI", sans-serif; padding: 30px; background: #f5f6fa; color: #333; }
        h2 { margin-bottom: 20px; }
        .form-section { margin-bottom: 20px; }
        .progress-container { width: 100%; background: #eee; border-radius: 20px; overflow: hidden; height: 25px; margin: 20px 0; }
        .progress-bar { height: 100%; background-color: #4caf50; width: 0%; text-align: center; color: white; line-height: 25px; transition: width 0.4s ease; }
        .resultado { margin-top: 10px; padding: 12px; background: white; border-left: 5px solid #ccc; border-radius: 5px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .ok { border-left-color: green; }
        .error { border-left-color: darkorange; }
        a { text-decoration: none; color: #0066cc; }
        button { padding: 8px 16px; font-size: 16px; }
        input[type=number] { padding: 5px; font-size: 16px; width: 60px; }
    </style>
</head>
<body>
    <h2>🔧 Bot Galicia N4 - Calificador Automático</h2>

    <div class="form-section">
        <label>¿Cuántas URLs querés calificar?</label>
        <input type="number" id="cantidad" value="1" min="1" max="20">
        <button onclick="activar()">Activar</button>
    </div>

    <div class="progress-container">
        <div id="progress-bar" class="progress-bar">0%</div>
    </div>

    <div id="resultados"></div>

    <script>
        async function activar() {
            const cantidad = parseInt(document.getElementById("cantidad").value);
            const progressBar = document.getElementById("progress-bar");
            const resultadosDiv = document.getElementById("resultados");

            progressBar.style.width = "0%";
            progressBar.innerText = "0%";
            resultadosDiv.innerHTML = "<p>⏳ Calificando " + cantidad + " URLs...</p>";

            // Simular avance de barra
            let progreso = 0;
            const avanceSimulado = 100 / cantidad;

            const intervalo = setInterval(() => {
                if (progreso < 100) {
                    progreso += avanceSimulado;
                    progressBar.style.width = Math.min(progreso, 100) + "%";
                    progressBar.innerText = Math.round(Math.min(progreso, 100)) + "%";
                }
            }, 500);

            try {
                const response = await fetch(`/activar_json?cantidad=${cantidad}`);
                const data = await response.json();
                clearInterval(intervalo);
                progressBar.style.width = "100%";
                progressBar.innerText = "100%";

                const resultados = data.calificadas || [];
                let html = "<h3>📋 Resultados:</h3>";

                resultados.forEach(r => {
                    html += `
                        <div class="resultado ${r.resultado.includes('✅') ? 'ok' : 'error'}">
                            <div><strong>URL:</strong> <a href="${r.url}" target="_blank">${r.url}</a></div>
                            <div>${r.resultado} ⏱ ${r.tiempo}s</div>
                        </div>`;
                });

                resultadosDiv.innerHTML = html;
            } catch (err) {
                clearInterval(intervalo);
                progressBar.style.width = "100%";
                progressBar.innerText = "100%";
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

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)