import * as zl from  "../zlkit/index"


export class AnimationPage extends zl.ViewPage
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