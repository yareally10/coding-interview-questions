/*
The span S[i] of the stock’s price on a given day i is defined as the maximum number of 
consecutive days just before the given day, for which the price of the stock on the 
current day is less than or equal to its price on the given day.

Algorithm:
Key, create a stack to store the index of stock price (value)

Walk through the list one by one.
For each value, 
    If the current value is less than value referred by top of stack,
        push 1 into result (1 day)
        push current index onto stack
    If the current value is greater than value referred by top of stack, 
        pop stack until it is not.
        Then,
            if the stack is now empty, the result for current value is its index + 1,
            otherwise the result is the current index minus value of top of stack
        Finally, 
            push current index onto stack
*/

function stockSpan(arr) {
    var stack = [0], 
        result = [1], 
        i, 
        len = arr.length;

    for(i=1; i<len; i++) {
        if(arr[i] < arr[stack[stack.length-1]]) {
            stack.push(i);
            result.push(1);
        } else {
            while(stack.length > 0 && arr[i] >= arr[stack[stack.length-1]]) {
                stack.pop();
            }
            result.push(stack.length == 0 ? i+1 : i-stack[stack.length-1]);
            stack.push(i);
        }
    }

    return result;
}