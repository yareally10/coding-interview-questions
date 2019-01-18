function binarySearch(arr, start, end, val) {
    if(start <= end) {
        var mid = start + Math.floor((end - start) / 2);
        if(val == arr[mid]) {
            return mid;
        }
        if(val < arr[mid]) {
            return binarySearch(arr, start, mid - 1, val);
        } else {
            return binarySearch(arr, mid + 1, end, val);
        }
    }
    return -1;
}

//find biggest consecutive intersect between two sorted arrays

function findLargestIntersect(arr1, arr2) {
    var i = 0,
        j = 0,
        len1 = arr1.length,
        len2 = arr2.length,
        currIntersect = [],
        largestIntersect = [];

    while(j < len2 && i < len1) {
        if(arr1[i] == arr2[j]) {
            currIntersect.push(arr1[i]);
            largestIntersect = currIntersect.length > largestIntersect.length ? currIntersect : largestIntersect;
            i++;
            j++;
        } else {
            if(arr1[i] < arr2[j]) {
                i++;
            } else {
                j++;
            }
            currIntersect = [];
        }
    }

    return largestIntersect;
}