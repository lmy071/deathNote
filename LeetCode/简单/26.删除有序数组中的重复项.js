/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let i = 1,j = 1
    while (i < nums.length) {
        if(nums[i]!==nums[i-1]){
            nums[j] = nums[i]
            j++
        }
        i++
    }
    return j
};
// @lc code=end

