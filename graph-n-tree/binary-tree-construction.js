/**
 * Given two arrays, that are preorder and inorder outputs of a tree, 
 * construct the tree.
 * 
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  return buildTreeHelper(preorder.slice(), inorder.slice());
};

function buildTreeHelper(preorder, inorder) {
  if (inorder.length == 0 || preorder.length == 0) {
    return null;
  }
  
  let val = preorder.shift(),
      index = inorder.indexOf(val),
      node = new TreeNode(val),
      leftArr = inorder.slice(0, index),
      rightArr = inorder.slice(index+1, inorder.length);
  if (leftArr.length > 0) {
    node.left = buildTreeHelper(preorder, leftArr);
  }
  if (rightArr.length > 0) {
    node.right = buildTreeHelper(preorder, rightArr);
  }
  return node;
}

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

//preorder print tree with all leaves
function printTree(root) {
  let queue = [root], result = [];
  while (queue.length > 0) {
    let node = queue.shift();
    if (node != null) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }
  return result;
}

printTree(buildTree([3,9,20,15,7], [9,3,15,20,7]));