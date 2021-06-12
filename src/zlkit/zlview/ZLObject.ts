
export class ZLObject
{
    constructor(){
        this.__unique__ = ZLObject.__s_unique__;
        ZLObject.__s_unique__ ++;
    }
    /**
     * 唯一id
     */
    public get uniqueId() {return this.__unique__;}
    /**
     * 唯一id  zl_obj-id
     */
    public get uniqueString() {return "zl_obj"+this.__unique__.toString();}

    private __unique__ : number;
    private static __s_unique__ : number = 0;
}