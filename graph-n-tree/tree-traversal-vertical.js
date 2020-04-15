/*
Given a binary tree, print it vertically, from left to right.


Algorithm:
Traverse the tree, starting from root, with distance of 0.
    When going left, use distance - 1
    When going right, use distance + 1
While traversing the tree, 
    keep track of min and max distance values
    build a hash table where the key is the distance, and the value is a list of 
    nodes
After building the hash table, go through it from min distance to max
*/

function verticalTraversalHelper(node, vals, distance, data) {
    if(node == null) {
        return vals;
    } else {
        if(distance < vals[0]) {
            vals[0] = distance;
        } else if(distance > vals[1]) {
            vals[1] = distance;
        }
        if(data.hasOwnProperty(distance)) {
            data[distance].push(node);
        } else {
            data[distance] = [node];
        }

        verticalTraversalHelper(node.left, vals, distance - 1, data);
        verticalTraversalHelper(node.right, vals, distance + 1, data);

        return vals;
    }
}

function verticalTraversal(root) {
    let data = {}, vals = [0, 0], i, result = [];
    vals = verticalTraversalHelper(root, vals, 0, data);

    for(i=vals[0]; i<=vals[1]; i++) {
        data[i].forEach(function(n) {
            result.push(n.val);
        });
    }

    //console.log(data);
    return result;
}