import React, { CSSProperties, EventHandler, SyntheticEvent} from 'react';

import {ZLList} from '../sugar/list'
import {ZLEventCallbackList} from '../sugar/eventcb'

import {ZLPoint,
    ZLHref, 
    ZLCurrentSizeUnit, 
    ZLEdgeInset,
    ZLBorderStyle,
    ZLBoxShadow,
    ZLTransform,
    ZLRect,
    ZLSize
} from './ZLUIDef'
import {ZLViewPage} from './ZLViewPage'
import {ZLObject} from './ZLObject'

import {ZLCSSAnimation,
    ZLCSSAnimationKeyFrame,
    ZLCSSAnimationParams
} from './ZLCSSAnimation'

import { ZLCSSTransition } from './ZLCSSTransition';


enum ZLViewEventName
{
    ViewDidMount = "ViewDidMount", //React.componentDidMount   事件回调类型为ZLViewVoidCallback
    ViewWillUnmount = "ViewWillUnmount", //React.componentWillUnmount  事件回调类型为ZLViewVoidCallback
    OnRefCallback = "OnRefCallback" , // React Ref Callback事件， 事件回调类型为ZLReactRefCallback
    
    ViewWillRender = "ViewWillRender" , // React Render事件， 事件回调类型为ZLReactRefCallback
}

type ZLReactRefCallback = (e:Element) => void;
type ZLViewVoidCallback = () => void;


interface  ZLViewComponentProps
{
    view : ZLView;
}

class ZLViewComponent extends React.Component<ZLViewComponentProps>
{
    componentDidMount()
    {
        let v = this.props.view;
        (v as any).__zl_weakReactComponent__ = new WeakRef(this);

        // ZLViewPage 生命周期
        let viewPage = v.viewPage;
        if (viewPage !==undefined) {
            viewPage.viewDidMount?.();
        }

        // ZLView生命周期
        v.viewDidMount?.();
        ((v as any).__zl_lifeCycleEventCblist__ as ZLEventCallbackList)?.onEvnt(ZLViewEventName.ViewDidMount);
    }
    componentWillUnmount()
    {
        // ZLView生命周期
        let v = this.props.view;        
        v.viewWillUnmount?.();
        ((v as any).__zl_lifeCycleEventCblist__ as ZLEventCallbackList)?.onEvnt(ZLViewEventName.ViewWillUnmount);

        // ZLViewPage 生命周期
        let viewPage = v.viewPage;
        if (viewPage !==undefined) 
        {
            viewPage.viewWillUnmount?.();
            (viewPage as any).__zl_weakRouter__ = undefined;
            (v as any).__zl_weakViewPage__ = undefined;
        }
        (v as any).__zl_weakReactComponent__ = undefined;
    }

    render()
    {
        let v = this.props.view;
        // page layout subviews
        let page : ZLViewPage = (v as any).__zl_weakViewPage__?.deref();
        if (page !== undefined) {
            page.viewLayoutSubViews?.();
        }
        // layout subviews
        v.layoutSubViews?.();
        ((v as any).__zl_lifeCycleEventCblist__ as ZLEventCallbackList)?.onEvnt(ZLViewEventName.ViewWillRender);

        // child element
        let childs = undefined;
        {
            let subvs = v.subViews;
            if ( subvs !== undefined && subvs.length > 0 )
            {
                childs = [];
                for (let index = 0; index <subvs.length; index++)
                {
                    const sub= subvs.at(index)!;
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
            return React.createElement("a", {href: v.href.href,target: target}, (v as any).__reactRender__(childs));
        } else {
            return (v as any).__reactRender__(childs);
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
        this.__zl_cssStyle__ = {};
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

    public set right(p:number) { this.x = p - this.width;}
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
     * 设置相同的坐标和尺寸
     */
    public setFrameSameAs(view:ZLView){
        this.x = view.x;
        this.y = view.y;
        this.width = view.width;
        this.height = view.height;
    }
    /**
     * 设置坐标和尺寸
     */
    public setFrame(x:number,y:number,width:number,height:number)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    /**
     * 设置坐标和尺寸
     */
    public setFrameWithRect(rect:ZLRect)
    {
        this.x = rect.origin.x;
        this.y = rect.origin.y;
        this.width = rect.size.width;
        this.height = rect.size.height;
    }
    public getFrame() {return new ZLRect(this.x,this.y,this.width,this.height);}
    /**
     * 设置尺寸
     */
    public setSize(width:number,height:number)
    {
        this.width = width;
        this.height = height;
    }
    /**
     * 设置尺寸
     */
    public setSizeWithSize(size:ZLSize)
    {
        this.width = size.width;
        this.height = size.height;
    }
    /**
     * 背景色
     */
    public get backgroudColor():string | undefined { return this.__zl_cssStyle__.backgroundColor;}
    public set backgroudColor(v:string | undefined ){ this.__zl_cssStyle__.backgroundColor = v;}
    /**
     * 前景色
     */
    public get color():string | undefined { return this.__zl_cssStyle__.color;}
    public set color(v:string | undefined ){ this.__zl_cssStyle__.color = v;}
    /**
     * 是否禁用
     */
    public disabled? : boolean;
    /**
     * 是否可见 
     */
    public get visibility():boolean { return (this.__zl_cssStyle__.visibility !== "hidden");}
    public set visibility(v:boolean) { this.__zl_cssStyle__.visibility = (v === false) ? "hidden" : undefined;}
    /**
     * 不透明度 0 ~ 1，0完全透明  1完全不透明
     */
    public get opacity():number|undefined {return this.__zl_cssStyle__.opacity as number;}
    public set opacity(v:number|undefined){this.__zl_cssStyle__.opacity=v;}
    /**
     * box shadow 边框阴影
     */
    public get boxShadow():ZLBoxShadow|undefined {return this.__zl_boxShadow__;}
    public set boxShadow(v:ZLBoxShadow|undefined) {this.__zl_boxShadow__=v;}
    /**
     * 是否切除溢出边界的子视图 （通过设置overflow）
     */
    public get clipToBounds(): boolean{ return (this.__zl_cssStyle__.overflow === "hidden");}
    public set clipToBounds(v:boolean) {this.__zl_cssStyle__.overflow = (v === true) ? "hidden" : undefined;}
    /**
     * padding
     */
    public get padding() : ZLEdgeInset | undefined {return this.__zl_padding__;}
    public set padding(p: ZLEdgeInset | undefined ){
        this.__zl_padding__ = p;
        let style = this.__zl_cssStyle__;
        if ( p !== undefined)
        {
            if ((p.left === p.right) 
                && (p.bottom === p.top)
                && (p.left === p.bottom) )
            {
                style.padding =  p.left.toString() + ZLCurrentSizeUnit;
            }
            else 
            {
                style.paddingTop = p.top.toString() + ZLCurrentSizeUnit;
                style.paddingBottom = p.bottom.toString() + ZLCurrentSizeUnit
                style.paddingLeft = p.left.toString() + ZLCurrentSizeUnit
                style.paddingRight = p.right.toString() + ZLCurrentSizeUnit
            }
        } else {
            style.padding = undefined;
            style.paddingTop = undefined;
            style.paddingBottom = undefined
            style.paddingLeft = undefined
            style.paddingRight = undefined
        }
    }
    /**
     * 边框线宽
     */
    public get borderWidth():number | undefined { return this.__zl_borderWidth__;}
    public set borderWidth(w:number | undefined){
        this.__zl_borderWidth__ = w;
        this.__zl_cssStyle__.borderWidth = w ? (w.toString() + ZLCurrentSizeUnit) : undefined;
    }
    /**
     * 边框线色
     */
    public get borderColor():string | undefined { return this.__zl_cssStyle__.borderColor;}
    public set borderColor(v:string | undefined ){ this.__zl_cssStyle__.borderColor = v;}
    /**
     * 边框样式
     */
    public get borderStyle():ZLBorderStyle | undefined { return this.__cssStyle__.borderStyle as ZLBorderStyle;}
    public set borderStyle(m:ZLBorderStyle | undefined) {this.__cssStyle__.borderStyle = m;}
    /**
     * transform
     */
    public get transform():ZLTransform | undefined { return this.__zl_transform__;}
    public set transform(m:ZLTransform | undefined) { ;this.__zl_transform__ = m?.copy();}
    /**
     * transition
     */
    public get transition():ZLCSSTransition | undefined { return this.__zl_transition__;}
    public set transition(m:ZLCSSTransition | undefined) { ;this.__zl_transition__ = m;}
    /**
     * 跳转连接
     */
    public href? : ZLHref;

    /**
     * 如果是由ZLViewPage创建，则有值
     */
    public get viewPage() : ZLViewPage | undefined {return this.__zl_weakViewPage__?.deref();}
    /**
     * 获取父视图
     */
    public get superView() : ZLView | undefined { return this.__zl_weakSuperview__?.deref(); }

    /**
     * 从父视图中移除
     */
    public removeFromSuperview()
    {
        let s = this.superView;
        if (s !== undefined) {
            s.__zl_subViews__?.remove(this);
            this.__zl_weakSuperview__ = undefined;
        }
    }
    /**
     * 移除所有子视图
     */
    public removeAllSubviews()
    {
        if (this.__zl_subViews__){
            let subs : ZLView[] = this.__zl_subViews__.concat([]);
            subs.forEach((v)=>{
                v.removeFromSuperview();
            });
        }
    }
    /**
     * 添加子视图
     */
    public addSubview(view:ZLView)
    {
        if(this.__zl_subViews__ === undefined) {
            this.__zl_subViews__ = new ZLList();
        }
        view.removeFromSuperview();
        view.__zl_weakSuperview__ = new WeakRef(this);
        this.__zl_subViews__.add(view);
    }
    /**
     * 子视图列表  （仅复制数组，数组元素指向的引用对象依然相同）
     */
    public get subViews() { return this.__zl_subViews__?.toReadOnlyList();}

    /**
     * 布局子视图 调用reactRender时会调用此方法
     */
    public layoutSubViews?():void;

    /**
     * css 动画 从当前状态到指定状态的动画
     */
    public cssAnimation(p:ZLCSSAnimationParams)
    {
        let from = new ZLCSSAnimationKeyFrame();
        from.progress = 0;
        from.copyViewStyle(this);
        
        p.to();
        let to = new ZLCSSAnimationKeyFrame();
        to.progress = 100;
        to.copyViewStyle(this);

        let an = new ZLCSSAnimation(this,[from,to]);
        an.params = p;

        let style = this.__zl_cssStyle__;
        style.animation = an.toAnimationStr();
        this.__zl_animation__ = an;
        this.refresh();
    }
    public cssAnimationClear() 
    {
        this.__zl_animation__?.onViewAnimationClear();
        this.__zl_animation__ = undefined;
        this.__zl_cssStyle__.animation = undefined;
        this.refresh();
    }

    /**
     * DOM事件监听 参考React DOM事件
     */
    public addListenDOMEvent(eventName:keyof React.DOMAttributes<HTMLElement>, cb:EventHandler<SyntheticEvent>, cbThis? : any)
    {
        if (eventName.startsWith("on")) {
            this.__get_zl_DOMEventCblist__().addEvntCallback(eventName,cb,cbThis);
        }
    }
    /**
     * 移除DOM事件监听 参考React DOM事件
     */
    public removeListenDOMEvent(eventName:keyof React.DOMAttributes<HTMLElement>,cb:EventHandler<SyntheticEvent>) 
    {
        if (eventName.startsWith("on")) {
            this.__zl_DOMEventCblist__?.removeEvntCallback(eventName,cb);
        }
    }

    /**
     * 生命周期 -- view已经挂载  React.componentDidMount
     */
    public viewDidMount?():void
    public addListenViewDidMount(cb:ZLViewVoidCallback, cbThis? : any) { 
        this.__get_zl_lifeCycleEventCblist__().addEvntCallback(ZLViewEventName.ViewDidMount,cb,cbThis);
    }
    public removeListenViewDidMount(cb:ZLViewVoidCallback) {
        this.__zl_lifeCycleEventCblist__?.removeEvntCallback(ZLViewEventName.ViewDidMount,cb);
    }
    /**
     * 生命周期 -- view将要卸载  React.componentWillUnmount
     */
    public viewWillUnmount?():void
    public addListenWiewWillUnMount(cb:ZLViewVoidCallback, cbThis? : any) { 
        this.__get_zl_lifeCycleEventCblist__().addEvntCallback(ZLViewEventName.ViewWillUnmount,cb,cbThis);
    }
    public removeListenWiewWillUnMount(cb:ZLViewVoidCallback) {
        this.__zl_lifeCycleEventCblist__?.removeEvntCallback(ZLViewEventName.ViewWillUnmount,cb);
    }
    /**
     * 获取DOM Node
     */
    public onReactRefCallback?(e:Element):void;
    public addListenOnReactRefCallback(cb:ZLReactRefCallback, cbThis? : any) { 
        this.__get_zl_lifeCycleEventCblist__().addEvntCallback(ZLViewEventName.OnRefCallback,cb,cbThis);
    }
    public removeListenOnReactRefCallback(cb:ZLReactRefCallback) {
        this.__zl_lifeCycleEventCblist__?.removeEvntCallback(ZLViewEventName.OnRefCallback,cb);
    }
    /**
     * 将要执行Render
     */
    public addListenViewWillRender(cb:ZLReactRefCallback, cbThis? : any) { 
        this.__get_zl_lifeCycleEventCblist__().addEvntCallback(ZLViewEventName.ViewWillRender,cb,cbThis);
    }
    public removeListenViewWillRender(cb:ZLReactRefCallback) {
        this.__zl_lifeCycleEventCblist__?.removeEvntCallback(ZLViewEventName.ViewWillRender,cb);
    }

    /**
     * 刷新  React setState
     */
     public refresh(callback?:() => void) 
     { 
         let c = this.__zl_weakReactComponent__?.deref();
         if (c) {
             c.setState({},callback);
         } else if (callback){
             callback();
         }
     }

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
    protected __reactRender__(children?:React.ReactNode[]) : React.ReactElement
    {
        // html attributes
        let attr = this.__htmlAttributes__();
        return React.createElement("div", attr.toReactClassAttributes(),children);
    }

    /**
     * 子类可重写
     * @returns html attributes
     */
    protected __htmlAttributes__() : ZLHtmlAttribute
    {
        let style =  this.__zl_cssStyle__;
        style.position = "absolute";
        // 坐标
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
        if(this.__zl_boxShadow__) {
            style.boxShadow = this.__zl_boxShadow__.toCSSString();
        }
        // transform
        ZLTransform.clearCSSStyle(style);
        if (this.__zl_transform__) {
            this.__zl_transform__.toCSSStyle(style);
        }        
        // 过渡 transition
        if (this.__zl_transition__) {
            style.transition = this.__zl_transition__.toTransitionStr();
        } else {
            style.transition = undefined;
        }
        // 动画处理
        if (this.__zl_animation__ && this.__zl_animation__.isEnd === false){
            ;
        } else {
            style.animation = undefined;
            this.__zl_animation__ = undefined;
        }
        // 获取Dom的回调
        let refCb = undefined;
        let OnRefCallbackMap = this.__zl_lifeCycleEventCblist__?.getEventCallbackList(ZLViewEventName.OnRefCallback);
        if (this.onReactRefCallback || (OnRefCallbackMap && OnRefCallbackMap.size>0))
        {
            refCb = (e:Element) => {
                if (this.onReactRefCallback){
                    this.onReactRefCallback(e);
                }
                if (OnRefCallbackMap) {
                    OnRefCallbackMap.forEach((cbThis,cb)=>{
                        cb.call(cbThis,e);
                    });
                }
            }
        }

        // Dom 事件监听
        let event:React.DOMAttributes<HTMLElement> | undefined = undefined;
        if (this.__zl_DOMEventCblist__) 
        {
            event = {};
            this.__zl_DOMEventCblist__.getEventNameList().forEach(eventName => {
                (event as any)[eventName] = (e :SyntheticEvent ) => {
                    this.__zl_DOMEventCblist__?.onEvnt(eventName,e);
                }
            });
        }

        // 生成html属性
        let attr = new ZLHtmlAttribute(this.uniqueString, style, event , refCb);

        //disabled
        if (this.disabled === true) {
            (attr.otherAttr as any).disabled = "disabled";
        }
        return attr
    }
    /**
     * 暴露给子类，方便访问
     */
    protected get __cssStyle__() : CSSProperties {return this.__zl_cssStyle__;}

    /**
     * 父视图
     */
    private __zl_weakSuperview__? : WeakRef<ZLView>;
    /**
     * 子视图
     */
    private __zl_subViews__? : ZLList<ZLView>;
    /**
     * 本视图所在的页面page（由ZLViewPage创建）
     */
    private __zl_weakViewPage__? : WeakRef<ZLViewPage>;
    /**
     * React 容器
     */
    private __zl_weakReactComponent__? : WeakRef<ZLViewComponent>;
    /**
     * 生命事件回调列表 {事件名 : {事件回调 : 事件回调的This} }
     */
    private __zl_lifeCycleEventCblist__? : ZLEventCallbackList;
    private __get_zl_lifeCycleEventCblist__() :ZLEventCallbackList 
    {
        if (this.__zl_lifeCycleEventCblist__ === undefined) {
            this.__zl_lifeCycleEventCblist__ = new ZLEventCallbackList();
        }
        return this.__zl_lifeCycleEventCblist__;
    }
    /**
     * DOM事件回调列表 {事件名 : {事件回调 : 事件回调的This} }
     */
     private __zl_DOMEventCblist__? : ZLEventCallbackList;
     private __get_zl_DOMEventCblist__() :ZLEventCallbackList 
     {
         if (this.__zl_DOMEventCblist__ === undefined) {
             this.__zl_DOMEventCblist__ = new ZLEventCallbackList();
         }
         return this.__zl_DOMEventCblist__;
     }

    /// css style
    private __zl_cssStyle__: CSSProperties;
    private __zl_boxShadow__?:ZLBoxShadow;
    private __zl_transform__?:ZLTransform;
    private __zl_animation__?:ZLCSSAnimation;
    private __zl_transition__?:ZLCSSTransition;
    ///padding border
    private __zl_padding__? :ZLEdgeInset;
    private __zl_borderWidth__? : number;
}


export class ZLHtmlAttribute
{
    constructor(dom_node_id: string , style:CSSProperties , event?:React.DOMAttributes<HTMLElement>, ref?: ((ref:Element)=>void))
    {
        this.otherAttr = {};
        this.__style__ = style;
        this.__event__ = event;
        this.__dom_node_id__ = dom_node_id;
        this.__ref__ = ref;
    }
    /**
     * 行内样式
     */
    public get style() : CSSProperties {return this.__style__;}
    
    /**
     * css class name
     */
    public className? : string;

    /**
     * 其他属性
     */
    otherAttr : {}

    toReactClassAttributes() : {}
    {
        let cssStyle = {};
        Object.assign(cssStyle,this.__style__);

        let attr :any  = {style : cssStyle , id : this.__dom_node_id__};
        if(this.__ref__ !== undefined) {
            attr.ref = this.__ref__;
        }
        if (this.className !== undefined && this.className.length > 0 ) {
            attr.className = this.className;
        }
        let ret = {}
        Object.assign(ret,this.otherAttr);
        if (this.__event__) {
            Object.assign(ret,this.__event__);
        }
        Object.assign(ret,attr);
        return ret;
    }

    private __event__? : React.DOMAttributes<HTMLElement>;
    private __style__ : CSSProperties;
    /**
     * dom node id
     */
    private __dom_node_id__ : string;

     /**
     * reactRef 接收
     */
    private __ref__? : ZLReactRefCallback;
}