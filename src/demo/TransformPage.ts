import * as zl from  "../zlkit/index"


export class TransformPage extends zl.ViewPage
{
    viewDidLoad()
    {
        super.viewDidLoad?.();
        let transView = new zl.View();
        this.view.addSubview(transView);

        let startTransform = new zl.Transform();
        if(true)
        {
            // https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective
            transView.backgroudColor = "rgb(240,230,210,0.2)";
            transView.width = 200;
            transView.height = 200;
            transView.center = this.view.center;
            startTransform.backfaceVisibility = true;
            startTransform.perspectiveOrigin(1.5,1.5);
            startTransform.preserve3d = true;
            startTransform.perspective(250);
            transView.transform = startTransform;

            let font = new zl.Font(50,"sans-serif");

            let tr = new zl.Transform();
            tr.translateZ(50);
            let face_front = new zl.Label();
            face_front.width = 100;
            face_front.height = 100;
            face_front.textAlign = zl.TextAlignMode.Center;
            face_front.text = "A";
            face_front.font = font;
            face_front.color = "white";
            face_front.backgroudColor = "rgba(0, 0, 0, 0.3)";
            face_front.transform = tr;
            transView.addSubview(face_front);

            tr = new zl.Transform();
            tr.translateZ(50);
            tr.rotateY(Math.PI);
            let face_back = new zl.Label();
            face_back.setFrameSameAs(face_front);
            face_back.textAlign = zl.TextAlignMode.Center;
            face_back.text = "B";
            face_back.font = font;
            face_back.color = "black";
            face_back.backgroudColor = "rgba(0, 255, 0, 0.6)";
            face_back.transform = tr;
            transView.addSubview(face_back);

            tr = new zl.Transform();
            tr.translateZ(50);
            tr.rotateY(Math.PI/2);
            let face_right = new zl.Label();
            face_right.setFrameSameAs(face_front);
            face_right.textAlign = zl.TextAlignMode.Center;
            face_right.text = "C";
            face_right.font = font;
            face_right.color = "white";
            face_right.backgroudColor = "rgba(196, 0, 0, 0.7)";
            face_right.transform = tr;
            transView.addSubview(face_right);

            tr = new zl.Transform();
            tr.translateZ(50);
            tr.rotateY(-Math.PI/2);
            let face_left = new zl.Label();
            face_left.setFrameSameAs(face_front);
            face_left.textAlign = zl.TextAlignMode.Center;
            face_left.text = "D";
            face_left.font = font;
            face_left.color = "white";
            face_left.backgroudColor = "rgba(0, 0, 196, 0.7)";
            face_left.transform = tr;
            transView.addSubview(face_left);

            tr = new zl.Transform();
            tr.translateZ(50);
            tr.rotateX(Math.PI/2);
            let face_top = new zl.Label();
            face_top.setFrameSameAs(face_front);
            face_top.textAlign = zl.TextAlignMode.Center;
            face_top.text = "E";
            face_top.font = font;
            face_top.color = "white";
            face_top.backgroudColor = "rgba(196, 196, 0, 0.7)";
            face_top.transform = tr;
            transView.addSubview(face_top);

            tr = new zl.Transform();
            tr.translateZ(50);
            tr.rotateX(-Math.PI/2);
            let face_bottom = new zl.Label();
            face_bottom.setFrameSameAs(face_front);
            face_bottom.textAlign = zl.TextAlignMode.Center;
            face_bottom.text = "F";
            face_bottom.font = font;
            face_bottom.color = "white";
            face_bottom.backgroudColor = "rgba(196, 0, 196, 0.7)";
            face_bottom.transform = tr;
            transView.addSubview(face_bottom);
        }

        let btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "translate2d";
        btn.left = 10;
        btn.top = 10;
        btn.width = 80;
        btn.height = 20;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = new zl.Transform();
            trans.translate(100,100);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        let view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "rotate2d";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = new zl.Transform();
            trans.rotate(45/Math.PI);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "skew2d";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = new zl.Transform();
            trans.skew(75/Math.PI,75/Math.PI);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "translateX";
        btn.setFrameSameAs(view);
        btn.left = 10;
        btn.top = view.bottom + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = new zl.Transform();
            trans.translateX(100);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "translateY";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = new zl.Transform();
            trans.translateY(100);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "translateZ";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let sub = transView.subViews?.at(0);
            if (sub)
            {
                let old = sub.transform;

                let trans = new zl.Transform();
                trans.translateZ(-100);
                sub.cssAnimation({
                    to:()=>{
                        sub!.transform = trans;
                    },
                    duration:3000,
                    iterationCount:"infinite",
                    end:()=>{
                        sub!.transform = old;
                        sub!.refresh();
                    }
                });
            }
        };

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "rotateX";
        btn.setFrameSameAs(view);
        btn.left = 10;
        btn.top = view.bottom + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = new zl.Transform();
            trans.rotateX(Math.PI/4);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "rotateY";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = new zl.Transform();
            trans.rotateY(Math.PI/4);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "rotateZ";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = new zl.Transform();
            trans.rotateZ(Math.PI/4);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "skewX";
        btn.setFrameSameAs(view);
        btn.left = 10;
        btn.top = view.bottom + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = new zl.Transform();
            trans.skewX(Math.PI/4);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "skewY";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = new zl.Transform();
            trans.skewY(Math.PI/4);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "skew3d";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = new zl.Transform();
            trans.skew3d(0,0,0,0,Math.PI/3 ,Math.PI/4)
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "reflectX";
        btn.setFrameSameAs(view);
        btn.left = 10;
        btn.top = view.bottom + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = new zl.Transform();
            trans.reflectX(true);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "reflectY";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = new zl.Transform();
            trans.reflectY(true);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "reflectZ";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = new zl.Transform();
            trans.reflectZ(true);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };
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