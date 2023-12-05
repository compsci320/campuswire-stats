const API_URL = 'http://localhost:5000';

export async function get(path: string) {
    const requestInstructions = { 
        method: 'GET'
    }

    return await fetch(API_URL + path, requestInstructions)
        .then(res => res.json());
}

export async function post(path: string, payload: any) {
    const requestInstructions = { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    return await fetch(API_URL + path, requestInstructions)
        .then(res => res.json());
}