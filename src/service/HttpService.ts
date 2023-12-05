const API_URL = 'http://localhost:5000';

export async function get(path: string) {
    const requestInstructions = { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    }

    return await fetch(API_URL + path, requestInstructions)
        .then(res => res.json());
}

export async function post(path: string, payload: any) {
    const requestInstructions = { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(payload)
    }

    return await fetch(API_URL + path, requestInstructions)
        .then(res => res.json());
}