/*
 * @lc app=leetcode.cn id=731 lang=javascript
 *
 * [731] 我的日程安排表 II
 */

// @lc code=start

var MyCalendarTwo = function () {
  this.ary = [];
  this.ary2 = [];
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {boolean}
 */
MyCalendarTwo.prototype.book = function (startTime, endTime) {
  for (const e of this.ary2) {
    if (startTime < e[1] && endTime > e[0]) {
      return false;
    }
  }

	for (const e of this.ary) {
		if(startTime < e[1] && endTime > e[0]){
			this.ary2.push([Math.max(startTime,e[0]),Math.min(endTime,e[1])])
		}
	}
	this.ary.push([startTime,endTime])
	return true
};

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(startTime,endTime)
 */
// @lc code=end
