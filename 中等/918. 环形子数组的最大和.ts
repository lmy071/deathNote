function maxSubarraySumCircular(nums: number[]): number {
    const n: number = nums.length
    let l: number[] = new Array(n).fill(0)
    l[0] = nums[0]
    let lSum: number = nums[0]
    let pre: number = nums[0]
    let res: number = nums[0]
    for (let i = 1; i < n; i++) {
        pre = Math.max(pre + nums[i], nums[i])
        res = Math.max(pre, res)
        lSum += nums[i]
        l[i] = Math.max(l[i - 1], lSum)
    }
    let rSum: number = 0
    for (let i = n - 1; i > 0; i--) {
        rSum += nums[i]
        res = Math.max(res, rSum + l[i - 1])
    }
    return res
};


maxSubarraySumCircular([1,-2,3,-2])