import React from 'react';
import { BrowserRouter,HashRouter, 
    Route,
    useLocation,
    useHistory,
    Switch
 } from 'react-router-dom'

import {ZLViewPage, ZLViewPageClass} from './ZLViewPage'

import * as History from 'history';
import { ZLSize } from './ZLUIDef';
import { ZLView } from './ZLView';


interface ZLRouterComponentProps
{
    zlrouter : ZLRouter;
}

class ZLRouterComponent extends React.Component<ZLRouterComponentProps>
{
    componentDidMount()
    {
        let r = this.props.zlrouter;
        (r as any).__zl_weakReactComponent__ = new WeakRef(this);
    }
    componentWillUnmount()
    {
        let r = this.props.zlrouter;
        (r as any).__zl_weakReactComponent__ = undefined;
    }
    render()
    {
        let child = React.createElement(ZLRouteRenderFunction,{zlrouter:this.props.zlrouter});
        let routelist : React.ReactElement[] = [];
        this.props.zlrouter.forEachRoute((v,k)=>{
            let r = React.createElement(Route,{path:k,exact:true,children:child,key:k});
            routelist[routelist.length] = r;
        });
        /// no match
        routelist[routelist.length] = React.createElement(Route,{children:child,key:"*"});

        if (this.props.zlrouter.useHashRouter === true) {
            return React.createElement(HashRouter,null,React.createElement(Switch,null,routelist));
        } else {
            return React.createElement(BrowserRouter,null,React.createElement(Switch,null,routelist));
        }
    }
}
function ZLRouteRenderFunction( p:any )
{   
    let history = useHistory();
    let router : ZLRouter = p.zlrouter;
    (router as any).__zl_router_history__ = history;
    let loc = useLocation<History.LocationState>();
    let cls_ins = router.findRoute(loc.pathname);
    if (cls_ins === undefined) {
        return React.createElement("div",null,"404 not found " + loc.pathname);
    }
    let page : ZLViewPage = (cls_ins as ZLViewPage);
    if (page instanceof ZLViewPage) 
    {
        page.view.width = router.defaultPageWidth;
        page.view.height = router.defaultPageHeight;
    }
    else 
    {
        page = new (cls_ins as ZLViewPageClass)({pageSize:new ZLSize(router.defaultPageWidth,router.defaultPageHeight)});
    }
    (page as any).__zl_weakRouter__ = new WeakRef(router);
    page.onRouterMatchMe?.(loc);
    return page.reactElement();
}

export class ZLRouter extends ZLViewPage
{
    /**
     * 构造函数
     */
    constructor(paras?:{
        /** 路由匹配的根路径，默认 "/" */
        rootPath? : string;
        /** 打开新页面时的默认大小 */
        pageSize? : ZLSize,
        /** 是否使用HashRouter。默认不使用 */
        useHashRouter? : boolean})
    {
        let rootPath = "/";
        let pageSize = ZLSize.getWindowContentSize();
        let useHashRouter = false;
        if (arguments.length > 0 && typeof arguments[0] === "string") 
        {
            rootPath = arguments[0];
            if (arguments.length > 1) {
                pageSize = arguments[1];
            }
            if (arguments.length > 2) {
                useHashRouter = arguments[2];
            }
        }
        else if (paras)
        {
            if (paras.rootPath) {
                rootPath = paras.rootPath;
            }
            if (paras.pageSize) {
                pageSize = paras.pageSize;
            }
            if (paras.useHashRouter) {
                useHashRouter = paras.useHashRouter;
            }
        }

        super({pageSize:pageSize});

        if (rootPath === undefined || rootPath.length === 0) {
            this.__zl_router_rootPath__ = "/";
        } 
        else 
        {
            if (rootPath.charAt(0) !== "/") {
                rootPath = "/" + rootPath;
            }
            if (rootPath.charAt(rootPath.length -1) !== "/") {
                rootPath = rootPath.substr(0,rootPath.length -1);
            }
            this.__zl_router_rootPath__ = rootPath;
        }

        this.__zl_router_defaultPagesize__ = pageSize;
        this.__zl_router_useHashRouter__ = useHashRouter;
        this.__zl_router_pathPages__ = new Map();

        let v = new ZLRouterWrapperView(this);
        v.width = this.__zl_router_defaultPagesize__.width;
        v.height = this.__zl_router_defaultPagesize__.height;
        this.__zl_router_wrapperView__ = v;
    }
    /**
     * 路由匹配的根路径
     */
    public get rootPath() : string {return this.__zl_router_rootPath__;}
    /**
     * 是否使用hash路由
     */
    public get useHashRouter() : boolean {return this.__zl_router_useHashRouter__;}

    /**
     * 跳转到页面时的初始化宽度
     */
    public get defaultPageWidth() : number { return this.__zl_router_defaultPagesize__.width;}
    /**
     * 跳转到页面时的初始化高度
     */
    public get defaultPageHeight() : number { return this.__zl_router_defaultPagesize__.height;}
    /**
     * 注册路由
     * @param path 路径
     * @param class_instance 渲染类或实例 ,路由匹配后将调用ZLViewPage.onRouterMatchMe
     */
    public registRoute( path : string , class_instance : ZLViewPageClass | ZLViewPage)
    {
        let s = this.__zl_build_route_path__(path);
        if (s === undefined ) {
            return;
        }
        this.__zl_router_pathPages__.set( s ,class_instance);
    }
    /**
     * 解除路由注册
     * @param path 路径
     */
    public unRegistRoute(path : string)
    {
        let s = this.__zl_build_route_path__(path);
        if (s === undefined ) {
            return;
        }
        this.__zl_router_pathPages__.delete(s);
    }
    /**
     * 获取路径对应的渲染类或实例
     * @param path 路径
     */
    public findRoute(path : string) : ZLViewPageClass | ZLViewPage | undefined
    {
        let s = this.__zl_build_route_path__(path);
        if (s === undefined ) {
            return;
        }
        return this.__zl_router_pathPages__.get(s);
    }
    /**
     * 遍历
     */
    public forEachRoute(callbackfn:(value:ZLViewPage|ZLViewPageClass, key:string)=>void, thisArg?:any)
    {
        this.__zl_router_pathPages__.forEach(callbackfn,thisArg);
    }
    /**
     * 更新路由渲染 React setState
     * 在路由挂载后，可调用本方法来刷新路由
     */
    public reloadRoute(callback?:() => void) 
    { 
        let c = this.__zl_weakReactComponent__?.deref();
        if (c) {
            c.setState({},callback);
        } else if (callback){
            callback();
        }
    }
    
    /**
     * 推入页面
     */
    public push(path : string)
    {
        let s = this.__zl_build_route_path__(path);
        if (s === undefined ) {
            return;
        }
        this.__zl_router_history__?.push(s)
    }
    /**
     * 替换当前页面
     */
    public replace(path : string) 
    {
        let s = this.__zl_build_route_path__(path);
        if (s === undefined ) {
            return;
        }
        this.__zl_router_history__?.replace(s);
    }
    /**
     * 返回上一页面
     */
    public goBack() {
        this.__zl_router_history__?.goBack();
    }
    /**
     * 前进
     */
    public goForward() {
        this.__zl_router_history__?.goForward();
    }

    /**
     * 注册Home ,path = ZLRouter.rootPath
     * @param class_instance 
     */
    public registHome(class_instance : ZLViewPageClass | ZLViewPage) {
        this.registRoute(this.__zl_router_rootPath__,class_instance);
    }

    /**
     * 注册页面，用page的类型名生成路由的path 
     * @param page 页面 
     */
    public registViewPage(page : ZLViewPageClass)
    {
        if (page === undefined) {
            return;
        }
        this.registRoute(page.name,page);
    }
    /**
     * 解除路由注册
     * @param page 页面
     */
    public unRegistViewPage(page : ZLViewPageClass)
    {
        if (page === undefined) {
            return;
        }
        this.unRegistRoute(page.name);
    }

    /**
     * 推入页面
     * @param page 页面 
     * @param registPageFirst 页面没有注册路由时，是否先进行路由注册。注册动作参考registViewPage
     */
    public pushViewPage(page :ZLViewPageClass , registPageFirst?:boolean)
    {
        let path = this.__zl_build_route_path__(page.name);
        if (path === undefined ) {
            return;
        }
        let history = this.__zl_router_history__;

        if (registPageFirst === true) 
        {
            this.__zl_registRoute_ifNotExist__(path,page, ()=>{
                history?.push(path!);
            });
            return;
        }
        history?.push(path);
    }
    /**
     * 替换当前页面（page页面需要先注册路由）
     * @param page 页面 
     * @param registPageFirst 页面没有注册路由时，是否先进行路由注册。注册动作参考registViewPage
     */
    public replaceViewPage(page : ZLViewPageClass,registPageFirst?:boolean) 
    {
        let path = this.__zl_build_route_path__(page.name);
        if (path === undefined ) {
            return;
        }
        let history = this.__zl_router_history__;
        if (registPageFirst === true) 
        {
            this.__zl_registRoute_ifNotExist__(path,page, ()=>{
                history?.replace(path!);
            });
            return;
        }
        history?.replace(path);
    }


    protected loadView(pageSize?: ZLSize) : ZLView
    {
        return this.__zl_router_wrapperView__;
    }
    
    // /**
    //  * 返回React元素
    //  */
    // public reactElement() : React.ReactElement
    // {
    //     return React.createElement(ZLRouterComponent,{zlrouter:this});
    // }

    private __zl_build_route_path__(path:string) : string | undefined
    {
        if (path === undefined || path.length === 0 ) {
            return undefined;
        }
        if (path.charAt(0) !== "/") {
            path = "/" + path;
        }
        if (this.__zl_router_rootPath__ !== "/") {
            path = this.__zl_router_rootPath__ + path;
        }
        return path;
    }
    private __zl_registRoute_ifNotExist__(path : string,page:ZLViewPageClass, cb:()=>void)
    {
        let r = this.findRoute(path);
        if (r===undefined) 
        {
            this.registRoute(path,page);
            // this.reloadRoute(()=>{
                cb();
            // });
            return;
        }
        cb();
    }
    
    /**
     * React 容器
     */
    private __zl_weakReactComponent__ : WeakRef<ZLRouterComponent> | undefined;

    /**
     * 路由匹配的根路径
     */
    private __zl_router_rootPath__ : string;

    /**
     * 路由表
     */
    private __zl_router_pathPages__ : Map<string,ZLViewPageClass | ZLViewPage>;
    /**
     * 默认页面尺寸
     */
    private __zl_router_defaultPagesize__ : ZLSize;

    private __zl_router_useHashRouter__ : boolean;

    /**
     * history
     */
    private __zl_router_history__ : History.History | undefined;

    /**
     * wrapper view
     */
    private __zl_router_wrapperView__ : ZLRouterWrapperView;
}


class ZLRouterWrapperView extends ZLView
{
    constructor(router:ZLRouter)
    {
        super();
        this.__zl_wrapper_weakRouter__ = new WeakRef(router);
    }
    protected __reactRender__()
    {
        let r = this.__zl_wrapper_weakRouter__.deref()!
        return React.createElement(ZLRouterComponent,{zlrouter:r});
    }
    private __zl_wrapper_weakRouter__ : WeakRef<ZLRouter>;
}