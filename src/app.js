'use strict';

var game = {};

// Constants
const PI = Math.PI;
const BODY = document.querySelector('body');
const FIRST_COLOR = '#fd3488';
const SECOND_COLOR = '#ffffff';

class Board {
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

class Ball {
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

		this.x += this.dx;
		this.y += this.dy;
	}

	checkWalls(pos, axis) {
		return pos > game.mainBoard[axis] || pos < 0;
	}

	checkPaddle(x, y) {
		return y >= game.paddle.y && y <= game.paddle.y + game.paddle.height && x >= game.paddle.x && x <= game.paddle.x + game.paddle.width;
	}

	checkBoard(y) {
		return y > game.mainBoard.halfHeight;
	}
}

class Paddle {
	constructor() {
		this.height = 20;
		this.width = 1500;
		this.speed = 25;
		this.x = 0;
		this.y = 0;

		this.init();
	}

	init() {
		this.x = (game.mainBoard.width - this.width) / 2;
		this.y = game.mainBoard.halfHeight - this.height / 2;

		this.draw();
		this.control();
	}

	draw() {
		game.mainBoard.cx.fillStyle = SECOND_COLOR;
		game.mainBoard.cx.fillRect(this.x, this.y, this.width, this.height / 2);
		game.mainBoard.cx.fillStyle = FIRST_COLOR;
		game.mainBoard.cx.fillRect(this.x, this.y + this.height / 2, this.width, this.height / 2);
	}

	control() {
		window.addEventListener('keydown', (e) => {
			if (e.keyCode === 39) {
				this.move(1);
			}

			if (e.keyCode === 37) {
				this.move(-1);
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

class Game {
	constructor() {
		game.balls = [];
		game.mainBoard = new Board(board);
		game.paddle = new Paddle();

		this.init();
	}

	init() {
		board.addEventListener('click', (e) => {
			let r = Math.floor(Math.random() * 20) + 2,
		  	dx = Math.floor(Math.random() * 10) + 1,
		  	dy = Math.floor(Math.random() * 10) + 1;

		  let startX = e.x > game.mainBoard.width ? game.mainBoard.width - r : e.x;
		  let startY = e.y > game.mainBoard.width ? game.mainBoard.width - r : e.y;

			game.balls.push(new Ball(startX, startY, r, dx, dy));
		});
		
		window.addEventListener('resize', () => {
			game.mainBoard.setSize();
			game.mainBoard.render();
			game.paddle.draw();
		});

		setInterval(this.render.bind(this), 10);
	}

	render() {
		// game.mainBoard.clear();
		game.paddle.draw();
		game.balls.forEach((item) => {
			item.move();
		});
	}
}

new Game();