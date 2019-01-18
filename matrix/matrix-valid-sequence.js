/*
Given a matrix and a sequence of numbers. Check if the sequence is a valid path 
in the matrix. You can move in all four directions, but not diagonally. Also you
can move across walls, i.e. top row can go to the bottom row.

E.G.
[[1, 2, 3],
 [4, 5, 6],
 [7, 8, 9]
]

[7, 9, 8, 5, 4] => valid
[7, 9, 5, 4] => invalid

Test:
sequenceValidator(
[[1, 2, 3],
 [4, 5, 6],
 [7, 8, 9]],
[7, 9, 8, 5, 4])
*/

function generateNeighbors(matrix, row, col) {
    var maxRow = matrix.length,
        maxCol = matrix[0].length,
        coords;

    //create coordinates for neighbors
    //this could be expanded for different neighbor rules
    coords = [
        [row-1, col],
        [row, col-1], [row, col+1],
        [row+1, col]
    ];

    //make sure neighbors are inbound
    coords.map(function(c) {
        if(c[0] < 0) {
            c[0] += maxRow;
        }
        if(c[0] >= maxRow) {
            c[0] -= maxRow
        }
        if(c[1] < 0) {
            c[1] += maxCol;
        }
        if(c[1] >= maxCol) {
            c[1] -= maxCol
        }

        return c;
    });

    return coords;
}

function findElement(matrix, ele) {
    var maxRow = matrix.length,
        maxCol = matrix[0].length,
        i,
        j,
        coord = [];

    for(i=0; i<maxRow; i++) {
        for(j=0; j<maxCol; j++) {
            if(matrix[i][j] == ele) {
                coord = [i, j];
                return coord;
            }
        }
    }

    return coord;
}

function sequenceValidator(matrix, seq) {
    var next = findElement(matrix, seq[0]),
        i,
        s = 1,
        neighbors,
        n;

    if(next.length == 2) {
        while(s < seq.length) {
            //generate neighbors
            neighbors = generateNeighbors(matrix, next[0], next[1]);
            //reset next element
            next = [];
            //check if next in sequence is amongst neighbors and assign that neighbor to next
            for(i=0; i<neighbors.length; i++) {
                n = neighbors[i];
                if(matrix[n[0]][n[1]] == seq[s]) {
                    next = n;
                    break;
                }
            }
            //go to next in sequence, otherwise sequence is false
            if(next.length == 2) {
                s++;
            } else {
                return false;
            }
        }
        //entire sequence is checked, return true
        return true;
    } else {
        //first of sequence is not in the matrix
        return false;
    }
}