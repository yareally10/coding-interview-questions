/*
Given a value and list of coins, 
list the minimum number of coins needed to make the change, if possible.



Algorithm:
f(val) = min( f(val - coins[0]) + 1, f(val - coins[1]) + 1, ... )

Test:
makeChangeMin(67, [1, 5, 10, 25, 50]);
*/

function makeChangeMinHelper(val, coins, memo) {
  if(val == 0) {
    return [];
  } else {
    let minimums = [],
      nextVal = 0,
      currMin = Number.MAX_SAFE_INTEGER,
      currCoins = [];

    coins.forEach(coin => {
      nextVal = val - coin;
      if(nextVal >= 0) {
        if(!memo.hasOwnProperty(nextVal)) {
          memo[nextVal] = makeChangeMinHelper(nextVal, coins, memo);
        }
        
        //add current coin into "path"
        if(Array.isArray(memo[nextVal])) {
          minimums.push(memo[nextVal].concat(coin));
        }
      }
    });

    minimums.forEach(m => {
      if(Array.isArray(m) && m.length < currMin) {
        currMin = m.length;
        currCoins = m;
      }
    });

    return currCoins;
  }
}

function makeChangeMin(val, coins) {
  let memo = {};
  //console.log(memo);
  return makeChangeMinHelper(val, coins, memo);
}
