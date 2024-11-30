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
    conn = get_db_connection()

    pesoActual = conn.execute('SELECT Cantidad FROM Peso ORDER BY Fecha DESC LIMIT 1').fetchone()
    aguaProm = conn.execute('SELECT IFNULL(ROUND(AVG(Cantidad), 2), 0) AS Prom FROM Agua').fetchone()
    vinagreProm = conn.execute('SELECT IFNULL(ROUND(AVG(CDA), 2), 0) AS Prom FROM Vinagre').fetchone()

    IMC = conn.execute("""
        SELECT ROUND(
            (Peso.Cantidad / ((Informacion.Estatura / 100.0) * (Informacion.Estatura / 100.0))), 2
        ) AS IMC
        FROM Peso
        JOIN Informacion ON Peso.CC = Informacion.CC
        WHERE Peso.Fecha = (
            SELECT MAX(Fecha)
            FROM Peso
            WHERE CC = 1000441419
        )
        AND Informacion.CC = 1000441419
    """).fetchone()
    IMC = IMC['IMC'] if IMC else 0


    # Obtener información general
    data = conn.execute('SELECT * FROM Informacion WHERE CC = 1000441419').fetchone()
    conn.close()

    # Renderizar la plantilla con los datos procesados
    return render_template('Leon.html', data=data, pesoActual=pesoActual, aguaProm=aguaProm, IMC=IMC, vinagreProm=vinagreProm)

@app.route('/progreso')
def progreso():
    conn = get_db_connection()
    
    # Cálculo del IMC
    result = conn.execute("""
        SELECT ROUND(
            (Peso.Cantidad / ((Informacion.Estatura / 100.0) * (Informacion.Estatura / 100.0))), 2
        ) AS IMC
        FROM Peso
        JOIN Informacion ON Peso.CC = Informacion.CC
        WHERE Peso.Fecha = (
            SELECT MAX(Fecha)
            FROM Peso
            WHERE CC = 1000441419
        )
        AND Informacion.CC = 1000441419
    """).fetchone()
    IMC = result['IMC'] if result and 'IMC' in result.keys() else None

    # Cálculo del promedio de agua
    aguaProm = conn.execute('SELECT IFNULL(ROUND(AVG(Cantidad), 2), 0) AS Prom FROM Agua').fetchone()
    promedio_agua = aguaProm['Prom'] if aguaProm else 0

    # Cálculo del promedio de cucharadas de vinagre
    vinagreProm = conn.execute('SELECT IFNULL(ROUND(AVG(CDA), 2), 0) AS Prom FROM Vinagre').fetchone()
    promedio_vinagre = vinagreProm['Prom'] if vinagreProm else 0

    # Progreso basado en IMC
    if IMC is None:
        progreso_IMC = 0
    else:
        IMC_min = 18.5
        IMC_max = 24.9
        progreso_max = 25
        if IMC < IMC_min:
            progreso_IMC = max(0, (IMC_min - IMC) / IMC_min * progreso_max)
        elif IMC <= IMC_max:
            progreso_IMC = (IMC - IMC_min) / (IMC_max - IMC_min) * progreso_max
        else:
            progreso_IMC = max(0, (IMC - IMC_max) / (30 - IMC_max) * progreso_max)

    # Progreso basado en litros de agua
    agua_meta = 3.7
    progreso_max_agua = 25
    if promedio_agua <= 0:
        progreso_agua = 0
    else:
        progreso_agua = min((promedio_agua / agua_meta) * progreso_max_agua, progreso_max_agua)

    # Progreso basado en cucharadas de vinagre
    vinagre_ideal = 2
    vinagre_max = 3
    progreso_max_vinagre = 25
    if promedio_vinagre < vinagre_ideal:
        progreso_vinagre = max(0, (promedio_vinagre / vinagre_ideal) * progreso_max_vinagre)
    elif promedio_vinagre == vinagre_ideal:
        progreso_vinagre = progreso_max_vinagre
    elif promedio_vinagre > vinagre_ideal:
        progreso_vinagre = max(0, (vinagre_max - promedio_vinagre) / (vinagre_max - vinagre_ideal) * progreso_max_vinagre)

    # Progreso total (IMC + agua + vinagre)
    progreso_total = progreso_IMC + progreso_agua + progreso_vinagre
    
    return jsonify({'progreso': progreso_total})





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
        fecha = datetime.now().strftime("%Y-%m-%d")
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
        cursor.execute("INSERT INTO Peso (Fecha, Cantidad, CC) VALUES (?, ?, ?)",(fecha_peso, cantidad_peso, '1000441419'))
        conn.commit()
        conn.close()
        
        return redirect(url_for('Leon'))
    
    return render_template('Leon.html')

@app.route('/vinagre-data')
def vinagre_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT Fecha, CDA FROM Vinagre ORDER BY Fecha")
    data = cursor.fetchall()
    conn.close()

    labels = [row['Fecha'] for row in data]  
    values = [row['CDA'] for row in data]  

    labels = [datetime.strptime(label, "%Y-%m-%d").strftime("%Y-%m-%d") for label in labels]
    return jsonify({'labels': labels, 'values': values})

@app.route('/AgregarVinagre', methods=['GET', 'POST'])
def AgregarVinagre():
    if request.method == 'POST':
        fecha = datetime.now().strftime("%Y-%m-%d")
        CDA = request.form['CDA']
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Vinagre (Fecha, CDA) VALUES (?, ?)", (fecha, CDA))
        conn.commit()
        conn.close()
        
        return redirect(url_for('Leon'))
    
    return render_template('Leon.html')



if __name__ == '__main__':
    app.run(debug=True)