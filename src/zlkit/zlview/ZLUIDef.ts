import { CSSProperties } from "react";
import { ZLTransformMatrix3D, ZLTransformMatrix2D} from '../sugar/cssmatrix';

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
    constructor() {
        this._is3D = false;
        this._matrixs = [ZLTransformMatrix2D.identityMatrix]
    }
    /**
     * 恢复到identityMatrix
     */
    public resumeIdentityMatrix()
    {
        if (this._is3D) {
            this._matrixs = [ZLTransformMatrix3D.identityMatrix];
        } else {
            this._matrixs = [ZLTransformMatrix2D.identityMatrix];
        }
    }
    /**
     * 平移
     * @param x 移动距离
     * @param y 移动距离
     */
    public translate(x:number,y:number)
    {
        if(this._is3D) {
            let mtr = ZLTransformMatrix3D.translationMatrix( x ,y , 0);
            this._matrixs.push(mtr);
        } else {
            let mtr = ZLTransformMatrix2D.translationMatrix( x ,y);
            this._matrixs.push(mtr);
        }
    }
    /**
     * 平移
     * @param x 移动距离
     * @param y 移动距离
     * @param z 移动距离
     */
    public translate3D(x:number,y:number,z:number)
    {
        this.converTo3D();
        let mtr = ZLTransformMatrix3D.translationMatrix( x ,y , z);
        this._matrixs.push(mtr);
    }
    public translateX(x:number) { this.translate(x,0);}
    public translateY(y:number) { this.translate(0 ,y);}
    public translateZ(z:number) { this.translate3D(0 ,0 ,z);}
    /**
     * 缩放
     * @param x 倍数
     * @param y 倍数
     */
    public scale(x:number,y:number)
    {
        if(this._is3D) {
            let mtr = ZLTransformMatrix3D.scaleMatrix(x , y , 1);
            this._matrixs.push(mtr);
        } else {
            let mtr = ZLTransformMatrix2D.scaleMatrix( x , y );
            this._matrixs.push(mtr);
        }
    }
    /**
     * 缩放
     * @param x 倍数
     * @param y 倍数
     * @param z 倍数
     */
    public scale3D(x:number,y:number,z:number)
    {
    this.converTo3D();
    let mtr = ZLTransformMatrix3D.scaleMatrix(x , y , z);
    this._matrixs.push(mtr);
    }
    public scaleX(x:number) { this.scale(x,1);}
    public scaleY(y:number) { this.scale(1,y);}
    public scaleZ(z:number) { this.scale3D(1,1,z);}

    /**
     * 旋转
     * @param r 弧度
     */
    public rotate(r:number) 
    { 
        if(this._is3D) {
            let mtr = ZLTransformMatrix3D.rotateAroundZ(r);
            this._matrixs.push(mtr);
        } else {
            let mtr = ZLTransformMatrix2D.rotateMatrix(r);
            this._matrixs.push(mtr);
        }
    }
    /**
     * 围绕自定义轴旋转
     * @param x 表示旋转轴X坐标方向的矢量
     * @param y 表示旋转轴Y坐标方向的矢量
     * @param z 表示旋转轴Z坐标方向的矢量
     * @param r 弧度
     */
    public rotate3d(x:number,y:number,z:number,r:number)
    {
        this.converTo3D();
        let mtr = ZLTransformMatrix3D.rotate3D(x,y,z,r);
        this._matrixs.push(mtr);
    }
    public rotateX(r:number) 
    {
        this.converTo3D();
        let mtr = ZLTransformMatrix3D.rotateAroundX(r);
        this._matrixs.push(mtr);
    }
    public rotateY(r:number) 
    {
        this.converTo3D();
        let mtr = ZLTransformMatrix3D.rotateAroundY(r);
        this._matrixs.push(mtr);
    }
    public rotateZ(r:number) 
    {
        this.converTo3D();
        let mtr = ZLTransformMatrix3D.rotateAroundZ(r);
        this._matrixs.push(mtr);
    }

    /**
     * 拉伸
     * @param rx 弧度
     * @param ry 弧度
     */
    public skew(rx:number,ry:number)
    {
        if(this._is3D) 
        {
            let mtr = ZLTransformMatrix3D.skewMatrix(ry,0,rx,0,0,0);
            this._matrixs.push(mtr);
        }
        else
        {
            let mtr = ZLTransformMatrix2D.skewMatrix(rx,ry);
            this._matrixs.push(mtr);
        }
    }
    public skewX(rx:number) { this.skew(rx,0);}
    public skewY(ry:number) { this.skew(0,ry);}
    public skew3d(rxy:number , rxz:number, ryx:number, ryz:number , rzx:number, rzy:number)
    {
        this.converTo3D();
        let mtr = ZLTransformMatrix3D.skewMatrix(rxy,rxz,ryx,ryz,rzx,rzy);
        this._matrixs.push(mtr);
    }
    /**
     * 镜像
     */
    public reflect(x:boolean,y:boolean)
    {
        if(this._is3D) {
            let mtr = ZLTransformMatrix3D.relectMatrix(x,y,false);
            this._matrixs.push(mtr);
        } else {
            let mtr = ZLTransformMatrix2D.relectMatrix(x,y);
            this._matrixs.push(mtr);
        }
    }
    public reflect3d(x:boolean,y:boolean,z:boolean)
    {
        this.converTo3D();
        let mtr = ZLTransformMatrix3D.relectMatrix(x,y,z);
        this._matrixs.push(mtr);
    }
    public reflectX(b:boolean) { this.reflect(b,false);}
    public reflectY(b:boolean) { this.reflect(false ,b);}
    public reflectZ(b:boolean) { this.reflect3d(false ,false, b);}

    /**
     *  z=0平面与用户之间的距离，以便给三维定位元素一定透视度。当每个3D元素的z>0时会显得比较大，而在z<0时会显得比较小。其影响的程度由这个属性的值来决定
     * @param n 距离
     */
    public perspective(n:number)
    { 
        this.converTo3D();
        this._pz = n;
    }
    /**
     * 指定了观察者的位置，用作 perspective 属性的消失点
     * @param x 指定消失点的横坐标 最终将转换为百分数(x * 100)%
     * @param y 指定消失点的纵坐标 最终将转换为百分数(y * 100)%
     */
    public perspectiveOrigin(x:number,y:number)
    { 
        this.converTo3D();
        this._pox = x;
        this._poy = y;
    }

    /**
     * 设置元素的子元素是位于 3D 空间中还是平面中。 如果选择平面，元素的子元素将不会有 3D 的遮挡关系。 由于这个属性不会被继承，因此必须为元素的所有非叶子子元素设置它
     */
    public set preserve3d(b:boolean)
    {
        this.converTo3D();
        this._preserve3d = b;
    }
    /**
     * 指定当元素背面朝向观察者时是否可见
     */
    public set backfaceVisibility(b:boolean)
    {
        this.converTo3D();
        this._backfaceVisibility = b;
    }

    /**
     * 转换元素的坐标系原点 默认在(0.5,0.5)这个位置
     * @param x x原点 取值范围[0,1]
     * @param y y原点 取值范围[0,1]
     */
    public origin(x:number,y:number)
    {
        this._ox = x;
        this._oy = y;
    }
    public originX(x:number) {this.origin(x,this._oy?this._oy:0.5);}
    public originY(y:number) {this.origin(this._ox?this._ox:0.5 , y);}

    private _matrixs : number[][];
    private _is3D:boolean;
    private converTo3D()
    {
        if( true !== this._is3D)
        {
            this._is3D = true;
            this._matrixs.forEach((v,index) => {
                this._matrixs[index] = ZLTransformMatrix2D.toMatrix3D(v);
            });
        }
    }

    private _preserve3d?:boolean;
    private _backfaceVisibility?:boolean;

    private _pz?:number;
    private _pox?:number;
    private _poy?:number;

    private _ox?:number;
    private _oy?:number; 
 
    public copy() : ZLTransform
    {
        let t = new ZLTransform();
        t._is3D = this._is3D;
        t._backfaceVisibility = this._backfaceVisibility;
        t._preserve3d = this._preserve3d;
        t._ox = this._ox;
        t._oy = this._oy;
        t._pz = this._pz;
        t._pox = this._pox;
        t._poy = this._poy;
        t._matrixs = [];
        this._matrixs.forEach((arr,index)=>{
            let e :number[]= [];
            t._matrixs[index] = e;
            arr.forEach((v,index)=>{
                e[index] = v;
            });
        });
        return t;
    }
    /**
     * 计算矩阵
     */
    public mergeMatrixesToOne() : number[]
    {
        if (this._matrixs.length > 1)
        {
            //图像处理时，矩阵的运算是从右边往左边方向进行运算的。这就形成了越在右边(右乘)的矩阵，越先运算(先乘)，反之亦然。所以，右乘就是先乘，左乘就是后乘。
            if (this._is3D) 
            {
                let m = this._matrixs[0];
                for (let i = this._matrixs.length -1; i > 0 ; i--)
                {
                    m = ZLTransformMatrix3D.multiplyMatrix(m,this._matrixs[i]);
                }
                return m;
            }
            else
            {
                let m = this._matrixs[0];
                for (let i = this._matrixs.length -1; i > 0 ; i--)
                {
                    m = ZLTransformMatrix2D.multiplyMatrix(m,this._matrixs[i]);
                }
                return m;
            }
        }
        else{
            let m :number[]= [];
            this._matrixs[0].forEach((v,index)=>{
                m[index] = v;
            })
            return m;
        }
    }

    public static clearCSSStyle(style:CSSProperties)
    {
        delete style.transformOrigin;
        delete style.transform;
        delete style.transformStyle;
        delete style.backfaceVisibility;
        delete style.perspective;
        delete style.perspectiveOrigin;
    }
    public toCSSStyle(style:CSSProperties)
    {
        if (this._ox) 
        {
            let x = (this._ox*100).toString().split(".")[0];
            let y = (this._oy!*100).toString().split(".")[0];
            style.transformOrigin = `${x}% ${y}%`;
        }
        if (this._is3D) 
        {
            let m = this.mergeMatrixesToOne();
            /* 
            martix3d[a1, b1, c1, tx, 
                     a2, b2, c2, ty,
                     a3, b3, c3, tz,
                     0,  0,  0,   1]
            ]
            matrix3d(a1, b1, c1, 0, a2, b2, c2, 0, a3, b3, c3, 0, tx, ty, tz, 1)
            */
            style.transform = `matrix3d(${m[0]},${m[1]},${m[2]},0,${m[4]},${m[5]},${m[6]},0,${m[8]},${m[9]},${m[10]},0,${m[3]},${m[7]},${m[11]},1)`;

            if (this._preserve3d === true) {
                style.transformStyle = "preserve-3d";
            }
            if (this._backfaceVisibility === true) {
                style.backfaceVisibility = "visible";
            }
            if(this._pz)
            {
                style.perspective = this._pz.toString() + ZLCurrentSizeUnit;
                if (this._pox) 
                {
                    let x = (this._pox*100).toString().split(".")[0];
                    let y = (this._poy!*100).toString().split(".")[0];
                    style.perspectiveOrigin = `${x}% ${y}%`;
                }
            }
        }
        else
        {
            let m = this.mergeMatrixesToOne();
            /*
            martix2d  [
                a,b,tx,
                c,d,ty,
                0,0,1
            ]
            matrix2d(a, b, c, d, tx, ty)
            */
            style.transform = `matrix(${m[0]},${m[1]},${m[3]},${m[4]},${m[2]},${m[5]})`;
        }
    }
}