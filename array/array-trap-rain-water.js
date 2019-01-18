/*
Input: An array of positive integers that represent the heights of bars in a bar chart.

Output: The number of "units" of water that the bar chart can hold.

Note that water "spills over" the sides if there's nothing to contain it. Formally, a cell 
can contain water if, and only if, it has a wall to its right and a wall to its left.

Input: [5, 3, 2, 1, 5]
Output: 9

Empty     Filled

#   #     #...#
#   #     #...#
##  #     ##..#
### #     ###.#
#####     #####

Input: [2, 1, 5, 1, 3]
Output: 3

Empty     Filled

  #         #
  #         #
  # #       #.#
# # #     #.#.#
#####     #####



#   # #   #
#   # #   #
##  # ##  #
### # ### #
###########


Algorithm: 
For each item in list, find the maximum value on its left, and right.
Take the min of those two values, and subtract itself (the base).
If that number is less than 0, do nothing, otherwise add the number to total.
*/

function calculate(datum) {
    var edge = datum.left < datum.right ? datum.left : datum.right,
        result = edge - datum.val;

    return result > 0 ? result : 0;
}

function countWater(arr) {
    var i,
        data = [],
        len = arr.length,
        leftVal = 0,
        rightVal = 0,
        result = 0;

    for(i=0; i<len; i++) {
        leftVal = arr[i] > leftVal ? arr[i] : leftVal;
        data[i] = {
            "left": leftVal,
            "val": arr[i]
        };
    }

    for(i=len-1; i>=0; i--) {
        rightVal = arr[i] > rightVal ? arr[i] : rightVal;
        data[i]["right"] = rightVal;
        result += calculate(data[i]);
    }

    return result;
}