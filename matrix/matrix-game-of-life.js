/*
Game of life.
Update each cell based on its neighbors' values, 1 - alive, 0 - dead.
Any live cell with fewer than two live neighbors dies, as if caused by under population.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by overpopulation.
Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
*/

/*
gameOfLife([
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0]
]);
*/

function initMatrix(row, col, val) {
    var i,
        arr = [];

    for(i=0; i<row; i++) {
        arr.push(col == 0 ? val : initMatrix(col, 0, val));
    }

    return arr;
}

function generateNeighbors(matrix, row, col) {
    var coords = [
        [row-1, col-1], [row-1, col], [row-1, col+1],
        [row, col-1], [row, col+1],
        [row+1, col-1], [row+1, col], [row+1, col+1]
    ],
    maxRow = matrix.length,
    maxCol = matrix[0].length;

    return coords.map(function(e) {
        if(e[0] < 0) {
            e[0] += maxRow;
        }
        if(e[0] >= maxRow) {
            e[0] -= maxRow;
        }
        if(e[1] < 0) {
            e[1] += maxCol;
        }
        if(e[1] >= maxCol) {
            e[1] -= maxCol;
        }

        return e;
    });
}


function gameOfLife(matrix) {
    var maxRow = matrix.length,
        maxCol = matrix[0].length,
        nextState = initMatrix(maxRow, maxCol, 0),
        i, j,
        currNeighbors, curSum;

    for(i=0; i<maxRow; i++) {
        for(j=0; j<maxCol; j++) {
            currNeighbors = generateNeighbors(matrix, i, j);
            currSum = 0;
            currNeighbors.forEach(function(n) {
                currSum += matrix[n[0]][n[1]];
            });

            //update next state based on sum
            if(currSum < 2) {
                nextState[i][j] = 0;
            } else if(currSum == 3) {
                nextState[i][j] = 1;
            } else if(currSum == 2 || currSum == 3) {
                nextState[i][j] = matrix[i][j];
            } else if(currSum > 3) {
                nextState[i][j] = 0;
            }
        }
    }

    return nextState;
}