import * as zl from  "../zlkit/index"


export class SinPage extends zl.ViewPage
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

    viewWillUnmount()
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
