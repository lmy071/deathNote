function map(arr: number[], fn: (n: number, i: number) => number): number[] {
  arr.forEach((n, i) => {
    arr[i] = fn(n, i)
  })
  return arr
};
