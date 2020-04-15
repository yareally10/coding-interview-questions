/**
Roate matrix in place by 90 degrees clockwise.
*/

var rotate = function(matrix) {
  let x, y, N = matrix.length, temp;
  for (x=0; x<Math.floor(N/2); x++) {
    for (y=x; y<N-1-x; y++) {
      //save top left
      temp = matrix[x][y];
      //bottom left to top left
      matrix[x][y] = matrix[N-1-y][x];
      //printMatrix(matrix);
      
      //bottom right to bottom left
      matrix[N-1-y][x] = matrix[N-1-x][N-1-y];
      //printMatrix(matrix);

      //top right to bottom right
      matrix[N-1-x][N-1-y] = matrix[y][N-1-x];
      //printMatrix(matrix);
      
      //top left (temp) to top right
      matrix[y][N-1-x] = temp;
      //printMatrix(matrix);
    }
  }
};

function printMatrix(matrix) {
  for(let i=0; i<matrix.length; i++) {
    console.log(matrix[i]);
  }
  console.log("");
}

rotate([[1,2,3],[4,5,6],[7,8,9]]);