function subtractProductAndSum(n: number): number {
  let sum:number = 0
  let product:number = 1
  const ary = n.toString().split('')
  ary.forEach(v=>{
    sum += Number(v)
    product *= Number(v)
  })
  return product - sum
};