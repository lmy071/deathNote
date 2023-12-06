function addStrings(num1: string, num2: string): string {
    let n1: number = num1.length - 1
    let n2: number = num2.length - 1
    let flag: number = 0
    const res: number[] = []
    while (n1 >= 0 || n2 >= 0) {
        let num: number = Number(num1.charAt(n1) || 0) + Number(num2.charAt(n2) || 0) + flag
        n1--
        n2--
        if (num > 9) {
            res.push(num % 10)
            flag = 1
        } else {
            res.push(num)
            flag = 0
        }
    }
    flag && res.push(1)
    return res.reverse().join("")
};
