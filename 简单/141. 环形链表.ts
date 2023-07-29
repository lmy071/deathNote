/**
 * Definition for singly-linked list.
 * 
 */
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function hasCycle(head: ListNode | null): boolean {
  let set = new Set()
  let res: boolean = false
  const dfs = (node) => {
    if (!node) return
    if (set.has(node)) {
      res = true
      return
    } else {
      set.add(node)
    }
    dfs(node.next)
  }
  dfs(head)
  return res
};