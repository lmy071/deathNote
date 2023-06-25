function climbStairs(n: number): number {
    const dp:number[] = []
    dp[2] = 2 
    dp[1] = 1
    for (let i:number = 3; i <= n; i++) {
        dp[i] = dp[i-1]+dp[i-2]
    }
    return dp[n]
};