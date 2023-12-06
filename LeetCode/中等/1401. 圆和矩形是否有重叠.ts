function checkOverlap(radius: number, xCenter: number, yCenter: number, x1: number, y1: number, x2: number, y2: number): boolean {
    let res: number = 0
    if (xCenter < x1 || xCenter > x2) {
        res += Math.min(Math.pow(xCenter - x1, 2), Math.pow(xCenter - x2, 2))
    }
    if (yCenter < y1 || yCenter > y2) {
        res += Math.min(Math.pow(yCenter - y1, 2), Math.pow(yCenter - y2, 2))
    }
    return res <= radius ** 2
};
