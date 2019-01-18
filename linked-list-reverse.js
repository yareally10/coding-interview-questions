/*
Given a linked list, write a function to reverse every k nodes 
(where k is an input to the function).
If a linked list is given as 1->2->3->4->5->6->7->8->NULL and k = 3 
then output will be 3->2->1->6->5->4->8->7->NULL.

Test:
var l = new LinkedList();
l.createFromArray([1, 2, 3, 4, 5, 6, 7, 8]);
l.printList();
*/

function Node(val, next, prev) {
    this.val = val;
    this.next = next;
    this.prev = prev;
}

function LinkedList() {
    this.head = null;
    this.tail = null;
}

LinkedList.prototype = {
    push: function(val) {
        const node = new Node(val, null, this.tail);
        if(this.tail === null || this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        return this;
    },

    addToHead: function(val) {
        const node = new Node(val, this.head, null);
        if(this.tail === null || this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.head.prev = node;
            this.head = node;
        }
        return this;
    },

    removeFromHead: function() {
        this.head = this.head.next;
        this.head.prev = null;
        return this;
    },

    createFromArray: function(arr) {
        var i, len = arr.length, list = null, node;
        for(i=len-1; i>=0; i--) {
            node = new Node(arr[i], list);
            if(list === null) {
                this.tail = node;
            }
            if(node.next != null) {
                node.next.prev = node;
            }
            list = node;
        }
        this.head = list;

        return this;
    },

    printList: function() {
        var node = this.head, result = "";
        while(node != null) {
            result += node.val + "->";
            node = node.next;
        }
        result += "null";

        return result;
    },

    printFromTail: function() {
        var node = this.tail, result = "";
        while(node != null) {
            result += node.val + "<-";
            node = node.prev;
        }
        result += "null";

        return result;
    },

    //reverse list in groups of k
    reverse: function(k) {
        var count, stack = [], currNode = this.head, stackNode = null;
        while(currNode != null) {
            count = 0;
            while(currNode != null && count < k) {
                stack.push(currNode);
                count++;
                currNode = currNode.next;
            }

            while(stack.length > 0) {
                if(stackNode === null) {
                    this.head = stack.pop();
                    this.head.prev = null;
                    stackNode = this.head;
                } else {
                    stackNode.next = stack.pop();
                    stackNode.next.prev = stackNode;
                    stackNode = stackNode.next;
                }
            }
        }

        stackNode.next = null;
        this.tail = stackNode;
        return this;
    }
}


/*
reverse singly linked list

Reverse algorithm:
recurse
next = curr.next
curr.next = prev
prev = curr
curr = next

return prev

After recursion, head = prev
*/

function Node(val, next) {
    this.val = val;
    this.next = next;
}

function LinkedList() {
    this.head = null;
}

LinkedList.prototype = {
    add: function(val) {
        var node = new Node(val, this.head);
        this.head = node;
        return this;
    },

    remove: function() {
        this.head = this.head.next;
        return this;
    },

    createFromArray: function(arr) {
        var i, 
            len = arr.length, 
            list = null, 
            node;

        for(i=len-1; i>=0; i--) {
            node = new Node(arr[i], list);
            list = node;
        }
        this.head = list;

        return this;
    },

    printList: function() {
        var node = this.head, 
            result = "";

        while(node != null) {
            result += node.val + "->";
            node = node.next;
        }
        result += "null";

        return result;
    },

    middle: function() {
        var curr = this.head,
            mid = this.head,
            i=0;

        while(curr != null) {
            if(i%2 == 1) {
                mid = curr;
            }
            i++;
            curr = curr.next;
        }

        return mid
    },

    reverseHelper: function(node, k) {
        var count = 0,
            currNode = node,
            nextNode = null,
            prevNode = null;

        while(count < k && currNode != null) {
            nextNode = currNode.next;
            currNode.next = prevNode;
            prevNode = currNode;
            currNode = nextNode;
            count++;
        }

        if(nextNode != null) {
            node.next = this.reverseHelper(nextNode, k);
        }

        return prevNode;
    },

    reverse: function(k) {
        //recursive solution
        //this.head = this.reverseHelper(this.head, k);

        //* Iterative solution
        var count = 0,
            i = 0,
            currNode = this.head,
            prevHead = this.head,
            currHead = null,
            nextNode = null,
            prevNode = null;

        do {
            currHead = currNode;
            while(count < k && currNode != null) {
                nextNode = currNode.next;
                currNode.next = prevNode;
                prevNode = currNode;
                currNode = nextNode;
                count++;
            }
            if(i==0) {
                this.head = prevNode;
            }
            if(i > 0 && nextNode != null) {
                prevHead.next = prevNode;
                prevHead = currHead;
            }
            i++;
            count = 0;

        } while(nextNode != null);

        prevHead.next = prevNode;
        currHead.next = null;
        //*/

        return this;
    }
}