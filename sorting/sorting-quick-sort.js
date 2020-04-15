//quick sort
function quickSort(nums) {
  if (nums.length <= 1) {
    return nums;
  } else {
    let pivot = nums[0], i, left=[], right=[];
    for (i=1; i<nums.length; i++) {
      nums[i] < pivot ? left.push(nums[i]) : right.push(nums[i]);
    }

    return quickSort(left).concat(pivot, quickSort(right));
  }
}
