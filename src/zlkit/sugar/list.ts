

export class ZLReadOnlyList<T>
{
    constructor(elems?:Array<T>)
    {
        if (elems) {
            this._arr = elems.concat([]);
        } else {
            this._arr = [];
        }
    }

    private _arr : Array<T>;

    [Symbol.iterator](): IterableIterator<T> 
    {
        return this._arr.values();
    }

    /**
     * 数组长度
     */
    count() : number
    {
        return this._arr.length;
    }
    /**
     * 获取指定位置的元素
     * @param index 下标索引
     */
    getElementAt(index:number) : T
    {
        return this._arr[index];
    }
    /**
     * 查找元素 , -1表示没有找到
     * @param elem 元素
     */
    indexOf(elem : T)  : number 
    {
        return this._arr.indexOf(elem);
    }
}

export class ZLList<T>
{
    constructor(elems?:Array<T>)
    {
        if (elems) {
            this._arr = elems.concat([]);
        } else {
            this._arr = [];
        }
        this._readonlylist = new ZLReadOnlyList();
        let l : any = this._readonlylist;
        l._arr = this._arr;
    }

    private _arr : Array<T>;
    private _readonlylist : ZLReadOnlyList<T>;
    
    [Symbol.iterator](): IterableIterator<T> 
    {
        return this._arr.values();
    }

    /**
     * 数组长度
     */
    count() : number
    {
        return this._arr.length;
    }
    /**
     * 获取指定位置的元素
     * @param index 下标索引
     */
    getElementAt(index:number) : T
    {
        return this._arr[index];
    }
    /**
     * 查找元素 , -1表示没有找到
     * @param elem 元素
     */
    indexOf(elem : T)  : number 
    {
        return this._arr.indexOf(elem);
    }

    /**
     * 添加元素
     * @param elem 元素
     */
    add(elem : T) : void
    {
        this._arr[this._arr.length] = elem;
    }

    /**
     * 删除指定元素
     * @param elem 元素
     */
    remove(elem : T) : void
    {
        let index = this._arr.indexOf(elem);
        if (index >= 0 )
        {
            this._arr.splice(index,1);
        }
    }

    /**
     * 删除指定元素
     * @param index 索引
     */
    removeAtIndex(index : number) : void
    {
        if(index>= 0 && index < this._arr.length)
        {
            this._arr.splice(index,1);
        }
    }

    /**
     * 返回只读列表
     */
    toReadOnlyList() : ZLReadOnlyList<T>
    {
        return this._readonlylist;
    }
}