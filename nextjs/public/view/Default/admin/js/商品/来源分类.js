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
    <ul class="Tul center">\
    <li class="w200">来源ID</li>\
    <li>分类11名称</li>\
  </ul>\
  <r:type where=" where @.from=\'1688\' and @.upid=\'0\' order by @.sort asc" size=200>\
    <ul class="Tul tr">\
      <li class="w200"><a href="javascript:" class="Mo MoA" onclick="ModifiedAB($(this),\'<:fromID/>\')"></a>&nbsp;<:fromID/></li>\
      <li><:name/></li>\
    </ul>\
  </r:type>'
    Tool.a01(html)
  }
}
fun.a01();