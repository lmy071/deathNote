type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

function chunk(arr: Obj[], size: number): Obj[][] {
    let l:number = arr.length
		const s:Obj[][] = []
		while(l>0){
			s[s.length] = arr.splice(0,size)
			l -=size
		}
		return s
};