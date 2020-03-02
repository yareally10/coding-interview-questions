/*
Given weights and values of n items, put these items in a knapsack of capacity W.
Calculate the maximum total value in the knapsack. Cannot break items.



Algorithm:
f(capacity) = Max(
  (f(capacity - item1.weight) + item1.value), 
  (f(capacity - item2.weight) + item2.value), 
  ...)

Test: 
knapsackValue(16, [
  {weight: 1, value: 1},
  {weight: 3, value: 5},
  {weight: 7, value: 10},
  {weight: 15, value: 30}
])
*/

function knapsackHelper(capacity, items, memo) {
  if(capacity < 0) {
    return Number.MIN_SAFE_INTEGER;
  } else if (capacity == 0) {
    return 0;
  } else {
    let values = [],
        nextCap = 0;

    items.forEach(item => {
      nextCap = capacity - item.weight;
      nextCap = nextCap < 0 ? -1 : nextCap;
      if(!memo.hasOwnProperty(nextCap)) {
        memo[nextCap] = knapsackHelper(nextCap, items, memo);
      }
      values.push(memo[nextCap] + item.value);
    });

    console.log(memo);
    return Math.max(...values);
  }
}

function knapsackValue(capacity, items) {
  let memo = {};
  return knapsackHelper(capacity, items, memo);
}