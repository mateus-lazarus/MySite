// JavaScript for handling form submission
document.getElementById('postForm').addEventListener('submit', async function (event) {
	event.preventDefault(); // Prevent the default form submission

	// Collect form data
	const formData = new FormData(event.target);
	const data = Object.fromEntries(formData.entries());

	try {
		// Send HTTP POST request
		const response = await fetch('/calculate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		// Parse the response
		const responseObject = await response.json();

		// Display the response object
		document.getElementById('response').textContent = JSON.stringify(responseObject, null, 2);
	} catch (error) {
		document.getElementById('response').textContent = `Error: ${error.message}`;
	}
});
