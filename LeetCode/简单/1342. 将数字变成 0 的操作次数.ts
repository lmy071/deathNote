function numberOfSteps(num: number): number {
    const r:number[] = [0]
		for(let i=1;i<=num;i++){
			r[i] = (i%2 === 1 ? r[i-1] :  r[i/2]) + 1 
		}
		return r[num]
};