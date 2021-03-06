/*
Given two sorted arrays, find largest consecutive intersect between them

Example:
Given these two sets:
[1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14]
[2, 3, 4, 6, 7, 8, 9, 10, 11, 12]
Return:
[7, 8, 9, 10]

Test:
findLargestIntersect(
    [1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14],
    [2, 3, 4, 6, 7, 8, 9, 10, 11, 12]
);



Algorithm:
Create two counters, one of each array.
Loop through both arrays from the beginning, until the end for either array is reached.
If current element for both arrays are equal, update current intersect, 
and max intersect if necessary.
Otherwise, increment the counter of the array with the smaller element, 
reset the current intersect.
Return largest intersect once entire array is looped.
*/

function findLargestIntersect(arr1, arr2) {
    let i = 0,
        j = 0,
        len1 = arr1.length,
        len2 = arr2.length,
        currIntersect = [],
        largestIntersect = [];

    while(i < len1 && j < len2) {
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