/**
 * Given an array of numbers, find all triplets that sums to zero.
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  const result = [], memo = {}, memoChecked = {};
  for (let i=0; i<nums.length-2; i++) {
    let tempArr = nums.slice(i+1), temp = nums[i], tempResult = [];
    if (!memoChecked.hasOwnProperty(temp)) {
      memoChecked[temp] = true;
      tempResult = twoSum(tempArr, 0 - temp);   //update this 0 to n for generic three sum
      tempResult.forEach(r => {
        insert(r, temp);
        let key = r.join();
        if (!memo.hasOwnProperty(key)) {
          result.push(r);
          memo[key] = true;
        }
      });
    }
  }
  return result;
};

var twoSum = function(nums, value) {
  //console.log(nums);
  //console.log(value);
  const memo = {}, result = [];
  for (let i=0; i<nums.length; i++) {
    let complement = value - nums[i];
    if (memo.hasOwnProperty(complement) && memo[complement] > 0) {
      memo[complement]--;
      let temp = nums[i] < complement ? [nums[i], complement] : [complement, nums[i]];
      result.push(temp);
    } else {
      if (memo.hasOwnProperty(nums[i])) {
        memo[nums[i]]++;        
      } else {
        memo[nums[i]] = 1;
      }
    }
  }
  return result;
}
       
function insert(arr, val) {
  if (val < arr[0]) {
    arr.unshift(val);
  } else if (val < arr[1]) {
    arr.splice(1, 0, val);
  } else {
    arr.push(val);
  }
}

threeSum([-1,0,1,2,-1,-4]);