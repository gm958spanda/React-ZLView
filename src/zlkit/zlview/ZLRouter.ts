import React from 'react';
import { /*BrowserRouter,*/ HashRouter, 
    Route,
    useLocation,
    useHistory,
    Switch
 } from 'react-router-dom'

import {ZLViewPageClass} from './ZLViewPage'

import * as History from 'history';
import { ZLSize } from './ZLUIDef';


 interface ZLRouterComponentProps
 {
     zlrouter : ZLRouter;
     routeMap : Map<string,ZLViewPageClass>;
 }

class ZLRouterComponent extends React.Component<ZLRouterComponentProps>
{
    componentDidMount()
    {
        let r = this.props.zlrouter;
        (r as any).__weak_reactComponent__ = new WeakRef(this);
    }
    componentWillUnmount()
    {
        let r = this.props.zlrouter;
        (r as any).__weak_reactComponent__ = undefined;
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

        return React.createElement(HashRouter,null,React.createElement(Switch,null,routelist));
    }
}
function ZLRouteRenderFunction( p:any )
{   
    let history = useHistory();
    let router : ZLRouter = p.zlrouter;
    (router as any).__history__ = history;
    let loc = useLocation<History.LocationState>();
    let cls = router.getRouteClass(loc.pathname);
    if (cls === undefined) {
        return React.createElement("div",null,"404 not found " + loc.pathname);
    }
    let page = new cls(loc, new ZLSize(router.defaultPageWidth,router.defaultPageHeight));
    (page as any).__weak_router__ = new WeakRef(router);
    return page.reactElement();
}

export class ZLRouter
{
    /**
     * 构造函数
     * @param rootPath 路由匹配的根路径，默认 "/"
     */
    constructor(rootPath? : string, defaultPageSize? : ZLSize)
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
     * @param routeClass 命中后的渲染类,将接收一个useLocation参数
     */
    public registRoute( path : string , routeClass : ZLViewPageClass)
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
        this.__path_calss__.set( path ,routeClass);
    }

    /**
     * 获取路径对应的渲染类
     * @param path 路径
     */
    public getRouteClass(path : string) : ZLViewPageClass | undefined
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
         let c = this.__weak_reactComponent__?.deref();
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
        return React.createElement(ZLRouterComponent,{zlrouter:this, routeMap:this.__path_calss__});
    }

    /**
     * React 容器
     */
     private __weak_reactComponent__ : WeakRef<ZLRouterComponent> | undefined;

    /**
     * 路由匹配的根路径
     */
    private __root_path__ : string;

    /**
     * 路由表
     */
    private __path_calss__ : Map<string,ZLViewPageClass>;
    /**
     * 默认页面尺寸
     */
    private __default_pagesize : ZLSize;

    /**
     * history
     */
    private __history__ : History.History | undefined;
}