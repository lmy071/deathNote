/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
    let res1 = [], res2 = []
    if (root1) {
        dfs(root1, res1)
    }
    if (root2) {
        dfs(root2, res2)
    }
    return JSON.stringify(res1) == JSON.stringify(res2)
};
dfs = (root, res) => {
    if (!root.left && !root.right) {
        res.push(root.val)
    } else {
        if (root.left) {
            dfs(root.left, res)
        }
        if (root.right) {
            dfs(root.right, res)
        }
    }
}