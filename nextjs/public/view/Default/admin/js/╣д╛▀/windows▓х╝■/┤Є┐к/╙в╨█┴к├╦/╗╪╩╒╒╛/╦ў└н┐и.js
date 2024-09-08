'use strict';
Object.assign(fun,{
  combo1:0,combo2:0,combo3:0,combo4:0,combo5:0,combo6:0,combo7:0,isLock:false,//是否锁定按键
  b01:function()
  {
    if(!this.obj.code[0]){this.b02();}//如果没有数据，就给初始值
    let oo=this.obj.code[0]
    this.combo1=this.b03(oo.combo1)//写在这里可保时间函数执行的内容少一点
    this.combo2=this.b03(oo.combo2)
    this.combo3=this.b03(oo.combo3)
    this.combo4=this.b03(oo.combo4)
    this.combo5=this.b03(oo.combo5)
    this.combo6=this.b03(oo.combo6)
    this.combo7=this.b03(oo.combo7)
    return this.b04(oo);  
  },
  b02:function()
  {
    this.obj.code[0]=
    {
      combo1:"V",combo2:"X",combo3:"C",combo4:"A",combo5:"S",combo6:"caps",combo7:"F1",//【摸眼】【三连睡】【空中眩晕+三连睡】
      A1:1,//等级
      profit:0.638,//攻速收益
      B1:1,//加点方向
      Barr://加点内容
      [
        [//1级加点
          ["E",[0,0,1,0],[0,0,16,0]],
          ["E",[0,0,1,0],[0,0,16,0]]
        ],
        [//2级加点
          ["Q",[1,0,1,0],[8,0,16,0]],
          ["Q",[1,0,1,0],[8,0,16,0]]
        ],
        [//3级加点
          ["W",[1,1,1,0],[8,7,16,0]],
          ["W",[1,1,1,0],[8,7,16,0]]
        ],
        [//4级加点
          ["Q",[2,1,1,0],[7.5,7,16,0]],
          ["W",[1,2,1,0],[8  ,6,16,0]]
        ],
        [//5级加点
          ["Q",[3,1,1,0],[7,7,16,0]],
          ["W",[1,3,1,0],[8,5,16,0]]
        ],
        [//6级加点
          ["R",[3,1,1,1],[7,7,16,80]],
          ["R",[1,3,1,1],[8,5,16,80]]
        ],
        [//7级加点
          ["Q",[4,1,1,1],[6.5,7,16,80]],
          ["W",[1,4,1,1],[8  ,4,16,80]]
        ],
        [//8级加点
          ["W",[4,2,1,1],[6.5,6,16,80]],
          ["Q",[2,4,1,1],[7.5,4,16,80]]
        ],
        [//9级加点
          ["Q",[5,2,1,1],[6  ,6,16,80]],
          ["W",[2,5,1,1],[7.5,3,16,80]]
        ],
        [//10级加点
          ["W",[5,3,1,1],[6,5,16,80]],
          ["Q",[3,5,1,1],[7,3,16,80]]
        ],
        [//11级加点
          ["R",[5,3,1,2],[6,5,16,80]],
          ["R",[3,5,1,2],[7,3,16,80]]
        ],
        [//12级加点
          ["W",[5,4,1,2],[6  ,4,16,80]],
          ["Q",[4,5,1,2],[6.5,3,16,80]]
        ],
        [//13级加点
          ["W",[5,5,1,2],[6,3,16,80]],
          ["Q",[5,5,1,2],[6,3,16,80]]
        ],
        [//14级加点
          ["E",[5,5,2,2],[6,3,14,80]],
          ["E",[5,5,2,2],[6,3,14,80]]
        ],
        [//15级加点
          ["E",[5,5,3,2],[6,3,12,80]],
          ["E",[5,5,3,2],[6,3,12,80]]
        ],
        [//16级加点
          ["R",[5,5,3,3],[6,3,12,80]],
          ["R",[5,5,3,3],[6,3,12,80]]
        ],
        [//17级加点
          ["E",[5,5,4,3],[6,3,10,80]],
          ["E",[5,5,4,3],[6,3,10,80]]
        ],
        [//18级加点
          ["E",[5,5,5,3],[6,3,8,80]],
          ["E",[5,5,5,3],[6,3,8,80]]
        ]
      ],
      equipment1:0,//【1：提亚马特】【2：巨型九头蛇】【0：都不是】
      equipment2:0,//【1：蜂刺】【2：三相之隔】【0：都不是】
      equipment3:0,//【1：反曲之弓】【2：智慧未刃】【3：鬼索的狂暴之刃】【0：都不是】
      equipment4:false,//短剑
      equipment5:false,//短剑
      monster1:'false',//野怪加成【余烬之冠】
      monster2:'false',//野怪加成【洞悉之冠】
      monster3:'false',//野怪加成【1龙】
      monster4:'false',//野怪加成【2龙】
      monster5:'false',//野怪加成【3龙】
      monster6:'false',//野怪加成【4龙】
      monster7:'false',//野怪加成【大龙】
      monster8:'false',//野怪加成【远古龙】
      checkbox1:'true'
    }
  },
  b03:function(val)
  {
    let num=0;
    switch(val) 
    {
     case "空格":num=32;break;
     case "左shift":num=160;break;
     case "右shift":num=161;break;
     case "caps":num=20;break;
     case "F1":num=112;break;
     case "F2":num=113;break;
     case "F3":num=114;break;
     case "F4":num=115;break;
     case "F5":num=116;break;
     case "F6":num=117;break;
     case "F7":num=118;break;
     case "F8":num=119;break;
     case "F9":num=120;break;
     case "F10":num=121;break;
     case "F11":num=122;break;
     case "F12":num=123;break;
     default:num=val.charCodeAt();
    } 
    return num;
  },
  b04:function(oo)
  {
    let B1="",B3="",B11=oo.profit,B31=0,B4="",B41=0,val=0;
    if(oo.checkbox1=='true'){val=10;B11+=oo.profit*(val*0.01);B31+=val;}//天赋【+10%攻击速度】
    if(oo.equipment4=='true'){val=12;B11+=oo.profit*(val*0.01);B31+=val;}//短剑【+12%攻速】第一把
    if(oo.equipment5=='true'){val=12;B11+=oo.profit*(val*0.01);B31+=val;}//短剑【+12%攻速】第二把
    if(oo.equipment3=='true'){val=25;B11+=oo.profit*(val*0.01);B31+=val;}//反曲之弓【+25%攻速】
    if(oo.equipment2==1){val=35;B11+=oo.profit*(val*0.01);B31+=val;}//蜂刺【+35%攻速】
    if(oo.equipment2==2){val=40;B11+=oo.profit*(val*0.01);B31+=val;}//三相之隔【+40%攻速】
    if(oo.equipment3=='true'){val=50;B11+=oo.profit*(val*0.01);B31+=val;}//智慧未刃【+50%攻速】
    if(oo.equipment3=='true'){val=25;B11+=oo.profit*(val*0.01);B31+=val;}//鬼索的狂暴之刃【+25%攻速】【6层+8%攻速】
    val=this.b07();//不同等级不同的攻速
    B11+=oo.profit*(val*0.01);B31+=val;//英雄等级
    B1+='<li class="w70"><input type="text" value="'+B11.toFixed(3)+'" class="form-select center" disabled /></li>';
    B3+='<li class="w70"><input type="text" value="'+B31.toFixed(3)+'%" class="form-select center" disabled /></li>';
    B41=1/B11
    B4+='<li class="w70"><input type="text" value="'+B41.toFixed(3)+'" class="form-select center" disabled /></li>';
    for(let i=0;i<9;i++)
    {
      if(oo.equipment3=='true'){if(i<6){B11+=oo.profit*(8*0.01);B31+=8;}}//鬼索的狂暴之刃【+25%攻速】【6层+8%攻速】
      if(i<8)
      {
        if(oo.A1<=3)//1-3级，每层加3.5%
        {B11+=oo.profit*(3.5*0.01);B31+=3.5;}
        else if(oo.A1<=6)//4-6级，每层加5%
        {B11+=oo.profit*(5*0.01);B31+=5;}
        else if(oo.A1<=9)//7-9级，每层加6.5%
        {B11+=oo.profit*(6.5*0.01);B31+=6.5;}
        else if(oo.A1<=12)//10-12级，每层加8%
        {B11+=oo.profit*(8*0.01);B31+=8;}
        else if(oo.A1<=15)//13-15级，每层加9.5%
        {B11+=oo.profit*(9.5*0.01);B31+=9.5;}
        else if(oo.A1<=18)//13-15级，每层加11%
        {B11+=oo.profit*(11*0.01);B31+=11;}
        B41=1/B11
      }
      B1+='<li class="w70"><input type="text" value="'+B11.toFixed(3)+'" class="form-select center" disabled /></li>';
      B3+='<li class="w70"><input type="text" value="'+B31.toFixed(3)+'%" class="form-select center" disabled /></li>';
      B4+='<li class="w70"><input type="text" value="'+B41.toFixed(3)+'" class="form-select center" disabled /></li>';
    }
    return '\
      <div class="Tul thead">设置参数 <a href="javascript:" class="button" onclick="fun.c06()">恢复默认</a></div>\
      <ul class="Tul list-group-item-action">\
        <li class="right w200">英雄等级：</li>\
        <li class="w100">\
          <select class="form-select" onchange="fun.c09($(this),\'A1\')">\
            <option value="1" '+(oo.A1==1?'selected="selected"':'')+'>1级</option>\
            <option value="2" '+(oo.A1==2?'selected="selected"':'')+'>2级</option>\
            <option value="3" '+(oo.A1==3?'selected="selected"':'')+'>3级</option>\
            <option value="4" '+(oo.A1==4?'selected="selected"':'')+'>4级</option>\
            <option value="5" '+(oo.A1==5?'selected="selected"':'')+'>5级</option>\
            <option value="6" '+(oo.A1==6?'selected="selected"':'')+'>6级</option>\
            <option value="7" '+(oo.A1==7?'selected="selected"':'')+'>7级</option>\
            <option value="8" '+(oo.A1==8?'selected="selected"':'')+'>8级</option>\
            <option value="9" '+(oo.A1==9?'selected="selected"':'')+'>9级</option>\
            <option value="10" '+(oo.A1==10?'selected="selected"':'')+'>10级</option>\
            <option value="11" '+(oo.A1==11?'selected="selected"':'')+'>11级</option>\
            <option value="12" '+(oo.A1==12?'selected="selected"':'')+'>12级</option>\
            <option value="13" '+(oo.A1==13?'selected="selected"':'')+'>13级</option>\
            <option value="14" '+(oo.A1==14?'selected="selected"':'')+'>14级</option>\
            <option value="15" '+(oo.A1==15?'selected="selected"':'')+'>15级</option>\
            <option value="16" '+(oo.A1==16?'selected="selected"':'')+'>16级</option>\
            <option value="17" '+(oo.A1==17?'selected="selected"':'')+'>17级</option>\
            <option value="18" '+(oo.A1==18?'selected="selected"':'')+'>18级</option>\
          </select>\
        </li>\
      </ul>\
      <ul class="Tul list-group-item-action">\
        <li class="right w200">野怪加成：</li>\
        <li>\
          <div class="custom-control custom-checkbox float-left ml-1">\
            <input type="checkbox" id="monster-1" class="custom-control-input" value="'+oo.monster1+'" '+(oo.monster1=='true'?'checked="checked"':'')+' onclick="fun.c08($(this),\'monster1\')">\
            <label class="custom-control-label" for="monster-1" title="普攻燃烧或减速目标几秒">余烬之冠</label>\
          </div>\
          <div class="custom-control custom-checkbox float-left ml-1">\
            <input type="checkbox" id="monster-2" class="custom-control-input" value="'+oo.monster2+'" '+(oo.monster2=='true'?'checked="checked"':'')+' onclick="fun.c08($(this),\'monster2\')">\
            <label class="custom-control-label" for="monster-2" title="+10%冷却缩减并提升法力和能量回复">洞悉之冠</label>\
          </div>\
          <div class="custom-control custom-checkbox float-left ml-1">\
            <input type="checkbox" id="monster-3" class="custom-control-input" value="'+oo.monster3+'" '+(oo.monster3=='true'?'checked="checked"':'')+' onclick="fun.c08($(this),\'monster3\')">\
            <label class="custom-control-label" for="monster-3" title="每5秒治疗2.5%的已损失生命值">海洋巨龙</label>\
          </div>\
          <div class="custom-control custom-checkbox float-left ml-1">\
            <input type="checkbox" id="monster-4" class="custom-control-input" value="'+oo.monster4+'" '+(oo.monster4=='true'?'checked="checked"':'')+' onclick="fun.c08($(this),\'monster4\')">\
            <label class="custom-control-label" for="monster-4" title="+4%攻击力和法术强度">炼狱巨龙</label>\
          </div>\
          <div class="custom-control custom-checkbox float-left ml-1">\
            <input type="checkbox" id="monster-5" class="custom-control-input" value="'+oo.monster5+'" '+(oo.monster5=='true'?'checked="checked"':'')+' onclick="fun.c08($(this),\'monster5\')">\
            <label class="custom-control-label" for="monster-5" title="+6%护甲和魔法抗性">山脉巨龙</label>\
          </div>\
          <div class="custom-control custom-checkbox float-left ml-1">\
            <input type="checkbox" id="monster-6" class="custom-control-input" value="'+oo.monster6+'" '+(oo.monster6=='true'?'checked="checked"':'')+' onclick="fun.c08($(this),\'monster6\')">\
            <label class="custom-control-label" for="monster-6" title="+10%终极技能冷却缩减">云霄巨龙</label>\
          </div>\
          <div class="custom-control custom-checkbox float-left ml-1">\
            <input type="checkbox" id="monster-7" class="custom-control-input" value="'+oo.monster7+'" '+(oo.monster7=='true'?'checked="checked"':'')+' onclick="fun.c08($(this),\'monster7\')">\
            <label class="custom-control-label" for="monster-7" title="">男爵之手</label>\
          </div>\
          <div class="custom-control custom-checkbox float-left ml-1">\
            <input type="checkbox" id="monster-8" class="custom-control-input" value="'+oo.monster8+'" '+(oo.monster8=='true'?'checked="checked"':'')+' onclick="fun.c08($(this),\'monster8\')">\
            <label class="custom-control-label" for="monster-8" title="">巨龙威势</label>\
          </div>\
        </li>\
      </ul>\
      <ul class="Tul">\
        <li class="right w200">装备：</li>\
        <li>'+this.b11(oo)+'</li>\
      </ul>\
      <ul class="Tul">\
        <li class="right w200">攻击速度：</li>\
        <li>\
          <ul class="Tul Title center">\
            <li class="w120"></li>\
            <li class="w70">0次</li>\
            <li class="w70">1次</li>\
            <li class="w70">2次</li>\
            <li class="w70">3次</li>\
            <li class="w70">4次</li>\
            <li class="w70">5次</li>\
            <li class="w70">6次</li>\
            <li class="w70">7次</li>\
            <li class="w70">8次</li>\
            <li class="w70">9次</li>\
          </ul>\
          <ul class="Tul list-group-item-action">\
            <li class="w120 right">每秒普攻次数：</li>\
            '+B1+'\
          </ul>\
          <ul class="Tul list-group-item-action">\
            <li class="w120 right">收益：</li>\
            <li class="w70"><input type="text" value="'+oo.profit+'" class="form-select center" disabled /></li>\
          </ul>\
          <ul class="Tul list-group-item-action">\
            <li class="w120 right">加成：</li>\
            '+B3+'\
          </ul>\
          <ul class="Tul list-group-item-action">\
            <li class="w120 right">每次普攻多少秒：</li>\
            '+B4+'\
          </ul>\
        </li>\
      </ul>\
      <ul class="Tul">\
        <li class="right w200">符文：</li>\
        <li>\
          <ul class="Tul list-group-item-action noborder">\
            <li>精密 + 强攻 + 凯旋 + 传说：血统 + 至命一击；</li>\
          </ul>\
          <ul class="Tul list-group-item-action"><li>主宰 + 血之滋味 + 贪欲猎手</li></ul>\
          <ul class="Tul list-group-item-action"><li>进攻【</li><li>'+Tool.switch('checkbox1',oo.checkbox1,'fun.c08')+'</li><li>+10%攻击速度】 + 灵活【+6护甲】 + 防御【+15-90生命值（基于等级）】</li></ul>\
        </li>\
      </ul>\
      <ul class="Tul list-group-item-action">\
        <li class="right w200">信息识别：</li>\
        <li class="w70"><input type="text" onclick="$(this).select();" onblur="fun.c04($(this),\'combo7\');" value="'+oo.combo7+'" class="form-select center"/></li>\
        <li>识别【等级】【装备】【自动技能加点】【野怪加成】</li>\
      </ul>\
      <ul class="Tul list-group-item-action">\
        <li class="right w200">停止按键：</li>\
        <li class="w70"><input type="text" onclick="$(this).select();" onblur="fun.c04($(this),\'combo5\');" value="'+oo.combo5+'" class="form-select center"/></li>\
        <li class="w200">按键为【右键】</li>\
      </ul>\
      <ul class="Tul list-group-item-action">\
        <li class="right w200">摸眼：</li>\
        <li class="w70"><input type="text" onclick="$(this).select();" onblur="fun.c04($(this),\'combo1\');" value="'+oo.combo1+'" class="form-select center"/></li>\
        <li>按键为【4+Q+空格+右键】</li>\
      </ul>\
      <ul class="Tul list-group-item-action">\
        <li class="right w200">三连睡+走砍：</li>\
        <li class="w70"><input type="text" onclick="$(this).select();" onblur="fun.c04($(this),\'combo2\');" value="'+oo.combo2+'" class="form-select center"/></li>\
        <li class="w600">按键为【Q+A+空格+普攻+1+W】+走砍（跟据等级在走砍中插入W，直到Q好才停止走砍）</li>\
        <li class="right w100">伤害：</li>\
        <li class="w70"><input type="text" value="" class="form-select center" disabled="disabled"></li>\
        <li class="right w100">用时：</li>\
        <li class="w70"><input type="text" value="" class="form-select center" disabled="disabled"></li>\
      </ul>\
      <ul class="Tul list-group-item-action">\
        <li class="right w200">空中眩晕+三连睡+走砍：</li>\
        <li class="w70"><input type="text" onclick="$(this).select();" onblur="fun.c04($(this),\'combo3\');" value="'+oo.combo3+'" class="form-select center"/></li>\
        <li class="w600">按键为【Q+A+空格+E+普攻+1+W】+走砍（同上）；【1】为提亚马特或巨型九头蛇。</li>\
        <li class="right w100">伤害：</li>\
        <li class="w70"><input type="text" value="" class="form-select center" disabled="disabled"></li>\
        <li class="right w100">用时：</li>\
        <li class="w70"><input type="text" value="" class="form-select center" disabled="disabled"></li>\
      </ul>\
      <ul class="Tul list-group-item-action">\
        <li class="right w200">闪现+空中眩晕+三连睡+走砍：</li>\
        <li class="w70"><input type="text" onclick="$(this).select();" onblur="fun.c04($(this),\'combo6\');" value="'+oo.combo6+'" class="form-select center"/></li>\
        <li class="w600">按键为【E+A+Q+空格+闪现+E+普通攻击+1+W】+走砍（同上）；</li>\
        <li class="right w100">伤害：</li>\
        <li class="w70"><input type="text" value="" class="form-select center" disabled="disabled"></li>\
        <li class="right w100">用时：</li>\
        <li class="w70"><input type="text" value="" class="form-select center" disabled="disabled"></li>\
      </ul>\
      <ul class="Tul center row">\
        <li class="w200 right">加点方向：</li>\
        <li>'+this.b12(oo)+'</li>\
      </ul>'
  },
  b05:function()
  {
    return '<r: tag="sql">update @.Action set @.code=\''+JSON.stringify(this.obj.code[0])+'\' where @.id='+obj.arr[3]+'</r:>'
  },
  b06:function(t)
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
  b07:function()//不同等级不同的攻速
  {
    let val=0;
    switch(this.obj.code[0].A1) 
    {
      case 2:val=2.448;break;//2级
      case 3:val=5.015;break;//3级
      case 4:val=7.701;break;//4级
      case 5:val=10.506;break;//5级
      case 6:val=13.430;break;//6级
      case 7:val=16.473;break;//7级
      case 8:val=19.635;break;//8级
      case 9:val=22.916;break;//9级
      case 10:val=26.316;break;//10级
      case 11:val=29.835;break;//11级
      case 12:val=33.473;break;//12级
      case 13:val=37.230;break;//13级
      case 14:val=41.106;break;//14级
      case 15:val=45.101;break;//15级
      case 16:val=49.215;break;//16级
      case 17:val=53.448;break;//17级
      case 18:val=57.800;break;//18级
      default:val=0;
    }
    return val;
  },
  b08:function(code)
  {
    let oo=this.obj.code[0],arr=this.b09(oo);//【打中第1下时长】和【当前攻速】
    let B11=arr[1],B41=0,B42=0;
    //100为误差时长
    code+=(arr[0]-100)//第一层
    ////////////////////第二层 开始///////////////////////////////////////////////
    B11=this.b10(oo,B11,0)
    B41=Math.round(1/B11*1000)//总时长(1567毫秒)  
    B42=Math.round(B41/3)//1/3时长，就已经可以普攻了，其它时长用来移动
    if(oo.equipment1==1||oo.equipment1==2){code+=",49◣100,49◤150";}//【"提亚马特"可以"取消收尾时长"】
    //      [    "W"起手时长     ][  右键 ]
    code+=",87◣50,87◤"+B42+",R◣50,R◤"//【"W"可以"取消收尾时长"】
    //////////////////第二层 结束/////////////////////////////////////////////////
    for(let i=1;i<2;i++)
    {
      B11=this.b10(oo,B11,i)
      B41=Math.round(1/B11*1000)//总时长(1567毫秒) 
      B42=Math.round(B41/3)//1/3时长，就已经可以普攻了，其它时长用来移动
      //     [   第三层收尾时长   ] [    第三层起手时长    ]
      code+=(B41-B42-100)+",65◣50,65◤"+B42+",R◣50,R◤"
    }
    code+="50,65◣50,65◤50"
    return code;
  },
  b09:function(oo)
  {
    let B11=oo.profit,B41=0,B42=0
    if(oo.checkbox1=='true'){B11+=oo.profit*(10*0.01);}//天赋【+10%攻击速度】
    if(oo.equipment4=='true'){B11+=oo.profit*(12*0.01);}//短剑【+12%攻速】第一把
    if(oo.equipment5=='true'){B11+=oo.profit*(12*0.01);}//短剑【+12%攻速】第二把
    if(oo.equipment3=='true'){B11+=oo.profit*(25*0.01);}//反曲之弓【+25%攻速】
    if(oo.equipment2==1){B11+=oo.profit*(35*0.01);}//蜂刺【+35%攻速】
    if(oo.equipment2==2){B11+=oo.profit*(40*0.01);}//三相之隔【+40%攻速】
    if(oo.equipment3=='true'){B11+=oo.profit*(50*0.01);}//智慧未刃【+50%攻速】
    if(oo.equipment3=='true'){B11+=oo.profit*(25*0.01);}//鬼索的狂暴之刃【+25%攻速】【6层+8%攻速】
    B11+=oo.profit*(this.b07()*0.01);//不同等级不同的攻速
    /////////////////////////////////////////////////
    B41=Math.round(1/B11*1000)//总时长(1567毫秒)
    B42=Math.round(B41/3)//3分之1时长，就已经可以普攻了，第一下的其它时长不需要。
    //打中第1下时，用第一下的起手时长（3分之1时长）。打第2下时，用第二下的后收尾时长（3分之2时长），加第二下的起手时长（3分之1时长）。
    return [B42,B11];
  },
  b10:function(oo,B11,i)
  {
    if(oo.equipment3=='true'){if(i<6){B11+=oo.profit*(8*0.01);}}//鬼索的狂暴之刃【+25%攻速】【6层+8%攻速】
    if(i<8)//被动只有8层【攻速】
    {
      if(oo.A1<=3){B11+=oo.profit*(3.5*0.01);}//1-3级，每层加3.5%
      else if(oo.A1<=6){B11+=oo.profit*(5*0.01);}//4-6级，每层加5%
      else if(oo.A1<=9){B11+=oo.profit*(6.5*0.01);}//7-9级，每层加6.5%
      else if(oo.A1<=12){B11+=oo.profit*(8*0.01);}//10-12级，每层加8%
      else if(oo.A1<=15){B11+=oo.profit*(9.5*0.01);}//13-15级，每层加9.5%
      else if(oo.A1<=18){B11+=oo.profit*(11*0.01);}//13-15级，每层加11%
    }
    return B11;
  },
  b11:function(oo)//装备
  {
    let html='\
    <ul class="Tul list-group-item-action noborder">\
    <li class="w100 right">第一格：</li>\
      <li class="left">\
        <div class="custom-control w150 custom-radio float-left ml-1">\
          <input type="radio" id="equipment1-1" class="custom-control-input" value="1" '+(oo.equipment1==1?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment1\')">\
          <label class="custom-control-label" for="equipment1-1" title="提亚马特">提亚马特</label>\
        </div>\
        <div class="custom-control w150 custom-radio float-left ml-1">\
          <input type="radio" id="equipment1-2" class="custom-control-input" value="2" '+(oo.equipment1==2?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment1\')">\
          <label class="custom-control-label" for="equipment1-2" title="巨型九头蛇">巨型九头蛇</label>\
        </div>\
        <div class="custom-control w150 custom-radio float-left ml-1">\
          <input type="radio" id="equipment1-0" class="custom-control-input" value="0" '+(oo.equipment1==0?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment1\')">\
          <label class="custom-control-label" for="equipment1-0" title="都不是">都不是</label>\
        </div>\
      </li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w100 right">第五格：</li>\
      <li>\
        <div class="custom-control w150 custom-radio float-left ml-1">\
          <input type="radio" id="equipment2-1" class="custom-control-input" value="1" '+(oo.equipment2==1?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment2\')">\
          <label class="custom-control-label" for="equipment2-1" title="【+35%攻速】">蜂刺</label>\
        </div>\
        <div class="custom-control w150 custom-radio float-left ml-1">\
          <input type="radio" id="equipment2-2" class="custom-control-input" value="2" '+(oo.equipment2==2?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment2\')">\
          <label class="custom-control-label" for="equipment2-2" title="【+40%攻速】">三相之隔</label>\
        </div>\
        <div class="custom-control w150 custom-radio float-left ml-1">\
        <input type="radio" id="equipment2-0" class="custom-control-input" value="0" '+(oo.equipment2==0?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment2\')">\
        <label class="custom-control-label" for="equipment2-0">都不是</label>\
        </div>\
      </li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w100 right">第六格：</li>\
      <li>\
        <div class="custom-control custom-radio w150 float-left ml-1">\
          <input type="radio" id="equipment3-1" class="custom-control-input" value="1" '+(oo.equipment3==1?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment3\')">\
          <label class="custom-control-label" for="equipment3-1" title="【+25%攻速】">反曲之弓</label>\
        </div>\
        <div class="custom-control custom-radio w150 float-left ml-1">\
          <input type="radio" id="equipment3-2" class="custom-control-input" value="2" '+(oo.equipment3==2?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment3\')">\
          <label class="custom-control-label" for="equipment3-2" title="【+50%攻速】">智慧未刃</label>\
        </div>\
        <div class="custom-control custom-radio w150 float-left ml-1">\
          <input type="radio" id="attrValId-7" class="custom-control-input" value="3" '+(oo.equipment3==3?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment3\')">\
          <label class="custom-control-label" for="attrValId-7" title="【+25%攻速】【6层+8%攻速】">鬼索的狂暴之刃</label>\
        </div>\
        <div class="custom-control custom-radio w150 float-left ml-1">\
        <input type="radio" id="equipment3-0" class="custom-control-input" value="0" '+(oo.equipment3==0?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment3\')">\
        <label class="custom-control-label" for="equipment3-0">都不是</label>\
        </div>\
      </li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w100 right">第七八格：</li>\
      <li>\
      <div class="custom-control custom-checkbox w150 float-left ml-1">\
      <input type="checkbox" id="equipment4-1" class="custom-control-input" value="'+oo.equipment4+'" '+(oo.equipment4?'checked="checked"':'')+' onclick="fun.c08($(this),\'equipment4\')">\
      <label class="custom-control-label" for="equipment4-1" title="【+12%攻速】">短剑</label>\
      </div>\
      <div class="custom-control custom-checkbox w150 float-left ml-1">\
      <input type="checkbox" id="equipment5-1" class="custom-control-input" value="'+oo.equipment5+'" '+(oo.equipment5?'checked="checked"':'')+' onclick="fun.c08($(this),\'equipment5\')">\
      <label class="custom-control-label" for="equipment5-1" title="【+12%攻速】">短剑</label>\
      </div>\
      </li>\
    </ul>'
    return html;
  },
  b12:function(oo)//加点方向
  {
    let html='\
    <ul class="Tul Title">\
    <li class="w100"></li>\
    <li class="w500 border-l">\
      <div class="custom-control custom-radio">\
        <input type="radio" class="custom-control-input" value="1" id="B1-1" '+(oo.B1==1?'checked="checked"':'')+' onclick="fun.c09($(this),\'B1\')">\
        <label class="custom-control-label" for="B1-1">主Q副E,有大点大</label>\
      </div>\
    </li>\
    <li class="w400 border-l">\
      <div class="custom-control custom-radio">\
        <input type="radio" class="custom-control-input" value="2" id="B1-2" '+(oo.B1==2?'checked="checked"':'')+'  onclick="fun.c09($(this),\'B1\')">\
        <label class="custom-control-label" for="B1-2">主W副Q,有大点大</label>\
      </div>\
    </li>\
    </ul>\
    <ul class="Tul Title">\
      <li class="w100">等级</li>\
      <li class="w100 border-l">加点</li>\
      <li class="w100">Q</li>\
      <li class="w100">W</li>\
      <li class="w100">E</li>\
      <li class="w100">R</li>\
      <li class="w100 border-l">加点</li>\
      <li class="w100">Q</li>\
      <li class="w100">W</li>\
      <li class="w100">E</li>\
      <li class="w100">R</li>\
    </ul>'
    for(let i=0;i<oo.Barr.length;i++)
    {
      html+='\
      <ul class="Tul list-group-item-action">\
        <li class="w100">'+(i+1)+'级</li>\
        <li class="w100 border-l">'+oo.Barr[i][0][0]+'</li>\
        <li class="w100">'+(oo.Barr[i][0][1][0]?oo.Barr[i][0][1][0]+'级（'+oo.Barr[i][0][2][0]+'秒）':'-')+'</li>\
        <li class="w100">'+(oo.Barr[i][0][1][1]?oo.Barr[i][0][1][1]+'级（'+oo.Barr[i][0][2][1]+'秒）':'-')+'</li>\
        <li class="w100">'+(oo.Barr[i][0][1][2]?oo.Barr[i][0][1][2]+'级（'+oo.Barr[i][0][2][2]+'秒）':'-')+'</li>\
        <li class="w100">'+(oo.Barr[i][0][1][3]?oo.Barr[i][0][1][3]+'级（'+oo.Barr[i][0][2][3]+'秒）':'-')+'</li>\
        <li class="w100 border-l">'+oo.Barr[i][1][0]+'</li>\
        <li class="w100">'+(oo.Barr[i][1][1][0]?oo.Barr[i][1][1][0]+'级（'+oo.Barr[i][1][2][0]+'秒）':'-')+'</li>\
        <li class="w100">'+(oo.Barr[i][1][1][1]?oo.Barr[i][1][1][1]+'级（'+oo.Barr[i][1][2][1]+'秒）':'-')+'</li>\
        <li class="w100">'+(oo.Barr[i][1][1][2]?oo.Barr[i][1][1][2]+'级（'+oo.Barr[i][1][2][2]+'秒）':'-')+'</li>\
        <li class="w100">'+(oo.Barr[i][1][1][3]?oo.Barr[i][1][1][3]+'级（'+oo.Barr[i][1][2][3]+'秒）':'-')+'</li>\
      </ul>'
    }
    return html;
  },
  c04:function(This,L)
  {
    this.obj.code[0][L]=This.val();
    This.val("...");
    This.attr("disabled",true);
   Tool.ajax.a01(this,[This,this.c05,this.b05(),1,L]);
  },
  c05:function(t,This)
  {
    if(t=="")
    {
      This[0].val(this.obj.code[0][This[1]]);
      This[0].attr("disabled",false);
    }else{alert(t);}    
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
  c08:function(This,L)
  {
    let isbool=This.prop('checked');
		if(!This.prop("disabled"))
		{
			This.attr("disabled",true);
      this.obj.code[0][L]=isbool
			Tool.ajax.a01(this.b05(),1,this.c07,this);
		}
  },
  c09:function(This,L)
  {
    if(!This.prop("disabled"))
		{
      This.attr("disabled",true);
      this.obj.code[0][L]=parseInt(This.val());
			Tool.ajax.a01(this.b05(),1,this.c07,this);
    }
  },
  d01:function(IO)
  {
    if(IO==-this.combo2)//按下E
    {
      //       [按下E]
      this.d02("69◣10"); 
      win.setIO(0);
    }
    else if(IO==this.combo2)//EQ
    {
      //        
      this.d02("81◣50,69◤50,81◤50");   
      //                 [  Q飞行0.45秒               ]      
      win.setIO(0);
    }    
    else if(IO==this.combo5){win.KeyArrStop();this.isLock=false;win.setIO(0);}//停止按键
  },
  d02:function(txt)
  {
    if(!this.isLock)
    {
      this.isLock=true;//锁定      
      $("#code").html(txt+"\n");
      this.d03(txt);
      Tool.Time(this.d04,this.b06(txt),this,"2");      
    }    
  },
  d03:function(str)
	{win.KeyArr(str);},
  d04:function()
	{
    this.isLock=false;
    let str=$("#code").html()+"\n"+window.external.Img;
    $("#code").html(str);
  },  
  e01:function()
  {
    win.ImgTime("英雄联盟/等级/1级.bmp|英雄联盟/等级/2级.bmp|英雄联盟/等级/3级.bmp|英雄联盟/等级/4级.bmp|英雄联盟/等级/5级.bmp|英雄联盟/等级/6级.bmp|英雄联盟/等级/7级.bmp|英雄联盟/等级/8级.bmp|英雄联盟/等级/9级.bmp|英雄联盟/等级/10级.bmp|英雄联盟/等级/11级.bmp|英雄联盟/等级/12级.bmp|英雄联盟/等级/13级.bmp|英雄联盟/等级/14级.bmp|英雄联盟/等级/15级.bmp|英雄联盟/等级/16级.bmp|英雄联盟/等级/17级.bmp|英雄联盟/等级/18级.bmp",1,800,this.e02,this);//
  },
  e02:function(t)
  { 
    if(t.indexOf("找图片次数超限")!=-1)
		{$("#code").html(t);}
		else
		{
      eval("let arr="+t);
      this.obj.code[0].A1=arr[0];
      win.ImgTime("英雄联盟/装备/提亚马特.bmp|英雄联盟/装备/提亚马特-L.bmp|英雄联盟/装备/提亚马特-R.bmp|英雄联盟/装备/巨型九头蛇.bmp|英雄联盟/装备/巨型九头蛇-L.bmp|英雄联盟/装备/巨型九头蛇-R.bmp",1,300,this.e03,this);
    }
  },
  e03:function(t)
  {
    if(t.indexOf("找图片次数超限")!=-1)
		{
      this.obj.code[0].equipment1=0;
      $("#code").html(t);
    }
		else
		{
      eval("let arr="+t);
      if(arr[0]<=3)
      {this.obj.code[0].equipment1=1;}
      else
      {this.obj.code[0].equipment1=2;}
    }
    win.ImgTime("英雄联盟/装备/蜂刺.bmp|英雄联盟/装备/三相之隔.bmp",1,300,this.e04,this);  
  },
  e04:function(t)
  { 
    if(t.indexOf("找图片次数超限")!=-1)
		{
      this.obj.code[0].equipment2=0;
      $("#code").html(t);
    }
		else
		{
      eval("let arr="+t);
      this.obj.code[0].equipment2=arr[0];
    }
    win.ImgTime("英雄联盟/装备/反曲之弓.bmp|英雄联盟/装备/智慧未刃.bmp|英雄联盟/装备/鬼索的狂暴之刃.bmp",1,300,this.e05,this);  
  },
  e05:function(t)
  { 
    if(t.indexOf("找图片次数超限")!=-1)
		{
      this.obj.code[0].equipment3=0;
      $("#code").html(t);
    }
		else
		{
      eval("let arr="+t);
      this.obj.code[0].equipment3=arr[0];
    }
    win.ImgTime("英雄联盟/装备/短剑.bmp",1,200,this.e06,this);
  },
  e06:function(t)
  { 
    $("#code").html("短剑"+t);
    if(t.indexOf("找图片次数超限")!=-1)
		{this.obj.code[0].equipment4=false;}
		else
		{this.obj.code[0].equipment4=true;}
    win.ImgTime("英雄联盟/装备/短剑2.bmp",1,200,this.e07,this);
  },
  e07:function(t)
  {
    $("#code").html("短剑2"+t);
    if(t.indexOf("找图片次数超限")!=-1)
		{this.obj.code[0].equipment5=false;}
		else
		{this.obj.code[0].equipment5=true;}
    let oo=this.obj.code[0]
    let key=(oo.Barr[oo.A1-1][oo.B1-1][0]).charCodeAt();
    let txt="162◣50,"+key+"◣50,"+key+"◤50,162◤50,9◣300,9◤50"
    this.d02(txt);
   Tool.ajax.a01(this.b05(),1,this.c07,this);
  }
})
fun.a03();
      
