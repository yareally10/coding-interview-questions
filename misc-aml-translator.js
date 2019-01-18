/*
Translate Alien Markup Language to HTML

Two AML elements have been identified thus far:
Text Effect   Opening Tag   Closing Tag
Strong        ^%            ^!%
Emphasis      ^~            ^!~

Input: ”^~Hello, ^%Earth!^!~ You are ^~welcome^!% here.^!~” 
Output: ”<em>Hello, <strong>Earth!</strong></em><strong> 
  You are<em>welcome</em></strong><em> here.</em>”
*/

var AMLTranslator = (function () {
  // YOUR CODE GOES HERE
  this.translate = function(str) {
    var result = "",
        beginSymbol = "^",
        endSymbol = "!",
        dictionary = {
            "~": ["<em>", "</em>"],
            "%": ["<strong>", "</strong>"]
        },
        i,
        j,
        len = str.length,
        stack = [];

    for(i=0; i<len; i++) {
      if(str[i] == beginSymbol) {
        i++;
        if(str[i] == endSymbol) {
          i++;
          for(j = stack.length - 1; j>=0; j--) {
            result += dictionary[stack[j]][1];
            if(stack[j] == str[i]) {
              stack.splice(j, 1);
              break;
            }
          }
          while(j < stack.length) {
            result += dictionary[stack[j]][0];
            j++;
          }
        } else {
          stack.push(str[i]);
          result += dictionary[str[i]][0];
        }
      } else {
        result += str[i];
      }
    }

    return result;
  }

  return this;
})();