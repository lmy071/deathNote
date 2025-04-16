/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function(nums, k) {
    const min = Math.min(...nums);
    if (k > min) {
        return -1;
    }
    return new Set(nums).size - (k === min ? 1 : 0);
};
