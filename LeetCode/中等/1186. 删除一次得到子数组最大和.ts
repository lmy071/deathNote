function maximumSum(arr: number[]): number {
    let dp1:number = arr[0]
    let dp2:number = 0
    let res:number = arr[0]
    for (let i = 1; i < arr.length; i++) {
        dp2 = Math.max(dp1,dp2+arr[i])        
        dp1 = Math.max(dp1,0)+arr[i]
        res = Math.max(res,Math.max(dp2,dp1))
    }
    return res
};