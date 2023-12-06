/**
 * @param {number[]} nums
 * @return {number}
 */
//给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。
var missingNumber = function (nums) {
    nums.sort((a, b) => a - b)
    for (let i = 0; i <= nums.length; i++) {
        if (nums[i] !== i) return i
    }
};