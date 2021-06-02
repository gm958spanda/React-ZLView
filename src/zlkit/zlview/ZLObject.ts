
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
     * 唯一id  _zluniobj+id
     */
    public get uniqueString() {return "_zluniobj_"+this.__unique__.toString();}

    private __unique__ : number;
    private static __s_unique__ : number = 0;
}