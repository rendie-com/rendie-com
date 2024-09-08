'use strict';
Object.assign(Tool,{
	SubmitPayment:
	{
		obj:{},
		img:{A1:1,A2:0,Aarr:[]},
		a01:function(obj)
		{
			this.obj=obj;
			gg.isRD(this.a02,this);
		},
		a02:function()
		{
			$("#seep4").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>').attr("disabled",true);
			$("#state").html("正在打开激活【手机投屏】...")
			/*
			if(win.towin("scrcpy")=="")
			{
				$("#state").html("可以正常打开")
				Tool.Time(this.a04,0,this,"1");
			}
			else
			{
				$("#state").html("正在建立手机投屏连接...")
				win.Rcmd(".\\scrcpy-win64-v1.17.\\adb devices",this.a03,this);
			}
			*/
		},
		a03:function(t)
		{
			$("#state").html("返加结果："+Tool.pre(t));
			if(t.indexOf(':5555\tdevice')!=-1)
			{
				$("#state").html("连接成功,正在打开投屏...");
				//win.RunWin("cmd")
				win.cmd(".\\scrcpy-win64-v1.17\\scrcpy.exe",this.a04,this);
			}
			else if(t.indexOf(":5555\toffline\r\n\r\n")!=-1)
			{
				alert("连接失败,可能是：没打开【USB调式】...\n-------------------------------------------\n"+t)
			}
			else if(t.indexOf("exit\r\nList of devices attached\r\n\r\n")!=-1)
			{
				$("#state").html("正在建立连接。。。");
				win.Rcmd("cd scrcpy-win64-v1.17\nadb tcpip 5555\nadb connect 10.168.1.234:5555\nadb devices",this.a03,this);
			}
			else
			{
				$("#state").html("连接失败："+Tool.pre(t));
			}
		},
		a04:function()
		{
			$("#state").html("已打开手机投屏。");
			win.newScreenImg("SCMR-AL09",this.a05,this)
		},
		a05:function()
		{
			let p="敦煌网/订单管理_订单信息/"
			let src=p+"购物车/黑色字体cart.bmp|"+p+"购物车/红色字体cart.bmp|"+p+"速通网app1.bmp|"+p+"锁屏.bmp,0,0,0,0,70,0"
			$("#state").html("正在找图【"+src+"】...");
			win.FindImg(src,this.a06,this);  
		},
		a06:function(t)
		{
			if(t=="[[],[],[],[]]")
			{
				win.SaveScreenImg("aaaaaaaaaaa.bmp")
				alert("没有找到图片")
			}
			else
			{
				eval("let arr="+t);
				if(arr.length==4)
				{
					$("#state").html("正在[解锁屏幕]。。。");
					win.Rcmd(".\\scrcpy-win64-v1.17\\adb shell input keyevent 82",this.a07,this);  
				}
				else if(arr.length==3)
				{
					$("#state").html("正在点【SMT app】...");
					win.Rcmd(".\\scrcpy-win64-v1.17\\adb shell input tap "+this.b01(arr[2][0][0])+" "+this.b02(arr[2][0][1]),this.a09,this);  
				}
				else
				{Tool.at(arr);}
			}
		},
		a07:function(t)
		{
			win.Rcmd(".\\scrcpy-win64-v1.17\\adb shell input swipe 500 50 500 600 200",this.a08,this);
		},
		a08:function(t)
		{
			$("#state").html("等待解锁完成。。。");
			Tool.Time(this.a04,1200,this,"1");
		},
		a09:function(t)
		{
			alert("wwwwwwwwwwww"+t)
		},
		b01:function(x)//X轴等比放大
		{
			//1600*2560     606*983
			return parseInt(1600/606*x);
		},
		b02:function(y)//Y轴等比放大
		{
			//1600*2560     606*983
			return parseInt(2560/983*y);
		},
		/*
			//win.SaveScreenImg("aaaaaaaaaaa.bmp")
			//////////////////////////////////////////////////////////////////////////////////////////
			a05:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{$("#state").html(t);}
			else
			{
				eval("let arr="+t)
				if(arr.length==1)
				{
					$("#state").html("找到【黑色字体cart.bmp】正在点击，让它变成【红色字体cart.bmp】。。。");
					win.click(arr[0][0][0],arr[0][0][1],this.a06,this);
				}
				else if(arr.length==2)
				{this.a07();}
				else if(arr.length==3)
				{
					$("#state").html("正在点【app】...");
					win.click(arr[2][0][0],arr[2][0][1],this.a06,this);
				}
				else if(arr.length==4)
				{
					$("#state").html("请手动【解锁屏幕】...");        
				}
				else
				{$("#state").html("未知："+t);}
			}
		},
		a06:function(){Tool.Time(this.a04,500,this,"1");},
		a07:function()//先看它是不是选中状态，好刷新（选中的时后刷新就会变成没选中）
		{
			let src="敦煌网/订单管理_订单信息/购物车/全选.bmp|敦煌网/订单管理_订单信息/购物车/全选中.bmp"
			$("#state").html("（先看它是不是选中状态，好刷新）正在找图【"+src+"】");
			win.ImgTime(src,50,500,this.a08,this,"",30);
		},
		a08:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{$("#state").html(t);}
			else
			{
				eval("let arr="+t);
				if(arr.length==1)
				{
					$("#state").html("正在[点击全选](用于新刷判断)。。。");
					win.click(arr[0][0][0],arr[0][0][1],this.a09,this);
				}
				else
				{$("#state").html("已选中,可以刷新");this.a11(arr[1][0][0],arr[1][0][1]);}
			}
		},
		a09:function()
		{
			let src="敦煌网/订单管理_订单信息/购物车/全选中.bmp"
			$("#state").html("正在找图【"+src+"】");
			win.ImgTime(src,20,300,this.a10,this,"",10);
		},
		a10:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{$("#state").html(t);}
			else
			{
				eval("let arr="+t)
				$("#state").html("已选中,可以刷新");
				this.a11(arr[0][0][0],arr[0][0][1]);
			}
		},
		a11:function(x,y)
		{
			$("#state").html("正在刷新购物车...");
			win.clickLmDown(x,y,this.a12,this);
		},
		a12:function()//
		{
			let src="敦煌网/订单管理_订单信息/购物车/全选.bmp"
			$("#state").html("(能找到说明刷新成功)正在找图【"+src+"】");
			win.ImgTime(src,5,300,this.a13,this,"",10);
		},
		a13:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{
				$("#state").html(t);
				this.a09()//说明刷新失败（从来一次）
			}
			else
			{
				$("#state").html("正在[点击全选]。。。");
				eval("let arr="+t)
				win.click(arr[0][0][0],arr[0][0][1],this.a14,this);
			}
		},
		a14:function()
		{
			let src="敦煌网/订单管理_订单信息/购物车/全选中.bmp"
			$("#state").html("正在找图【"+src+"】");
			win.ImgTime(src,20,300,this.a15,this,"",10);
		},
		a15:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{$("#state").html(t);}
			else
			{
				eval("let arr="+t)
				$("#state").html("已选中,可以下一步");
				this.a16();
			}
		},
		a16:function()
		{
			let p="敦煌网/订单管理_订单信息/购物车/"
			let src=p+"checkOut1.bmp|"+p+"checkOut2.bmp|"+p+"checkOut3.bmp|"+p+"checkOut4.bmp|"+p+"checkOut5.bmp|"+p+"checkOut6.bmp|"+p+"checkOut7.bmp|"+p+"checkOut8.bmp|"+p+"checkOut9.bmp"
			$("#state").html("正在找图【"+src+"】")
			win.ImgTime(src,10,500,this.a17,this,"",30);
		},
		a17:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{$("#state").html(t);}
			else
			{
				eval("let arr="+t)
				if(this.obj.dhOrderItem.length-1==arr.length)
				{
					if(this.obj.MoneyTotal>=12)
					{
						let src="敦煌网/订单管理_订单信息/购物车/优惠券.bmp"
						$("#state").html("正在找图【"+src+"】");
						win.ImgTime(src,1,300,this.a18,this,arr[arr.length-1],20);
					}
					else
					{
						$("#state").html("金额太小，不找【优惠券.bmp】");
						//this.a21(arr[arr.length-1]);
					}
				}
				else
				{
					let title="订单商品与加购物的商不符！"
					$("#state").html(title);
					$("#seep4").html("*(4)").attr("class","btn btn-danger");
					Tool.Modal(title,'订单商品有【'+(this.obj.dhOrderItem.length-1)+'】种商品，而购物车确有【'+arr.length+'】的商品。','<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>','');
				}
			}
		},
		a18:function(t,arr2)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{
				$("#state").html("没有【优惠券】。。。");
				this.a26(arr2);
			}
			else
			{
				eval("let arr1="+t)
				if(arr1[0].length==1)
				{
					win.click(arr1[0][0][0]+10,arr1[0][0][1],this.a19,this,arr2);//进入【优惠券】页面
				}
				else
				{
					alert("有多个店要点【优惠券】，没做。")
				}      
			}
		},
		a19:function(arr2)
		{
			let src="敦煌网/订单管理_订单信息/购物车/优惠券/Get Now.bmp"
			$("#state").html("正在找图【"+src+"】");
			win.ImgTime(src,10,400,this.a20,this,arr2,100);
		},
		a20:function(t,arr2)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{
				$("#state").html("没有【优惠券】可点");
				//this.a19(arr2);
			}
			else
			{
				eval("let arr1="+t)
				this.img.A1=1;
				this.img.A2=arr1[0].length;
				this.img.Aarr=arr1[0];
				this.a21(arr2);
			}
		},
		a21:function(arr2)
		{
			if(this.img.A1<=this.img.A2)
			{
				$("#state").html("正在点【优惠券】。。。");
				let arr1=this.img.Aarr[this.img.A1-1]
				win.click(arr1[0]+30,arr1[1]+5,this.a22,this,arr2);//点【优惠券】
			}
			else
			{
				this.a23(arr2);
			}
		},
		a22:function(arr2)
		{
			this.img.A1++;
			Tool.Time(this.a21,800,this,"1",arr2);
		},
		a23:function(arr2)
		{
			let src="敦煌网/订单管理_订单信息/购物车/优惠券/关闭.bmp"
			$("#state").html("正在找图【"+src+"】");
			win.ImgTime(src,1,300,this.a24,this,arr2,30);
		},
		a24:function(t,arr2)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{$("#state").html(t);}
			else
			{
				eval("let arr1="+t)
				win.click(arr1[0][0][0],arr1[0][0][1],this.a25,this,arr2);//点【优惠券/关闭】
			}
		},
		a25:function(arr2)
		{
			$("#state").html("等关闭动画结束,就是点【CHECK OUT】...");
			Tool.Time(this.a26,200,this,"1",arr2);//等关闭动画结束
		},
		a26:function(arr2)
		{
			$("#state").html("正在点【CHECK OUT】");
			win.click(arr2[0][0],arr2[0][1],this.a27,this);
		},
		a27:function()
		{
			$("#state").html("等1秒点后，再去找图。");
			Tool.Time(this.b01,1000,this,"1");
		},
		b01:function()
		{
			let p="敦煌网/订单管理_订单信息/购物车/Order Confirmation/"
			let src=p+"webmoney.bmp|"+p+"卡尾7158.bmp|"+p+"visa.bmp|"+p+"卡尾7382.bmp"
			$("#state").html("正在找图【"+src+"】");
			win.ImgTime(src,10,300,this.b02,this,"",100);
		},
		b02:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{$("#state").html(t);}
			else
			{
				eval("let arr="+t);
				if(arr.length==1||arr.length==2)
				{
					alert("aaaa")
					//this.b03();
				}
				else if(arr.length==3)
				{
					alert("bbbbb")
					//this.f01(arr[2]);
				}//要改成webmeny付
				else if(arr.length==4)
				{
					alert("ccc")
					//this.f01(arr[3]);
				}//要改成卡尾7158付
				else{$("#state").html("异常");}
			}
		},
		b03:function()
		{
			let Remark=[],bool=false;
			for(let i=1;i<this.obj.dhOrderItem.length;i++)
			{
				Remark.push(this.obj.dhOrderItem[i].Remark);
				if(this.obj.dhOrderItem[i].Remark){bool=true;}
			}
			if(bool)
			{
				$("#state").html("正在填备注。。。")
				win.Copy(Remark[0]);
				Remark.shift();      
				this.c01(Remark)
			}
			else
			{this.b04();}//看运费
		},
		b04:function()//看运费
		{
			let src="敦煌网/订单管理_订单信息/购物车/Order Confirmation/免运费.bmp"
			$("#state").html("正在找图【"+src+"】");
			win.ImgTime(src,3,300,this.b05,this);
		},
		b05:function(t)//看运费
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{this.b10(0);}//没有【免运费.bmp】
			else
			{
				eval("let arr="+t);
				if(arr[0].length==this.obj.dhOrderItem.length-1)//如果DH的商品种数，跟【免运费.bmp】的数量相同，说明SMT就是免运费。
				{
					if(this.obj.ChargeDeliver==0)
					{
						//this.b06();
						this.b12(arr[0].length,arr[0].length,0);
					}
					else
					{this.b12(arr[0].length,arr[0].length,0);}//有运费
				}
				else
				{this.b10(arr[0].length);}
			}
		},
		b06:function()//提交的图片，有俩个
		{
			let src="敦煌网/订单管理_订单信息/购物车/Order Confirmation/buy now.bmp"
			$("#state").html("正在找图【"+src+"】");
			win.ImgTime(src,40,500,this.b07,this);
		},
		b07:function(t)//提交
		{
			if(t.indexOf("找图片次数超限")!=-1){alert(t);}else
			{
				eval("let arr="+t);
				$("#state").html("正在点【buy now】。。。");
				win.click(arr[0][0][0],arr[0][0][1],this.d01,this);//点【buy now】
			}
		}, 
		b08:function()
		{
			$("#seep4").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>')
			Tool.Time(this.b08A,200,this,"1");//消抖
		},
		b08A:function()
		{
			win.ImgTime("敦煌网/订单管理_订单信息/夜神-托盘.bmp",2,300,this.b09,this);
		},
		b09:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{alert(t);}
			else
			{eval("let arr="+t);win.click(arr[0][0][0],arr[0][0][1],this.b06,this);}
		},
		b10:function(num2)
		{
			let src="敦煌网/订单管理_订单信息/购物车/Order Confirmation/收运费.bmp"
			$("#state").html("正在找图【"+src+"】");
			win.ImgTime(src,3,300,this.b11,this,""+num2);
		},
		b11:function(t,num2)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{this.b12(num2,0,num2);}
			else
			{
				eval("let arr="+t);
				let num1=arr[0].length;
				this.b12((parseInt(num2)+num1),num2,num1);
			}
		},
		b12:function(num1,num2,num3)//有运费
		{
			let title="运费异常"
			$("#state").html(title);
			$("#seep4").html("*(4)").attr("class","btn btn-danger");
			Tool.Modal(title,"敦煌网运费：共"+(this.obj.dhOrderItem.length-1)+"个，$"+this.obj.ChargeDeliver+" ("+this.obj.DeliverType+")，订单实收：US $"+this.obj.MoneyTotal+"<br/>速卖通运费：共"+num1+"个，"+num2+"个免运费，"+num3+"个收运费",'<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="SubmitPayment.b08()" data-bs-dismiss="modal">忽略提示【继续】</button>','');
		},
		//////////////////////////////////////////////////////////////
		c01:function(Remark)//填备注
		{  
			let src="敦煌网/订单管理_订单信息/购物车/Order Confirmation/商品备注.bmp"
			$("#state").html("正在找图【"+src+"】");
			win.ImgTime(src,3,300,this.c02,this,Remark);
		},
		c02:function(t,Remark)//填备注
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{alert(t);}
			else
			{
				$("#state").html("点【商品备注.bmp】");
				eval("let arr1="+t);
				win.click(arr1[0][0][0]+135,arr1[0][0][1],this.c03,this,Remark);
			}
		},
		c03:function(arr){Tool.Time(this.c04,100,this,"1",arr);},
		c04:function(arr)//填备注
		{
			win.KeyArr("162◣50,86◣50,86◤50,162◤50")
			Tool.Time(this.c05,250,this,"1",arr);
		},
		c05:function(Remark)//填备注
		{
			if(Remark.length==0&&this.obj.dhOrderItem.length==2)
			{this.b04();}
			else
			{
				let title="【商品备注】无法确定"
				$("#state").html(title);
				$("#seep4").html("*(4)").attr("class","btn btn-danger");
				Tool.Modal(title,"注：商品备注只填了第一个，但不一定正确。<br/>因为：当多个商品有备注时，无法确定是哪一个商品的备注。",'<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="SubmitPayment.c06()" data-bs-dismiss="modal">忽略提示【继续】</button>','');
			}
		},
		c06:function()
		{
			$("#seep4").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>')
			Tool.Time(this.c07,200,this,"1");//消抖
		},
		c07:function()
		{
			win.ImgTime("敦煌网/订单管理_订单信息/夜神-托盘.bmp",2,300,this.c08,this);
		},
		c08:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{alert(t);}
			else
			{eval("let arr="+t);win.click(arr[0][0][0],arr[0][0][1],this.b04,this);}
		},
		////////////////////////////////////////////////////////////////////////////////////////
		d01:function()
		{
			let src="敦煌网/订单管理_订单信息/购物车/关闭.bmp|敦煌网/订单管理_订单信息/购物车/返回.bmp|敦煌网/订单管理_订单信息/速通网app.bmp"
			$("#state").html("正在找图【"+src+"】");
			win.ImgTime(src,30,300,this.d02,this);
		},
		d02:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{$("#state").html(t);}
			else
			{
				eval("let arr="+t);
				if(arr.length==1)
				{win.click(arr[0][0][0]+540,arr[0][0][1]+820,this.d01,this);}
				else if(arr.length==2)
				{win.click(arr[1][0][0],arr[1][0][1],this.d03,this);}//点返回/点关闭
				else if(arr.length==3)
				{
					$("#seep4").html("*(4)");
					$("#state").html("已提交待付");
					fun.c16();
				}
				else
				{$("#state").html("异常");}
			}
		},
		d03:function(){Tool.Time(this.d01,400,this,"1");},//点返回,要多点几点才能到购物车页面
		////////////////////////////////////////////////////////////////////
		e01:function()
		{
			let src="敦煌网/订单管理_订单信息/夜神-托盘.bmp"
			$("#state").html("正在找图【"+src+"】...");
			win.ImgTime(src,10,200,this.e02,this);
		},
		e02:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{alert(t);}
			else
			{eval("let arr="+t);win.click(arr[0][0][0],arr[0][0][1],this.e03,this);}
		},
		e03:function()
		{
			let src="敦煌网/订单管理_订单信息/速通网app.bmp"
			$("#state").html("正在找图【"+src+"】...");
			win.ImgTime(src,40,500,this.e04,this);
		},
		e04:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{alert(t);}
			else
			{eval("let arr="+t);win.click(arr[0][0][0],arr[0][0][1],this.e05,this);}
		},
		e05:function()
		{
			let src="敦煌网/订单管理_订单信息/购物车/黑色字体cart.bmp|敦煌网/订单管理_订单信息/速通网app.bmp"
			$("#state").html("正在找图【"+src+"】...");
			win.ImgTime(src,50,500,this.e06,this);
		},
		e06:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{alert(t);}
			else
			{
				eval("let arr="+t);
				if(arr.length==1)
				{win.click(arr[0][0][0],arr[0][0][1],this.e07,this);}
				else if(arr.length==2){win.click(arr[1][0][0],arr[1][0][1],this.e05,this);}
			}
		},
		e07:function()
		{
			let src="敦煌网/订单管理_订单信息/购物车/全选中.bmp|敦煌网/订单管理_订单信息/购物车/全选.bmp|敦煌网/订单管理_订单信息/等待.bmp"
			$("#state").html("正在找图【"+src+"】...（如果能【全选中】，说明购物车页面已经打开。）");
			win.ImgTime(src,50,500,this.e08,this);
		},
		e08:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1)
			{alert(t);}
			else
			{
				eval("let arr="+t);
				if(arr.length==1)
				{
					$("#state").html("正在刷新购物车");
					win.clickLmDown(arr[0][0][0],arr[0][0][1]-500,this.a09,this);
				}
				else if(arr.length==2){win.click(arr[1][0][0],arr[1][0][1],this.e09,this);}
				else if(arr.length==3){win.click(arr[2][0][0],arr[2][0][1],this.e09,this);}
			} 
		},
		e09:function()
		{
			$("#state").html("等1秒钟。。。")
			Tool.Time(this.e07,1000,this,"1");
		},
		///////////////////////////////////////////////////////////////////////////////
		f01:function(arr){win.click(arr[0][0],arr[0][1],this.f02,this);},//要改成other付
		f02:function(){Tool.Time(this.f03,1000,this,"1");},
		f03:function()
		{
			let src="敦煌网/订单管理_订单信息/购物车/Order Confirmation/webmoney.bmp|敦煌网/订单管理_订单信息/购物车/Order Confirmation/卡尾7158.bmp"
			$("#state").html("正在找图【"+src+"】...");
			win.ImgTime(src,5,500,this.f04,this);
		},
		f04:function(t)
		{
			if(t.indexOf("找图片次数超限")!=-1){alert(t);}
			else
			{
				eval("let arr="+t);
				if(arr.length==1)
				{
					win.click(arr[0][0][0],arr[0][0][1],this.f05,this);
				}
				else if(arr.length==2)
				{
					win.click(arr[1][0][0],arr[1][0][1],this.f05,this);
				}
				else
				{
					alert("到不了这")
				}      
			}
		},
		f05:function()
		{
			Tool.Time(this.b01,500,this,"1");
		}
		*/
	}
})