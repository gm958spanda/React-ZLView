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

    viewWillUnmount()
    {
        console.log( this.constructor.name + " unmount");
    }

    test(appView:zl.View)
    {
        appView.backgroudColor = "white";
        let view = new zl.Label();
        appView.addSubview(view);

        view.text = "ABCD";
        view.width = appView.width * 0.6;
        view.height = appView.height * 0.3;;
        view.backgroudColor = "red";
        this.animation1(view);
    }

    animation1(view:zl.View)
    {
        console.log("animation1 start" , new Date());
        view.cssAnimation({to:()=>{
            view.backgroudColor = "yellow";
            view.x = 100;
            view.width = 200;
        },
            duration:2000,
            timingFunction:zl.CSSAnimationTimingFunction.cubicBezier,
            cubicBezierValue:[1,0,0,1],
            end:()=>{
                console.log("animation1 end", new Date());
                this.animation2(view);
            }
        });
    }

    animation2(view:zl.View)
    {
        console.log("animation2 start", new Date());
        view.cssAnimation({to:()=>{
            let transform = new zl.Transform();
            transform.rotate(Math.PI);
            transform.translate(10,190);
            view.transform = transform;
        },
            duration:2000,
            timingFunction:zl.CSSAnimationTimingFunction.easeInOut,
            end:()=>{
                console.log("animation2 end", new Date());
                this.animation3(view);
            }
        });
    }

    animation3(view:zl.View)
    {
        console.log("animation3 start", new Date());
        view.cssAnimation({to:()=>{
            let transform = view.transform!;//new zl.Transform();
            transform.translate(10,190);
            transform.skew(70/Math.PI,80/Math.PI);
            // transform.rotate(Math.PI);
            view.transform = transform;
        },
            duration:2000,
            timingFunction:zl.CSSAnimationTimingFunction.easeInOut,
            end:()=>{
                console.log("animation3 end", new Date());
            }
        });
    }
}