/**
 * Given a string, return the longest substring that contains all unique
 * characters.
 *
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const memo = {};
  let result = 0, currVal = 0, currHead = 0;
  for (let i=0; i<s.length; i++) {
    let temp = s[i];
    if (memo.hasOwnProperty(temp)) {
      currHead = memo[temp] > currHead ? memo[temp] : currHead;
      memo[temp] = i;
      currVal = i - currHead;
      result = result > currVal ? result : currVal;
    } else {
      memo[temp] = i;
      currVal++;
      result = result > currVal ? result : currVal;
    }
  }
  return result;
};