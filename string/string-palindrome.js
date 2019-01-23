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
function longestPalindrome(str) {
    var i = 0,
        len = str.length,
        possibles = len*2 - 1,
        currLong = 1,
        currPalindrome = str[0],
        currString,
        start,
        end,
        isPal;

    for(i=1; i<possibles; i++) {
        if(i % 2 == 0) {
            start = i/2 - 1;
            end = i/2 + 1 + 1;
        } else {
            start = Math.floor(i/2);
            end = Math.floor(i/2) + 1 + 1;
        }
        isPal = true;

        while(isPal && start >= 0 && end <= len) {
            isPal = str[start] == str[end - 1];
            if(isPal) {
                currString = str.substring(start, end);
                if(currString.length > currLong) {
                    currLong = currString.length;
                    currPalindrome = currString;
                }
                start--;
                end++;
            } else {
                break;
            }
        }
    }

    return currPalindrome;
}
