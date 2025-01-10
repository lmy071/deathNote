/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 找出字符串中第一个匹配项的下标
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  const l = haystack.length;
  const n = needle.length;
  for (let index = 0; index < l; index++) {
    let j = 0;
		let i = index
    while (j < n && haystack[i] === needle[j]) {
      j++
			i++
    }
    if (j == n) {
      return index;
    }
  }
  return -1;
};
// @lc code=end
