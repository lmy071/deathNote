/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
//  传送带上的包裹必须在 days 天内从一个港口运送到另一个港口。

//  传送带上的第 i 个包裹的重量为 weights[i]。每一天，我们都会按给出重量（weights）的顺序往传送带上装载包裹。我们装载的重量不会超过船的最大运载重量。

//  返回能在 days 天内将传送带上的所有包裹送达的船的最低运载能力
var shipWithinDays = function (weights, days) {
    let left = Math.max(...weights)
    let right = weights.reduce((a, b) => a + b)
    let res = 50000
    while (left < right) {
        let value = Math.floor((right + left) / 2)
        let day = 0
        let max = 0
        let index = 0
        for (let i = 0; i < weights.length; i++) {
            max += weights[i]
            if (max >= value) {
                max = weights[index]
                day++
                
            }
        }
        if (day <= days) {
            res = Math.min(res, value)
            right = value
        }else{
            left = value + 1
        }
        if (day == days) left = right
    }
    return res
};

let a = [10,50,100,100,50,100,100,100]
let c = shipWithinDays(a, 5)
console.log(c);