// 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。
/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var containsDuplicate = function(nums) {
    let map = new Map();
    nums.forEach(t=>{
        map.set(t,t)
    })
    return !(map.size === nums.length)
};


var containsDuplicate = function(nums) {
    let map = new Map()
    let id = 0
    for(let i = 0;i < nums.length;i++){
        if(!map.has(nums[i])){
            map.set(nums[i],id)
        }else{
            return true
        }
    }
    
    return false
};