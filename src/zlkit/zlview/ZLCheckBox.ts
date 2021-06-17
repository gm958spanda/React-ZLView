import React from 'react';
import {ZLHtmlAttribute, ZLView}  from './ZLView'

export class ZLCheckBox extends ZLView
{
    constructor() 
    {
        super();
        this.__zl_slider_checked__ = false;
        this.addListenDOMEvent("onChange",(e)=>{
            this.checked = (e.currentTarget as HTMLInputElement).checked;
        },this);
    }
    /**
     * 是否选中
     */
    public get checked():boolean { return this.__zl_slider_checked__;}
    public set checked(v:boolean)
    {
        if (v !== this.__zl_slider_checked__) {
            this.__zl_slider_checked__ = v;
            this.onCheckedChanged?.(v);
        }
    }
    /**
     * 值变化回调
     */
    public onCheckedChanged?:(value:boolean)=>void;

    protected __reactRender__(children?:React.ReactNode[])
    {
        let attr = this.__htmlAttributes__();
        return React.createElement("input",attr.toReactClassAttributes());
    }
    protected __htmlAttributes__() : ZLHtmlAttribute
    {
        let attr = super.__htmlAttributes__();
        let other:any = attr.otherAttr;
        other.type = "checkbox";
        other.defaultChecked = this.__zl_slider_checked__;
        return attr;
    }

    private __zl_slider_checked__ : boolean;
}