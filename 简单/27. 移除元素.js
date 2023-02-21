/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    let j = 0
    for (let index = 0; index < nums.length; index++) {
        if (nums[index] !== val) {
            nums[j] = nums[index]
            j++
        }
    }
    return j
};