/**
 * Merge two sorted arrays in place, with use of only constant extra space.
 * Assume array1 contains enough space to absorb array2.
 *
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  let i = 0, j = 0, gap=m+n, temp;

  for (i=m, j=0; i<m+n && j<n; i++, j++) {
    nums1[i] = nums2[j];
  }
  
  for (gap=nextGap(gap); gap > 0; gap=nextGap(gap)) {
    for (i=0; i+gap < m+n; i++) {
      if (nums1[i] > nums1[gap+i]) {
        temp = nums1[i];
        nums1[i] = nums1[gap+i];
        nums1[gap+i] = temp;
      }
    }
  }
};

function nextGap(num) {
  if (num <= 1) {
    return 0;
  } else {
    return Math.ceil(num/2);
  }
}

function mergeSorted(nums1, m, nums2, n) {
  while (m > 0 && n > 0) {
    if (nums1[m-1] > nums2[n-1]) {
      nums1[m+n-1] = nums1[m-1];
      m--;
    } else {
      nums1[m+n-1] = nums2[n-1];
      n--;
    }
  }
  while (n > 0) {
    nums1[m+n-1] = nums2[n-1];
    n--;
  }
  return nums1;
}

/*
merge([1,2,3,0,0,0],
3,
[2,5,6],
3)
*/