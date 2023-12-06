function pivotInteger(n: number): number {
    const res:number = (n**2 + n)/2
    const res2:number = Math.floor(Math.sqrt(res))
    return res2**2 == res ? res2 : -1
};