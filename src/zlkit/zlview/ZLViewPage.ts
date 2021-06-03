import { ZLView } from './ZLView';
import * as History from 'history';
import { ZLSize } from './ZLUIDef';
import { ZLRouter } from './ZLRouter';
import {ZLObject} from './ZLObject'

export type ZLViewPageClass = new (location?: History.Location,pageSize?: ZLSize) => ZLViewPage
export class ZLViewPage extends ZLObject
{
    /**
     * 构造函数
     * @param location 通过路由跳转触发的初始化参数
     */
    constructor(location? : History.Location, pageSize?: ZLSize)
    {
        super();
        this.location = location;
        this.__view__ = this.loadView(pageSize);
        (this.__view__ as any).__weak_view_page__ = new WeakRef(this);
        this.viewDidLoad?.();
    }

    /**
     * 获取路由
     */
    public get router() : ZLRouter | undefined 
    {
        return this.__weak_router__?.deref();
    }

    /**
     * History.Location
     */
    public location : History.Location | undefined;

    /**
     * 创建视图，子类可重写
     */
    protected loadView( pageSize?: ZLSize ): ZLView 
    {
        if (this.__view__ === undefined) {
            let v = new ZLView();
            if (pageSize !== undefined ) 
            {
                v.width = pageSize?.width;
                v.height = pageSize?.height;
            }
            this.__view__ = v;
        }
        return this.__view__;
    }
        /**
     * 获取视图
     */
         public get view():ZLView  {return this.__view__;}
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
        return this.__view__.reactElement();
    }

    /**
     * 视图
     */
    private __view__ : ZLView;

    /** 路由*/
    private __weak_router__ : WeakRef<ZLRouter> |undefined;
}