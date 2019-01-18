/*
Print a given matrix in spiral form

Key:
Start with first row.
When going horizontally (row), iterate column, fix row
When going vertically (column), iterate row, fix column
Increment row counter after adding (to the right), 
Decrement row max after subracting (to the left)
Same for column

Test:
matrixSpiral([
    [1,  2,  3,  4,  5,  6], 
    [7,  8,  9,  10, 11, 12], 
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36]
])
*/

function matrixSpiral(matrix) {
    var row = matrix.length,
        col = matrix[0].length,
        i,
        r = 0,
        c = 0,
        result = [];

    while(r < row && c < col) {
        //first row
        for(i=c; i<col; i++) {
            result.push(matrix[r][i]);
        }
        r++;
        //last column
        for(i=r; i<row; i++) {
            result.push(matrix[i][col-1]);
        }
        col--;
        //last row
        if(r < row) {
            for(i=col-1; i>=c; i--) {
                result.push(matrix[row-1][i]);
            }
            row--;
        }
        //first column
        if(c < col) {
            for(i=row-1; i>=r; i--) {
                result.push(matrix[i][c]);
            }
            c++;
        }
    }

    return result;
}