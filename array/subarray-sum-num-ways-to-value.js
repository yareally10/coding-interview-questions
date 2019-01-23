/*
Given an array of (neg and pos) integers and an integer k, find the total number 
of continuous subarrays whose sum equals to k.

Example: 
Input: {2, -2, 3, 5, 4, 8, 19, 11, -7, -6, 10} and k = 8
Output: 4
    {2, -2, 3, 5}
    {3, 5}
    {8}
    {11, -7, -6, 10}

Test:
subarraySum([2, -2, 3, 5, 4, 8, 19, 11, -7, -6, 10], 8);



Algorithm:
For each element in list, 
    calculate total sum, counting itself
    update hash table, 
        if current sum exist, increment existing by 1; 
        otherwise assign 1
    check if hashTable(sum-k) exist, if so, add to result count
*/

function subarraySum(arr, k) {
    var i=0,
        len = arr.length,
        sum = 0,
        data = {0: 1},
        result = 0;

    for(i=0; i<len; i++) {
        sum += arr[i];
        data[sum] = data.hasOwnProperty(sum) ? data[sum] + 1 : 1;
        result += data.hasOwnProperty(sum - k) ? data[sum - k] : 0;
    }

    //console.log(data);
    return result;
}

