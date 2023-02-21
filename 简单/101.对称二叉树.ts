/*
 * @lc app=leetcode.cn id=101 lang=typescript
 *
 * [101] 对称二叉树
 */

// @lc code=start

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

function isSymmetric(root: TreeNode | null): boolean {
    if(!root) return true
    const a = (l,r)=>{
        let ary = [l,r]
        while(ary.length){
            const rr  = ary.shift()
            const ll = ary.shift()
            if(rr === null && ll === null) continue
            if(rr === null || ll === null) return false
            if(rr.val !== ll.val) return false
            ary.push(rr.left,ll.right)
            ary.push(rr.right,ll.left)
        }
        return true
    }
    return a(root.left,root.right)
};
// @lc code=end

