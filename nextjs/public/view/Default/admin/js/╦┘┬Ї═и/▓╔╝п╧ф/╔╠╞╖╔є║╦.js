'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        this.a02();
    },
    a02: function () {
        let str = '[0\
        <r:pro db="sqlite.aliexpress" size=10 page=2>,\
        {\
          "proid":"<:proid/>",\
          "fromid":<:fromid/>,\
          "shopid":<:shopid/>,\
          "count01":"<:Db(select count(1) as total from @.pro where @.shopid=<:shopid/> and @.hide<>0,count)/>",\
          "count02":"<:Db(select count(1) as total from @.pro where @.shopid=<:shopid/>,count)/>",\
          "datetime":"<:datetime/>",\
          "SaleNum":<:SaleNum/>,\
          "err":"<:err tag=js/>",\
          "id":<:id/>\
        }\
        </r:pro>]'
        Tool.ajax.a01(str, obj.arr[4],this.a03,  this);
    },
    a03: function (oo) {
        let html = '';
        for (let i = 1; i < oo.length; i++) {
            html += '\
      <tr>\
        <td>\
          编码:'+ oo[i].proid + '<hr/>来源:' + oo[i].from + '<hr/>\
          <a href="'+ oo[i].fromurl + '" target="_blank" title="点击查看来源">' + oo[i].fromid + '</a><hr/>\
          <a href="'+ oo[i].shopUrl + '" target="_blank" title="点击查看店铺">店铺ID:' + oo[i].shopid + '</a><hr/>\
          <strong>'+ oo[i].count01 + '/' + oo[i].count02 + '</strong><hr/>\
          <a href="javascript:;" onclick=\'fun.a01(<:id/>,$(this))\' class="detail-button">禁</a>\
          <a href="javascript:;" onclick=\'fun.a03(<:id/>,$(this))\' class="detail-button">过</a><hr/>\
          '+ oo[i].datetime + '<hr/>\
          <a href="javascript:;" onclick=\'fun.b01(<:shopid/>)\' class="detail-button">该店需重采</a>\
        </td>\
        <td>'+ oo[i].SaleNum + '</td>\
        <td>\
          <strong>出错说明：</strong>'+ oo[i].err + '<hr/>\
          <strong>分类：</strong>\
          <hr/>\
          <span name="pic<:proid/>"><:pic Fun="Fun(run(propic($1)))"/></span>\
          <hr/>\
          <input type="hidden" id="des<:proid/>" value="<:des code=en/>" style="display:none" />\
          <input type="hidden" id="des<:proid/>___Config" value="<:proid/>" style="display:none" />\
          <iframe id="des<:proid/>___Frame" src="/<.Path/>admin/fckeditor/editor/fckeditor.htm?InstanceName=des<:proid/>&amp;Toolbar=rendie" width="1200" height="1000" frameborder="0" scrolling="no"></iframe></td>\
        <td>\
          <input type="radio" name="examine<:proid/>" value="0" id="examine-0<:proid/>"{if "<:examine/>"=="0"} checked="checked"{/if}/>\
          <label for="examine-0<:proid/>">未审核</label>\
          <hr/>\
          <input type="radio" name="examine<:proid/>" value="1" id="examine-1<:proid/>"{if "<:examine/>"=="1"} checked="checked"{/if}/>\
          <label for="examine-1<:proid/>">审核通过</label>\
          <hr/>\
          {if "Fun(Db(select top 1 count(1) as total from @.dhUpPro where @.from=\'dhgate\' and @.proid=\'<:proid/>\',count))"=="0"}\
          <input type="radio" name="examine<:proid/>" value="2" id="examine-2<:proid/>" disabled="disabled"/>\
          <label for="examine-2<:proid/>">需要更新</label>\
          {else/}\
          <input type="radio" name="examine<:proid/>" value="2" id="examine-2"/>\
          <label for="examine-2<:proid/>">需要更新</label>\
          {/if}\
          <hr/>\
          <input type="radio" name="examine<:proid/>" value="3" id="examine-3"/>\
          <label for="examine-3<:proid/>">审核不通过</label>\
          <hr/>\
          <input type="radio" name="examine<:proid/>" value="4" id="examine-4" disabled="disabled"/>\
          <label for="examine-4<:proid/>">重新审核</label></td>\
      </tr>'
        }

        html += '\
    <tr>\
      <td colspan="5"><a href="javascript:" class="button left" onclick="fun.ProEdit01(0)">确认修改</a><a href="javascript:" class="button left" onclick="fun.ProEdit01(1)">确认修改且【未审核】改【审核通过】</a><a href="javascript:" class="button left" onclick="">修改为【审核不通过】</a></td>\
    </tr>'
        html = '\
    <ul class="Tul list-group-item-action">\
      <li>\
        <select id="Field" class="form-select">\
          <option value="and :proid=\'$1\'">商品编码</option>\
          <option value="and :fromid=$1">来源ID</option>\
          <option value="and :shopname=\'$1\'">店铺名称</option>\
          <option value="and :shopid=$1">店铺ID</option>\
          <option value="and">出错说明</option>\
        </select>\
      </li>\
      <li class="w300">\
        <input type="text" class="form-select" id="searchword" value="<.unarr(8)/>" onKeyDown="if(event.keyCode==13){fun.proSearch();/>">\
      </li>\
      <li> <a href="javascript:" class="button" onclick="fun.proSearch()">搜索</a> <a href="javascript:Tool.protype01($(this),\'list/<.arr(3)/>/1/%20/%20/%20/%20/{$ID/>.html\')" class="button">\
        <if "Fun(arr2(8))"=="-_-20">查看分类数据\
          <else/>\
          <r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<.arr(9)/>\'" size=1>\
            <r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1>\
              <r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1>\
                <r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1> <:name/> &gt; </r:type>\
                <:name/> &gt; </r:type>\
              <:name/> &gt; </r:type>\
            <:name/> </r:type>\
        </if>\
        </a></li>\
    </ul>\
    <table class="table table-hover center">\
      <thead class="table-light">'+ this.b01() + '</thead>\
      <tbody>'+ html + '</tbody>\
    </table>'
        Tool.html(null, null, html)
    },
    b01: function () {
        let html = '\
    <tr>\
      <th class="w200">商品信息</th>\
      <th class="w100"><Select onChange="Tool.open(8,this.options[this.selectedIndex].value)"  class="form-select">\
          <Option value="-_-20">销量</Option>\
          <Option value="<:escape_(and @.SaleNum&gt;0)/>">销量=0</Option>\
          <Option value="<:escape_(and @.SaleNum&gt;0)/>" {if "Fun(arr(8))"=="and%20_28pre_29SaleNum_3E0"} selected="selected"{/if}>销量&gt;0</Option>\
          <Option value="<:escape_(and @.SaleNum&gt;10)/>" {if "Fun(arr(8))"=="and%20_28pre_29SaleNum_3E10"} selected="selected"{/if}>销量&gt;10</Option>\
          <Option value="<:escape_(and @.SaleNum&gt;100)/>" {if "Fun(arr(8))"=="and%20_28pre_29SaleNum_3E100"} selected="selected"{/if}>销量&gt;20</Option>\
          <Option value="<:escape_(and @.SaleNum&gt;0)/>" {if "Fun(arr(8))"=="and%20_28pre_29SaleNum_3E0"} selected="selected"{/if}>销量&lt;10</Option>\
          <Option value="<:escape_(and @.SaleNum&gt;0)/>" {if "Fun(arr(8))"=="and%20_28pre_29SaleNum_3E0"} selected="selected"{/if}>销量&lt;20</Option>\
        </Select>\
      </th>\
      <th>\
        <Select  class="form-select" onChange="Tool.open(5,this.options[this.selectedIndex].value)">\
          <Option value="-_-20">状态</Option>\
          <Option value="<:escape_(and @.hide=0)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=0))"} selected="selected"{/if}>正常\
          (<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=0,count)/>)</Option>\
          <Option value="<:escape_(and @.hide<>0)/>" {if "Fun(arr(8))"=="and%20_28pre_29hide_3C_3E0"} selected="selected"{/if}>非正常\
          (<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide<>0,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=1)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=1))"} selected="selected"{/if}>回收站(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=1,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=2)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=2))"} selected="selected"{/if}>错误数据\(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=2,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=3)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=3))"} selected="selected"{/if}>审核未通过\(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=3,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=4)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=4))"} selected="selected"{/if}>品牌商投诉\(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=4,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=5)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=5))"} selected="selected"{/if}>手动审核不通过(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=5,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=6)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=6))"} selected="selected"{/if}>禁卖品牌(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=6,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=7)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=7))"} selected="selected"{/if}>重复商品(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=7,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=8)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=8))"} selected="selected"{/if}>标题重复(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=8,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=9)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=9))"} selected="selected"{/if}>首图重复(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=9,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=10)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=10))"} selected="selected"{/if}>发布类目不对(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=10,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=11)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=11))"} selected="selected"{/if}>图片不能为空(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=11,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=12)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=12))"} selected="selected"{/if}>有速卖通网址(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=12,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=13)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=13))"} selected="selected"{/if}>特别类目限制(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=13,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=14)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=14))"} selected="selected"{/if}>错误为空(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=14,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=15)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=15))"} selected="selected"{/if}>采集错误(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=15,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=16)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=16))"} selected="selected"{/if}>属性错误(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=16,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=17)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=17))"} selected="selected"{/if}>单词堆积(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=17,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=18)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=18))"} selected="selected"{/if}>替换后改正常(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=18,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=19)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=19))"} selected="selected"{/if}>404错误(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=19,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=20)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=20))"} selected="selected"{/if}>内容超长(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=20,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=21)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=21))"} selected="selected"{/if}>没有绑定分类(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=21,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=22)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=22))"} selected="selected"{/if}>最低价格限制(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=22,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=23)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=23))"} selected="selected"{/if}>标题不能包含(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=23,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=24)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=24))"} selected="selected"{/if}>必须至少包含(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=24,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=25)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=25))"} selected="selected"{/if}>sku数量错误(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=25,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=26)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=26))"} selected="selected"{/if}>关键词错误(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=26,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=27)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=27))"} selected="selected"{/if}>提交有:undefined(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=27,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=28)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=28))"} selected="selected"{/if}>数据本身有问题(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=28,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=29)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=29))"} selected="selected"{/if}>两张细节图(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=29,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=30)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=30))"} selected="selected"{/if}>展示内容不一致(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=30,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=31)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=31))"} selected="selected"{/if}>无当前类目发布权限(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=31,count)/>)</Option>\
          <Option value="<:escape_(and @.hide=32)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.hide=32))"} selected="selected"{/if}>产品组ID为空(<.Db(select count(1) as total from @.pro where @.from=\'aliexpress\' and @.hide=32,count)/>)</Option>\
        </Select></th>\
      <th>内容</th>\
      <th>\
        <Select  class="form-select" onChange="Tool.open(6,this.options[this.selectedIndex].value)" >\
          <Option value="-_-20">审核状态</Option>\
          <Option value="<.escape_(and @.examine=0)/>" {if "Fun(arr(6))"=="Fun(escape_(and @.examine=0))"} selected="selected"{/if/>>未审核</Option>\
          <Option value="<.escape_(and @.examine=1)/>" {if "Fun(arr(6))"=="Fun(escape_(and @.examine=1))"} selected="selected"{/if/>>审核通过</Option>\
          <Option value="<.escape_(and @.examine=2)/>" {if "Fun(arr(6))"=="Fun(escape_(and @.examine=2))"} selected="selected"{/if/>>需要更新</Option>\
          <Option value="<.escape_(and @.examine=3)/>" {if "Fun(arr(6))"=="Fun(escape_(and @.examine=3))"} selected="selected"{/if/>>审核不通过</Option>\
          <Option value="<.escape_(and @.examine=4)/>" {if "Fun(arr(6))"=="Fun(escape_(and @.examine=4))"} selected="selected"{/if/>>重新审核</Option>\
        </Select></th>\
    </tr>'
        return html;
    }
}
fun.a01();
/*

function prowhere(){
 let str=' where @.from=\'aliexpress\' <.unarr(5)/> <.unarr(6)/> {r:unarr(7)/> \
      <if "Fun(arr2(9))"!="-_-20">\
        <if "Fun(Db(select top 1 :id from @.type where @.fromid=\'<.arr(9)/>\' and @.from=\'aliexpress\' and @.isleaf=0,count))"!="">\
            and :type in(\
            select @.fromid from @.type where @.upid=\'<.arr(9)/>\' and @.from=\'aliexpress\' and @.isleaf=1\
            union all \
            select @.fromid from @.type where @.upid in\
            (\
                select @.fromid from @.type where @.upid=\'<.arr(9)/>\' and @.from=\'aliexpress\'  and @.isleaf=0\
            ) and @.from=\'aliexpress\'  and @.isleaf=1\
            union all \
            select @.fromid from @.type where @.upid in \
            ( \
                select @.fromid from @.type where @.upid in \
                (\
                    select @.fromid from @.type where @.upid=\'<.arr(9)/>\' and @.from=\'aliexpress\' and @.isleaf=0\
                ) and @.from=\'aliexpress\'  and @.isleaf=0\
            ) and @.from=\'aliexpress\' and @.isleaf=1\
            )\
        <else/> and @.type=<.arr(9)/></if>\
    </if> order by @.datetime desc,rd_id desc'
    //type字段说明rd_SaleNum desc,
    //第一层if语句:将传过来的分类ID，先判断是否有子类目。
    //第二层if语句:子类目里是否还没子类目
 return str
}
function propic(name)
{
  let arr=name.split(";"),html=""
  for(let i=0;i<arr.length;i++)
  {
    html+='<img style="margin:2px;padding:1px;border:1px solid #ccc" src="'+arr[i]+'" title="点击预览" border="0" width="170"><a href="javascript:;" onclick="$(this).prev().remove();$(this).remove();">删除</a>'
  }
  return html
}

    a01:function(id,This)//禁
    {
        let err="在审核商品时，对图该店的商品不满意（如：水印，有禁卖商品等）"
        let str='<r:pro where=" where @.id='+id+'"><r: db="sqlite.aliexpress">insert into @.Restriction(:from,:mode,:name,:des,:time)values(\'aliexpress\',3,<:shopid/>,\''+err+'\',getdate())<1/>update @.smtPro set @.examine=3,:hide=53,:err=\''+err+'\'  where @.from=\'aliexpress\' and @.shopid=<:shopid/></r:></r:pro>'
        Tool.ajax.a01(str,1,this.a02,this,This);
    },
    a02:function(t,This)
    {
        if(t=="")
        {
            window.location.reload();
            //This.parent().parent().remove();
        }else{alert("出错001："+t);}
    },
    a03:function(id,This)//过
    {
        let str='<r:pro where=" where @.id='+id+'"><r: db="sqlite.aliexpress">update @.smtPro set @.examine=1 where @.from=\'aliexpress\' and @.hide=0 and @.shopid=<:shopid/><1/>update @.dhUpPro set @.examine=1 where @.from=\'dhgate\' and @.proid in(select @.proid from @.smtPro where @.from=\'aliexpress\' and @.hide=0 and @.shopid=<:shopid/>)</r:></r:pro>'
        Tool.ajax.a01(str,1,this.a02,this,This);
    },
    ProEdit01:function(val)
    {
        let arr=[];
        $("input[type='hidden'][id$='___Config']").each(function()
        {
            let id=$(this).val(),examine,des,oEditor,picArr=[],pic,hide=""
            $("[name='pic"+id+"'] img").each(function(){picArr[picArr.length]=$(this).attr("src");});
            pic=picArr.join(";")
            examine=$("[name='examine"+id+"']:checked").val()
            if(examine=="3")
            {
                hide=",:hide=52,:err='手动审核不通过'";
              arr[arr.length]='update @.dhUpPro set @.examine='+examine+' where @.from=\'dhgate\' and @.proid=\''+id+'\''
            }
            else if(examine=="2")
            {
                hide=",:hide=0,:err=null";
              arr[arr.length]='update @.dhUpPro set @.examine='+examine+' where @.from=\'dhgate\' and @.proid=\''+id+'\''
            }
            oEditor = FCKeditorAPI.GetInstance("des"+id);
            des=":des='"+(oEditor.GetXHTML(true)).replace(/'/ig,"''")+"'"
            if(val==1&&examine=="0"){examine=1;}
            arr[arr.length]='update @.smtPro set @.examine='+examine+','+des+hide+',:pic=\''+pic+'\' where @.from=\'aliexpress\' and @.proid=\''+id+'\''
        });
        let html='<r: db="sqlite.aliexpress">'+arr.join("<1/>")+'</r:>';
        Tool.ajax.a01(html,1,this.ProEdit02,this)
    },
    ProEdit02:function(txt){if(txt==""){window.location.reload();}else{alert("错误01："+txt);}},
    ProEdit03:function()
    {
        let arr=[];
        $("input[type='hidden'][id$='___Config']").each(function()
        {
            let id=$(this).val()
          arr[arr.length]='update @.dhUpPro set @.examine=3 where @.from=\'dhgate\' and @.proid=\''+id+'\''
            arr[arr.length]='update @.smtPro set @.examine=3,:hide=52,:err=\'手动审核不通过\' where @.from=\'aliexpress\' and @.proid=\''+id+'\''
        });
        let html='<r: db="sqlite.aliexpress">'+arr.join("<1/>")+'</r:>';
        Tool.ajax.a01(html,1,this.ProEdit02,this)
    },
    b01:function(shopid)
    {
        let str='<r: db="sqlite.aliexpress">update @.smtPro set @.datetime=\'2018/1/1\' where @.from=\'aliexpress\' and @.shopid='+shopid+'</r:>';
        Tool.ajax.a01(str,1,this.a02,this);
    }*/