/*
Given an array, print the Previous Smaller Element for every element. 
The previous smaller Element for an element x is the first element on the left side 
of x in array that is smaller than x. 
Elements for which no smaller element exist, consider previous smaller element as -1

Example: 
Input:  [9,  3,  5, 8, 7, 2,  6, 1,  4]
Output: [-1, -1, 3, 5, 5, -1, 2, -1, 1]

Test:
prevSmaller([9, 3, 5, 8, 7, 2, 6, 1, 4]);



Algorithm:
Create a stack.
Scan the array from the right.
    While stack is not empty, and current element is creater than top of stack, 
        pop stack
    If stack is empty, put -1 into result array at index (started from right)
    Else, put top of stack into result array
    Push current element onto stack
*/

function prevSmaller(arr) {
    const len = arr.length,
          stack = [],
          result = [];

    for(let i=0; i<len; i++) {
        while(stack.length > 0 && arr[i] < stack[stack.length-1]) {
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
