/*
Question: Compare if one string is a shorthand of another.
E.G.: internationalization = i18n
      apple = a4
      apple = 5
      house = h1u2
      house != h2ee

isShorthand("internationalization", "i15t2n")
*/

function isShorthand(str, sh) {
    var i = 0,
        j = 0,
        count = 0,
        len1 = str.length,
        len2 = sh.length,
        alpha = /[a-z]/;

    str = str.toLowerCase();
    sh = sh.toLowerCase();

    while(i<len1 && j<len2) {
        if(sh[j].match(alpha)) {
            if(str[i] != sh[j]) {
                return false;
            } else {
                i++;
                j++;
            }
            count = 0;
        } else {
            while (j<len2 && !sh[j].match(alpha)) {
                count = count*10 + parseInt(sh[j]);
                j++;
            }
            i += count;
        }
    }

    return i == len1 && j == len2;
}