// 超出时间限制了...
function halveArray(nums: number[]): number {
  const sum: number = nums.reduce((a, b) => a + b) / 2
  nums = nums.sort((a, b) => b - a)
  let res: number = 0
  let count: number = 0
  while (count < sum) {
    count += nums[0] / 2
    res++
    nums[0] = nums[0] / 2
    nums = nums.sort((a, b) => b - a)
  }
  return res
};


// 超时
function halveArray1(nums: number[]): number {
  const sum: number = nums.reduce((a, b) => a + b) / 2
  nums = nums.sort((a, b) => b - a)
  let res: number = 0
  let count: number = 0
  let a: number = 0
  let b:number = 0
  while (count < sum) {
    count += nums[a] / 2
    nums[a] = nums[a] / 2
    a = b
    for (let index = 0; index <=a; index++) {
      for (let h = 0; h<a-index; h++) {
            if(nums[h]<nums[h+1]){
              let dd = nums[h]
              nums[h] = nums[h+1]
              nums[h+1] = dd
            }      
      }
    }
    res++
    let l: number = nums[0]
    let r: number = nums[a + 1]
    if (nums[a] < l || nums[a] < r) {
      if(l < r){
        b++
        a = b
      }else{
        a = 0
      }
    }
  }
  return res
};

function halveArray2(nums: number[]): number {
  const sum: number = nums.reduce((a, b) => a + b) / 2
  nums = nums.sort((a, b) => a-b)
  let res:number = 0
  let total:number = 0
  while(total < sum){
    let a:number = nums.pop()! / 2
    total+=a
    let l:number = 0
    let r:number = nums.length
    while (l<r) {
      const mid = (l+r)>>1
      if(nums[mid] == a) l=r=mid
      if(nums[mid]>a){
        r=mid
      }else{
        l=mid+1
      }
    }
    nums.splice(l,0,a)
    res++
  }
  return res
}