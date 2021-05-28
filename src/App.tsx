import React from 'react';
import './App.css';
import { ZLView } from "./zlkit/zlview/ZLView"
import { ZLScrollView } from "./zlkit/zlview/ZLScrollView"
import { ZLLabel } from "./zlkit/zlview/ZLLabel"
import { ZLTextAlignMode } from './zlkit/zlview/ZLUIDef';

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
            this.appView.width = 300;
            this.appView.height = 300;
            this.appView.backgroudColor = "white";

            
            let scrollView = new ZLScrollView();
            this.appView.addSubview(scrollView);
            
            scrollView.width = 200;
            scrollView.height = 200;
            scrollView.backgroudColor = "red";
            // scrollView.alwaysShowScrollIndicatorX = false;
            // scrollView.alwaysShowScrollIndicatorY = true;
            scrollView.hiddenScrollBar = true;
            
            for (let i = 0 ; i < 15 ; i++)
            {
                let lb = new ZLLabel()
                lb.clipToBounds = true;
                lb.text = "hello world " + i.toString();
                lb.textAlign = ZLTextAlignMode.Right;
                lb.width = 200;
                lb.height = 30;
                lb.x = 0;
                lb.y = i * 40;
                lb.backgroudColor = 'blue';
                
                scrollView.addSubview(lb);
            }
            setInterval(()=>{

                scrollView.scrollTo(0, scrollView.contentOffSetY + 10);
            },1000)
        }

        return (
            <div className="App">
                <header className="App-header">
                    {this.appView.reactElement()}
                </header>
            </div>
        );
    }
}

export default App;
