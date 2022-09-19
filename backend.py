from flask import Flask
import pegador
app = Flask(__name__, static_folder="front")

filepath="index.html"

@app.route("/")
def index():
    return app.send_static_file(filepath)

@app.route("/palavras/<username>", methods=["GET"])
def palavras(username):
    return pegar(username, 99)