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
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
    }
    .container {
      max-width: 480px;
      width: 100%;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
      color: #004481;
      margin-top: 10px;
      font-size: 1.8rem;
    }
    .card {
      background: white;
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
      margin-top: 15px;
      font-weight: 600;
      animation: fadein 0.5s ease-in-out;
    }
    .result {
      margin-top: 15px;
      padding: 10px;
      background: #fff;
      border-left: 4px solid #4caf50;
      border-radius: 6px;
      font-family: monospace;
      word-break: break-word;
    }
    .reset {
      margin-top: 20px;
      text-align: center;
    }
    .reset button {
      background: #bbb;
      padding: 8px 18px;
      font-size: 14px;
      width: auto;
    }
    .reset button:hover {
      background: #888;
    }
    @keyframes fadein {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🧠 Bot calificador de<br>URLs N4</h1>
    <div class="card">
      <label for="cantidad">¿Cuántas URLs querés calificar?</label>
      <input type="number" id="cantidad" min="1" max="50" value="5">
      <button id="ejecutarBtn" onclick="activar()">▶ Ejecutar</button>
      <div class="estado" id="estado"></div>
      <div id="resultados"></div>
    </div>
    <div class="reset">
      <form method="POST" action="/reset">
        <button type="submit">🗑 Resetear historial</button>
      </form>
    </div>
  </div>

  <script>
    async function activar() {
      const cantidad = document.getElementById("cantidad").value;
      const estado = document.getElementById("estado");
      const resultados = document.getElementById("resultados");
      const btn = document.getElementById("ejecutarBtn");

      estado.innerText = "⏳ Procesando...";
      resultados.innerHTML = "";
      btn.disabled = true;
      btn.innerText = "Procesando...";

      try {
        const r = await fetch(`/activar_json?cantidad=${cantidad}`);
        if (!r.ok) throw new Error("Respuesta no válida");
        const data = await r.json();
        const total = await fetch("/status").then(res => res.json());

        const hora = new Date().toLocaleTimeString();
        estado.innerHTML = `<b>Estado:</b> ${total.total_calificadas} de ${total.total_calificadas + data.calificadas.length} URLs ya fueron calificadas.<br><small>🕒 Ejecutado a las ${hora}</small>`;

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
        console.error("Error al procesar:", err);
        estado.innerHTML = "<span style='color:red'>❌ Error al procesar</span>";
      } finally {
        btn.disabled = false;
        btn.innerText = "▶ Ejecutar";
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
    try:
        cantidad = int(request.args.get("cantidad", 1))
        resultado = calificar_urls(cantidad)
        return jsonify(resultado)
    except Exception as e:
        print("❌ Error en activar_json:", str(e))
        return jsonify({"error": str(e), "calificadas": []}), 500

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
