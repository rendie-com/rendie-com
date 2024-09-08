'use strict';
Object.assign(fun,{
  combo1:0,combo2:0,combo3:0,combo4:0,combo5:0,combo6:0,
  isStart:false,//是否执行，当连招正要开始时，情况不对，可以按鼠标右键取消。
  isLock:false,//按键是否锁定。当键盘按下时锁定，执行完后解锁。可防止连招重叠。
  b01:function()
  {
    if(!this.obj.code[0]){this.b02();}//如果没有数据，就给初始值
    let oo=this.obj.code[0]
    this.combo1=this.b03(oo.combo1)//识别【等级】
    this.combo2=this.b03(oo.combo2)//识别【装备】
    this.combo3=this.b03(oo.combo3)//识别【红buff/蓝buff】
    this.combo4=this.b03(oo.combo4)//识别【龙】
    this.combo5=this.b03(oo.combo5)//停止攻击
    this.combo6=this.b03(oo.combo6)//攻击
    return this.b04(oo);  
  },
  b02:function()
  {
    this.obj.code[0]=
    {
      combo1:"F1",combo2:"F2",combo3:"F3",combo4:"F4",//
      combo5:"S",combo6:"V",
      A1:1,//等级
      profit:0.625,//攻速收益
      B1:1,//加点方向
      Barr://加点内容
      [
        [//1级加点
          ["Q",[1,0,0,0],[1,0,0,0]],//第一种加点
          ["E",[0,0,1,0],[0,0,16,0]],//第二种加点
          528//血量
        ],
        [//2级加点
          ["E",[1,0,1,0],[1,0,0.5,0]],
          ["Q",[1,0,1,0],[8,0,16,0]],
          591//血量
        ],
        [//3级加点
          ["Q",[2,0,1,0],[1,0,0.5,0]],
          ["W",[1,1,1,0],[8,7,16,0]],657//血量
        ],
        [//4级加点
          ["W",[2,1,1,0],[1,15,0.5,0]],
          ["W",[1,2,1,0],[8  ,6,16,0]],726//血量
        ],
        [//5级加点
          ["Q",[3,1,1,0],[1,15,0.5,0]],
          ["W",[1,3,1,0],[8,5,16,0]],797//血量
        ],
        [//6级加点
          ["R",[3,1,1,1],[1,15,0.5,200]],
          ["R",[1,3,1,1],[8,5,16,80]],872//血量
        ],
        [//7级加点
          ["Q",[4,1,1,1],[1,15,0.5,200]],
          ["W",[1,4,1,1],[8  ,4,16,80]],950//血量
        ],
        [//8级加点
          ["E",[4,1,2,1],[1,15,0.5,200]],
          ["Q",[2,4,1,1],[7.5,4,16,80]],1031//血量
        ],
        [//9级加点
          ["Q",[5,1,2,1],[1,15,0.5,200]],
          ["W",[2,5,1,1],[7.5,3,16,80]],1115//血量
        ],
        [//10级加点
          ["E",[5,1,3,1],[1,15,0.5,200]],
          ["Q",[3,5,1,1],[7,3,16,80]],1202//血量
        ],
        [//11级加点
          ["R",[5,1,3,2],[1,15,0.5,180]],
          ["R",[3,5,1,2],[7,3,16,80]],1292//血量
        ],
        [//12级加点
          ["E",[5,1,4,2],[1,15,0.5,180]],
          ["Q",[4,5,1,2],[6.5,3,16,80]],1385//血量
        ],
        [//13级加点
          ["W",[5,2,4,2],[1,15,0.5,180]],
          ["Q",[5,5,1,2],[6,3,16,80]],1481//血量
        ],
        [//14级加点
          ["E",[5,2,5,2],[1,15,0.5,180]],
          ["E",[5,5,2,2],[6,3,14,80]],1580//血量
        ],
        [//15级加点
          ["W",[5,3,5,2],[1,15,0.5,180]],
          ["E",[5,5,3,2],[6,3,12,80]],1683//血量
        ],
        [//16级加点
          ["R",[5,3,5,3],[1,15,0.5,160]],
          ["R",[5,5,3,3],[6,3,12,80]],1788//血量
        ],
        [//17级加点
          ["W",[5,4,5,3],[1,15,0.5,160]],
          ["E",[5,5,4,3],[6,3,10,80]],1896//血量
        ],
        [//18级加点
          ["W",[5,5,5,3],[1,15,0.5,160]],
          ["E",[5,5,5,3],[6,3,8,80]],2008//血量
        ]
      ],
      monster1:'false',//野怪加成【余烬之冠】
      monster2:'false',//野怪加成【洞悉之冠】
      monster3:'false',//野怪加成【1龙】
      monster4:'false',//野怪加成【2龙】
      monster5:'false',//野怪加成【3龙】
      monster6:'false',//野怪加成【4龙】
      monster7:'false',//野怪加成【大龙】
      monster8:'false',//野怪加成【远古龙】
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
    val=this.b07();//不同等级不同的攻速
    B11+=oo.profit*(val*0.01);B31+=val;//英雄等级
    B1+='<li class="w70"><input type="text" value="'+B11.toFixed(3)+'" class="form-select center" disabled /></li>';
    B3+='<li class="w70"><input type="text" value="'+B31.toFixed(3)+'%" class="form-select center" disabled /></li>';
    B41=1/B11
    B4+='<li class="w70"><input type="text" value="'+B41.toFixed(3)+'" class="form-select center" disabled /></li>';
    for(let i=0;i<9;i++)
    {
      B41=1/B11
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
      <ul class="Tul">\
        <li class="right w200">装备：</li>\
        <li>'+this.b11(oo)+'</li>\
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
            <li>主宰 + 黑暗收割 + 恶意中伤 + 眼球收集器 + 终极猎人；</li>\
          </ul>\
          <ul class="Tul list-group-item-action"><li>精密 + 气定神闲 + 致命一击</li></ul>\
          <ul class="Tul list-group-item-action"><li>进攻【+9适应之力】 + 灵活【+9适应之力】 + 防御【+6护甲】</li></ul>\
        </li>\
      </ul>\
      <ul class="Tul list-group-item-action">\
        <li class="right w200">识别【等级】：</li>\
        <li class="w70"><input type="text" onclick="$(this).select();" onblur="fun.c04($(this),\'combo7\');" value="'+oo.combo1+'" class="form-select center"/></li>\
        <li>包含【技能加点】</li>\
        <li class="right w200">识别【装备】：</li>\
        <li class="w70"><input type="text" onclick="$(this).select();" onblur="fun.c04($(this),\'combo8\');" value="'+oo.combo2+'" class="form-select center"/></li>\
        <li class="right w200">识别【红buff/蓝buff】：</li>\
        <li class="w70"><input type="text" onclick="$(this).select();" onblur="fun.c04($(this),\'combo9\');" value="'+oo.combo3+'" class="form-select center"/></li>\
        <li class="right w200">识别【龙】：</li>\
        <li class="w70"><input type="text" onclick="$(this).select();" onblur="fun.c04($(this),\'combo10\');" value="'+oo.combo4+'" class="form-select center"/></li>\
      </ul>\
      <ul class="Tul list-group-item-action">\
        <li class="right w200">停止攻击：</li>\
        <li class="w70"><input type="text" onclick="$(this).select();" onblur="fun.c04($(this),\'combo5\');" value="'+oo.combo5+'" class="form-select center"/></li>\
        <li class="w200">按键为【右键】</li>\
      </ul>\
      <ul class="Tul list-group-item-action">\
        <li class="right w200">攻击：</li>\
        <li class="w70"><input type="text" onclick="$(this).select();" onblur="fun.c04($(this),\'combo1\');" value="'+oo.combo6+'" class="form-select center"/></li>\
        <li>找到敌方位置，小兵或野怪，走砍。如果是敌方英雄，先"W"再走砍，直到找不到为止。</li>\
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
      case 2:val=1.519;break;//2级
      case 3:val=3.112;break;//3级
      case 4:val=4.779;break;//4级
      case 5:val=6.520;break;//5级
      case 6:val=8.334;break;//6级
      case 7:val=10.223;break;//7级
      case 8:val=12.185;break;//8级
      case 9:val=14.221;break;//9级
      case 10:val=16.331;break;//10级
      case 11:val=18.515;break;//11级
      case 12:val=20.773;break;//12级
      case 13:val=23.104;break;//13级
      case 14:val=25.510;break;//14级
      case 15:val=27.989;break;//15级
      case 16:val=30.542;break;//16级
      case 17:val=33.169;break;//17级
      case 18:val=35.870;break;//18级
      default:val=0;
    }
    return val;
  },
  b11:function(oo)//装备
  {
    let html='\
    <div class="custom-control w150 custom-radio float-left ml-1">\
      <input type="radio" id="equipment1-1" class="custom-control-input" value="1" '+(oo.equipment1==1?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment1\')">\
      <label class="custom-control-label" for="equipment1-1">符能回声打野刀</label>\
    </div>\
    <div class="custom-control w150 custom-radio float-left ml-1">\
      <input type="radio" id="equipment1-1" class="custom-control-input" value="1" '+(oo.equipment1==1?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment1\')">\
      <label class="custom-control-label" for="equipment1-1">明朗之靴</label>\
    </div>\
    <div class="custom-control w150 custom-radio float-left ml-1">\
      <input type="radio" id="equipment1-1" class="custom-control-input" value="1" '+(oo.equipment1==1?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment1\')">\
      <label class="custom-control-label" for="equipment1-1">鬼书</label>\
    </div>\
    <div class="custom-control w150 custom-radio float-left ml-1">\
      <input type="radio" id="equipment1-1" class="custom-control-input" value="1" '+(oo.equipment1==1?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment1\')">\
      <label class="custom-control-label" for="equipment1-1">杀人书</label>\
    </div>\
    <div class="custom-control w150 custom-radio float-left ml-1">\
      <input type="radio" id="equipment1-1" class="custom-control-input" value="1" '+(oo.equipment1==1?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment1\')">\
      <label class="custom-control-label" for="equipment1-1">中亚</label>\
    </div>\
    <div class="custom-control w150 custom-radio float-left ml-1">\
      <input type="radio" id="equipment1-1" class="custom-control-input" value="1" '+(oo.equipment1==1?'checked="checked"':'')+' onclick="fun.c09($(this),\'equipment1\')">\
      <label class="custom-control-label" for="equipment1-1">法穿棒</label>\
    </div>'
    return html;
  },
  b12:function(oo)//加点方向
  {
    let html='\
    <ul class="Tul Title">\
    <li class="w100"></li>\
    <li class="w450 border-l">\
      <div class="custom-control custom-radio">\
        <input type="radio" class="custom-control-input" value="1" id="B1-1" '+(oo.B1==1?'checked="checked"':'')+' onclick="fun.c09($(this),\'B1\')">\
        <label class="custom-control-label" for="B1-1">主Q副E</label>\
      </div>\
    </li>\
    <li class="w350 border-l">\
      <div class="custom-control custom-radio">\
        <input type="radio" class="custom-control-input" value="2" id="B1-2" '+(oo.B1==2?'checked="checked"':'')+'  onclick="fun.c09($(this),\'B1\')">\
        <label class="custom-control-label" for="B1-2">主Q副W</label>\
      </div>\
    </li>\
    </ul>\
    <ul class="Tul Title">\
      <li class="w50">等级</li>\
      <li class="w50">血量</li>\
      <li class="w50 border-l">加点</li>\
      <li class="w100">Q</li>\
      <li class="w100">W</li>\
      <li class="w100">E</li>\
      <li class="w100">R</li>\
      <li class="w50 border-l">加点</li>\
      <li class="w100">Q</li>\
      <li class="w100">W</li>\
      <li class="w100">E</li>\
      <li class="w100">R</li>\
    </ul>'
    for(let i=0;i<oo.Barr.length;i++)
    {
      html+='\
      <ul class="Tul list-group-item-action">\
        <li class="w50">'+(i+1)+'级</li>\
        <li class="w50">'+oo.Barr[i][2]+'</li>\
        <li class="w50 border-l">'+oo.Barr[i][0][0]+'</li>\
        <li class="w100">'+(oo.Barr[i][0][1][0]?oo.Barr[i][0][1][0]+'级（'+oo.Barr[i][0][2][0]+'秒）':'-')+'</li>\
        <li class="w100">'+(oo.Barr[i][0][1][1]?oo.Barr[i][0][1][1]+'级（'+oo.Barr[i][0][2][1]+'秒）':'-')+'</li>\
        <li class="w100">'+(oo.Barr[i][0][1][2]?oo.Barr[i][0][1][2]+'级（'+oo.Barr[i][0][2][2]+'秒）':'-')+'</li>\
        <li class="w100">'+(oo.Barr[i][0][1][3]?oo.Barr[i][0][1][3]+'级（'+oo.Barr[i][0][2][3]+'秒）':'-')+'</li>\
        <li class="w50 border-l">'+oo.Barr[i][1][0]+'</li>\
        <li class="w100">'+(oo.Barr[i][1][1][0]?oo.Barr[i][1][1][0]+'级（'+oo.Barr[i][1][2][0]+'秒）':'-')+'</li>\
        <li class="w100">'+(oo.Barr[i][1][1][1]?oo.Barr[i][1][1][1]+'级（'+oo.Barr[i][1][2][1]+'秒）':'-')+'</li>\
        <li class="w100">'+(oo.Barr[i][1][1][2]?oo.Barr[i][1][1][2]+'级（'+oo.Barr[i][1][2][2]+'秒）':'-')+'</li>\
        <li class="w100">'+(oo.Barr[i][1][1][3]?oo.Barr[i][1][1][3]+'级（'+oo.Barr[i][1][2][3]+'秒）':'-')+'</li>\
      </ul>'
    }
    return html;
  },
  b13:function(txt)//摸眼
  {
    if(this.isStart)//如果执行还没取消
    {this.d02(txt);}
    else
    {this.d02(txt.split(",")[0]);}//松开第一个按键
  },
  b14:function(code,oo,Wtime,SpeedI)
  {
    
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
  c10:function()
  {
    win.ImgTime("英雄联盟/等级/1级.bmp|英雄联盟/等级/2级.bmp|英雄联盟/等级/3级.bmp|英雄联盟/等级/4级.bmp|英雄联盟/等级/5级.bmp|英雄联盟/等级/6级.bmp|英雄联盟/等级/7级.bmp|英雄联盟/等级/8级.bmp|英雄联盟/等级/9级.bmp|英雄联盟/等级/10级.bmp|英雄联盟/等级/11级.bmp|英雄联盟/等级/12级.bmp|英雄联盟/等级/13级.bmp|英雄联盟/等级/14级.bmp|英雄联盟/等级/15级.bmp|英雄联盟/等级/16级.bmp|英雄联盟/等级/17级.bmp|英雄联盟/等级/18级.bmp",1,800,this.c11,this);//
  },
  c11:function(t)
  { 
    if(t.indexOf("找图片次数超限")!=-1)
		{$("#code").html(t);}
		else
		{
      $("#code").html("等级:"+t);
      eval("let arr="+t);
      this.obj.code[0].A1=arr.length;
      let oo=this.obj.code[0]
      let key=(oo.Barr[oo.A1-1][oo.B1-1][0]).charCodeAt();
      this.d02("162◣50,"+key+"◣50,"+key+"◤50,162◤50");//加点
     Tool.ajax.a01(this.b05(),1,this.c07,this);//保存
    }
  },
  d01:function(IO)
  {
    if(IO==this.combo5){win.KeyArrStop();this.isLock=false;this.d02("R◣50,R◤10")}//停止按键
    win.setIO(0);
  },
  ////////////////////////////////////////////
  d02:function(txt)
  {
    $("#code").html($("#code").html()+"\n要执行："+txt)
    win.KeyArr(txt);
    Tool.Time(this.d03,this.b06(txt),this,"2");
  },
  d03:function()//执行完了.
	{    
    this.isLock=false;
    $("#code").html($("#code").html()+"\n返回值：\n"+window.external.Img+"\n");
  },
  //////////////////////////////////////

})

fun.a03();
      
