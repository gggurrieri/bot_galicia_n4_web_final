# Bot Galicia N4 Web Final

Este proyecto automatiza la calificación de artículos de nivel N4 en la sección de ayuda jurídica para empresas del Banco Galicia.

## 🚀 Funcionalidad

- Accede automáticamente a la sección de ayuda
- Detecta URLs de nivel N4
- Vota "Sí" en la utilidad del artículo
- Marca 5 estrellas
- Evita repetir URLs ya calificadas
- Permite elegir cuántas URLs calificar desde una interfaz web simple
- Muestra resultados en tiempo real con íconos ✅ y ⚠️

## 📦 Requisitos

- Python 3.10+
- ChromeDriver instalado y en PATH
- Google Chrome

Instalación de dependencias:

```bash
pip install -r requirements.txt
```

## ▶️ Ejecución local

```bash
python app.py
```

Abrí tu navegador en `http://localhost:5000` para usar la interfaz web.

## 🌐 Deploy en Render

- Agregar `requirements.txt`
- Start command: `python app.py`

## ✍️ Autor

Proyecto desarrollado por Gabriel Gurrieri para automatizar el sistema de calificación de ayuda N4 en Banco Galicia.