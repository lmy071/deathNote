// 在二叉树中，根节点位于深度 0 处，每个深度为 k 的节点的子节点位于深度 k+1 处。

// 如果二叉树的两个节点深度相同，但 父节点不同 ，则它们是一对堂兄弟节点。

// 我们给出了具有唯一值的二叉树的根节点 root ，以及树中两个不同节点的值 x 和 y 。

// 只有与值 x 和 y 对应的节点是堂兄弟节点时，才返回 true 。否则，返回 false。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
    let xx = dfs(null,root, 0, x)
    let yy = dfs(null,root, 0, y)
    return xx[0] === yy[0] && xx[1] !== yy[1]
};

let dfs = (father,node, depth, target) => {
    if (!node) return [-1,null]
    if(node.val === target) return [depth,(father&&father.val||null)]
    let left = dfs(node,node.left,depth+1,target)
    if(left[0] !== -1) return left
    return dfs(node,node.right,depth+1,target)
}


