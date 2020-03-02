// Write a function that parses and evaluates an arithmetic string
// Ex. "1+2", "34-5*100", "10-20*30+40/50"
// Positive integers separated by +, -, * or /. No parentheses
// You must respect the order of operations: *, / take precedence over +, -
// Do not use "eval" or 3rd party libraries.
// Please limit yourself to about 60 minutes. Good luck!
//

/*
"1+2" = 3;
"34-5*100" = -466, 
"10-20*30+40/50" = 10 - 600 + 0.8 = -589.2

Use a stack to store numbers and operands
push onto stack if number, unless it's second number, then evaluate and push
push operand onto stack if + or -
do calculation * or /

*/


function parseMath(s) {
  const regex = /[0-9]/, stack1 = [], stack2 = [];
  let currNum = 0;
  for (let i=0; i<s.length; i++) {
    if (regex.test(s[i])) {
      currNum = currNum * 10 + parseInt(s[i]);
    } else {
      if (s[i] == '+' || s[i] == '-') {
        //check if there are things on multiply/division stack
        currNum = calculateCurrentNumber(currNum, stack2);
        //push onto main stack
        stack1.push(currNum);
        stack1.push(s[i]);
        currNum = 0;
      } else {
        currNum = calculateCurrentNumber(currNum, stack2);
        //push onto multiply/division stack
        stack2.push(currNum);
        stack2.push(s[i]);
        currNum = 0;
      }
    }
  }
  
  currNum = calculateCurrentNumber(currNum, stack2);
  stack1.push(currNum);

  return calculateArray(stack1);
}

function calculateCurrentNumber(currNum, stack) {
  let prevOp, prevNum;
  if (stack.length != 0) {
    prevOp = stack.pop();
    prevNum = stack.pop();
    if (prevOp == '*') {
      return prevNum * currNum;
    } else {
      return prevNum / currNum;
    }
  } else {
    return currNum;
  }
}

function calculateArray(arr) {
  const regex = /[\+\-\*\/]/;
  let result = 0, currOp = '+';
  for (let i=0; i<arr.length; i++) {
    if (!regex.test(arr[i])) {
      if (currOp === '+') {
        result += arr[i];
      } else {
        result -= arr[i];
      }
    } else {
      currOp = arr[i];
    }
  }
  
  return result;
}

parseMath("34-5*100*2/2*2/4+250+16+1*10/100");
