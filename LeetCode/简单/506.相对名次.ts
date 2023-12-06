/*
 * @lc app=leetcode.cn id=506 lang=typescript
 *
 * [506] 相对名次
 */

// @lc code=start
function findRelativeRanks(score: number[]): string[] {
    const ary:number[] = [...score].sort((a:number,b:number):number=>{return b - a})
    let result:string[] = []
    for(let i:number=0;i<score.length;i++){
        for(let j:number=0;j<ary.length;j++){
            if(score[i]===ary[j] && j < 3){
                switch (j){
                    case 0:
                        result.push('Gold Medal')
                        break;
                    case 1:
                        result.push('Silver Medal')
                        break;
                    case 2:
                        result.push('Bronze Medal')
                        break;
                }
            }else if(score[i]===ary[j]){
                result.push(j+1+'')
            }
        }
    }
    return result
};
// @lc code=end

