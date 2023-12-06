/*
 * @lc app=leetcode.cn id=404 lang=typescript
 *
 * [404] 左叶子之和
 */

// @lc code=start

//  Definition for a binary tree node.
  class TreeNode {
      val: number
      left: TreeNode | null
      right: TreeNode | null
      constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.left = (left===undefined ? null : left)
          this.right = (right===undefined ? null : right)
      }
  }
 

function sumOfLeftLeaves(root: TreeNode | null): number {
   let sum:number = 0;
   const sumFn = (root:TreeNode | null):void=>{
    if(root === null){
        return
    }
    if(root.left && !root.left.left && !root.left.right){
        sum = root.left.val + sum;
    }
    sumFn(root.left)
    sumFn(root.right)
   }
   sumFn(root)
   return sum
};
// @lc code=end

