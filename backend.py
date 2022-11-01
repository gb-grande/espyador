from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
import pegador

app = Flask(__name__, static_folder="front")
cors = CORS(app, resources={r"/*": {"origins": "*"}})

filepath="index.html"

@app.route("/")
def index():
    return app.send_static_file(filepath)

@app.route("/palavras/<username>", methods=["GET"])
@cross_origin()
def palavras(username):
    dict = pegador.pegar(username, 99)
    resp = jsonify(dict)
    resp.status_code = 200
    resp.headers.add("Access-Control-Allow-Origin", "*")
    print(resp)

    return resp
    

