function numFactoredBinaryTrees1(arr: number[]): number {
  const s: Set<Number> = new Set(arr)
  let count: number = arr.length
  const dfs = (v) => {
    arr.forEach(a => {
      if (v % a === 0 && s.has(v / a)) {
        count = count + 1
        dfs(a)
        dfs(v / a)
      }
    })
  }
  arr.forEach(a => {
    dfs(a)
  })
  return count % (1e9 + 7)
};

const c = [45, 42, 2, 18, 23, 1170, 12, 41, 40, 9, 47, 24, 33, 28, 10, 32, 29, 17, 46, 11, 759, 37, 6, 26, 21, 49, 31, 14, 19, 8, 13, 7, 27, 22, 3, 36, 34, 38, 39, 30, 43, 15, 4, 16, 35, 25, 20, 44, 5, 48]
console.log(numFactoredBinaryTrees1(c)) // TODO 777 but get 594

// overtime
function numFactoredBinaryTrees2(arr: number[]): number {
  const s: Set<Number> = new Set(arr)
  let count: number = 0
  const dfs = (v) => {
    let res: number = 1
    arr.forEach(a => {
      if (v % a === 0 && s.has(v / a)) {
        res += dfs(a) * dfs(v / a)
      }
    })
    return res
  }
  arr.forEach(a => {
    count += dfs(a)
  })
  return count % (1e9 + 7)
};
console.log(numFactoredBinaryTrees2(c))

// overtime...
function numFactoredBinaryTrees3(arr: number[]): number {
  const s: Map<number, number> = new Map
  arr = arr.sort((a, b) => a - b)
  arr.forEach((v, i) => {
    s.set(v,i)
  })
  let count: number = 0
  const dfs = (i: number): number => {
    const v = arr[i]
    let res: number = 1
    for (let j = 0; j < i; j++) {
      if (v % arr[j] === 0 && s.has(v / arr[j])) {
        res += dfs(j) * dfs(s.get(v / arr[j]))
      }
    }
    return res
  }
  arr.forEach((a, i) => {
    count += dfs(i)
  })
  return count % (1e9 + 7)
};
console.log(numFactoredBinaryTrees3(c))

// 记忆搜索优化
function numFactoredBinaryTrees4(arr: number[]): number {
  const s: Map<number, number> = new Map
  arr = arr.sort((a, b) => a - b)
  arr.forEach((v, i) => {
    s.set(v,i)
  })
  let count: number = 0
  const memo:number[] = new Array(arr.length).fill(-1);
  const dfs = (i: number): number => {
    if(memo[i] !== -1) return memo[i]
    const v = arr[i]
    let res: number = 1
    for (let j = 0; j < i; j++) {
      if (v % arr[j] === 0 && s.has(v / arr[j])) {
        res += dfs(j) * dfs(s.get(v / arr[j]))
      }
    }
    return memo[i] = res
  }
  arr.forEach((a, i) => {
    count += dfs(i)
  })
  return count % (1e9 + 7)
};
console.log(numFactoredBinaryTrees4(c))