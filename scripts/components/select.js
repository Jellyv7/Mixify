import { salem } from "../lib/index.js";

export default function (options, parent, title) {
	const select = salem.createNode({
		content: title,
		attributes: [
			{
				attr: 'class',
				value: 'select'
			}
		]
	});
	
	const selectedContainer = salem.createNode({
		parent: select,
		attributes: [
			{
				attr: 'class',
				value: 'select__selected'
			}
		],
		eventListeners: [
			{
				event: 'click',
				callback: () => select.classList.toggle('show')
			}
		]
	});

	const selectedName = salem.createNode({
		parent: selectedContainer,
		tagName: 'span',
		content: options[0].name,
		attributes: [
			{
				attr: 'class',
				value: 'select__selected--name'
			}
		]
	});

	selectedContainer.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>')

	const optionsContainer = salem.createNode({
		parent: select,
		tagName: 'ul',
		attributes: [
			{
				attr: 'class',
				value: 'select__options'
			}
		]
	});

	options.forEach(({ name, callback, id }) => {
		salem.createNode({
			parent: optionsContainer,
			tagName: 'li',
			content: name,
			attributes: [
				{
					attr: 'class',
					value: `select__options--opt ${selectedName.innerText === name ? 'selected' : ''}`
				},
				{
					attr: 'id',
					value: id
				}
			],
			eventListeners: [
				{
					event: 'click',
					callback: e => {
						const { currentTarget } = e;
						
						select.classList.toggle('show');
						
						if (currentTarget.classList.contains('selected')) return e.preventDefault();
						
						const currentSelected = optionsContainer.querySelector('.selected');
						callback(e);
						selectedName.innerText = name;
						currentSelected.classList.remove('selected');
						currentTarget.classList.add('selected');
					}
				}
			]
		});
	});

	salem.render({ parent, node: select });
};

