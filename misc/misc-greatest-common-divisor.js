/**
Given an array of positive integers, find the greatest common divisor of these 
numbers.

E.G:
[2, 4, 6, 8] = 2

Test:
generalizedGCD([2, 4, 6, 8]);
*/

function generalizedGCD(arr)
{
  let result = arr[0];
  for (let i=1; i<arr.length; i++) {
    result = gcd(result, arr[i]);
    if (result == 1) {
      return result;
    }
  }
  return result;
}

function gcd(a, b) {
  if (a == 0) {
    return b
  }
  return gcd(b % a, a);
}

generalizedGCD([2, 4, 6, 8]);
