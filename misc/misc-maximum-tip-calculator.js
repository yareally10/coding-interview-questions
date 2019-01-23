/*
Babu and Ankit are the only two waiters in Royal Restaurant. Today, the 
restaurant received N orders. The amount of tips may differ when handled by 
different waiters, if Ankit takes the ith order, he would be tipped Ai rupees 
and if Babu takes this order, the tip would be Bi rupees.

In order to maximize the total tip value they decided to distribute the order 
among themselves. One order will be handled by one person only. Also, due to 
time constraints Babu cannot take more than X orders and Ankit cannot take more 
than Y orders. It is guaranteed that X + Y is greater than or equal to N, which 
means that all the orders can be handled by either Babu or Ankit. Find out the 
maximum possible amount of total tip money after processing all the orders.

Input:
The first line contains one integer, number of test cases.
The second line contains three integers N, X, Y.
The third line contains N integers. The ith integer represents Ai.
The fourth line contains N integers. The ith integer represents Bi.

Output:
Print a single integer representing the maximum tip money they would receive.




Algorithm:
Go through both arrays and compare the values.


Test:
maximumTipCalculator(8, 4, 4,
    [1, 4, 3, 2, 7, 5, 9, 6], 
    [1, 2, 3, 6, 5, 4, 9, 8])
*/

function maximumTipCalculator(n, a, b, tipsA, tipsB) {
    var i, arrA = [], arrB = [], totalTips = 0, diff;

    for(i=0; i<n; i++) {
        if(tipsA[i] > tipsB[i]) {
            diff = tipsA[i] - tipsB[i];
            arrA.push(diff);
            totalTips += tipsA[i];
        } else {
            diff = tipsB[i] - tipsA[i];
            arrB.push(diff);
            totalTips += tipsB[i];
        }
    }

    if(arrA.length > a) {
        arrA.sort();
        for(i=0; i<arrA.length - a; i++) {
            totalTips -= arrA[i];
        }
    } else if(arrB.length > b) {
        arrB.sort();
        for(i=0; i<arrB.length - b; i++) {
            totalTips -= arrB[i];
        }
    }

    return totalTips;
}