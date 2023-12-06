function numJewelsInStones(jewels: string, stones: string): number {
    const stonesAry: string[] = stones.split('')
    let res: number = 0
    for (let i = 0; i < stonesAry.length; i++) {
        if (jewels.indexOf(stonesAry[i]) > -1) {
            res++
        }
    }
    return res
}