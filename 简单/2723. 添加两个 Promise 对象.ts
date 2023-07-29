async function addTwoPromises(promise1: Promise<number>, promise2: Promise<number>): Promise<number> {
  let a:number = await promise1
  let b:number = await promise2
  return a+b
};

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */