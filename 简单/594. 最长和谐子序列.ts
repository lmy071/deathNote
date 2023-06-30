function findLHS(nums: number[]): number {
    nums = nums.sort((a,b)=>{
        return a - b
    })
    let res: number = 0
    for (let i = 0; i < nums.length; i++) {
        let j: number = i + 1
        let count: number = 1
        while (Math.abs(nums[j] - nums[i]) < 2) {
            count++
            j++
        }
        if (Math.abs(nums[j - 1] - nums[i]) == 1) res = Math.max(res, count)
    }
    return res
};