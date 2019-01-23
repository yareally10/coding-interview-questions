/*
You are playing a game with a friend. The playground is a binary tree. When the 
game starts, both of you pick a node as the starting point. Then you both start 
to expand your domain.

The rule to expand:
In each turn, both you and your friend expand your domain to neighboring 
unoccupied nodes in all possible directions (parent, left child, right child).

When the game ends:
When no player can expand their domain any further.

Who wins:
Count the number of nodes each player occupies. The person with more nodes wins.

Question:
Now you have a binary tree. Also your friend has picked a node already. How do 
you decide which node you will pick as the starting point?



Algorithm: 
To get the maximum number of nodes at end game, I should pick one of the three 
(potential) nodes next to opponent's node. 

This becomes a problem of finding number of connected nodes given a node in a 
binary tree. 
If the given node is a root of a subtree (children of opponent's node), 
    count number of nodes in that subtree.
If the given node is the parent of opponent's node 
(can only count one side of its subtree), 
    count the number of nodes in the other subtree, go to this node's parent 
    and repeat until root is reached.

node structure: {
    left: node,
    right: node,
    parent: node,
    val: value
}
*/

function countSubtree(node) {
    if(node == null) {
        return 0;
    } else {
        return countSubtree(node.left) + countSubtree(node.right) + 1;
    }
}

function countNodes(node, prevNode) {
    if(!node) {
        return 0;
    }
    var count = 0,
        subtreeNode;

    do {
        //count the current node
        count++;
        //count the other subtree
        subtreeNode = (prevNode == node.left) ? node.right : node.left;
        count += countSubtree(subtreeNode);
        //update node to its parent
        prevNode = node;
        node = node.parent;
    } (node);

    return count;
}

function treeGame(root, node) {
    return Math.max(countSubtree(node.left), countSubtree(node.right), countNodes(node.parent, node));
}
