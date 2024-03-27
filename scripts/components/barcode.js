import '../lib/JsBarcode.js';
import { salem } from '../lib/salem.js';

export default function (name, country, duration, parent) {

	const totalSeconds = Math.floor(duration / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

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

	JsBarcode(barcode, `${name[0]}${country}${minutes}${seconds}`, options);

	salem.render({parent, node: barcode });
};