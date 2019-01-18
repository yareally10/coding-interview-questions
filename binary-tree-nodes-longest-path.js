/*
Find the longest path between two nodes in a binary tree

Algorithm:
(Similar to findLargestDistance.)
Find the height of each node, which is the larger of its (left/right) subtree height plus 1
During this traversal, calculate largest distance with each node as the "root" 
which is 1+left+right

Instead, store largest distance value, left path, and right path
*/

function findLongestPathHelper(root, memo) {
    if(root == null) {
        return [];
    }

    //find left and right path
    var leftPath = findLongestPathHelper(root.left, memo),
        rightPath = findLongestPathHelper(root.right, memo),
        pathLen = 1 + leftPath.length + rightPath.length;

    //add current root to left and right path
    leftPath.push(root.val);
    rightPath.push(root.val);

    //update if current total path is longer than max
    if(pathLen > memo[0]) {
        memo[1] = leftPath;
        memo[2] = rightPath;
        memo[0] = pathLen;
    }

    //return the longer path
    return leftPath.length > rightPath.length ? leftPath : rightPath;
}

function findLongestPath(root) {
    var memo = [0];

    findLongestPathHelper(root, memo);
    //ignore last element of right path (duplicate root)
    memo[2].pop();
    //reverse right path and add to left path
    memo[2].reverse();

    return memo[1].concat(memo[2]);
}