/**
Given two strings s and t, find if s is divisble by t. If so, find the smallest
common divisor of the two strings. 
A string s is divisible by t if s can be constructed by (full) copies of t.

E.G:
s: rblb
t: rblb
Output: rblb

s: rbrbrb
t: rbrb
Output: false

s: rbrbrbrb
t: rbrb
Output: rb

*/

function findSmallestDivisor(s, t) {
  // Write your code here
  if (s.length % t.length != 0) {
    return '';
  }
  
  if (isDivisibleByString(s, t)) {
    //find substrings of t that t is divisible, starting with the smallest substring (1 char)
    for (let i=1; i<=Math.floor(t.length/2); i++) {
      let temp = t.slice(0, i);
      if (isDivisibleByString(t, temp)) {
        return temp;
      }
    }
    //if no such substring of t exists, t is the smallest divisor of s
    return t;
  } else {
    return '';
  }
}

//check to see if s is divisible by t
function isDivisibleByString(s, t) {
  let i = 0, len = t.length, temp;
  while (i + len <= s.length) {
    temp = s.slice(i, i+len);
    if (t != temp) {
      return false;
    }
    i += len;
  }
  return true;
}
