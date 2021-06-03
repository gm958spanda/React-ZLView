import {ZLObject} from './ZLObject'
import { ZLCSSAnimationDirection, ZLCSSAnimationParams, ZLCSSAnimationTimingFunctionMode, ZLCurrentSizeUnit } from './ZLUIDef';
import {ZLView}  from './ZLView'


export class ZLCSSAnimation extends ZLObject
{
    constructor(view:ZLView, keyFrames : ZLCSSAnimationKeyFrame[])
    {
        super();
        this.__keyFrames__ = keyFrames;
        this.__is_css_created__ = false;
        this.__view__ = new WeakRef(view);

        view.addListenViewWillRender(this.__onViewWillRender__,this);
        view.addListenOnReactRefCallback(this.__onViewReactRefCallback__,this);
        view.addListenWiewWillUnMount(this.__onViewWillUnmount__,this);
    }
    /**
     * 动画参数
     */
    public params? : ZLCSSAnimationParams;
    
    public toAnimationStr()
    {
        let name = this.uniqueString;
        let duration = 300;
        let delay = 0;
        let timingFunction = "ease";
        let iterationCount = 1;
        let direction = ZLCSSAnimationDirection.normal;
        if(this.params)
        {
            if(this.params.duration) {
                duration = this.params?.duration;
            }
            if(this.params.delay) {
                delay = this.params.delay;
            }
            if (this.params.iterationCount) {
                (iterationCount as any) = this.params.iterationCount;
            }
            if (this.params.timingFunction) {
                let f = this.params.timingFunction;
                if (f === ZLCSSAnimationTimingFunctionMode.cubicBezier){
                    if (this.params.cubicBezierValue && this.params.cubicBezierValue.length === 4) {
                        let v = this.params.cubicBezierValue;
                        timingFunction = f+`(${v[0]},${v[1]},${v[2]},${v[3]})`;
                    } else {
                        console.log("timingFunction set cubicBezier, but cubicBezierValue length not 4");
                    }
                }
            }
            if (this.params.direction) {
                direction = this.params.direction;
            }
        }
        return `${name} ${duration}ms ${timingFunction} ${delay}ms ${iterationCount} ${direction}`;
    }
    
    private __onViewWillRender__()
    {
        this.updateCSS();
    }

    private __onViewReactRefCallback__(e:Element) 
    {
        if (e !== undefined && e !== null) {
            this.__elem__ = new WeakRef(e);
            if (this.__onAnimationend__) {
                e.addEventListener("animationend",this.__onAnimationend__);
            }
        }
    }

    private __onViewWillUnmount__()
    {
        this.clearresource();
    }

    private __onAnimationend__? = ()=> {
        this.params?.end?.();
        this.clearresource();
    }

    private clearresource()
    {
        if (this.__view__)
        {
            this.removeCSS();

            this.__keyFrames__ = [];
            this.params = undefined;

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
    ${from.keyframeString}
    ${to.keyframeString}
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
}


export class ZLCSSAnimationKeyFrame
{
    constructor() {
        this.__progress__ = 0;
        this.__key_frame_str__ = "0% {}";
    }

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
        let x = view.x.toString() + ZLCurrentSizeUnit;
        let y = view.y.toString() + ZLCurrentSizeUnit;
        let width = view.width.toString() + ZLCurrentSizeUnit;
        let height = view.height.toString() + ZLCurrentSizeUnit;
        let s = `left:${x};top:${y};width:${width};height:${height};`;
        if (view.backgroudColor) {
            s = `${s}background-color:${view.backgroudColor};`
        }
        if (view.visibility === false) {
            s = `${s}visibility:hidden;`
        }
        this.__key_frame_str__ = `${this.progress}% {${s}}`;
    }

    public get keyframeString() : string { return this.__key_frame_str__;}
    public set keyframeString(s:string) {this.__key_frame_str__ = s ? s : "0% {}";}

    private __key_frame_str__ : string;
}