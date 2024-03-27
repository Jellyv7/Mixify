import { salem } from '../lib/index.js';
import { default as select } from './select.js';
import { default as preview } from './preview.js';
import { populateUI } from './preview.js'; 
import { metrics, terms, alignments, themes } from '../lib/index.js';

const { artist, tracks, genre } = metrics;
const { longTerm, mediumTerm, shortTerm } = terms;
const { center, left, right } = alignments;
const { metal, dubstep, pop, kpop, rap } = themes;

export default function (data) {

	const props = {
		metric: artist.id,
		term: mediumTerm.id,
		align: left.id,
		titleAlign: left.id,
		theme: pop.id
	};
	
	const handleData = (e, type) => {
		const { currentTarget } = e;
		const { id } = currentTarget;
		props[type] = id;
		populateUI(props, data); // !!
		// const buttonMediumTerm = document.getElementById('mediumTerm');
		// const buttonLongTerm = document.getElementById('longTerm');

		const currentSelected = currentTarget.parentElement.querySelector('.selectedButton');
		currentSelected?.classList.remove('selectedButton');
		currentTarget.classList.add('selectedButton');
	}

	const handleTheme = e => {
		const { currentTarget: { id } } = e;
		const canvas = document.querySelector('.mixtape');
		canvas.classList.remove(props.theme);
		props.theme = id;
		canvas.classList.add(props.theme);
	}

	const handleAlignment = (e, alignTitle) => {
		const alignment = document.querySelector('.mixtape__content > .metrics__container');
		const title = document.querySelector('.mixtape__content');
		const { currentTarget } = e;

		alignment.classList.remove(props.align);
		props.align = currentTarget.id
		alignment.classList.add(props.align);

		title.classList.remove(props.titleAlign)
		props.titleAlign = alignTitle;
		title.classList.add(props.titleAlign)
	}

	const downloadImage = () => {
		modernScreenshot.domToPng(document.querySelector('.mixtape'), {
			scale: 3
		}).then(dataUrl => { // No al then, si al async await
			const link = document.createElement('a')
			link.download = 'mixtape.png'
			link.href = dataUrl
			link.click()
		  });
	}

	const buttonsMetrics = [
		{
			name: tracks.name,
			events: [
				{
					event: 'click',
					callback: e => handleData(e, 'metric')
				}
			],
			id: tracks.id,
			base: false 
		},
		{
			name: artist.name,
			events: [
				{
					event: 'click',
					callback: e => handleData(e, 'metric')
				}
			],
			id: artist.id,
			base: true 
		},
		{
			name: genre.name,
			events: [
				{
					event: 'click',
					callback: e => handleData(e, 'metric')
				}
			],
			id: genre.id,
			base: false
		},
	]
	
	const buttonsTimes = [
		{
			name: longTerm.name,
			events: [
				{
					event: 'click',
					callback: e => handleData(e, 'term')
				}
			],
			id: longTerm.id,
			base: false
		},
		{
			name: mediumTerm.name,
			events: [
				{
					event: 'click',
					callback: e => handleData(e, 'term')
				}
			],
			id: mediumTerm.id,
			base: true 
		},
		{
			name: shortTerm.name,
			events: [
				{
					event: 'click',
					callback: e => handleData(e, 'term')
				}
			],
			id: shortTerm.id,
			base: false
		},
	]
	
	const themeOptions = [
		{
			name: pop.name,
			callback: e => handleTheme(e),
			id: pop.id,
			base: true
		},
		{
			name: metal.name,
			callback: e => handleTheme(e),
			id: metal.id,
			base: false
		},
		{
			name: kpop.name,
			callback: e => handleTheme(e),
			id: kpop.id,
			base: false
		},
		{
			name: dubstep.name,
			callback: e => handleTheme(e),
			id: dubstep.id,
			base: false
		},
		{
			name: rap.name,
			callback: e => handleTheme(e),
			id: rap.id,
			base: false
		}

	];
	
	const TextOptions = [
		{
			name: left.name,
			events: [
				{
					event: 'click',
					callback: e => {
						handleAlignment(e, left.id)
						// handleData(e, 'align')
					}
				}
			],
			id: left.id,
			base: true 
		},
		{
			name: center.name,
			events: [
				{
					event: 'click',
					callback: e => {
						handleAlignment(e, center.id)
						// handleData(e, 'align')
					}
				}
			],
			id: center.id,
			base: false 
		},
		{
			name: right.name,
			events: [
				{
					event: 'click',
					callback: e => {
						handleAlignment(e, right.id)
						// handleData(e, 'align')
					}
				}
			],
			id: right.id,
			base: false 
		}
	]

	const editor = salem.createNode({
		tagName: 'section',
		attributes: [
			{
				attr: 'class',
				value: 'editor'
			}
		]
	});
	
	preview(props, data, editor);
	
	const editorOptions = salem.createNode({
		parent: editor, 
		content: '<h2>Customize your mixtape</h2>',
		attributes: [
			{
				attr: 'class',
				value: 'editor__options'
			}
		]
	});
	
	const editorOptionsContainer = salem.createNode({
		parent: editorOptions,
		attributes: [
			{
				attr: 'class',
				value: 'editor__options--container'
			}
		]
	});
	
	const containerLeft = salem.createNode({
		parent: editorOptionsContainer,
		attributes: [
			{
				attr: 'class',
				value: 'containerLeft'
			}
		]
	});
	
	const containerRight = salem.createNode({
		parent: editorOptionsContainer,
		attributes: [
			{
				attr: 'class',
				value: 'containerRight'
			}
		]
	});
	
	const editorOptionsMetrics = salem.createNode({
		parent: containerLeft,
		content: '<h3>Choose your mix</h3>',
		attributes: [
			{
				attr: 'class',
				value: 'editor__options--metrics'
			}
		]
	});
	
	const metricsButtons = salem.createNode({
		parent: editorOptionsMetrics,
		attributes: [
			{
				attr: 'class',
				value: 'metrics__buttons'
			}
		]
	});
	
	buttonsMetrics.forEach(({ name, events, id, base }) => {
		salem.createNode({
			parent: metricsButtons,
			content: name,
			tagName: 'button',
			attributes: [
				{
					attr: 'class',
					value: `metrics__buttons--button ${base ? 'selectedButton' : ''}`
				},
				{
					attr: 'id',
					value: id
				}
			],
			eventListeners: events
		});
	}); 
	
	const editorOptionsTime = salem.createNode({
		parent: containerLeft,
		content: '<h3>Choose a time range</h3>',
		attributes: [
			{
				attr: 'class',
				value: 'editor__options--time'
			}
		]
	});
	
	const timesButtons = salem.createNode({
		parent: editorOptionsTime,
		attributes: [
			{
				attr: 'class',
				value: 'times__buttons'
			}
		]
	});
	
	buttonsTimes.forEach(({ name, events, id, base }) => {
		salem.createNode({
			parent: timesButtons,
			content: name,
			tagName: 'button',
			attributes: [
				{
					attr: 'class',
					value: `times__buttons--button ${base === true ? 'selectedButton' : ''}`
				},
				{
					attr: 'id',
					value: id
				}
			],
			eventListeners: events
		});
	}); 

	const buttonsText = salem.createNode({
		parent: containerLeft,
		content: '<h3>Choose the alignment</h3>',
		attributes: [
			{
				attr: 'class',
				value: 'editor__options--text'
			}
		]
	});

	const buttonsTextContainer = salem.createNode({
		parent: buttonsText,
		attributes: [
			{
				attr: 'class',
				value: 'text__buttons'
			}
		]
	})

	TextOptions.forEach(({name, events, id, base }) => {
		salem.createNode({
			parent: buttonsTextContainer,
			content: name,
			tagName: 'button',
			attributes: [
				{
					attr: 'class',
					value: `text__buttons--button ${base === true ? 'selectedButton' : ''}`
				},
				{
					attr: 'id',
					value: id
				}
			],
			eventListeners: events
		});
	})

	
	select(themeOptions, containerRight, '<h3>Choose a theme</h3>');

	const downloadButton = salem.createNode({
		parent: containerRight,
		content: '<h3>Download your mixtape!</h3>',
		attributes: [
			{
				attr: 'class',
				value: 'editor__options--download'
			}
		]
	});

	salem.createNode({
		parent: downloadButton,
		tagName: 'button',
		content: 'Download',
		attributes: [
			{
				attr: 'class',
				value: 'download__button'
			}
		],
		eventListeners: [
			{
				event: 'click',
				callback: () => downloadImage()
			}
		]
	})
	
	
	salem.render({ node: editor });

}

