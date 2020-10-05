import { FIRST_COLOR, SECOND_COLOR, PI } from '../consts.js';
import { game } from '../app.js';

export default class Brick {
	constructor(x = 0, y = 0, i, size) {
		this.x = x;
		this.y = y;
		this.width = size;
		this.height = size;
		this.i = i;
		this.isHidden = false;

		this.draw();

		return this;
	}

	draw() {
		if (this.isHidden) {
			return;
		}

		this.isHidden = this.checkBalls();


		game.mainBoard.cx.fillStyle = this.checkBoard(this.y) ? FIRST_COLOR : SECOND_COLOR;
		game.mainBoard.cx.fillRect(this.x, this.y, this.width, this.height);
		game.mainBoard.cx.fillStyle = !this.checkBoard(this.y) ? FIRST_COLOR : SECOND_COLOR;
		game.mainBoard.cx.font = "10px Georgia";
		game.mainBoard.cx.textAlign = "center"; 
		game.mainBoard.cx.textBaseline = "middle";
		game.mainBoard.cx.fillText(this.i, this.x + this.width / 2, this.y + this.height / 2);
	}

	checkBoard(y) {
		return y >= game.mainBoard.halfHeight;
	}

	// move() {
	// 	this.draw();

	// 	// if (this.checkWalls(this.y + this.dy + this.r, 'height') || this.checkPaddle(this.x + this.dx, this.y + this.dy)) {
	// 	// 	this.dy *= -1;
	// 	// }

	// 	if (this.checkPaddle(this.x + this.dx, this.y + this.dy)) {
	// 		this.dy *= -1;
	// 	}

	// 	this.x += this.dx;
	// 	this.y += this.dy;
	// }

	checkBalls(x, y) {
		return game.balls.some((ball) => {
			const ballPosY = ball.y + ball.r + ball.dy;
			const ballPosX = ball.x + ball.r + ball.dx;

			return ballPosY > this.y && ballPosY < this.y + this.height && ballPosX > this.x && ballPosX < this.x + this.width;
		})
	}

	// checkBoard(y) {
	// 	return y > game.mainBoard.halfHeight;
	// }
}