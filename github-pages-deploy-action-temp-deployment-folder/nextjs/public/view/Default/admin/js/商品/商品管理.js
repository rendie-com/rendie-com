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
    <table class="table table-hover align-middle">\
      <tr>\
      <td align="left" colspan="7"><select id="Field">\
          <option value="and :name like \'%$1%\'"{if "<.arr(5)/>".indexOf(":name")!=-1} selected="selected"{/if/>>商品标题</option>\
          <option value="and :id=$1"{if "<.arr(5)/>".indexOf(":id")!=-1} selected="selected"{/if/>>商品ID</option>\
          <option value="and :proid=\'$1\'"{if "<.arr(5)/>".indexOf(":proid")!=-1} selected="selected"{/if/>>商品编码</option>\
          <option value="and :fromid=$1"{if "<.arr(5)/>".indexOf(":fromid")!=-1} selected="selected"{/if/>>来源ID</option>\
          <option value="and :shopname like \'%$1%\'"{if "<.arr(5)/>".indexOf(":shopname")!=-1} selected="selected"{/if/>>店铺名称</option>\
          <option value="and :err like \'%$1%\'"{if "<.arr(5)/>".indexOf(":err")!=-1} selected="selected"{/if/>>出错说明</option>\
        </select>\
        <input type="text"  size="50" id="searchword" value="<.unarr(7)/>" onKeyDown="javascript:if(event.keyCode==13) productSearch();">\
        <a href="javascript:" class="button" id="selectBtn">搜索</a></td>\
    </tr>\
      <if ""!="Fun(arr(7))"&&"0"!="Fun(arr(7))">\
    <tr>\
      <td colspan="7">关键字 <font color=red> <.unarr(7)/> </font> 的记录如下</td>\
    </tr>\
      </if>\
    <tr align="center">\
      <td width="60"> ID\
        <if "Fun(arr(7))"=="id_20desc"><a href="{Fun(GetUrl(Fun(arr(2))/Fun(arr(3))/Fun(arr(4))/Fun(arr(5))/Fun(arr(6))/id_20asc.html))}"><img src="/<.Path/>admin/img/minus2.gif" title="按ID小到大排序" /></a>\
          <else/>\
          <a href="{Fun(GetUrl(Fun(arr(2))/Fun(arr(3))/Fun(arr(4))/Fun(arr(5))/Fun(arr(6))/id_20desc.html))}"><img src="/<.Path/>admin/img/minus.gif" title="按ID大到小排序" /></a></if></td>\
      <td align="left">标题</td>\
      <td><Select id="hide" onChange="Tool.open(8,this.options[this.selectedIndex].value)">\
          <Option value="_20">推荐星级</Option>\
          <Option value="_20">0推荐星级</Option>\
          <Option value="_20">1推荐星级</Option>\
          <Option value="_20">2推荐星级</Option>\
          <Option value="_20">3推荐星级</Option>\
          <Option value="_20">4推荐星级</Option>\
          <Option value="_20">5推荐星级</Option>\
          <Option value="_20">6推荐星级</Option>\
          <Option value="_20">7推荐星级</Option>\
          <Option value="_20">8推荐星级</Option>\
          <Option value="_20">9推荐星级</Option>\
          <Option value="_20">10推荐星级</Option>\
        </Select></td>\
      <td><Select id="hide" onChange="Tool.open(8,this.options[this.selectedIndex].value)">\
          <Option value="_20">状态</Option>\
          <Option value="<:escape_(and @.hide=0)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=0))"} selected="selected"{/if}>正常\
          (<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=0,count)/>)</Option>\
          <Option value="<:escape_(and @.hide<>0)/>" {if "Fun(arr(8))"=="and_20_28pre_29hide_3C_3E0"} selected="selected"{/if}>非正常\
          (<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide<>0,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=1)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=1))"} selected="selected"{/if}>回收站(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=1,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=2)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=2))"} selected="selected"{/if}>错误数据(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=2,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=3)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=3))"} selected="selected"{/if}>审核未通过(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=3,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=4)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=4))"} selected="selected"{/if}>品牌商投诉(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=4,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=5)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=5))"} selected="selected"{/if}>手动审核不通过(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=5,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=6)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=6))"} selected="selected"{/if}>禁卖品牌(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=6,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=7)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=7))"} selected="selected"{/if}>重复商品(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=7,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=8)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=8))"} selected="selected"{/if}>标题重复(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=8,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=9)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=9))"} selected="selected"{/if}>首图重复(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=9,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=10)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=10))"} selected="selected"{/if}>发布类目不对(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=10,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=11)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=11))"} selected="selected"{/if}>图片不能为空(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=11,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=12)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=12))"} selected="selected"{/if}>有速卖通网址(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=12,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=13)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=13))"} selected="selected"{/if}>特别类目限制(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=13,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=14)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=14))"} selected="selected"{/if}>错误为空(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=14,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=15)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=15))"} selected="selected"{/if}>采集错误(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=15,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=16)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=16))"} selected="selected"{/if}>属性错误(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=16,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=17)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=17))"} selected="selected"{/if}>单词堆积(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=17,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=18)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=18))"} selected="selected"{/if}>替换后改正常(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=18,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=19)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=19))"} selected="selected"{/if}>404错误(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=19,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=20)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=20))"} selected="selected"{/if}>自定义规格重复(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=20,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=21)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=21))"} selected="selected"{/if}>没有绑定分类(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=21,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=22)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=22))"} selected="selected"{/if}>最低价格限制(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=22,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=23)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=23))"} selected="selected"{/if}>标题不能包含(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=23,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=24)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=24))"} selected="selected"{/if}>必须至少包含(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=24,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=25)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=25))"} selected="selected"{/if}>上架不了(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=25,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=26)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=26))"} selected="selected"{/if}>关键词错误(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=26,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=27)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=27))"} selected="selected"{/if}>价格超限(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=27,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=28)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=28))"} selected="selected"{/if}>小于10美元(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=28,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=29)/>" {if "Fun(arr(8))"=="Fun(escape_(and @.hide=29))"} selected="selected"{/if}>两张细节图(<.Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.hide=29,count)/>)</Option>\
        </Select></td>\
      <td width="35">来源</td>\
      <td width="40">销量\
        <if "Fun(arr(7))"=="desc"><a href="?{Fun arr(0)/}/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/hit,:id/asc.html"><img src="/{r:Path/>admin/img/minus2.gif" title="按人气从小到大排序" /></a>\
          <else/>\
          <a href="?{Fun arr(0)/}/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/hit,:id/desc.html"><img src="/{r:Path/>admin/img/minus.gif" title="按人气从大到小排序" /></a> </if></td>\
      <td>修改时间\
        <if "<.arr(7)/>"=="desc"><a href="?{Fun arr(0)/}/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/addtime,:id/asc.html"><img src="/{r:Path/>admin/img/minus2.gif" title="按时间从小到大排序" /></a>\
          <else/>\
          <a href="?{Fun arr(0)/}/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/addtime,:id/desc.html"><img src="/{r:Path/>admin/img/minus.gif" title="按时间从大到小排序" /></a></if></td>\
      <td width="118" align="center">操作</td>\
    </tr>\
    <r:product size=10 page=4 where=" Fun(run(productwhere))">\
      <tr align="center">\
        <td nowrap="nowrap"><:id/></td>\
        <td align="left"><table class="tb2">\
            <tr>\
              <th rowspan="3"> <a target="_blank" href="<:pic1/>"><img style="margin:2px;padding:1px;border:1px solid #ccc" src="<:pic1/>" title="点击预览" border="0" width="50" height="50" align="left"></a> </th>\
              <th style="text-align:left;"><a href="en/product/article/<:id/>.html" target="_blank"><:name/></a></th>\
            </tr>\
            <tr>\
              <td><strong>分类：</strong>\
                <if "<:from/>"=="aliexpress"> 【\
                  <r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:type/>\'" size=1>\
                    <r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1>\
                      <r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1>\
                        <r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1> <:name/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp; </r:type>\
                        <:name/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp; </r:type>\
                      <:name/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp; </r:type>\
                    <:name/></r:type>\
                  】\
                  <else/>\
                  <:type/> </if>\
                &nbsp;&nbsp; <strong>编码:</strong><:proid/>\
                &nbsp;&nbsp; <strong>价格：</strong>$\
                <if <:minprice/>==<:maxprice/>> <:minprice f=2/>\
                  <else/>\
                  <:minprice f=2/>-<:maxprice f=2/> </if>\
                <if "<:lotNum/>"!="1"> （<:lotNum/> <:unit/>/lot）\
                  <else/>\
                  （<:unit/>） </if></td>\
            </tr>\
            <tr>\
              <td colspan="2"><:err/></td>\
            </tr>\
          </table></td>\
        <td><:commend/></td>\
        <td nowrap="nowrap"> {if <:hide/>==0}正常\
          {elseif <:hide/>==1/}\
          回收站\
          {elseif <:hide/>==2/}\
          错误数据\
          {elseif <:hide/>==3/}\
          审核未通过\
          {elseif <:hide/>==4/}品牌商投诉{elseif <:hide/>==5/}\
          疑似侵权\
          {elseif <:hide/>==6/}\
          禁卖品牌\
          {elseif <:hide/>==7/}\
          重复商品\
          {else/}\
          未知：<:hide/>{/if}</td>\
        <td nowrap="nowrap"><a href="<:fromurl/>" target="_blank" title="点击查看来源"><:fromid/></a>\
          <hr/>\
          <:from/>\
          <hr/>\
          <a href="<:shopUrl/>" target="_blank" title="点击查看店铺">查看店铺</a></td>\
        <td><:SaleNum/></td>\
        <td><:datetime/></td>\
        <if "Fun Config(RunMode)"=="static">\
          <td><a href="ajax/admin_content.aspx?ProductMakeRadio/<:id/>" ><img src=\'<.Path/>admin/img/{if "<:id/>"=="True"}yes{else/}no{/if/>.gif\' border=\'0\' title=\'点击生成HTML\' /></a></td>\
        </if>\
        <td nowrap="nowrap"><if "<:from/>"=="dhgate"> <a href="javascript:Tool.main(\'<.arr(1)/>/list/{rr:attr(type2)/>/<:fromid/>.html\');">编辑</a>\
            <elseif "<:from/>"=="aliexpress"/>\
            <a href="javascript:Tool.main(\'<.arr(1)/>/list/{rr:attr(type1)/>/<:fromid/>.html\');">编辑</a>\
            <else/>\
            <a href="javascript:;" onclick="Tool.main(\'{rr:attr(type3)/>/<:id/>.html\')">编辑</a> </if></td>\
      </tr>\
    </r:product>\
    <tr>\
      <td colspan="8"><a href="javascript:" class="button left" onclick="AddProduct()">商品添加</a></td>\
    </tr>\
    </table>'
    Tool.a01(html)
  }
}
fun.a01();