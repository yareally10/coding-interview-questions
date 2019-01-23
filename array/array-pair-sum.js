/*
Given an array and a value k. Find all pairs of values in array that sums to k.


Algorithm:
Store complement in hashtable
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