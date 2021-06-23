import React, { ReactElement } from 'react';
import {ZLView}  from '../ZLView'

type ZLSelectOptionViewOnSelectedIndexChanged = (v:number)=>void;
export class ZLSelectOptionView extends ZLView
{
    constructor() 
    {
        super();
        this.__zl_select_index__ = 0;
        this.addListenDOMEvent("onChange",(e)=>{
            this.selectedIndex = (e.currentTarget as HTMLSelectElement).selectedIndex;
        },this);
        this.addListenOnReactRefCallback((e)=>{
            if (this.__zl_select_options__ && this.__zl_select_options__.size > this.__zl_select_index__)
            {
                (e as HTMLSelectElement).selectedIndex = this.__zl_select_index__;
            }
            else
            {
                this.selectedIndex = (e as HTMLSelectElement).selectedIndex;
            }
        },this);
    }

    /**
     * 小于0无效。拉列表中被选选项的索引号；若允许多重选择，则仅会返回第一个被选选项的索引号
     */
    public get selectedIndex() : number 
    {
        return this.__zl_select_index__;
    }
    public set selectedIndex(v:number) 
    {
        if (v < 0) {
            return;
        }
        if (v !== this.__zl_select_index__)
        {
            this.__zl_select_index__ = v;
            this.__zl_selectoption_onchanged__?.(v);
        }
    }

    /**
     * 选项数量
     */
    public get optionsCount() : number 
    { 
        if (this.__zl_select_options__ === undefined) {
            return 0;
        }
        return this.__zl_select_options__.size;
    }

    /**
     * 添加选项
     * @param name 选项名
     * @param value 选项对应的值
     */
    public addOption(name:string, value?:any)
    {
        if (this.__zl_select_options__ === undefined) {
            this.__zl_select_options__ = new Map();
        }
        this.__zl_select_options__.set(name,value);
    }
    /**
     * 移除选项
     * @param name 选项名
     */
    public removeOption(name:string)
    {
        this.__zl_select_options__?.delete(name);
    }

    public get onSelectedIndexChanged() :ZLSelectOptionViewOnSelectedIndexChanged |undefined
    {
        return this.__zl_selectoption_onchanged__;
    }
    public set onSelectedIndexChanged(cb : ZLSelectOptionViewOnSelectedIndexChanged | undefined) 
    {
        this.__zl_selectoption_onchanged__ = cb;
    }

    protected __reactRender__(children?:React.ReactNode[])
    {
        let attr = this.__htmlAttributes__();

        let childs : ReactElement[]= [];
        if (this.__zl_select_options__ )
        {
            this.__zl_select_options__.forEach((v,k)=>{
                childs.push(React.createElement("option",{key:k},k));
            });
        }
        return React.createElement("select",attr.toReactClassAttributes(),childs);
    } 

    private __zl_selectoption_onchanged__? : ZLSelectOptionViewOnSelectedIndexChanged; 
    private __zl_select_index__ : number;
    private __zl_select_options__? : Map<string,any>;
}