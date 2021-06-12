import React from 'react';
import './App.css';
import * as zl from  "./zlkit/index"

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
            let btn = new zl.Button();
            btn.backgroudColor = "rgb(00,00,255,0.2)";
            btn.left = 20;
            btn.top = view.bottom + 60;
            btn.width = 120;
            btn.height = 30;
            btn.title = "SinPage"
            btn.addOnClickEventCallback((sender)=>{
                this.router?.push("/sin");
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
                this.router?.push("/scroll");
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

class SinPage extends zl.ViewPage
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

class ScrollPage extends zl.ViewPage
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



class AnimationPage extends zl.ViewPage
{
    viewDidLoad()
    {
        super.viewDidLoad?.();
        this.view.backgroudColor = "white";
        this.test(this.view);
    }

    viewDidMount()
    {
        console.log( this.constructor.name + " mount");
    }

    viewWillUnMount()
    {
        console.log( this.constructor.name + " unmount");
    }

    test(appView:zl.View)
    {
        appView.backgroudColor = "white";

        let view = new zl.View();
        appView.addSubview(view);
        
        view.width = appView.width * 0.6;
        view.height = appView.height * 0.3;;
        view.backgroudColor = "red";
        view.cssAnimation({to:()=>{
            view.backgroudColor = "yellow";
            view.x = 100;
            view.width = 200;
        },
            duration:3000,
            timingFunction:zl.CSSAnimationTimingFunction.cubicBezier,
            cubicBezierValue:[1,0,0,1],
            end:()=>{
                console.log("animation end");
            }
        });
    }
}