
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

function convertBiNode(root: TreeNode | null): TreeNode | null {
	let p: TreeNode = new TreeNode(0)
	const res = p
	const f = (r: TreeNode | null) => {
		if (!r) return null
		f(r.left)
		r.left = null
		p.right = r
		p = r
		f(r.right)
	}
	f(root)
	return res.right
};