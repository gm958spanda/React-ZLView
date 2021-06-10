

export class ZLEventCallbackList
{
    /**
     * 添加事件回调
     * @param name 事件名称
     * @param cb 回调函数
     * @param cbThis 回调函数的this
     */
    public addEvntCallback(name:string , cb : any , cbThis ? : any)
    {
        if (cb === undefined || cb === null || name === undefined || name === null){
            return;
        }
        if (this.__zl_EventHandlerMap__ === undefined) {
            this.__zl_EventHandlerMap__ = new Map();
        }
        let cbmap = this.__zl_EventHandlerMap__.get(name);
        if (cbmap === undefined) {
            cbmap = new Map();
            this.__zl_EventHandlerMap__.set(name,cbmap);
        }
        cbmap.set(cb,cbThis);
    }

    /**
     * 移除事件回调
     * @param name 事件名称
     * @param cb 回调函数
     */
    public removeEvntCallback(name:string , cb : any)
    {
        if (cb === undefined || cb === null || name === undefined || name === null){
            return;
        }
        if (this.__zl_EventHandlerMap__)
        {
            let cbmap = this.__zl_EventHandlerMap__.get(name);
            if (cbmap) {
                cbmap.delete(cb);
            }
        }
    }
    /**
     * 移除所有cbThis回调
     * @param cbThis 回调函数的this
     */
     public removeEvntCallbackByThis(cbThis : any)
     {
         if (cbThis === undefined){
             return;
         }
         if (this.__zl_EventHandlerMap__)
         {
             this.__zl_EventHandlerMap__.forEach((v,name) => {
                 let cbArr : any[]= [];
                 v.forEach((cbThis_,cb)=>{
                     if (cbThis === cbThis_) {
                         cbArr.push(cb);
                     }
                 })
                 cbArr.forEach((cb)=>{
                     v.delete(cb)
                 })
             });
         }
     }
     public clear()
     {
         this.__zl_EventHandlerMap__?.clear();
     }
    /**
     * 触发事件
     * @param name 事件名称
     * @param cbArg 回调函数应接收的参数
     */
    public onEvnt(name:string , cbArg? : any)
    {
        let cbMap = this.__zl_EventHandlerMap__?.get(name);
        if (cbMap && cbMap.size>0)
        {
            cbMap.forEach((cbThis,cb)=>{
                cb.call(cbThis,cbArg);
            });
        }
    }
    /**
     * 获取事件名称对应的回调函数列表
     * @param name 事件名称
     */
    public getEventCallbackList(name:string):Map<any,any> | undefined
    {
        return this.__zl_EventHandlerMap__?.get(name);
    }

    /**
     * 事件回调列表 {事件名 : {事件回调 : 事件回调的This} }
     */
    private __zl_EventHandlerMap__? : Map<string, Map<any,any>>;
}
