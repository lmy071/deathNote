// Alice 和 Bob 计划分别去罗马开会。

// 给你四个字符串 arriveAlice ，leaveAlice ，arriveBob 和 leaveBob 。Alice 会在日期 arriveAlice 到 leaveAlice 之间在城市里（日期为闭区间），而 Bob 在日期 arriveBob 到 leaveBob 之间在城市里（日期为闭区间）。每个字符串都包含 5 个字符，格式为 "MM-DD" ，对应着一个日期的月和日。

// 请你返回 Alice和 Bob 同时在罗马的天数。

// 你可以假设所有日期都在 同一个 自然年，而且 不是 闰年。每个月份的天数分别为：[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] 。

function countDaysTogether(arriveAlice: string, leaveAlice: string, arriveBob: string, leaveBob: string): number {
    const months:number[] = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const sum:number[] = [0];
    for (let i:number = 1; i < months.length; i++) sum[i] = sum[i - 1] + months[i];
    const aliceA:number[] = arriveAlice.split('-').map(v => Number(v));
    const aA:number = sum[aliceA[0] - 1] + aliceA[1];
    const aliceL:number[] = leaveAlice.split('-').map(v => Number(v));
    const aL:number = sum[aliceL[0] - 1] + aliceL[1];

    const bobA:number[] = arriveBob.split('-').map(v => Number(v));''
    const bA:number = sum[bobA[0] - 1] + bobA[1];
    const bobL:number[] = leaveBob.split('-').map(v => Number(v));
    const bL:number = sum[bobL[0] - 1] + bobL[1];

    if (aL < bA || bL < aA) {
        return 0;
    }
    if (aA >= bA && aL <= bL) {
        return aL - aA + 1;
    }
    if (bA >= aA && bL <= aL) {
        return bL - bA + 1;
    }
    if (aL >= bA && aL <= bL) {
        return aL - bA + 1;
    }
    if (bL >= aA && bL <= aL) {
        return bL - aA + 1;
    }
    return 0;
};