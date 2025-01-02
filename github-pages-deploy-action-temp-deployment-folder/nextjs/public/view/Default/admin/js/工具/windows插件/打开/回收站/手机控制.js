'use strict';
var fun={
  obj:{A1:1,A2:0,Aarr:[],overtime:5},
  a01:function()
  {
    let html=Tool.header('已打开动作【手机控制】')+'\
		<div class="p-2">\
		<table class="table table-hover align-middle">\
		<tr><td class="w150 right">说明：</td><td colspan="2">支持多台设备同时连接，同时操作。</td></tr>\
		<tr><td class="w150 right">设备名称：</td><td id="name" colspan="2"></td></tr>\
		<tr><td class="right">设备进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		<tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
		<tr>\
      <td class="right">ADB命令：</td>\
			<td colspan="2">\
				<div class="input-group">\
					<input type="text" class="form-control" value=".\\scrcpy-win64-v1.24\\adb devices" id="ADBCMD">\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c01();">执行命令</button>\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c09();">原始CMD</button>\
				</div>\
			</td>\
    </tr>\
		<tr><td class="right">返回结果：</td><td colspan="2"><textarea id="return" class="form-control" rows="10"></textarea></td></tr>\
    <tr>\
			<td class="right">命令帮助：</td>\
			<td colspan="2">\
				<table class="table table-hover">\
					<tr><td class="w400">adb shell screencap /sdcard/yyyyy.png</td><td>截图</td></tr>\
					<tr><td>adb pull /sdcard/yyyyy.png img/yy.png</td><td>复制到电脑</td></tr>\
					<tr><td>adb -s 127.0.0.1:62001 shell wm size</td><td>返回屏幕分辨率</td></tr>\
					<tr><td>adb version</td><td>返回当前版本</td></tr>\
					<tr><td>cd scrcpy-win64-v1.24</td><td>下一级目录</td></tr>\
					<tr><td>adb start-server</td><td>重启adb</td></tr>\
					<tr><td>adb devices</td><td>重启adb</td></tr>\
				</table>\
    </td>\
    </tr>\
		</table>\
		</div>'
		Tool.html(null,null,html);
  },
  b01:function(t)//翻译成中文
  {
		if(t.indexOf('\tdevice\r\n')!=-1)t=t.replace(/\tdevice\r\n/g,'\t设备状态正常\r\n');
		if(t.indexOf('\tunauthorized\r\n')!=-1)t=t.replace(/\tunauthorized\r\n/g,'\t未经授权\r\n');
		return t;
  },
  c01:function()
  {
    let str=$("#ADBCMD").val();
    win.runCmd(str,this.c02,this);
  },
  c02:function(t)
  {
		let str=t.substr(t.length-28);
		t=this.b01(t)
		if(str=="List of devices attached\r\n\r\n")
		{
			Tool.Modal("提示","<p>电脑还没有与手机连接，请用USB线连接。<p>",'<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>','')
		}
    else if(t.indexOf('\t设备状态正常\r\n')!=-1)
    {
      this.c03(t);
		}
    else if(t.indexOf('\t未经授权\r\n')!=-1)
    {
			Tool.Modal("提示","<p>还没得到手机的同意，请在手机上【允许USB调式】。<p>",'<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>','')
    }
		else
		{
			pre(t)
			//Tool.Modal("提示","<p>未知错误<p>",'<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>','')
		}
		$("#return").html(t);
  },
  c03:function(t)
  {
    let str="",val1=Tool.StrSlice(t,'List of devices attached\r\n','\r\n\r\n');
    let arr=val1.split("\r\n"),val2
    for(let i=0;i<arr.length;i++)
    {
      val2=arr[i].split("\t")[0];
      this.obj.Aarr.push(val2);
      str+="<b>"+(i+1)+'.</b>【'+val2+'】 ； '
    }
    this.obj.A2=this.obj.Aarr.length;
    $("#name").html(str+'<button type="button" class="btn btn-secondary" onclick="fun.c04()">*执行向上划动操作</button>');
	},
  c04:function()
  {
  	Tool.x1x2("A", this.obj.A1, this.obj.A2, this.c05,this,this.c07)
  },
  c05:function()
  {
		$("#name").html(this.obj.Aarr[this.obj.A1-1]);
		let str=".\\scrcpy-win64-v1.24\\adb -s "+this.obj.Aarr[this.obj.A1-1]+" shell wm size"//
		$("#ADBCMD").val(str)
		$("#state").html("正在获取【屏幕分辨率】...");
    win.runCmd(str,this.c06,this);
  },
  c06:function(t)
  {
		$("#return").html(t);
    if(t.indexOf('Physical size: ')==-1)
    {
      $("#state").html("获取屏幕分辨率失败：3秒后继续。。。");
      //Tool.Time(this.c04,3000,this,"2");
    }
    else
    {
      let arr=(t.split('Physical size: ')[1]).split("x")
      let w=parseInt(arr[0]),h=parseInt(arr[1]);
      let str=".\\scrcpy-win64-v1.24\\adb -s "+this.obj.Aarr[this.obj.A1-1]+" shell input swipe "+(w/4)+" "+(h-h*0.25)+" "+w+" "+(h*0.15)+" 200"
			$("#ADBCMD").val(str)
      $("#state").html("正在向上划动。。。");
      this.obj.A1++
      win.runCmd(str,this.c07,this);
    }
  },
  c07:function(t)
  {
		$("#return").html(t);
		this.c08()
  },
  c08:function()
  {
    $("#state").html("软件在【"+this.obj.overtime+"秒】后，从新向上划动。");
    this.obj.overtime--;
    if(this.obj.overtime==0)
    {
			this.obj.overtime=5;
      this.obj.A1=1;
      this.c04();
    }
    else
    {Tool.Time(this.c08,1000,this,"2");}    
  },
	c09:function()
  {
     win.RunWin("cmd");
  }
}
fun.a01();
/*
  ---------------------------------------------------------------------------------
  a02:function()
  {
    this.phone[0].A2=this.phone.length-1;
    this.b01(this.phone[0]);
    win.Rcmd("cd scrcpy-win64-v1.24\nadb devices",this.a03,this);
  },
  a03:function(t)
  {
    let str="",oo=this.phone[0]
    $("#state").html("连接状态结果如下：\n"+t);
    if(t.indexOf(this.phone[oo.A1].ip+'\tdevice')!=-1)
    {
      this.a04();
    }
    else if(t.indexOf(this.phone[this.phone[0].A1].ip)==-1)
    {
      str="cd scrcpy-win64-v1.24\nadb connect "+this.phone[this.phone[0].A1].ip+"\nadb devices"
      $("#state").html("正在建立连接。。。\n"+str);
      win.Rcmd(str,this.a03,this);
    }
    else
    {
      $("#state").html("连接失败：\n"+t);
    }
  },
  
  ----------------------------------------------------------------------
  
  a06:function(t)
  {
    $("#state").html("向上划动结果：\n"+t);
    this.phone[0].A1++;
    if(this.phone[0].A1<=this.phone[0].A2&&this.phone[0].isbool)
    {
      this.a02();
    }
    else if(this.phone[0].A1<=this.phone[0].A2)
    {
      this.a04();
    }
    else
    {
      this.phone[0].A1=1;
      this.phone[0].isbool=false;
      this.a07();
    }
  },
  
  b01:function(oo)
  {
  },
  *//*
    {A1:1,A2:0,num:6,isbool:true,w:0,h:0},
    {ip:"127.0.0.1:62001",name:"夜神-1683"},
    {ip:"127.0.0.1:62025",name:"夜神-8013"},
    {ip:"127.0.0.1:62026",name:"夜神-6030"},
    {ip:"127.0.0.1:62027",name:"夜神-1681"},
    {ip:"10.168.1.191:5555",name:"OPPO-6030"},
    {ip:"10.168.1.173:5555",name:"红米-8013"},
    {ip:"10.168.1.180:5555",name:"华为-1682"},
    {ip:"10.168.1.196:5555",name:"小米9SE-1681"},
    {ip:"10.168.1.234:5555",name:"平板-1683"}
  

let arr=[this.phone[0]],This=this
    $("input[name=checkbox1]:checked").each(function(){
      let ii=parseInt($(this).val());
      arr.push(This.phone[ii])
    });
    this.phone=arr;
    win.isRD(this.a02,this);
*/
      //////////////////////////////////////////////////////////////////
      //str="cd scrcpy-win64-v1.24\nscrcpy -s "+this.phone[this.phone[0].A1].ip+" -m 320 --turn-screen-off"//
      //$("#state").html("连接成功,正在打开投屏...\n---------------------------\n"+str+"\n--------------------------------------------\n"+t);
      //win.RunWin("cmd")
      //win.cmd(str,this.a04,this);
      ///////////////////////////////////////////////////////
