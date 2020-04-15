/**
Given a binary tree, return number of subtrees where all nodes of the subtree 
has the same value.

E.G:
      7
    /   \
   5     6
  / \   / \
 1   2 3   4

Output: 4 (four leaf nodes)

E.G:
      7
    /   \
   5     3
  / \   / \
 1   2 3   3

Output: 5 (four leaf nodes and the subtree of 3s)

E.G:
      7
    /   \
   5     3
  / \   / 
 1   2 3   

Output: 4 (three leaf nodes and the subtree of 3s, no need for both children)

E.G:
      7
    /   \
   5     3
  / \   / \
 1   2 3   2

Output: 4 (four leaf nodes)
*/

function univalue(tree) {
	//using an array to make sure result is updated (force pass by reference)
	let result = [0];
	univalueHelper(tree, result);
	return result[0];
}

function univalueHelper(node, count) {
	if (node == null) {
		//node is null, return true
		return true;
	} else if (node.left == null && node.right == null) {
		//leaf node, increment count and return true (all subtree has same value)
		count[0]++;
		return true;
	} else {
		let leftSubtree, rightSubtree;
		leftSubtree = univalueHelper(node.left, count);
		rightSubtree = univalueHelper(node.right, count);
		//if left subtree has univalue, and current node value equals left child value
		//and the same is true for right
		//increment counter and return true
		if (leftSubtree && (node.left == null || node.left.value == node.value) && 
			  rightSubtree && (node.right == null || node.right.value == node.value)
			) {
			count[0]++;
			return true;
		} else {
			return false;
		}
	}
}

//Test
let 
c = {
    value: 1,
    left: null,
    right: null
},
d = {
    value: 2,
    left: null,
    right: null
},
e = {
    value: 3,
    left: null,
    right: null
},
f = {
    value: 3,
    left: null,
    right: null
}
a = {
    value: 5,
    left: c,
    right: d
},
b = {
    value: 3,
    left: e,
    right: f
},
root = {
    value: 7,
    left: a,
    right: b
};

univalue(root);
