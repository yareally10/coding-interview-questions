/**
Given an array (current state) and a number (days), find the final state of the
array at the end. 
Rules: if both neighbors of an element are the same, that element will be 
inactive (0). Otherwise, it will be active (1). For the elements at the end, 
consider the side without a neighbor as inactive (0).
*/

function cellCompete(states, days)
{
    // WRITE YOUR CODE HERE 
    let nextState = states.slice(), 
        currState = states.slice();
        
    for (let i=0; i<days; i++) {
        for (let j=0; j<currState.length; j++) {
            let neighbor1 = j - 1, neighbor2 = j + 1, n1, n2;
            if (j === 0) {
                n1 = 0;
                n2 = currState[neighbor2];
            } else if (j === currState.length - 1) {
                n1 = currState[neighbor1];
                n2 = 0;
            } else {
                n1 = currState[neighbor1];
                n2 = currState[neighbor2];
            }
            nextState[j] = n1 === n2 ? 0 : 1;
        }
        currState = nextState.slice();
        console.log(currState);
    }
    return nextState;
}

cellCompete([0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1], 4);