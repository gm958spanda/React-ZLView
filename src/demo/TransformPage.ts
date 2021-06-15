import * as zl from  "../zlkit/index"


export class TransformPage extends zl.ViewPage
{
    viewDidLoad()
    {
        super.viewDidLoad?.();
        let transView = new zl.View();
        this.view.addSubview(transView);
        if(true)
        {
            transView.width = 150;
            transView.height = 150;
            transView.center = this.view.center;
            transView.backgroudColor = "yellow";

            let shadow = new zl.BoxShadow();
            shadow.blur = 10;
            shadow.hShadow = 15;
            shadow.vShadow = 15;
            transView.boxShadow = shadow;

            let lb = new zl.Label();
            lb.text = "ZLView";
            let sz = lb.sizeThatWidthHeight(100,100);
            lb.width = sz.width;
            lb.height = sz.height;
            lb.backgroudColor = "red";
            transView.addSubview(lb);
        }

        let btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "translate2d";
        btn.left = 10;
        btn.top = 10;
        btn.width = 80;
        btn.height = 20;
        btn.onClick = ()=>{
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
            transView.transform?.resumeIdentityMatrix();
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
            transView.transform?.resumeIdentityMatrix();
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
        btn.title = "reflect2d";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.onClick = ()=>{
            transView.transform?.resumeIdentityMatrix();
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
        btn.title = "rotateX";
        btn.setFrameSameAs(view);
        btn.left = 10;
        btn.top = view.bottom + 10;
        btn.onClick = ()=>{
            transView.transform?.resumeIdentityMatrix();
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
            transView.transform?.resumeIdentityMatrix();
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
            transView.transform?.resumeIdentityMatrix();
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
            transView.transform?.resumeIdentityMatrix();
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
            transView.transform?.resumeIdentityMatrix();
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
            transView.transform?.resumeIdentityMatrix();
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