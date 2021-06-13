import React from 'react';
import './App.css';
import { SinPage } from './demo/SinPage';
import { ScrollPage } from './demo/ScrollPage';
import { AnimationPage } from './demo/AnimationPage';
import * as zl from  "./zlkit/index"

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
            this.router.registRoute("/animation", AnimationPage);
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

        let view;
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
        {
            let shadow = new zl.BoxShadow();
            let btn = new zl.Button();
            btn.boxShadow = shadow;
            btn.backgroudColor = "rgb(00,00,255,0.2)";
            btn.left = 20;
            btn.top = view.bottom + 60;
            btn.width = 120;
            btn.height = 30;
            btn.title = "SinPage"
            btn.addOnClickEventCallback((sender)=>{
                this.router?.pushViewPage(SinPage);
            })
            this.view.addSubview(btn);

            view = btn;
        }

        {
            let btn = new zl.Button();
            btn.backgroudColor = "rgb(00,00,255,0.2)";
            btn.setFrameSameAs(view);
            btn.top = view.bottom + 20;
            btn.title = "ScrollPage"
            btn.addOnClickEventCallback((sender)=>{
                this.router?.pushViewPage(ScrollPage);
            })
            this.view.addSubview(btn);

            view = btn;
        }

        {
            let btn = new zl.Button();
            btn.backgroudColor = "rgb(00,00,255,0.2)";
            btn.setFrameSameAs(view);
            btn.top = view.bottom + 20;
            btn.title = "Animation"
            btn.addOnClickEventCallback((sender)=>{
                this.router?.push("/animation");
            })
            this.view.addSubview(btn);

            view = btn;
        }
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

