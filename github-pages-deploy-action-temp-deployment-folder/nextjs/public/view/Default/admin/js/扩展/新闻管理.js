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
      <r:news size=10 page=4 where="">,\
      {\
        "id":[news:id]\
      }</r:news>]'
		Tool.ajax.a01(html,obj.arr[4],this.a03,this);
	},
	a03:function(list)
	{
    let html=''
    for(let i=1;i<list.length;i++)
    {
      html+='\
      <tr align="center">\
          <td align="left"><input type="checkbox" value="[news:id]" name="pre_id"  class="checkbox" id="check-[news:id]"/>\
            <label for="check-[news:id]">[news:id]</label></td>\
          <td align="left"><a href="/Default.aspx[news:id]" target="_blank">[news:name]</a><if "[news:fromurl]"!=""}&nbsp;（<a href="[news:fromurl]" target="_blank">查看来源</a>）\
            </if></td>\
          <td>[news:hit]</td>\
          <td></td>\
          <td align="left"><div class="basic" data="[news:commend]_[news:id]"></div></td>\
          <td><span title="[news:addtime]">[news:addtime]</span></td>\
          <td><a href="/<.Config(admin)/>/ajax/admin_content.aspx/NewsMakeRadio/[news:id].html"> <img src=\'<.Path/>admin/img/{if "[news:id]"=="True"}yes{else//>no{/if/>.gif\' border=\'0\' title=\'点击生成HTML\' /> </a></td>\
          <td><a href="[news:id]">编辑</a>&nbsp;|&nbsp;<a href="/<.Config(admin)/>/ajax/admin_content.aspx/NewsRecycle/[news:id].html">隐藏</a></td>\
        </tr>'
    }
    html+='<tr><td colspan="7" class="left">'+Tool.page(list[0].count, list[0].size,4)+'</td></tr>\
        <tr>\
        <td colspan="7"class="left"><input type="button" class="pn" value="反选" onClick="checkOthers(\'input\',\'pre_id\')" />\
          <input type="submit" value="批量隐藏" class="pn" onClick="newsform.action=\'/<.Config(admin)/>/ajax/admin_content.aspx/NewsRecycle.html\';">\
          <input type="submit" value="批量生成" class="pn" onClick="newsform.action=\'/<.Config(admin)/>/ajax/admin_content.aspx/NewsMakeSelected.html\'" />\
          <select name="movetype" id="movetype" >\
            <option value="">请选择目标分类</option>\
          </select>\
          <input type="submit" value="批量移动" class="pn" onClick="if($(\'#movetype\').val()==\'\'){alert(\'请选择目标分类\');return false;};if(confirm(\'确定要批量移动数据吗\')){newsform.action=\'ajax/admin_content.aspx?NewsSetType\'}else{return false;}"/></td>\
      </tr>'
    
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
      <th colspan="7" class="left">\
        <a href="ajax/admin_content.aspx?DownNewsPic">下载图片中的网络图片</a>\
        &nbsp;&nbsp;|&nbsp;&nbsp;\
        <a href="ajax/admin_content.aspx?NewsDesPicDown">下载内容中的网络图片</a>\
        &nbsp;&nbsp;|&nbsp;&nbsp;\
        <a href="ajax/admin_content.aspx?NewsDesPicWater">给内容中的图片加水印</a>\
        &nbsp;&nbsp;|&nbsp;&nbsp;\
        将新闻内容的首张图片导入到图片中的：&nbsp;\
        <input type="text" value="1" size="1" id="photoX" >\
        -\
        <input type="text" value="35" size="1" id="photoY" >\
        <input type="button" value="开始导入" class="pn" id="ImportPhoto" />\
        &nbsp;&nbsp;|&nbsp;&nbsp;\
        同名数据检测 ：\
        检测长度&nbsp;\
        <input type="text" id="rlen" size="5" value="" maxlength="2"  onkeyup="this.value=this.value.replace(/\D/g,\'\')">\
        <input type="button" class="pn" onClick="location.href=\'?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/{r:arr(4)/>/{r:arr(5)/>/title/\'+$(\'#rlen\').val()+\'.html\';" value="查询">\
      </th>\
    </tr>\
    <tr align="center">\
      <th width="60">ID</th>\
      <th align="left">标题</th>\
      <th>人气</th>\
      <th>数据类别</th>\
      <th>推荐星级</th>\
      <th>时间</th>\
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
  },
}
fun.a01()

/*


    
    


function newswhere(){
 let str=' where @.hide=0 <if "<.arr(5)/>"!=""} and @.name LIKE \'%<.unarr(5)/>%\'</if><if "<.arr(6)/>"!=""/> and @.type={r:unarr(6)/></if> order by @.<if "Fun(arr(7))"=="">addtime desc,:id<else/>{r:arr(7)/></if> desc'
 return str
}
*/