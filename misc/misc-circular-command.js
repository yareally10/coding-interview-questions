/*
You are working on a computer simulation of a mobile robot. The robot moves on 
an infinite plane. Its movements are described by a command string consisting of 
one or more of the following three letters:
G - instructs the robot to move forward one step.
L - instructs the robot to turn left.
R - instructs the robot to turn right.

The robot performs the instructions in a command sequence in an infinite loop. 
You want to know whether or not there exists some circle such that the robot 
always moves within the circle and never leaves it.

Consider the commands R and G executed infinitely. A diagram of the robot's 
movement looks like:
RG -> RG
^     |
|     v
RG <- RG

Question: Given a command, find out if it makes the robot go in a circle.




Key: 
Execute command four times and check if the robot is back to original spot
*/

function moveRobot(currPos, heading) {
    return [currPos[0] + heading[0], currPos[1] + heading[1]];
} 

function hasCircle(command) {
    var i = 0, 
        j = 0, 
        currPos = [0, 0], 
        heading = 0, 
        currCommand,
        turns = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    do {
        currCommand = command[i];
        if (currCommand == 'G') {
            currPos = moveRobot(currPos, turns[heading]);
        } else if (currCommand == 'R') {
            heading++;
            heading = heading > 3 ? 0 : heading;
        } else {
            heading--;
            heading = heading < 0 ? 3 : heading;
        }
        i++;
        //do this four times
        if (i == command.length && j < 3) {
            i = 0;
            j++;
        }
    } while (i < command.length);

    return currPos[0] == 0 && currPos[1] == 0;
}

function doesCircleExist(commands) {
    // Write your code here
    var results = [];
    commands.forEach(function (c) {
        if (hasCircle(c)) {
            results.push('YES');
        } else {
            results.push('NO');
        }
    });

    return results;
}
