/*
Check if a given string is a formatted number



Key:
Start from the end of the string
*/

function isNumber(str) {
    if(str.length == 0) {
        return false;
    }

    if(str[0] == "-") {
        str = str.slice(1);
    }

    var i,
        len = str.length,
        numCount = 0,
        seenPeriod = false,
        seenComma = false;
        numPattern = /[0-9]/;

    for(i=len-1; i>=0; i--) {
        if(str[i].match(numPattern)) {
            numCount++;
        } else if(str[i] == ".") {
            if(seenPeriod) {
                return false;
            } else {
                seenPeriod = true;
                if(numCount == 0 || seenComma) {
                    return false;
                }
                numCount = 0;
            }
        } else if(str[i] == ",") {
            seenComma = true;
            if(numCount != 3) {
                return false;
            } else {
                numCount = 0;
            }
        } else {
            return false;
        }
    }

    return (!seenComma || (seenComma && numCount <= 3));
}