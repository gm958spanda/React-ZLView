
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
    public href : string | undefined;

    /**
     * 是否在新窗口打开  target=_blank
     */
    public openInNewWindow : boolean | undefined;
}