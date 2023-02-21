/*
 * @lc app=leetcode.cn id=1781 lang=typescript
 *
 * [1781] 所有子字符串美丽值之和
 */

// @lc code=start
function beautySum(s: string): number {
    let sum: number = 0;
    for (let i: number = 0; i < s.length - 1; i++) {
        let map = new Map();
        for (let j: number = i; j < s.length; j++) {
            map.set(s[j], (map.get(s[j]) || 0) + 1);
            let ary = Array.from(map.values());
            sum += Math.max(...ary) - Math.min(...ary)
        }
    }
    return sum
};
// @lc code=end

