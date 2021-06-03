import React from 'react';

import {ZLHtmlAttribute, ZLView}  from './ZLView'


export class ZLImageView extends ZLView
{
    /**
     * 显示图像的 URL
     */
    public src : string | undefined;

    /**
     * 图像的替代文本
     */
    public alt : string | undefined;

    protected __reactRender__(children?:React.ReactNode[])
    {
        let attr = this.__htmlAttributes__();
        return React.createElement("img",attr.toReactClassAttributes(),children);
    }

    protected __htmlAttributes__() : ZLHtmlAttribute
    {
        let attr = super.__htmlAttributes__()
        if (this.src !== undefined){
            attr.src = this.src;
        }
        return attr;
    }
}