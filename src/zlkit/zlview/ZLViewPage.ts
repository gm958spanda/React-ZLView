import { ZLView } from './ZLView';
import * as History from 'history';
import { ZLSize } from './ZLUIDef';
import { ZLRouter } from './ZLRouter';
import {ZLObject} from './ZLObject'

export type ZLViewPageClass = new (paras? : {pageSize?: ZLSize}) => ZLViewPage
export class ZLViewPage extends ZLObject
{
    /**
     * 构造函数
     */
    constructor(paras? : {pageSize?: ZLSize})
    {
        super();
        if (paras)
        {
            if (paras instanceof ZLSize) {
                this.__zl_defaultSZ__ = new ZLSize((paras as ZLSize).width,(paras as ZLSize).height);
            } else {
                if (paras.pageSize) {
                    this.__zl_defaultSZ__ = new ZLSize(paras.pageSize.width,paras.pageSize.height);
                }
                
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
    protected loadView( pageSize?: ZLSize ): ZLView 
    {
        let v = new ZLView();
        if (pageSize !== undefined ) 
        {
            v.width = pageSize?.width;
            v.height = pageSize?.height;
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
            let v = this.loadView(this.__zl_defaultSZ__);
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
    private __zl_defaultSZ__? : ZLSize;
    /**
     * 视图
     */
    private __zl_view__? : ZLView;

    /** 路由*/
    private __zl_weakRouter__ : WeakRef<ZLRouter> |undefined;
}