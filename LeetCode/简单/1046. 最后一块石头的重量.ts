/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
	stones.sort((a: number, b: number) => {
		return b - a
	})
	const f = () => {
		if (stones.length < 2) return stones[0]
		const s = stones.shift() - stones.shift()
		if (s > 0) {
			if (stones.length) {
				for (let index = stones.length - 1; index >= 0; index--) {
					if (stones[index] >= s) {
						stones.splice(index + 1, 0, s)
						f()
						break
					} else if (index == 0) {
						stones.unshift(s)
						f()
					}
				}
			} else {
				stones.push(s)
			}
		} else if (stones.length < 2) {
			stones.push(s)
		} else {
			f()
		}
	}
	f()
	return stones[0]
};

