import { ZLView } from './ZLView';
import * as History from 'history';
import { ZLPoint, ZLRect, ZLSize } from './ZLUIDef';
import { ZLRouter } from './ZLRouter';
import {ZLObject} from './ZLObject'

export type ZLViewPageClass = new (paras? : {pageSize?: ZLSize, pageOrigin?:ZLPoint}) => ZLViewPage
export class ZLViewPage extends ZLObject
{
    /**
     * 构造函数
     */
    constructor(paras? : {pageSize?: ZLSize, pageOrigin?:ZLPoint})
    {
        super();
        if (paras)
        {
            if (paras instanceof ZLSize) {
                this.__zl_defaultRect__ = new ZLRect(0,0,(paras as ZLSize).width,(paras as ZLSize).height);
            } else {
                let sz = paras.pageSize;
                let origin = paras.pageOrigin;
                if (sz === undefined) {
                    sz = ZLSize.getWindowContentSize();
                } 
                if (origin === undefined) {
                    origin = ZLPoint.Zero;
                }
                this.__zl_defaultRect__ = new ZLRect(origin.x,origin.y,sz.width,sz.height);
            }
        }
    }
    
    /**
     * 路由匹配到本页面时
     */
    public onRouterMatchMe?(location:History.Location):void;

    /**
     * 获取路由
     */
    public get router() : ZLRouter | undefined 
    {
        return this.__zl_weakRouter__?.deref();
    }

    /**
     * 创建视图，子类可重写
     */
    protected loadView( pageRect?: ZLRect ): ZLView 
    {
        let v = new ZLView();
        if (pageRect !== undefined ) 
        {
            v.width = pageRect.width;
            v.height = pageRect.height;
            v.x = pageRect.x;
            v.y = pageRect.y;
        }
        return v;
    }
    /**
     * 获取视图
     */
    public get view():ZLView 
    {
        if (this.__zl_view__ === undefined) 
        {
            let v = this.loadView(this.__zl_defaultRect__);
            this.__zl_view__ = v;

            (v as any).__zl_weakViewPage__ = new WeakRef(this);
            
            this.viewDidLoad?.();
        }
        return this.__zl_view__;
    }
    /**
     * 视图已加载，子类可重写
     */
    public viewDidLoad?():void
    /**
     * 布局子视图
     */
    public viewLayoutSubViews?():void
    
    /**
     * 生命周期 -- view已经挂载  React.componentDidMount
     */
    public viewDidMount?():void
    /**
     * 生命周期 -- view将要卸载  React.componentWillUnmount
     */
    public viewWillUnmount?():void
    /**
     * React element
     */
    public reactElement() : React.ReactElement
    {
        return this.view.reactElement();
    }

    /**
     * 默认尺寸
     */
    private __zl_defaultRect__? : ZLRect;
    /**
     * 视图
     */
    private __zl_view__? : ZLView;

    /** 路由*/
    private __zl_weakRouter__ : WeakRef<ZLRouter> |undefined;
}