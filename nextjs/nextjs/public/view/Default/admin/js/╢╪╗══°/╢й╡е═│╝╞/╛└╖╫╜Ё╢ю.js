'use strict';
var fun =
{
  obj: {},
  a01: function () {
		obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
    obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//月份
    obj.arr[6] = obj.arr[6] ? obj.arr[6] : 1//翻页
    this.a02();
  },
  a02: function () {

    let data5 = new Date(obj.arr[5].substr(0, 4), parseInt(obj.arr[5].substr(4)))
    let month = new Date(data5.getFullYear(), data5.getMonth()+ 1, 1)
    let monthNext = new Date(data5.getFullYear(), data5.getMonth() + 2, 1)

   //Tool.at()

     let where = ' where ' + Tool.gettime(month) + '<=@.BeginDate && @.BeginDate<' + Tool.gettime(monthNext)
    let str = '[{"count":<@count/>,"size":10}\
    <r:order size=10 db="sqlite.dhgate" page=2 where="'+where+'">,\
      {\
        "id":<:id/>,\
			  "orderid":"<:orderid/>"\
      }\
    </r:order>]'
   Tool.ajax.a01( str, 1,this.a03, this, "下单时间从：" + Tool.js_date_time(month) + " 至 " + Tool.js_date_time(monthNext))
  },
  a03: function (arr,str2) {
    let str = "";
    for (let i = 1; i < arr.length; i++) {
      str += '<tr><td>' + arr[i].orderid+'</td></tr>';
    }
    str += '<tr><td colspan="5">' + Tool.page(arr[0].count, arr[0].size, 6) + '</td></tr>'
    let html = Tool.header('订单统计 -&gt; 纠纷金额（' + str2  +'）')+'\
    <div class="p-2">\
      <table class="table table-hover">\
        <thead class="table-light center"></thead>\
        <tbody>'+ str + '</tbody>\
      </table>\
    </div>'
    Tool.html(null, null, html);
    
  }
}
fun.a01();