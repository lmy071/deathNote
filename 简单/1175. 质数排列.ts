function numPrimeArrangements(n: number): number {
	if(n===1) return 1
	const mod:number = 1000000007
	let sum = 1
	const isZS = (n)=>{
		for (let i = 2; i*i <= n; i++) {
			if(n % i == 0){
				return true
			}
		}
		return false
	}
	for (let i = 2; i <= n; i++) {
			if(isZS(i)) sum++
	}
	let m:number = n -sum
	let res:number = 1
	while (sum>0) {
		res = res % mod
		res = res * sum
		sum--
	}
	while(m>0){
		res = res % mod
		res = res * m
		m--
	}
	return res
};