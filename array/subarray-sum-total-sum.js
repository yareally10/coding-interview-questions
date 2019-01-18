/*
Given a list of numbers, find the sum of all subarrays

Algorithm:
Use mathematical formula
f(i) = val * (n-i) * (i+1)
*/

function allSubarraySum(arr) {
    var i=0,
        len = arr.length,
        result = 0;

    for(i=0; i<len; i++) {
        result += arr[i] * (len-i) * (i+1);
    }

    return result;
}

