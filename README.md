# ZLView
ZLView base react , super and sub  , coordinate by  x-y-width-height；基于react的视图，使用x-y-width-height坐标系



[toc]

## 示例

绘制正弦曲线
![](./readme/1.png)
<!-- ![image](https://github.com/gm958spanda/ZLView/raw/main/readme/1.png) -->

```ts
class App extends React.Component
{
    private appView : ZLView | undefined;
    render()
    {
        if(this.appView === undefined)
        {
            this.appView = new ZLView();
            this.appView.x = 200;
            this.appView.y = 100;
            this.appView.width = 1000;
            this.appView.height = 50;
            this.appView.backgroudColor = "white";

            let colors = ["red","blue","gredd"];
            for (let i = 0 ; i < 999; i ++)
            {
                let sub = new ZLView();
                sub.x = i;
                sub.y = Math.sin(i / 3.14) * 15 + this.appView.height / 2;
                sub.width = 3;
                sub.height = 3;
                sub.backgroudColor = colors[i %3];
                this.appView.addSubview(sub);
            }
        }
        // 也可以直接返回 this.appView.reactElement();
        // return  this.appView.reactElement();
        return (
            <div className="App">
                <header className="App-header">
                    {this.appView.reactElement()}
                </header>
            </div>
        );
    }
}
```

## ZLView的坐标系统

一个ZLView对应一个`React Component`，也可说是对`React Component`的封装；ZLView采用固定CSS样式，将`position`设置为`absolute`，然后设置`left/right/widht/height`。当然ZLView对此作了封装：

| 属性     | 含义                                      |
| -------- | ----------------------------------------- |
| x        | 以父视图左上定点为原点的坐标系中，x轴位置 |
| y        | 以父视图左上定点为原点的坐标系中，y轴位置 |
| width    | 宽度                                      |
| height   | 高度                                      |
| left     | 同x                                       |
| right    | x+width                                   |
| top      | 同y                                       |
| bottom   | y+height                                  |
| center_x | (x+width)/2                               |
| center_y | (y+height)/2                              |
| center   | (center_x,center_y)                       |

## ZLView的生命周期

源自React Component的生命周期

| 方法            | 含义                       |
| --------------- | -------------------------- |
| viewDidMount    | React.componentDidMount    |
| viewWillUnMount | React.componentWillUnmount |
