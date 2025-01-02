'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    this.a02();
  },
  a02:function()
	{
    let html='\
    <header class="panel-heading">生成baidu地图</header>\
    <table class="table table-hover align-middle">\
      <tr>\
      <td> 总输出数量\
        <input type=\'text\' id=\'allmakenum\' value=\'50000\'>\
        每页数量\
        <input type=\'text\' id=\'makenum\' value=\'1000\'>\
        <input type=\'button\' class="pn" value=\'开始生成\' onClick="javascript:location.href=\'ajax/admin_make.aspx?action=baidu&flag=1&allmakenum=\'+S(\'allmakenum\').value+\'&makenum=\'+S(\'makenum\').value"/></td>\
    </tr>\
      <tr class="thead">\
        <td colspan="2">生成baidu推广关键词</td>\
      </tr>\
      <tr>\
        <td colspan="2"><pres>\
            <textarea name="des" style="width:95%;font-family: Arial, Helvetica, sans-serif;font-size: 14px;" wrap="off" rows="5" dataType="Require"></textarea>\
          </pres></td>\
        </td>\
      </tr>\
      <tr>\
        <td colspan="2"><input type="submit" class="pn" value=\'生成baidu推广关键词\'/></td>\
        </td>\
      </tr>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();