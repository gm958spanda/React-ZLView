import React from 'react';
import { ZLHtmlAttribute } from '../ZLView';

import {ZLTexInputViewBase}  from './ZLTexInputViewBase'


export enum ZLTextFieldInputType
{
    text = "text",
    password = "password",
}
export class ZLTextField extends ZLTexInputViewBase
{
    constructor()
    {
        super();
        this.__zl_txtfield_inputType__ = ZLTextFieldInputType.text;
    }

    /**
     * 输入类型
     */
    public get inputType() : ZLTextFieldInputType { return this.__zl_txtfield_inputType__;}
    public set inputType(v:ZLTextFieldInputType) { this.__zl_txtfield_inputType__ = v;}


    protected __reactRender__(children?:React.ReactNode[])
    {
        let attr = this.__htmlAttributes__();
        return React.createElement("input",attr.toReactClassAttributes());
    }

    protected __htmlAttributes__() : ZLHtmlAttribute
    {
        let attr = super.__htmlAttributes__();
        (attr.otherAttr as any).type = this.__zl_txtfield_inputType__;
        return attr;
    }
    private __zl_txtfield_inputType__ : ZLTextFieldInputType;
}