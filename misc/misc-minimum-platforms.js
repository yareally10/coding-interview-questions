/*
Given arrival and departure times of all trains that reach a railway station, 
find the minimum number of platforms required for the railway station so that 
no train waits. We are given two arrays which represent arrival and departure 
times of trains that stop.

Example:
Input:  arr[]  = {9:00,  9:40, 9:50,  11:00, 15:00, 18:00}
        dep[]  = {9:10, 12:00, 11:20, 11:30, 19:00, 20:00}
Output: 3
There are at-most three trains at a time (time between 11:00 to 11:20)



Algorithm:
Sort both lists.
"Merge" two lists together. Compare the first value of both lists.
    If arrival is smaller, increase current platform count; update max 
    Otherwise, decrease current platform count

Test:
minimumPlatforms(
    [900, 940, 950, 1100, 1500, 1800], 
    [910, 1200, 1120, 1130, 1900, 2000]
);
*/

function convert(t) {
    var arr = t.split(":"),
        result = 0;
    if(arr.length == 2) {
        result = parseInt(arr[0])*100 + parseInt(arr[1]);
    }

    return result;
}

function minimumPlatforms(arr, dep) {
    var i=0, j=0, curr=0, max=0;

    arr.sort();
    dep.sort();

    while(i<arr.length && j<dep.length) {
        if(arr[i] < dep[j]) {
            curr++;
            i++;
            max = curr > max ? curr : max;
        } else {
            curr--;
            j++;
        }
    }

    return max;
}