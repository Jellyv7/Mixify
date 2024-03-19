import '../lib/JsBarcode.js';
import { salem } from '../lib/salem.js';

export default function (name, parent) {

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

	JsBarcode(barcode, `${name[0]}VE1709`, options);

	salem.render({parent, node: barcode });
};