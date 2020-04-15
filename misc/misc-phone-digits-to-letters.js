/**
 * Given a string of numbers, return all possible combinations of strings it 
 * could be interpreted as.
 *
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  if (digits == '') {
    return [];
  }
  const dict = {}, memo = {};
  dict['2'] = 'abc';
  dict['3'] = 'def';
  dict['4'] = 'ghi';
  dict['5'] = 'jkl';
  dict['6'] = 'mno';
  dict['7'] = 'pqrs';
  dict['8'] = 'tuv';
  dict['9'] = 'wxyz';
  let digitStr = digits+'',
      result = letterCombo(digitStr, dict, memo);
  //console.log(memo);
  return result;
};

function letterCombo(digits, dict, memo) {
  if (digits.length == 0) {
    return [''];
  }
  let digit = digits[0],
      subDigits = digits.substring(1),
      letters = dict[digit],
      result = [];
  if (letters != null && letters !== 'undefined') {
    for (let i=0; i<letters.length; i++) {
      if (!memo.hasOwnProperty(subDigits)) {
        memo[subDigits] = letterCombo(subDigits, dict, memo);
      }
      if (memo[subDigits] != null) {
        memo[subDigits].forEach(d => {
          result.push(letters[i]+d);
        });
      } else {
        result = null;
        break;
      }
    }
  } else {
    result = null;
  }
  return result;
}

letterCombinations("23");