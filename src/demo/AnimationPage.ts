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
        this.animation1(view);
    }

    animation1(view:zl.View)
    {
        view.cssAnimation({to:()=>{
            view.backgroudColor = "yellow";
            view.x = 100;
            view.width = 200;
        },
            duration:2000,
            timingFunction:zl.CSSAnimationTimingFunction.cubicBezier,
            cubicBezierValue:[1,0,0,1],
            end:()=>{
                console.log("animation1 end");
                this.animation2(view);
            }
        });
    }

    animation2(view:zl.View)
    {
        view.cssAnimation({to:()=>{
            let transform = new zl.Transform();
            transform.rotate(30);
            transform.translate(10,90);
            view.transform = transform;
        },
            duration:2000,
            timingFunction:zl.CSSAnimationTimingFunction.easeInOut,
            end:()=>{
                console.log("animation2 end");
            }
        });
    }
}