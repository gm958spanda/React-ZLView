import React, { ReactElement } from 'react';
import {ZLView}  from '../ZLView'

type ZLSelectOptionViewOnSelectedIndexChanged = (index:number, optionName:string , optionValue?:any)=>void;
export class ZLSelectOptionView extends ZLView
{
    constructor() 
    {
        super();
        this.__zl_select_options__ = [];
        this.__zl_select_index__ = 0;
        this.addListenDOMEvent("onChange",(e)=>{
            this.selectedIndex = (e.currentTarget as HTMLSelectElement).selectedIndex;
        },this);
        this.addListenOnReactRefCallback((e)=>{
            if (e !== null){
                if (this.__zl_select_options__ && 
                    this.__zl_select_options__.length > this.__zl_select_index__)
                {
                    (e as HTMLSelectElement).selectedIndex = this.__zl_select_index__;
                }
                else
                {
                    this.selectedIndex = (e as HTMLSelectElement).selectedIndex;
                }
            }
        },this);
    }
    /**
     * 遍历
     */
    public forEach(callbackfn: (name:string, value?:any, index?: number) => void, thisArg?: any)
    {
        this.__zl_select_options__.forEach((v,index)=>{
            callbackfn(v.name,v.value,index);
        },thisArg);
    }
    /**
     * 小于0无效。拉列表中被选选项的索引号
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
            if (this.__zl_select_options__ && this.__zl_select_options__.length > v)
            {
                let item = this.__zl_select_options__[v];
                this.__zl_selectoption_onchanged__?.(v,item.name,item.value);
            }
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
        return this.__zl_select_options__.length;
    }

    /**
     * 添加选项
     * @param name 选项名
     * @param value 选项对应的值
     */
    public addOption(name:string, value?:any)
    {
        this.__zl_select_options__.push({name:name,value:value});
    }
    /**
     * 移除选项
     */
    public removeOptionAtIndex(index:number)
    {
        if (index < this.__zl_select_options__.length && index >=0 ) {
            this.__zl_select_options__.splice(index,1);
        }
    }
    /**
     * 移除选项
     */
    public removeOption(name:string)
    {
        let options : ZLSelectOptionItem[] = [];
        this.__zl_select_options__.forEach(v=>{
            if (v.name !== name) {
                options.push(v);
            }
        });
        this.__zl_select_options__ = options;
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
            this.__zl_select_options__.forEach((v)=>{
                childs.push(React.createElement("option",{key:v.name},v.name));
            });
        }
        return React.createElement("select",attr.toReactClassAttributes(),childs);
    } 

    private __zl_selectoption_onchanged__? : ZLSelectOptionViewOnSelectedIndexChanged; 
    private __zl_select_index__ : number;
    private __zl_select_options__ : ZLSelectOptionItem[];
}

interface ZLSelectOptionItem
{
    name : string;
    value? : any;
}