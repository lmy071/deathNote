function once<T extends (...args: any[]) => any>(fn: T):
  ((...args: Parameters<T>) => ReturnType<T> | undefined) {
  let state: boolean = false
  return function (...args) {
    if (state) {
      return undefined
    } else {
      state = true
      return fn(...args)
    }
  };
}

