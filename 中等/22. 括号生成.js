/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    if (n == 0) return []
    let res = []
    const dfs = (str, left, right) => {
        if (left < 0 || right < left) return
        if (left == 0 && right == 0) {
           res.push(str)
        }
        dfs(str + '(', left - 1, right)
        dfs(str + ')', left, right - 1)
    }
    dfs("", n, n)
    return res
};