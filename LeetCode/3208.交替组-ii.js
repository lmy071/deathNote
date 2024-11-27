/*
 * @lc app=leetcode.cn id=3208 lang=javascript
 *
 * [3208] 交替组 II
 */

// @lc code=start
/**
 * @param {number[]} colors
 * @param {number} k
 * @return {number}
 */
var numberOfAlternatingGroups = function(colors, k) {
	const n = colors.length;
	let ans = 0, cnt = 0;
	for (let i = 0; i < n * 2; i++) {
			if (i > 0 && colors[i % n] === colors[(i - 1) % n]) {
					cnt = 0;
			}
			cnt++;
			if (i >= n && cnt >= k) {
					ans++;
			}
	}
	return ans;
};
// @lc code=end

