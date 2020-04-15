/**
Build memory card game in javascript
*/

const CARD_VALUES = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const RANDOMIZE_FACTOR = 7;

function Board(x, y) {
	this.rows = x;
	this.columns = y;
	this.matrix = [];
	this.cardPicked = null;
	this.cardPickedX = 0;
	this.cardPickedY = 0;
	this.turnCount = 0;
	this.unmatchedCards = 0;
}

function Card(val) {
	this.value = val;
	this.matched = false;
}

Board.prototype = {
	init: function(x, y) {
		x = parseInt(x);
		y = parseInt(y);

		//validate input
		if ((x <= 0 || y <= 0) && x % 2 != 0 && y % 2 != 0) {
			return false;
		}

		//initialize variables
		this.rows = x;
		this.columns = y;
		this.cardPicked = null;
		this.cardPickedX = -1;
		this.cardPickedY = -1;
		this.turnCount = 0;
		this.unmatchedCards = x * y;

		//generate possible values for cards
		let i, j, count;
		const possibleValues = [], num = x * y / 2;
		for(count=0; count<num; count++) {
			let temp = Math.floor(Math.random()*CARD_VALUES.length);
			possibleValues.push(CARD_VALUES[temp]);
		}
		count = 0;

		this.matrix = [];
		//initialize matrix
		for(i=0; i<this.rows; i++) {
			for(j=0; j<this.columns; j++) {
				if (j == 0) {
					this.matrix.push([]);
				}
				if (count >= num) {
					count = 0;
				}
				let card = new Card(possibleValues[count]);
				this.matrix[i].push(card);
				count++;
			}
		}

		//randomize matrix
		for(i=0; i<RANDOMIZE_FACTOR*this.rows; i++) {
			let tempX1 = Math.floor(Math.random()*this.rows),
					tempY1 = Math.floor(Math.random()*this.columns),
					tempX2 = Math.floor(Math.random()*this.rows),
					tempY2 = Math.floor(Math.random()*this.columns),
					temp = this.matrix[tempX1][tempY1];
			this.matrix[tempX1][tempY1] = this.matrix[tempX2][tempY2];
			this.matrix[tempX2][tempY2] = temp;
		}
	},
	show: function() {
		const result = []
		for(let i=0; i<this.rows; i++) {
			for(let j=0; j<this.columns; j++) {
				if (j == 0) {
					result.push([]);
				}
				let val = this.matrix[i][j].matched ? this.matrix[i][j].value : 'X'
				result[i].push(val);
			}
		}
		return result;
	},
	showValues: function() {
		const result = []
		for(let i=0; i<this.rows; i++) {
			for(let j=0; j<this.columns; j++) {
				if (j == 0) {
					result.push([]);
				}
				result[i].push(this.matrix[i][j].value);
			}
		}

		return result;
	},
	click: function(x, y) {
		x = parseInt(x);
		y = parseInt(y);
		//validate input
		if (x >= this.rows || y >= this.columns || this.matrix[x][y].matched ||
			  (x == this.cardPickedX && y == this.cardPickedY)) {
			return false;
		}

		if (this.cardPicked == null) {
			this.cardPicked = this.matrix[x][y];
			this.cardPickedX = x;
			this.cardPickedY = y;
		} else {
			if (this.cardPicked.value == this.matrix[x][y].value) {
				this.cardPicked.matched = true;
				this.matrix[x][y].matched = true;
				this.unmatchedCards -= 2;
			}
			this.cardPicked = null;
			this.cardPickedX = -1;
			this.cardPickedY = -1;
			this.turnCount++;
			return this.hasWon();
		}
	},
	hasWon: function() {
		if (this.unmatchedCards === 0) {
			console.log("You've won!");
			return this.turnCount;
		} else {
			return false;
		}
	}
}

var board = new Board();
board.init(4, 4);
console.log(board.show());
