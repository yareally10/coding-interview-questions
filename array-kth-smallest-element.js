/*
Given an unordered array. Find the kth smallest element.

Algorithm:
modified quick sort
*/

function kthSmallest(arr, k) {
    var i, 
        pivot = arr[0], 
        left = [],
        right = [];

    for(i=1; i<arr.length; i++) {
        if(arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    if (k < left.length + 1) {
        return kthSmallest(left, k);
    } else if (k > left.length + 1) {
        return kthSmallest(right, k - left.length - 1);
    } else {
        return pivot;
    }
}

//solution without creating extra arrays
function kthSmallest(arr, k) {
  var len = arr.length,
      pivot = arr[len-1],
      i,
      temp,
      counter = 0;
  
  for(i=0; i<len; i++) {
    if(arr[i] <= pivot) {
      temp = arr[counter];
      arr[counter] = arr[i];
      arr[i] = temp;
      counter++;
    }
    //console.log("counter: " + counter);
    //console.log(arr);
  }
  
  if(k == counter) {
    return pivot;
  } else if (k < counter) {
    return kthSmallest(arr.slice(0, counter-1), k);
  } else {
    return kthSmallest(arr.slice(counter, len), k - counter);
  }
}

/*
function partition(arr, start, end) {
    var pivot = arr[end],
        i,
        counter = start-1,
        temp;

    for(i=start; i < end; i++) {
        if(arr[i] <= pivot) {
            counter++;
            if(counter != i) {
                temp = arr[counter];
                arr[counter] = arr[i];
                arr[i] = temp;
            }
        }
    }

    temp = arr[counter+1];
    arr[counter+1] = pivot;
    arr[end] = temp;

    return {
        "array": arr,
        "pos": counter+1
    };
}

function kthSmallest(arr, k) {
    var p = partition(arr, 0, arr.length-1);

    if(k < p.pos + 1) {
        return kthSmallest(p.array.slice(0, p.pos), k);
    } else if(k > p.pos + 1) {
        return kthSmallest(p.array.slice(p.pos+1), k - p.pos - 1);
    } else {
        return p.array[p.pos];
    }
}
//*/