/*
Given an array, print k smallest elements from the array.  
The output elements should be printed in increasing order.

Example:
array: [3, 5, 1, 2, 7, 6, 8, 4]
k: 3
return: [1, 2, 3]


Algorithm: 
Build a max heap
Go through the list, put first k element into the heap.
For rest of the list, if it is smaller than the largest number in the heap, 
pop the heap, put current element on the heap.
After entire list is processed, the heap has k smallest elements.
*/

function MaxHeap() {
    this.content = [];
}

MaxHeap.prototype = {
    push: function(num) {
        this.content.push(num);
        this.bubbleUp(this.content.length - 1);
    },
    pop: function() {
        var result = this.content[0],
            end = this.content.pop();

        if(this.content.length > 0) {
            this.content[0] = end;
            this.bubbleDown(0);
        }
        return result;
    },
    size: function() {
        return this.content.length;
    },
    largest: function() {
        return this.content[0];
    },
    bubbleUp: function(index) {
        var val = this.content[index],
            parentIndex, 
            parentVal;

        while(index > 0) {
            parentIndex = Math.floor((index - 1) / 2);
            parentVal = this.content[parentIndex];

            if(parentVal < val) {
                this.content[parentIndex] = val;
                this.content[index] = parentVal;
                index = parentIndex;
            } else {
                break;
            }
        }
    },
    bubbleDown: function(index) {
        var val = this.content[index],
            len = this.size(),
            swapIndex,
            leftChildIndex, rightChildIndex,
            leftChildVal, rightChildVal;

        while(index < len) {
            rightChildIndex = (index + 1) * 2;
            leftChildIndex = rightChildIndex - 1;
            swapIndex = null;

            if(rightChildIndex < len) {
                rightChildVal = this.content[rightChildIndex];
                if(rightChildVal > val) {
                    swapIndex = rightChildIndex;
                }
            }

            if(leftChildIndex < len) {
                leftChildVal = this.content[leftChildIndex];
                if(leftChildVal > (swapIndex === null ? val : rightChildVal)) {
                    swapIndex = leftChildIndex;
                }
            }

            if(swapIndex === null) {
                break;
            } else {
                this.content[index] = this.content[swapIndex];
                this.content[swapIndex] = val;
                index = swapIndex;
            }
        }
    }
}

function kSmallest(arr, k) {
    var mh = new MaxHeap(), i=0, result = [];

    arr.forEach(function(e) {
        if(i<k) {
            mh.push(e);
        } else {
            if(e < mh.largest()) {
                mh.pop();
                mh.push(e);
            }
        }
        i++;
    });

    for(i=0; i<k; i++) {
        result.push(mh.pop());
    }

    for(i=0; i<k; i++) {
        console.log(result.pop());
    }
}