import '../lib/JsBarcode.js';
import { salem } from '../lib/salem.js';

export default function (name, country, followers, parent) {

	const options = {
		font: 'ClashDisplay-Variable',
		background: '',
		lineColor: 'currentColor',
		margin: 0
	}

	const barcode = salem.createNode({
		tagName: 'svg',
		attributes: [
			{
				attr: 'id',
				value: 'barcode'
			}
		]
	});

	JsBarcode(barcode, `${name[0]}${country}${followers}`, options);

	salem.render({parent, node: barcode });
};