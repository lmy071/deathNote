type Fn = (...params: any) => any

function memoize(fn: Fn): Fn {
  let map = new Map()
  return function (...args) {
    if (map.has(JSON.stringify(args))) {
      return map.get(JSON.stringify(args))
    } else {
      let res = fn(...args)
      map.set(JSON.stringify(args), res)
      return res
    }
  }
}

/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */

export { }