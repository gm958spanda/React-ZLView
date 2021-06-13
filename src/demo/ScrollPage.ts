import * as zl from  "../zlkit/index"


export class ScrollPage extends zl.ViewPage
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

