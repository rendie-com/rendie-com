'use strict';
let F3=
{
  a01:function()
  {
    obj.arr[6] = obj.arr[6] ? parseInt(obj.arr[6]) : 1;
    obj.arr[7] = obj.arr[7] ? obj.arr[7] :"-_-20";
    obj.arr[8] = obj.arr[8] ? obj.arr[8] :"-_-20";
    obj.arr[9] = obj.arr[9] ? obj.arr[9] :"-_-20";
    this.a02();    
  },
  a02:function ()
  {
    let str=''//and :buyerorgid is null and @.time2 is null
        //"count1":<.Db(select count(1) from @.msguser where @.buyerorgid in (select @.buyerorgid from @.msguser group by :buyerorgid having count(1) >= 2),count)/>,\
        //"count3":<.Db(select count(1) from @.msguser where @.buyerid in (select @.buyerid from @.msguser group by :buyerid having count(1) >= 2),count)/>,\
    str='\
    [\
      {\
        "seller":[{}'+fun.b06()+'],"count":<@count/>,"size":20,\
        "count2":<.Db(sqlite.dhgate,select count(1) from @.msguser where @.buyerorgid is null,count)/>,\
        "count4":<.Db(sqlite.dhgate,select count(1) from @.msguser where @.buyerid is null,count)/>,\
        "count5":<.Db("sqlite.dhgate","select count(1) from @.msguser where not(@.buyerid is null or @.buyerid=\'0\' or @.buyerid=\'1\') and DateDiff('+Tool.yymm('day','access')+',:time3,GETDATE())>60","count")/>,\
        "count6":<.Db(sqlite.dhgate,select count(1) from @.msguser where @.buyer=\'\',count)/>,\
        "count7":<.Db(sqlite.dhgate,select count(1) from @.msguser where @.buyer=@.seller,count)/>,\
        "count8":<.Db(sqlite.dhgate,select count(1) from @.msguser where @.sellerid=0,count)/>,\
        "count9":<.Db(sqlite.dhgate,select count(1) from @.msguser where @.buyer=\'0\',count)/>,\
        "count10":<.Db(sqlite.dhgate,select count(1) from @.msguser where @.buyerid=\'0\',count)/>\
      }\
      <r:msguser size=20 db="sqlite.dhgate" page=2 where=" where 1=1 '+this.b02()+' order by @.time3 desc">,\
      {\
        "seller":"[msguser:seller]",\
        "sellerid":"[msguser:sellerid]",\
        "buyer":"[msguser:buyer]",\
        "time1":"[msguser:time1]",\
        "time2":"[msguser:time2]",\
        "time3":"[msguser:time3]",\
        "keys":"[msguser:keys tag=js]",\
        "types":"[msguser:types tag=js]",\
        "buyerid":"[msguser:buyerid]",\
        "buyerorgid":"[msguser:buyerorgid]"\
      }\
      </r:msguser>\
    ]'
    Tool.ajax.a01( str ,obj.arr[6],this.a03, this);
  },
  a03:function (arr)
  {
    let html = this.b01(arr[0]);
    for(let i=1;i<arr.length;i++)
    {
      html+='<ul class="Tul center row list-group-item-action">\
      <li class="w200">'+arr[i].seller+'<hr/>'+arr[i].sellerid+'</li>\
      <li class="w250">'+arr[i].buyer+'<hr/>'+arr[i].buyerorgid+'<hr/>'+arr[i].buyerid+'</li>\
      <li class="col left">'+arr[i].types+'</li>\
      <li class="col left">'+arr[i].keys+'</li>\
      <li class="w170">'+arr[i].time1+'<hr/>'+arr[i].time2+'<hr/>'+arr[i].time3+'</li>\
    </ul>'
    }
     html +='\
    <div class="Tul row list-group-item-action">\
      <div class="btn-group btn-group-sm">\
      <button type="button" class="btn btn-secondary" onClick="F3.c03()">删除买家名称为空（'+arr[0].count6+'）</button>\
      <button type="button" class="btn btn-secondary" onClick="F3.c05()">删除买家与卖家相同（'+arr[0].count7+'）</button>\
      <button type="button" class="btn btn-secondary" onClick="Tool.main(\'js3.html\');">获取站内信中的用户</button>\
      <button type="button" class="btn btn-secondary" onClick="Tool.main(\'js4\');">60天没联系的买家发送推广站内信('+arr[0].count5+')</button>\
      <button type="button" class="btn btn-secondary" onClick="F3.c06()">删除买家原始ID为空（'+arr[0].count2+'）</button>\
      </div>\
    </div>\
    <div class="Tul row list-group-item-action">\
      <div class="btn-group btn-group-sm">\
        <button type="button" class="btn btn-secondary" onClick="Tool.main(\'js5\');" title="注：会把订单的【orderid32】传入到【buyer】">获取订单中的用户</button>\
        <button type="button" class="btn btn-secondary" onClick="Tool.main(\'js6/orderid32.html\');">*1.根据【orderid32】修复【buyer,buyerID】（'+arr[0].count4+'）</button>\
        <button type="button" class="btn btn-secondary" onClick="Tool.main(\'js7\');">2.把订单【orderid】传入到【buyer】（'+arr[0].count9+'）</button>\
        <button type="button" class="btn btn-secondary" onClick="Tool.main(\'js6/orderid.html\');">*3.根据【orderid】修复【buyer,buyerID】（'+arr[0].count10+'）</button>\
      </div>\
    </div>\
    '+Tool.page(arr[0].count, arr[0].size, 6)
    Tool.html(null,null,html);
  },
  b01:function(oo)
  {
    let li1 = "", html = fun.b05(),arr=oo.seller;
    for (let i = 1; i < arr.length; i++){li1 += '<Option value="' + arr[i].fromid + '" ' + (obj.arr[7] == arr[i].fromid ? 'selected="selected"' : '') + '>(' + i  + ')' + arr[i].UserName + '</option>';}
    html += '\
    <div class="Tul">\
      <div class="input-group w400">\
        <div class="input-group-prepend">\
        <select id="Field" class="form-select">\
        <option value="1" '+ (obj.arr[8] == "1" ? 'selected="selected"' : '') + '>买家名称</option>\
        <option value="2" '+ (obj.arr[8] == "2" ? 'selected="selected"' : '') + '>买家ID</option>\
        <option value="3" '+ (obj.arr[8] == "3" ? 'selected="selected"' : '') + '>买家原始ID</option>\
        </select>\
        </div>\
        <input type="text" id="searchword" class="form-select" value="'+ Tool.unescape(obj.arr[9]) + '" onKeyDown="if(event.keyCode==13) F3.c02();">\
        <div class="input-group-append"><button class="btn btn-outline-secondary form-control-sm" type="button" onclick="F3.c02();">搜索</button></div>\
      </div>\
    </div>\
    <ul class="Tul Title center row">\
      <li class="w200"><Select class="form-select" onChange="Tool.open(7,this.options[this.selectedIndex].value)"><option value="-_-20">卖家</option>'+ li1 + '</Select></li>\
      <li class="w250" title="买家原始ID重复：'+oo.count1+'个\n买家原始ID为空：'+oo.count2+'个\n买家ID重复：'+oo.count3+'个\n买家ID为空：'+oo.count4+'个\n卖家ID为零：'+oo.count8+'个">买家账号/买家原始ID/买家ID</li>\
      <li class="col left">类目</li>\
      <li class="col left">关键词</li>\
      <li class="w170">【添加/群发/站内信】时间</li>\
    </ul>'
    return html;
  },
  b02:function()
  {
    let where=""
    if (obj.arr[7] != "-_-20") { where += " and @.sellerid=" + obj.arr[7]; }
    if (obj.arr[9] != "-_-20")
    {
      switch (obj.arr[8]) 
      {
        case "1": where += " and @.buyer like '%" + Tool.unescape(obj.arr[9]) + "%'"; break;//主题
        case "2": where += " and @.buyerid like '%" + Tool.unescape(obj.arr[9]) + "%'"; break;//联系人        
        case "3": where += " and @.buyerorgid like '%" + Tool.unescape(obj.arr[9]) + "%'"; break;//联系人        
      }
    }
    return where;
  },
  c01: function(page){obj.arr[6] = page;Tool.main(obj.arr.join("/")); },
  c02: function ()
  {
    let searchword=Tool.Trim($("#searchword").val());
    if(searchword)
    {        
      searchword=encodeURIComponent(searchword);
       Tool.main(o.mode + obj.arr[0] + "/list/" + obj.arr[2] + "/" + obj.arr[3] + "/1/4/1/%20/" + $("#Field").val() + "/" + searchword + ".html");
    }else{alert("请输入搜索内容");}  
  },
  c03:function()
  {
    let str='<r: db="sqlite.dhgate">delete from @.msguser where @.buyer=\'\'</r:>'
    Tool.ajax.a01( str , this,obj.arr[6],this.c04);
  },
  c04:function(t)
  {
    if(t=="")
		{window.location.reload();}
		else
		{alert("出错"+t);}
  },
  c05:function()
  {
    let str='<r: db="sqlite.dhgate">delete from @.msguser where @.buyer=@.seller</r:>'
    Tool.ajax.a01( str ,obj.arr[6],this.c04, this);
  },
  c06:function()
  {
    let str='<r: db="sqlite.dhgate">delete from @.msguser where @.buyerorgId is null</r:>'
    Tool.ajax.a01(str,obj.arr[6] , this.c04, this);
  }
}
F3.a01();