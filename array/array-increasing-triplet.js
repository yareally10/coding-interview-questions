/**
 * Given an array of numbers, return an increasing triplet.
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var increasingTriplet = function(nums) {
  let smallest = Number.MAX_SAFE_INTEGER,
      smaller = Number.MAX_SAFE_INTEGER, 
      currArr = [];
  for (let i=0; i<nums.length; i++) {
    if (nums[i] < smallest) {
      smallest = nums[i];
    } else if (nums[i] < smaller && nums[i] > smallest) {
      smaller = nums[i];
      currArr = [smallest, smaller];
    } else if (nums[i] > smaller) {
      currArr.push(nums[i])
      return currArr;
    }
  }
  return [];
};

increasingTriplet([1,0,2,0,-1,3]);
