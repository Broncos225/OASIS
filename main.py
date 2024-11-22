from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)

# CONEXION A LA BASE DE DATOS
def get_db_connection():
    conn = sqlite3.connect('db/database.db')
    conn.row_factory = sqlite3.Row
    return conn



# INICIO
@app.route('/')
def index():
    return render_template('index.html')

# BITACORA
@app.route('/Bitacora')
def Bitacora():
    return render_template('Bitacora.html')

# EL LEON DE NEMEA
@app.route('/El Leon de Nemea')
def Leon():
    return render_template('Leon.html')

# LA HIDRA DE LERNA
@app.route('/La Hidra de Lerna')
def Hidra():
    return render_template('Hidra.html')

# EL CIERVO DE CERINEA
@app.route('/El Ciervo de Cerinea')
def Ciervo():
    return render_template('Ciervo.html')

# EL JABALI DE ERIMANTO
@app.route('/El jabali de Erimanto')
def Jabali():
    return render_template('Jabali.html')


if __name__ == '__main__':
    app.run(debug=True)