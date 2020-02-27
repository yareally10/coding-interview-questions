/*
Given a list of numbers, find the sum of all subarrays

Example:
Input: [1, 2, 3, 4]
Output: 

Test:
allSubarraySum([1, 2, 3, 4]);



Algorithm:
Use mathematical formula
f(i) = a[i] * (n-i) * (i+1)

a[i] appears in two different types of subarrays
1. a[i] is the beginning of the subarray, there are (n-i) such subarrays
2. a[i] is not the beginning of the subarray, there are (n-i)*i such subarrays
Therefore a[i] appears a total of (n-i) + (n-i)*i times
*/

function allSubarraySum(arr) {
  let len = arr.length,
      result = 0;

  arr.forEach((n, i) => {
  	result += n * (len - i) * (i + 1);
  });

  return result;
}
