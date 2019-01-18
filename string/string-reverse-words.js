/*
Reverse words in a sentence
*/

function reverseString(str) {
    var start = 0,
        end = str.length - 1,
        front = "",
        back = "";

    while(start < end) {
        front += str[end];
        back = str[start] + back;
        start++;
        end--;
    }

    return start == end ? front+str[start]+back : front+back;
}

function reverseWords(str) {
    var rev = reverseString(str),
        word = "";
        result = "",
        i = 0,
        len = str.length;

    for(i=0; i<len; i++) {
        if(rev[i] == ' ') {
            if(word.length > 0) {
                result += reverseString(word);
            }
            result += ' ';
            word = "";
        } else {
            word += rev[i];
        }
    }

    if(word.length > 0) {
        result += reverseString(word);
    }

    return result;
}