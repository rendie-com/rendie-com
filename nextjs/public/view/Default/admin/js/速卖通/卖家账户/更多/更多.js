'use strict';
var fun=
{
  obj:{},
  a01:function()
  {
    obj.arr[5]=obj.arr[5]?obj.arr[5]:"-_-20";//账号来源ID
    this.a02();
  },
  a02:function()
  {
    let str='\
    {\
    "count1":<.Db(sqlite.aliexpress,select sum(@.upshelf+@.downshelf+@.Pending+@.NotThrough+@.Complaint) from @.seller where @.fromid='+obj.arr[5]+',count)/>,\
    <r:seller size=1 db="sqlite.aliexpress" where=" where @.fromid='+obj.arr[5]+'">\
      "UserName":"<:UserName/>",\
      "gathertime":<:gathertime/>,\
      "msgLastTime":<:msgLastTime/>,\
      "upshelf":"<:upshelf/>",\
      "downshelf":"<:downshelf/>",\
      "Pending":"<:Pending/>",\
      "NotThrough":"<:NotThrough/>",\
      "Complaint":"<:Complaint/>"\
    </r:seller>\
    }'
    Tool.ajax.a01(str,1,this.a03,this)
  },
  a03:function(oo)
  {
    let str='{}'
    Tool.ajax.a01(str,1,this.a04,this,oo)
  },
  a04:function(o1,o2)
  {
    let html='\
    <header class="panel-heading"><a href="javascript:;" onclick="Tool.main()" class="arrow_back"></a>更多操作</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
    <tr><td class="right w200">账号：</td><td colspan="6">'+o2.UserName+'</td></tr>\
    <tr><td class="right">采集【订单】时间：</td><td colspan="6">'+Tool.js_date_time2(o2.gathertime)+'</td></tr>\
    <tr><td class="right">采集【站内信】时间：</td><td colspan="6">'+Tool.js_date_time2(o2.msgLastTime)+'</td></tr>\
    <tr>\
      <td class="right">敦煌网状态：</td>\
      <td>总数('+o2.count1+')</td>\
      <td>上架('+o2.upshelf+')</td>\
      <td>下架('+o2.downshelf+')</td>\
      <td>待审核('+o2.Pending+')</td>\
      <td>审核未通过('+o2.NotThrough+')</td>\
      <td>品牌商投诉('+o2.Complaint+')</td>\
    </tr>\
    <tr>\
      <td class="right">操作：</td>\
      <td colspan="6">\
				<div class="btn-group">\
				<button type="button" class="btn btn-secondary" onclick="Tool.main(\'js01/'+obj.arr[5]+'\')">上传商品</button>\
				<button type="button" class="btn btn-secondary" onclick="Tool.open5(\'xxxxx\','+obj.arr[5]+')">*将【20天外】没更新的【来源数据】进行更新('+o1.count20+')</button>\
				</div>\
			</td>\
    </tr>\
    </table>\
    </div>'
    Tool.html(null,null,html);
  },
  b01:function()
  {},
  b02:function(oo)
  {},  
  c01:function()
  {},
  c02:function(t)
  {},

}
fun.a01();