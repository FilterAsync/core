export async function verifyUser() {
    return await fetch('http://127.0.0.1:8082/api/verify', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });
};