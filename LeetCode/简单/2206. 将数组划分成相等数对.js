/**
 * @param {number[]} nums
 * @return {boolean}
 */

//利用map 每次存值+1 不是偶数则false
var divideArray = function (nums) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], (map.get(nums[i]) || 0) + 1)
    }
    for (const iterator of map.values()) {
        if (iterator % 2 !== 0) {
            return false;
        }
    }
    return true;
};


var divideArray = function (nums) {
    let map = []
    nums.forEach(e => {
        map[e] = !map[e]
    })
    return !map.includes(true)
};