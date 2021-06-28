import {ZLTextBaseView}  from './ZLTextBaseView'
import { ZLSize } from '../ZLUIDef';
import {ZLUtils} from '../ZLUtils'
import { ZLHtmlAttribute } from '../ZLView';


export class ZLLabel extends ZLTextBaseView
{
    constructor() {
        super();
        this.clipToBounds = true;
    }
    /**
     * 计算合适的尺寸
     */
    public sizeThatSize(size:ZLSize) : ZLSize {
        return ZLUtils.textSize(this.text,size,this.font,this.wordBreak,this.wordWrap,this.textAlign);
    }
    /**
     * 计算合适的尺寸
     */
    public sizeThatWidthHeight(width:number ,height : number) : ZLSize {
        return this.sizeThatSize(new ZLSize(width,height));
    }

    protected __htmlAttributes__() : ZLHtmlAttribute
    {
        let attr = super.__htmlAttributes__()
        let style = attr.style;
        style.whiteSpace = "pre";
        if (this.font !== undefined) {
            this.font.toCSSStyle(style);
        }
        return attr;
    }
}