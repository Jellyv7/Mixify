const params = new URLSearchParams(window.location.search);

export const host = 'http://localhost:5500/'  
export const scopes = 'user-read-private user-read-email user-top-read';
export const clientId = 'c69144645eff403aa5475be1428aa2d1' //Add here your own clientID https://developer.spotify.com/dashboard
export const code = params.get("code");