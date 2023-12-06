function maximumEvenSplit(finalSum: number): number[] {
    if (finalSum / 2 != 0 || finalSum < 6) return []
    let res: number[] = []
    let n: number = 2
    while (finalSum > 0) {
        finalSum = finalSum - n
        if (finalSum > 0) {
            res.push(n)
            n += 2
        } else {
            res[res.length - 1] = res[res.length - 1] + n + finalSum
        }
    }
    return res
};