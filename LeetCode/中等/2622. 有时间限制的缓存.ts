class TimeLimitedCache {
  map = new Map()
  constructor() {
  }

  set(key: number, value: number, duration: number): boolean {
    let nowDate = new Date().getTime()
    duration = nowDate + duration
    if(this.map.has(key)){
      const flag = this.map.get(key).duration > nowDate
      this.map.set(key,{value,duration})
      return flag
    }else{
      this.map.set(key,{value,duration})
      return false
    }
  }

  get(key: number): number {
    let nowDate = new Date().getTime()
    let flag = this.map.get(key)?.duration > nowDate
    if(flag){
      return this.map.get(key).value
    }else{
      return -1
    }
    
  }

  count(): number {
    let counts:number = 0
    let nowDate = new Date().getTime()
    this.map.forEach((v,i)=>{
      if(v.duration > nowDate){
        counts++
      }
    })
    return counts
    }
}

/**
* Your TimeLimitedCache object will be instantiated and called as such:
* var obj = new TimeLimitedCache()
* obj.set(1, 42, 1000); // false
* obj.get(1) // 42
* obj.count() // 1
*/