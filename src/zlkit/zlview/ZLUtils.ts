import {ZLSize,ZLFont, ZLWordBreakMode, ZLWorkWrapMode, ZLTextAlignMode, ZLCurrentSizeUnit, ZLSizeUnit, ZLCurrentSizeUnitOneRemToPx} from './ZLUIDef'

export class ZLUtils
{
    static textSize( text:string|undefined,
        boundSize: ZLSize | undefined,
        font:ZLFont,
        wordBreak : ZLWordBreakMode |undefined,
        wordWrap : ZLWorkWrapMode | undefined,
        textAlign : ZLTextAlignMode | undefined
        ) : ZLSize
    {
        if (text === undefined) {
            return ZLSize.Zero;
        }
        
        let elem = this.__html_div_elem__!;
        if (elem === undefined) {
            elem = document.createElement("div");
            elem.id = "123";
            elem.style.visibility = "hidden";
            elem.style.display = "inline-block";
            elem.style.overflow = "hidden";

            this.__html_div_elem__ = elem;
        }

        if(boundSize !== undefined) {
            elem.style.maxWidth = boundSize.width.toString() + ZLCurrentSizeUnit;
            elem.style.maxHeight = boundSize.height.toString() + ZLCurrentSizeUnit;
        } else {
            (elem.style as any).maxWidth = undefined;
            (elem.style as any).maxHeight = undefined;
        }

        if (wordBreak !== undefined) {
            elem.style.wordBreak = wordBreak;
        } else {
            (elem.style as any).wordBreak = undefined;
        }
        
        if (wordWrap !== undefined) {
            elem.style.wordWrap = wordWrap;
        } else {
            (elem.style as any).wordWrap = undefined;
        }

        if (textAlign !== undefined) {
            elem.style.textAlign = textAlign;
        } else {
            (elem.style as any).textAlign = undefined;
        }
        
        let width = elem.offsetWidth;
        let height = elem.offsetHeight;
        font.toCSSStyle(elem.style);
        document.body.appendChild(elem);
        if( elem.textContent !== undefined) {
            elem.textContent = text;
        }else{
            elem.innerText = text;
        }
        width = parseFloat(window.getComputedStyle(elem).width) - width;
        height = parseFloat(window.getComputedStyle(elem).height) - height;
        document.body.removeChild(elem);
        if (ZLCurrentSizeUnit === ZLSizeUnit.px) {
            return new ZLSize(width,height);
        } else {
            return new ZLSize(width / ZLCurrentSizeUnitOneRemToPx , height/ZLCurrentSizeUnitOneRemToPx);
        }
        
    }

    /**
     * static dom node for measure 
     */
    protected static __html_div_elem__ : HTMLDivElement | undefined;
}