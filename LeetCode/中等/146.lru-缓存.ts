export class LRUCache {
    count: number;
    hashMap: Map<number, number>;
    constructor(capacity: number) {
        this.count = capacity
        this.hashMap = new Map;
    }

    get(key: number): number {
        const value = this.hashMap.get(key)
        if(typeof value !== 'undefined'){
            this.hashMap.delete(key);
            this.hashMap.set(key,value)
            return value
        }
        return -1
    }

    put(key: number, value: number): void {
        if(this.hashMap.get(key)){
            this.hashMap.delete(key);
        }
        this.hashMap.set(key,value)
        if(this.hashMap.size > this.count){
            this.hashMap.delete(this.hashMap.keys().next().value)
        }
    }
}