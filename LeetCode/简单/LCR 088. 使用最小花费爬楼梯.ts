function minCostClimbingStairs(cost: number[]): number {
	const r: number[] = [0, 0]
	for (let i = 2; i <= cost.length; i++) {
		r[i] = Math.min(r[i - 1] + cost[i - 1], r[i - 2] + cost[i - 2])
	}
	return r[cost.length]
};