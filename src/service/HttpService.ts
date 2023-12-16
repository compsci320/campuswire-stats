// const API_URL = 'http://localhost:5001';
const API_URL = 'http://campuswireanalytics.pythonanywhere.com'
// GET Request from the flask server
export async function get(path: string) {
    const requestInstructions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }

    return await fetch(API_URL + path, requestInstructions)
        .then(res => res.json());
}
// POST request from the flask server
export async function post(path: string, payload: any) {
    const requestInstructions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    return await fetch(API_URL + path, requestInstructions)
        .then(res => res.json());
}