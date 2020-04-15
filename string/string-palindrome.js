/*
Palindrome. Check if given string is a palindrome.
*/
//string without spaces or punctuations
function isPalindromeBasic(str) {
    var i = 0,
        len = str.length;

    for(i=0; i<len/2; i++) {
        if(str[i] != str[len - 1 - i]) {
            return false;
        }
    }
    return true;
}

//string with spaces or punctuations (need to ignore)
function isPalindrome(str) {
    var len = str.length,
        i = 0,
        j = len - 1,
        alphaNumeric = /\w/;

    str = str.toLowerCase();

    while(i < j && i < len && j >= 0) {
        if(!str[i].match(alphaNumeric)) {
            i++;
            continue;
        }
        if(!str[j].match(alphaNumeric)) {
            j--;
            continue;
        }

        if(str[i] != str[j]) {
            return false;
        }
        i++;
        j--;
    }

    return true;
}

/*
Find the longest palindrome that's a substring of the given string

Algorithm:
Try to generate palidrome from within the string.
There are n letters and n-1 gaps as possible starts.
For each of those possibles, calculate the start and end of the possible palindrome
    Check if possible is a palindrome, if so, expand and repeat checking.
    Update current longest if current possible is longer
Return current max once done
*/
var longestPalindrome = function(s) {
  //validate input
  if (s == null || s.length == 0) {
    return s;
  }
  //initialize variables
  let possibilities = s.length*2 - 1,
      currPal = s[0],
      result = currPal;
  //loop through all possibilities
  for (let i=1; i< possibilities; i++) {
    let start, end, isPal = false;
    if (i%2 == 0) {
      start = i/2 - 1;
      end = i/2 + 1;
    } else {
      start = Math.floor(i/2);
      end = Math.floor(i/2) + 1;
    }
    //check if there is a palindrome around current center
    while (start >=0 && end < s.length) {
      if (s[start] == s[end]) {
        isPal = true;
        start--;
        end++;
      } else {
        break;
      }
    }
    //if a palindrome has been found, compare to current longest
    if (isPal) {
      //the previous start is (start+1) and end is (end-1)
      //second parameter of substring method is non-inclusive, need to increment it by 1
      currPal = s.substring(start+1, end);
      result = currPal.length > result.length ? currPal : result;
    }
  }
  return result;
};