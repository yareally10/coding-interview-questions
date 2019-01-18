/*
Given a value and list of coins, 
find the minimum number of coins needed to make the change, if possible.

Algorithm:
f(val) = min( f(val - coins[0]) + 1, f(val - coins[1]) + 1, ... )
*/

function makeChangeMinHelper(val, coins, memo) {
    if(val == 0) {
        return [];
    } else {
        var mins = [],
            nextVal = 0,
            currMin = Number.MAX_SAFE_INTEGER,
            currCoins = false;

        coins.forEach(function(coin) {
            nextVal = val - coin;
            if(nextVal >= 0) {
                if(!memo.hasOwnProperty(nextVal)) {
                    memo[nextVal] = makeChangeMinHelper(nextVal, coins, memo);
                }
                
                //add current coin into "path"
                if(Array.isArray(memo[nextVal])) {
                    mins.push(memo[nextVal].concat(coin));
                }
            }
        });

        mins.forEach(function(m) {
            if(Array.isArray(m)) {
                if(m.length < currMin) {
                    currMin = m.length;
                    currCoins = m;
                }
            }
        });

        return currCoins;
    }
}

function makeChangeMin(val, coins) {
    var memo = {},
        result = makeChangeMinHelper(val, coins, memo);

    console.log(memo);
    return result;
}
