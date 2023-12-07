import nltk
import json
from nltk.corpus import stopwords
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

stop_words = set(stopwords.words('english'))

@app.route("/")
@cross_origin(origin='*')
def status():
    return jsonify({ 'status': 'running' }), 200

@app.route('/data', methods=['GET'])
@cross_origin(origin='*')
def get_data():
    f = open('mock.json')

    data = json.load(f)
    json_data = {}

    for item in data:
        title = item["title"]
        words = title.split()
        ignored_words = ["office", "hour", "hw", "homework", "quiz", "exam", "lecture", "question", "today"]
        filtered_words = [w for w in words if not w.lower() in stop_words and w.lower() not in ignored_words and w.lower()[:-1] not in ignored_words]

        count = 0
        i = 0

        while i < len(filtered_words) - count:
            if filtered_words[i].isnumeric():
                filtered_words[i - 1] += " " + filtered_words[i]
                filtered_words.pop(i)
                count += 1
            i += 1

        if ("office" in title.lower() or "hour" in title.lower()) and "Office Hours" not in json_data:
            json_data["Office hours"] = [item]
        elif ("office" in title.lower() or "hour" in title.lower()):
            json_data["Office hours"].append(item)
        elif ("hw" in title.lower() or "homework" in title.lower()) and "Homework" not in json_data:
            json_data["Homework"] = [item]
        elif ("hw" in title.lower() or "homework" in title.lower()):
            json_data["Homework"].append(item)
        elif ("quiz" in title.lower() or "quizzes" in title.lower()) and "Quiz" not in json_data:
            json_data["Quiz"] = [item]
        elif ("quiz" in title.lower() or "quizzes" in title.lower()):
            json_data["Quiz"].append(item)
        elif "exam" in title.lower() and "Exam" not in json_data:
            json_data["Exam"] = [item]
        elif "exam" in title.lower():
            json_data["Exam"].append(item)
        elif ("lectures" in title.lower() or "lecture" in title.lower()) and "Lecture" not in json_data:
            json_data["Lecture"] = [item]
        elif ("lectures" in title.lower() or "lecture" in title.lower()):
            json_data["Lecture"].append(item)
        for word in filtered_words:
            if word.title() not in json_data and word != "zzz":
                json_data[word.title()] = [item]
            elif word != "zzz":
                json_data[word.title()].append(item)

    inverse = [(len(value), key) for key, value in json_data.items()]
    inverse.sort()

    final_data = {}
    for i in range(5):
        key = inverse[-1][1]
        item = json_data[key]
        final_data[key] = item

        del json_data[key]
        inverse.pop()

    return json.dumps(final_data)

if __name__ == '__main__':
    app.run(port=5001)
