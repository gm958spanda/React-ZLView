
export class ZLDevice
{
    /** 获取DPI */
    public static get DPIX () { return this.__zl_getDPI__()[0];}
    /** 获取DPI */
    public static get DPIY () { return this.__zl_getDPI__()[1];}
    private static __zl_dpi__? : number[];
    private static __zl_getDPI__(): number[]
    {
        if (this.__zl_dpi__ === undefined)
        {
            // http://www.leechg.com/lee/article.php?id=69
            let arrDPI : number[] = [];
            let deviceXDPI:any = (window.screen as any).deviceXDPI;
            if ( deviceXDPI !== undefined )
            {
                arrDPI[0] = deviceXDPI;
                arrDPI[1] = (window.screen as any).deviceYDPI;
            }
            else
            {
                let tmpNode = document.createElement("DIV");
                tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
                document.body.appendChild( tmpNode );
                arrDPI[0] = tmpNode.offsetWidth;
                arrDPI[1] = tmpNode.offsetHeight;
                document.body.removeChild( tmpNode );
            }
            this.__zl_dpi__ = arrDPI;
        }
        return this.__zl_dpi__;
    }
}