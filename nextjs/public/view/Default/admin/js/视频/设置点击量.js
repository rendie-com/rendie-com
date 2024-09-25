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
    let html='<header class="panel-heading">随机设置数据点击量</header>\
    <div class=p-2"">\
    <table class="table table-hover align-middle">\
     <tr>\
      <td width="350" align="right"><select id="table" >\
          <option value=\'news\'>新闻表</option>\
          <option value=\'product\'>商品表</option>\
          <option value=\'photo\'>图片表</option>\
          <option value=\'video\'>视频表</option>\
        </select>\
        &nbsp;\
        的数据ID&nbsp;\
        <input type="text" id="iStart" value="0" size="3"  />\
        &nbsp;到&nbsp;\
        <input type="text" id="iEnd" value="0"  size="3" />\
        &nbsp;的： </td>\
      <td><table class="tb2">\
          <tr>\
            <th style="text-align:right;">星级数:</th>\
            <th> 【\
              <input type="radio" name="bComm" id="radio-bComm" value="1" />\
              <label for="radio-bComm">随机加上</label>\
              <input type="radio" name="bComm" id="radio-bComm2" value="2" checked="checked" />\
              <label for="radio-bComm2">随机重设</label>\
              】&nbsp;0&nbsp;到&nbsp;\
              <input type="text" id="maxComm" value="10" maxlength="2"  >\
              &nbsp;\
              <input type="button" class="pn" value="执行" name="Submit" val="comm">\
            </th>\
          </tr>\
          <tr>\
            <td align="right">点击量:</td>\
            <td> 【\
              <input type="radio"  name="bHit" id="bHit" value="1" checked="checked"/>\
              <label for="bHit">随机加上</label>\
              <input type="radio"  name="bHit" id="bHit2" value="2"/>\
              <label for="bHit2">随机重设</label>\
              】\
              &nbsp;0&nbsp;到&nbsp;\
              <input type="text" id="maxHit" value="1000" maxlength="4"  >\
              &nbsp;\
              <input type="submit" class="pn"  value="执行" name="Submit" val="hit"></td>\
          </tr>\
          <tr>\
            <td align="right">顶次数:</td>\
            <td> 【\
              <input type="radio"  name="bDigg" id="bDigg" value="1" checked="checked"/>\
              <label for="bDigg">随机加上</label>\
              <input type="radio"  name="bDigg" id="bDigg2" value="2"/>\
              <label for="bDigg2">随机重设</label>\
              】&nbsp;0&nbsp;到&nbsp;\
              <input type="text" id="maxDigg" value="200" maxlength="3"  >\
              &nbsp;\
              <input type="submit" class="pn"  value="执行" name="Submit" val="digg"></td>\
          </tr>\
          <tr>\
            <td align="right">踩次数:</td>\
            <td> 【\
              <input type="radio"  name="bTread" id="bTread" value="1" checked="checked"/>\
              <label for="bTread">随机加上</label>\
              <input type="radio"  name="bTread" id="bTread2" value="2"/>\
              <label for="bTread2">随机重设</label>\
              】&nbsp;0&nbsp;到&nbsp;\
              <input type="text" id="maxTread" value="200" maxlength="3"  >\
              &nbsp;\
              <input type="submit" class="pn"  value="执行" name="Submit" val="tread"></td>\
          </tr>\
        </table></td>\
    </tr>\
    <tr>\
      <td colspan="2"> 使用说明：<br/>\
        随机加上 说明： 新点击量 = 点击量 + 随机数<br />\
        随机重设 说明： 新点击量 = 随机数<br />\
        点击量清零技巧：勾上 随机重设，把最大值设为 0 </td>\
    </tr>\
  </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();



/*

$(function(){
	$("[name='Submit']").click(function(){
		let val=$(this).attr("val")
		if(val=="comm")
		{
			if(confirm('确定要设置【星级数】吗?'))
			{
				alert("bbbbbbbbbbb")
			}
		}
		else if(val=="hit")
		{
			if(confirm('确定要设置【点击量】吗?'))
			{
				alert("bbbbbbbbbbb")
			}
		}
		else if(val=="digg")
		{
			if(confirm('确定要设置【顶次数】吗?'))
			{
				alert("bbbbbbbbbbb")
			}
		}
		else if(val=="tread")
		{
			if(confirm('确定要设置【踩次数】吗?'))
			{
				alert("bbbbbbbbbbb")
			}
		}
		
	})

})
*/