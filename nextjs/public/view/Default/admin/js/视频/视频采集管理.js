'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    if(obj.arr[3]=="js01")
    {
      Tool.scriptArr(['admin/js/视频/视频采集管理/1.设置基本参数.js']);
    }
    else
    {this.a02();}
  },
  a02:function()
  {
    let str='[{}\
      <r:gatherURL size=20 page=4 where=" where @.type=\'video\'">\
      ,{\
        "id":[gatherURL:id],\
        "note":"[gatherURL:note]",\
        "from":"[gatherURL:from]",\
        "addtime":"[gatherURL:addtime]",\
        "LastTime":"[gatherURL:LastTime]",\
        "id":"[gatherURL:id]",\
        "name":"[gatherURL:name]"\
      }\
      </r:gatherURL>\
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
      <th scope="row">'+arr[i].id+'</th>\
        <td>'+arr[i].name+'</td>\
        <td>'+arr[i].note+'</td>\
        <td>'+arr[i].from+'</td>\
        <td>'+arr[i].addtime+'</td>\
        <td>'+arr[i].LastTime+'</td>\
        <td>\
          <button title="操作" class="menu-button" id="dropdownMenuButton'+arr[i].id+'" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton'+arr[i].id+'">\
            <li><a class="dropdown-item pointer" href="<.arr(1)/>/list/{rr:attr(type1)/>/[gatherURL:id].html">采集</a></li>\
            <li><a class="dropdown-item pointer" href="<.arr(1)/>/list/{rr:attr(type2)/>/[gatherURL:id].html">预览</a></li>\
            <li><a class="dropdown-item pointer" href="javascript:" onClick="Clone(\'[gatherURL:id]\')">克隆</a></li>\
            <li><a class="dropdown-item pointer" href="javascript:;"  onclick="Tool.main(\'js01/'+arr[i].id+'\');">编辑</a></li>\
            <li><a class="dropdown-item pointer" href="javascript:" onClick="delFile(\'[gatherURL:id]\')">删除</a></li>\
          </ul>\
        </td>\
      </tr>'
    }
    let html='\
    <header class="panel-heading">视频项目管理</header>\
    <div class="p-2"><table class="table table-hover align-middle">'+this.b01()+'<tbody>'+tbody+'</tbody></table></div>'
    Tool.html(null,null,html)
  },
  b01:function(t)
  {
    let str='\
    <thead class="table-light center">\
    <tr>\
      <th>ID</th>\
      <th>采集类目说明</th>\
      <th>采集配置信息说明</th>\
      <th>来源</th>\
      <th>添加时间</th>\
      <th>上次采集时间</th>\
      <th>操作</th>\
    </tr>\
    </thead>'
    return str
  }
}
fun.a01();