/*
Add two numbers in list form, where the first item is the lowest digit of the
number and so on.

Example: 
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.




*/

function twoSum(arr1, arr2) {
    var i = 0, j = 0, 
        sum = [], carry = 0, 
        currVal, val1, val2,
        len1 = arr1.length,
        len2 = arr2.length;

    while(i<len1 || j<len2) {
        if(i<len1) {
            val1 = arr1[i];
        } else {
            val1 = 0;
        }

        if(j<len2) {
            val2 = arr2[j];
        } else {
            val2 = 0;
        }
        
        currVal = val1 + val2 + carry;
        sum.push(currVal % 10);
        carry = Math.floor(currVal/10);
        i++;
        j++;
    }

    if(carry > 0) {
        sum.push(carry);
    }

    return sum;
}