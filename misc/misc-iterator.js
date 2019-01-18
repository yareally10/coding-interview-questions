/* 
Your previous Plain Text content is preserved below:

boolean hasNext()
    return true if there is another element in the whole structure

int next()
    return the value of the next element in the structure

void remove()
    remove the last element returned by the iterator.
    That is, remove the element that the previous next() returned
    This method can be called only once per call to next(), 
    otherwise an exception will be thrown.
    See http://docs.oracle.com/javase/7/docs/api/java/util/Iterator.html#remove() for details.
    
    From the website:
    Removes from the underlying collection the last element returned
    by this iterator (optional operation). This method can be called
    only once per call to next().
    The behavior of an iterator is unspecified if the underlying
    collection is modified while the iteration
    is in progress in any way other than by calling this method.
    
    
Given:  [[],[10,20,30],[4,5],[],[],[6],[7,8],[],[9],[10],[]]
Print:  1 2 3 4 5 6 7 8 9 10

while(itr.hasNext()){
  System.out.println(itr.next())
}

itr.next() -> return 10
itr.next() -> return 20
itr.remove() -> remove element 20

 */

function itr(content) {
  this.content = content;
  this.index = [0, 0];
}

itr.prototype = {
  hasNext: function() {
    if(this.content[this.index[0]].length - 1 > this.index[1]) {
      return true;
    } else {
      var i=this.index[0]+1;
      while(i<this.content.length) {
        if(this.content[i].length > 0) {
          return true;
        }
        i++;
      }
      return false;
    }
  },

  next: function() {
    if(this.content[this.index[0]].length - 1 > this.index[1]) {
      this.index[1]++;
      return this.content[this.index[0]][this.index[1]];
    } else {
      var i=this.index[0]+1;
      while(i<this.content.length) {
        if(this.content[i].length > 0) {
          this.index = [i, 0];
          return this.content[i][0];
        }
        i++;
      }
      return null;
    }
  },
  
  remove: function() {
    if(this.index[1] > 0) {
      this.content[this.index[0]].splice(this.index[1]-1, 1);
      this.index[1]--;
    } else {
      var i=this.index[0]-1;
      while(i>=0) {
        if(this.content[i].length > 0) {
          this.content[i].splice(-1);
          break;
        }
        i--;
      }
      if (i < 0) {
        console.log("no item to remove");
      }
    }
    return this;
  }
}
  
var list = [[],[10,20,30],[4,5],[],[],[6],[7,8],[],[9],[10],[]];
var iter = new itr(list);
