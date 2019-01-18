/*
Given an array of numbers, return true if given array can represent 
preorder traversal of a Binary Search Tree, else return false.

Example:
Input:  pre[] = {2, 4, 3}
Output: true
Given array can represent preorder traversal
of below tree
    2
     \
      4
     /
    3

Input:  pre[] = {2, 4, 1}
Output: false
Given array cannot represent preorder traversal
of a Binary Search Tree.

Algorithm:
Similar to get next greater.
Create a stack.
Set root to min integer.
For each element in array
    if arr[i] is smaller than root, return false
    pop stack while arr[i] is greater than stack top
        make the last removed item new root
    push arr[i] onto stack
*/

function isArrayBST(arr) {
    var i, 
        len = arr.length,
        stack = [],
        root = Number.MIN_SAFE_INTEGER;

    for(i=0; i<len; i++) {
        if(arr[i] < root) {
            return false;
        }
        while(stack.length > 0 && arr[i] > stack[stack.length-1]) {
            root = stack.pop();
        }
        stack.push(arr[i]);
    }

    return true;
}