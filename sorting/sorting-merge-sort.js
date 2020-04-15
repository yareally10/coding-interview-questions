/**
Merge sort "in place"
This algorithm only creates a single extra copy of array
*/

function mergeSort(arr) {
	let temp = new Array(arr.length);
	mergeSortHelper(arr, temp, 0, arr.length-1);
	return arr;
}

function mergeSortHelper(arr, tempArray, leftStart, rightEnd) {
	if (leftStart >= rightEnd) {
		return;
	}
	let middle = Math.floor((leftStart+rightEnd)/2);
	mergeSortHelper(arr, tempArray, leftStart, middle);
	mergeSortHelper(arr, tempArray, middle+1, rightEnd);
	merge(arr, tempArray, leftStart, rightEnd);
}

function merge(arr, tempArray, leftStart, rightEnd) {
	let leftEnd = Math.floor((leftStart+rightEnd)/2), 
			rightStart = leftEnd+1,
			left = leftStart,
			right = rightStart,
			index = leftStart;

	while (left <= leftEnd && right <= rightEnd) {
		if (arr[left] < arr[right]) {
			tempArray[index] = arr[left];
			left++;
		} else {
			tempArray[index] = arr[right];
			right++;
		}
		index++;
	}

	while (left <= leftEnd) {
		tempArray[index] = arr[left];
		left++;
		index++;
	}
	while (right <= rightEnd) {
		tempArray[index] = arr[right];
		right++;
		index++;
	}

	//copy values from tempArray back into arr
	for (let i=leftStart; i<=rightEnd; i++) {
		arr[i] = tempArray[i];
	}

	console.log(tempArray);
}