from flask import Flask, jsonify, render_template
app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/line")
def test():
    # this is pretty darn convenient! x = requests.get('https://api.iextrading.com/1.0/stock/aapl/time-series')
    data = [{
        "x": [1, 2, 3, 4, 5],
        "y": [1, 2, 4, 8, 16]
        }]

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
