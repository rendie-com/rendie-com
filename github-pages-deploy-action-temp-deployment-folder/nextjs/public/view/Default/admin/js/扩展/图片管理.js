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
      <r:photo size=10 page=4 where="">,\
      {\
        "id":[photo:id]\
      }</r:photo>]'
		Tool.ajax.a01(html,obj.arr[4],this.a03,this);
	},
	a03:function(list)
	{
    let html=''
    for(let i=1;i<list.length;i++)
    {
      html+='\
      <tr align="center">\
          <td align="left"><input type="checkbox" value="[photo:id]" name="pre_id"  class="checkbox" id="check-[photo:id]"/>\
            <label for="check-[photo:id]">[photo:id]</label></td>\
          <td align="left"><a href="[photo:id]" target="_blank">[photo:name]</a><if "[photo:fromurl]"!=""}&nbsp;（<a href="[photo:fromurl]" target="_blank">查看来源</a>）\
            </if></td>\
          <td>[photo:hit]</td>\
          <td align="left"></td>\
          <td align="left"><div class="basic" data="[photo:commend]_[photo:id]"></div></td>\
          <td><span title="[photo:addtime]">[photo:addtime]</span></td>\
          {if "Fun(Config(RunMode))"=="static"}\
          <td><a href="ajax/admin_make.aspx?PhotoMakeRadio/[photo:id].html"> 点击生成HTML</a></td>\
          </if>\
          <td><a href="[photo:id]">编辑</a>&nbsp;|&nbsp;<a href="ajax/admin_content.aspx?PhotoRecycle/[photo:id].html">隐藏</a></td>\
        </tr>'
    }
    html+='<tr><td colspan="8" class="left">'+Tool.page(list[0].count, list[0].size,4)+'</td></tr>'
    html=this.b01()+'\
    <table class="table table-hover center">\
      <thead class="table-light">'+this.b02()+'</thead>\
      <tbody>'+html+'</tbody>\
    </table>'
    Tool.a01(html)
  },
  b01:function()
	{
    return '\
    <div class="input-group w-50 m-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+obj.arr[6]+'">'+this.b03(obj.arr[6])+'</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c11(1)" value="1">标题</li>\
        <li class="dropdown-item pointer" onclick="fun.c11(2)" value="2">ID</a></li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+(obj.arr[7]=="-_-20"?"":Tool.unescape(obj.arr[7]))+'" onKeyDown="if(event.keyCode==13) fun.c02();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
    </div>'
  },
  b02:function()
	{
    return '\
    <tr>\
      <th colspan="8" class="left"> <a href="ajax/admin_content.aspx?DownPhotoPic">下载图片字段中的网络图片</a> &nbsp;&nbsp;|&nbsp;&nbsp; <a href="ajax/admin_content.aspx?PhotoPicWater">给内图片字段中的图片加水印</a> &nbsp;&nbsp;|&nbsp;&nbsp;\
        生成图片缩略图：\
        <input type="text" value="116" size="3" id="PhotoW" />\
        X\
        <input type="text" id="PhotoH" value="86" size="3" />\
        <input type="button" value="生成" class="pn" onClick="location.href=\'ajax/admin_content.aspx?MakeThumbnail/\'+$(\'#PhotoW\').val()+\'/\'+$(\'#PhotoH\').val()+\'.html\';"/>\
        &nbsp;&nbsp;|&nbsp;&nbsp;\
        同名数据检测 ：\
        检测长度&nbsp;\
        <input type="text" id="rlen" size="5" value="" maxlength="2"  onkeyup="this.value=this.value.replace(/\D/g,\'\')">\
        <input type="button" class="pn" onClick="location.href=\'?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/{r:arr(4)/>/{r:arr(5)/>/title-\'+$(\'#rlen\').val()+\'.html\';" value="查询">\
      </th>\
    </tr>\
    <tr>\
      <th>ID</th>\
      <th align="left">标题</th>\
      <th>人气</th>\
      <th>数据类别</th>\
      <th>推荐星级</th>\
      <th>时间</th>\
      <th>生成</th>\
      <th>操作</th>\
    </tr>'
  },
  b03:function(val)
	{
    let name="";
    switch(val)
		{
		  case "1":name="标题";break;
		  case "2":name="ID";break;
      default:name="未知："+val;
		}
    return name
  }
}
fun.a01()