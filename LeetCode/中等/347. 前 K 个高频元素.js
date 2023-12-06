/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var topKFrequent = function(nums, k) {
    let map = new Map()
    nums.forEach(e => {
        if(map.has(e)){
            let i = map.get(e)
            map.set(e,++i)
        }else{
            map.set(e,1)
        }
    });
    let ary = Array.from(map).sort((b,a)=>a[1]-b[1])
    let res = []
    for (let i = 0; i < k; i++) {
        res.push(ary[i][0])
    }
    return res
};

const a = [-1,-1]
// const a = [1,1,1,1,1,2,2,3]
let c = topKFrequent(a,1)
console.log(c);