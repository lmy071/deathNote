/*
 * @lc app=leetcode.cn id=704 lang=typescript
 *
 * [704] 二分查找
 */

// @lc code=start
function search(nums: number[], target: number): number {
    let l: number = 0;
    let r: number = nums.length - 1;
    while (l <= r) {
        let min: number = Math.floor((r - l) / 2) + l
        if (nums[min] == target) {
            return min
        } else if (nums[min] > target) {
            r = min - 1;
        } else {
            l = min + 1;
        }
    }
    return -1
};
// @lc code=end

