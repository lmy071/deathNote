// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

// 请必须使用时间复杂度为 O(log n) 的算法。
function searchInsert(nums: number[], target: number): number {
    let left = 0;
		let right = nums.length - 1;
		let res = -1;
		while (left <= right) {
			const mid = Math.floor((left + right) / 2);
			res = mid;
			if (nums[mid] === target) {
				return mid;
			}else if (nums[mid] > target) {
				right = mid - 1;
			}else{
				left = mid + 1;
			}
		}
		return nums[res]>target?res:res+1;
};