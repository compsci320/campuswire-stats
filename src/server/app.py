import nltk
import json
from nltk.corpus import stopwords
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/app/*": {"origins": "http://localhost:3000"}})


nltk.download('stopwords')


@app.route('/app/get_data', methods=['OPTIONS', 'GET', 'POST'])
def handle_preflight():
    response = app.make_default_options_response()
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    return response


def get_data():
    try:
        request_data = json.loads(request.data)
        titles = request_data.get('titles', [])

        data = {}
        for text in titles:
            word_list = text.split()
            work_tokens = set(text.split(' '))
            stop_words = set(stopwords.words('english'))

            for word in work_tokens:
                if word not in stop_words:
                    data[word] = data.get(word, 0) + word_list.count(word)

        data = sorted(data.items(), key=lambda x: x[1], reverse=True)
        for key, value in data:
            print(key + "; " + str(value))
        print(data)
        return jsonify({"words": [item[0] for item in data][:5]}), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        return jsonify({"error": str(e)}), 500, {'Content-Type': 'application/json'}


if __name__ == '__main__':
    app.run(debug=True)
