/*
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
},
*/

function inorderTraversal(root) {
    if(root === null) {
        return;
    } else {
        inorderTraversal(root.left);
        console.log(root.val);
        inorderTraversal(root.right);
    }
}

function preorderTraversal(root) {
    if(root === null) {
        return;
    } else {
        console.log(root.val);
        preorderTraversal(root.left);
        preorderTraversal(root.right);
    }
}

function postorderTraversal(root) {
    if(root === null) {
        return;
    } else {
        postorderTraversal(root.left);
        postorderTraversal(root.right);
        console.log(root.val);
    }
}

function breadthFirstTraversal(root) {
    var queue = [root], node;

    while(queue.length > 0) {
        node = queue.shift();
        if(node) {
            console.log(node.val);
            queue.push(node.left);
            queue.push(node.right);
        }
    }
}