# ZLView
ZLView base react , super and sub  , coordinate by  x-y-width-height；基于react的视图，使用x-y-width-height坐标系


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

### ZLView的尺寸单位

支持`px`和`rem`两种，默认使用`px`单位。
可以设置`ZLCurrentSizeUnit`值来改变尺寸单位。另外，px和rem的换算，默认使用`1rem=16px`，也可以修改`ZLCurrentSizeUnitOneRemToPx`来改变这个换算比例.

## ZLView的生命周期

源自React Component的生命周期

| 方法            | 含义                       |
| --------------- | -------------------------- |
| viewDidMount/addListenViewDidMount/removeListenViewDidMount    | React.componentDidMount    |
| viewWillUnmount/addListenViewWillUnMount/removeListenViewWillUnMount | React.componentWillUnmount |


## ZLRouter路由 

封装`react-router-dom`。引入页面概念`ZLViewPage`，一个路由对应一个页面，采用严格模式匹配路由的`path`

```ts
import * as zl from  "./zlkit/index"

class HomePage extends zl.ViewPage
{
    viewDidLoad()
    {
        super.viewDidLoad();
        this.view.backgroudColor = "red";
    }

    viewDidMount()
    {
        setTimeout(()=>{
            this.router?.push("/other");
        },5000);
        console.log( this.constructor.name + " mount");
    }

    viewWillUnmount()
    {
        console.log( this.constructor.name + " unmount");
    }
}

class OtherPage extends zl.ViewPage
{
    viewDidLoad()
    {
        super.viewDidLoad();
        this.view.backgroudColor = "blue";
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

class App extends React.Component
{
    private router: zl.Router | undefined;
    render()
    {
        if (this.router === undefined) {
            this.router = new zl.Router();
            this.router.registRoute("/",HomePage);
            this.router.registRoute("/other", OtherPage);
        }
        return this.router.reactElement();
    }
}
 ```

### 注册路由

```ts
import * as zl from  "./zlkit/index"

let router = new zl.Router();
router.registRoute("/",HomePage);
router.registRoute("/other",OtherPage);
```

### 路由跳转

```ts
router.push("/other");
router.replace("/");
```

## 动画

简单封装了CSS动画，直接作用在ZLView上

```ts

import * as zl from  "./zlkit/index"

/**
 * 开启一个3秒动画
 * 尺寸从(100,200)变化到（200，100）
 * 背景色从red到yellow
 * 动画曲线使用cubic-bezier（1,0,0,1)
 */

let view = new zl.View()
view.width = 100;
view.height = 200;
view.backgroudColor = "red";

view.cssAnimation({to:()=>{
            view.backgroudColor = "yellow";
            view.x = 100;
            view.width = 200;
            view.height = 100;
        },
            duration:3000,
            timingFunction:zl.CSSAnimationTimingFunction.cubicBezier,
            cubicBezierValue:[1,0,0,1],
            end:()=>{
                console.log("animation end");
            }
});
```