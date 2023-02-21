/*
 * @lc app=leetcode.cn id=1967 lang=typescript
 *
 * [1967] 作为子字符串出现在单词中的字符串数目
 */

// @lc code=start
function numOfStrings(patterns: string[], word: string): number {
    let sum:number = 0
    for(let i:number=0;i<patterns.length;i++){
        if(word.indexOf(patterns[i]) > -1) sum++
    }
    return sum
};
// @lc code=end

