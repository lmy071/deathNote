/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var intersection = function (nums) {
    let res = []
    let target = nums[0]
    for (let i = 0; i < target.length; i++) {
        let value = true
        for (let j = 1; j < nums.length; j++) {
            if (!(nums[j].some(v => v === target[i]))) {
                value = false
                break
            }
        }
        value && res.push(target[i])
    }
    res.sort((a,b)=>a-b)
    return res
};