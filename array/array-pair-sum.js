/*
Given an array and a value k. Find all pairs of values in array that sums to k. 
The given array could contain duplicate numbers.

Example:
Input: [1, 8, 3, 5, 4, 4, 2, 2, 7, 9] and 8
Output: [5, 3], [4, 4], [7, 1]

Test:
sumPairs([1, 8, 3, 5, 4, 4, 2, 2, 7, 9], 8);



Algorithm:
Store complement of each element in array in a hashtable.
Every time an element is processed, check if its complement exists in the 
hastable.
If so, add the pair to result.
*/

function sumPairs(arr, k) {
    var dict = {},
        result = [],
        i,
        comp;

    for(i=0; i<arr.length; i++) {
        comp = k - arr[i];
        if(dict.hasOwnProperty(arr[i]) && dict[arr[i]] > 0) {
            result.push([arr[i], comp]);
            dict[arr[i]]--;
        } else {
            if(!dict.hasOwnProperty(comp)) {
                dict[comp] = 1;
            } else {
                dict[comp]++;
            }
        }
    }

    return result;
}