import { FIRST_COLOR, SECOND_COLOR, PI } from '../consts.js';
import { game } from '../app.js';

export default class Ball {
	constructor(x=0, y=0, r=10, dx=1, dy=1) {
		this.x = x;
		this.dx = dx;
		this.y = y;
		this.dy = dy;
		this.r = r;

		return this;
	}

	draw() {
		game.mainBoard.cx.beginPath();
		game.mainBoard.cx.arc(this.x, this.y, this.r, 0, PI * 2, true);
		game.mainBoard.cx.closePath();
		game.mainBoard.cx.fillStyle = this.checkBoard(this.y) ? FIRST_COLOR : SECOND_COLOR;
		game.mainBoard.cx.fill();
	}

	move() {
		this.draw();
		if (this.checkWalls(this.x + this.dx + this.r, 'width')) {
			this.dx *= -1;
		}

		if (this.checkWalls(this.y + this.dy + this.r, 'height') || this.checkPaddle(this.x + this.dx, this.y + this.dy)) {
			this.dy *= -1;
		}

		if (this.checkPaddle(this.x + this.dx, this.y + this.dy)) {
			this.dy *= -1;
        }
        
        if (this.checkBricks()) {
            this.dx *= -1;
            this.dy *= -1;
        }

		this.x += this.dx;
		this.y += this.dy;
	}

	checkWalls(pos, axis) {
		return pos > game.mainBoard[axis] || pos < 0;
	}

	checkPaddle(x, y) {
		return (y >= game.paddle.y && y <= game.paddle.y + game.paddle.height && x >= game.paddle.x && x <= game.paddle.x + game.paddle.width) ||
			   (y >= game.paddle2.y && y <= game.paddle2.y + game.paddle2.height && x >= game.paddle2.x && x <= game.paddle2.x + game.paddle2.width);
    }
    
    checkBricks() {
		return game.bricks.some((brick) => {
            const ballPosX = this.x + this.r + this.dx;
            const ballPosY = this.y + this.r + this.dy;

            const intersectX = brick.x < ballPosX && brick.x + brick.width > ballPosX;
            const intersectY = brick.y < ballPosY && brick.y + brick.height > ballPosY;

			if (intersectX && intersectY) {
                return true;
            };
		});
    }

	checkBoard(y) {
		return y >= game.mainBoard.halfHeight;
	}
}