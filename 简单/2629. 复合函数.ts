type F = (x: number) => number;

function compose(functions: F[]): F {
  return function (x) {
    let fn: F | undefined = functions.pop()
    while (fn) {
      x = fn(x)
      fn = functions.pop()
    }
    return x
  }
};

