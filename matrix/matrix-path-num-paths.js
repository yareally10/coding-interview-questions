/*
Given a matrix, find number of paths from top left to lower right, 
where 1 is passible and 0 not. Can only move down and right.

Test:
numberOfPaths([
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1]
]);
*/

function initMatrix(row, col, val) {
    var arr = [], i;

    for(i=0; i<row; i++) {
        arr.push(col == 0 ? val : initMatrix(col, 0, val));
    }

    return arr;
}

function numberOfPaths(a) {
    // Write your code here
    var maxRow = a.length,
        maxCol = a[0].length,
        paths = initMatrix(maxRow, maxCol, 0),
        i, j;

    //update top left cell
    paths[0][0] = a[0][0];

    //update first column
    for(i=1; i<maxRow; i++) {
        paths[i][0] = a[i][0] == 1 ? paths[i-1][0] : 0
    }

    //update first row
    for(j=1; j<maxCol; j++) {
        paths[0][j] = a[0][j] == 1 ? paths[0][j-1] : 0;
    }

    //update rest of matrix
    for(i=1; i<maxRow; i++) {
        for(j=1; j<maxCol; j++) {
            if(a[i][j] == 1) {
                paths[i][j] = paths[i-1][j] + paths[i][j-1];
            }
        }
    }

    console.log(paths);
    return paths[maxRow-1][maxCol-1];
}
