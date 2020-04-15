function MaxHeap() {
  this.content = [];
}

MaxHeap.prototype = {
  push: function(num) {
    this.content.push(num);
    this.bubbleUp(this.content.length-1);
  },
  pop: function() {
    let result = this.getLargest(),
        end = this.content.pop();

    if (this.content.length > 0) {
      this.content[0] = end;
      this.bubbleDown(0);
    }

    return result;
  },
  getLargest: function() {
    return this.content[0];
  },
  size: function() {
    return this.content.length;
  },
  getContent: function() {
    return this.content;
  },
  bubbleUp: function(index) {
    let val = this.content[index],
        parentIndex,
        parentVal;
    while(index > 0) {
      parentIndex = Math.floor((index-1)/2);
      parentVal = this.content[parentIndex];

      if (parentVal < val) {
        this.content[parentIndex] = val;
        this.content[index] = parentVal;
        index = parentIndex;
      } else {
        break;
      }
    }
  },
  bubbleDown: function(index) {
    let val = this.content[index],
        len = this.size(),
        swapIndex,
        leftChildIndex,
        rightChildIndex,
        leftChildVal,
        rightChildVal;
      
    while (index < len) {
      rightChildIndex = (index+1)*2;
      leftChildIndex = rightChildIndex - 1;
      swapIndex = null;

      if (rightChildIndex < len) {
        rightChildVal = this.content[rightChildIndex];
        if (rightChildVal > val) {
          swapIndex = rightChildIndex;
        }
      }

      if (leftChildIndex < len) {
        leftChildVal = this.content[leftChildIndex];
        if (leftChildVal > (swapIndex == null ? val : rightChildVal)) {
          swapIndex = leftChildIndex;
        }
      }

      if (swapIndex == null) {
        break;
      } else {
        this.content[index] = this.content[swapIndex];
        this.content[swapIndex] = val;
        index = swapIndex;
      }
    }
  }
}
