import * as zl from  "../zlkit/index"

import { SinPage } from './SinPage';
import { ScrollPage } from './ScrollPage';
import { AnimationPage } from './AnimationPage';
import { TransformPage } from './TransformPage';
import { UIControlView } from './UIControlView';

export class HomePage extends zl.ViewPage
{
    viewLayoutSubViews()
    {
        super.viewLayoutSubViews?.();
        this.view.backgroudColor = "white";
    }
    viewDidLoad()
    {
        super.viewDidLoad?.();

        let leftView = new zl.View();
        leftView.setFrameWithRect(this.view.getFrame().getHalfLeft());
        this.view.addSubview(leftView);
        this.setLeftView(leftView);

        let rightView = new UIControlView();
        rightView.setFrameWithRect(this.view.getFrame().getHalfRight());
        this.view.addSubview(rightView);
    }

    setLeftView(leftView:zl.View)
    {

        let top = 20;
        let btns = [SinPage,
            ScrollPage,
            AnimationPage,
            TransformPage];
        btns.forEach((v)=>{
            let shadow = new zl.BoxShadow();
            let btn = new zl.Button();
            btn.boxShadow = shadow;
            btn.backgroudColor = "rgb(00,00,255,0.2)";
            btn.left = 20;
            btn.top = top;
            btn.width = 120;
            btn.height = 30;
            btn.title = v.name
            btn.onClick = (sender)=>{
                this.router?.pushViewPage(v,true);
            };
            leftView.addSubview(btn);

            top = btn.bottom + 20;
        });

    }
        
    viewDidMount()
    {
        console.log( this.constructor.name + " mount");
    }

    viewWillUnmount()
    {
        console.log( this.constructor.name + " unmount");
    }
}