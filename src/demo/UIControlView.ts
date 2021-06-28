import * as zl from  "../zlkit/index"
import { ZLTextFieldInputType } from "../zlkit/zlview/ctrl/ZLTextField";

export class UIControlView extends zl.ScrollView
{
    private isInit : boolean = false;
    layoutSubViews()
    {
        super.layoutSubViews?.();
        if (this.isInit === true)
        {
            return
        }

        let viewtop = 10;
        if (true)
        {
            let lb = this.createNameLabel("Label");
            lb.top = viewtop;
            this.addSubview(lb);
            
            let ta = new zl.Label()
            ta.text = "hell       world\n  !!!";
            ta.backgroudColor = "yellow";
            ta.font.bold = true;
            ta.wordWrap = zl.WorkWrapMode.BreakWord;
            ta.setSizeWithSize(ta.sizeThatWidthHeight(500,100));
            ta.top = viewtop;
            ta.left = lb.right + 5;
            this.addSubview(ta);
            
            viewtop = ta.bottom + 30;
        }
        if (true)
        {
            let lb = this.createNameLabel("ImageView");
            lb.top = viewtop;
            this.addSubview(lb);
            
            let ta = new zl.ImageView()
            ta.src = "https://tse2-mm.cn.bing.net/th/id/OIP-C.kHHQNIabX5tSN8rPWFNHpQHaE8?pid=ImgDet&rs=1";
            ta.top = viewtop;
            ta.left = lb.right + 5;
            ta.width = 200;
            ta.height = 160;
            ta.borderRadius = 30;
            this.addSubview(ta);
            
            viewtop = ta.bottom + 30;
        }
        if (true)
        {
            let lb = this.createNameLabel("Button");
            lb.top = viewtop;
            this.addSubview(lb);
            
            let ta = new zl.Button()
            ta.title = "click me";
            ta.onClick = (sender)=>{
                console.log("click me");
            };
            ta.top = viewtop;
            ta.left = lb.right + 5;
            ta.width = 180;
            ta.height = 30;
            this.addSubview(ta);
            
            viewtop = ta.bottom + 30;
        }
        if (true)
        {
            let lb = this.createNameLabel("Textarea");
            lb.top = viewtop;
            this.addSubview(lb);
            
            let ta = new zl.TextArea()
            ta.text = "456\n123\n789\nabc\nefg\nasdfgh\nqwer";
            ta.onInput = (sender)=>{
                console.log(sender.scrollSize?.height);
            };
            ta.top = viewtop;
            ta.left = lb.right + 5;
            ta.width = 180;
            ta.height = 100;
            this.addSubview(ta);
            
            viewtop = ta.bottom + 30;
        }
        if (true)
        {
            let lb = this.createNameLabel("TextField");
            lb.top = viewtop;
            this.addSubview(lb);
            
            let ta = new zl.TextField()
            ta.top = viewtop;
            ta.left = lb.right + 5;
            ta.width = 180;
            ta.height = 24;
            this.addSubview(ta);
            ta.maxLength = 10;
            ta.placeholder = "最多10个字符 ";
            ta.inputType = ZLTextFieldInputType.password;
            ta.onInput = (sender)=>{
                console.log(sender.scrollSize?.height);
            };
            
            viewtop = lb.bottom + 30;
        }
        if (true)
        {
            let lb = this.createNameLabel("RadioButton");
            lb.top = viewtop;
            this.addSubview(lb);
            
            let left = lb.right + 5;
            let rgroup = new zl.RadioGroup()
            for (let i = 0 ; i < 3 ;i ++)
            {
                let btn = new zl.RadioButton(rgroup);
                btn.checked = true;
                btn.left = left;
                btn.top = viewtop;
                btn.width = 15;
                btn.height = 15;
                btn.onCheckedChanged = (b)=>{
                    console.log(b);
                }
                this.addSubview(btn);
                
                left = btn.right + 40;
            }

            viewtop = lb.bottom + 30;
        }

        if (true)
        {
            let lb = this.createNameLabel("CheckBox");
            lb.top = viewtop;
            this.addSubview(lb);
            
            let left = lb.right + 5;
            for (let i = 0 ; i < 3 ;i ++)
            {
                let btn = new zl.CheckBox();
                btn.checked = true;
                btn.left = left;
                btn.top = viewtop;
                btn.width = 15;
                btn.height = 15;
                this.addSubview(btn);
                btn.onCheckedChanged = (b)=>{
                    console.log(b);
                }
                left = btn.right + 40;
            }

            viewtop = lb.bottom + 30;
        }
        
        if (true)
        {
            let lb = this.createNameLabel("Slider");
            lb.top = viewtop;
            this.addSubview(lb);
            
            let ta = new zl.Slider()
            ta.value = 10;
            ta.top = viewtop;
            ta.left = lb.right + 5;
            ta.width = 180;
            ta.height = 10;
            this.addSubview(ta);
            
            viewtop = lb.bottom + 30;
        }

        if (true)
        {
            let lb = this.createNameLabel("SelectOption");
            lb.top = viewtop;
            this.addSubview(lb);
            
            let ta = new zl.SelectOptionView()
            ta.top = viewtop;
            ta.left = lb.right + 5;
            ta.width = 180;
            ta.height = 20;
            this.addSubview(ta);

            ta.addOption("选择1");
            ta.addOption("选择2");
            ta.addOption("选择3");
            ta.selectedIndex = 1;
            ta.onSelectedIndexChanged = v=>{
                console.log(v);
            };
            
            viewtop = lb.bottom + 30;
        }
    }

    createNameLabel(str:string)
    {
        let lb = new zl.Label();
        lb.text = str;
        lb.width = 150;
        lb.height = 20;
        return lb;
    }
}