function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
    const m:number = image.length -1 
    const n:number = image[0].length -1 
    const oldColor:number = image[sr][sc]
    if(oldColor === color) return image
    const colour = (i:number,j:number)=>{
        if(i<0||i>m||j<0||j>n||image[i][j] != oldColor) return
        image[i][j] = color
        colour(i-1,j)
        colour(i+1,j)
        colour(i,j-1)
        colour(i,j+1)
    }
    colour(sr,sc)
    return image
};  
floodFill([[1,1,1],[1,1,0],[1,0,1]],1,1,2)