/*
given a binary tree, return a list of nodes that can be "seen" from the right side
node are uncovered on the right

example: 

    1
   / \
  2   5
 /
3

returns [1, 5, 3]


Algorithm: 
Perform an updated BFS. For each level, push children onto a queue (right first).
As you dequeue, add the first element to result, then add all children of the 
    current queue to next queue.
Once current queue is empty, swap current queue with next queue.
Continue until all queues are empty.

node structure:
node: {
    left: node,
    right: node,
    val: value
}

test example:
var node = {
    left: {
        left: {
            left: {
                val: 10
            },
            val: 3
        },
        right: {
            val: 4
        },
        val: 2
    },
    right: {
        val: 5
    },
    val: 1
}
*/

function uncovered(node) {
    var nextQueue = [],
        currQueue = [node],
        result = [],
        currNode,
        i=0;

    do {
        currNode = currQueue.shift();
        if(currNode != null && currNode != "") {
            if(i == 0) {
                result.push(currNode.val);
            }

            nextQueue.push(currNode.right);
            nextQueue.push(currNode.left);
            i++;
        }

        if(currQueue.length === 0) {
            currQueue = nextQueue;
            nextQueue = [];
            i = 0;
        }
    } while(currQueue.length > 0);

    return result;
}

//testing
var node = {
    left: {
        left: {
            left: {
                val: 10
            },
            val: 3
        },
        right: {
            val: 4
        },
        val: 2
    },
    right: {
        val: 5
    },
    val: 1
}

console.log(uncovered(node));