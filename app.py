from flask import Flask, request, jsonify, render_template_string, redirect
from galicia_bot import calificar_urls, get_status
import os

app = Flask(__name__)

HTML = """<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Bot calificador N4</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f7f7f7;
      margin: 0;
      padding: 20px;
      color: #333;
    }
    h1 {
      text-align: center;
      color: #004481;
      margin-top: 10px;
    }
    .card {
      background: white;
      max-width: 500px;
      margin: 30px auto;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    }
    label {
      display: block;
      margin-bottom: 10px;
      font-weight: 600;
    }
    input[type=number] {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid #ccc;
      margin-bottom: 20px;
    }
    button {
      background: #f7931e;
      color: white;
      padding: 12px;
      width: 100%;
      border: none;
      font-size: 16px;
      border-radius: 8px;
      cursor: pointer;
    }
    button:hover {
      background: #e37a0c;
    }
    .estado {
      text-align: center;
      margin-top: 10px;
      font-weight: 600;
    }
    .result {
      margin-top: 20px;
      padding: 10px;
      background: #fff;
      border-left: 4px solid #4caf50;
      border-radius: 6px;
      font-family: monospace;
      word-break: break-word;
    }
    .reset {
      text-align: center;
      margin-top: 30px;
    }
    .reset button {
      background: #999;
    }
    .reset button:hover {
      background: #666;
    }
  </style>
</head>
<body>
  <h1>🧠 Bot calificador de<br>URLs N4</h1>
  <div class="card">
    <label for="cantidad">¿Cuántas URLs querés calificar?</label>
    <input type="number" id="cantidad" min="1" max="50" value="5">
    <button onclick="activar()">▶ Ejecutar</button>
    <div class="estado" id="estado"></div>
    <div id="resultados"></div>
  </div>

  <div class="reset">
    <form method="POST" action="/reset">
      <button type="submit">🗑️ Resetear historial</button>
    </form>
  </div>

  <script>
    async function activar() {
      const cantidad = document.getElementById("cantidad").value;
      const estado = document.getElementById("estado");
      const resultados = document.getElementById("resultados");

      estado.innerText = "⏳ Procesando...";
      resultados.innerHTML = "";

      try {
        const r = await fetch(`/activar_json?cantidad=${cantidad}`);
        const data = await r.json();
        const total = await fetch("/status").then(res => res.json());

        estado.innerHTML = `<b>Estado:</b> ${total.total_calificadas} de ${total.total_calificadas + data.calificadas.length} URLs ya fueron calificadas.`;

        data.calificadas.forEach(r => {
          const div = document.createElement("div");
          div.className = "result";
          div.innerHTML = `✅ <a href="${r.url}" target="_blank">${r.url}</a>`;
          resultados.appendChild(div);
        });

        if (!data.calificadas.length) {
          resultados.innerHTML = "<p class='result'>✅ No hay URLs nuevas para calificar</p>";
        }
      } catch (err) {
        estado.innerText = "❌ Error al procesar";
      }
    }
  </script>
</body>
</html>"""

@app.route("/")
def home():
    return render_template_string(HTML)

@app.route("/activar_json")
def activar_json():
    cantidad = int(request.args.get("cantidad", 1))
    resultado = calificar_urls(cantidad)
    return jsonify(resultado)

@app.route("/reset", methods=["POST"])
def reset():
    try:
        os.remove("historial_urls.json")
    except:
        pass
    return redirect("/")

@app.route("/status")
def status():
    return jsonify(get_status())

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
