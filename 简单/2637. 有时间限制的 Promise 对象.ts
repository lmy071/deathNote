type Fn = (...params: any[]) => Promise<any>;

function timeLimit(fn: Fn, t: number): Fn {
	return async function(...args) {
        let time =  null
        let timeOut = new Promise((resolve,reject)=>{
        time = setTimeout(()=>{
                reject("Time Limit Exceeded" )
            },t)
        })
        return Promise.race([timeOut,fn(...args)]).then(res=>{
            clearTimeout(time)
            return res
        })
    }
};

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */

export {}