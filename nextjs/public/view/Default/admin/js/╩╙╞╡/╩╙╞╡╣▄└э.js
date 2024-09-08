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
    let str='[{}\
      <r:video size=20 page=4 where=" where @.hide=0  order by @.addtime desc">\
      ,{\
        "id":[video:id]\
        \
      }\
      </r:video>\
    ]'
    Tool.ajax.a01(str,1,this.a03,this);
  },
  a03:function(arr)
  {
    let tbody="";
    for(let i=1;i<arr.length;i++)
    {
      tbody+='\
        <tr align="center">\
          <td align="left"><input type="checkbox" value="[video:id]" name="pre_id"  class="checkbox" id="check-[video:i]"/>\
            <label for="check-[video:i]">[video:id]</label></td>\
          <td align="left"><a href="[video:id]" target="_blank">[video:name]</a><if "[video:fromurl]"!=""}&nbsp;（<a href="[video:fromurl]" target="_blank">查看来源</a>）\
            </if></td>\
          <td>[video:hit]</td>\
          <td></td>\
          <td align="left"></td>\
          <td><div class="basic" align="left" data="[video:commend]_[video:id]"></div></td>\
          <td> [video:addtime] </td>\
          <td align="center"><a href="ajax/admin_make.aspx?VideoMakeRadio/[video:id].html" > <img src=\'<.Path/>admin/img/{if "[video:id]"=="True"}yes{else/}no{/if/>.gif\' title=\'点击生成HTML\' /> </a></td>\
          <td><a href="[video:id]">编辑</a>&nbsp;|&nbsp;<a href="ajax/admin_content.aspx?VideoRecycle/[video:id].html">隐藏</a></td>\
        </tr>'
    }
    tbody+='\
    <tr>\
    <td colspan="10"><input type="button" class="pn" value="反选"/>\
      <input type="submit" value="批量隐藏" class="pn" onClick="videoform.action=\'ajax/admin_content.aspx?VideoRecycle.html\';">\
      <input type="submit" value="批量生成" class="pn" onClick="videoform.action=\'ajax/admin_make.aspx?VideoMakeSelected.html\'" />\
      <select name="movetype" id="movetype" >\
        <option value="">请选择目标分类</option>\
      </select>\
      <input type="submit" value="批量移动" class="pn" onClick="if($(\'movetype\').value==\'\'){alert(\'请选择目标分类\');return false;};if(confirm(\'确定要批量移动数据吗\')){videoform.action=\'ajax/admin_content.aspx?VideoSetType\'}else{return false;}"/></td>\
    </tr>'
    let html='\
    <td colspan="10"><a href="ajax/admin_content.aspx?DownVideoPic.html">下载图片中的网络图片</a> &nbsp;|&nbsp;\
        将图片中首张图的大小设置为：\
        <input type="text" value="100" size="2" id="videoX" >\
        -\
        <input type="text" value="136" size="2" id="videoY" >\
        <input type="button" value="开始执行" class="pn" id="SetFirstImgSize" /></td>\
    </tr>\
    <tr>\
      <td align="left" colspan="10"> 关键字\
        <input name="keyword" type="text" id="searchword"size="70" >\
        <input type="button" id="selectBtn" value="查 询..." class="pn" />\
        <select onChange="self.location.href=\'?<.arr(0)/>/{r:arr(2)/>/1//\'+this.options[this.selectedIndex].value" >\
          <option value="">按数据分类查看</option>\
        </select></td>\
    </tr><div class="p-2"><table class="table table-hover align-middle">'+this.b01()+'<tbody>'+tbody+'</tbody></table></div>'
    Tool.a01(html)
  },
  b01:function(t)
  {
    let str='\
    <thead class="table-light center">\
    <tr>\
      <td>ID</td>\
      <td>标题</td>\
      <td>人气</td>\
      <td>来源</td>\
      <td>数据类别</td>\
      <td>推荐星级</td>\
      <td>时间</td>\
      <td>生成</td>\
      <td>操作</td>\
    </tr>\
    </thead>'
    return str
  }
}
fun.a01();

/*
    jQuery(function(){
    $('#selectBtn').click(function(){location.href="?<.arr(0)/>/<.arr(2)/>/1/"+escape($("#searchword").val())/>);
    $('#SetFirstImgSize').click(function(){
    location.href="ajax/admin_content.aspx?SetFirstImgSize///"+$("#videoX").val()+"/"+$("#videoY").val()
    });
  });
  */