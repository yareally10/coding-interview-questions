/*
Find the distance between two keys in a binary tree, no parent pointers are given. 
Distance between two nodes is the minimum number of edges to be traversed to reach 
one node from other.

Algorithm:
Find the lowest common ancestor between the two nodes.
Then find distance between those nodes and LCA. 
Add the distance together and that's the result.

Test:
        root
        /  \
       a    b
      / \  / \
     c  d g   h
    / \      / \
   e   f    i   j
      /    /   / \
     k    l   m   n

var d = {
    val: "d",
    left: null,
    right: null
},
e = {
    val: "e",
    left: null,
    right: null
},
g = {
    val: "g",
    left: null,
    right: null
},
k = {
    val: "k",
    left: null,
    right: null
},
l = {
    val: "l",
    left: null,
    right: null
},
m = {
    val: "m",
    left: null,
    right: null
},
n = {
    val: "n",
    left: null,
    right: null
},
f = {
    val: "f",
    left: k,
    right: null
},
i = {
    val: "i",
    left: l,
    right: null
},
j = {
    val: "j",
    left: m,
    right: n
},
h = {
    val: "h",
    left: i,
    right: j
},
c = {
    val: "c",
    left: e,
    right: f
},
a = {
    val: "a",
    left: c,
    right: d
},
b = {
    val: "b",
    left: g,
    right: h
},
root = {
    val: "root",
    left: a,
    right: b
}
*/

function LCA(root, n1, n2) {
    //if null, return null
    if(root == null) {
        return null;
    }

    //if one of the nodes is found, return it
    if(root == n1 || root == n2) {
        return root;
    }

    //find LCA in subtrees
    var left = LCA(root.left, n1, n2),
        right = LCA(root.right, n1, n2);

    //if nodes are found on left and right side, current root is the LCA
    if(left != null && right != null) {
        return root;
    }

    //return the node found from left or right subtree
    return left != null ? left : right;
}

function findDistanceParentChild(root, node, distance) {
    if(root == null) {
        return -1;
    }

    if(root == node) {
        return distance;
    }

    var left = findDistanceParentChild(root.left, node, distance + 1);

    return left != -1 ? left : findDistanceParentChild(root.right, node, distance + 1);
}

function findDistance(root, n1, n2) {
    var lca = LCA(root, n1, n2),
        lcaN1 = findDistanceParentChild(lca, n1, 0),
        lcaN2 = findDistanceParentChild(lca, n2, 0);

    return lcaN1 != -1 && lcaN2 != -1 ? lcaN1 + lcaN2 : -1;
}
