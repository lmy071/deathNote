/*
 * @lc app=leetcode.cn id=743 lang=javascript
 *
 * [743] 网络延迟时间
 */

// @lc code=start
/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function(times, n, k) {
	const g = Array.from({length: n}, () => Array(n).fill(Infinity)); // 邻接矩阵
	for (const [x, y, d] of times) {
			g[x - 1][y - 1] = d;
	}

	const dis = Array(n).fill(Infinity);
	dis[k - 1] = 0;
	const done = Array(n).fill(false);
	while (true) {
			let x = -1;
			for (let i = 0; i < n; i++) {
					if (!done[i] && (x < 0 || dis[i] < dis[x])) {
							x = i;
					}
			}
			if (x < 0) {
					return Math.max(...dis);
			}
			if (dis[x] === Infinity) { 
					return -1;
			}
			done[x] = true;
			for (let y = 0; y < n; y++) {
					dis[y] = Math.min(dis[y], dis[x] + g[x][y]);
			}
	}
};
// @lc code=end

