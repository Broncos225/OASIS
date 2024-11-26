from flask import Flask, render_template, jsonify, request, redirect, url_for
import sqlite3
import os
import json
from datetime import datetime 

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('db\database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('index.html')

# BITACORA
@app.route('/Bitacora')
def Bitacora():
    return render_template('Bitacora.html')

@app.route('/El Leon de Nemea')
def Leon():
    return render_template('Leon.html')

# En tu archivo Flask
@app.route('/agua-data')
def agua_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT Fecha, Cantidad FROM Agua ORDER BY Fecha")
    data = cursor.fetchall()
    conn.close()

    labels = [row['Fecha'] for row in data]  
    values = [row['Cantidad'] for row in data]  

    labels = [datetime.strptime(label, "%Y-%m-%d").strftime("%Y-%m-%d") for label in labels]
    return jsonify({'labels': labels, 'values': values})

@app.route('/AgregarAgua', methods=['GET', 'POST'])
def AgregarAgua():
    if request.method == 'POST':
        fecha = request.form['fecha']
        cantidad = request.form['cantidad']
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Agua (Fecha, Cantidad) VALUES (?, ?)", (fecha, cantidad))
        conn.commit()
        conn.close()
        
        return redirect(url_for('Leon'))
    
    return render_template('Leon.html')

# En tu archivo Flask
@app.route('/peso-data')
def peso_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT Fecha, Cantidad FROM Peso ORDER BY Fecha")
    data = cursor.fetchall()
    conn.close()

    labels_peso = [row['Fecha'] for row in data]  
    values_peso = [row['Cantidad'] for row in data]  

    labels_peso = [datetime.strptime(label, "%Y-%m-%d").strftime("%Y-%m-%d") for label in labels_peso]
    return jsonify({'labels': labels_peso, 'values': values_peso})

@app.route('/AgregarPeso', methods=['GET', 'POST'])
def AgregarPeso():
    if request.method == 'POST':
        fecha_peso = request.form['fecha']
        cantidad_peso = request.form['cantidad']
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Peso (Fecha, Cantidad) VALUES (?, ?)", (fecha_peso, cantidad_peso))
        conn.commit()
        conn.close()
        
        return redirect(url_for('Leon'))
    
    return render_template('Leon.html')





if __name__ == '__main__':
    app.run(debug=True)