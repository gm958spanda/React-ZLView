import {ZLHtmlAttribute, ZLView}  from './ZLView'
import './ZLCSS.css'

export class ZLScrollView extends ZLView
{
    constructor(){
        super();
        this.addListenOnReactRefCallback(this.__scrollView_onRectRefCallBack__, this);
    }
    /**
     * 显示水平滚动条
     */
    public alwaysShowScrollIndicatorX : boolean | undefined;
    /**
     * 显示垂直滚动条
     */
    public alwaysShowScrollIndicatorY : boolean | undefined;

    /**
     * 隐藏滚动条 设置 -webkit-scrollbar
     */
    public hiddenScrollBar : boolean | undefined;
    
    /**
     * 滚动到指定位置
     */
    public scrollTo(x:number,y:number)
    {
        if(this.__zl_domNode__ !== undefined && this.__zl_domNode__ !== null ) {
            this.__zl_domNode__.scrollTo(x,y);
        }
    }

    public get contentOffSetX(): number { return this.__zl_domNode__ ? this.__zl_domNode__.scrollLeft : 0 ;}
    public get contentOffSetY(): number { return this.__zl_domNode__ ? this.__zl_domNode__.scrollTop : 0 ;}

    protected __htmlAttributes__() : ZLHtmlAttribute
    {
        let attr = super.__htmlAttributes__();
        attr.style.overflowX = (this.alwaysShowScrollIndicatorX === true) ? "scroll" : "auto";
        attr.style.overflowY = (this.alwaysShowScrollIndicatorY === true) ? "scroll" : "auto";
        if (this.hiddenScrollBar === true ){
            attr.className = "zl-invisible-scrollbar";
        }
        return attr;
    }

    private __scrollView_onRectRefCallBack__(e:Element){
        this.__zl_domNode__ = e;
    }
    private __zl_domNode__ : Element | undefined;
    // __onload__(e:React.SyntheticEvent)
    // {
    //     console.log(e.currentTarget.scrollTop,e.currentTarget.scrollLeft, e.currentTarget.scrollHeight,e.currentTarget.scrollWidth);
    // }
}