/**
Given an array. Perform insertion sort. Starting from the first element, insert 
each subsequent element into the already sorted array.
Print the array for each element processed.

E.G.:
Input: [1, 4, 3, 5, 6, 2]
Will print: 
1 4 3 5 6 2
1 3 4 5 6 2
1 3 4 5 6 2
1 3 4 5 6 2
1 2 3 4 5 6
Final output is [1, 2, 3, 4, 5, 6]

Test:
insertionSort([1, 4, 3, 5, 6, 2]);
*/

function insertionSort(arr) {
  let end = 1;
  while (end < arr.length) {
    arr = insert(arr, 0, end);
    end++;
    printArray(arr);
  }
  return arr;
}

function insert(arr, beg, end) {
  let temp = arr[end], index = binarySearch(temp, arr, beg, end-1);
  //remove current end element from array
  arr.splice(end, 1);
  //insert it at the correct location
  arr.splice(index, 0, temp);
  return arr;
}

function binarySearch(num, arr, low, high) {
  let middle = Math.floor((low+high)/2);
  if (high < low) {
    return low;
  } else if (num == arr[middle]) {
    return middle;
  } else if (num > arr[middle]) {
    return binarySearch(num, arr, middle+1, high);
  } else {
    return binarySearch(num, arr, low, middle-1);
  }
}

function printArray(arr) {
  let result = '';
  arr.forEach(e => {
    result += e + ' '
  });
  console.log(result);
}

insertionSort([1, 4, 3, 5, 6, 2]);