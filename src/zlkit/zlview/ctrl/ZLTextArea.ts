import React from 'react';
import {ZLTexInputViewBase}  from './ZLTexInputViewBase'


export class ZLTextArea extends ZLTexInputViewBase
{
    protected __reactRender__(children?:React.ReactNode[])
    {
        let attr = this.__htmlAttributes__();
        return React.createElement("textarea",attr.toReactClassAttributes());
    }
}