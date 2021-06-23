import { ZLView } from './ZLView';
import * as History from 'history';
import { ZLPoint, ZLRect, ZLSize } from './ZLUIDef';
import { ZLRouter } from './ZLRouter';
import {ZLObject} from './ZLObject'


export interface ZLViewPageInitParas
{
    /** 页面坐标*/
    x?: number;
    /** 页面坐标*/
    y?: number;
    /** 页面坐标*/
    width?:number;
    /** 页面坐标*/
    height?:number;

    /** 页面坐标 优先使用x-y-width-height*/
    pageSize?:ZLSize;
    /** 页面坐标 优先使用x-y-width-height*/
    pageOrigin?:ZLPoint;
}

export type ZLViewPageClass = new (paras? : ZLViewPageInitParas) => ZLViewPage
export class ZLViewPage extends ZLObject
{
    /**
     * 构造函数
     */
    constructor(paras? : ZLViewPageInitParas )
    {
        super();
        if (paras instanceof ZLSize) {
            this.__zl_defaultRect__ = new ZLRect(0,0,(paras as ZLSize).width,(paras as ZLSize).height);
        } 
        else 
        {
            let x : number | undefined = undefined;
            let y : number | undefined = undefined;
            let w : number | undefined = undefined;
            let h : number | undefined = undefined;
            let sz : ZLSize | undefined = undefined;
            let origin : ZLPoint | undefined = undefined;
            if (paras) {
                x = paras.x;
                y = paras.y;
                w = paras.width;
                h = paras.height;
                sz = paras.pageSize;
                origin = paras.pageOrigin;
            }
            if (origin !== undefined)
            {
                if (x === undefined ) {
                    x = origin.x
                }
                if (y === undefined ) {
                    y = origin.y
                }
            }
            else 
            {
                if (x === undefined){
                    x = 0;
                }
                if (x === undefined){
                    y = 0;
                }
            }

            if (sz !== undefined)
            {
                if (w === undefined ) {
                    w = sz.width
                }
                if (h === undefined ) {
                    h = sz.height
                }
            }
            else 
            {
                if (w === undefined){
                    w = ZLSize.getWindowContentWidth();
                }
                if (h === undefined){
                    h = ZLSize.getWindowContentHeight();
                }
            }
            this.__zl_defaultRect__ = new ZLRect(x,y,w,h);
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
    protected loadView( pageRect: ZLRect ): ZLView 
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
    private __zl_defaultRect__ : ZLRect;
    /**
     * 视图
     */
    private __zl_view__? : ZLView;

    /** 路由*/
    private __zl_weakRouter__ : WeakRef<ZLRouter> |undefined;
}