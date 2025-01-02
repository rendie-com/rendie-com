'use strict';
var fun=
{
	obj:{},
  a01:function()
	{
   Tool.ajax.a01( this.b01(0),1,this.a02,this);
  },
  a02:function(arr)
	{
    let html = ''
    for (let i = 1; i < arr.length; i++) 
    {
      html += '\
      <tr>\
				<td><a href="javascript:" class="Mo MoA" onclick="fun.c01($(this),\''+ arr[i].fromID + '\')"></a> ' + arr[i].fromID + '</td>\
				<td>'+ arr[i].name + '（' + arr[i].enname + '）</td>\
      </tr>'
    }
    html = '\
    <header class="panel-heading">eBay -&gt; 类目列表</header>\
		<div class="p-2">\
			<table class="table table-hover align-middle">\
				<thead class="table-light">\
					<tr>\
						<th>来源ID</th>\
						<th>分类名称（英文）</th>\
					</tr>\
				</thead>\
				<tbody>'+html+'</tbody>\
			</table>\
		</div>'
    Tool.html(null,null,html);
  },
  b01:function(fromID)
	{
    let html='\
    [{}\
    <r:type db="mysql.eBay" where=" where @.upid=\''+fromID+'\' order by @.sort asc" size=200>\
    ,{\
      "isleaf":"<:isleaf/>",\
      "fromID":"<:fromID/>",\
      "name":"<:name/>",\
      "enname":"<:enname/>"\
    }\
    </r:type>]';
    return html
  },
  c01: function (This, fromID)
  {
    if (This.attr("Class") == "Mo MoB") { $(".Mo" + fromID).hide(); This.attr("Class", "Mo MoA"); }
    else
    {
      This.attr("Class", "Mo MoB")
      if ($(".Mo" + fromID).length) { $(".Mo" + fromID).show(); }
      else
      {
        This.parent().parent().after('<div class="Mo' + fromID + '"><img src="' + o.path + 'admin/img/loading_42x42.gif"/> 正在加载【子类】。。。</div>');
        let m1 = parseInt(This.css("margin-left")) + 20
        Tool.ajax.a01( this.b01(fromID),1,this.c02, this, [fromID, m1]);
      }
    }
  },
  c02: function (arr, oo)
  {
    let str = '', li1 = '', li2 = '';
    for (let i = 1; i < arr.length; i++)
    {
      if (arr[i].isleaf == "False")
			{
				li1 = '<a href="javascript:" class="Mo MoA" onclick="fun.c01($(this),\'' + arr[i].fromID + '\')" style="margin-left:' + oo[1] + 'px;"></a>'; li2 = ''
			}
      else
			{
				li1 = '<a class="Mo" style="margin-left:' + oo[1] + 'px;"></a>'; li2 = '<button type="button" class="btn form-control-sm btn-outline-secondary" onclick="fun.c03($(this),\'' + arr[i].fromID + '\')">查看属性</button>'
			}
      str += '\
      <ul class="Tul list-group-item-action">\
      	<li class="w200">'+ li1 + ' ' + arr[i].fromID + '</li>\
      	<li class="p-top1">'+ arr[i].name + '（' + arr[i].enname + '）' + li2 + '</li>\
      </ul>'
    }
    if (str == "")
		{
			str = '<ul class="Tul list-group-item-action"><li style="margin-left:' + oo[1] + 'px;">没有子类<li></ul>'
		}
    $(".Mo" + oo[0]).html(str);
  }
}
fun.a01();