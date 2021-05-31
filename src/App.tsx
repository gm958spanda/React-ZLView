import React from 'react';
import './App.css';
import * as zl from  "./zlkit/index"
import { ZLViewPage } from './zlkit/zlview/ZLViewPage';

class App extends React.Component
{
    private router: zl.Router | undefined;
    render()
    {
        if (this.router === undefined) {
            this.router = new zl.Router();
            this.router.registRoute("/",HomePage);
            this.router.registRoute("/sin", SinPage);
            this.router.registRoute("/scroll", ScrollPage);

            let rp = ["nomatch","scroll","/","sin"];
            let index = 0;
            setInterval(()=>{
                this.router?.push(rp[index%4]);
                index++;
            },5000);
        }
        return this.router.reactElement();
    }
}

export default App;


class HomePage extends ZLViewPage
{
    viewLayoutSubViews()
    {
        super.viewLayoutSubViews();
        this.view.backgroudColor = "red";
    }
    viewDidLoad()
    {
        super.viewDidLoad();
        let lb = new zl.Label();
        lb.text = "HomePage";
        lb.width = 100;
        lb.height = 20;
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
        super.viewLayoutSubViews();
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
        appView.x = 0;
        appView.y = 100;
        appView.width = this.view.width;
        appView.height = 50;
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
    viewLayoutSubViews()
    {
        super.viewLayoutSubViews();
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
        appView.x = 200;
        appView.y = 100;
        appView.width = 300;
        appView.height = 300;
        appView.backgroudColor = "white";

        let scrollView = new zl.ScrollView();
        appView.addSubview(scrollView);
        
        scrollView.width = 200;
        scrollView.height = 200;
        scrollView.backgroudColor = "red";
        // scrollView.alwaysShowScrollIndicatorX = false;
        // scrollView.alwaysShowScrollIndicatorY = true;
        scrollView.hiddenScrollBar = true;
        
        for (let i = 0 ; i < 15 ; i++)
        {
            let lb = new zl.Label()
            lb.clipToBounds = true;
            lb.text = "hello world " + i.toString();
            lb.textAlign = zl.TextAlignMode.Right;
            lb.width = 200;
            lb.height = 30;
            lb.x = 0;
            lb.y = i * 40;
            lb.backgroudColor = 'blue';
            
            scrollView.addSubview(lb);
        }
        this.timer_id = setInterval(()=>{

            scrollView.scrollTo(0, scrollView.contentOffSetY + 30);
            // scrollView.subViews?.getElementAt(0).removeFromSuperview();
            // scrollView.refresh();
        },1000);
    }
}