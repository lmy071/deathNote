/**
 * @param {number[]} nums
 * @return {number}
 */
var findTheArrayConcVal = function (nums) {
    let res = 0
    let l = nums.length
    for (let i = 0; i < (l / 2); i++) {
        if (i < (l - i - 1)) {
            res += Number((nums[i] + '' + nums[l - i - 1]))
        } else {
            console.log(res, nums[i]);
            res += nums[i]
        }
    }
    return res
};
let a = [5, 14, 13, 8, 12]

let c = findTheArrayConcVal(a)