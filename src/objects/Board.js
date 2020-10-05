import { FIRST_COLOR, SECOND_COLOR, BODY } from '../consts.js';

export default class Board {
	constructor(element) {
		this.element = element;
		this.cx = element.getContext('2d');

		this.setSize();
		this.render();

		return this;
	}

	init() {

	}

	setSize() {
		this.width = this.cx.width = this.element.width = window.innerWidth + 0.5;
		this.height = this.cx.height = this.element.height = window.innerHeight + 0.5;
		this.halfHeight = this.height / 2;
	}

	render() {
		this.cx.fillStyle = FIRST_COLOR;
		this.cx.fillRect(0, 0, this.width, this.halfHeight);

		BODY.appendChild(board);
	}

	clear() {
		this.cx.fillStyle = FIRST_COLOR;
		this.cx.fillRect(0, 0, this.width, this.halfHeight);
		this.cx.fillStyle = SECOND_COLOR;
		this.cx.fillRect(0, this.halfHeight, this.width, this.halfHeight);
	}
}