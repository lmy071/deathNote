/**
 * @param {number} k
 * @return {number}
 * 有些数的素因子只有 3，5，7，请设计一个算法找出第 k 个数。注意，不是必须有这些素因子，
 * 而是必须不包含其他的素因子。例如，前几个数按顺序应该是 1，3，5，7，9，15，21
 */
var getKthMagicNumber = function(k) {
	if(k===1) return 1
	let num = 3
		const f = ()=>{
			for (let i = 2; i * 2 <= num; i++) {
					if(num % i === 0){
						break
					}				
			}
			num++
		}
};
