import {ZLHtmlAttribute, ZLView}  from './ZLView'
import './ZLScrollView.css'

export class ZLScrollView extends ZLView
{
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
        if(this.__html_elem__ !== undefined) {
            this.__html_elem__.scrollTo(x,y);
        }
    }

    public get contentOffSetX(): number { return this.__html_elem__ ? this.__html_elem__.scrollLeft : 0 ;}
    public get contentOffSetY(): number { return this.__html_elem__ ? this.__html_elem__.scrollTop : 0 ;}

    protected __htmlAttributes__() : ZLHtmlAttribute
    {
        let attr = super.__htmlAttributes__();
        attr.style.overflowX = (this.alwaysShowScrollIndicatorX === true) ? "scroll" : "auto";
        attr.style.overflowY = (this.alwaysShowScrollIndicatorY === true) ? "scroll" : "auto";
        if (this.hiddenScrollBar === true ){
            attr.className = "zl-invisible-scrollbar";
        }
        attr.ref = (e:Element) =>{
            this.__html_elem__ = e;
        }
        return attr;
    }

    private __html_elem__ : Element | undefined;
    // __onload__(e:React.SyntheticEvent)
    // {
    //     console.log(e.currentTarget.scrollTop,e.currentTarget.scrollLeft, e.currentTarget.scrollHeight,e.currentTarget.scrollWidth);
    // }
}