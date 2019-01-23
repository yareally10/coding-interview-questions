/*
Given a list of points, find the smallest rectangle area formed by those points 
as corners. All rectangles are parallel to x and y axis



Algorithm:
Go through the list, create a hash table,
    where the key is the x value, and the data is a list of corresponding y values
Sort the keys, and get a sorted list of x values.
For each key in the hash table, sort the y values.
Use a double for loop, loop through each pair of x value combinations
    For each x pairs, find the intersect of y values list
    If the intersect has at least two values, a rectangle is found, calculate area
    If the area is less than the current smallest area, update
Return result once all x value pairs are processed.

Test:
smallestRectangle([
    [0, 0],
    [1, 3],
    [-2, 5],
    [1, -2],
    [1, 7],
    [2, -2],
    [2, 3],
    [2, 7],
    [0, 1],
    [1, 0],
    [3, 3],
    [2, 4],
    [3, 4]
]);
*/

//find intersection of two sorted arrays
function findIntersect(arr1, arr2) {
    var result = [],
        i = 0,
        j = 0,
        len1 = arr1.length,
        len2 = arr2.length;

    while(i<len1 && j<len2 && result.length < 2) {
        if(arr1[i] == arr2[j]) {
            result.push(arr1[i]);
            i++;
            j++
        } else if(arr1[i] < arr2[j]) {
            i++;
        } else {
            j++;
        }
    }

    return result;
}

function smallestRectangle(arr) {
    var edges = {},
        xVals = [],
        xCount = 0,
        yVals = [],
        i,
        j,
        len = arr.length,
        currSmallestArea = Number.MAX_SAFE_INTEGER,
        area = 0,
        points = [];

    for(i=0; i<len; i++) {
        if(edges.hasOwnProperty(arr[i][0])) {
            edges[arr[i][0]].push(arr[i][1]);
        } else {
            edges[arr[i][0]] = [arr[i][1]];
        }
    }

    Object.keys(edges).sort().forEach(function(key) {
        edges[key] = edges[key].sort();
        xVals.push(parseInt(key));
    });
    xCount = xVals.length;

    for(i=0; i<xCount-1; i++) {
        for(j=i+1; j<xCount; j++) {
            //for each possible xVal pairs, find yVals
            yVals = findIntersect(edges[xVals[i]], edges[xVals[j]]);

            //if more than two yVals exist
            if(yVals.length == 2) {
                area = (xVals[j] - xVals[i]) * (yVals[1] - yVals[0]);
                if (area < currSmallestArea) {
                    currSmallestArea = area;
                    points = [
                        [xVals[i], yVals[0]],
                        [xVals[i], yVals[1]],
                        [xVals[j], yVals[0]],
                        [xVals[j], yVals[1]]
                    ];
                }
            }
        }
    }

    return points
}