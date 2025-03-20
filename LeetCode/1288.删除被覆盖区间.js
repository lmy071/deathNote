/*
 * @lc app=leetcode.cn id=1288 lang=javascript
 *
 * [1288] 删除被覆盖区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var removeCoveredIntervals = function(intervals) {
	for (let i = 0; i < intervals.length; i++) {
		for (let j = 0; j < intervals.length; j++) {
			if(intervals[j][0]<= intervals[i][0]&&intervals[i][1]<=intervals[j][1]&&i!==j){
				intervals.splice(i,1)
				i--;
				break;
			}			
		}
	}
	return intervals.length
};


// @lc code=end

