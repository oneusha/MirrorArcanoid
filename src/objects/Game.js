import Board from './Board.js';
import Paddle from './Paddle.js';
import Ball from './Ball.js';
import Brick from './Brick.js';

const BRICKS_COUNT = 100;
const BRICKS_ROWS = 10;
const BRICKS_GAP = 10;
const BRICK_SIZE = 30;
const BRICKS_COLUMNS = BRICKS_COUNT / BRICKS_ROWS;

export default class Game {
	constructor(game) {
        this.game = game;
        this.game.balls = [];
        this.game.bricks = [];
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

			this.game.balls.push(new Ball(startX, startY, r, dx, dy));
        });
        
        const bricksOffset = BRICKS_GAP + BRICK_SIZE;
        const bricksBaseX = this.game.mainBoard.width / 2 - bricksOffset * BRICKS_COLUMNS / 2;
        const bricksBaseY = this.game.mainBoard.height / 2 - bricksOffset * BRICKS_ROWS / 2;
        
        for (let i = 1; i <= BRICKS_COUNT; i++) {
            this.game.bricks.push(
                new Brick(
                    bricksBaseX + Math.ceil((i - 1) % BRICKS_COLUMNS) * bricksOffset, 
                    bricksBaseY + Math.ceil(i / BRICKS_COLUMNS) * bricksOffset,
                    i,
                    BRICK_SIZE
                )
            );
        }
		
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
		this.game.balls.forEach((item) => {
			item.move();
        });
        this.game.bricks = this.game.bricks.filter((brick) => !brick.isHidden);
        this.game.bricks.forEach((item) => {
			item.draw();
		});

		requestAnimationFrame(this.render.bind(this));
	}
}