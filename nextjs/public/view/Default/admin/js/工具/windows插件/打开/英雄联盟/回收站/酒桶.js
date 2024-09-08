'use strict';
Object.assign(fun,{
  combo1:0,combo2:0,
  b01:function()
  {
    if(!this.obj.code[0]){this.b02();}//如果没有数据，就给初始值
    let oo=this.obj.code[0]
    this.combo1=this.b03(oo.combo1)//写在这里可保时间函数执行的内容少一点
    this.combo2=this.b03(oo.combo2)
    return this.b04(oo);  
  },
  b02:function()
  {
    this.obj.code[0]=
    {
      combo1:"Z",combo2:"X",
    }
  },
  b03:function(val)
  {
    let num=0;
    switch(val) 
    {
     case "空格":num=32;break;
     default:num=val.charCodeAt();
    } 
    return num;
  },
  b04:function(oo)
  {
    return '\
      <div class="Tul thead">设置参数 <a href="javascript:" class="button" onclick="fun.c06()">恢复默认</a></div>\
      <ul class="Tul list-group-item-action">\
        <li class="right w200">天赋：</li>\
        <li></li>\
      </ul>\
      <ul class="Tul list-group-item-action">\
        <li class="right w200">QE招连：</li>\
        <li class="w50"><input type="text" onclick="$(this).select();" onkeyup="fun.c04($(this),event,\'combo1\');" value="'+oo.combo1+'" class="form-select center"/></li>\
        <li class="w200">按键为【Q+E+A+空格+Q】</li>\
      </ul>\
      <ul class="Tul list-group-item-action">\
        <li class="right w200">E闪QR连招：</li>\
        <li class="w50"><input type="text" onclick="$(this).select();" onkeyup="fun.c04($(this),event,\'combo2\');" value="'+oo.combo2+'" class="form-select center"/></li>\
        <li>按键为【E+A+闪(普通攻击)+Q+R+空格+Q】</li>\
      </ul>\
      '
  },
  b05:function()
  {
    return '<r: tag="sql">update @.Action set @.code=\''+JSON.stringify(this.obj.code[0])+'\' where @.id='+obj.arr[3]+'</r:>'
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
   Tool.ajax.a01(this,[This,this.c05,this.b05(),1,L]);
  },
  c05:function(t,This)
  {
    if(t==""){This[0].val(this.obj.code[0][This[1]]);This[0].attr("disabled",false);}else{alert(t);}    
  },
  c06:function()
  {
    this.b02();
   Tool.ajax.a01(this.b05(),1,this.c07,this);
  },
  c07:function(t)
  {
    if(t==""){location.reload();}else{alert(t);}
  },
  d01:function(IO)
  {
    if(IO==this.combo1)//QE连招
    {
      //          [    Q    ] [    E     ] [    A    ] [   空格    ] [    Q    ] 
      win.KeyArr("81◣10,81◤10,69◣10,69◤600,65◣50,65◤50,32◣50,32◤500,81◣50,81◤50");
    }
    else if(IO==this.combo2)
    {
      //          [     E    ] [    A    ] [闪(普通攻击)] [    Q      ][    R    ][   空格    ][    Q     ]
      win.KeyArr("69◣10,69◤50,65◣50,65◤550,70◣50,70◤50,81◣300,81◤50,82◣50,82◤400,32◣50,32◤50,81◣50,81◤50");//
    }
    else if(IO==this.combo3){win.KeyArrStop();}//连招停止【S】
    else if(IO==this.combo4)//三连睡
    {
      //          [     Q     ][ 空格(普攻) ][   W    ] [    1      ]
      win.KeyArr("81◣10,81◤300,32◣400,32◤50,87◣25,87◤25,49◣25,49◤25");
    }   
  },
})
fun.a03();