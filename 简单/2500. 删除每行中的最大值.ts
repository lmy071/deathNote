function deleteGreatestValue(grid: number[][]): number {
  let res: number = 0
  const l: number = grid.length
  for (let i = 0; i < l; i++) {
    const element = grid[i];
    element.sort((a, b) => b - a)
  }
  const n = grid[0].length
  for (let index = 0; index < n; index++) {
    let a: number = 0
    let max: number = grid[a][index]
    for (let j = 1; j < l; j++) {
      max = Math.max(max, grid[j][index])
      a++
    }
    res += max
  }
  return res
}
console.log(deleteGreatestValue([[1,2,4],[3,3,1]]));
