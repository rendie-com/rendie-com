'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    obj.arr[4]=obj.arr[4]?parseInt(obj.arr[4]):1;//翻页
    obj.arr[5]=obj.arr[5]?obj.arr[5]:"-_-20";//分类
    obj.arr[6]=obj.arr[6]?obj.arr[6]:"1";//搜索字段  
    obj.arr[7]=obj.arr[7]?obj.arr[7]:"-_-20";//搜索关键词  
    this.a02();
  },
  a02:function()
	{
		let html='\
    [\
      {\
        "size":20,\
        "count":<@count/>\
      }\
      <r:review size=25 page=3 where=" r Inner Join @.product p on r.:fromid=p.:id where r.:from=\'news\'">,\
      {\
        "id":[review:r.:id]\
      }</r:review>]'
		Tool.ajax.a01(html,obj.arr[4],this.a03,this);
	},
	a03:function(list)
	{
    let html=''
    for(let i=1;i<list.length;i++)
    {
      html+='\
      <tr align="center">\
      <td align="left">\
      <input type="checkbox" value="[review:r.:id]" name="pre_id" id="pre_id-[review:r.:id]" />\
      <label for="pre_id-[review:r.:id]">[review:r.:id]</label>\
      </td>\
      <td align="left">\
      [review:r.:des len=70]&nbsp; \
      （<a href="[review:r.:id]">查看详情</a>）\
      </td>\
      <td>\
      <a href="[review:p.:id]" target="_blank" title="[review:p.:name]">[review:p.:name len=40]([review:r.:fromid])</a>\
      </td>\
      </td>\
      <td>[review:r.:addtime]</td>\
      <td>([review:r.:ip])</td>\
      <td>\
        <a onClick="if(confirm(\'确定要删除吗\')){return true;}else{return false;}" href="ajax/admin_webhelper.aspx?CommentDelProduct/[review:r.:id]" >删除</a>\
        </td>\
  </tr>'
    }
    html+='<tr><td colspan="4" class="left">'+Tool.page(list[0].count, list[0].size,4)+'</td></tr>'
    html=this.b01()+'\
    <div class="p-2">\
      <table class="table table-hover center">\
      <thead class="table-light">'+this.b02()+'</thead>\
      <tbody>'+html+'</tbody>\
      </table>\
    </div>'
    Tool.html(null,null,html)
  },
  b01:function()
	{
    return '\
    <header class="panel-heading">新闻评论管理</header>\
    <div class="input-group w-50 m-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+obj.arr[6]+'">'+this.b03(obj.arr[6])+'</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c11(1)" value="1">评论者IP</li>\
        <li class="dropdown-item pointer" onclick="fun.c11(2)" value="2">评论内容</a></li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+(obj.arr[7]=="-_-20"?"":Tool.unescape(obj.arr[7]))+'" onKeyDown="if(event.keyCode==13) fun.c02();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
    </div>'
  },
  b02:function()
	{
    return '\
    <tr>\
      <th width="60">ID</th>\
      <th>评论内容</th>\
      <th>评论数据名称(ID)</th>\
      <th>时间</th>\
      <th>评论者IP</th>\
      <th>操作</th>\
    </tr>'
  },
  b03:function(val)
	{
    let name="";
    switch(val)
		{
		  case "1":name="评论者IP";break;
		  case "2":name="评论内容";break;
      default:name="未知："+val;
		}
    return name
  },
}
fun.a01()
/*
	<tr>
	  <td colspan="6">
      <input type="button" class="pn" value="反选" onClick="checkOthers('input','pre_id')" />  
      <input type="submit" value="批量删除" onClick="if(confirm('确定要删除吗')){listform.action='ajax/admin_webhelper.aspx?CommentDelNews';}else{return false}" class="pn"/>
      <input type="submit" value="全部删除" onClick="if(confirm('确定要删除全部吗')){listform.action='ajax/admin_webhelper.aspx?CommentDelNews/all'}" class="pn"/>
	</tr>

*/