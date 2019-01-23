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
        leftDepth = data[location].total,
        rightDepth = data[location].total,
        leftDistance,
        rightDistance,
        newPos = -1;

    //scan left
    i = location-1;
    while(i > 0 && data[i].total <= leftDepth) {
        if(data[i].total < leftDepth && data[i].total < data[i].edge) {
            leftDepth = data[i].total;
            leftSpill = i;
        }
        if(data[i].val == data[location].total) {
            leftBarrier = true;
        }
        i--;
    }

    //if left end is reached or if current value is greater than water level, left barrier is true
    if(i == 0 || data[i].val > leftDepth) {
        leftBarrier = true;
    }

    //scan right
    i = location+1;
    while(i<terrain.length-1 && data[i].total <= rightDepth) {
        if(data[i].total < rightDepth && data[i].total < data[i].edge) {
            rightDepth = data[i].total;
            rightSpill = i;
        }
        if(data[i].val == data[location].total) {
            rightBarrier = true;
        }
        i++;
    }

    //if right end is reached, right barrier is true
    if(i == terrain.length-1 || data[i].val > rightDepth) {
        rightBarrier = true;
    }

    //process new location
    if(leftSpill > 0 || rightSpill > 0) {
        //if neither or both barriers are crossed, use distance to determine spill location
        if((leftBarrier == false && rightBarrier == false) || 
           (leftBarrier == true && rightBarrier == true)) {

            leftDistance = leftSpill > 0 ? location - leftSpill : Number.MAX_SAFE_INTEGER;
            rightDistance = rightSpill > 0 ? rightSpill - location : Number.MAX_SAFE_INTEGER;
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
        return false;
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
                    return dropWater(data, terrain, spillLocation);
                } else {
                    return false;
                }
            }
        } else {
            spillLocation = waterSpill(data, terrain, location);
            if(spillLocation > 0) {
                return dropWater(data, terrain, spillLocation);
            } else {
                return false;
            }
        }

        return true;
    }
}

function dumpWater(terrain, amount, location) {
    var data = process(terrain),
        result = "";

    //check drop location for boundary condition
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
        if(!dropWater(data, terrain, location)) {
            break;
        }
        //show state after each drop; testing only
        //result = printTerrain(data, terrain);
        console.log(printTerrain(data, terrain));
    }

    result = printTerrain(data, terrain);
    return result;
}