/*
Take steps. Given a total stairs to climb, 
and a list of number of steps you could take at once, 
calculate the number of ways to reach the top

Algorithm:
f(val) = f(val - steps[0]) + f(val - steps[1]) + ...
*/

function stairWaysHelper(val, steps, memo) {
    if(val < 0) {
        return 0;
    } else if (val == 0) {
        return 1;
    } else {
        var ways = 0,
            nextVal = 0;

        steps.forEach(function(num) {
            nextVal = val - num;
            nextVal = nextVal < 0 ? -1 : nextVal;
            if(!memo.hasOwnProperty(nextVal)) {
                memo[nextVal] = stairWaysHelper(nextVal, steps, memo);
            }
            ways += parsInt(memo[nextVal]);
        });
        return ways;
    }
}

function stairClimbWays(val, steps) {
    var memo = {};
    return stairWaysHelper(val, steps, memo);
}