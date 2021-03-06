import React from 'react';
import { BrowserRouter,HashRouter, 
    Route,
    useLocation,
    useHistory,
    Switch
 } from 'react-router-dom'

import {ZLViewPage, ZLViewPageClass, ZLViewPageInitParas} from './ZLViewPage'

import * as History from 'history';
import { ZLPoint, ZLRect, ZLSize } from './ZLUIDef';
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
        page.view.setFrameSameAs(router.view);
    }
    else 
    {
        let pageSize = new ZLSize(router.view.width,router.view.height);
        let pageOrigin = new ZLPoint(router.view.x,router.view.y);
        page = new (cls_ins as ZLViewPageClass)({pageSize:pageSize ,pageOrigin:pageOrigin});
    }
    (page as any).__zl_weakRouter__ = new WeakRef(router);
    page.onRouterMatchMe?.(loc);
    return page.reactElement();
}

interface ZLRouterInitParas extends ZLViewPageInitParas
{
    /** ????????????????????????????????? "/" */
    rootPath? : string;
    /** ????????????HashRouter?????????????????? */
    useHashRouter? : boolean;
}

export class ZLRouter extends ZLViewPage
{
    /**
     * ????????????
     */
    constructor(paras?:ZLRouterInitParas)
    {
        super(paras);

        let rootPath = "/";
        let useHashRouter = false;
        if (paras)
        {
            if (paras.rootPath) {
                rootPath = paras.rootPath;
            }
            if (paras.useHashRouter) {
                useHashRouter = paras.useHashRouter;
            }
        }

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

        this.__zl_router_useHashRouter__ = useHashRouter;
        this.__zl_router_pathPages__ = new Map();

        let v = new ZLRouterWrapperView(this);
        this.__zl_router_wrapperView__ = v;
    }
    /**
     * ????????????????????????
     */
    public get rootPath() : string {return this.__zl_router_rootPath__;}
    /**
     * ????????????hash??????
     */
    public get useHashRouter() : boolean {return this.__zl_router_useHashRouter__;}
    /**
     * ????????????
     * @param path ??????
     * @param class_instance ?????????????????? ,????????????????????????ZLViewPage.onRouterMatchMe
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
     * ??????????????????
     * @param path ??????
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
     * ???????????????????????????????????????
     * @param path ??????
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
     * ??????
     */
    public forEachRoute(callbackfn:(value:ZLViewPage|ZLViewPageClass, key:string)=>void, thisArg?:any)
    {
        this.__zl_router_pathPages__.forEach(callbackfn,thisArg);
    }
    /**
     * ?????????????????? React setState
     * ??????????????????????????????????????????????????????
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
     * ????????????
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
     * ??????????????????
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
     * ??????????????????
     */
    public goBack() {
        this.__zl_router_history__?.goBack();
    }
    /**
     * ??????
     */
    public goForward() {
        this.__zl_router_history__?.goForward();
    }

    /**
     * ??????Home ,path = ZLRouter.rootPath
     * @param class_instance 
     */
    public registHome(class_instance : ZLViewPageClass | ZLViewPage) {
        this.registRoute(this.__zl_router_rootPath__,class_instance);
    }

    /**
     * ??????????????????page???????????????????????????path 
     * @param page ?????? 
     */
    public registViewPage(page : ZLViewPageClass)
    {
        if (page === undefined) {
            return;
        }
        this.registRoute(page.name,page);
    }
    /**
     * ??????????????????
     * @param page ??????
     */
    public unRegistViewPage(page : ZLViewPageClass)
    {
        if (page === undefined) {
            return;
        }
        this.unRegistRoute(page.name);
    }

    /**
     * ????????????
     * @param page ?????? 
     * @param registPageFirst ??????????????????????????????????????????????????????????????????????????????registViewPage
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
     * ?????????????????????page??????????????????????????????
     * @param page ?????? 
     * @param registPageFirst ??????????????????????????????????????????????????????????????????????????????registViewPage
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


    protected loadView(pageRect:ZLRect) : ZLView
    {
        let v = this.__zl_router_wrapperView__;
        v.x = pageRect.x;
        v.y = pageRect.y;
        v.width = pageRect.width;
        v.height = pageRect.height;
        return v;
    }
    
    // /**
    //  * ??????React??????
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
     * React ??????
     */
    private __zl_weakReactComponent__ : WeakRef<ZLRouterComponent> | undefined;

    /**
     * ????????????????????????
     */
    private __zl_router_rootPath__ : string;

    /**
     * ?????????
     */
    private __zl_router_pathPages__ : Map<string,ZLViewPageClass | ZLViewPage>;
    /**
     * ????????????Hash??????
     */
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