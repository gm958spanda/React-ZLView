import { CSSProperties, SyntheticEvent} from 'react';
import {ZLObject} from './ZLObject'
import { ZLBoxShadow, 
     ZLCurrentSizeUnit, 
     ZLTransform} from './ZLUIDef';
import {ZLView}  from './ZLView'


export enum ZLCSSAnimationDirection
{
    normal = "normal",
    alternate = "alternate" //动画应该轮流反向播放。
}

//动画的速度曲线
export enum ZLCSSAnimationTimingFunction
{
    linear = "linear",
    ease = "ease",
    easeIn = "ease-in",
    easeOut = "ease-out",
    easeInOut = "ease-out",
    cubicBezier = "cubic-bezier",//cubic-bezier(n,n,n,n) ,在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。
}

export interface ZLCSSAnimationParams
{
    /** 终状态*/
    to : () => void;
    /** 动画结束*/
    end? : () => void;
    /** 持续时间 单位毫秒 默认300毫秒*/
    duration? : number;
    /** 动画的速度曲线 默认ease*/
    timingFunction? : ZLCSSAnimationTimingFunction;
    /** cubic-bezier(n,n,n,n) ,在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。*/
    cubicBezierValue? : number[];
    /** 在动画开始之前的延迟 单位毫秒 默认0毫秒*/
    delay?:number;
    /** 动画播放次数，默认1 */
    iterationCount?:number | "infinite";
    /** 定义是否应该轮流反向播放动画 默认normal*/
    direction?:ZLCSSAnimationDirection;
}

export class ZLCSSAnimation extends ZLObject
{
    constructor(view:ZLView, keyFrames : ZLCSSAnimationKeyFrame[])
    {
        super();
        this.__keyFrames__ = keyFrames;
        this.__is_css_created__ = false;
        this.__is_end__ = false;
        this.__zl_view__ = new WeakRef(view);

        view.addListenViewWillRender(this.__onViewWillRender__,this);
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
                duration = this.params.duration;
            }
            if(this.params.delay) {
                delay = this.params.delay;
            }
            if (this.params.iterationCount) {
                (iterationCount as any) = this.params.iterationCount;
            }
            if (this.params.timingFunction) {
                let f = this.params.timingFunction;
                if (f === ZLCSSAnimationTimingFunction.cubicBezier){
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
    public get isEnd () { return this.__is_end__;}

    public onViewAnimationClear() {
        this.__onViewAnimationend__?.();
    }

    private __onViewWillRender__ = ()=>
    {
        if (this.__is_end__ === false) 
        {
            let view = this.__zl_view__?.deref();
            if (view)
            {
                if (this.__onViewAnimationStart__ ) {
                    view.addListenDOMEvent("onAnimationStart",this.__onViewAnimationStart__ , this);
                }
                if (this.__onViewAnimationend__) {
                    view.addListenDOMEvent("onAnimationEnd",this.__onViewAnimationend__,this);
                }
            }
            this.updateCSS();
        }
    }
    private __onViewWillUnmount__ = () =>
    {
        this.clearresource();
    }

    private __onViewAnimationend__?= ()=> {
        if (this.__is_end__ === false) {
            this.params?.end?.();
            this.clearresource();
        }
    }
    private __onViewAnimationStart__?= (e:SyntheticEvent)=> {
        if (e && e.currentTarget!==null){
            let str = (e.currentTarget as HTMLElement).style.animation;
            if (str === undefined || str.indexOf(this.uniqueString) < 0) {
                this.__onViewAnimationend__?.();
            }
        }
    }

    private clearresource()
    {
        this.__is_end__ = true;
        if (this.__zl_view__)
        {
            this.removeCSS();

            this.__keyFrames__ = [];
            this.params = undefined;

            let view = this.__zl_view__;
            this.__zl_view__ = undefined;

            setTimeout(() => {
                let v = view.deref();
                if (v) {
                    v.removeListenViewWillRender(this.__onViewWillRender__);
                    v.removeListenWiewWillUnMount(this.__onViewWillUnmount__);
                    if (this.__onViewAnimationStart__) {
                        v.removeListenDOMEvent("onAnimationStart",this.__onViewAnimationStart__);
                        this.__onViewAnimationStart__ = undefined;
                    }
                    if (this.__onViewAnimationend__) {
                        v.removeListenDOMEvent("onAnimationEnd",this.__onViewAnimationend__!);
                        this.__onViewAnimationend__ = undefined;
                    }
                }
            }, 0);
        }
    }
    /**
     * 创建style标签，写入CSS样式
     */
    private updateCSS()
    {
        if (this.__is_css_created__ === true) {
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

    private removeCSS()
    {
        let idstr = this.uniqueString;
        let style = document.getElementById(idstr) as HTMLStyleElement;
        if (style !== undefined && style !== null) {
            style.remove();
        }
    }

    private __is_end__: boolean;
    private __is_css_created__ : boolean;
    private __keyFrames__ : ZLCSSAnimationKeyFrame[];
    private __zl_view__? : WeakRef<ZLView>;
}


interface ZLCSSAnimatableStyle
{
    left? : number;
    top? : number;
    width? : number;
    height? : number;
    
    backgroudColor? : string;
    color? : string;

    opacity?:number;
    // visibility? : boolean | string;

    borderWidth?:number;
    borderColor?:string;
    borderStyle?:string;

    boxShadow?:ZLBoxShadow;

    transform?:ZLTransform;
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
    public copyViewStyle(view:ZLCSSAnimatableStyle)
    {
        let s = "";
        if (view.left) {
            s += `left:${view.left.toString() + ZLCurrentSizeUnit};`
        }
        if (view.top) {
            s += `top:${view.top.toString() + ZLCurrentSizeUnit};`
        }
        if (view.width) {
            s += `width:${view.width.toString() + ZLCurrentSizeUnit};`
        }
        if (view.height) {
            s += `height:${view.height.toString() + ZLCurrentSizeUnit};`
        }

        if (view.backgroudColor) {
            s += `background-color:${view.backgroudColor};`
        }
        if (view.color) {
            s += `color:${view.color};`
        }

        if (view.opacity) {
            s += `opacity:${view.opacity};`
        }
        // if (view.visibility !== undefined)
        // {
        //     if ( view.visibility === false) {
        //         s = `${s}visibility:hidden;`
        //     } else if ( view.visibility !== true) {
        //         s = `${s}visibility:${view.visibility};`
        //     }
        // }

        if (view.borderColor || view.borderWidth || view.borderStyle) {
            s += "border:";
            if(view.borderWidth) {
                s+= view.borderWidth.toString()+ZLCurrentSizeUnit;
            }
            if (view.borderStyle) {
                s += view.borderStyle;
            }
            if (view.borderColor) {
                s += view.borderColor;
            }
            s+=";"
        }
        if (view.boxShadow) {
            s += `box-shadow:${view.boxShadow.toCSSString()};`
        }
        if (view.transform) {
            let tsf:CSSProperties = {};
            view.transform.toCSSStyle(tsf);
            if (tsf.transform) {
                s += `transform:${tsf.transform};`;
            }
            if (tsf.transformOrigin) {
                s += `transform-origin:${tsf.transformOrigin};`;
            }
            if (tsf.transformStyle) {
                s += `transform-style:${tsf.transformStyle};`;
            }
            if (tsf.backfaceVisibility) {
                s +=`backface-visibility:${tsf.backfaceVisibility};`;
            }
            if(tsf.perspective) {
                s += `perspective:${tsf.perspective};`;
                if (tsf.perspectiveOrigin) {
                    s+= `perspective-origin:${tsf.perspectiveOrigin};`;
                }
            }
        } else {
            ///此处为了使动画过程中的transform状态不完全相同
            // s += "transform:matrix(1,0,0,1,0,0);";
            s += "transform:none;";
        }
        this.__key_frame_str__ = `${this.progress}% {${s}}`;
    }

    public get keyframeString() : string { return this.__key_frame_str__;}
    public set keyframeString(s:string) {this.__key_frame_str__ = s ? s : "0% {}";}

    private __key_frame_str__ : string;
}