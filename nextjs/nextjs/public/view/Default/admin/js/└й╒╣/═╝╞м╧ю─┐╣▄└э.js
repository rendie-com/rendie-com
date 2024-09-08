'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    obj.arr[4]=obj.arr[4]?parseInt(obj.arr[4]):1;//翻页
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
      <r:gatherURL size=20 page=2 where=" where @.type=\'photo\'">,\
      {\
        "id":[gatherURL:id]\
      }</r:gatherURL>]'
		Tool.ajax.a01(html,obj.arr[4],this.a03,this);
  },
	a03:function(list)
	{
   let html=''
    for(let i=1;i<list.length;i++)
    {
      html+='\
      <tr align="center">\
        <td><input type="checkbox" class="checkbox" name="filename" value="[gatherURL:id]"  id="check-[gatherURL:id]"/>\
          <label for="check-[gatherURL:id]">[gatherURL:id]</label></td>\
        <td align="left">[gatherURL:name]</td>\
        <td>[gatherURL:note]</td>\
        <td>[gatherURL:from]</td>\
        <td>[gatherURL:addtime]</td>\
        <td>[gatherURL:LastTime]</td>\
        <td><a href="<.arr(1)/>/list/<:attr(type1)/>/[gatherURL:id].html"> 采集 </a> &nbsp;|&nbsp;<a href="<.arr(1)/>/list/<:attr(type2)/>/[gatherURL:id].html"> 预览 </a> &nbsp;|&nbsp;<a href="javascript:" onClick="Clone(\'[gatherURL:id]\',\'[area:name tag=1]\')"> 克隆 </a> &nbsp;|&nbsp;<a href="{r:arr(1)/>/list/{rr:attr(edit1)/>/[gatherURL:id].html"> 编辑 </a> &nbsp;|&nbsp;<a href="javascript:" onClick="delFile(\'[gatherURL:id]\')"> 删除 </a></td>\
      </tr>'
    }
    html+='<tr><td colspan="8" class="left">'+Tool.page(list[0].count, list[0].size,4)+'</td></tr>'
    html='\
    <table class="table table-hover center">\
      <thead class="table-light">'+this.b01()+'</thead>\
      <tbody>'+html+'</tbody>\
    </table>'
    Tool.a01(html)
  },
	b01:function()
	{
    return '\
    <tr align="center">\
      <th>ID</th>\
      <th align="left">采集类目说明</th>\
      <th>采集配置信息说明</th>\
      <th>来源</th>\
      <th>添加时间</th>\
      <th>上次采集时间</th>\
      <th>操作</th>\
    </tr>'
  }
}
fun.a01();