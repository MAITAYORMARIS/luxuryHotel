from flask import Flask, render_template, jsonify, request, redirect, url_for, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_login import LoginManager

app= Flask(__name__) # variable del tipo flask conexion con la db, trabajar con las tablas
CORS(app)

# conexion a DB  Configuración de SQLAlchemy
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://yormaris:SQL19095674@yormaris.mysql.pythonanywhere-services.com/yormaris$menu"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicialización de extensiones
db = SQLAlchemy(app)
ma = Marshmallow(app)

# Definición de la tabla menu en la base de datos.
class Menu(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255))
    descripcion = db.Column(db.String(255)) 
    precio = db.Column(db.Integer)
    foto = db.Column(db.String(400))
    categoria = db.Column(db.String(255))

    def __init__(self, nombre, descripcion, precio, foto, categoria):
    # Constructor de la clase menu asociada a a tabla menu
        self.nombre = nombre
        self.descripcion = descripcion
        self.precio = precio
        self.foto = foto
        self.categoria = categoria

 # Se pueden agregar más clases para definir otras tablas en la base de datos

with app.app_context():
    db.create_all()  # Crea todas las tablas en la base de datos

# Definición del esquema para la clase menu
class MenuSchema(ma.Schema):
     class Meta:
        fields = ("id", "nombre", "descripcion", "precio", "foto", "categoria")

plato_schema = MenuSchema()  #  objeto plato_schema es para traer un plato
menu_schema = MenuSchema(many=True)  # El objeto menu_schema es para traer multiples registros

@app.route('/menu', methods=["GET"])
def get_menu():
     all_menu = Menu.query.all() #obtiene todos los nombres del menu
     result = menu_schema.dump(all_menu)
     return jsonify(result)

# ruta para obtener un plato del menu
@app.route("/menu/<id>", methods=["GET"])
def get_plato(id):
     plato = Menu.query.get(id)
     return plato_schema.jsonify(plato)
     
# ruta para eliminar un plato
@app.route("/menu/<id>", methods=["DELETE"])
def delete_plato(id):
     plato = Menu.query.get(id) 
     db.session.delete(plato)  # Elimina el producto de la sesión de la base de datos
     db.session.commit() 
     return plato_schema.jsonify(plato)

@app.route("/menu", methods=["POST"])  # Endpoint para crear un plato nuevo
def create_plato():
    nombre = request.json["nombre"]  # Obtiene el nombre del plato del JSON proporcionado
    descripcion = request.json["descripcion"]
    precio = request.json["precio"]  # Obtiene el precio del plato del JSON proporcionado
    foto = request.json["foto"]  # Obtiene la imagen del plato del JSON proporcionado
    categoria = request.json["categoria"]
    new_plato = Menu(nombre, descripcion, precio, foto, categoria)  # Crea un nuevo objeto plato con los datos proporcionados
    db.session.add(new_plato)  # Agrega el nuevo plato a la sesión de la base de datos
    db.session.commit()  # Guarda los cambios en la base de datos
    return plato_schema.jsonify(new_plato)  # Retorna el JSON del nuevo plato creado

# actualizar un plato
@app.route('/menu/<id>' ,methods=['PUT'])
def update_plato(id):
    plato=Menu.query.get(id)
    nombre=request.json['nombre']
    descripcion = request.json["descripcion"]
    precio=request.json['precio']
    foto=request.json['foto']
    categoria = request.json["categoria"]

    plato.nombre=nombre
    plato.descripcion= descripcion
    plato.precio=precio
    plato.foto=foto
    plato.categoria=categoria
    db.session.commit()
    return plato_schema.jsonify(plato)
 
    # return render_template('index.html', data=data)
  

# codigo de la profe
if __name__=='__main__':
    app.run(debug=True, port=5000)


