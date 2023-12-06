
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

/**
 Do not return anything, modify head in-place instead.
 */
function reorderList(head: ListNode | null): void {
  const ary: ListNode[] = []
  while (head) {
    ary.push(head)
    head = head.next
  }
  head = ary.shift()
  let flag: boolean = true
  while (ary.length > 0) {
    head.next = flag ? ary.pop() : ary.shift()
    flag = !flag
    head = head.next
  }
  head.next = null
};

export { }

// 输入：head = [1,2,3,4]
// 输出：[1,4,2,3]