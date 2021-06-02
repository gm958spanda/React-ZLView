import React, { CSSProperties} from 'react';
import {ZLList} from '../sugar/list'
import {ZLPoint,ZLHref, ZLCurrentSizeUnit} from './ZLUIDef'
import {ZLViewPage} from './ZLViewPage'
import {ZLObject} from './ZLObject'
import {ZLCSSAnimation} from './ZLCSSAnimation'

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

        // ZLViewPage 生命周期
        let page = v.viewPage;
        if (page !==undefined) {
            page.viewDidMount?.();
        }

        // ZLView生命周期
        this.props.view.viewDidMount?.();
    }
    componentWillUnmount()
    {
        // ZLView生命周期
        this.props.view.viewWillUnMount?.();

        let v : any = this.props.view;

        // 动画资源回收
        if(v.__css_animation__) 
        {
            (v.__css_animation__ as ZLCSSAnimation)?.removeCSS();
            v.__css_animation__ = undefined;
        }
        v.__weak_reactComponent__ = undefined;

        // ZLViewPage 生命周期
        let page = v.viewPage;
        if (page !==undefined) 
        {
            page.viewWillUnMount?.();
            (page as any).__weak_router__ = undefined;
            v.__weak_view_page__ = undefined;
        }
    }
    
    render()
    {
        let v = this.props.view;

        // page layout subviews
        let page : ZLViewPage = (v as any).__weak_view_page__?.deref();
        if (page !== undefined) {
            page.viewLayoutSubViews?.();
        }
        // layout subviews
        v.layoutSubViews?.();

        //动画style
        let cssAnimation = v.cssAnimation;
        if(cssAnimation) 
        {
            cssAnimation.updateCSS();
        }

        // child element
        let childs = undefined;
        {
            let subvs = v.subViews;
            if ( subvs !== undefined && subvs.count() > 0 )
            {
                childs = [];
                for (let index = 0; index <subvs.count(); index++)
                {
                    const sub= subvs.getElementAt(index);
                    childs[index] = sub.reactElement();
                }
            }
        }

        // create element
        if (v.href !== undefined && v.href.href !== undefined) {
            let target = "_self";
            if (v.href.openInNewWindow !== undefined && v.href.openInNewWindow === true ){
                target = "_blank";
            } 
            return React.createElement("a", {href: v.href.href,target: target}, v.reactRender(childs));
        } else {
            return v.reactRender(childs);
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
    public backgroudColor? : string;

    /**
     * 是否可见 
     */
    public visibility? : boolean;

    /**
     * 是否切除溢出边界的子视图 （通过设置overflow）
     */
    public clipToBounds? : boolean;

    /**
     * 跳转连接
     */
    public href? : ZLHref;

    /**
     * 如果是由ZLViewPage创建，则有值
     */
    public get viewPage() : ZLViewPage | undefined {return this.__weak_view_page__?.deref();}
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
     * css 动画
     */
    public set cssAnimation(cssAnimation:ZLCSSAnimation | undefined)
    {
        this.__css_animation__?.removeCSS();
        this.__css_animation__ = cssAnimation;
    }
    /**
     * css 动画
     */
    public get cssAnimation():ZLCSSAnimation | undefined {return this.__css_animation__;}

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
    public reactRender(children?:React.ReactNode[]) : React.ReactElement
    {
        // html attributes
        let attr = this.__htmlAttributes__();
        return React.createElement("div", attr.toReactClassAttributes(),children);
    }
    /**
     * 获取DOM Node
     */
    public onReactRefCallback? (e:Element) : void;

    /**
     * 子类可重写
     * @returns html attributes
     */
    protected __htmlAttributes__() : ZLHtmlAttribute
    {
        let attr = new ZLHtmlAttribute(this.uniqueString,this.onReactRefCallback);
        let style =  attr.style;
        style.position = "absolute";
        if (this.__css_animation__) {
            style.animation = this.__css_animation__.toAnimationStr();
        }
        if (this.visibility !== undefined) {
            style.visibility = this.visibility ? undefined/*visible*/ : "hidden";
        }
        if(this.clipToBounds !== undefined) {
            style.overflow = this.clipToBounds ? "hidden" : undefined/*"visible"*/;
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
     * css 动画
     */
    private __css_animation__? : ZLCSSAnimation;

    /**
     * 父视图
     */
    private __weak_superview__? : WeakRef<ZLView>;
    /**
     * 子视图
     */
    private __subviews__? : ZLList<ZLView>;
    /**
     * 本视图所在的页面page（由ZLViewPage创建）
     */
    private __weak_view_page__? : WeakRef<ZLViewPage>;
    /**
     * React 容器
     */
    private __weak_reactComponent__? : WeakRef<ZLViewComponent>;
}


export class ZLHtmlAttribute
{
    constructor(dom_node_id: string , ref?: ((ref:Element)=>void))
    {
        this.style = {} as any;
        this.event = {} as any;
        this.__dom_node_id__ = dom_node_id;
        this.__ref__ = ref;
    }
    /**
     * 行内样式
     */
    style : CSSProperties; 
    
    /**
     * css class name
     */
    className? : string;

    /**
     * 事件
     */
    event : React.DOMAttributes<HTMLElement>;

    /**
     * src 属性
     */
    src? : string;

    toReactClassAttributes() : {}
    {
        let attr :any  = {style : this.style , id : this.__dom_node_id__};
        if (this.className !== undefined && this.className.length > 0 ) {
            attr.className = this.className;
        }
        if (this.src !== undefined ) {
            attr.src = this.src;
        }
        Object.assign(attr,this.event);
        if(this.__ref__ !== undefined) {
            attr.ref = this.__ref__;
        }
        return attr;
    }

    /**
     * dom node id
     */
    private __dom_node_id__ : string;

     /**
     * reactRef 接收
     */
    private __ref__ : undefined | ((ref:Element)=>void) ;
}