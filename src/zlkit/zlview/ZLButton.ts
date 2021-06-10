import React from 'react';
import {ZLView}  from './ZLView'
import {ZLEventCallbackList} from '../sugar/eventcb'


type ZLButtonOnClickCallback = (sender:ZLButton)=>void;

export class ZLButton extends ZLView
{
    /**
     * 按钮标题
     */
    public title? : string;

    /**
     * 添加onClick回调
     * @param cb 回调函数
     * @param cbThis 回调函数的this
     */
    public addOnClickEventCallback(cb:ZLButtonOnClickCallback,cbThis?:any)
    {
        if (this.__zl_btn_event_list__ === undefined) {
            this.__zl_btn_event_list__ = new ZLEventCallbackList();
        }
        this.__zl_btn_event_list__.addEvntCallback("onclick",cb,cbThis);
    }

    /**
     * 移除 onClick回调
     * @param cb 回调函数
     */
    public removeOnClickEventCallback(cb:ZLButtonOnClickCallback)
    {
        if (this.__zl_btn_event_list__ === undefined) {
            this.__zl_btn_event_list__ = new ZLEventCallbackList();
        }
        this.__zl_btn_event_list__.removeEvntCallback("onclick",cb);
    }

    protected __reactRender__(children?:React.ReactNode[])
    {
        let attr = this.__htmlAttributes__();
        attr.event.onClick = (e:React.SyntheticEvent)=>{
            this.__zl_btn_event_list__?.onEvnt("onclick",this);
        }
        return React.createElement("button",attr.toReactClassAttributes(), children,this.title);
    }
    private __zl_btn_event_list__? : ZLEventCallbackList;
}