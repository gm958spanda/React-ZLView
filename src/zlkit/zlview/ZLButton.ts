import React from 'react';
import {ZLView}  from './ZLView'

type ZLButtonOnClickCallback = (sender:ZLButton)=>void;

export class ZLButton extends ZLView
{
    /**
     * 按钮标题
     */
    public title? : string;

    /**
     * 是否禁用按钮
     */
    public disabled? : boolean;

    /**
     * 点击回调
     */
    public get onClick () {return this.__zl_btn_onclick__;}
    public set onClick(cb : ZLButtonOnClickCallback | undefined) 
    {
        this.__zl_btn_onclick__ = cb;
        if (this.__zl_btn_onclick__) {
            this.addListenDOMEvent("onClick",this.__zl_btn_onclick_handler__,this);
        } else {
            this.removeListenDOMEvent("onClick",this.__zl_btn_onclick_handler__);
        }
    }
    private __zl_btn_onclick__? : ZLButtonOnClickCallback; 
    private __zl_btn_onclick_handler__()
    {
        this.__zl_btn_onclick__?.(this);
    } 

    protected __reactRender__(children?:React.ReactNode[])
    {
        let attr = this.__htmlAttributes__();
        return React.createElement("button",attr.toReactClassAttributes(), children,this.title);
    }  
}