function isCircularSentence(sentence: string): boolean {
    const ary: string[] = sentence.split(' ')
    if(ary[0].charAt(0) !==  ary[ary.length-1].charAt(ary[ary.length-1].length - 1)) return false
    for (let i = 1; i < ary.length; i++) {
        if (ary[i].charAt(0) !== ary[i-1].charAt(ary[i-1].length - 1)) return false
    }
    return true
};
