/*
Given an array containing both negative and positive integers. 
Find the contiguous sub-array with maximum sum.



Kadane's Algorithm:
For each element, calculate the sum of all elements up to this element,
and push current element into current array holder
    If the current sum is less than 0, use 0 (use empty for current array)
    If current sum is greater than current maximum, update current max
Return current max after entire array is processed
*/
function maxSubarraySum(arr) {
    var curr = 0,
        currArr = [],
        result = 0,
        resultArr = [];

    arr.forEach(function(n) {
        //process current element
        curr += n;
        currArr.push(n);

        //update current array to filter out negatives
        currArr = curr > 0 ? currArr : [];
        curr = curr > 0 ? curr : 0;
        
        //update result array (slice creates a new array)
        resultArr = curr >= result ? currArr.slice() : resultArr;
        result = curr >= result ? curr : result;
    });

    return resultArr;
}
