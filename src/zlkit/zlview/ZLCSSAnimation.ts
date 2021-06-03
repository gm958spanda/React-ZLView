import {ZLObject} from './ZLObject'
import {ZLView}  from './ZLView'

export class ZLCSSAnimation extends ZLObject
{
    constructor(view:ZLView, keyFrames : ZLCSSAnimationKeyFrame[])
    {
        super();
        this.duration = 300;
        this.__keyFrames__ = keyFrames;
        this.__is_css_created__ = false;
        this.__view__ = new WeakRef(view);

        view.addListenViewWillRender(this.__onViewWillRender__,this);
        view.addListenOnReactRefCallback(this.__onViewReactRefCallback__,this);
        view.addListenWiewWillUnMount(this.__onViewWillUnmount__,this);
    }
    /**
     * 动画时长 单位豪秒 ,默认300ms
     */
    public duration : number;


    public end(end:()=>void) {
        this.__endcb__ = end;
    }
    
    public toAnimationStr()
    {
        let name = this.uniqueString;
        let duration = (this.duration > 0) ? this.duration.toString()+"ms" : "0ms";
        return `${name} ${duration} linear 0ms 3 normal`;
    }
    
    private __onViewWillRender__()
    {
        this.updateCSS();
    }

    private __onViewReactRefCallback__(e:Element) 
    {
        this.__elem__ = new WeakRef(e);
        if (this.__onAnimationend__) {
            e.addEventListener("animationend",this.__onAnimationend__);
        }
    }

    private __onViewWillUnmount__()
    {
        this.clearresource();
    }

    private __onAnimationend__? = ()=> {
        this.__endcb__?.();
        this.clearresource();
    }

    private clearresource()
    {
        if (this.__view__)
        {
            this.removeCSS();

            this.__keyFrames__ = [];
            this.__endcb__ = undefined;

            let view = this.__view__;
            this.__view__ = undefined;
            
            let elem = this.__elem__;
            this.__elem__ = undefined;

            setTimeout(() => {
                let v = view.deref();
                if (v) {
                    v.removeListenOnReactRefCallback(this.__onViewReactRefCallback__);
                    v.removeListenViewWillRender(this.__onViewWillRender__);
                    v.removeListenWiewWillUnMount(this.__onViewWillUnmount__);
                }

                let e = elem?.deref();
                if(e) {
                    if (this.__onAnimationend__ ) {
                        e.removeEventListener("animationend",this.__onAnimationend__);
                    }
                }
                this.__onAnimationend__ = undefined;
            }, 0);
        }
    }
    /**
     * 创建style标签，写入CSS样式
     */
    private updateCSS()
    {
        if (this.__is_css_created__) {
            return;
        }
        if(this.__keyFrames__.length < 2) {
            return;
        }
        
        let name = this.uniqueString;
        let [from ,to] = this.__keyFrames__;
        let csscode = `
@keyframes ${name}
{
    ${from.toKeyFrameString()}
    ${to.toKeyFrameString()}
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
    private __keyFrames__ : ZLCSSAnimationKeyFrame[];
    private __view__? : WeakRef<ZLView>;
    private __elem__? : WeakRef<Element>;
    private __endcb__? : ()=>void;
}


export class ZLCSSAnimationKeyFrame
{
    constructor() {
        this.__progress__ = 0;
    }
    public backgroudColor? : string;

    /**
     * 【0 ，100】  
     */
    public get progress(): number { return this.__progress__;}
    public set progress(p:number) 
    {
        if(p < 0){
            p =0;
        }
        else if(p>100){
            p = 100;
        } 
        this.__progress__ = p;
    }
    private __progress__ : number;
    /**
     * 复制视图的状态
     * @param view 视图
     */
    public copyViewStyle(view:ZLView)
    {
        this.backgroudColor = view.backgroudColor;
    }

    public toKeyFrameString()
    {
        let s = "";
        if (this.backgroudColor) {
            s = `${s} background-color:${this.backgroudColor}`
        }
        // if (this.backgroudColor) {
        //     s = `${s} background-color ${this.backgroudColor}`
        // }
        return `${this.progress}% {${s}}`;
    }
}