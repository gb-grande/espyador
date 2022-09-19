from flask import Flask
app = Flask(__name__, static_folder="front")

filepath="index.html"

@app.route("/")
def index():
    return app.send_static_file(filepath)