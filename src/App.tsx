import React from 'react';
import './App.css';
import { SinPage } from './demo/SinPage';
import { ScrollPage } from './demo/ScrollPage';
import { AnimationPage } from './demo/AnimationPage';
import * as zl from  "./zlkit/index"
import { TransformPage } from './demo/TransformPage';

class App extends React.Component
{
    private router: zl.Router | undefined;
    render()
    {
        if (this.router === undefined) {
            this.router = new zl.Router();
            this.router.registRoute("/",HomePage);
            this.router.registViewPage(SinPage);
            this.router.registViewPage(ScrollPage);
            this.router.registViewPage(AnimationPage);
            this.router.registViewPage(TransformPage);
        }
        return this.router.reactElement();
    }
}

export default App;


class HomePage extends zl.ViewPage
{
    viewLayoutSubViews()
    {
        super.viewLayoutSubViews?.();
        this.view.backgroudColor = "white";
    }
    viewDidLoad()
    {
        super.viewDidLoad?.();

        let view:zl.View;
        {
            let lb = new zl.TextArea()
            lb.text = "456\n123\n789\nabc\nefg\nasdfgh\nqwer";
            lb.addOnInputEventCallback((sender)=>{
                console.log(sender.scrollSize?.height);
            })
            lb.top = 10;
            lb.left = 10;
            lb.width = 180;
            lb.height = 100;
            this.view.addSubview(lb);
            view = lb;
        }

        let btns = [SinPage,ScrollPage,AnimationPage,TransformPage];
        btns.forEach((v)=>{
            let shadow = new zl.BoxShadow();
            let btn = new zl.Button();
            btn.boxShadow = shadow;
            btn.backgroudColor = "rgb(00,00,255,0.2)";
            btn.left = 20;
            btn.top = view.bottom + 20;
            btn.width = 120;
            btn.height = 30;
            btn.title = v.name
            btn.onClick = (sender)=>{
                this.router?.pushViewPage(v);
            };
            this.view.addSubview(btn);

            view = btn;
        });

        // let rgroup = new zl.RadioGroup()
        // for (let i = 0 ; i < 3 ;i ++)
        // {
        //     let btn = new zl.RadioButton(rgroup);
        //     btn.left = 20;
        //     btn.top = view.bottom + 20;
        //     btn.width = 120;
        //     btn.height = 30;
        //     this.view.addSubview(btn);

        //     view = btn;
        // }
    }
        
    viewDidMount()
    {
        console.log( this.constructor.name + " mount");
    }

    viewWillUnMount()
    {
        console.log( this.constructor.name + " unmount");
    }
}