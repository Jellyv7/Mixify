const params = new URLSearchParams(window.location.search);

console.log(params)

export const host = 'http://localhost:5500/'; 
export const scopes = 'user-read-private user-read-email user-top-read';
export const clientId = 'bc811ce84fad429aa1da49677e100a70'; //Use your ClientID provided by Spotify https://developer.spotify.com/dashboard
export const code = params.get("code");

console.log(code)