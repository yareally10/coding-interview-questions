/*
Depth sum of a list

E.G. [1, 2, [3, [4]]] = 1*1 + 2*1 + (3 + 4*3)*2 = 33


Algorithm:
Go through the list recursively.
If the current list is empty, return 0. (End condition)
Otherwise, process the first element 
    If first element a list, increment level, recursive call on it
    Otherwise, first element is a number,
    multiply the first element value by current level, 
    add the rest of the list (recursive call on rest of list with same level)

Test:
depthSum([1, 2, [3, [4]]]);
*/

function depthSumHelper(arr, currLevel) {
    if(arr.length == 0) {
        return 0;
    } else {
        var first;
        if(Array.isArray(arr[0])) {
            first = depthSumHelper(arr[0], currLevel+1);
        } else {
            first = arr[0];
        }
        return first * currLevel + depthSumHelper(arr.slice(1), currLevel);
    }
}

function depthSum(arr) {
    return depthSumHelper(arr, 1);
}