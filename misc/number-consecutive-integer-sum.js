/*
For a given integer, find the number of ways it can be summed by two or more 
consecutive integers.
E.G: 15 => 3
1+2+3+4+5
4+5+6
7+8

Algorithm:
Say given number X is the sum of n consecutive integers starting at s, then
X = (s + (s+n-1)) * n / 2
X = (2s + n - 1) * n / 2
So,
s = (2X - n^2 + n) / (2*n)
And, 
2sn + n^2 - n = 2X
n^2 = 2X - 2sn + n
Because s >= 1, 2sn > n, therefore
n^2 < 2X
n < sqrt(2X)

Using the equations, count up from 2 to n's bound, calculate each potential s,
increment result if s is an integer
*/

function consecutiveIntegerSum(num) {
    // Write your code here
    var i, bound = Math.floor(Math.sqrt(num * 2)), result = 0, start;

    for (i = 2; i <= bound; i++) {
        start = (num * 2 - i * i + i) / (2 * i);
        if (Number.isInteger(start)) {
            result++;
        }
    }
    return result;
}
