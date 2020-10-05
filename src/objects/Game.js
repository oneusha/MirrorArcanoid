import Board from './Board.js';
import Paddle from './Paddle.js';
import Ball from './Ball.js';

export default class Game {
	constructor(game) {
        this.game = game;
		this.balls = [];
        this.game.mainBoard = new Board(board);
		this.game.paddle = new Paddle(true);
		this.game.paddle2 = new Paddle(false);

        this.init();
        
        return this;
	}

	init() {
		board.addEventListener('click', (e) => {
			let r = Math.floor(Math.random() * 20) + 2,
		  	dx = Math.floor(Math.random() * 10) + 1,
		  	dy = Math.floor(Math.random() * 10) + 1;

		  let startX = e.x > this.game.mainBoard.width ? this.game.mainBoard.width - r : e.x;
		  let startY = e.y > this.game.mainBoard.width ? this.game.mainBoard.width - r : e.y;

			this.balls.push(new Ball(startX, startY, r, dx, dy));
		});
		
		window.addEventListener('resize', () => {
			this.game.mainBoard.setSize();
			this.game.mainBoard.render();
			this.game.paddle.draw();
		});

		this.render();
	}

	render() {
		this.game.mainBoard.clear();
		this.game.paddle.draw();
		this.game.paddle2.draw();
		this.balls.forEach((item) => {
			item.move();
		});

		requestAnimationFrame(this.render.bind(this));
	}
}