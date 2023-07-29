function filter(arr: number[], fn: (n: number, i: number) => any): number[] {
  let ary:number[] = []
  arr.forEach((v,i)=>{
    if(fn(v,i)) ary.push(v)
  })
  return ary
};