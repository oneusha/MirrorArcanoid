import { FIRST_COLOR, SECOND_COLOR } from '../consts.js';
import { game } from '../app.js';

export default class Paddle {
	constructor(isTop) {
        console.log(game);
		this.height = 20;
		this.width = 150;
		this.speed = 25;
		this.x = 0;
		this.y = 0;

		this.isTop = isTop;

		this.init();
	}

	init() {
		this.x = (game.mainBoard.width - this.width) / 2;
		this.y = this.isTop ? 0 : game.mainBoard.height - this.height / 2;

		this.draw();
		this.control();
	}

	draw() {
		game.mainBoard.cx.fillStyle = this.isTop ? SECOND_COLOR : FIRST_COLOR;
		game.mainBoard.cx.fillRect(this.x, this.y, this.width, this.height / 2);
		// game.mainBoard.cx.fillStyle = FIRST_COLOR;
		// game.mainBoard.cx.fillRect(this.x, this.y + this.height / 2, this.width, this.height / 2);
	}

	control() {
		window.addEventListener('keydown', (e) => {
			if (e.keyCode === 39) {
				this.move(this.isTop ? 1 : -1);
			}

			if (e.keyCode === 37) {
				this.move(this.isTop ? -1 : 1);
			}
		});
	}

	move(direction) {
		var newPosition = this.x + direction * this.speed;
		if (newPosition <= 0) {
			this.x = 0;
			return;
		}

		if (newPosition + this.width >= game.mainBoard.width) {
			this.x = game.mainBoard.width - this.width;
			return;
		}

		this.x = newPosition;
	}
}