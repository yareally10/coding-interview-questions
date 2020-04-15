/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
  if (head == null) {
    return head;
  }
  let odd = head, even = head.next, evenHead = head.next;
  while (odd != null && even != null) {
    odd.next = even.next;
    if (odd.next != null) {
      odd = odd.next;
      even.next = odd.next;
    } else {
      even.next = null;
      break;
    }
    even = even.next;
  }
  odd.next = evenHead;
  return head;
};