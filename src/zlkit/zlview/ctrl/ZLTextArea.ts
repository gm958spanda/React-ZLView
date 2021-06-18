import React from 'react';

import {ZLHtmlAttribute}  from '../ZLView'
import {ZLSize,ZLFont, ZLEdgeInset, ZLCurrentSizeUnit} from '../ZLUIDef'
import {ZLEventCallbackList} from '../../sugar/eventcb'
import {ZLTextBaseView}  from './ZLTextBaseView'


type ZLButtonOnInputCallback = (sender:ZLTextArea)=>void;

export class ZLTextArea extends ZLTextBaseView
{
    constructor() {
        super();
        this.borderWidth = 1;
        this.padding = new ZLEdgeInset(2,2,2,2);
        this.font = ZLFont.getDefaultFont();
        this.addListenOnReactRefCallback((e:Element) =>{
            this.__zl_txa_node__ = e as HTMLTextAreaElement;
        });
    }

    /**
     * 滚动尺寸
     */
    public get scrollSize() : ZLSize |undefined {return this.__zl_txa_scrollSize__;}

    /**
     * text 显示的文字
     */
    public get text():string{ return this.__zl_txa_text__ ? this.__zl_txa_text__ : "";}
    public set text(value:string) 
    {
        this.__zl_txa_text__ = value;
        if(this.__zl_txa_node__) {
            this.__zl_txa_node__.value = value;
        } else {
            this.refresh();
        }
    }
    /**
     * 简短提示
     */
    public placeholder? : string;
    /**
     * 文本区域的最大字符数
     */
    public maxlength? : number;
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
     * 添加onInput回调
     * @param cb 回调函数
     * @param cbThis 回调函数的this
     */
     public addOnInputEventCallback(cb:ZLButtonOnInputCallback,cbThis?:any)
     {
         if (this.__zl_txa_event_list__ === undefined) {
             this.__zl_txa_event_list__ = new ZLEventCallbackList();
         }
         this.__zl_txa_event_list__.addEvntCallback("oninput",cb,cbThis);
     }
 
     /**
      * 移除 onInput回调
      * @param cb 回调函数
      */
     public removeOnClickEventCallback(cb:ZLButtonOnInputCallback)
     {
         this.__zl_txa_event_list__?.removeEvntCallback("oninput",cb);
     }

    protected __reactRender__(children?:React.ReactNode[])
    {
        let attr = this.__htmlAttributes__();
        return React.createElement("textarea",attr.toReactClassAttributes());
    }

    protected __htmlAttributes__() : ZLHtmlAttribute
    {
        let attr = super.__htmlAttributes__();
        this.addListenDOMEvent("onInput", (e:React.SyntheticEvent)=>{
            let node = (e.target as HTMLTextAreaElement);
            this.__zl_txa_node__ = node
            this.__zl_txa_text__ = node.value;
            if (this.__zl_txa_scrollSize__ === undefined) {
                this.__zl_txa_scrollSize__ = new ZLSize();
            }
            this.__zl_txa_scrollSize__.width = node.scrollWidth;
            this.__zl_txa_scrollSize__.height = node.scrollHeight;
            
            this.__zl_txa_event_list__?.onEvnt("oninput",this);
        });
        if (this.__zl_txa_text__ !== undefined) {
            (attr.otherAttr as any).defaultValue = this.__zl_txa_text__;
        }
        if(this.readonly === true){
            (attr.otherAttr as any).readOnly = "readonly";
        }
        if (this.disabled === true) {
            (attr.otherAttr as any).disabled = "disabled";
        }
        if (this.placeholder !== undefined) {
            (attr.otherAttr as any).placeholder = this.placeholder;
        }
        if (this.maxlength !== undefined) {
            (attr.otherAttr as any).maxlength = this.maxlength;
        }
        if (this.autofocus === true) {
            (attr.otherAttr as any).autofocus = "";
        }
        let style = attr.style;
        style.resize = "none";
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
    
    private __zl_txa_node__? : HTMLTextAreaElement;
    private __zl_txa_text__? :string;
    private __zl_txa_scrollSize__? : ZLSize;
    private __zl_txa_event_list__? : ZLEventCallbackList;
}