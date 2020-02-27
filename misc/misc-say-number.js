/***
Given a number, translate it into a string that describes the number.
E.G.
1 => 1 1
11 => 2 1
399900 => 1 3, 3 9, 2 0

Algorithm:
Convert the number into a string.
Traverse the string and compare to current digit
*/

function sayNumber(number) {
	let result = '',
			numString = number + '',	//JS trick to convert to string
			[currDigit] = numString,	//initialize first digit and count
			count = 1;

	//note the loop start with the SECOND digit of the number (first is initialized)
	for(let i=1; i<numString.length; i++) {
		if(currDigit != numString[i]) {
			//if different than current digit, say current digit
			result += `${sayDigitcount(currDigit, count)}, `;
			//reset current digit and count
			currDigit = numString[i];
			count = 1;
		} else {
			//if same as current digit, increment count
			count++;
		}
	}
	//say final digit
	result += sayDigitcount(currDigit, count);

	return result;
}

function sayDigitcount(digit, count) {
	return `${translateCount(count)} ${digit}`;
}

//separating this method out because there are many ways to translate how to "say" a number
//E.G. if 1 => one 1, update this method here with a dictionary
function translateCount(count) {
	return count;
}