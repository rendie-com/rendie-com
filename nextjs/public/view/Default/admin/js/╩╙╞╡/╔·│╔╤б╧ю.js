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
    let html='<header class="panel-heading">生成选项</header>\
    <div cass="p-2">\
    <ul class="makeHtmlTab">\
    <li id="liVideo" class="hover">生成视频相关</li>\
    <li id="liNews">生成新闻相关</li>\
    <li id="liPhoto">生成图片相关</li>\
    <li id="liProduct">生成商品相关</li>\
    <li id="liOther">生成其它</li>\
  </ul>\
  <table class="tb">\
    <tbody id="video">\
      <tr>\
        <td><input type="button" value="生成视频首页" class="pn" onClick="window.open(\'ajax/admin_make.aspx?MakeVideoIndex.html?\'+Math.random(),\'msg\');">\
          <input type="button" value="一键生成全站视频" class="pn" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeVideoIndex/////video.html?\'+Math.random(),\'msg\');">\
          <input type="button" value="一键生成当天视频" class="pn" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeVideoIndex////VideoDay.html?\'+Math.random(),\'msg\');"></td>\
      </tr>\
      <tr>\
        <td><select id="MakeVideoChannel" >\
            <option value="err">请选择分类</option>\
          </select>\
          <input type="submit" class="pn" value="生成视频栏目页" onclick="javascript:window.open(\'ajax/admin_make.aspx?MakeVideoAllChannel///\'+$(\'#MakeVideoChannel\').val()+\'.html\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成视频全部栏目页" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeVideoAllChannel.html?\'+Math.random(),\'msg\');">\
          开始页数：\
          <input type="text" id="VideoStartPage" value=\'1\' size="5" style="text-align:center"/>\
          结束页数：\
          <input type="text" id="VideoEndPage" value=\'10\' size="5" style="text-align:center"/>\
          <input type="button"  class="pn"  value="生成视频部分栏目页" onclick="javascript:window.open(\'ajax/admin_make.aspx?MakeNewsAllChannel/\'+$(\'#VideoStartPage\').val()+\'//\'+$(\'#MakeVideoChannel\').val()+\'/\'+$(\'#VideoEndPage\').val()+\'.html\'+Math.random(),\'msg\');"></td>\
      </tr>\
      <tr>\
        <td><select id="MakeVideoArticle"  >\
            <option value="">请选择分类</option>\
          </select>\
          <input type="button" class="pn" value="生成视频内容页" onclick="javascript:window.open(\'ajax/admin_make.aspx?MakeVideoAllArticle/\'+$(\'#MakeVideoArticle\').val()+\'.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成视频全部内容页" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeVideoAllArticle.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成视频全部播放页" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeVideoAllPlay.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeVideoDaysView/\'+$(\'#VideoDays\').val()+\'.html?\'+Math.random(),\'msg\');">\
          <select id="VideoDays" >\
            <r: areatype=tag tag=1<1/>2<1/>3<1/>4<1/>5<1/>6<1/>7<1/>8<1/>9<1/>10<1/>11<1/>12<1/>13<1/>14<1/>15<1/>16<1/>17<1/>18<1/>19<1/>20>\
              <option value="[area:name]">[area:name]</option>\
            </r:>\
          </select>\
          日内内容页\
          </form></td>\
      </tr>\
    </tbody>\
    <tbody id="news" style="display:none">\
      <tr>\
        <td><input type="button" value="生成新闻首页" class="pn" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeNewsIndex.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="一键生成全站新闻" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeNewsIndex/////news.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="一键生成当天新闻" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeNewsIndex/////NewsDay.html?\'+Math.random(),\'msg\');"></td>\
      </tr>\
      <tr>\
        <td><select id="MakeNewsChannel"  >\
            <option value="err">请选择新闻分类</option>\
            <rendiload admin/html/数据/新闻管理/新闻分类_option.html}\
          </select>\
          <input type="button" class="pn" value="生成新闻栏目页" onclick="javascript:window.open(\'ajax/admin_make.aspx?MakeNewsAllChannel///\'+$(\'#MakeNewsChannel\').val()+\'.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成全部新闻栏目页" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeNewsAllChannel.html?\'+Math.random(),\'msg\');">\
          &nbsp;&nbsp;开始页数：\
          <input type="text" id="NewsStartPage" value=\'1\' size="5" style="text-align:center"/>\
          &nbsp;结束页数：\
          <input type="text" id="NewsEndPage" value=\'10\' size="5" style="text-align:center"/>\
          <input type="button" class="pn" value="生成新闻部分栏目页" onclick="javascript:window.open(\'ajax/admin_make.aspx?MakeNewsAllChannel/\'+$(\'#NewsStartPage\').val()+\'//\'+$(\'#MakeNewsChannel\').val()+\'/\'+$(\'#VideoEndPage\').val()+\'.html\'+Math.random(),\'msg\');"></td>\
      </tr>\
      <tr>\
        <td><select id="MakeNewsArticle"  >\
            <option value="err">请选择新闻分类</option>\
            <rendiload admin/html/数据/新闻管理/新闻分类_option.html}\
          </select>\
          <input type="button" class="pn" value="生成新闻内容页" onclick="javascript:window.open(\'ajax/admin_make.aspx?MakeNewsAllArticle/1/\'+$(\'#MakeNewsArticle\').val()+\'.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成全部新闻内容页" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeNewsAllArticle.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeNewsDaysView/\'+$(\'#NewsDays\').val()+\'.html?\'+Math.random(),\'msg\');">\
          <select id="NewsDays" >\
            <r: areatype=tag tag=1<1/>2<1/>3<1/>4<1/>5<1/>6<1/>7<1/>8<1/>9<1/>10<1/>11<1/>12<1/>13<1/>14<1/>15<1/>16<1/>17<1/>18<1/>19<1/>20>\
              <option value="[area:name]">[area:name]</option>\
            </r:>\
          </select>\
          日内内容页 </td>\
      </tr>\
    </tbody>\
    <tbody id="photo" style="display:none">\
      <tr>\
        <td><input type="button" value="生成图片首页" class="pn" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakePhotoIndex.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="一键生成全站图片" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakePhotoIndex/////photo.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="一键生成当天图片" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakePhotoIndex/////PhotoDay.html?\'+Math.random(),\'msg\');"></td>\
      </tr>\
      <tr>\
        <td><select id="MakePhotoChannel"  >\
            <option value="err">请选择分类</option>\
            <rendiload admin/html/数据/图片管理/图片分类_option.html}\
          </select>\
          <input type="button" class="pn" value="生成图片栏目页" onclick="javascript:window.open(\'ajax/admin_make.aspx?MakePhotoAllChannel///\'+$(\'#MakePhotoChannel\').val()+\'.html\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成全部图片栏目页" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakePhotoAllChannel.html?\'+Math.random(),\'msg\');">\
          &nbsp;&nbsp;开始页数：\
          <input type="text" id="PhotoStartPage" value=\'1\' size="5" style="text-align:center"/>\
          &nbsp;结束页数：\
          <input type="text" id="PhotoEndPage" value=\'10\' size="5" style="text-align:center"/>\
          <input type="button" class="pn" value="生成图片部分栏目页" onclick="javascript:window.open(\'ajax/admin_make.aspx?MakePhotoAllChannel/\'+$(\'#PhotoStartPage\').val()+\'//\'+$(\'#MakePhotoChannel\').val()+\'/\'+$(\'#PhotoEndPage\').val()+\'.html\'+Math.random(),\'msg\');"></td>\
      </tr>\
      <tr>\
        <td><select id="MakePhotoArticle"  >\
            <option value="err">请选择分类</option>\
            <rendiload admin/html/数据/图片管理/图片分类_option.html}\
          </select>\
          <input type="submit" class="pn" value="生成图片内容页" onclick="javascript:window.open(\'ajax/admin_make.aspx?MakePhotoAllArticle//\'+S(\'MakePhotoArticle\').value+\'.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成全部图片内容页" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakePhotoAllArticle.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakePhotoDaysView/\'+$(\'#PhotoDays\').val()+\'.html?\'+Math.random(),\'msg\');">\
          <select id="PhotoDays" >\
            <r: areatype=tag tag=1<1/>2<1/>3<1/>4<1/>5<1/>6<1/>7<1/>8<1/>9<1/>10<1/>11<1/>12<1/>13<1/>14<1/>15<1/>16<1/>17<1/>18<1/>19<1/>20>\
              <option value="[area:name]">[area:name]</option>\
            </r:>\
          </select>\
          日内内容页\
          </form></td>\
      </tr>\
    </tbody>\
    <tbody id="product" style="display:none">\
      <tr>\
        <td><input type="button" value="生成商品首页" class="pn" onClick="window.open(\'ajax/admin_make.aspx?MakeProductIndex.html?\'+Math.random(),\'msg\');">\
          <input type="button" value="一键生成全站商品" class="pn" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeProductIndex/////product.html?\'+Math.random(),\'msg\');">\
          <input type="button" value="一键生成当天商品" class="pn" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeProductIndex/////ProductDay.html?\'+Math.random(),\'msg\');"></td>\
      </tr>\
      <tr>\
        <td><select id="MakeProductChannel" >\
            <option value="err">请选择分类</option>\
            <rendiload admin/html/数据/商品管理/商品分类_option.html}\
          </select>\
          <input type="button" class="pn" value="生成商品栏目页" onclick="javascript:window.open(\'ajax/admin_make.aspx?MakeProductAllChannel///\'+S(\'MakeProductChannel\').value+\'.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成商品全部栏目页" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeProductAllChannel.html?\'+Math.random(),\'msg\');">\
          &nbsp;&nbsp;开始页数：\
          <input type="text" id="ProductStartPage" value=\'1\' size="5" style="text-align:center"/>\
          &nbsp;结束页数：\
          <input type="text" id="ProductEndPage" value=\'10\' size="5" style="text-align:center"/>\
          <input type="button" class="pn" value="生成商品部分栏目页" onclick="javascript:window.open(\'ajax/admin_make.aspx?MakeProductAllChannel/\'+S(\'ProductStartPage\').value+\'//\'+S(\'MakeProductChannel\').value+\'/\'+S(\'ProductEndPage\').value+\'.html?\'+Math.random(),\'msg\');"></td>\
      </tr>\
      <tr>\
        <td><select id="MakeProductArticle" >\
            <option value="err">请选择分类</option>\
            <rendiload admin/html/数据/商品管理/商品分类_option.html}\
          </select>\
          <input type="submit" class="pn" value="生成商品内容页" onclick="javascript:window.open(\'ajax/admin_make.aspx?MakeProductAllArticle//\'+$(\'#MakeProductArticle\').val()+\'.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成商品全部内容页" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeProductAllArticle.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeProductDaysView/\'+$(\'#ProductDays\').val()+\'.html?\'+Math.random(),\'msg\');">\
          <select id="ProductDays" >\
            <r: areatype=tag tag=1<1/>2<1/>3<1/>4<1/>5<1/>6<1/>7<1/>8<1/>9<1/>10<1/>11<1/>12<1/>13<1/>14<1/>15<1/>16<1/>17<1/>18<1/>19<1/>20>\
              <option value="[area:name]">[area:name]</option>\
            </r:>\
          </select>\
          日内内容页 </td>\
      </tr>\
    </tbody>\
    <tbody id="other" style="display:none;">\
      <tr>\
        <td><input type="button" value="生成首页" class="pn" onClick="window.open(\'ajax/admin_make.aspx?MakeIndex.html?\'+Math.random(),\'msg\');">\
          <input type="button" value="一键生成全站" class="pn" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeIndex/////site.html?\'+Math.random(),\'msg\');">\
          <input type="button" value="一键生成当天" class="pn" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeIndex/////SiteDay.html?\'+Math.random(),\'msg\');">\
          <input type="button" value="生成论坛首页" class="pn" onClick="window.open(\'ajax/admin_make.aspx?MakeClubIndex.html?\'+Math.random(),\'msg\');"></td>\
      </tr>\
      <tr>\
        <td><select id="MakeTopic" >\
            <option value="">请选择专题</option>\
            <rendiload admin/html/数据/专题分类_option.html}\
          </select>\
          <input type="button" class="pn" value="生成专题页" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeTopic/\'+$(\'#MakeTopic\').val()+\'.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成专题首页" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeTopicIndex.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="一键生成全部专题" onClick="window.open(\'ajax/admin_make.aspx?MakeTopicAllChannel.html?\'+Math.random(),\'msg\');"></td>\
      </tr>\
      <tr>\
        <td><select id="MakeHelp" >\
            <option value="">请选择分类</option>\
            <rendiload admin/html/数据/帮助分类_option.html}\
          </select>\
          <input type="button" class="pn" value="生成帮助页" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeHelp/\'+$(\'#MakeHelp\').val()+\'.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成帮助首页" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeHelpIndex.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成全部帮助页" onClick="window.open(\'ajax/admin_make.aspx?MakeHelpAllChannel.html?\'+Math.random(),\'msg\');"></td>\
      </tr>\
      <tr>\
        <td><select id="GetCustomList" >\
            <option value="">请选择自定义页模板</option>\
            Fun(GetCustomList())\
          </select>\
          <input type="button" class="pn" value="生成自定义页" onClick="javascript:window.open(\'ajax/admin_make.aspx?MakeGetCustomList/\'+$(\'#GetCustomList\').val()+\'.html?\'+Math.random(),\'msg\');">\
          <input type="button" class="pn" value="生成全部自定义页" onClick="window.open(\'ajax/admin_make.aspx?MakeAllCustomList.html?\'+Math.random(),\'msg\');"></td>\
      </tr>\
    </tbody></table></div>'
    Tool.html(null,null,html)
  }
}
fun.a01();
/*


  
  
  <iframe style="Z-INDEX:1;VISIBILITY:inherit;WIDTH:95%;HEIGHT:60%;"name="msg" frameBorder=0 scrolling=yes></iframe>
  <script type="text/javascript">
$(function(){
  $("#liVideo").click(function(){
	$(".makeHtmlTab li").removeAttr('class')
	$(this).attr("class","hover")
	$("#video").show()
	$("#news").hide()
	$("#photo").hide()
	$("#product").hide()
	$("#other").hide()
  })
  $("#liNews").click(function(){
	$(".makeHtmlTab li").removeAttr('class')
	$(this).attr("class","hover")
	$("#video").hide()
	$("#news").show()
	$("#photo").hide()
	$("#product").hide()
	$("#other").hide()
  })
  $("#liPhoto").click(function(){
	$(".makeHtmlTab li").removeAttr('class')
	$(this).attr("class","hover")
	$("#video").hide()
	$("#news").hide()
	$("#photo").show()
	$("#product").hide()
	$("#other").hide()
  })
  $("#liProduct").click(function(){
	$(".makeHtmlTab li").removeAttr('class')
	$(this).attr("class","hover")
	$("#video").hide()
	$("#news").hide()
	$("#photo").hide()
	$("#product").show()
	$("#other").hide()
  })
  $("#liOther").click(function(){
	$(".makeHtmlTab li").removeAttr('class')
	$(this).attr("class","hover")
	$("#video").hide()
	$("#news").hide()
	$("#photo").hide()
	$("#product").hide()
	$("#other").show()
  })
})
*/