/*
 * @lc app=leetcode.cn id=53 lang=typescript
 *
 * [53] 最大子数组和
 */

// @lc code=start
function maxSubArray(nums: number[]): number {
    if(nums.length == 0) return 0;
    let res:number = nums[0]
    let sum:number = nums[0]
    for(let i = 1; i < nums.length; i++) {
        sum = Math.max(nums[i]+sum,nums[i])
        res = Math.max(sum,res)
    }
    return res;
};
// @lc code=end

