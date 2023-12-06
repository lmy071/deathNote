async function promiseAll<T>(functions: (() => Promise<T>)[]): Promise<T[]> {
  return new Promise((resolve,reject)=>{
    const res = []
    let i:number = 0
    functions.forEach( async (fn,a)=> {
      await fn().then(r=>{
        res[a] = r
        i++
        if(i == functions.length ){
          resolve(res) 
        }
      }).catch(err=>{
        reject(err)
      })
    })
  
  })
};

/**
* const promise = promiseAll([() => new Promise(res => res(42))])
* promise.then(console.log); // [42]
*/