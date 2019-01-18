//find if two strings are anagrams of each other

function isAnagram(str1, str2) {
    var i = 0,
        len1 = str1.length,
        len2 = str2.length,
        dict = {};

    if(len1 != len2) {
        return false;
    }
    
    for(i=0; i<len1; i++) {
        if(dict.hasOwnProperty(str1[i])) {
            dict[str1[i]]++;
        } else {
            dict[str1[i]] = 1;
        }
    }

    for(i=0; i<len2; i++) {
        if(!dict.hasOwnProperty(str2[i])) {
            return false;
        } else {
            dict[str2[i]]--;
            if(dict[str2[i]] == 0) {
                delete dict[str2[i]];
            }
        }
    }

    return Object.keys(dict).length === 0;
}