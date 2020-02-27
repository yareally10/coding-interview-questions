/*
Given an array and an integer k, find the maximum for each and every 
contiguous subarray of size k.

Example:
Input: [9, 3, 5, 8, 7, 2, 6, 1, 4] and k=3
Output: [9, 8, 8, 8, 7, 6, 6]

Test:
subarrayMax([9, 3, 5, 8, 7, 2, 6, 1, 4], 3);



Algorithm:
Key, use a data structure that's a queue and stack. Put larger items in the back.

Go through the array
    If queue is not empty and current element is larger than the end of queue 
    (top of stack)
        pop stack (remove last element of queue)

    Push current element onto queue

    Once k elements have been reached, push current top of queue (back of stack), 
    onto result

    If top of queue is going out of window (arr[i-k] == queue[0]), dequeue 
    (shift queue)
    
After loop, push the last maxima (top of queue) onto result
*/

function subarrayMax(arr, k) {
    const queue = [], 
          maxima = [];

    for(let i=0; i<arr.length; i++) {
        if(i >= k) {
            maxima.push(queue[0]);
            if(arr[i-k] == queue[0]) {
                queue.shift();
            }
        }

        while(queue.length > 0 && queue[queue.length-1] < arr[i]) {
            queue.pop();
        }
        queue.push(arr[i]);
        console.log(`index ${i} - queue: ${queue}`);
    }
    maxima.push(queue[0]);

    return maxima;
}
