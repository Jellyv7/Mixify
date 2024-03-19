const params = new URLSearchParams(window.location.search);

export const host = 'http://localhost:5500/'
export const scopes = 'user-read-private user-read-email user-top-read';
export const clientId = 'bc811ce84fad429aa1da49677e100a70'
export const code = params.get("code");