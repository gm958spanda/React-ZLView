import React from 'react';

import {ZLHtmlAttribute, ZLView}  from './ZLView'
import {ZLFont, ZLWordBreakMode, ZLWorkWrapMode, ZLTextAlignMode} from './ZLUIDef'

export class ZLTextBaseView extends ZLView
{
    constructor() {
        super();
        this.__zl_textbaseview_font__ = ZLFont.getDefaultFont();
    }
    /**
     * text 显示的文字
     */
    public get text(): string | undefined { return this.__zl_textbaseview_text__;}
    public set text(v:string | undefined) {this.__zl_textbaseview_text__ = v}
    /**
     * 文本颜色
     */
    public get textColor():string|undefined {return this.color;}
    public set textColor(c:string|undefined) {this.color=c;}
    /**
     * 文本字体
     */
    public get font() : ZLFont {return this.__zl_textbaseview_font__;}
    public set font(v:ZLFont) {this.__zl_textbaseview_font__ = v;}
    /**
     * 词内换行
     */
    public get wordBreak():ZLWordBreakMode | undefined { return this.__cssStyle__.wordBreak as ZLWordBreakMode;}
    public set wordBreak(m:ZLWordBreakMode | undefined) {  this.__cssStyle__.wordBreak = m;}
    /**
     * 内容换行
     */
    public get wordWrap():ZLWorkWrapMode | undefined { return this.__cssStyle__.wordWrap as ZLWorkWrapMode;}
    public set wordWrap(m:ZLWorkWrapMode | undefined) {this.__cssStyle__.wordWrap = m;}
    /**
     * 对齐方式
     */
    public get textAlign():ZLTextAlignMode |undefined { return this.__cssStyle__.textAlign as ZLTextAlignMode;}
    public set textAlign(m:ZLTextAlignMode |undefined) {this.__cssStyle__.textAlign = m;}

    protected __reactRender__(children?:React.ReactNode[])
    {
        let attr = this.__htmlAttributes__();
        return React.createElement("div",attr.toReactClassAttributes(), children,this.text);
    }

    protected __htmlAttributes__() : ZLHtmlAttribute
    {
        let attr = super.__htmlAttributes__()
        let style = attr.style;
        if (this.font !== undefined) {
            this.font.toCSSStyle(style);
        }
        return attr;
    }

    private __zl_textbaseview_text__? : string;
    private __zl_textbaseview_font__: ZLFont;
}