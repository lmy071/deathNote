function lemonadeChange(bills: number[]): boolean {
  let moneyAry: number[] = [0, 0, 0]
  let res: boolean = true
  for (let i = 0; i < bills.length; i++) {
    switch (bills[i]) {
      case 5:
        moneyAry[0]++
        break
      case 10:
        moneyAry[1]++
        moneyAry[0]--
        break
      case 20:
        moneyAry[2]++
        if (moneyAry[1] < 1) {
          moneyAry[0] = moneyAry[0] - 3
        } else {
          moneyAry[0]--
          moneyAry[1]--
        }
        break
    }
    if (moneyAry.some(v => v < 0)) {
      res = false
      break
    }
  }
  return res
};