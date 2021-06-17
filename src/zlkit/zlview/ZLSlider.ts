import React from 'react';
import {ZLHtmlAttribute, ZLView}  from './ZLView'

export class ZLSlider extends ZLView
{
    constructor() 
    {
        super();
        this.maxValue = 100;
        this.minValue = 0;
        this.step = 1;
        this.__zl_slider_value__ = 0;

        this.addListenDOMEvent("onChange",(e)=>{
            this.value = (e.currentTarget as HTMLInputElement).valueAsNumber;
        },this);
    }

    /**
     * 允许的最大值。默认100
     */
    public maxValue:number;
    /**
     * 允许的最小值。默认0
     */
    public minValue:number;
    /**
     * 合法数字间隔（如果 step="3"，则合法数字是 0,3,6，以此类推）,默认1
     */
    public step:number;

    /**
     * 当前值 。默认0
     */
    public get value():number { return this.__zl_slider_value__;}
    public set value(v:number)
    {
        if (v !== this.__zl_slider_value__) {
            this.__zl_slider_value__ = v;
            this.onValueChanged?.(v);
        }
    }

    /**
     * 值变化回调
     */
    public onValueChanged?:(value:number)=>void;

    protected __reactRender__(children?:React.ReactNode[])
    {
        let attr = this.__htmlAttributes__();
        return React.createElement("input",attr.toReactClassAttributes());
    }
    protected __htmlAttributes__() : ZLHtmlAttribute
    {
        let attr = super.__htmlAttributes__();
        let other:any = attr.otherAttr;
        other.type = "range";
        other.max = this.maxValue.toString();
        other.min = this.minValue.toString();
        other.step = this.step.toString();
        other.defaultValue = this.value.toString();

        return attr;
    }

    private __zl_slider_value__ : number;
}