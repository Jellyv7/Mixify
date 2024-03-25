import { host } from '../utils/params.js'

export const getAccessToken = async (clientId, code) => {
	const verifier = localStorage.getItem("verifier");

	const params = new URLSearchParams();
	params.append("client_id", clientId);
	params.append("grant_type", "authorization_code");
	params.append("code", code);
	params.append("redirect_uri", host);
	params.append("code_verifier", verifier);

	const result = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: params
	});

	const { access_token } = await result.json();
	return access_token;
};

export const fetchFromSpotify = async (endpoint, token) => {
    const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch data from Spotify: ${response.statusText}`);
    }
    return response.json();
};

export const fetchData = async token => {

	//Destructure from function fetchFromSpotify, all the fetch at the same time with Promise.all()
    try {
        const [
            profileJSON,
            topTracksLongJSON,
            topArtistLongJSON,
            topTracksMediumJSON,
            topArtistMediumJSON,
            topTracksShortJSON,
            topArtistShortJSON
        ] = await Promise.all([
            fetchFromSpotify("me", token),
            fetchFromSpotify("me/top/tracks?time_range=long_term&limit=10&offset=0", token),
            fetchFromSpotify("me/top/artists?time_range=long_term&limit=10&offset=0", token),
            fetchFromSpotify("me/top/tracks?time_range=medium_term&limit=10&offset=0", token),
            fetchFromSpotify("me/top/artists?time_range=medium_term&limit=10&offset=0", token),
            fetchFromSpotify("me/top/tracks?time_range=short_term&limit=10&offset=0", token),
            fetchFromSpotify("me/top/artists?time_range=short_term&limit=10&offset=0", token)
        ]);

		//We take all the tracks and artist to calculate top genres because Spotify doesn't give top genres by itself
		const allTracks = [
            topTracksLongJSON.items,
            topTracksMediumJSON.items,
            topTracksShortJSON.items
        ];
        const allArtists = [
            topArtistLongJSON.items,
            topArtistMediumJSON.items,
            topArtistShortJSON.items
        ];

		console.log(allTracks[0])

		//We take all arrays from artist and tracks, we take their genres and make a flatmap to them, to obtain only one array with all of the genres
		const trackGenresLongTerm = allTracks[0].flatMap(track => track.artists.flatMap(artist => artist.genres)).filter(Boolean);
        const artistGenresLongTerm = allArtists[0].flatMap(artist => artist.genres).filter(Boolean);

		const trackGenresMediumTerm = allTracks[1].flatMap(track => track.artists.flatMap(artist => artist.genres)).filter(Boolean);
        const artistGenresMediumTerm = allArtists[1].flatMap(artist => artist.genres).filter(Boolean);

		const trackGenresShortTerm = allTracks[2].flatMap(track => track.artists.flatMap(artist => artist.genres)).filter(Boolean);
        const artistGenresShortTerm = allArtists[2].flatMap(artist => artist.genres).filter(Boolean);

        // Concat artist genres and tracks genres
        const allGenresLongTerm = [...trackGenresLongTerm, ...artistGenresLongTerm];
		const allGenresMediumTerm = [...trackGenresMediumTerm, ...artistGenresMediumTerm];
		const allGenresShortTerm = [...trackGenresShortTerm, ...artistGenresShortTerm];

		const countGenreFrequency = (genres) => {
			// Count genre frequency
			const genreCounts = {};
			genres.forEach(genre => {
				genreCounts[genre] = (genreCounts[genre] || 0) + 1;
			});

			console.log(genreCounts)

			const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);
			// Obtain top 10 genres 
			const topGenres = sortedGenres.slice(0, 10);
			return topGenres
		}

        return {
            user: profileJSON.display_name,
			country: profileJSON.country,
			followers: profileJSON.followers.total,
            metrics: {
                topTracks: {
                    longTerm: topTracksLongJSON.items.map(({ name, artists: [{ name: artistName }] }) => `${name} - ${artistName}`),
                    mediumTerm: topTracksMediumJSON.items.map(({ name, artists: [{ name: artistName }] }) => `${name} - ${artistName}`),
                    shortTerm: topTracksShortJSON.items.map(({ name, artists: [{ name: artistName }] }) => `${name} - ${artistName}`)
                },
                topArtist: {
                    longTerm: topArtistLongJSON.items.map(({ name }) => name),
                    mediumTerm: topArtistMediumJSON.items.map(({ name }) => name),
                    shortTerm: topArtistShortJSON.items.map(({ name }) => name)
                },
				topGenres: {
					longTerm: countGenreFrequency(allGenresLongTerm),
					mediumTerm: countGenreFrequency(allGenresMediumTerm),
					shortTerm: countGenreFrequency(allGenresShortTerm)

				}
            }
        };
    } catch (error) {
        console.error("Error fetching data from Spotify:", error);
        return null;
    }
};

