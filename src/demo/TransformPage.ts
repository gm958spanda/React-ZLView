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
            transView.width = 200;
            transView.height = 100;
            transView.center = this.view.center;
            transView.backgroudColor = "yellow";

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
        btn.title = "translate";
        btn.left = 10;
        btn.top = 10;
        btn.width = 80;
        btn.height = 20;
        btn.addOnClickEventCallback(()=>{
            let trans = new zl.Transform();
            trans.translate(100,100);
            transView.cssAnimation({
                to:()=>{
                    transView.transform = trans;
                },
                duration:3000,
                iterationCount:"infinite"
            });
        });

        let view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "rolate";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.addOnClickEventCallback(()=>{
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
        });

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "skew";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.addOnClickEventCallback(()=>{
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
        });

        view = btn;
        btn = new zl.Button();
        this.view.addSubview(btn);
        btn.title = "reflect";
        btn.setFrameSameAs(view);
        btn.left = view.right + 10;
        btn.addOnClickEventCallback(()=>{
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
        });
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