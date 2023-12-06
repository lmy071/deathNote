/**
 * @param {string[]} words
 * @return {string[]}
 */
//小写字母a-z对应的ASCII码值是97-122
var commonChars = function (words) {
    let hash = []
    let result = []
    for (let i = 0; i < words.length; i++) {
        hash[i] = Array(26).fill(0)
        for (let j = 0; j < words[i].length; j++) {
            hash[i][words[i].charAt(j).charCodeAt() - 97]++
        }
    }
    for (let i = 0; i < 26; i++) {
        let res = 101
        for (let j = 0; j < hash.length; j++) {
            if (hash[j][i] < res) {
                res = hash[j][i]
            }
        }
        if (res !== 101 && res !== 0) {
            while (res > 0) {
                result.push(String.fromCharCode(97 + i))
                res--
            }
        }
    }
    return result
};