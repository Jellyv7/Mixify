import { clientId, code } from '../utils/params.js'
import { salem, redirectToAuthCodeFlow } from '../lib/index.js';

const heroContent = `
	<div class="hero__container">
		<h1 class="title">Mixify</h1>
		<h2 class="subtitle">Create your own mixtape by your Spotify Stats!</h2>
	</div>
`

const hero = salem.createNode({
	content: heroContent,
	attributes: [
		{
			attr: 'class',
			value: 'hero'
		}
	]
});

const handleClick = async () => {
	if (!code) return redirectToAuthCodeFlow(clientId)
}

salem.createNode({
	parent: hero,
	tagName: 'button',
	content: 'Sign In',
	attributes: [
		{
			attr: 'id',
			value: 'signin'
		}
	],
	eventListeners: [
		{
			event: 'click',
			callback: handleClick
		}
	]
});

export default function () { 
	salem.render({ node: hero }); 
};