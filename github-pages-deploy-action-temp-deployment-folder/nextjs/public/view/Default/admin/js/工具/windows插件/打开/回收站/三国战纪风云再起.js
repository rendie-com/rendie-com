'use strict';
var fun=
{
  isLeft:false,//是否【向左攻击】
  isLock:true,//是否解锁
  combo1:0,//按扭1
	combo2:0,//按扭2
	combo3:0,//按扭3
	Arr:[],
  a01:function()
  {
		let oo=Tool.obj.code?Tool.obj.code:this.b08();
    this.combo1=this.b09(oo.combo1)//写在这里可保时间函数执行的内容少一点
    this.combo2=this.b09(oo.combo2)
    this.combo3=this.b09(oo.combo3)
    Tool.body(
			this.b02(oo)+//按键
			this.b03(oo));//连招;  
  },
  b02:function(oo)//按键
  {
    return '\
		<table class="table align-top">\
			<thead class="table-light"><tr><td colspan="2">设置参数</td></tr></thead>\
      <tbody>\
				<tr><td class="w-25">'+this.b11(oo)+'</td><td>'+this.b12(oo)+'</td></tr>\
			</tbody>\
    </table>'
  },
  b03:function(oo)
  { 
    ///////【诸葛亮】//////////////////////////////////////////////////////////////////
    let arr=[
      "A◣100,A◤100,A◣100,A◤",//AA
      "A◣100,A◤100,A◣100,A◤100,A◣100,A◤",//AAA
      "↓◣20,→◣20,A◣20,↓◤20,→◤20,A◤",//↓↘→ A
      "←◣20,←◤20,→◣20,D◣20,→◤20,D◤",//D（换剑）
      "→◣20,→◤40,→◣20,A◣100,→◤20,A◤"//→ → A
    ]
    this.Arr[0]=[];
    //1.【0~24级】【8连】 →→A+AA+→→A+AAA+↓↘→A
    this.Arr[0][0]=arr[4]+"100,"+arr[0]+"650,"+arr[4]+"100,"+arr[1]+"850,"+arr[2]+"1700"
    //1.【0~24级】【9连】AA+→→A+AAA+↓↘→A+↓↘→A
    this.Arr[0][1]=arr[0]+"650,"+arr[4]+"100,"+arr[1]+"950,"+arr[2]+"700,"+arr[2]+"1700"
    //2.【0~24级】【9连】AA+          →→A+AAA+      D（换剑）       +↓↘→A+      ↓↘→A
    this.Arr[0][2]=arr[0]+"650,"+arr[4]+"100,"+arr[1]+"530,"+arr[3]+"310,"+arr[2]+"670,"+arr[2]+"1700"
    ///////////////////////////////////////////////////////////////////////////////////////////
    return '\
		<table class="table align-top">\
			<thead class="table-light"><tr><td colspan="2">连招</td></tr></thead>\
      <tbody>\
				<tr>\
					<td class="right">\
						<input type="radio" class="custom-control-input" name="pre_id" value="1" onchange="fun.c08(1)" '+(oo.A1==1?'checked="checked"':'')+' id="radio1">\
						<label class="custom-control-label" for="radio1">【诸葛亮】连招</label>\
					</td>\
					<td>\
						<div '+(oo.A1==1?'':'style="display:none;"')+'>\
							<select onchange="fun.c09(this.options[this.selectedIndex].value)" class="form-select">\
								<option value="1" '+(oo.B1==1?'selected="selected"':'')+'>1.【0~24级】【8连】→→A+AA+→→A+AAA+↓↘→A</option>\
								<option value="2" '+(oo.B1==2?'selected="selected"':'')+'>2.【0~24级】【9连】AA+→→A+AAA+↓↘→A+↓↘→A</option>\
								<option value="3" '+(oo.B1==3?'selected="selected"':'')+'>3.【0~24级】【9连】AA+→→A+AAA+D（换剑）+↓↘→A+↓↘→A</option>\
							</select>\
						</div>\
					</td>\
				</tr>'+
				this.b04(oo)+//【白甲黄忠】连招
				this.b05(oo)+//【张飞】连招
				this.b06(oo)+
				'<tr><td class="right">参考资料：</td><td><a href="http://kovsh.gotvg.com/kovsh/property/2013/1214/143.html" target="_blank" class="">许褚终极连招分析</a></td></tr>\
			</tbody>\
    </table>';
  },
  b04:function(oo)
  {
    this.Arr[1]=[];
    return '\
		<tr>\
			<td class="right">\
				<input type="radio" class="custom-control-input" name="pre_id" value="2" onchange="fun.c08(2)" '+(oo.A1==2?'checked="checked"':'')+' id="radio2">\
				<label class="custom-control-label" for="radio2">【白甲黄忠】连招</label>\
			</td>\
			<td>\
				<div '+(oo.A1==2?'':'style="display:none;"')+'>\
					<select onchange="fun.c09(this.options[this.selectedIndex].value)" class="form-select center">\
					<option value="1" '+(oo.B1==1?'selected="selected"':'')+'>1.【0~24级】【9连】AA+→→A+AAA+↓↘→A+↓↘→A</option>\
					<option value="2" '+(oo.B1==2?'selected="selected"':'')+'>4.【0~24级】【9连】AA+→→A+AAA+D（换剑）+↓↘→A+↓↘→A</option>\
					</select>\
				</div>\
			</td>\
    </tr>';
  },
  b05:function(oo)//【张飞】连招
  {
    this.Arr[2]=[];
    return '\
		<tr>\
			<td class="right">\
				<input type="radio" class="custom-control-input" name="pre_id" value="3" onchange="fun.c08(3)" '+(oo.A1==3?'checked="checked"':'')+' id="radio3">\
				<label class="custom-control-label" for="radio3">【张飞】连招</label>\
			</td>\
			<td>\
				<div '+(oo.A1==3?'':'style="display:none;"')+'>\
				<select onchange="fun.c09(this.options[this.selectedIndex].value)" class="form-select center">\
					<option value="1" '+(oo.B1==1?'selected="selected"':'')+'>1.【0~24级】【9连】AA+→→A+AAA+↓↘→A+↓↘→A</option>\
					<option value="2" '+(oo.B1==2?'selected="selected"':'')+'>4.【0~24级】【9连】AA+→→A+AAA+D（换剑）+↓↘→A+↓↘→A</option>\
				</select>\
				</div>\
			</td>\
    </tr>';
  },
  b06:function(oo)
  {
    //////////许褚//////////////////////////////////////////////////////////////////////////////
    let arr=[
      "A◣100,A◤550,A◣100,A◤550,A◣100,A◤",//A.A.A
      "↓◣20,→◣20,↓◤20,→◤20,A◣20,A◤",//↓↘→ A 
      "↓◣20,↓◤20,↑◣20,A◣20,↑◤20,A◤",//↓↑A
      "←◣20,←◤20,→◣20,→◤20,A◣100,A◤100,A◣100,A◤",//←→AA
      "A◣100,A◤600,A◣100,A◤100,A◣100,A◤",//A.A.A
      "←◣20,←◤20,→◣20,→◤20,A◣100,A◤"//←→A
    ]
    this.Arr[3]=[];
    //1、选人物画面时输入BBB左CCC上DDD右BCD右DCB
    this.Arr[3][0]="B◣100,B◤100,B◣100,B◤100,B◣100,B◤100,←◣100,←◤100,C◣100,C◤100,C◣100,C◤100,C◣100,C◤100,↑◣100,↑◤100,D◣100,D◤100,D◣100,D◤100,D◣100,D◤100,→◣100,→◤100,B◣100,B◤100,C◣100,C◤100,D◣100,D◤100,→◣100,→◤100,D◣100,D◤100,C◣100,C◤100,B◣100,B◤100"
    //2、【0~4级】【8招】：A＋（46）A＋（46）A＋28A（此技打工程兵、机械兵、 驯兽师、熊等有6招；打豹、虎、男羌兵、蛇、女刀兵、女越兵等有7招；打水兵有8招）
    this.Arr[3][1]="A◣50,A◤250,"+arr[5]+"250,"+arr[5]+"140,"+arr[2]+"1600"//记好【130】
    //备注：0/29号5连，1/29号6连，2/29号7连，3/29号7连，4/29号3连，5/29号7连，6/29号【沙摩柯】，7/29号8连，8/29号2次5连，9/29号2次5连，10/29号7连，11/29号2次5连，12/29号6连，13/29号6连，14/29号6连，15/29号6连，16/29号4连，17/29号3连，18/29号4连，19/29号3连，20/29号4连，21/29号4连，22/29号6连，23/29号6连，24/29号7连，25/29号7连，26/29号鸟，27/29号小动物，28/29号小动物     
    //【0】孙姬 9连，【1】彻里吉 ， 【2】越吉 ， 【3】夏侯渊 ， 【4】孟优 ， 【5】曹丕 , 【6】夏侯惇 ， 【7】张辽 ， 【8】吕蒙 ， 【9】沙摩柯 ， 【10】吕布 ， 【11】吕布 ， 【12】左慈 ， 【13】许褚 ， 【14】孟获 ， 【15】孟优 ， 【16】黄盖 ， 【17】越吉 ， 【18】魏延 ， 【19】貂蝉 ， 【20】曹彰  ， 【21】司马懿 ， 【22】曹操
    //3、【0~4级】【9连】：AA＋46AA＋46AA＋28A（打孙姬）
    this.Arr[3][2]="A◣100,A◤100,A◣100,A◤550,"+arr[3]+"550,"+arr[3]+"440,"+arr[2]+"1100"
    //4、【5~9级】【8招】：A＋A＋AA＋28A（用来打敌兵或是BOSS挺不错的，此技还可以秒杀夏侯惇得到援军令呢）
    this.Arr[3][3]=arr[0]+"125,"+arr[2]+"1600"    
    //5、【10~24级】【8招】：A＋A＋A＋28A（打敌兵赚分专用技，节奏要掌握好）
    this.Arr[3][4]=arr[0]+"58,"+arr[2]+"1600"
    //this.Arr[0]=arr[4]+"780,"+arr[4]+"780,"+arr[4]+"780"//,A◣100,A◤300,A◣100,A◤460,"+arr[3]+"900"//,"+arr[3]+"400,"+arr[2]+"1650"
    ///////////////////////////////////////////////////////////////////////////////////////////
    return '\
		<tr>\
      <td class="right">\
				<input type="radio" class="custom-control-input" name="pre_id" value="4" onchange="fun.c08(4)" '+(oo.A1==4?'checked="checked"':'')+' id="radio4">\
				<label class="custom-control-label" for="radio4">【许褚】连招</label>\
			</td>\
			<td>\
        <div '+(oo.A1==4?'':'style="display:none;"')+'>\
          <select onchange="fun.c09(this.options[this.selectedIndex].value)" class="form-select center">\
          <option value="1" '+(oo.B1==1?'selected="selected"':'')+'>1、选人物画面时输入BBB左CCC上DDD右BCD右DCB【向右连招】</option>\
          <option value="2" '+(oo.B1==2?'selected="selected"':'')+'>2、【0~4级】【8招】：A＋（46）A＋（46）A＋28A（此技打工程兵、机械兵、 驯兽师、熊等有6招；打豹、虎、男羌兵、蛇、女刀兵、女越兵等有7招；打水兵有8招）</option>\
          <option value="3" '+(oo.B1==3?'selected="selected"':'')+'>3、【0~4级】【9连】：AA＋46AA＋46AA＋28A（打孙姬）</option>\
          <option value="4" '+(oo.B1==4?'selected="selected"':'')+'>4、【5~9级】【8招】：A＋A＋AA＋28A（用来打敌兵或是BOSS挺不错的，此技还可以秒杀夏侯惇得到援军令呢）</option>\
          <option value="5" '+(oo.B1==5?'selected="selected"':'')+'>5、【10~24级】【8招】：A＋A＋A＋28A（打敌兵赚分专用技，节奏要掌握好）</option>\
          </select>\
        </div>\
      </td>\
    </tr>'
  },
  b07:function()
  {
    return '<r: tag="sql">update @.Action set @.code=\''+JSON.stringify(this.obj.code[0])+'\' where @.id='+obj.arr[3]+'</r:>'
  },
  b08:function()//给初始值
  {
    return {
      Up:"W",Down:"S",Left:"A",Right:"D",//方向键【上】【下】【左】【右】
      Button1:"J",Button2:"K",Button3:"L",Button4:"I",//【攻击】【跳跃】【选道具】【放道具】
      combo1:"Q",combo2:"E",combo3:"空格",//【向左连招】【向右连招】【连招停止】
      A1:1,B1:1//【选择英雄】【选择连招】
    }
  },
  b09:function(val)//字母转数字
  {
    let num=0;
    switch(val) 
    {
     case "空格":num=32;break;
     default:num=val.charCodeAt();
    } 
    return num;
  },
  b10:function(t)
  {
    let num=0,arr2=t.split(",")
    for(let i=0;i<arr2.length;i++)
    {
      if(arr2[i].indexOf("◣")!=-1)
      {num+=parseInt(arr2[i].split("◣")[1]);}
      else if(arr2[i].indexOf("◤")!=-1)
      {num+=parseInt(arr2[i].split("◤")[1]);}
    }
    return num;
  },
  b11:function(oo)//方向键
  {
		return '\
		<table class="table mb-0">\
			<tr>\
				<td></td>\
				<td><input type="text" onclick="$(this).select();" onkeyup="fun.c04($(this),event,\'Up\');" value="'+oo.Up+'" title="方向键【上】" class="form-control center"/></td>\
				<td></td>\
			</tr>\
			<tr>\
				<td><input type="text" onclick="$(this).select();" onkeyup="fun.c04($(this),event,\'Left\');" value="'+oo.Left+'" title="方向键【左】" class="form-control center"/></td>\
				<td></td>\
				<td><input type="text" onclick="$(this).select();" onkeyup="fun.c04($(this),event,\'Right\');" value="'+oo.Right+'" title="方向键【右】" class="form-control center"/></td>\
			</tr>\
			<tr>\
				<td></td>\
				<td><input type="text" onclick="$(this).select();" onkeyup="fun.c04($(this),event,\'Down\');" value="'+oo.Down+'" title="方向键【下】" class="form-control center"/></td>\
				<td></td>\
			</tr>\
		</table>'
  },
  b12:function(oo)//ABCD键
  {
		return '\
		<table class="table align-middle mb-0">\
			<tr>\
				<td class="right">【攻击】A键：</td>\
				<td class="w100"><input type="text" onclick="$(this).select();" onkeyup="fun.c04($(this),event,\'Button1\');" value="'+oo.Button1+'" class="form-control center"/></td>\
				<td class="right">【跳跃】B键：</td>\
				<td class="w100"><input type="text" onclick="$(this).select();" onkeyup="fun.c04($(this),event,\'Button2\');" value="'+oo.Button2+'" class="form-control center"/></td>\
				<td class="right">【选道具】C键：</td>\
				<td class="w100"><input type="text" onclick="$(this).select();" onkeyup="fun.c04($(this),event,\'Button3\');" value="'+oo.Button3+'" class="form-control center"/></td>\
				<td class="right">【放道具】D键：</td>\
				<td class="w100"><input type="text" onclick="$(this).select();" onkeyup="fun.c04($(this),event,\'Button4\');" value="'+oo.Button4+'" class="form-control center"/></td>\
			</tr>\
			<tr>\
				<td class="right">【向左连招】键：</td>\
				<td><input type="text" onclick="$(this).select();" onkeyup="fun.c04($(this),event,\'combo1\');" value="'+oo.combo1+'" class="form-control center"/></td>\
				<td class="right">【向右连招】键：</td>\
				<td><input type="text" onclick="$(this).select();" onkeyup="fun.c04($(this),event,\'combo2\');" value="'+oo.combo2+'" class="form-control center"/></td>\
				<td class="right">【连招停止】键：</td>\
				<td><input type="text" onclick="$(this).select();" onkeyup="fun.c04($(this),event,\'combo3\');" value="'+oo.combo3+'" class="form-control center"/></td>\
				<td class="right">其它：</td>\
				<td><a href="javascript:" class="button" onclick="fun.c06()">恢复默认</a></td>\
			</tr>\
		</table>'
	},
  c04:function(This,e,L)
  {
    let keynum
    if(window.event) // IE
    {keynum = e.keyCode;}
    else if(e.which) // Netscape/Firefox/Opera
    {keynum = e.which;}
    this.obj.code[0][L]=String.fromCharCode(keynum);
    This.val("...");This.attr("disabled",true);
   Tool.ajax.a01(this.b07(),1,this.c05,this,[This,L]);
  },
  c05:function(t,This)
  {
    if(t==""){This[0].val(this.obj.code[0][This[1]]);This[0].attr("disabled",false);}else{alert(t);}    
  },
  c06:function()
  {
      this.b08();
      Tool.ajax.a01(this.b07(),1,this.c07,  this);
  },
  c07:function(t)
  {
    if(t==""){location.reload();}else{alert(t);}
  },
  c08:function(A1)
  {
    this.obj.code[0].A1=A1;
    this.obj.code[0].B1=1;
   Tool.ajax.a01(this.b07(),1,this.c07,this);
  },
  c09:function(B1)
  {
    this.obj.code[0].B1=B1;
   Tool.ajax.a01(this.b07(),1,this.c07,this);
  },
  d01:function(IO)
  {
    if(IO==this.combo1)
    {this.isLeft=true;this.d02();}//向左攻击【Q】
    else if(IO==this.combo2)
    {this.isLeft=false;this.d02();}//向右攻击【E】
    else if(IO==this.combo3)
    {win.KeyArrStop();this.isLock=true;}//连招停止【空格】
  },
  d02:function()
  {
    if(this.isLock)
    {
      this.isLock=false;//锁定
      let txt=this.Arr[this.obj.code[0].A1-1][this.obj.code[0].B1-1]
      $("#code").html(txt+"\n");
      this.d03(txt);
      Tool.Time(this.d04,this.b10(txt),this,"2");      
    }    
  },
  d03:function(str)
	{
    let oo=this.obj.code[0]
    if(this.isLeft){str=str.replace(/→/g, "[变量]").replace(/←/g, "→").replace(/\[变量\]/g, "←");}
		str=str.replace(/A/g, oo.Button1.charCodeAt())
		str=str.replace(/B/g, oo.Button2.charCodeAt())
		str=str.replace(/C/g, oo.Button3.charCodeAt())
		str=str.replace(/D/g, oo.Button4.charCodeAt())
		str=str.replace(/→/g, oo.Right.charCodeAt())
		str=str.replace(/←/g, oo.Left.charCodeAt())
		str=str.replace(/↑/g, oo.Up.charCodeAt())
		str=str.replace(/↓/g, oo.Down.charCodeAt())
		if(str.split("◤").length==str.split("◣").length)
		{win.KeyArr(str);}
		else
		{alert("有编写错误,按键没弹起。");}
  },
  d04:function()
	{
    this.isLock=true;
    let str=$("#code").html()+"\n"+window.external.Img;
    $("#code").html(str);
    //this.d05();
  },
  ////////////测式用的///////////////////////
  d05:function()
  {
    if(this.isLock)
    {
      this.isLock=false;//锁定
      let txt="←◣400,←◤20,→◣20,→◤40,↑◣50,↑◤800"
      this.d03(txt);
      Tool.Time(this.a11,this.b10(txt),this,"2");
    }
  },
  a11:function()
  {
    this.isLock=true;
    this.d02()
  }
}
fun.a01();