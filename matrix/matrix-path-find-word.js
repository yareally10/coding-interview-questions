/*
Given a 2D array of characters and a string, return the number of times the 
string occurs in the grid, with no overlap. Words are considered contiguous if 
the next letter in the word is up, down, left, or right of the current letter. 
For example, suppose the grid is:

x x x p
p o o o
o l d l
d e x e
s s e s
o x r p

If given the word "poodle", the function should return 4. For "espresso", the 
function should return 1.


Algorithm:
For each letter that matches the first letter of the word, do BFS on all its 
neighbors for next letter.
Repeat until a mismatch (fail) or the entire word is found (success).
Do this for all nodes in matrix.

Tests:
findWord([
["x", "x", "x", "p"],
["p", "o", "o", "o"],
["o", "l", "d", "l"],
["d", "e", "x", "e"],
["s", "s", "e", "s"],
["o", "x", "r", "p"]
],
"google");
*/

function zeros(row, col) {
    var i,
        arr = [];

    for(i=0; i<row; i++) {
        arr.push(col == 0 ? 0 : zeros(col, 0));
    }

    return arr;
}

function generateNeighbors(row, col) {
    return [
        [row-1, col], 
        [row, col-1],[row, col+1],
        [row+1, col],
    ];
}

function isValidNeighbor(matrix, row, col) {
    var maxRow = matrix.length,
        maxCol = matrix[0].length;

    return row >= 0 && col >= 0 && row < maxRow && col < maxCol;
}

function findWordHelper(matrix, word, row, col, visited, path, index) {
    var neighbors = [], val = 0;

    //already visited this node or letter does not match
    if(visited[row][col] == 1 || matrix[row][col] != word[index] || index >= word.length) {
        return 0;
    } else {
        visited[row][col] = 1;
        path += matrix[row][col] + "[" + row + "," + col + "] ";
        //if end of word reached, return path
        if(index == word.length - 1) {
            console.log(path);
            return 1;
        }
        //otherwise visit neighbors
        neighbors = generateNeighbors(row, col);
        neighbors.forEach(function(n) {
            if(isValidNeighbor(matrix, n[0], n[1])) {
                val += findWordHelper(matrix, word, n[0], n[1], visited, path, index+1);
            }
        });
        return val;
    }
}

function findWord(matrix, word) {
    var maxRow = matrix.length,
        maxCol = matrix[0].length,
        i, j, visited, path,
        result = 0;

    for(i=0; i<maxRow; i++) {
        for(j=0; j<maxCol; j++) {
            if(matrix[i][j] == word[0]) {
                visited = zeros(maxRow, maxCol);
                result += findWordHelper(matrix, word, i, j, visited, "", 0);
            }
        }
    }

    return result;
}