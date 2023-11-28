import nltk
import json
from nltk.corpus import stopwords
from flask import Flask, request
from flask_cors import CORS

nltk.download('stopwords')

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")


@app.route('/get_words', methods=['POST'])
def get_words():
    data = request.json
    titles = [text["title"] for text in data]
    word_key = {}
    for text in titles:
        word_list = text.split()
        word_tokens = set(text.split())
        stop_words = set(stopwords.words('english'))
        for word in word_tokens:
            if word not in stop_words:
                if ("office" in word.lower() or "hour" in word.lower()) and "office hours" not in word_key:
                    word_key["office hours"] = word_list.count(word)
                elif ("office" in word.lower() or "hour" in word.lower()):
                    word_key["office hours"] += word_list.count(word)
                elif ("hw" in word.lower() or "homework" in word.lower()) and "homework" not in word_key:
                    word_key["homework"] = word_list.count(word)
                elif ("hw" in word.lower() or "homework" in word.lower()):
                    word_key["homework"] += word_list.count(word)
                elif ("quiz" in word.lower() or "quizzes" in word.lower()) and "quiz" not in word_key:
                    word_key["quiz"] = word_list.count(word)
                elif ("quiz" in word.lower() or "quizzes" in word.lower()):
                    word_key["quiz"] += word_list.count(word)
                elif "exam" in word.lower() and "exam" not in word_key:
                    word_key["exam"] = word_list.count(word)
                elif "exam" in word.lower():
                    word_key["exam"] += word_list.count(word)
                elif ("lectures" in word.lower() or "lecture" in word.lower()) and "lecture" not in word_key:
                    word_key["lecture"] = word_list.count(word)
                elif ("lectures" in word.lower() or "lecture" in word.lower()):
                    word_key["lecture"] += word_list.count(word)
    word_key = sorted(word_key.items(), key=lambda x: x[1], reverse=True)
    return json.dumps({"words": [item[0].title() for item in word_key][:5]})


@app.route('/get_data', methods=['POST'])
def get_data():
    data = request.json
    json_data = {}
    for item in data:
        title = item["title"]
        if ("office" in title or "hour" in title) and "office hours" not in json_data:
            json_data["office hours"] = item
        elif ("office" in title or "hour" in title):
            json_data["office hours"] += item
        elif ("hw" in title or "homework" in title) and "homework" not in json_data:
            json_data["homework"] = item
        elif ("hw" in title or "homework" in title):
            json_data["homework"] += item
        elif ("quiz" in title or "quizzes" in title) and "quiz" not in json_data:
            json_data["quiz"] = item
        elif ("quiz" in title or "quizzes" in title):
            json_data["quiz"] += item
        elif "exam" in title and "exam" not in json_data:
            json_data["exam"] = item
        elif "exam" in title:
            json_data["exam"] += item
        elif ("lectures" in title or "lecture" in title) and "lecture" not in json_data:
            json_data["lecture"] = item
        elif ("lectures" in title or "lecture" in title):
            json_data["lecture"] += item
    return json.dumps(json_data)


if __name__ == '__main__':
    app.run(port=5001)
