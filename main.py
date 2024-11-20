from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

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