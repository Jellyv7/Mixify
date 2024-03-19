const main = document.querySelector('main');

const createNodeElements = ({
	parent = null,
	tagName = 'div',
	content = null,
	attributes = [],
	eventListeners = []
} = {}) => {
	const node = tagName === 'svg' ? document.createElementNS('http://www.w3.org/2000/svg', 'svg') : document.createElement(tagName);

	attributes.forEach(({attr, value}) => node.setAttribute(attr, value));
	eventListeners.forEach(({event, callback}) => node.addEventListener(event, callback));
	node.innerHTML = content;

	if (parent) parent.appendChild(node);

	return node;
};

export const salem = {
	createNode: createNodeElements,
	render: ({ parent = main, node } = {}) => parent?.appendChild(node)
};