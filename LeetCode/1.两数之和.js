/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
   for (let i = 0; i < nums.length; i++) {
				for (let index = i+1; index < nums.length; index++) {
						if((nums[i] + nums[index]) === target){
							return [i,index]
						}
				}
	 }
};
// @lc code=end

twoSum = function(nums, target) {
	let map = new Map
	for (let i = 0; i < nums.length; i++) {
		if(map.has(target- nums[i])){
			return [i,map.get(target- nums[i])]
		}
		map.set(nums[i],i)
	}
};

