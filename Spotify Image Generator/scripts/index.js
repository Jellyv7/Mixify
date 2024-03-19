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

// const populateUI = data => {
// 	const { profile, topArtist, topTracks } = data;

// 	//PROFILE
// 	document.getElementById("displayName").innerText = profile.display_name;
// 	if (profile.images[0]) {
// 		const profileImage = new Image(200, 200);
// 		profileImage.src = profile.images[0].url;
// 		document.getElementById("avatar").appendChild(profileImage);
// 		document.getElementById("imgUrl").innerText = profile.images[0].url;
// 	}
// 	document.getElementById("id").innerText = profile.id;
// 	document.getElementById("email").innerText = profile.email;
// 	document.getElementById("uri").innerText = profile.uri;
// 	document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
// 	document.getElementById("url").innerText = profile.href;
// 	document.getElementById("url").setAttribute("href", profile.href);

// 	//ARTIST
// 	document.getElementById('artist').innerHTML = topArtist.map(name => {
// 		return `<li>${name}</li>`
// 	}).join('');

// 	//TRACKS
// 	document.getElementById('tracks').innerHTML = topTracks.map(name => {
// 		return `<li>${name}</li>`
// 	}).join('');

// };