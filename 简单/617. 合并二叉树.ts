
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

function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
    const dfs = (l: TreeNode | null, r: TreeNode | null) => {
        if (!l) return r
        if (!r) return l
        l.val += r.val
        l.left = dfs(l.left, r.left)
        l.right = dfs(l.right, r.right)
        return l
    }
    return dfs(root1, root2)
};

export {}