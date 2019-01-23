/*
Given an array, print the Next Greater Element (NGE) for every element. 
The Next greater Element for an element x is the first element on the right side 
of x in array that is greater than x. 
Elements for which no greater element exist, consider next greater element as -1

Example: 
Input: [9, 3, 5, 8, 7, 2, 6, 1, 4]
Output: [-1, 5, 8, -1, -1, 6, -1, 4, -1]

Test:
nextGreater([9, 3, 5, 8, 7, 2, 6, 1, 4]);



Algorithm:
Create a stack.
Scan the array from the right.
    While stack is not empty, and current element is creater than top of stack, 
        pop stack
    If stack is empty, put -1 into result array at index (started from right)
    Else, put top of stack into result array
    Push current element onto stack
*/

function nextGreater(arr) {
    var i,
        len = arr.length,
        stack = [],
        result = [];

    for(i=len-1; i>=0; i--) {
        while(stack.length > 0 && arr[i] > stack[stack.length-1]) {
            stack.pop();
        }

        if(stack.length == 0) {
            result[i] = -1;
        } else {
            result[i] = stack[stack.length-1];
        }

        stack.push(arr[i]);
    }

    return result;
}