/*
 * @lc app=leetcode.cn id=3280 lang=javascript
 *
 * [3280] 将日期转换为二进制表示
 */

// @lc code=start
/**
 * @param {string} date
 * @return {string}
 */
var convertDateToBinary = function(date) {
    const ary = date.split('-')
		return Number(ary[0]).toString(2) + '-' + Number(ary[1]).toString(2) + '-' + Number(ary[2]).toString(2)
};
// @lc code=end

