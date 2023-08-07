/**
 Do not return anything, modify s in-place instead.
 */
function reverseString(s: string[]): void {
  let left: number = 0
  let right: number = s.length - 1
  while (left <= right) {
    s[left] = s.splice(right, 1, s[left])[0]
    left++
    right--
  }
};