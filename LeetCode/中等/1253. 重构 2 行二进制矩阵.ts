function reconstructMatrix(upper: number, lower: number, colsum: number[]): number[][] {
    let res: number[][] = [[], []]
    for (let i = 0; i < colsum.length; i++) {
        if (colsum[i] == 1) {
            if (upper >= lower && upper > 0) {
                upper--
                res[0][i] = 1
                res[1][i] = 0
            } else if (lower >= upper && lower > 0) {
                lower--
                res[0][i] = 0
                res[1][i] = 1
            } else {
                return []
            }
        } else if (colsum[i] == 2) {
            if (upper > 0 && lower > 0) {
                upper--
                lower--
                res[0][i] = 1
                res[1][i] = 1
            } else {
                return []
            }
        } else {
            res[0][i] = 0
            res[1][i] = 0
        }
    }
    return (upper == 0 && lower == 0) ? res : []
};

