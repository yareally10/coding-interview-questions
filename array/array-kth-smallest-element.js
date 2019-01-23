/*
Given an unordered array, find the kth smallest element.

Example:
array: [3, 5, 1, 2, 7, 6, 8, 4]
k: 5
return: 5

Test:
kthSmallest([3, 5, 1, 2, 7, 6, 8, 4], 5)



Algorithm:
This is a modified quick sort.

Pick an element in the array, use it as pivot.
Put all elements smaller than pivot on left side of the array,
put all elements greater than pivot on right side of the array.
If pivot is the kth element, return it.
If k is smaller than pivot's position, search the left side,
otherwise, search the right side using updated k (subtract size of left array)
*/

//this solution creates two extra arrays with total size of original
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
  }
  
  if(k == counter) {
    return pivot;
  } else if (k < counter) {
    return kthSmallest(arr.slice(0, counter-1), k);
  } else {
    return kthSmallest(arr.slice(counter, len), k - counter);
  }
}
