import React from 'react';

import {ZLHtmlAttribute, ZLView}  from './ZLView'
import {ZLSize,ZLFont, ZLWordBreakMode, ZLWorkWrapMode, ZLTextAlignMode} from './ZLUIDef'
import {ZLUtils} from './ZLUtils'


export class ZLLabel extends ZLView
{
    constructor() {
        super();
        this.font = ZLFont.getDefaultFont();
    }
    /**
     * text 显示的文字
     */
    public text: string | undefined;
    /**
     * 文本颜色
     */
    public textColor : string | undefined;
    /**
     * 文本字体
     */
    public font : ZLFont;
    /**
     * 词内换行
     */
    public wordBreak : ZLWordBreakMode | undefined;
    /**
     * 内容换行
     */
    public wordWrap : ZLWorkWrapMode | undefined;
    /**
     * 对齐方式
     */
    public textAlign : ZLTextAlignMode | undefined;

    sizeThatSize(size:ZLSize) : ZLSize {
        return ZLUtils.textSize(this.text,size,this.font,this.wordBreak,this.wordWrap,this.textAlign);
    }
    sizeThatWidthHeight(width:number ,height : number) : ZLSize {
        return this.sizeThatSize(new ZLSize(width,height));
    }

    reactRender(){
        let attr = this.__htmlAttributes__();
        return React.createElement("div",attr.toReactClassAttributes(), this.text);
    }

    protected __htmlAttributes__() : ZLHtmlAttribute
    {
        let attr = super.__htmlAttributes__()
        let style = attr.style;
        if (this.font !== undefined) {
            this.font.toCSSStyle(style);
        }
        if (this.textColor !== undefined){
            style.color = this.textColor;
        }
        if (this.wordBreak !== undefined) {
            style.wordBreak = this.wordBreak;
        }
        if (this.wordWrap !== undefined) {
            style.wordWrap = this.wordWrap;
        }
        if (this.textAlign !== undefined) {
            style.textAlign = this.textAlign;
        }
        return attr;
    }
}