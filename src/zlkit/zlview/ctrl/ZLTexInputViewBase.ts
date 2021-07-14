import React from 'react';

import {ZLHtmlAttribute}  from '../ZLView'
import {ZLSize, ZLEdgeInset, ZLCurrentSizeUnit, ZLPoint} from '../ZLUIDef'
import {ZLTextBaseView}  from './ZLTextBaseView'


type ZLTexInputViewBaseOnInputCallback = (sender:ZLTexInputViewBase)=>void;

export class ZLTexInputViewBase extends ZLTextBaseView
{
    constructor() {
        super();
        this.borderWidth = 1;
        this.padding = new ZLEdgeInset(2,2,2,2);
        this.addListenOnReactRefCallback((e:Element) =>{
            let node = (e as HTMLInputElement);
            if (node) {
                node.value = this.text;
                node.scrollLeft = this.__zl_txtinput_scrollOffset__.x;
                node.scrollTop = this.__zl_txtinput_scrollOffset__.y;
                this.__zl_txtinput_node__ = node;   
            }         
        });

        this.addListenDOMEvent("onInput", (e:React.SyntheticEvent)=>{
            let node = (e.target as HTMLInputElement);
            this.__zl_txtinput_node__ = node
            this.__zl_txtinput_value__ = node.value;
            this.__zl_txtinput_scrollSize__.width = node.scrollWidth;
            this.__zl_txtinput_scrollSize__.height = node.scrollHeight;
            this.__zl_txtinput_scrollOffset__.x = node.scrollLeft;
            this.__zl_txtinput_scrollOffset__.y = node.scrollTop;

            this.onInput?.(this);
        });
    }

    /**
     * 滚动尺寸
     */
    public get scrollSize() : ZLSize {return this.__zl_txtinput_scrollSize__;}
    /**
     * 滚动偏移
     */
    public get scrollOffset() : ZLPoint {return this.__zl_txtinput_scrollOffset__;}
    /**
     * 滚动
     */
    public scrollToXY(x:number,y:number) {
        if (this.__zl_txtinput_node__) {
            this.__zl_txtinput_node__.scrollTo(x,y);
            this.__zl_txtinput_scrollOffset__.x = x;
            this.__zl_txtinput_scrollOffset__.y = y;
        } else {
            this.__zl_txtinput_scrollOffset__.x = x;
            this.__zl_txtinput_scrollOffset__.y = y;
        }
    }

    /**
     * text 显示的文字
     */
    public get text():string{ return this.__zl_txtinput_value__ ? this.__zl_txtinput_value__ : "";}
    public set text(value:string) 
    {
        if (value !== this.__zl_txtinput_value__)
        {
            this.__zl_txtinput_value__ = value;
            if(this.__zl_txtinput_node__) {
                this.__zl_txtinput_node__.value = value;
            }
        }
    }
    /**
     * 简短提示
     */
    public placeholder? : string;
    /**
     * 文本区域的最大字符数
     */
    public maxLength? : number;
    /**
     * 是否只读
     */
    public readonly? : boolean;
    /**
     * 是否禁用
     */
    public disabled? :boolean;
    /**
     * 页面加载后文本区域自动获得焦点
     */
    public autofocus? : boolean;
    /**
     * onInput回调
     */
    public onInput? :ZLTexInputViewBaseOnInputCallback;

    protected __htmlAttributes__() : ZLHtmlAttribute
    {
        let attr = super.__htmlAttributes__();
        if (this.__zl_txtinput_value__ !== undefined) {
            (attr.otherAttr as any).defaultValue = this.__zl_txtinput_value__;
        }
        if(this.readonly === true){
            (attr.otherAttr as any).readOnly = "readonly";
        }
        if (this.placeholder !== undefined) {
            (attr.otherAttr as any).placeholder = this.placeholder;
        }
        if (this.maxLength !== undefined) {
            (attr.otherAttr as any).maxLength = this.maxLength;
        }
        if (this.autofocus === true) {
            (attr.otherAttr as any).autofocus = "";
        }
        let style = attr.style;
        style.resize = "none";
        if(true)
        {
            let p = this.padding;
            let w = 0;
            let h = 0;
            if (p){
                w += p.left + p.right;
                h += p.top + p.bottom;
            }
            let bw = this.borderWidth;
            if (bw) {
                w += bw *2;
                h += bw *2;
            }
            style.width = (this.width -w).toString() + ZLCurrentSizeUnit;
            style.height = (this.height -h).toString() + ZLCurrentSizeUnit;
        }
        return attr;
    }
    
    private __zl_txtinput_node__? : HTMLInputElement;
    private __zl_txtinput_value__? :string;
    private __zl_txtinput_scrollSize__ : ZLSize = new ZLSize();
    private __zl_txtinput_scrollOffset__ : ZLPoint = new ZLPoint();
}