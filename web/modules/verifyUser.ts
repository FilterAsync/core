export function verifyUser() {
	return fetch('http://localhost:8080/api/verify', {
		method: 'GET',
		credentials: 'include',
	});
}
