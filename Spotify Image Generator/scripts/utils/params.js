const params = new URLSearchParams(window.location.search);

export const host = ''; //Here you put your own redirect URI
export const scopes = 'user-read-private user-read-email user-top-read';
export const clientId = ''; //Here you need to put your own ClientID
export const code = params.get("code");