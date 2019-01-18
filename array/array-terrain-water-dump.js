/*
[Currently incomplete]

Given an array represents the terrain, a number represents units of water to dump,
and a number represents the dump location, print out the terrain with water.

Example:
[5, 1, 2, 3, 4, 2, 1, 1, 4, 1, 2],
15,
6

+
+www+www+
+ww++www+
+w++++ww+w+
+++++++++++
*/


function initMatrix(row, col, val) {
    var i,
        arr = [];

    for(i=0; i<row; i++) {
        arr.push(col == 0 ? val : initMatrix(col, 0, val));
    }

    return arr;
}

function calculate(datum) {
    var edge = datum.left < datum.right ? datum.left : datum.right,
        result = edge - datum.val;

    return result > 0 ? result : 0;
}

function fillTerrainWithWater(data, terrain) {
    var max = data.max,
        i, 
        j, 
        edge,
        result = initMatrix(max, terrain.length, 0);

    for(i=max; i>0; i--) {
        for(j=0; j<terrain.length; j++) {
            if(i > data[j].val) {
                edge = data[j].left < data[j].right ? data[j].left : data[j].right;
                if(i > edge) {
                    result[max-i][j] = " ";
                } else {
                    result[max-i][j] = "w";
                }
            } else {
                result[max-i][j] = "+";
            }
        }
    }
    return result;
}

//------------------------------------------------

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