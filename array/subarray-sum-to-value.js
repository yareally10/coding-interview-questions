/*
Given a list of positive values, find a subarray that sums to a value.

Example:
Input: [15, 3, 19, 12, 2, 33, 4, 7, 5] and k = 14
Output: [12, 2]

Test:
subarraySum([15, 3, 19, 12, 2, 33, 4, 7, 5], 14);



Algorithm:
Use a sliding window, starting at the beginning of the list, and sum the values 
in the window.
If the current sum is less than the value, increase the window to the right.
If the current sum is larger than the value, decrease the window from the left.
Return true if the current sum equals to the value.
*/

function subarraySum(arr, val) {
    let start = 0,
        end = 0,
        len = arr.length,
        currSum = 0;

    if(len === 0) {
        return val === 0 ? [] : false;
    }

    currSum = arr[0];
    while(start < len && end < len) {
        if(currSum == val) {
            return arr.slice(start, end + 1);
        } else if (currSum < val) {
            end++;
            if(end < len) {
                currSum += arr[end];
            }
        } else {
            currSum -= arr[start];
            start++;
        }
    }

    return false;
}
