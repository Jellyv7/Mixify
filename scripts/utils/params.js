const params = new URLSearchParams(window.location.search);

export const host = 'https://spotifymixify.netlify.app' || 'http://localhost:5500/'  
export const scopes = 'user-read-private user-read-email user-top-read';
export const clientId = 'bc811ce84fad429aa1da49677e100a70' //Add here your own clientID https://developer.spotify.com/dashboard
export const code = params.get("code");