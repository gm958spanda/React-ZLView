import {ZLObject} from './ZLObject'

export class ZLCSSAnimation extends ZLObject
{
    constructor(){
        super();
        this.duration = 300;
        this.__is_css_created__ = false;
    }
    /**
     * 动画时长 单位豪秒 ,默认300ms
     */
    public duration : number;
    
    public toAnimationStr()
    {
        let name = this.uniqueString;
        let duration = (this.duration > 0) ? this.duration.toString()+"ms" : "0ms";
        return ` ${name} ${duration} linear 0ms 3 normal`;
    }
    
    /**
     * 创建style标签，写入CSS样式
     */
    public updateCSS()
    {
        if (this.__is_css_created__) {
            return;
        }
        
        let name = this.uniqueString;
        let csscode = `
@keyframes ${name}
{
    0% {background-color:red;}
    100% {background-color:blue;} 
}`;
        let idstr = this.uniqueString;
        let style = document.getElementById(idstr) as HTMLStyleElement;
        if (style) {
            style.remove();
        }
        style = document.createElement('style');
        style.id = idstr;

        try{
            //for Chrome Firefox Opera Safari
            style.appendChild(document.createTextNode(csscode));
        }catch(ex){
            //for IE
            (style as any).styleSheet.cssText = csscode;
        }
        document.head.append(style);
    }

    public removeCSS()
    {
        let idstr = this.uniqueString;
        let style = document.getElementById(idstr) as HTMLStyleElement;
        if (style !== undefined || style !== null) {
            style.remove();
        }
    }

    private __is_css_created__ : boolean;
}