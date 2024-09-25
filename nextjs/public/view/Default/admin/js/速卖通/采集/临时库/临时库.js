'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    if(obj.arr[3]=="js1")
    {      
      Tool.scriptArr(['admin/js/速卖通/商品采集/临时库/导入到产品库.js']);
    }
    else
    {
      obj.arr[4]=obj.arr[4]?parseInt(obj.arr[4]):1;//翻页
      obj.arr[5]=obj.arr[5]?obj.arr[5]:"-_-20";//商品信息
      obj.arr[6]=obj.arr[6]?obj.arr[6]:"-_-20";//审核状态
      obj.arr[7]=obj.arr[7]?obj.arr[7]:"-_-20";//状态
      obj.arr[8]=obj.arr[8]?obj.arr[8]:"-_-20";//上传到【敦煌】
      obj.arr[9]=obj.arr[9]?obj.arr[9]:"-_-20";//【添加/更新】时间
      obj.arr[10]=obj.arr[10]?obj.arr[10]:"-_-20";//搜索字段
      obj.arr[11]=obj.arr[11]?obj.arr[11]:"-_-20";//搜索关键词
      obj.arr[12]=obj.arr[12]?obj.arr[12]:"-_-20";//查看分类数据
      this.a02();
    }
  },
  a02:function()
  {
    let type='';
    if(obj.arr[12]!="-_-20")
    {
      type='"type":"\
      <r:type where=" where @.from=\'aliexpress\' and @.fromid=\''+obj.arr[12]+'\'" size=1><r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1><r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1><r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1> <:name/> &gt; </r:type><:name/> &gt; </r:type><:name/> &gt; </r:type><:name/></r:type>",'
    }
    let str='[\
    {\
      "count":<@count/>,\
      "count01":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=0,count)/>,\
      "count02":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=1,count)/>,\
      "count03":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=2,count)/>,\
      "count04":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=3,count)/>,\
      "count05":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=4,count)/>,\
      "count06":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=5,count)/>,\
      "count07":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=6,count)/>,\
      "count08":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=7,count)/>,\
      "count09":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=8,count)/>,\
      "count10":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=9,count)/>,\
      "count11":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=10,count)/>,\
      "count12":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=11,count)/>,\
      "count13":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=12,count)/>,\
      "count14":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=13,count)/>,\
      "count15":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=14,count)/>,\
      "count16":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=15,count)/>,\
      "count17":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=16,count)/>,\
      "count18":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=17,count)/>,\
      "count19":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=18,count)/>,\
      "count20":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=19,count)/>,\
      "count21":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=20,count)/>,\
      "count22":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=21,count)/>,\
      "count23":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=22,count)/>,\
      "count24":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=23,count)/>,\
      "count25":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=24,count)/>,\
      "count26":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=25,count)/>,\
      "count27":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=26,count)/>,\
      "count28":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=27,count)/>,\
      "count29":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=28,count)/>,\
      "count30":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=29,count)/>,\
      "count31":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=30,count)/>,\
      "count32":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=31,count)/>,\
      "count33":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=32,count)/>,\
      "count34":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=33,count)/>,\
      "count35":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=34,count)/>,\
      "count36":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=35,count)/>,\
      "count37":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=36,count)/>,\
      "count38":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=37,count)/>,\
      "count39":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=38,count)/>,\
      "count40":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=51,count)/>,\
      "count41":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=52,count)/>,\
      "count42":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=53,count)/>,\
      "count43":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=54,count)/>,\
      "count44":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=55,count)/>,\
      "count45":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=56,count)/>,\
      "count46":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=57,count)/>,\
      "count47":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=58,count)/>,\
      "count48":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=59,count)/>,\
      "count49":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=60,count)/>,\
      "count50":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=61,count)/>,\
      "count51":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=62,count)/>,\
      "count52":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.hide=63,count)/>,\
      "count53":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.SaleNum<=10,count)/>,\
      "count54":<.Db(select count(1) as total from @.tempproduct where @.from=\'aliexpress\' and @.Review<=4.5,count)/>,\
      '+type+'\
      "size":20\
    }\
    <r:tempproduct size=20 page=2 where="'+this.b05()+'">,\
    {\
      "pic1":"<:pic1/>",\
      "fromurl":"<:fromurl/>",\
      "name":"<:name/>",\
      "typename":"\
        <r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:type/>\'" size=1>\
          <r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1>\
            <r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1>\
              <r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1> \  <:name/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp;\
              </r:type>\
              <:name/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp;\
            </r:type>\
            <:name/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp;\
          </r:type>\
          <:name/>\
        </r:type>",\
      "err":"<:err tag=js/>",\
      "minprice":<:minprice f=2/>,\
      "maxprice":<:maxprice f=2/>,\
      "lotNum":<:lotNum/>,\
      "unit":"<:unit/>",\
      "fromid":<:fromid/>,\
      "fromurl":"<:fromurl/>",\
      "from":"<:from/>",\
      "shopname":"<:shopname tag=js/>",\
      "shopurl":"<:shopurl/>",\
      "examine":<:examine/>,\
      "inbase":<:inbase/>,\
      "hide":<:hide/>,\
      "Discount":<:Discount/>,\
      "Review":<:Review/>,\
      "SaleNum":<:SaleNum/>,\
      "addtime":"<:addtime/>",\
      "HistoryPrice":"<:HistoryPrice tag=js/>",\
      "id":<:id/>\
   }\
    </r:tempproduct>]'
    Tool.ajax.a01(str,obj.arr[4],this.a03,this)
  },
  a03:function(oo)
  {
    let html=this.b01(oo[0]);
    for(let i=1;i<oo.length;i++)
    {
       html+='\
      <ul class="Tul list-group-item-action row center">\
        <li class="w70"><input type="checkbox" value="'+oo[i].id+'" name="pre_id"  class="checkbox" id="check-'+oo[i].id+'"/>\
          <label for="check-'+oo[i].id+'">'+oo[i].id+'</label></li>\
        <li class="w100">\
          <a target="_blank" href="'+oo[i].pic1+'"><img style="margin:2px;padding:1px;border:1px solid #ccc" src="'+oo[i].pic1+'_100x100.jpg" title="点击预览" border="0" width="90"></a>\
        </li>\
        <li class="col left">\
          <div><a href="'+oo[i].fromurl+'" target="_blank">'+oo[i].name+'</a>【'+oo[i].typename+'】</div>\
          <ul class="Tul">\
            <li>\
            <strong>价格：</strong>$'+(oo[i].minprice==oo[i].maxprice?oo[i].minprice:oo[i].minprice+'-'+oo[i].maxprice)+'\
            ('+(oo[i].lotNum==1?oo[i].unit:oo[i].lotNum+' '+oo[i].unit+'/lot')+')&nbsp;&nbsp;\
            <strong>折扣：</strong>'+oo[i].Discount+'%&nbsp;&nbsp;\
            <strong>销量：</strong>'+oo[i].SaleNum+'&nbsp;&nbsp;\
            <strong>评分：</strong>'+oo[i].Review+'\
            </li>\
          </ul>\
          <ul class="Tul"><li>'+oo[i].HistoryPrice+'</li></ul>\
          <ul class="Tul"><li>'+oo[i].err+'</li></ul>\
        </li>\
        <li class="w100">'+this.b02(oo[i].examine)+'</li>\
        <li class="w150">'+this.b04(oo[i].hide)+'</li>\
        <li class="w150">\
          <a href="'+oo[i].fromurl+'" target="_blank" title="点击查看来源">'+oo[i].fromid+'</a><hr/>\
          '+oo[i].from+'<hr/>\
          <a href="'+oo[i].shopurl+'" target="_blank" title="查看店铺">'+oo[i].shopname+'</a>\
        </li>\
        <li class="w100">'+this.b03(oo[i].inbase)+'</li>\
        <li class="w100">'+oo[i].addtime+'</li>\
        <li class="operatBoxBtn w40">\
          <button title="操作" class="menu-button"><div></div><div></div><div></div></button>\
          <div class="operatBoxMore">\
          <span onClick="">编辑</span>\
          <span onClick="fun.c03('+oo[i].id+']);">删除</span></div>\
        </li>\
      </ul>'
    }
   
    html+='\
    <ul class="Tul">\
      <li>\
        <button type="button" class="btn form-control-sm btn-outline-secondary" onclick="fun.c06()">删除【销量&lt;=10】（'+oo[0].count53+'）</button>\
        <button type="button" class="btn form-control-sm btn-outline-secondary" onclick="fun.c07()">删除【评分&lt;=4.5】（'+oo[0].count54+'）</button>\
        <a href="javascript:" class="button left" onclick="fun.Del01()">全部删除</a><a href="javascript:" class="button middle" onclick="fun.a01(0)">一键【关键词禁限】</a><a href="javascript:" class="button middle" onclick="fun.a12()">一键全部【审核通过】</a>\
        <Select id="examine">\
          <Option value="-_-20">所有审核状态</Option>\
          <Option value="0">未审核</Option>\
          <Option value="1">已审核</Option>\
          <Option value="2">取消</Option>\
        </Select>\
        <a href="javascript:" class="button" onclick="Tool.main(\'js1/\'+$(\'#examine\').val()+\'.html\')" id="productLibrary" val="">导入到产品库</a></li>\
    </ul>\
    <ul class="Tul">\
      <li><a href="javascript:" class="button middle" onclick="FunHide8($(this))">移除标题重复</a> <a href="javascript:" class="button middle" onclick="FunHide9($(this))">移除首图重复</a> <a href="javascript:" class="button middle" onclick="FunHide12($(this))">移除有速卖通网址</a> <a href="javascript:" onclick="Tool.main();" class="button middle"><:attr(name3)/></a></li>\
    </ul>\
    <ul class="Tul">\
      <li> 重新采集，更新数据：将\
        <Select id="examine2">\
          <Option value="_20">所有审核状态</Option>\
          <Option value="0">未审核</Option>\
          <Option value="1">已审核</Option>\
          <Option value="2">取消</Option>\
        </Select>\
        且修改时间小于\
        <input type="text" id="datetime" value="2015-09-19" size="25" style="text-align:center"/>\
        <input type="button" value="重新采集，更新数据" class="pn" id="ToCollect" /></li>\
    </ul>'+Tool.page(oo[0].count,oo[0].size,4)
    Tool.a01(html)
  },
  b01:function(oo)
  {
    let str='\
    <div class="Tul">\
      <div class="input-group w500">\
      <div class="input-group-prepend">\
        <select id="Field" class="form-select">\
          <option value="1" '+(obj.arr[10]=="1"?'selected="selected"':'')+'>商品标题</option>\
          <option value="2" '+(obj.arr[10]=="2"?'selected="selected"':'')+'>商品ID</option>\
          <option value="3" '+(obj.arr[10]=="3"?'selected="selected"':'')+'>商品编码</option>\
          <option value="4" '+(obj.arr[10]=="4"?'selected="selected"':'')+'>来源ID</option>\
          <option value="5" '+(obj.arr[10]=="5"?'selected="selected"':'')+'>店铺名称</option>\
          <option value="6" '+(obj.arr[10]=="6"?'selected="selected"':'')+'>店铺ID</option>\
          <option value="7" '+(obj.arr[10]=="7"?'selected="selected"':'')+'>出错说明</option>\
        </select>\
      </div>\
      <input type="text" class="form-select" id="searchword" value="'+Tool.Trim(Tool.unescape(obj.arr[11]))+'" onkeydown="javascript:if(event.keyCode==13) fun.c02();">\
      <div class="input-group-append">\
        <button class="btn btn-outline-secondary form-control-sm" type="button" onclick="fun.c02();">搜索</button>\
      </div>\
        <button style="margin-left:5px;" class="btn btn-outline-secondary form-control-sm" type="button">'+(oo.type?oo.type:'查看分类数据')+'</button>\
      </div>\
    </div>\
    <ul class="Tul row Title center">\
      <li class="w70">ID</li>\
      <li class="col"><Select class="form-select" onChange="Tool.open(5,this.options[this.selectedIndex].value)">\
        <Option value="-_-20">商品信息</Option>\
        <Option value="1" '+(obj.arr[5]=="1"?'selected="selected"':'')+'>销量=0</Option>\
        <Option value="2" '+(obj.arr[5]=="2"?'selected="selected"':'')+'>销量=1</Option>\
        <Option value="3" '+(obj.arr[5]=="3"?'selected="selected"':'')+'>销量=2</Option>\
        <Option value="4" '+(obj.arr[5]=="4"?'selected="selected"':'')+'>销量=3</Option>\
        <Option value="5" '+(obj.arr[5]=="5"?'selected="selected"':'')+'>3&lt;销量&lt;=5</Option>\
        <Option value="6" '+(obj.arr[5]=="6"?'selected="selected"':'')+'>5&lt;销量&lt;=10</Option>\
        <Option value="7" '+(obj.arr[5]=="7"?'selected="selected"':'')+'>10&lt;销量&lt;=100</Option>\
        <Option value="8" '+(obj.arr[5]=="8"?'selected="selected"':'')+'>销量&gt;1000</Option>\
        <Option value="9" '+(obj.arr[5]=="9"?'selected="selected"':'')+'>评分&lt;3</Option>\
        <Option value="10" '+(obj.arr[5]=="10"?'selected="selected"':'')+'>3&lt;=评分&lt;4</Option>\
        <Option value="11" '+(obj.arr[5]=="11"?'selected="selected"':'')+'>4&lt;=评分&lt;5</Option>\
        <Option value="12" '+(obj.arr[5]=="12"?'selected="selected"':'')+'>4=评分</Option>\
        <Option value="13" '+(obj.arr[5]=="13"?'selected="selected"':'')+'>4.1=评分</Option>\
        <Option value="14" '+(obj.arr[5]=="14"?'selected="selected"':'')+'>4.2=评分</Option>\
        <Option value="15" '+(obj.arr[5]=="15"?'selected="selected"':'')+'>4.3=评分</Option>\
        <Option value="16" '+(obj.arr[5]=="16"?'selected="selected"':'')+'>4.4=评分</Option>\
        <Option value="17" '+(obj.arr[5]=="17"?'selected="selected"':'')+'>4.5=评分</Option>\
        <Option value="18" '+(obj.arr[5]=="18"?'selected="selected"':'')+'>评分=5</Option>\
        <Option value="19" '+(obj.arr[5]=="19"?'selected="selected"':'')+'>价格&lt;=1</Option>\
        <Option value="20" '+(obj.arr[5]=="20"?'selected="selected"':'')+'>1&lt;价格&lt;=2</Option>\
        <Option value="21" '+(obj.arr[5]=="21"?'selected="selected"':'')+'>2&lt;价格&lt;=3</Option>\
        <Option value="22" '+(obj.arr[5]=="22"?'selected="selected"':'')+'>3&lt;价格&lt;=5</Option>\
        <Option value="23" '+(obj.arr[5]=="23"?'selected="selected"':'')+'>5&lt;价格&lt;=10</Option>\
      </Select></li>\
      <li class="w100">\
      <Select class="form-select" onChange="Tool.open(6,this.options[this.selectedIndex].value)" >\
        <Option value="-_-20">审核状态</Option>\
        <Option value="0" '+(obj.arr[6]=="0"?'selected="selected"':'')+'>未审核</Option>\
        <Option value="1" '+(obj.arr[6]=="1"?'selected="selected"':'')+'>审核通过</Option>\
        <Option value="2" '+(obj.arr[6]=="2"?'selected="selected"':'')+'>需要更新</Option>\
        <Option value="3" '+(obj.arr[6]=="3"?'selected="selected"':'')+'>审核不通过</Option>\
        <Option value="4" '+(obj.arr[6]=="4"?'selected="selected"':'')+'>重新审核</Option>\
      </Select></li>\
      <li class="w150">\
        <Select class="form-select" onChange="Tool.open(7,this.options[this.selectedIndex].value)">\
          <Option value="-_-20">状态</Option>\
          <Option value="0" '+(obj.arr[7]=="0"?'selected="selected"':'')+'>正常('+oo.count01+')</Option>\
          <Option value="1" '+(obj.arr[7]=="1"?'selected="selected"':'')+'>已下架('+oo.count02+')</Option>\
          <Option value="2" '+(obj.arr[7]=="2"?'selected="selected"':'')+'>库存不足('+oo.count03+')</Option>\
          <Option value="3" '+(obj.arr[7]=="3"?'selected="selected"':'')+'>首次404错误('+oo.count04+')</Option>\
          <Option value="4" '+(obj.arr[7]=="4"?'selected="selected"':'')+' title="可确保【不合格产品】慢一点在我这上传">首次正常('+oo.count05+')</Option>\
          <Option value="5" '+(obj.arr[7]=="5"?'selected="selected"':'')+'>二次【已下架】('+oo.count06+')</Option>\
          <Option value="6" '+(obj.arr[7]=="6"?'selected="selected"':'')+'>二次【库存不足】('+oo.count07+')</Option>\
          <Option value="7" '+(obj.arr[7]=="7"?'selected="selected"':'')+'>销量&lt;2('+oo.count08+')</Option>\
          <Option value="8" '+(obj.arr[7]=="8"?'selected="selected"':'')+'>评分&lt;4('+oo.count09+')</Option>\
          <Option value="9" '+(obj.arr[7]=="9"?'selected="selected"':'')+'>_首图重复('+oo.count10+')</Option>\
          <Option value="10" '+(obj.arr[7]=="10"?'selected="selected"':'')+'>发布类目不对('+oo.count11+')</Option>\
          <Option value="11" '+(obj.arr[7]=="11"?'selected="selected"':'')+'>图片不能为空('+oo.count12+')</Option>\
          <Option value="12" '+(obj.arr[7]=="12"?'selected="selected"':'')+'>_有速卖通网址('+oo.count13+')</Option>\
          <Option value="13" '+(obj.arr[7]=="13"?'selected="selected"':'')+'>特别类目限制('+oo.count14+')</Option>\
          <Option value="14" '+(obj.arr[7]=="14"?'selected="selected"':'')+'>错误为空('+oo.count15+')</Option>\
          <Option value="15" '+(obj.arr[7]=="15"?'selected="selected"':'')+'>采集错误('+oo.count16+')</Option>\
          <Option value="16" '+(obj.arr[7]=="16"?'selected="selected"':'')+'>属性错误('+oo.count17+')</Option>\
          <Option value="17" '+(obj.arr[7]=="17"?'selected="selected"':'')+'>单词堆积('+oo.count18+')</Option>\
          <Option value="18" '+(obj.arr[7]=="18"?'selected="selected"':'')+'>替换后改正常('+oo.count19+')</Option>\
          <Option value="19" '+(obj.arr[7]=="19"?'selected="selected"':'')+'>_首次404错误('+oo.count20+')</Option>\
          <Option value="20" '+(obj.arr[7]=="20"?'selected="selected"':'')+'>内容超长('+oo.count21+')</Option>\
          <Option value="21" '+(obj.arr[7]=="21"?'selected="selected"':'')+'>没有绑定分类('+oo.count22+')</Option>\
          <Option value="22" '+(obj.arr[7]=="22"?'selected="selected"':'')+'>最低价格限制('+oo.count23+')</Option>\
          <Option value="23" '+(obj.arr[7]=="23"?'selected="selected"':'')+'>标题不能包含('+oo.count24+')</Option>\
          <Option value="24" '+(obj.arr[7]=="24"?'selected="selected"':'')+'>必须至少包含('+oo.count25+')</Option>\
          <Option value="25" '+(obj.arr[7]=="25"?'selected="selected"':'')+'>sku数量错误('+oo.count26+')</Option>\
          <Option value="26" '+(obj.arr[7]=="26"?'selected="selected"':'')+'>关键词错误('+oo.count27+')</Option>\
          <Option value="27" '+(obj.arr[7]=="27"?'selected="selected"':'')+'>提交有:undefined('+oo.count28+')</Option>\
          <Option value="28" '+(obj.arr[7]=="28"?'selected="selected"':'')+'>数据本身有问题('+oo.count29+')</Option>\
          <Option value="29" '+(obj.arr[7]=="29"?'selected="selected"':'')+'>两张细节图('+oo.count30+')</Option>\
          <Option value="30" '+(obj.arr[7]=="30"?'selected="selected"':'')+'>展示内容不一致('+oo.count31+')</Option>\
          <Option value="31" '+(obj.arr[7]=="31"?'selected="selected"':'')+'>无当前类目发布权限('+oo.count32+')</Option>\
          <Option value="32" '+(obj.arr[7]=="32"?'selected="selected"':'')+'>产品组ID为空('+oo.count33+')</Option>\
          <Option value="33" '+(obj.arr[7]=="33"?'selected="selected"':'')+'>重设物流模板('+oo.count34+')</Option>\
          <Option value="34" '+(obj.arr[7]=="34"?'selected="selected"':'')+'>评分低('+oo.count35+')</Option>\
          <Option value="35" '+(obj.arr[7]=="35"?'selected="selected"':'')+'>销量低('+oo.count36+')</Option>\
          <Option value="36" '+(obj.arr[7]=="36"?'selected="selected"':'')+'>错误数据('+oo.count37+')</Option>\
          <Option value="37" '+(obj.arr[7]=="37"?'selected="selected"':'')+'>有中文('+oo.count38+')</Option>\
          <Option value="38" '+(obj.arr[7]=="38"?'selected="selected"':'')+'>尺码模板必填('+oo.count39+')</Option>\
          <Option value="51" '+(obj.arr[7]=="51"?'selected="selected"':'')+'>品牌商投诉('+oo.count40+')</Option>\
          <Option value="52" '+(obj.arr[7]=="52"?'selected="selected"':'')+'>手动审核不通过('+oo.count41+')</Option>\
          <Option value="53" '+(obj.arr[7]=="53"?'selected="selected"':'')+'>禁卖品牌('+oo.count42+')</Option>\
          <Option value="54" '+(obj.arr[7]=="54"?'selected="selected"':'')+'>重复商品('+oo.count43+')</Option>\
          <Option value="55" '+(obj.arr[7]=="55"?'selected="selected"':'')+'>标题重复('+oo.count44+')</Option>\
          <Option value="56" '+(obj.arr[7]=="56"?'selected="selected"':'')+'>首图重复('+oo.count45+')</Option>\
          <Option value="57" '+(obj.arr[7]=="57"?'selected="selected"':'')+'>审核未通过('+oo.count46+')</Option>\
          <Option value="58" '+(obj.arr[7]=="58"?'selected="selected"':'')+'>二次【404错误】('+oo.count47+')</Option>\
          <Option value="59" '+(obj.arr[7]=="59"?'selected="selected"':'')+'>三次【已下架】('+oo.count48+')</Option>\
          <Option value="60" '+(obj.arr[7]=="60"?'selected="selected"':'')+'>三次【库存不足】('+oo.count49+')</Option>\
          <Option value="61" '+(obj.arr[7]=="61"?'selected="selected"':'')+'>二次【销量&lt;2】('+oo.count50+')</Option>\
          <Option value="62" '+(obj.arr[7]=="62"?'selected="selected"':'')+'>二次【评分&lt;4】('+oo.count51+')</Option>\
          <Option value="63" '+(obj.arr[7]=="63"?'selected="selected"':'')+'>最低运费&gt;$5('+oo.count52+')</Option>\
        </Select>\
      </li>\
      <li class="w150">来源</li>\
      <li class="w100">\
      <Select class="form-select" onChange="Tool.open(7,this.options[this.selectedIndex].value)" >\
      <Option value="_20">入库状态</Option>\
      <Option value="<.escape_(and @.inbase=0)/>" {if "<.arr(8)/>"=="Fun(escape_(and @.inbase=0))"/> selected="selected"{/if/>> 未入库 </Option>\
      <Option value="<.escape_(and @.inbase=1)/>" {if "<.arr(8)/>"=="Fun(escape_(and @.inbase=1))"/> selected="selected"{/if/>> 已入库 </Option>\
      </Select></li>\
      <li class="w100">采集时间</li>\
      <li class="w40">操作</li>\
    </ul>'
    return str;
  },
  b02:function(examine)
  {
    let str="";
    switch(examine)
    {
      case 0:str="未审核";break;
      case 1:str="审核通过";break;
      case 2:str="需要更新";break;
      case 3:str="审核不通过";break;
      case 4:str="重新审核";break;
      default:str="未知："+status;
    } 
    return str;
  },
  b03:function(inbase)
  {
    let str="";
    switch(inbase)
    {
      case 0:str='<font color="red">未入库</font>';break;
      case 1:str="已入库";break;
      default:str="未知："+status;
    } 
    return str;
  },
  b04:function(hide)
  {
    let str="";
    switch(hide)
    {
      case 0:str="正常";break;
      case 1:str="已下架";break;
      case 2:str='库存不足<hr/><a href="javascript:" onclick="fun.c05('+hide+')" class="detail-button">删除</a>';break;
      case 3:str="首次404错误";break;
      case 4:str="首次正常";break;
      case 5:str="二次【已下架】";break;
      case 6:str="二次【库存不足】";break;
      case 7:str='销量&lt;2<hr/><a href="javascript:" onclick="fun.c05('+hide+')" class="detail-button">删除</a>';break;
      case 8:str='评分&lt;4<hr/><a href="javascript:" onclick="fun.c05('+hide+')" class="detail-button">删除</a>';break;
      case 9:str="首图重复";break;
      case 10:str="发布类目不对";break;
      case 11:str="图片不能为空";break;
      case 12:str="有速卖通网址";break;
      case 13:str="特别类目限制";break;
      case 14:str="错误为空";break;
      case 15:str="采集错误";break;
      case 16:str="属性错误";break;
      case 17:str="单词堆积";break;
      case 18:str="替换后改正常";break;
      case 19:str="首次404错误";break;
      case 20:str="内容超长";break;
      case 21:str="没有绑定分类";break;
      case 22:str="最低价格限制";break;
      case 23:str="标题不能包含";break;
      case 24:str="必须至少包含";break;
      case 25:str="sku数量错误";break;
      case 26:str="关键词错误";break;
      case 27:str="提交有:undefined";break;
      case 28:str="数据本身有问题";break;
      case 29:str="两张细节图";break;
      case 30:str="展示内容不一致";break;
      case 31:str="无当前类目发布权限";break;
      case 32:str="产品组ID为空";break;
      case 33:str="重设物流模板";break;
      case 34:str="评分低";break;
      case 35:str="销量低";break;
      case 36:str="错误数据";break;
      case 37:str="有中文";break;
      case 38:str="尺码模板必填";break;
      case 51:str="品牌商投诉";break;
      case 52:str="手动审核不通过";break;
      case 53:str="禁卖品牌";break;
      case 54:str="重复商品";break;
      case 55:str="标题重复";break;
      case 56:str="首图重复";break;
      case 57:str="审核未通过";break;
      case 58:str="二次【404错误】";break;
      case 59:str="三次【已下架】";break;
      case 60:str="三次【库存不足】";break;
      case 61:str="二次【销量&lt;2】 ";break;
      case 62:str="二次【评分&lt;4】 ";break;
      case 63:str="最低运费&gt;$5 ";break;
      default:str="未知："+hide;
    } 
    return str;
  },
  b05:function()
  {
    let where=" where @.from='aliexpress'"
    if(obj.arr[11]!="-_-20")
    {
      switch(obj.arr[10])
      {
        case "1":where+=" and @.name like'%"+Tool.unescape(obj.arr[11])+"%'";break;//商品标题
        case "2":where+=" and @.id="+Tool.unescape(obj.arr[11]);break;//商品ID
        case "3":where+=" and @.proid='"+Tool.unescape(obj.arr[11])+"'";break;//商品编码
        case "4":where+=" and @.fromid="+Tool.unescape(obj.arr[11]);break;//来源ID
        case "5":where+=" and @.shopname='"+Tool.unescape(obj.arr[11])+"'";break;//店铺名称
        case "6":where+=" and @.shopid="+Tool.unescape(obj.arr[11]);break;//店铺ID
        case "7":where+=" and @.err like '%"+Tool.unescape(obj.arr[11])+"%'";break;//出错说明
      }
    }
    ////////////////////////////////
    switch(obj.arr[5])
    {
      case "1":where+=" and @.SaleNum=0";break;
      case "2":where+=" and @.SaleNum=1";break;
      case "3":where+=" and @.SaleNum=2";break;
      case "4":where+=" and @.SaleNum=3";break;
      case "5":where+=" and @.SaleNum&gt;3 and @.SaleNum<=5";break;
      case "6":where+=" and @.SaleNum&gt;5 and @.SaleNum<=10";break;
      case "7":where+=" and @.SaleNum&gt;10 and @.SaleNum<=100";break;
      case "8":where+=" and @.SaleNum&gt;1000";break;
      case "9":where+=" and @.Review<3";break;
      case "10":where+=" and @.Review&gt;=3 and @.Review<4";break;
      case "11":where+=" and @.Review&gt;=4 and @.Review<5";break;
      case "12":where+=" and @.Review=4";break;
      case "13":where+=" and @.Review=4.1";break;
      case "14":where+=" and @.Review=4.2";break;
      case "15":where+=" and @.Review=4.3";break;
      case "16":where+=" and @.Review=4.4";break;
      case "17":where+=" and @.Review=4.5";break;
      case "18":where+=" and @.Review=5";break;
      case "19":where+=" and @.price<=1";break;
      case "20":where+=" and @.price&gt;1 and @.price<=2";break;
      case "21":where+=" and @.price&gt;2 and @.price<=3";break;
      case "22":where+=" and @.price&gt;3 and @.price<=5";break;
      case "23":where+=" and @.price&gt;5 and @.price<=10";break;
    }
    where+=obj.arr[6]=="-_-20"?"":" and @.examine="+obj.arr[6];
    where+=obj.arr[7]=="-_-20"?"":" and @.hide="+obj.arr[7];
    where+=obj.arr[8]=="-_-20"?"":" and @.isUpDHgate="+obj.arr[8];
    switch(obj.arr[9])
    {
      case "1":where+=" order by @.addtime desc,:id";break;
      case "2":where+=" order by @.datetime desc,:id";break;
      case "3":where+=" and 12<DateDiff(day,@.datetime,GETDATE()) order by @.datetime desc,:id";break;
      default:where+=" order by @.id desc";
    }
    return where
  },
  c01:function()
  {
  },
	c02:function()
	{
    let Field=$("#Field").val(),searchword=Tool.Trim($("#searchword").val());
    if(Field=="2"&&isNaN(searchword))
    {
      alert("【商品来源ID】必须是数字。")
    }
    else if(searchword)
    {   
      searchword=encodeURIComponent(searchword)
      Tool.main('/'+obj.arr[0]+"/list/"+obj.arr[2]+"/"+obj.arr[3]+"/1/%20/%20/%20/%20/%20/"+Field+"/"+searchword);
    }else{alert("请输入搜索内容");}    
	},
  c03:function(id)
  {
    if(confirm('确定要删除吗？'))
    {
      let str='<r: db="sqlite.aliexpress">delete from @.tempproduct where @.id='+id+'</r:>'
	    Tool.ajax.a01(str,1,this.c04,this)
	  }
	},
  c04:function(txt){if(txt==""){location.reload();}else{alert(txt);}},
  c05:function(hide)
  {
    if(confirm('确定要删除这个状态数据吗？'))
    {
      let str='<r: db="sqlite.aliexpress">delete from @.tempproduct where @.hide='+hide+'</r:>'
	    Tool.ajax.a01(str,1,this.c04,this)
	  }
	},
  c06:function()
  {
    if(confirm('确定要删除吗？'))
    {
      let str='<r: db="sqlite.aliexpress">delete from @.tempproduct where @.SaleNum<=10</r:>'
	    Tool.ajax.a01(str,1,this.c04,this)
	  }
	},
  c07:function()
  {
    if(confirm('确定要删除吗？'))
    {
      let str='<r: db="sqlite.aliexpress">delete from @.tempproduct where @.Review<=4.5</r:>'
	    Tool.ajax.a01(str,1,this.c04,this)
	  }
	},
}
fun.a01();
/*

var fun={
  pageA:1,pageB:1,pageC:0,pageAcount:0,pageBcount:0,pageCarr:0,lis
  Del01:function()
  {
	let html='<r: db="sqlite.aliexpress">delete from @.tempproduct</r:>'
	Tool.ajax.a01(html,1,this.Del02,this)
  },
  Del02:function(txt){location.reload();},
  a01:function(mode)
  {
		this.pageA=Tool.getCookie("temp_Restriction"+mode);this.pageA=this.pageA?parseInt(this.pageA):1;
		this.a02(mode);
  },
  a02:function(mode)
  {
    let str='[{"pagecount":<@page/>}<r:Restriction size=10 page=2 where=" where @.mode='+mode+'">,{"id":"[Restriction:id]","mode":"[Restriction:mode]","type":"[Restriction:type]","name":"[Restriction:name]","des":"[Restriction:des tag=js]"}</r:Restriction>]'
	  Tool.ajax.a01(str,this.pageA,this.a03,this);
  },
  a03:function(txt)
  {
		eval("let arr="+txt);this.list=arr;this.pageAcount=arr[0].pagecount;this.pageBcount=arr.length-1;
		let name=""
		switch(this.list[this.pageB].mode)
		{
			case "0":name="关键词禁限";break;//关键词禁限
			case "1":name="类目禁限";break;//类目禁限
			case "2":name="店铺禁限";break;//店铺禁限
			default:alert("不知");	
		}
		$("#table").html('<tr class="thead"><td colspan="7">临时库正在【'+name+'】...</li></ul><ul><td class="label" width="100">总进度：</li><td id="A"><progress style="width:80%" value="'+(this.pageA-1)+'" max="'+arr[0].pagecount+'"/> '+(this.pageA-1)+'/'+arr[0].pagecount+'</li></ul><ul><td class="label" width="100">页进度：</li><td id="B"><progress style="width:80%" value="'+(this.pageB-1)+'" max="'+(arr.length-1)+'"/> '+(this.pageB-1)+'/'+(arr.length-1)+'</li></ul><ul><td class="label" width="100">当前进度：</li><td id="C"><progress style="width:80%" value="0" max="0"/></li></ul><ul>')
		this.a04();
  },
  a04:function()
  {
	switch(this.list[this.pageB].mode)
	{
	  case "0":this.a05();break;//关键词禁限
	  case "1":this.a03b01();break;//类目禁限
	  case "2":this.a03c01();break;//店铺禁限
	  default:alert("不知");	
	}
  },
  a05:function()
  {
	this.list[this.pageB].name=this.list[this.pageB].name.replace(/\'/,"''")
	this.list[this.pageB].des=this.list[this.pageB].des.replace(/\'/,"''")
	let sql,arr=[]
	if(this.list[this.pageB].type=="")
	{sql="update @.tempproduct set @.tempproduct.@.hide=6,:tempproduct.@.err='关键词禁限-标题或关键词(名称:"+this.list[this.pageB].name+";说明:"+this.list[this.pageB].des+")' from @.tempproduct where @.from='aliexpress' and @.hide=0";}
	else
	{sql="with area as(select @.fromID from @.type where @.fromID='"+this.list[this.pageB].type+"' and @.from='aliexpress' union all select a.@.fromID from @.type a join area b on a.@.upid=b.@.fromid and a.@.from='aliexpress')update @.tempproduct set @.tempproduct.@.hide=6,:tempproduct.@.err='关键词禁限-标题或关键词(名称:"+this.list[this.pageB].name+";说明:"+this.list[this.pageB].des+")' from @.tempproduct,area where @.tempproduct.@.from='aliexpress' and @.tempproduct.@.hide=0 and @.tempproduct.@.type=area.@.fromID"; }
    arr[arr.length]=sql+" and (' '+:name+' | '+:keys+' | '+:keys1+' | '+:keys2+' ') like '% "+this.list[this.pageB].name+" %'<1/>update @.Restriction set @.time=getdate() where @.id="+this.list[this.pageB].id//4个必要项
	arr[arr.length]=sql+" and @.aeopAeProductPropertys like '% "+this.list[this.pageB].name+" %'"//左右空格
	arr[arr.length]=sql+" and @.aeopAeProductPropertys like '%\""+this.list[this.pageB].name+" %'"//左双引右空格
	arr[arr.length]=sql+" and @.aeopAeProductPropertys like '% "+this.list[this.pageB].name+"\"%'"//在空格左双引
	arr[arr.length]=sql+" and @.aeopAeProductPropertys like '%\""+this.list[this.pageB].name+"\"%'"//左右双引
	arr[arr.length]=sql+" and cast(:des AS char(500)) like '% "+this.list[this.pageB].name+" %'"//左右空格
	arr[arr.length]=sql+" and cast(:des AS char(500)) like '%>"+this.list[this.pageB].name+" %'"//左尖右空格
	arr[arr.length]=sql+" and cast(:des AS char(500)) like '% "+this.list[this.pageB].name+"<%'"//左空格右尖
	sql=arr.join("[分隔符]");
	if(this.list[this.pageB].type!="")
	{
	  sql=sql.replace(/\(pre\)aeopAeProductPropertys /ig,":tempproduct.@.aeopAeProductPropertys ")
	  sql=sql.replace(/\(pre\)des /ig,":tempproduct.@.des ");
	  sql=sql.replace(/\(pre\)name /ig,":tempproduct.@.name ");
	  sql=sql.replace(/\(pre\)keys /ig,":tempproduct.@.keys ");
	  sql=sql.replace(/\(pre\)keys1 /ig,":tempproduct.@.keys1 ");
	  sql=sql.replace(/\(pre\)keys2 /ig,":tempproduct.@.keys2 ");
	}
	this.pageCarr=sql.split("[分隔符]")
	this.a06();
  },
  a06:function()
  {
	$("#C").html('<progress style="width:80%" value="'+this.pageC+'" max="'+this.pageCarr.length+'"/> '+this.pageC+'/'+this.pageCarr.length)
	
	let str='<r: db="sqlite.aliexpress">'+this.pageCarr[this.pageC]+'</r:>'
	Tool.ajax.a01(str,1,this.a07,this)
  },
  a07:function(txt)
  {
	if(txt=="")
	{
	  this.pageC++;
	  if(this.pageC<this.pageCarr.length)
	  {this.a06();}
	  else
	  {  
		$("#C").html('<progress style="width:80%" value="'+this.pageC+'" max="'+this.pageCarr.length+'"/> '+this.pageC+'/'+this.pageCarr.length);
		this.pageC=0;this.a08();
	  }
 	}else{document.write("操作失败："+txt);}
  },
  a08:function()
  {
	this.pageB++;
	$("#B").html('<progress style="width:80%" value="'+(this.pageB-1)+'" max="'+this.pageBcount+'"/> '+(this.pageB-1)+'/'+this.pageBcount)
	if(this.pageB<=this.pageBcount)
	{
	  Tool.Time(this.a04,500,this);
	}
	else
	{this.a09();}
  },
  a09:function()
  {
	this.pageA++;
	if(this.pageA<=this.pageAcount)
	{
	  let mode=this.list[this.pageB-1].mode
	  Tool.setCookie("timp_Restriction"+mode,this.pageA,36)
	  $("#A").html('<progress style="width:80%" value="'+(this.pageA-1)+'" max="'+this.pageAcount+'"/> '+(this.pageA-1)+'/'+this.pageAcount)
	  this.pageB=1;this.list=[];this.a02(mode);
	}
	else
	{$("#A").html('<progress style="width:80%" value="'+(this.pageA-1)+'" max="'+this.pageAcount+'"/> '+(this.pageA-1)+'/'+this.pageAcount+"(完)");}
  },
  
	////////////////////////////////////////////////////////////////////////////////////////
  a12:function()
  {
    if(confirm('确定要全部【审核通过】吗？')){
      let str='<r: db="sqlite.aliexpress">update @.tempproduct set @.examine=1 where @.examine=0</r:>'
	   Tool.ajax.a01(str,1,this.a11,this)
	  }
	},
}*/
/*
$(function(){
  $('#selectBtn').click(function(){productSearch()});
  $('#ToCollect').click(function(){location.href='<.arr(1)/>/list/<:attr(type6)/>/'+$("#examine2").val()+'/'+$("#datetime").val();/>);
});
function FunHide6(){obj.NowTime=new Date();runHtml(1);}
function runHtml(page)
{
  let html="",where="",type,sql,str='[{"pagecount":<@page/>}\
  <r:Restriction size=10 page=2>\
  ,{"id":"[Restriction:id]","mode":"[Restriction:mode]","type":"[Restriction:type]","name":"[Restriction:name]","des":"[Restriction:des tag=js]"}\
  </r:Restriction>]'
  $.ajax({type:"POST",url:obj.mode+"exe/"+page+".html?"+Math.random(),data:{data:encodeURIComponent(str)},success:function(txt){
	 eval("let arr="+txt)
	 for(let i=1;i<arr.length;i++)
	 {
	    type=':type in(select @.fromid from @.type where @.upid=\''+arr[i].type+'\' and @.from=\'aliexpress\' and @.isleaf=1 union all select @.fromid from @.type where @.upid in (select @.fromid from @.type where @.upid=\''+arr[i].type+'\' and @.from=\'aliexpress\' and @.isleaf=0) and @.from=\'aliexpress\' and @.isleaf=1 union all select @.fromid from @.type where @.upid in (select @.fromid from @.type where @.upid in (select @.fromid from @.type where @.upid=\''+arr[i].type+'\' and @.from=\'aliexpress\' and @.isleaf=0) and @.from=\'aliexpress\' and @.isleaf=0) and @.from=\'aliexpress\' and @.isleaf=1 union all select @.fromid from @.type where @.upid in(select @.fromid from @.type where @.upid in(select @.fromid from @.type where @.upid in (select @.fromid from @.type where @.upid=\''+arr[i].type+'\' and @.from=\'aliexpress\' and @.isleaf=0) and @.from=\'aliexpress\' and @.isleaf=0) and @.from=\'aliexpress\' and @.isleaf=0)AND :from=\'aliexpress\' and @.isleaf=1 union all select @.fromid from @.type where @.fromID=\''+arr[i].type+'\' and @.from=\'aliexpress\' and @.isleaf=1)'
		if(arr[i].mode=="0")
		{
		  where=" and ' '+:name+' | '+:keys+' | '+:keys1+' | '+:keys2+' ' like '% "+arr[i].name+" %' and @.hide=0"
		  arr[i].des="关键词禁限(品牌名称:"+arr[i].name+";品牌说明:"+arr[i].name+")"
		}
		else if(arr[i].mode=="1")
		{
		  where="";arr[i].des="类目禁限(说明:"+arr[i].des+")"
		}
		else if(arr[i].mode=="2")
		{
		  where=":shopname='"+arr[i].name+"'";type="";arr[i].des="店铺禁限(说明:"+arr[i].des+")";
		}
		html+="<1/>update @.tempproduct set @.hide=6,:err='"+arr[i].des+"' where @.from='aliexpress' and "+type+where
	 }
	 $("#table").html('<tr class="thead"><td colspan="7">一键归类到【品牌商投诉】 (请匆刷新)</li></ul><ul><td class="label" width="100">进度：</li><li><progress style="width:80%" value="'+page+'" max="'+arr[0].pagecount+'"/> '+page+'/'+arr[0].pagecount+'</li></ul><ul><td class="label">统计：</li><td id="state">'+($("#state").html()==null?"正在统计...":$("#state").html())+'</li></ul>')
	 html="<r: tag=\"sql\">"+html.substr(5)+"</r:>"
	 $.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:encodeURIComponent(html)},success:function(txt){
		 state(arr[0].pagecount,page)
		 if(arr[0].pagecount==page){window.location.reload();}else{setTimeout("runHtml("+(page+1)+");",100);}
	  }});
  }});
}
function state(pagecount,num)
{
  obj.EndTime= new Date()
  let t,d,h,m,s,Implemented,age,Surplus
  t=obj.EndTime.getTime()-obj.NowTime.getTime();
  d=Math.floor(t/1000/60/60/24);h=Math.floor(t/1000/60/60%24);
  m=Math.floor(t/1000/60%60);
  s=Math.floor(t/1000%60);
  Implemented='<b>'+d+'</b>天<b>'+h+'</b>时<b>'+m+'</b>分<b>'+s+'</b>秒'
  age=t/1000/num
  Surplus=pagecount-num
  d=Math.floor(Surplus*age/60/60/24);
  h=Math.floor(Surplus*age/60/60%24);
  m=Math.floor(Surplus*age/60%60);
  s=Math.floor(Surplus*age%60);
  $("#state").html('已执行'+Implemented+'，平均<b>'+age.toFixed(2)+'</b>秒/条，剩<b>'+Surplus+'</b>条，大约<b>'+d+'</b>天<b>'+h+'</b>时<b>'+m+'</b>分<b>'+s+'</b>秒完成。']);
	
}
function FunHide8(This)
{
  let str='<r: db="sqlite.aliexpress">update @.tempproduct set @.hide=8,:err=\'标题重复\' where @.from=\'aliexpress\' and @.name in (select @.name from @.tempproduct where @.from=\'aliexpress\' group by :name having count(@.name) > 1) and @.id not in (select min(:id) from @.tempproduct where @.from=\'aliexpress\' group by :name having count(@.name)>1)</r:>'
  This.html("<img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/>")
  $.ajax({type:"post",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(str)},success:function(txt){
	   location.reload();
  }});
}
function FunHide9(This)
{
  let str='<r: db="sqlite.aliexpress">update @.tempproduct set @.hide=9,:err=\'首图重复\' where @.from=\'aliexpress\' and @.pic1 in (select @.pic1 from @.tempproduct where @.from=\'aliexpress\' group by :pic1 having count(:pic1) > 1) and @.id not in (select min(:id) from @.tempproduct where @.from=\'aliexpress\' group by :pic1 having count(:pic1)>1)</r:>'
  This.html("<img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/>")
  $.ajax({type:"post",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(str)},success:function(txt){location.reload();}});
}
function FunHide12(This)
{
  let str='<r: db="sqlite.aliexpress">update @.tempproduct set @.hide=12,:err=\'有速卖通的网址\' where @.from=\'aliexpress\' and @.des like \'%www.aliexpress%\'and :hide=0</r:>'
  This.html("<img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/>");
  $.ajax({type:"post",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(str)},success:function(txt){location.reload();}});
}*/