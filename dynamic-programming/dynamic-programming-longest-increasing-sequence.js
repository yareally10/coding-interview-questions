/**
 * Given an array of numbers, return the longest increasing sequence.
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var longestIncreasingSequence = function(nums) {
  if (nums.length == 0) {
    return [];
  }
  const memo = new Array(nums.length);
  let result = [nums[0]];
  memo[0] = result;
  for (let i=1; i<nums.length; i++) {
    let currMax = [];
    for (let j=0; j<i; j++) {
      if (nums[i] > nums[j]) {
        currMax = memo[j].length > currMax.length ? memo[j] : currMax;
      }
    }
    memo[i] = currMax.concat(nums[i]);
    result = memo[i].length > result.length ? memo[i] : result;
  }
  console.log(memo);
  return result;
};