import React, { CSSProperties} from 'react';
import {ZLList} from '../sugar/list'
import {ZLPoint,ZLHref, ZLCurrentSizeUnit} from './ZLUIDef'
import {ZLViewPage} from './ZLViewPage'
import {ZLObject} from './ZLObject'

interface  ZLViewComponentProps
{
    view : ZLView;
}
class ZLViewComponent extends React.Component<ZLViewComponentProps>
{
    componentDidMount()
    {
        let v : any = this.props.view;
        v.__weak_reactComponent__ = new WeakRef(this);

        let page : ZLViewPage = v.__weak_view_page__?.deref();
        if (page !==undefined) {
            page.viewDidMount?.();
        }
        this.props.view.viewDidMount?.();
    }
    componentWillUnmount()
    {
        this.props.view.viewWillUnMount?.();

        let v : any = this.props.view;
        v.__weak_reactComponent__ = undefined;

        let page : ZLViewPage = v.__weak_view_page__?.deref();
        if (page !==undefined) {
            page.viewWillUnMount?.();
            (page as any).__weak_router__ = undefined;
            v.__weak_view_page__ = undefined;
        }
    }
    render()
    {
        let v = this.props.view;
        if (v.href !== undefined && v.href.href !== undefined) {
            let target = "_self";
            if (v.href.openInNewWindow !== undefined && v.href.openInNewWindow === true ){
                target = "_blank";
            } 
            return React.createElement("a", {href: v.href.href,target: target}, v.reactRender());
        } else {
            return v.reactRender();
        }
    }
}


export class ZLView extends ZLObject
{
    constructor()
    {
        super();
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
    }

    /**
     * 宽度
     */
    public width : number;
    /**
     * 高度
     */
    public height : number;
    /**
     * 原点x
     */
    public x : number;
    /**
     * 原点y
     */
    public y : number;

    public set left(p:number) { this.x = p;}
    public get left():number { return this.x;}

    public set top(p:number) { this.y = p;}
    public get top():number { return this.y;}

    public set right(p:number) { this.y = p - this.width;}
    public get right():number { return this.x + this.width;}

    public set bottom(p:number) { this.y = p - this.height;}
    public get bottom():number { return this.y + this.height;}

    public set center_x(p:number) { this.x = p - this.width/2;}
    public get center_x():number { return this.x + this.width/2;}

    public set center_y(p:number) { this.y = p - this.height/2;}
    public get center_y():number { return this.y + this.height/2;}

    public set center(p:ZLPoint) { this.center_x = p.x;this.center_y = p.y;}
    public get center():ZLPoint { return new ZLPoint(this.center_x,this.center_y);}
    
    /**
     * 背景色
     */
    public backgroudColor : string | undefined;

    /**
     * 是否切除溢出边界的子视图 （通过设置overflow）
     */
    public clipToBounds : boolean | undefined;

    /**
     * 跳转连接
     */
    public href : ZLHref | undefined;

    /**
     * 获取父视图
     */
    public get superView() : ZLView | undefined { return this.__weak_superview__?.deref(); }
    
    /**
     * 从父视图中移除
     */
    public removeFromSuperview()
    {
        let s = this.superView;
        if (s !== undefined) {
            s.__subviews__?.remove(this);
            this.__weak_superview__ = undefined;
        }
    }

    /**
     * 添加子视图
     */
    public addSubview(view:ZLView)
    {
        if(this.__subviews__ === undefined) {
            this.__subviews__ = new ZLList();
        }
        view.removeFromSuperview();
        view.__weak_superview__ = new WeakRef(this);
        this.__subviews__.add(view);
    }
    /**
     * 子视图列表
     */
    public get subViews() { return this.__subviews__?.toReadOnlyList();}

    /**
     * 刷新  React setState
     */
    public refresh(callback?:() => void) 
    { 
        let c = this.__weak_reactComponent__?.deref();
        if (c) {
            c.setState({},callback);
        } else if (callback){
            callback();
        }
    }

    /**
     * 布局子视图 调用reactRender时会调用此方法
     */
    public layoutSubViews?():void;

    /**
     * 生命周期 -- view已经挂载  React.componentDidMount
     */
    public viewDidMount?():void;
    /**
     * 生命周期 -- view将要卸载  React.componentWillUnmount
     */
    public viewWillUnMount?():void;
    
    /**
     * React element
     */
    public reactElement() : React.ReactElement
    {
        return React.createElement(ZLViewComponent, {view: this,key:this.uniqueId});
    }

    /**
     * 渲染  React render
     */
    public reactRender() : React.ReactElement
    {
        let page = this.__weak_view_page__?.deref();
        if (page !== undefined) {
            page.viewLayoutSubViews?.();
        }
        
        // html attributes
        let attr = this.__htmlAttributes__()
        if (this.__subviews__ === undefined || this.__subviews__.count() === 0)
        {
            return React.createElement("div", attr.toReactClassAttributes());
        }
        
        // layout subviews
        this.layoutSubViews?.();

        // child element
        let childs = [];
        for (let index = 0; index <this.__subviews__.count(); index++)
        {
            const subview = this.__subviews__.getElementAt(index);
            childs[index] = subview.reactElement();
        }
        return React.createElement("div",attr.toReactClassAttributes(),childs);
    }

    /**
     * 子类可重写
     * @returns html attributes
     */
    protected __htmlAttributes__() : ZLHtmlAttribute
    {
        let attr = new ZLHtmlAttribute();
        let style =  attr.style;
        style.position = "absolute";

        if(this.clipToBounds !== undefined) {
            style.overflow = this.clipToBounds ? "hidden" : "visible";
        }
        if (this.backgroudColor !== undefined){
            style.backgroundColor = this.backgroudColor;
        }
        if (this.width !== undefined) {
            style.width = this.width.toString() + ZLCurrentSizeUnit;
        }
        if (this.height !== undefined) {
            style.height = this.height.toString()+ ZLCurrentSizeUnit;
        }
        if (this.x !== undefined) {
            style.left = this.x.toString()+ ZLCurrentSizeUnit;
        }
        if (this.y !== undefined) {
            style.top = this.y.toString()+ ZLCurrentSizeUnit;
        }
        return attr
    }

    /**
     * 父视图
     */
    private __weak_superview__ : WeakRef<ZLView> | undefined;
    /**
     * 子视图
     */
    private __subviews__ : ZLList<ZLView> | undefined;
    /**
     * React 容器
     */
    private __weak_reactComponent__ : WeakRef<ZLViewComponent> | undefined;

    /**
     * page
     */
    private __weak_view_page__ : WeakRef<ZLViewPage> | undefined;
}


export class ZLHtmlAttribute
{
    constructor() {
        this.style = {} as any;
        this.event = {} as any;
    }
    /**
     * 行内样式
     */
    style : CSSProperties; 
    
    /**
     * css class name
     */
    className : string | undefined;

    /**
     * 事件
     */
    event : React.DOMAttributes<HTMLElement>;

    /**
     * src 属性
     */
    src : string | undefined;

    /**
     * reactRef 接收
     */
    ref : undefined | ((ref:Element)=>void) ;

    toReactClassAttributes() : {}
    {
        let attr :any  = {style : this.style};
        if (this.className !== undefined && this.className.length > 0 ) {
            attr.className = this.className;
        }
        if (this.src !== undefined ) {
            attr.src = this.src;
        }
        Object.assign(attr,this.event);
        if(this.ref !== undefined) {
            attr.ref = this.ref;
        }
        return attr;
    }
}