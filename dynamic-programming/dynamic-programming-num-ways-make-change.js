/*
Given a value and a list of coin values, 
find the number of ways to make the value using the coins.


Algorithm:
Initialize an array from 0 to val, with memo[0] = 1 (1 way to make 0)
For each coin, loop through the array
    If the current index (pretend value, i) is greater than or equal to coin value
        increment array value at current index (i) with array value at [i - coin]
Return last value of array
*/

function makeChange(val, coins) {
    let i,
        memo = [1];

    //initialize memo
    for(i=1; i<=val; i++) {
        memo.push(0);
    }    

    coins.forEach(function(coin) {
        for(i=1; i<=val; i++) {
            if(i >= coin) {
                memo[i] += memo[i - coin];
            }
        }
        //console.log(memo);
    });

    return memo[val];
}
