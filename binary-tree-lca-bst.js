/*
Find lowest common ancestor between two nodes of a binary search tree

Algorithm:
If root greater than both, go left
If root less than both, go right
Otherwise, root is the LCA

O(h), where h is height of tree
*/

function lcaBST(root, n1, n2) {
    if(root == null) {
        return root;
    }

    if(root.val > n1 && root.val > n2) {
        return lcaBST(root.left, n1, n2);
    } else if(root.val < n1 && root.val < n2) {
        return lcaBST(root.right, n1, n2);
    } else {
        return root;
    }
}