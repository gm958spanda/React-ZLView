import * as zl from  "../zlkit/index"


export class TransformPage extends zl.ViewPage
{
    private m_perspective = 600;
    private m_perspectiveOriginX = 1.5;
    private m_perspectiveOriginY = 1.5;
    private m_backfaceVisibility = true;
    private m_preserve3d = true;

    create3DTransForm()
    {
        let s = new zl.Transform();
        s.backfaceVisibility = this.m_backfaceVisibility;
        s.perspectiveOrigin(this.m_perspectiveOriginX,this.m_perspectiveOriginY);
        s.preserve3d = this.m_preserve3d;
        s.perspective(this.m_perspective);
        return s;
    }
    create3DBox() : zl.View
    {
        let transView = new zl.View();
        transView.transform = this.create3DTransForm();

        // https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective
        transView.backgroudColor = "rgb(240,230,210,0.2)";
        transView.width = 200;
        transView.height = 200;
        transView.center = this.view.center;
        transView.left += 200;
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

        return transView;
    }

    viewDidLoad()
    {
        super.viewDidLoad?.();
        let transView = this.create3DBox();
        this.view.addSubview(transView);

        let startTransform = transView.transform!.copy();

        let btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "translate2d";
        btn.left = 10;
        btn.top = 10;
        btn.width = 80;
        btn.height = 20;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = this.create3DTransForm();
            trans.translate(100,100);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        let view :zl.View = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "rotate2d";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.onClick = ()=>{
            transView.transform = startTransform;

            let trans = this.create3DTransForm();
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

            let trans = this.create3DTransForm();
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

            let trans = this.create3DTransForm();
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

            let trans = this.create3DTransForm();
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

                let trans = this.create3DTransForm();
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

            let trans = this.create3DTransForm();
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

            let trans = this.create3DTransForm();
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

            let trans = this.create3DTransForm();
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

            let trans = this.create3DTransForm();
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

            let trans = this.create3DTransForm();
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

            let trans = this.create3DTransForm();
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

            let trans = this.create3DTransForm();
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

            let trans = this.create3DTransForm();
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

            let trans = this.create3DTransForm();
            trans.reflectZ(true);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        };

        view = btn;
        let lb = new zl.Label();
        this.view.addSubview(lb);
        lb.text = "perspective";
        lb.left = 10;
        lb.top = view.bottom + 10;
        lb.width = 110;
        lb.height = 20;
        let slider1 = new zl.Slider();
        this.view.addSubview(slider1);
        slider1.left = lb.right + 5;
        slider1.width = 150;
        slider1.height = 10;
        slider1.center_y = lb.center_y;
        slider1.minValue = 1;
        slider1.value = 6;
        slider1.onValueChanged = (v) =>{
            transView.cssAnimationClear();
            let trans = this.create3DTransForm();
            trans.perspective(100*v);
            transView.transform = trans;
            transView.refresh();
        }

        view = lb;
        lb = new zl.Label();
        this.view.addSubview(lb);
        lb.setFrameSameAs(view);
        lb.text = "perspective-origin-x";
        lb.left = 10;
        lb.top = view.bottom + 10;
        lb.width = 150;
        view = lb;
        let slider2 = new zl.Slider();
        this.view.addSubview(slider2);
        slider2.setFrameSameAs(slider1);
        slider2.left = lb.right + 5;
        slider2.center_y = lb.center_y;
        slider2.minValue = 0.1;
        slider2.maxValue = 10;
        slider2.value = this.m_perspectiveOriginX;
        slider2.onValueChanged = (v) =>{
            transView.cssAnimationClear();
            let trans = this.create3DTransForm();
            trans.perspectiveOrigin(v,this.m_perspectiveOriginY);
            transView.transform = trans;
            transView.refresh();
        }
        view = lb;
        lb = new zl.Label();
        this.view.addSubview(lb);
        lb.setFrameSameAs(view);
        lb.text = "perspective-origin-y";
        lb.left = 10;
        lb.top = view.bottom + 10;
        lb.width = 150;
        view = lb;
        let slider3 = new zl.Slider();
        this.view.addSubview(slider3);
        slider3.setFrameSameAs(slider1);
        slider3.left = lb.right + 5;
        slider3.center_y = lb.center_y;
        slider3.minValue = 0.1;
        slider3.maxValue = 10;
        slider3.value = this.m_perspectiveOriginY;
        slider3.onValueChanged = (v) =>{
            transView.cssAnimationClear();
            let trans = this.create3DTransForm();
            transView.transform = trans;
            transView.refresh();
        }

        view = lb;
        lb = new zl.Label();
        this.view.addSubview(lb);
        lb.setFrameSameAs(view);
        lb.text = "preserve3d";
        lb.left = 10;
        lb.top = view.bottom + 10;
        lb.width = 80;
        view = lb;
        let checkbox = new zl.CheckBox();
        this.view.addSubview(checkbox);
        checkbox.checked = this.m_preserve3d;
        checkbox.left = view.right;
        checkbox.width = 15;
        checkbox.height = 15;
        checkbox.center_y = lb.center_y;
        checkbox.onCheckedChanged = (b)=>{
            transView.cssAnimationClear();
            this.m_preserve3d = b;
            let trans = this.create3DTransForm();
            transView.transform = trans;
            transView.refresh();
        }

        view = lb;
        lb = new zl.Label();
        this.view.addSubview(lb);
        lb.setFrameSameAs(view);
        lb.text = "backfaceVisibility";
        lb.left = 10;
        lb.top = view.bottom + 10;
        lb.width = 130;
        view = lb;
        checkbox = new zl.CheckBox();
        this.view.addSubview(checkbox);
        checkbox.checked = this.m_preserve3d;
        checkbox.left = view.right;
        checkbox.width = 15;
        checkbox.height = 15;
        checkbox.center_y = lb.center_y;
        checkbox.onCheckedChanged = (b)=>{
            transView.cssAnimationClear();
            this.m_backfaceVisibility = b;
            let trans = this.create3DTransForm();
            trans.rotateY(Math.PI);
            transView.transform = trans;
            transView.refresh();
        }
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