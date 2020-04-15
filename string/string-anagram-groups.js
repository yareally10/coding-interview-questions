/**
 * Given an array of strings, group them by their anagrams.
 *
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const result = [], memo = {};
  for (let i=0; i<strs.length; i++) {
    let key = hashFunc(strs[i]);
    if (memo.hasOwnProperty(key)) {
      memo[key].push(strs[i]);
    } else {
      memo[key] = [strs[i]];
    }
  }
  return Object.values(memo);
};

function hashFunc(str) {
  const alphabet = new Array(26), ref = "a".charCodeAt(0);
  let result = '';
  alphabet.fill(0);
  for (let i=0; i<str.length; i++) {
    let temp = str.charCodeAt(i) - ref;
    alphabet[temp]++;
  }
  //reconstruct anagram; 
  for (let i=0; i<alphabet.length; i++) {
    while (alphabet[i] > 0) {
      let temp = String.fromCharCode(ref+i);
      result += temp;
      alphabet[i]--;
    }
  }
  return result;
}