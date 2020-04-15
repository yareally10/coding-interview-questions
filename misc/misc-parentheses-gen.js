/**
 * Given a number n, where n is the total pairs of parentheses, return all
 * possible legal combinations of parentheses.
 * 
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  let result = [];
  parenthesisHelper(n-1, 1, '(', result);
  return result;
};

function parenthesisHelper(totalLeft, openLeft, combo, result) {
  if (totalLeft < 0 || openLeft < 0) {
    return;
  } else if (totalLeft == 0 && openLeft == 0) {
    result.push(combo);
  } else if (openLeft > 0 && totalLeft > 0) {
    parenthesisHelper(totalLeft, openLeft-1, combo+')', result);
    parenthesisHelper(totalLeft-1, openLeft+1, combo+'(', result);
  } else if (openLeft == 0 && totalLeft > 0) {
    parenthesisHelper(totalLeft-1, openLeft+1, combo+'(', result);
  } else if (openLeft > 0 && totalLeft == 0) {
    parenthesisHelper(totalLeft, openLeft-1, combo+')', result);
  }
}