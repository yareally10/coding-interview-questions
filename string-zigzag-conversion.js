/*
Zigzag conversion.

Given string: paypalishiring

zigzag number: 2
returns: pyaihrhaplsiig
p y a i h r h
 a p l s i i g


zigzag number: 3
returns: pahnaplsiigyir
p   a   h   n
 a p l s i i g
  y   i   r

zigzag number: 4
returns: pinalsigyahrpi
p     i     n
 a   l s   i g
  y a   h r
   p     i

zigzag number: 5
returns: phasiyirpliag
p       h
 a     s i
  y   i   r
   p l     i
    a       g

*/

function zigzag(str, num) {
    var result = "",
        i,
        j,
        k,
        len = str.length,
        currIndex = 0,
        currGap,
        firstGap,
        secondGap;

    if(num < 2) {
        return str;
    } 

    for(i=0; i<num; i++) {
        if(i==0 || i==num-1) {
            firstGap = 2*(num-1);
            secondGap = firstGap;
        } else {
            firstGap = 2*(num-1-i);
            secondGap = 2*i;
        }
        currIndex = i;
        j = 0;
        /*
        result += "\n";
        for(k=0; k<i; k++) {
            result += " ";
        }
        //*/

        while(currIndex < len) {
            result += str[currIndex];
            if(j%2 == 0) {
                currGap = firstGap;
            } else {
                currGap = secondGap;
            }
            currIndex += currGap;
            j++;
            /*
            for(k=0; k<currGap-1; k++) {
                result += " ";
            }
            //*/
        }
    }

    return result;
}