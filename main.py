from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)

# Función para obtener la conexión a la base de datos
def get_db_connection():
    conn = sqlite3.connect('db/database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/data')
def get_data():
    conn = get_db_connection()
    data = conn.execute('SELECT date, value FROM progress').fetchall()
    conn.close()
    return jsonify([dict(row) for row in data])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data2')
def data():
    return render_template('data.html')

@app.route('/El Leon de Nemea')
def Leon():
    return render_template('Leon.html')

@app.route('/La Hidra de Lerna')
def Hidra():
    return render_template('Hidra.html')

@app.route('/El Ciervo de Cerinea')
def Ciervo():
    return render_template('Ciervo.html')

@app.route('/El jabali de Erimanto')
def Jabali():
    return render_template('Jabali.html')


if __name__ == '__main__':
    app.run(debug=True)