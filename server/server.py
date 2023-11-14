import nltk
import json
from nltk.corpus import stopwords
from flask import Flask, jsonify, request
from flask_cors import CORS

nltk.download('stopwords')

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")


@app.route('/', methods=['POST', 'GET'])
def get_data():
    data = request.json
    titles = [text["title"] for text in data]
    word_key = {}
    for text in titles:
        word_list = text.split()
        word_tokens = set(text.split())
        stop_words = set(stopwords.words('english'))
        for word in word_tokens:
            if word not in stop_words:
                if word.lower() not in word_key:
                    word_key[word.lower()] = word_list.count(word)
                else:
                    word_key[word.lower()] += word_list.count(word)

    word_key = sorted(word_key.items(), key=lambda x: x[1], reverse=True)
    return json.dumps({"words": [item[0].title() for item in word_key][:5]})


if __name__ == '__main__':
    app.run(port=5001)
