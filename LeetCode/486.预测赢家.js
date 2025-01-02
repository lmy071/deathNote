/*
 * @lc app=leetcode.cn id=486 lang=javascript
 *
 * [486] 预测赢家
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var predictTheWinner = function (nums) {
  const fn = (start, end) => {
    if (start === end) {
      return nums[start];
    }
    const startSum = nums[start] - fn(start + 1, end);
    const endSum = nums[end] - fn(start, end - 1);
    return Math.max(startSum, endSum);
  };
  return fn(0, nums.length - 1) >= 0;
};

// @lc code=end
