function distMoney(money: number, children: number): number {
	if (money < children) return -1
	if (money + 7 < children) return 0
	money -= children
	let c:number = Math.min(Math.floor(money/7),children)
	money -= c*7
	children -= c
	if((children===0&&money>0)||(children===1&&money===3)){
		c -= 1
	}
	return c
};