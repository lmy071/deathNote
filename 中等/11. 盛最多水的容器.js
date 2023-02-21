/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let l = 0, r = height.length - 1
    let res = 0
    while (l < r) {
        res = Math.max(Math.min(height[l], height[r]) * (r - l), res)
        height[l]>height[r]?r--:l++
    }
    return res
};