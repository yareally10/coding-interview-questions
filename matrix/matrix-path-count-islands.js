/*
Given a 2D matrix, find the number of islands. A group of connected 1s forms an island. 
For example, the below matrix contains 5 islands. (Neighbors include diagonal.)

Input : mat[][] = {{1, 1, 0, 0, 0},
                   {0, 1, 0, 0, 1},
                   {1, 0, 0, 1, 1},
                   {0, 0, 0, 0, 0},
                   {1, 0, 1, 0, 1}}
Output : 5

Algorithm:
Create an empty matrix to mark 1s visited.
Scan the matrix for 1s, for each 1 found, use DFS to scan for neighbors that are also 1
Mark all 1s visited 
Increment island count
Continue until all 1s in matrix have been visited

Test:
countIslands([
    [1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1]
]);
*/

function initMatrix(row, col, val) {
    var m = [], i;
    for(i=0; i<row; i++) {
        m.push(col == 0 ? val : initMatrix(col, 0, val));
    }
    return m;
}

function generateNeighbors(matrix, row, col) {
    var coords = [
        [row-1, col-1], [row-1, col], [row-1, col+1],
        [row, col-1], [row, col+1],
        [row+1, col-1], [row+1, col], [row+1, col+1]
    ];

    return coords.filter(function(e) {
        return e[0] >=0 && e[1] >= 0 && e[0] < matrix.length && e[1] < matrix[0].length;
    });
}

function DFS(matrix, row, col, visited) {
    if(matrix[row][col] == 1 && visited[row][col] != 1) {
        visited[row][col] = 1;
        var neighbors = generateNeighbors(matrix, row, col);
        neighbors.forEach(function(n) {
            DFS(matrix, n[0], n[1], visited);
        });
    }
}

function countIslands(matrix) {
    var count = 0,
        maxRow = matrix.length,
        maxCol = matrix[0].length,
        visited = initMatrix(maxRow, maxCol, 0),
        i, j;

    for(i=0; i<maxRow; i++) {
        for(j=0; j<maxCol; j++) {
            if(matrix[i][j] == 1 && visited[i][j] != 1) {
                DFS(matrix, i, j, visited);
                count++;
            }
        }
    }

    console.log(visited);

    return count;
}