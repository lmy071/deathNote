type ReturnObj = {
  increment: () => number,
  decrement: () => number,
  reset: () => number,
}

function createCounter(init: number): ReturnObj {
  let num: number = init
  const numInit = init
  return {
    reset(): number {
      return num = numInit
    },
    increment(): number {
      return ++num
    },
    decrement(): number {
      return --num
    },
  }
};
