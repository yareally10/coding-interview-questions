/*
Design a Data Structure SpecialStack that supports all the stack operations like push(), 
pop(), isEmpty(), and an additional operation getMin() which should return minimum 
element from the SpecialStack. All these operations of SpecialStack must be O(1). 
To implement SpecialStack, you should only use standard Stack data structure and no 
other data structure like arrays, list, .. etc.

Algorithm:
While pusing, if minimum already exists, and another number smaller than minimum is pushed,
    store (2*num - current minimum) as content, and num as the new minimum.
While popping, if the content is smaller than minimum, 
    calculate next minimum using (2*current minimum - content)
    return current minimum as result
*/

function Stack() {
    this.content = [];
    this.minimum = null;
}

Stack.prototype = {
    pop: function() {
        var num = this.content.pop(), result;
        if(num < this.minimum) {
            result = this.minimum;
            this.minimum = 2*this.minimum - num;
        }
        return result;
    },
    push: function(e) {
        if(this.content.length == 0) {
            this.content.push(e);
            this.minimum = e;
        } else {
            if(e < this.minimum) {
                this.content.push(2*e - this.minimum);
                this.minimum = e;
            } else {
                this.content.push(e);
            }
        }
        return this;
    },
    isEmpty: function() {
        return this.content.length == 0;
    },
    getMin: function() {
        return this.minimum;
    }
}