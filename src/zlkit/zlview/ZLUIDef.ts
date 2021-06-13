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
    constructor(size:number,family : string)
    {
        this.hShadow = 0;
        this.vShadow = 0;
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
    public color?:number;
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