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


 interface ZLRouterComponentProps
 {
     zlrouter : ZLRouter;
     routeMap : Map<string,ZLViewPageClass | ZLViewPage>;
     useHashRouter : boolean ;
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
        this.props.routeMap.forEach((v,k)=>{
            let r = React.createElement(Route,{path:k,exact:true,children:child,key:k});
            routelist[routelist.length] = r;
        });
        /// no match
        routelist[routelist.length] = React.createElement(Route,{children:child,key:"*"});

        if (this.props.useHashRouter === true) {
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
    (router as any).__history__ = history;
    let loc = useLocation<History.LocationState>();
    let cls_ins = router.findRoute(loc.pathname);
    if (cls_ins === undefined) {
        return React.createElement("div",null,"404 not found " + loc.pathname);
    }
    let page : ZLViewPage = (cls_ins as ZLViewPage);
    if (page instanceof ZLViewPage) {
        page.view.width = router.defaultPageWidth;
        page.view.height = router.defaultPageHeight;
        // page.viewLayoutSubViews?.();
    }
    else {
        page = new (cls_ins as ZLViewPageClass)(new ZLSize(router.defaultPageWidth,router.defaultPageHeight));
    }
    (page as any).__zl_weakRouter__ = new WeakRef(router);
    page.onRouterMatchMe?.(loc);
    return page.reactElement();
}

export class ZLRouter
{
    /**
     * 构造函数
     * @param rootPath 路由匹配的根路径，默认 "/"
     * @param defaultPageSize 打开新页面时的默认大小
     * @param useHashRouter 是否使用HashRouter。默认不使用
     */
    constructor(rootPath? : string, defaultPageSize? : ZLSize, useHashRouter? : boolean)
    {
        if (rootPath === undefined || rootPath.length === 0) {
            this.__root_path__ = "/";
        } else {
            if (rootPath.charAt(0) !== "/") {
                rootPath = "/" + rootPath;
            }
            if (rootPath.charAt(rootPath.length -1) !== "/") {
                rootPath = rootPath.substr(0,rootPath.length -1);
            }
            this.__root_path__ = rootPath;
        }
        this.__path_calss__ = new Map();
        this.__default_pagesize = defaultPageSize ? defaultPageSize : ZLSize.getWindowContentSize();
        this.__useHashRouter__ = useHashRouter ? useHashRouter : false;
    }
    /**
     * 路由匹配的根路径
     */
    public get rootPath() : string {return this.__root_path__;}

    public get defaultPageWidth() : number { return this.__default_pagesize.width;}
    public get defaultPageHeight() : number { return this.__default_pagesize.height;}
    /**
     * 注册路由
     * @param path 路径
     * @param class_instance 渲染类或实例 ,路由匹配后将调用ZLViewPage.onRouterMatchMe
     */
    public registRoute( path : string , class_instance : ZLViewPageClass | ZLViewPage)
    {
        if (path === undefined || path.length === 0 ) {
            return;
        }
        if (path.charAt(0) !== "/") {
            path = "/" + path;
        }
        if (this.__root_path__ !== "/") {
            path = this.__root_path__ + path;
        }
        this.__path_calss__.set( path ,class_instance);
    }

    /**
     * 获取路径对应的渲染类或实例
     * @param path 路径
     */
    public findRoute(path : string) : ZLViewPageClass | ZLViewPage | undefined
    {
        if (path === undefined || path.length === 0 ) {
            return undefined;
        }
        if (path.charAt(0) !== "/") {
            path = "/" + path;
        }
        if (this.__root_path__ !== "/") {
            path = this.__root_path__ + path;
        }
        return this.__path_calss__.get(path);
    }
    
    /**
     * 推入页面
     */
    public push(path : string) {
        this.__history__?.push(path)
    }
    /**
     * 替换当前页面
     */
    public replace(path : string) {
        this.__history__?.replace(path);
    }
    /**
     * 返回上一页面
     */
    public goBack() {
        this.__history__?.goBack();
    }
    /**
     * 前进
     */
    public goForward() {
        this.__history__?.goForward();
    }


    /**
     * 更新路由渲染 React setState
     * 在路由挂载后，通过registRoute注册新的路由时，需要调用本方法来刷新路由
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
     * 返回React元素
     */
    reactElement() : React.ReactElement
    {
        return React.createElement(ZLRouterComponent,{zlrouter:this, routeMap:this.__path_calss__,useHashRouter:this.__useHashRouter__});
    }

    /**
     * React 容器
     */
     private __zl_weakReactComponent__ : WeakRef<ZLRouterComponent> | undefined;

    /**
     * 路由匹配的根路径
     */
    private __root_path__ : string;

    /**
     * 路由表
     */
    private __path_calss__ : Map<string,ZLViewPageClass | ZLViewPage>;
    /**
     * 默认页面尺寸
     */
    private __default_pagesize : ZLSize;

    private __useHashRouter__ : boolean;

    /**
     * history
     */
    private __history__ : History.History | undefined;
}