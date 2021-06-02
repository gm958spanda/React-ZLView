import React from 'react';
import './App.css';
import * as zl from  "./zlkit/index"
import { ZLCSSAnimation } from './zlkit/zlview/ZLCSSAnimation';
import { ZLViewPage } from './zlkit/zlview/ZLViewPage';

class App extends React.Component
{
    private router: zl.Router | undefined;
    private timer_id : NodeJS.Timeout | undefined;
    componentWillUnmount()
    {
        clearInterval(this.timer_id!);
    }

    render()
    {
        if (this.router === undefined) {
            console.log("App");
            this.router = new zl.Router();
            this.router.registRoute("/",HomePage);
            this.router.registRoute("/sin", SinPage);
            this.router.registRoute("/scroll", ScrollPage);

            // let rp = ["nomatch","scroll","/","sin"];
            // let index = 0;
            // this.timer_id = setInterval(()=>{
            //     this.router?.push(rp[index%4]);
            //     index++;
            // },5000);
        }
        return this.router.reactElement();
    }
}

export default App;


class HomePage extends ZLViewPage
{
    viewLayoutSubViews()
    {
        super.viewLayoutSubViews?.();
        this.view.backgroudColor = "red";
    }
    viewDidLoad()
    {
        super.viewDidLoad?.();
        let lb = new zl.Label();
        lb.text = "HomePage";
        let sz = lb.sizeThatWidthHeight(100,100);
        lb.width = sz.width;
        lb.height = sz.height;
        lb.center_x = this.view.width / 2;
        lb.center_y = this.view.height / 2;
        this.view.addSubview(lb);
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

class SinPage extends ZLViewPage
{
    viewLayoutSubViews()
    {
        super.viewLayoutSubViews?.();
        this.view.backgroudColor = "blue";
        this.testSin(this.view);
    }

    viewDidMount()
    {
        console.log( this.constructor.name + " mount");
    }

    viewWillUnMount()
    {
        console.log( this.constructor.name + " unmount");
    }

    testSin(appView:zl.View)
    {
        appView.backgroudColor = "white";

        let colors = ["red","blue","gredd"];
        for (let i = 0 ; i < 999; i ++)
        {
            let sub = new zl.View();
            sub.x = i;
            sub.y = Math.sin(i / 3.14) * 15 + appView.height / 2;
            sub.width = 3;
            sub.height = 3;
            sub.backgroudColor = colors[i %3];
            appView.addSubview(sub);
        }
    }
}

class ScrollPage extends ZLViewPage
{
    private timer_id:NodeJS.Timeout |undefined;
    viewDidLoad()
    {
        super.viewDidLoad?.();
        this.view.backgroudColor = "blue";
        this.testScollView(this.view);
    }

    viewDidMount()
    {
        console.log( this.constructor.name + " mount");
    }

    viewWillUnMount()
    {
        console.log( this.constructor.name + " unmount");
        clearInterval(this.timer_id!);
    }

    testScollView(appView:zl.View)
    {
        appView.backgroudColor = "white";

        let scrollView = new zl.ScrollView();
        appView.addSubview(scrollView);
        
        scrollView.width = appView.width * 0.6;
        scrollView.height = appView.height * 0.3;;
        scrollView.backgroudColor = "red";
        // scrollView.alwaysShowScrollIndicatorX = false;
        // scrollView.alwaysShowScrollIndicatorY = true;
        scrollView.hiddenScrollBar = true;
        scrollView.cssAnimation = new ZLCSSAnimation();
        scrollView.cssAnimation.duration = 3000;
        let top = 0;
        for (let i = 0 ; i < 99 ; i++)
        {
            let lb = new zl.Label()
            lb.clipToBounds = true;
            lb.text = "hello world " + i.toString();
            lb.textAlign = zl.TextAlignMode.Right;
            let sz = lb.sizeThatWidthHeight(200,30);
            lb.width = sz.width;
            lb.height = sz.height;
            lb.y = top;
            top = lb.bottom + 3;
            lb.backgroudColor = 'blue';
            
            scrollView.addSubview(lb);
        }
        this.timer_id = setInterval(()=>{

            // scrollView.scrollTo(0, scrollView.contentOffSetY + 2);
            // scrollView.subViews?.getElementAt(0).removeFromSuperview();
            // scrollView.refresh();
        },100);
    }
}