/*
Given root of binary search tree and K as input, find K-th smallest element in BST. 
Your task is to return the K-th smallest element in BST.



*/

function kSmallestHelper(root, k, count) {
    var result;
    if(root == null || count > k) {
        return false;
    }

    //vist left subtree
    result = kSmallestHelper(root.left, k, count);

    if(!result) {
        //increment count
        count++;
        if(count == k) {
            result = root.val;
        }

        //visit right subtree
        if(!result) {
            result = kSmallestHelper(root.right, k, count);
        }
    }

    return result;
}

function kSmallest(root, k) {
    return kSmallestHelper(root, k, 0);
}


//Morris inorder traversal
function kSmallestNoRecursion(root, k) {
    var count = 0,
        curr = root,
        pre,
        result;

    while(curr != null) {
        //if left subtree is null, visit current node
        if(curr.left == null) {
            count++;
            if(count == k) {
                result = curr.val;
            }
            //always go right after each visit
            curr = curr.right;
        } else {
            //otherwise, find the right most child of left subtree
            pre = curr.left;
            while(pre.right != null && pre.right != curr) {
                pre = pre.right;
            }

            //put current node as the right child of rightmost child of left subtree            
            if(pre.right == null) {
                pre.right = curr;
                curr = curr.left;
            } else {
                //undo link from original rightmost child of left subtree
                pre.right = null;
                //visit node
                count++;
                if(count == k) {
                    result = curr.val;
                }
                //always go right after each visit
                curr = curr.right;
            }
        }
    }

    return result;
}
