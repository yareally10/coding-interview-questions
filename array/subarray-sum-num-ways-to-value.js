/*
Given an array of (neg and pos) integers and an integer k, find the total number 
of continuous subarrays whose sum equals to k.

Example: 
Input: {2, -2, 3, 5, 4, 8, -12, 11, -7, -6, 10} and k = 8
Output: 7
    {2, -2, 3, 5}
    {3, 5}
    {8}
    [2, -2, 3, 5, 4, 8, -12]
    [3, 5, 4, 8, -12]
    [4, 8, -12, 11, -7, -6, 10]
    [11, -7, -6, 10]
    
Test:
subarraySum([2, -2, 3, 5, 4, 8, -12, 11, -7, -6, 10], 8);



Algorithm:
For each element in list, 
    calculate total sum, counting itself
    update hash table, 
        if current sum exist, increment existing by 1; 
        otherwise assign 1
    check if hashTable(sum-k) exist, if so, add to result count
*/

function subarraySum(arr, k) {
    let sum = 0,
        result = 0,
        resultArr = [],
        datum = {"count": 1, "indices": [0]},
        data = {0: datum};

    arr.forEach((n, index) => {
        sum += n;
        if (data.hasOwnProperty(sum)) {
            data[sum].count = data[sum].count + 1;
            data[sum].indices.push(index + 1);
        } else {
            datum = {"count": 1, "indices": [index + 1]}
            data[sum] = datum;
        }

        if (data.hasOwnProperty(sum - k)) {
            result += data[sum - k].count;
            data[sum-k].indices.forEach(i => {
                let currArr = arr.slice(0, index+1);
                resultArr.push(currArr.slice(i));
            });
        }
        //console.log(data);
    });

    console.log(resultArr);
    return result;
}

