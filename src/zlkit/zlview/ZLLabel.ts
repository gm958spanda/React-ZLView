import React from 'react';

import {ZLTextBaseView}  from './ZLTextBaseView'
import { ZLSize } from './ZLUIDef';
import {ZLUtils} from './ZLUtils'


export class ZLLabel extends ZLTextBaseView
{
    constructor() {
        super();
        this.clipToBounds = true;
    }
    /**
     * 计算合适的尺寸
     */
    sizeThatSize(size:ZLSize) : ZLSize {
        return ZLUtils.textSize(this.text,size,this.font,this.wordBreak,this.wordWrap,this.textAlign);
    }
    /**
     * 计算合适的尺寸
     */
    sizeThatWidthHeight(width:number ,height : number) : ZLSize {
        return this.sizeThatSize(new ZLSize(width,height));
    }
}