import nltk
import sys
import json
from nltk.corpus import stopwords
from flask import Flask, jsonify
from flask import request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

nltk.download('stopwords')
print('in the function')


@app.route('/api/words', methods=['POST'])
def get_data():
    print("in the server")
    try:
        print("trying")
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
        return jsonify({"words": [item[0] for item in data][:5]})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
