export async function postLoginData(event) {
	event.preventDefault();

	/*const res = await fetch('/api/login', {
	    body: JSON.stringify({
	        username: event.target.username.value,
	        password: event.target.password.value
	    }),
	    headers: {
	        'Content-Type': 'application/json'
	    },
	    method: 'POST'
	})
	const result = await res.json();
	return result;*/

	const res = await fetch('/api/auth', {
		      body: JSON.stringify({
		        username: event.target.username.value,
		        password: event.target.password.value
		      }),
		      headers: {
		        'Content-Type': 'application/json'
		      },
		      method: 'POST'
	})
	const result = await res.json();
	return result;


}