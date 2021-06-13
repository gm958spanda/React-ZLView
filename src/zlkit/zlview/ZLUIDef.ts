import { CSSProperties } from "react";

/**
 * 尺寸单位
 */
export enum ZLSizeUnit
{
    px = "px",
    rem = "rem"
};
export let ZLCurrentSizeUnit = ZLSizeUnit.px;

export let ZLCurrentSizeUnitOneRemToPx = 16;


export class ZLPoint
{
    constructor(x?:number ,y?:number)
    {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    }
    public x : number;
    public y : number;

    public static Zero = new ZLPoint();
}


export class ZLSize
{
    constructor(width ?:number,height ?:number)
    {
        this.width = width ? width : 0;
        this.height = height ? height : 0;
    }
    public width : number;
    public height : number;

    public static Zero = new ZLSize();

    public static getWindowContentSize()
    {
        let sz = new ZLSize(window.document.body.clientWidth,window.innerHeight)
        if (ZLCurrentSizeUnit !== ZLSizeUnit.px) {
            sz.width /= ZLCurrentSizeUnitOneRemToPx;
            sz.height /= ZLCurrentSizeUnitOneRemToPx;
        }
        return sz;
    }
}

export class ZLRect
{
    constructor(x?:number,y?:number,width?:number,height?:number)
    {
        this.origin = new ZLPoint(x,y);
        this.size = new ZLSize(width,height);
    }
    public origin : ZLPoint;
    public size : ZLSize;

    public static Zero = new ZLRect();
}

export class ZLEdgeInset
{
    constructor(left?:number,right?:number,top?:number,bottom?:number)
    {
        this.left = left?left:0;
        this.right = right?right:0;
        this.top = top?top:0;
        this.bottom = bottom?bottom:0;
    }
    left: number;
    right: number;
    top: number;
    bottom: number;

    public static Zero = new ZLEdgeInset();
}

export class ZLBoxShadow
{
    constructor()
    {
        this.hShadow = 1;
        this.vShadow = 1;
    }

    /**
     * 水平阴影的位置。允许负值
     */
    public hShadow:number;
    /**
     * 垂直阴影的位置。允许负值
     */
    public vShadow:number;
    /**
     * 模糊距离
     */
    public blur?:number;
    /**
     * 阴影的尺寸
     */
    public spread?:number;
    /**
     * 阴影的颜色。请参阅 CSS 颜色值
     */
    public color?:string;
    /**
     * 将外部阴影 (outset) 改为内部阴影
     */
    public inset?:boolean;
    public toCSSString() : string
    {
        let s = `${this.hShadow}${ZLCurrentSizeUnit} ${this.vShadow}${ZLCurrentSizeUnit}`;
        if (this.blur) {
            s += ` ${this.blur}${ZLCurrentSizeUnit}`;
        }
        if (this.spread) {
            s += ` ${this.spread}${ZLCurrentSizeUnit}`;
        }
        if (this.color) {
            s += ` ${this.color}${ZLCurrentSizeUnit}`;
        }
        if (this.inset === true) {
            s += ` inset`;
        }
        return s;
    }

    public static getDefaultFont() {
        if (ZLCurrentSizeUnit === ZLSizeUnit.px) {
            return new ZLFont(16,'Arial');
        } else {
            return new ZLFont(1,'Arial');
        }
    }
}

export enum ZLBorderStyle
{
    None = "none" ,//　无边框。与任何指定的border-width值无关
    Hidden ="hidden" , // 　隐藏边框。IE不支持
    Dotted = "dotted" , // 在MAC平台上IE4+与WINDOWS和UNIX平台上IE5.5+为点线。否则为实线（常用）
    Dashed = "dashed" , 　// 在MAC平台上IE4+与WINDOWS和UNIX平台上IE5.5+为虚线。否则为实线（常用）
    Solid = "solid" ,　// 实线边框（常用）
    Double = "double" ,　// 双线边框。两条单线与其间隔的和等于指定的border-width值
    Groove = "groove" ,　// 根据border-color的值画3D凹槽
    Ridge = "ridge" ,　// 根据border-color的值画菱形边框
    Inset = "inset" ,　// 根据border-color的值画3D凹边
    Outset = "outset" ,　// 根据border-color的值画3D凸边
}

export enum ZLWordBreakMode
{
    Normal = "normal" , //使用浏览器默认的换行规则
    BreakAll = "break-all" , //允许在单词内换行
    KeepAll = "keep-all", //只能在半角空格或连字符处换行
}

export enum ZLWorkWrapMode
{
    Normal = "normal",//只在允许的断字点换行（浏览器保持默认处理）。
    BreakWord = "break-word",//在长单词或 URL 地址内部进行换行。
}

export enum ZLTextAlignMode
{
    Left = "left", //把文本排列到左边。默认值：由浏览器决定。
    Right = "right", //把文本排列到右边。
    Center = "center",//把文本排列到中间。
    Justify = "justify" //实现两端对齐文本效果
}

export enum ZLFontStyle
{
    Normal = "normal", //标准
    Italic = "italic", //斜体
    Oblique = "oblique", //倾斜
    // Inherit = "inherit" //规定应该从父元素继承字体样式。
}
export class ZLFont
{
    constructor(size:number,family : string)
    {
        this.size = size;
        this.family = family;
    }
    public size : number ;
    public family : string ;

    public style : ZLFontStyle | undefined;
    public bold : boolean | undefined;

    public toCSSStyle(cssStyle : {}) : void
    {
        let cs : any = cssStyle;
        if (this.style !== undefined ) {
            cs.fontStyle = this.style;
        }

        cs.fontSize = this.size.toString()+ZLCurrentSizeUnit;
        cs.fontFamily = this.family;
        if (this.bold !== undefined )
        {
            cs.fontWeight = this.bold ? "bold" : "normal";
        }
    }

    public static getDefaultFont() {
        if (ZLCurrentSizeUnit === ZLSizeUnit.px) {
            return new ZLFont(16,'Arial');
        } else {
            return new ZLFont(1,'Arial');
        }
    }
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

export enum ZLCSSAnimationDirection
{
    normal = "normal",
    alternate = "alternate" //动画应该轮流反向播放。
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

export class ZLHref
{
    constructor(href? : string)
    {
        this.href = href;
    }
    /**
     * 链接指向的页面的 URL。
     */
    public href? : string;

    /**
     * 是否在新窗口打开  target=_blank
     */
    public openInNewWindow? : boolean;
}

//https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function
export class ZLTransform
{
    /**
     * 平移
     * @param x 移动距离
     * @param y 移动距离
     */
    public translate(x?:number,y?:number)
    {
        this.tx = x ? x : 0;
        this.ty = y ? y : 0;
        if(this._is3D===true && this.tz === undefined) {
            this.tz = 0;
        }
    }
    /**
     * 平移
     * @param x 移动距离
     * @param y 移动距离
     * @param z 移动距离
     */
    public translate3D(x?:number,y?:number,z?:number)
    {
        this._is3D = true;
        this.tx = x ? x : 0;
        this.ty = y ? y : 0;
        this.tz = z ? z : 0;
    }
    public translateX(x:number) { this.translate(x,this.ty);}
    public translateY(y:number) { this.translate(this.tx ,y);}
    public translateZ(z:number) { this.translate3D(this.tx ,this.ty ,z);}
    /**
     * 缩放
     * @param x 倍数
     * @param y 倍数
     */
    public scale(x?:number,y?:number)
    {
        this.scx = x ? x : 1;
        this.scy = y ? y : 1;
        if(this._is3D===true && this.scz === undefined) {
            this.scz = 1;
        }
    }
    /**
     * 缩放
     * @param x 倍数
     * @param y 倍数
     * @param z 倍数
     */
     public scale3D(x?:number,y?:number,z?:number)
     {
        this._is3D = true;
        this.scx = x ? x : 1;
        this.scy = y ? y : 1;
        this.scz = z ? z : 1;
     }
    public scaleX(x:number) { this.scale(x,this.scy);}
    public scaleY(y:number) { this.scale(this.scx,y);}
    public scaleZ(z:number) { this.scale3D(this.scx,this.scz,z);}

    /**
     * 旋转
     * @param d 角度deg
     */
    public rotate(d:number) 
    { 
        this.r = d;
        if(this._is3D === true){
            this.rotateZ(d);
        }
    }
    /**
     * 围绕自定义轴旋转
     * @param x 表示旋转轴X坐标方向的矢量
     * @param y 表示旋转轴Y坐标方向的矢量
     * @param z 表示旋转轴Z坐标方向的矢量
     * @param d 角度deg
     */
    public rotate3d(x?:number,y?:number,z?:number,d?:number)
    {
        this._is3D = true;
        this.rx = x?x:0;
        this.ry = y?y:0;
        this.rz = z?z:1;
        this.r = d?d:0;
    }
    public rotateX(d:number) { this.rotate3d(1,0,0,d);}
    public rotateY(d:number) { this.rotate3d(0,1,0,d);}
    public rotateZ(d:number) { this.rotate3d(0,0,1,d);}

    /**
     * 拉伸
     * @param dx 角度deg
     * @param dy 角度deg
     */
    public skew(dx:number,dy:number)
    {
        this.swx = dx;
        this.swy = dy;
    }
    public skewX(dx:number) { this.skew(dx,this.swy ? this.swy : 0);}
    public skewY(dy:number) { this.skew(this.swx ? this.swx : 0 ,dy);}

    /**
     *  z=0平面与用户之间的距离，以便给三维定位元素一定透视度。当每个3D元素的z>0时会显得比较大，而在z<0时会显得比较小。其影响的程度由这个属性的值来决定
     * @param n 距离
     */
    public perspective(n:number)
    { 
        this._is3D = true;
        this.pz = n;
    }
    /**
     * 指定了观察者的位置，用作 perspective 属性的消失点
     * @param x 指定消失点的横坐标 取值范围[0,1]
     * @param y 指定消失点的纵坐标 取值范围[0,1]
     */
    public perspectiveOrigin(x:number,y:number)
    { 
        this._is3D = true;
        this.pox = x;
        this.poy = y;
    }

    /**
     * 设置元素的子元素是位于 3D 空间中还是平面中。 如果选择平面，元素的子元素将不会有 3D 的遮挡关系。 由于这个属性不会被继承，因此必须为元素的所有非叶子子元素设置它
     */
    public set preserve3d(b:boolean)
    {
        this._is3D = true;
        this._preserve3d = b;
    }
    /**
     * 指定当元素背面朝向观察者时是否可见
     */
    public set backfaceVisibility(b:boolean)
    {
        this._is3D = true;
        this._backfaceVisibility = b;
    }

    /**
     * 转换元素的坐标系原点 默认在(0.5,0.5)这个位置
     * @param x x原点 取值范围[0,1]
     * @param y y原点 取值范围[0,1]
     */
    public origin(x:number,y:number)
    {
        this.ox = x;
        this.oy = y;
    }
    public originX(x:number) {this.origin(x,this.oy?this.oy:0.5);}
    public originY(y:number) {this.origin(this.ox?this.ox:0.5 , y);}
    
    private tx?:number;
    private ty?:number;
    private tz?:number;

    private scx?:number;
    private scy?:number;
    private scz?:number;

    private swx?:number;
    private swy?:number;
    private swz?:number;

    private r?:number;
    private rx?:number;
    private ry?:number;
    private rz?:number;

    private pz?:number;
    private pox?:number;
    private poy?:number;

    private ox?:number;
    private oy?:number; 
    private oz?:number; 

    private _preserve3d?:boolean;
    private _backfaceVisibility?:boolean;

    private _is3D:boolean = false;
    public toCSSStyle(style:CSSProperties)
    {
        if (this.ox) 
        {
            let x = (this.ox*100).toString().split(".")[0];
            let y = (this.oy!*100).toString().split(".")[0];
            style.transformOrigin = `${x}% ${y}%`;
        }
        if (this._is3D) 
        {
            let s = ""
            if (this.tx) {
                s += ` translate3d(${this.tx+ZLCurrentSizeUnit},${this.ty+ZLCurrentSizeUnit},${this.tz+ZLCurrentSizeUnit})`
            }
            if (this.r) {
                s += ` rotate3d(${this.rx},${this.ry},${this.rz},${this.r}deg)`
            }
            if (this.scx) {
                s += ` scale3d(${this.scx},${this.scy},${this.scz})`
            }
            if(s.length > 3) {
                style.transform = s;
            }

            if (this._preserve3d === true) {
                style.transformStyle = "preserve-3d";
            }
            if (this._backfaceVisibility === true) {
                style.backfaceVisibility = "visible";
            }
            if(this.pz)
            {
                style.perspective = this.pz.toString();
                if (this.pox) 
                {
                    let x = (this.pox*100).toString().split(".")[0];
                    let y = (this.poy!*100).toString().split(".")[0];
                    style.perspectiveOrigin = `${x}% ${y}%`;
                }
            }
        }
        else
        {
            let s = ""
            if (this.tx) {
                s += ` translate(${this.tx+ZLCurrentSizeUnit},${this.ty+ZLCurrentSizeUnit})`
            }
            if (this.r) {
                s += ` rotate(${this.r}deg)`
            }
            if (this.scx) {
                s += ` scale(${this.scx},${this.scy})`
            }
            if (this.swx) {
                s += ` skew(${this.swx}deg,${this.swy}deg)`
            }
            if(s.length > 3) {
                style.transform = s;
            }
        }
    }
}