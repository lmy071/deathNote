/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    if (s.length < 2) return s
    let max = ''
    for (let i = 0; i < s.length; i++) {
        let l = i, r = i
        while (0 < l && s[l - 1] === s[i]) {
            l--
        }
        while (r < s.length - 1 && s[r + 1] === s[i]) {
            r++
        }
        while (0 < l && r < s.length - 1) {
            if (s[l - 1] !== s[r + 1]) {
                break
            }
            l--
            r++
        }
        if (r - l + 1 > max.length) {
            max = s.slice(l, r + 1)
        }
    }
    return max
};