/*
Given a matrix of 0s and 1s, find shortest path between the top left corner 
and bottom right, where 0 is passable. Can move in all four directions, but not 
diagonally.



Test:
findPath([
    [0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0],
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
        [row-1, col], 
        [row, col-1],[row, col+1],
        [row+1, col]
    ];

    return coords.filter(function(e) {
        return e[0] >= 0 && e[1] >= 0 && e[0] < matrix.length && e[1] < matrix[0].length;
    });
}

function findShortestPath(matrix) {
    var maxRow = matrix.length,
        maxCol = matrix[0].length,
        memo = initMatrix(maxRow, maxCol, Number.MAX_SAFE_INTEGER),
        queue = [],
        curr, 
        currNeighbors, 
        neighborVals;

    if(matrix[maxRow-1][maxCol-1] != 0) {
        return false;
    }
 
    memo[maxRow-1][maxCol-1] = 0;
    queue = generateNeighbors(matrix, maxRow-1, maxCol-1);
    while(queue.length > 0) {
        curr = queue.shift();
        if(matrix[curr[0]][curr[1]] == 0 && memo[curr[0]][curr[1]] == Number.MAX_SAFE_INTEGER) {
            neighborVals = [];
            currNeighbors = generateNeighbors(matrix, curr[0], curr[1]);
            currNeighbors.forEach(function(n) {
                queue.push(n);
                neighborVals.push(memo[n[0]][n[1]]);
            });
            memo[curr[0]][curr[1]] = Math.min(...neighborVals) + 1;
            //stop if we processed the starting point
            if(curr[0] == 0 && curr[1] == 0) {
                break;
            }
        }
    }

    console.log(memo);

    return memo[0][0] < Number.MAX_SAFE_INTEGER ? memo[0][0] : false;
}
