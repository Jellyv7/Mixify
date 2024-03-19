import { clientId, code } from "./utils/params.js";
import { fetchData, getAccessToken } from "./lib/index.js"; 
import { hero } from './pages/index.js';
import { editor } from './components/index.js';

document.addEventListener('DOMContentLoaded', async () => {
	// const loginButton = document.getElementById('login');

	// loginButton.addEventListener('click', async () => {
	// 	if (!code) return redirectToAuthCodeFlow(clientId);
	// });	

	if (!code) hero();

	if (code) {
		const accessToken = await getAccessToken(clientId, code);
		const data = await fetchData(accessToken);
		console.log(data);

		editor(data);
	};
});