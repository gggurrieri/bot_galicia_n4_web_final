from flask import Flask, request, jsonify, render_template_string, redirect
from galicia_bot import calificar_urls, get_status
import os

app = Flask(__name__)

HTML = """<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Bot Galicia N4 - Calificador Automático</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Open Sans', sans-serif; background: #fff; margin: 0; color: #4a4a4a; padding: 30px 20px; }
    header { background: #f7931e; color: white; padding: 15px 30px; text-align: center; font-weight: 600; font-size: 1.2rem; }
    main { max-width: 700px; margin: 40px auto; background: #fff; padding: 25px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    h2 { font-size: 1.4rem; margin-bottom: 20px; }
    label { font-weight: 600; display: block; margin-bottom: 8px; }
    input[type=number] { padding: 10px; width: 80px; font-size: 16px; }
    button { background: #f7931e; color: white; padding: 10px 20px; border: none; font-size: 16px; margin-left: 10px;
             border-radius: 20px; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    button:hover { background: #e37a0c; }
    .form-group { margin-bottom: 20px; }
    .result { margin-top: 20px; padding: 15px; background: #f6f6f6; border-left: 4px solid #f7931e; border-radius: 5px; }
    .reset { margin-top: 30px; text-align: center; }
    .reset button { background: #999; }
    .reset button:hover { background: #666; }
    @media (max-width: 600px) {
      main { padding: 20px; }
      button, input[type=number] { width: 100%; margin: 5px 0; }
    }
  </style>
</head>
<body>
  <header>🛠️ Bot Galicia N4 - Calificador Automático</header>
  <main>
    <h2>Herramienta de calificación de artículos N4</h2>
    <div class="form-group">
      <label>¿Cuántas URLs querés calificar?</label>
      <input type="number" id="cantidad" value="1" min="1" max="20">
      <button onclick="activar()">Activar</button>
    </div>
    <div id="resultado" class="result"></div>
    <div class="reset">
      <form method="POST" action="/reset">
        <button type="submit">🗑️ Resetear historial</button>
      </form>
    </div>
  </main>
  <script>
    async function activar() {
      const cantidad = document.getElementById("cantidad").value;
      const resDiv = document.getElementById("resultado");
      resDiv.innerHTML = "⏳ Procesando...";
      try {
        const r = await fetch(`/activar_json?cantidad=${cantidad}`);
        const data = await r.json();
        const items = data.calificadas.map(c => 
          `<p><strong>URL:</strong> <a href="${c.url}" target="_blank">${c.url}</a><br>
           ${c.resultado} ⏱ ${c.tiempo}s</p>`).join("");
        resDiv.innerHTML = data.calificadas.length ? items : "✅ No hay URLs nuevas para calificar";
      } catch (e) {
        resDiv.innerHTML = "❌ Error al procesar";
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
