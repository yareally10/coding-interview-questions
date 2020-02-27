/*
The span S[i] of the stock’s price on a given day i is defined as the maximum 
number of consecutive days just before the given day, for which the price of the 
stock on the current day is less than or equal to its price on the given day.

Example:
Input: {100, 80, 60, 70, 60, 75, 85}
Output: {1,  1,  1,  2,  1,  4,  6}

Test:
stockSpan([100, 80, 60, 70, 60, 75, 85]);



Algorithm:
Key: create a stack to store the index of stock price 
To get the value of a stock: stock[stack[stack.length-1]]

Walk through the list
For each value, 
    If the current value is less than value referred by top of stack,
        push 1 into result (1 day)
        push current index onto stack
    If the current value is greater than value referred by top of stack, 
        pop stack until it is not.
        Then,
            if the stack is empty, result for current value is its index + 1,
            otherwise result is the current index minus value of top of stack
        Finally, 
            push current index onto stack
*/

function stockSpan(stocks) {
    const stack = [0], 
          result = [1], 
          len = stocks.length;

    for(let i=1; i<len; i++) {
        if(stocks[i] < stocks[stack[stack.length-1]]) {
            result.push(1);
        } else {
            while(stack.length > 0 && stocks[i] >= stocks[stack[stack.length-1]]) {
                stack.pop();
            }
            //if stack is empty, everything before current index is smaller than its value
            //else calculate difference between current index and top of stack
            result.push(stack.length == 0 ? i+1 : i-stack[stack.length-1]);
        }

        //push current index onto stack
        stack.push(i);
    }

    return result;
}