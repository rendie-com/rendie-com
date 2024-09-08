'use strict';
var fun=
{
	win:[800,400],
	a01:function()
	{
    win.ImgChkTime("英雄联盟/英雄/我1.bmp|英雄联盟/英雄/他1.bmp",1,400,this.a02,this);
	}, 
  a02:function(t)
	{
    if(t.indexOf("找图片次数超限")==-1)
		{
      let Aw=254,Ah=206,Qw=950,Qh=785,Ew=462,Eh=382,_4w=842,_4h=694
      eval("let arr="+t);
      window.external.newFrom(0,0);//按位创建【窗体】
      window.external.newDraw(0,0);//按大小创建【画板】
      let w1,h1
      x1=arr[0][0][0]+68//英雄中心X轴
      y1=arr[0][0][1]+143//英雄中心Y轴
      window.external.RotateTransform(x1,y1,-4);//旋转相应的角度(绕当前原点)
      window.external.DrawString("【A】的圆心；X:"+x1+" Y:"+y1,x1,y1)
      window.external.DrawEllipse(x1-10,y1-10,20,20);//画中心点
      window.external.DrawEllipse(x1-parseInt(Aw/2),y1-parseInt(Ah/2),Aw,Ah)//
      ////////////////////////////////////////////////
      let x2=x1-5,y2=y1+63
      window.external.DrawString("【Q】的圆心；X:"+x2+" Y:"+y2,x2,y2)
      window.external.DrawEllipse(x2-10,y2-10,20,20);//画中心点
      window.external.DrawEllipse(x2-parseInt(Qw/2),y2-parseInt(Qh/2),Qw,Qh)//      
      ////////////////////////////////////////////////
      let x3=x1-1,y3=y1+13
      window.external.DrawString("【E】的圆心；X:"+x3+" Y:"+y3,x3,y3)
      window.external.DrawEllipse(x3-10,y3-10,20,20);//画中心点
      window.external.DrawEllipse(x3-parseInt(Ew/2),y3-parseInt(Eh/2),Ew,Eh)//      
      ////////////////////////////////////////////////
      let x4=x1-3,y4=y1+51
      window.external.DrawString("【4】的圆心；X:"+x4+" Y:"+y4,x4,y4)
      window.external.DrawEllipse(x4-10,y4-10,20,20);//画中心点
      window.external.DrawEllipse(x4-parseInt(_4w/2),y4-parseInt(_4h/2),_4w,_4h)//      
      ////////////////////////////////////////////////////
      window.external.RotateTransform(x1,y1,4);//旋转相应的角度(绕当前原点)
      window.external.DrawLine(parseInt(1920/2),0,parseInt(1920/2),1080)
      window.external.DrawLine(0,parseInt(1080/2),1920,parseInt(1080/2))
      /////////////////////////////////////////////////////////////////////
      window.external.showDraw();//显示绘图内容
    }
    else
    {alert(t);}
	}
}
fun.a01();

/*window.external.newFrom(456,139);
		window.external.newDraw(this.win[0],this.win[1]);
		let hudu=1*(Math.PI/180),x1,y1,w,h
		w=100;
		h=100;		
		x1=w*Math.sin(hudu)+w;
		y1=h*Math.sin(hudu)+h;
		window.external.DrawLine(100,100,300,300);
    window.external.DrawRectangle(150,200)//矩形
		window.external.showDraw();//显示绘图内容
    alert("aaaaa")
    window.external.newDraw(this.win[0],this.win[1]);
    window.external.DrawEllipse(0,0,300,300)//矩形
    window.external.showDraw();//显示绘图内容*/
/*
if(this.du<360)
		{this.du=this.du+10;this.a04();}	

	curXY:[],
	win:[838,690],
	LT:[459,139],
	du:0,
	a01:function()
	{
		if(!window.external.getisinit())
		{
			window.external.init();
		}
		window.external.init();
		let wh=(this.win[0]>this.win[1]?this.win[0]:this.win[1]);
		window.external.LOL01(this.LT[0],this.LT[1],wh+2,wh+2);
		window.external.DrawRectangle(wh,wh)//矩形
		window.external.DrawEllipse(0,0,wh,wh);//正圆
		window.external.DrawEllipse(parseInt(wh/2-20),parseInt(wh/2-20),40,40);//正圆圆点
		window.external.TranslateTransform(0,wh/2-this.win[1]/2);//移动椭圆Y坐标
		window.external.RotateTransform(parseInt(wh/2),parseInt(this.win[1]/2),-4);
		window.external.DrawEllipse(0,0,this.win[0],this.win[1]);//椭圆
		window.external.LOL02();
		Tool.Time(this.a02,50,this,"1");
	},
  a02:function()
	{
		if(window.external.IO==83)//按下【S】键
		{
			win.ImgTime("英雄联盟/武器大师/头上.bmp",2,500,this.b01,this)
			window.external.IO=0;
			//this.curXY=[window.external.winX,window.external.winY]
		  //this.a03();
		}
		else{Tool.Time(this.a02,50,this,"1");}
	},
  a03:function()
	{
		str=" ◣50, ◤50".replace(/ /g, " ".charCodeAt())
		window.external.KeyArr(str);
		Tool.Time(this.a04,100,this,"1");
	},
  a04:function()
	{
		let wh=(this.win[0]>this.win[1]?this.win[0]:this.win[1])/2;
		let a=this.curXY[0]-this.LT[0]-wh,b=this.curXY[1]-this.LT[1]-wh//相对屏幕的圆心的【X】与【Y】 的值
		let du01=Math.atan2(a,b)*180/Math.PI;if(du01<0){du01=du01+360;}
		this.du=du01;
		////////////////////////////////////////////////////////////////////////
		let hudu=this.du*(Math.PI/180),x1,y1,w,h,x2,y2
		w=this.win[0]/2;h=this.win[1]/2;		
		x1=w+w*Math.sin(hudu);y1=h+h*Math.cos(hudu);
		x2=wh+wh*Math.sin(hudu);y2=wh+wh*Math.cos(hudu);
		////////////////////////////////////////////////
	  let radian = -0.75* Math.PI / 180;
    let x3 = (x1-w) * Math.cos(radian) + (y1-h) * Math.sin(radian)+w;
    let y3 = (y1-h) * Math.cos(radian) + (x1-w) * Math.sin(radian)+h;
		///////////////////////////////////////////////////		
		//window.external.DrawLine(parseInt(wh),parseInt(wh),parseInt(x3),parseInt(y3+wh-h));//旋转后的椭圆线
		//window.external.DrawLine(parseInt(wh),parseInt(wh),parseInt(x2),parseInt(y2));//正圆线
		//window.external.DrawString(parseInt(this.du),parseInt(x2-10),parseInt(y2-10))//正圆字
		//let du=Math.atan2(x3-w,y3-h)*180/Math.PI;if(du<0){du=du+360;}
		//window.external.DrawString(parseInt(du),parseInt(x3-10),parseInt(y3+wh-h-10))
		window.external.LOL02();
		Tool.Time(this.a05,100,this,"1",[x3+this.LT[0],y3+wh-h+this.LT[1]]);
	},
  a05:function(arr)
	{
		window.external.SetCursorPos(parseInt(arr[0]),parseInt(arr[1]))
		let str="52◣50,52◤50,Q◣50,Q◤50".replace(/Q/g, "Q".charCodeAt())
		window.external.KeyArr(str);
		Tool.Time(this.a02,100,this,"1");		
		//window.external.ClickRight
	},
	b01:function(t)
	{
		alert(t)
	}

function start01(){obj.t=setTimeout('window.external.RightClick(761,482,"start02")',1000);}
function start02(){obj.t=setTimeout('start()',1000);}*/
//function start(){window.external.Comparer("找图片不同/sshot-1.bmp","找图片不同/sshot-2.bmp","找图片不同/sshot.png");}
/*function start(){
	//window.external.ClickRight(500,500)
	//	window.external.sendwinio();
	//keytext("65","fun01()")
	//window.external.Fish();
	//DownKey("65","fun01();",88);	
	
}
*/