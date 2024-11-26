/*
 * @lc app=leetcode.cn id=3206 lang=javascript
 *
 * [3206] 交替组 I
 */

// @lc code=start
/**
 * @param {number[]} colors
 * @return {number}
 */
var numberOfAlternatingGroups = function(colors) {
	const n = colors.length;
	let res = 0;
	for (let i = 0; i < n; i++) {
			if (colors[i] !== colors[(i - 1 + n) % n] && colors[i] !== colors[(i + 1) % n]) {
					res++;
			}
	}
	return res;
};
// @lc code=end

