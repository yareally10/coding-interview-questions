/*
[This is not a 45min problem.]

Given an array represents the terrain, a number represents units of water to 
dump, and a number represents the dump location (array index), print out the 
terrain with water.

Example:
Input:
[5, 1, 2, 3, 4, 2, 1, 1, 4, 1, 2],
15,
6

Output:
+
+www+www+
+ww++www+
+w++++ww+w+
+++++++++++

Test:
dumpWater([5, 1, 2, 3, 4, 2, 1, 1, 4, 1, 2], 15, 6);
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
        [row, col-1], [row, col+1],
        [row+1, col]
    ];

    return coords.filter(function(e) {
        return e[0] >=0 && e[1] >= 0 && e[0] < matrix.length && e[1] < matrix[0].length;
    });
}

function process(arr) {
    var i,
        data = [],
        len = arr.length,
        leftVal = 0,
        rightVal = 0,
        max = 0;

    for(i=0; i<len; i++) {
        leftVal = arr[i] > leftVal ? arr[i] : leftVal;
        data[i] = {
            "left": leftVal,
            "val": arr[i],
            "total": arr[i]
        };
        max = arr[i] > max ? arr[i] : max;
    }

    for(i=len-1; i>=0; i--) {
        rightVal = arr[i] > rightVal ? arr[i] : rightVal;
        data[i]["right"] = rightVal;
        data[i]["edge"] = data[i].left < data[i].right ? data[i].left : data[i].right;
    }

    data['max'] = max;

    return data;
}

function calculate(datum) {
    var result = datum.edge - datum.val;

    return result > 0 ? result : 0;
}

function generateTerrain(data, terrain, location) {
    var max = data.max,
        i, 
        j, 
        result = initMatrix(max, terrain.length, 0);

    for(i=max; i>0; i--) {
        for(j=0; j<terrain.length; j++) {
            if(i > data[j].val) {
                //water cannot go above dump location's edge
                if(i > data[location].edge) {
                    result[max-i][j] = "x";
                } else {
                    //water cannot go above current point's edge
                    if(i > data[j].edge) {
                        result[max-i][j] = "x";
                    } else {
                        //if current point's edge is higher than dump location's, water can't go here
                        if(data[j].edge > data[location].edge) {
                            result[max-i][j] = "x";
                        } else {
                            //water can go here
                            result[max-i][j] = " ";
                        }
                    }
                }
            } else {
                //walls
                result[max-i][j] = "+";
            }
        }
    }
    return result;
}

function findLakes(map) {
    var maxRow = map.length,
        maxCol = map[0].length,
        visited = initMatrix(maxRow, maxCol, 0),
        i,
        j,
        queue = [],
        currNeighbors = [],
        lakes = [],
        lakeCount = 0,
        lake,
        lakeLeftBound = 0,
        lakeRightBound = 0,
        lakeDepth = 0,
        deepestPoint = [],
        lakeArea = 0;

    for(i=0; i<maxRow; i++) {
        for(j=0; j<maxCol; j++) {
            if(map[i][j] == ' ' && visited[i][j] == 0) {
                //found start of a lake
                lake = {};
                lakeLeftBound = j;
                lakeRightBound = j;
                lakeDepth = i;
                deepestPoint = [i, j];
                lakeArea = 1;
                queue = generateNeighbors(map, i, j);
                visited[i][j] = 1;

                //explore lake
                while(queue.length > 0) {
                    curr = queue.shift();
                    if(map[curr[0]][curr[1]] == ' ' && visited[curr[0]][curr[1]] == 0) {
                        visited[curr[0]][curr[1]] = 1;
                        lakeLeftBound = curr[1] < lakeLeftBound ? curr[1] : lakeLeftBound;
                        lakeRightBound = curr[1] > lakeRightBound ? curr[1] : lakeRightBound;
                        lakeDepth = curr[0] > lakeDepth ? curr[0] : lakeDepth;
                        
                        lakeArea++;
                        //add current neighbors to queue
                        queue = queue.concat(generateNeighbors(map, curr[0], curr[1]));
                    }
                }
                lake = {
                    "left": lakeLeftBound,
                    "right": lakeRightBound,
                    "depth": lakeDepth,
                    "area": lakeArea
                }
                lakes.push(lake);
                lakeCount++;
            }
        }
    }

    return lakes;
}


function printMap(map) {
    var result = "";

    map.forEach(function(row) {
        result += row.join("");
        result += "\n";
    });

    return result;
}

function findLake(lakesData, location) {
    var lake = null,
        minLeftDistance = Number.MAX_SAFE_INTEGER,
        minRightDistance = Number.MAX_SAFE_INTEGER,
        currLeftDistance,
        currRightDistance,
        leftLake = null,
        rightLake = null,
        i;

    for(i=0; i<lakesData.length; i++) {
        if(lakesData[i].left <= location && lakesData[i].right >= location) {
            //lake found
            lake = lakesData[i];
            lake["id"] = i;
            break;
        } else {
            if(lakesData[i].right < location) {
                currLeftDistance = location - lakesData[i].right;
                if(currLeftDistance < minLeftDistance) {
                    minLeftDistance = currLeftDistance;
                    leftLake = lakesData[i];
                    leftLake["id"] = i;
                }
            } else if(lakesData[i].left > location) {
                currRightDistance = lakesData[i].left - location;
                if(currRightDistance < minRightDistance) {
                    minRightDistance = currRightDistance;
                    rightLake = lakesData[i];
                    rightLake["id"] = i;
                }
            }
        }
    }

    if(lake == null) {
        lake = minLeftDistance < minRightDistance ? leftLake : rightLake;
    }

    return lake;
}

function fillLake(map, lake, location, amount) {

}

function dumpWater(terrain, amount, location) {
    var data = process(terrain),
        map = generateTerrain(data, terrain, location),
        lakesData = findLakes(map),
        waterDumped = 0,
        waterRemain,
        waterToFill,
        currLake,
        result = "",
        i;

    console.log(map);
    console.log(lakesData);

    while(waterDumped < amount) {
        waterRemain = amount - waterDumped;
        currLake = findLake(lakesData, location);
        //remove current lake from rotation
        lakesData.splice(currLake.id, 1);

        //fill amount of water remaining or the entire lake
        if(currLake.area <= waterRemain) {
            waterToFill = currLake.area;
        } else {
            waterToFill = waterRemain;
        }

        fillLake(map, currLake, location, waterToFill);
        //update water dumped
        waterDumped += currLake.area;
    }

    result = printMap(map);

    return result;
}


//-----------------------------------------------------------------------------
//The following is an attempt at solving this problem without using a 2D matrix
//It is still incomplete due to a greedy scanning algorithm.
//-----------------------------------------------------------------------------

function process(arr) {
    var i,
        data = [],
        len = arr.length,
        leftVal = 0,
        rightVal = 0,
        max = 0;

    for(i=0; i<len; i++) {
        leftVal = arr[i] > leftVal ? arr[i] : leftVal;
        data[i] = {
            "left": leftVal,
            "val": arr[i],
            "total": arr[i]
        };
        max = arr[i] > max ? arr[i] : max;
    }

    for(i=len-1; i>=0; i--) {
        rightVal = arr[i] > rightVal ? arr[i] : rightVal;
        data[i]["right"] = rightVal;
        data[i]["edge"] = data[i].left < data[i].right ? data[i].left : data[i].right;
    }

    data['max'] = max;

    return data;
}

function printTerrain(data, terrain) {
    var max = data.max,
        i,
        j,
        result = "";

    for(i=max; i>0; i--) {
        for(j=0; j<terrain.length; j++) {
            if(i > data[j].total) {
                result += " ";
            } else {
                if(i > data[j].val) {
                    result += "w";
                } else {
                    result += "+";
                }
            }
        }
        result += "\n";
    }

    return result;
}

function waterSpill(data, terrain, location) {
    var i,
        leftSpill = -1,
        rightSpill = -1,
        leftBarrier = false,
        rightBarrier = false,
        leftDistance,
        rightDistance,
        newPos = -1;

    //scan left
    for(i=location-1; i>0; i--) {
        if(data[i].val > data[location].total) {
            leftSpill = -1;
            leftBarrier = true;
            break;
        } else {
            //found hole on the left
            if(data[i].total < data[location].total) {
                leftSpill = i;
                break;
            }
            if(data[i].val == data[location].total) {
                leftBarrier = true;
            }
        }
    }
    //if left end is reached, left barrier is true
    if(i == 0) {
        leftBarrier = true;
    }

    //scan right
    for(i=location+1; i<terrain.length-1; i++) {
        if(data[i].val > data[location].total) {
            rightSpill = -1;
            rightBarrier = true;
            break;
        } else {
            //found hole on the right
            if(data[i].total < data[location].total) {
                rightSpill = i;
                break;
            }
            if(data[i].val == data[location].total) {
                rightBarrier = true;
            }

        }
    }
    //if right end is reached, right barrier is true
    if(i == terrain.length-1) {
        rightBarrier = true;
    }

    //process new location
    if(leftSpill > 0 || rightSpill > 0) {
        //if neither or both barriers are crossed, use distance to determine spill location
        if((leftBarrier == false && rightBarrier == false) || (leftBarrier == true && rightBarrier == true)) {
            leftDistance = leftSpill != -1 ? location - leftSpill : Number.MAX_SAFE_INTEGER,
            rightDistance = rightSpill != -1 ? rightSpill - location : Number.MAX_SAFE_INTEGER,
            newPos = leftDistance < rightDistance ? leftSpill : rightSpill;
        } else if(leftBarrier == false) {
            newPos = leftSpill;
        } else if(rightBarrier == false) {
            newPos = rightSpill;
        }
    }

    return newPos;
}

function dropWater(data, terrain, location) {
    if(location == 0 || location == terrain.length-1) {
        return;
    } else {
        var point = data[location],
            leftPoint = data[location-1],
            rightPoint = data[location+1],
            spillLocation;

        if(point.total <= leftPoint.total && point.total <= rightPoint.total) {
            if(point.edge > point.total) {
                point.total++;
            } else {
                spillLocation = waterSpill(data, terrain, location);
                if(spillLocation > 0) {
                    dropWater(data, terrain, spillLocation);
                }
            }
        } else {
            spillLocation = waterSpill(data, terrain, location);
            if(spillLocation > 0) {
                dropWater(data, terrain, spillLocation);
            }
        }
    }
}

function dumpWater(terrain, amount, location) {
    var data = process(terrain),
        maxHold = 0,
        map,
        waterToRemove,
        result = "";

    //check location for boundary condition
    if(location == 0 || location == terrain.length-1) {
        var lCheck = location == 0 ? location+1 : location-1;
        if(data[lCheck].val > data[location].val) {
            result = printTerrain(data, terrain);
            return result;
        } else {
            location = lCheck;
        }
    }

    for(var i=0; i<amount; i++) {
        dropWater(data, terrain, location);
        result = printTerrain(data, terrain);
        console.log(result);
    }

    return result;
}