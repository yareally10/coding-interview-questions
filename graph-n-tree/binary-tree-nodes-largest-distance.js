/*
Find the largest distance between two nodes in a binary tree



Algorithm:
Find the height of each node, which is the larger of its (left/right) subtree 
height plus 1
During this traversal, calculate largest distance with each node as the "root," 
which is 1+left+right
*/

function findDiameter(root, result) {
    if(root == null) {
        return 0;
    }

    var left = findDiameter(root.left, result),
        right = findDiameter(root.right, result),
        ans = 1 + left + right;

    result[0] = ans > result[0] ? ans : result[0];

    return Math.max(left, right) + 1;
}

function findLargestDistance(root) {
    var result = [0];
    findDiameter(root, result);
    return result[0];
}

