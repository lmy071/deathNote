/*
 * @lc app=leetcode.cn id=999 lang=javascript
 *
 * [999] 可以被一步捕获的棋子数
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {number}
 */
var numRookCaptures = function(board) {
	let res = 0
		const ll = board[0].length
    for (let index = 0; index < board.length; index++) {
			for (let i = 0; i < ll; i++) {
				if(board[index][i] === 'R'){
					let flag = true

					while(flag){
						if(board[index][j] === 'B'){
							break;
						}else if(board[index][j] === 'p'){
							res++
							break;
						}else {
							j--
						}
					}

				}
			}
		}
};
// @lc code=end
