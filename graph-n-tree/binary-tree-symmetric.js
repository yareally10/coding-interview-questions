/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Given the root node of a tree, determine if the tree is symmetric at the root.
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if (root == null) {
    return true;
  }
  let currLeftQueue = [root.left], 
      currRightQueue = [root.right], 
      nextLeftQueue = [], 
      nextRightQueue = [], 
      nodeL,
      nodeR;
  
  while (currLeftQueue.length > 0 && currRightQueue.length > 0) {
    nodeL = currLeftQueue.shift();
    nodeR = currRightQueue.shift();
    if (nodeL != null && nodeR != null) {
      if (nodeL.val != nodeR.val) {
        return false;
      }
      
      nextLeftQueue.push(nodeL.left);
      nextLeftQueue.push(nodeL.right);
      nextRightQueue.push(nodeR.right);
      nextRightQueue.push(nodeR.left);
    } else if (nodeL != nodeR) {
      return false;
    }

    if (currLeftQueue.length == 0 || currRightQueue.length == 0) {
      currLeftQueue = nextLeftQueue;
      currRightQueue = nextRightQueue;
      nextLeftQueue = [];
      nextRightQueue = [];
    }
  }
  
  return true;
};