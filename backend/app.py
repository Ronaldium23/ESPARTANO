from flask import Flask, render_template, request, flash, send_from_directory
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
from flask_cors import CORS

app = Flask(__name__, static_folder="static", static_url_path="")  # Asegura que sirva los archivos estáticos correctamente
CORS(app)  # Esto habilita CORS para toda la aplicación

load_dotenv()  # Cargar las variables de entorno desde el archivo .env

app.secret_key = os.getenv('FLASH_SECRET_KEY', '123')

# Configuraciones de correo electrónico
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

mail = Mail(app)

@app.route('/')
def index():
    return render_template('index.html')

# Ruta para servir archivos estáticos (imágenes, CSS, JS)
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)


@app.route('/send_email', methods=['POST'])
def send_email():
    try:
        nombre = request.form['nombre']
        correo = request.form['correo']
        mensaje = request.form['mensaje']

        msg = Message('Nuevo mensaje de contacto', sender=correo, recipients=[os.getenv('MAIL_USERNAME')])
        msg.body = f'Nombre: {nombre}\nCorreo: {correo}\nMensaje: {mensaje}'

        mail.send(msg)

        flash('Mensaje enviado correctamente', 'success')
    except Exception as e:
        flash(f'Error al enviar mensaje: {str(e)}', 'danger')

    return '', 200

if __name__ == '__main__':
    app.run(debug=True)
