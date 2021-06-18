
import {ZLObject} from './ZLObject'

export enum ZLCSSTransitionProperty
{  
    all = "all",

    x = "left",
    left = "left",
    y = "top",
    top = "top",
    width = "width",
    height = "height",

    color = "color",
    backgroundColor = "background-color",
    
    borderColor = "border-color",
    borderWidth = "border-width",

    padding = "padding",

    opacity = "opacity",
    visibility = "visibility",

    transform = "transform"
}

//动画的速度曲线
export enum ZLCSSTransitionTimingFunction
{
    linear = "linear",
    ease = "ease",
    easeIn = "ease-in",
    easeOut = "ease-out",
    easeInOut = "ease-out",
    cubicBezier = "cubic-bezier"//cubic-bezier(n,n,n,n) ,在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。
}

interface ZLCSSTransitionOne
{
    property : ZLCSSTransitionProperty;
    duration? : number; //毫秒 默认300
    timingFunction? : string; //默认linear
    delay? : number; //毫秒 默认0
    cubicBezierValue? : number[]; //timingFunction 为 cubicBezier时，需要指定参数cubic-bezier(n,n,n,n)
}

export class ZLCSSTransition extends ZLObject
{
    public set(paras : ZLCSSTransitionOne)
    {
        if (this.__zl_transitions__ === undefined) {
            this.__zl_transitions__ = new Map();
        }
        this.__zl_transitions__.set(paras.property,paras);
    }
    /**
     * 删除某个过渡属性
     * @param property 属性
     */
    public remove(property:ZLCSSTransitionProperty)
    {
        this.__zl_transitions__?.delete(property);
    }
    /**
     * 清空所有
     */
    public clear() 
    {
        this.__zl_transitions__?.clear();
    }
    public toTransitionStr()
    {
        if (this.__zl_transitions__ === undefined){
            return undefined;
        }
        if (this.__zl_transitions__.size === 0){
            return undefined;
        }
        let all = this.__zl_transitions__.get(ZLCSSTransitionProperty.all);
        if (all)
        {
            return this.__toTransitionStr(all);
        }
        else 
        {
            let s = "";
            this.__zl_transitions__.forEach((v,k)=>{
                if (s.length === 0) {
                    s = this.__toTransitionStr(v);
                } else {
                    s += "," + this.__toTransitionStr(v);
                }
            });

            return s;
        }
    }
    private __toTransitionStr(paras:ZLCSSTransitionOne)
    {
        let duration = 300;
        let delay = 0;
        let timingFunction:string = ZLCSSTransitionTimingFunction.linear;
        if(paras.duration) {
            duration = paras.duration;
        }
        if(paras.delay) {
            delay = paras.delay;
        }
        if (paras.timingFunction) 
        {
            let f = paras.timingFunction;
            if (f === ZLCSSTransitionTimingFunction.cubicBezier){
                if (paras.cubicBezierValue && paras.cubicBezierValue.length === 4) {
                    let v = paras.cubicBezierValue;
                    timingFunction = f+`(${v[0]},${v[1]},${v[2]},${v[3]})`;
                } else {
                    console.log("timingFunction set cubicBezier, but cubicBezierValue length not 4");
                }
            }
        }
        return `${paras.property} ${duration}ms ${timingFunction} ${delay}ms`;
    }

    public copy()
    {
        let ts = this.__zl_transitions__;
        if (ts) {
            let m = new Map<string,ZLCSSTransitionOne>();
            ts.forEach((v,k) => {
                m.set(k,v);
            });
            ts = m;
        }
        let n = new ZLCSSTransition();
        n.__zl_transitions__ = ts;
        return n;
    }
    private __zl_transitions__? : Map<string,ZLCSSTransitionOne>
}