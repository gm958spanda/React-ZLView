import React from 'react';
import { ZLObject } from '../ZLObject';
import {ZLHtmlAttribute, ZLView}  from '../ZLView'

export class ZLRadioButton extends ZLView
{
    /**
     * 构造函数
     * @param radioGroup 用来生成groupName ,对应 <input type="radion" name="组名字">
     */
    constructor(radioGroup:ZLRadioGroup) 
    {
        super();
        this.__zl_radio_group__ = radioGroup;
        this.addListenDOMEvent("onChange",(e)=>{
            this.checked = (e.currentTarget as HTMLInputElement).checked;
        },this);
    }
    /**
     * 是否选中
     */
    public get checked():boolean {
        let b = this.__zl_radio_group__.getChecked(this.uniqueId);
        return b ? b : false;
    }
    public set checked(v:boolean)
    {
        if (v !== this.checked ) {
            this.__zl_radio_group__.setChecked(this.uniqueId, v);
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
        other.type = "radio";
        other.name = this.__zl_radio_group__.uniqueString
        if (this.checked) {
            other.defaultChecked = true;
        }
        return attr;
    }

    private __zl_radio_group__ : ZLRadioGroup;
}


export class ZLRadioGroup extends ZLObject
{
    constructor()
    {
        super();
        this.__zl_checked_map__ = new Map();
    }

    public setChecked(id:number, checked:boolean)
    {
        this.__zl_checked_map__.set(id,checked);
        if (checked) {
            this.__zl_checked_map__.forEach((v,k)=>{
                if (k !== id && v === true) {
                    this.__zl_checked_map__.set(k,false);
                }
            },this);
        }
    }
    public getChecked(id:number) 
    {
        return this.__zl_checked_map__.get(id);
    }
    /**
     * {radioButtonId, checked}
     */
    private __zl_checked_map__ : Map<number,boolean>;
}