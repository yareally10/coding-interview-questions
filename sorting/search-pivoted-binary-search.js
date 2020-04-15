/**
 * Given a sorted array, that is rotated (the smallest item is in middle of array).
 * Find the target in this array. Algorithm should run in O(logN) time.
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let pivot = findPivot(nums, 0, nums.length-1);
  //console.log(pivot);
  if (pivot == -1) {
    return binarySearch(nums, 0, nums.length-1, target);
  } else if (nums[pivot] == target) {
    return pivot;
  } else if (nums[0] <= target) {
    return binarySearch(nums, 0, pivot-1, target);
  } else {
    return binarySearch(nums, pivot+1, nums.length-1, target);
  }
};

function binarySearch(nums, low, high, target) {
  let middle = Math.floor((high+low)/2);
  if (high < low) {
    return -1;
  } else if (nums[middle] == target) {
    return middle;
  } else if (nums[middle] < target) {
    return binarySearch(nums, middle+1, high, target);
  } else {
    return binarySearch(nums, low, middle-1, target);
  }
}

function findPivot(nums, low, high) {
  let middle = Math.floor((high+low)/2);
  if (high < low) {
    return -1;
  }
  if (high == low) {
    return low;
  }
  if (nums[middle] > nums[middle+1]) {
    return middle;
  } else if (nums[middle] < nums[middle-1]) {
    return middle-1;
  } else {
    if (nums[low] >= nums[middle]) {
      return findPivot(nums, low, middle-1);
    } else {
      return findPivot(nums, middle+1, high);
    }
  }
}
