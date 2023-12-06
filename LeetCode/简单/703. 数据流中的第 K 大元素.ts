class KthLargest {
  ary: number[] = []
  index: number
  constructor(k: number, nums: number[]) {
    this.ary = nums
    this.index = k - 1
  }

  add(val: number): number {
    this.ary.push(val)
    this.ary.sort((a, b) => b - a)
    return this.ary[this.index]
  }
}

/**
* Your KthLargest object will be instantiated and called as such:
* var obj = new KthLargest(k, nums)
* var param_1 = obj.add(val)
*/