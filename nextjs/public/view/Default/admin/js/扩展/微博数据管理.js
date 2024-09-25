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
    let html='<header class="panel-heading">微博数据管理</header>\
    <table class="table table-hover align-middle">\
    <tr>\
      <td colspan="2"><a >微博数据管理</a> | <a>微博评论数据</a></td>\
    </tr>\
    <tr>\
      <td>选中</td>\
      <td>微博内容</td>\
    </tr>\
    <form name="myform" id="myform" method="Post" action="KS.UserLog.aspx?Action=Del">\
      <tr>\
        <td><input type="checkbox" name="ID" value=\'2\' id="ID-2">\
          <label for="ID-2">2</label></td>\
        <td><a href=\'../user/weibo.aspx?userid=2\' target=\'_blank\'>admin</a> &nbsp;&nbsp; <span style=\'color:#999\'>-2013/1/16 13:04:32 - 会员广播</span> <a href=\'?action=Del&id=9\' onclick="return(confirm(\'确定删除吗?\'))">删除</a>\
          <div style=\'color:#888;margin:10px\'>dssssssssssssssssss</div></td>\
      </tr>\
      <tr>\
        <td colspan="2"><input type="button" class="pn" value="反选"  />\
          <input type="button" value="删除选中的记录" onclick="DelDiggList();" class="pn">\
          <strong>按用户名搜索：</strong>\
          <input  type=\'text\' name=\'key\'>\
          <input class="pn" type=\'button\' value=\'搜索\'/></td>\
      </tr>\
    </form>\
  </table>\
  <form action=\'KS.UserLog.aspx?action=DelAllRecord\' method=\'post\' target=\'_hiddenframe\'>\
    <iframe src=\'about:blank\' style=\'display:none\' name=\'_hiddenframe\' id=\'_hiddenframe\'></iframe>\
    <div class=\'attention\'> <strong>特别提醒： </strong><br/>\
      当站点运行一段时间后,网站的微博记录表可能存放着大量的记录,为使系统的运行性能更佳,建议一段时间后清理一次。<br />\
      <strong>删除范围：</strong>\
      <input name="deltype" type="radio" value=1 id="deltype-1"/>\
      <label for="deltype-1">10天前</label>\
      <input name="deltype" type="radio" value="2" id="deltype-2"/>\
      <label for="deltype-2">1个月前</label>\
      <input name="deltype" type="radio" value="3" id="deltype-3"/>\
      <label for="deltype-3">2个月前</label>\
      <input name="deltype" type="radio" value="4" id="deltype-4"/>\
      <label for="deltype-4">3个月前</label>\
      <input name="deltype" type="radio" value="5" id="deltype-5"/>\
      <label for="deltype-5">6个月前</label>\
      <input name="deltype" type="radio" value="6" checked="checked"  id="deltype-6"/>\
      <label for="deltype-6">1年前</label>\
      <input  type="submit"  class="pn" value="执行删除">\
    </div>\
  </form>'
    Tool.html(null,null,html)
  }
}
fun.a01();

/*


<SCRIPT language=javascript>
		function DelDiggList(){
			let ids=get_Ids(document.myform);
			if (ids!=''){ 
				if (confirm('真的要删除选中的记录吗?')){
				$("#myform").action="KS.UserLog.aspx?Action=Del&show=&ID="+ids;
				$("#myform").submit();}
			}else { alert('请选择要删除的记录!');}
		}
		function DelDigg(){if (confirm('真的要删除选中的记录吗?')){$("#myform").submit();}	}
		</SCRIPT>
  <style type="text/css">
			.imglist{margin-top:10px;height:70px;}
		   .imglist ul{}
		   .imglist ul li{float:left;width:70px;padding:margin:10px;}
		   .imglist ul li img{width:60px;height:60px;border:1px solid #ccc;padding:1px;}
		   .intropic{margin:10px;}
		   .intro{margin:10px;color:#999;}
		   .intropic img{width:120px;border:1px solid #ccc;padding:2px}
		   a.logtitle{font-size:14px;}
		</style>
  
  
  <script language="javascript">
        $.fn.checkpre_id = function(){return this.each(function(){ this.checked = !this.checked; });}//反选
        $('input').customInput()
        $("#checkOthers").click(function(){$("input:checkbox").checkpre_id();$('input').customInput()});
      </script> 
*/