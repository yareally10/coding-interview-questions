/**
 * Given an array of numbers, return all possible permutations of array.
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  let result = permuteHelper(nums);
  return result;
};

function permuteHelper(nums) {
  if (nums == null || nums.length == 0) {
    return [];
  } else if (nums.length == 1) {
    return [nums];
  } else {
    let result = [];
    for (let i=0; i<nums.length; i++) {
      let num = nums[i], nextNums = nums.slice(), nextPerm;
      nextNums.splice(i, 1);
      nextPerm = permuteHelper(nextNums);
      nextPerm.forEach(p => {
        p.unshift(num)
        result.push(p);
      });
    }
    return result;
  }
}

permute([1, 2, 3]);