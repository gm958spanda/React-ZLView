export class ZLList<T> extends Array
{
    /**
     * 数组长度
     */
    count() : number
    {
        return this.length;
    }
    /**
     * 获取指定位置的元素
     * @param index 下标索引
     */
    getElementAt(index:number) : T
    {
        return this[index];
    }
    /**
     * 添加元素
     * @param elem 元素
     */
    add(elem : T) : void
    {
        this.push(elem);
    }
    /**
     * 插入元素
     * @param elem 元素
     * @param index 索引 取值范围[0, length]
     */
    insertAtIndex(elem:T,index:number) : void 
    {
        if (index >= 0 && index < this.length) 
        {
            for (let i = this.length ; i > index ; i --)
            {
                this[i] = this[i-1];
            }
            this[index] = elem;
        }
        else if (index === this.length) {
            this.push(elem);
        }
    }

    /**
     * 删除指定元素
     * @param elem 元素
     */
    remove(elem : T) : void
    {
        let index = this.indexOf(elem);
        if (index >= 0 )
        {
            this.splice(index,1);
        }
    }

    /**
     * 删除指定元素
     * @param index 索引
     */
    removeAtIndex(index : number) : void
    {
        if(index>= 0 && index < this.length)
        {
            this.splice(index,1);
        }
    }

    /**
     * 返回只读列表
     */
    toReadOnlyList() : ZLReadOnlyList<T>
    {
        if (this._readOnlyList === undefined) {
            this._readOnlyList = new ZLReadOnlyList(this);
        }
        return this._readOnlyList;
    }

    private _readOnlyList? : ZLReadOnlyList<T>;
}


export class ZLReadOnlyList<T>// implements ReadonlyArray<T>
{
    constructor(arr:T[]) {
        this._arr = arr;
    }
    private _arr : Array<T>;


    [Symbol.iterator](): IterableIterator<T> {
        return this._arr.values();
    }

    public at(n:number) : T | undefined {
        return this._arr[n];
    }
    public get length(): number {
        return this._arr.length;
    }
    public toString(): string {
        return this._arr.toString();
    }
    public toLocaleString(): string {
        return this._arr.toLocaleString();
    }
    concat(...items: (T | ConcatArray<T>)[]): T[]{
        return this._arr.concat(...items);
    }
    join(separator?: string): string {
        return this._arr.join(separator);
    }
    // slice(start?: number, end?: number): T[] {
    //     return this._arr.slice(start,end);
    // }
    indexOf(searchElement: T, fromIndex?: number): number {
        return this._arr.indexOf(searchElement,fromIndex);
    }
    lastIndexOf(searchElement: T, fromIndex?: number): number {
        return this._arr.lastIndexOf(searchElement,fromIndex);
    }
    every<S extends T>(predicate: (value: T, index: number, array: readonly T[]) => value is S, thisArg?: any): this is readonly S[];
    every(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArg?: any): boolean;
    every(predicate: any, thisArg?: any): boolean {
        return this._arr.every(predicate,thisArg);
    }
    forEach(callbackfn: (value: T, index: number, array: readonly T[]) => void, thisArg?: any): void {
        this._arr.forEach(callbackfn,thisArg);
    }
    some(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArg?: any): boolean {
        return this._arr.some(predicate,thisArg);
    }
    map<U>(callbackfn: (value: T, index: number, array: readonly T[]) => U, thisArg?: any): U[] {
        return this._arr.map(callbackfn,thisArg);
    }
    // filter(predicate: any, thisArg?: any): T[] {
    //     
    // }
    // filter<S extends T>(predicate: (value: T, index: number, array: readonly T[]) => value is S, thisArg?: any): S[];
    filter(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArg?: any): T[];
    filter(predicate: any, thisArg?: any): T[] {
        return this._arr.filter(predicate,thisArg);
    }
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T): T;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T, initialValue: T): T;
    // reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: readonly T[]) => U, initialValue: U): U;
    reduce(callbackfn: any, initialValue?: any): T {
        return this._arr.reduce(callbackfn,initialValue);
    }
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T): T;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T, initialValue: T): T;
    // reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: readonly T[]) => U, initialValue: U): U;
    reduceRight(callbackfn: any, initialValue?: any): T {
        return this._arr.reduceRight(callbackfn,initialValue);
    }
    find(predicate: (value: T, index: number, obj: readonly T[]) => unknown, thisArg?: any): T | undefined {
        return this._arr.find(predicate,thisArg);
    }
    findIndex(predicate: (value: T, index: number, obj: readonly T[]) => unknown, thisArg?: any): number {
        return this._arr.findIndex(predicate,thisArg);
    }
    entries(): IterableIterator<[number, T]> {
        return this._arr.entries();
    }
    keys(): IterableIterator<number> {
        return this._arr.keys();
    }
    values(): IterableIterator<T> {
        return this._arr.values();
    }
    includes(searchElement: T, fromIndex?: number): boolean {
        return this._arr.includes(searchElement,fromIndex);
    }
    flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: T[]) => U | readonly U[], thisArg?: This): U[] {
        return this._arr.flatMap(callback,thisArg);
    }
    flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[] {
        return (this as any)._arr.flat(depth);
    }
}
