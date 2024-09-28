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
      <td colspan="17"> 关键字:\
        <input type="text" id="searchword" size="40" value="<.unarr(6)/>">\
        &nbsp;条件:\
        <select id="Field" >\
          <option value="and :name like \'%$1%\'">短信标题</option>\
          <option value="and :Sender like \'%$1%\'">发送用户</option>\
          <option value="and :receiver like \'%$1%\'">接收用户</option>\
        </select>\
        <input type="button" value="开始搜索" class="pn" onClick="MessageSearch()">\
        &nbsp;&nbsp;&nbsp;&nbsp;\
        来源账户：\
        <Select onChange="self.location.href=\'<.arr(1)/>/list/<.arr(3)/>/1/_20/_20/\'+this.options[this.selectedIndex].value+\'/{if "{r:arr(8)/>"=="">\
          _20\          <else/>\
          <.arr(8)/>\
          </if>\
          /{if "Fun(arr(9))"=="">_20\          <else/>\          <.arr(9)/>\          </if>\          .html\'" >\          <Option value="_20">所有来源账户</Option>\
          <r:APIaccount size=50  where=" where @.from=\'dhgate\' order by @.sort asc"> <Option value="{EFun(escape_(and @.fromuser=\'[APIaccount:UserName]\'))}" \
            <if "Fun(arr(7))"=="Fun(escape_(and @.fromuser=\'[APIaccount:UserName]\'))"} selected="selected"{/if}>\
            [APIaccount:UserName]\
            </Option>\
          </r:APIaccount>\
        </Select>\
        &nbsp;&nbsp;&nbsp;&nbsp;\
        类型：\
        <select name="showMsgId" onChange="self.location.href=\'<.arr(1)/>/list/{r:arr(3)/>/1/_20/_20/{if "Fun(arr(7))"=="">\
          _20\
          <else/>\
          <.arr(7)/>\
          </if>\
          /\'+this.options[this.selectedIndex].value+\'/{if "Fun(arr(9))"=="">_20\
          <else/>\
          <.arr(9)/>\
          </if>\
          .html\'">\
          <option value="_20">全部</option>\
          <option value="{EFun(escape_(and @.msgtype=\'001\'))}" \
          <if "Fun(arr(8))"=="Fun(escape_(and @.msgtype=\'001\'))"} selected="selected"{/if}>\
          买卖家消息-询盘\
          </option>\
          <option value="<:escape_(and @.msgtype=\'002\')/>" \
          <if "Fun(arr(8))"=="Fun(escape_(and @.msgtype=\'002\'))"} selected="selected"{/if}>\
          买卖家消息-订单\
          </option>\
          <option value="<:escape_(and @.msgtype=\'003\')/>" \
          <if "Fun(arr(8))"=="Fun(escape_(and @.msgtype=\'003\'))"} selected="selected"{/if}>\
          买卖家消息-其它\
          </option>\
          <option value="<:escape_(and @.msgtype=\'004\')/>" \
          <if "Fun(arr(8))"=="Fun(escape_(and @.msgtype=\'004\'))"} selected="selected"{/if}>\
          系统消息-订单\
          </option>\
          <option value="<:escape_(and @.msgtype=\'005\')/>" \
          <if "Fun(arr(8))"=="Fun(escape_(and @.msgtype=\'005\'))"} selected="selected"{/if}>\
          系统消息-产品\
          </option>\
          <option value="<:escape_(and @.msgtype=\'006\')/>" \
          <if "Fun(arr(8))"=="Fun(escape_(and @.msgtype=\'006\'))"} selected="selected"{/if}>\
          系统消息-付款/退款\
          </option>\
          <option value="<:escape_(and @.msgtype=\'007\')/>" \
          <if "Fun(arr(8))"=="Fun(escape_(and @.msgtype=\'007\'))"} selected="selected"{/if}>\
          系统消息-促销\
          </option>\
          <option value="<:escape_(and @.msgtype=\'008\')/>" \
          <if "Fun(arr(8))"=="Fun(escape_(and @.msgtype=\'008\'))"} selected="selected"{/if}>\
          系统消息-账户\
          </option>\
          <option value="<:escape_(and @.msgtype=\'009\')/>" \
          <if "Fun(arr(8))"=="Fun(escape_(and @.msgtype=\'009\'))"} selected="selected"{/if}>\
          系统消息-其它\
          </option>\
          <option value="<:escape_(and @.msgtype=\'010\')/>" \
          <if "Fun(arr(8))"=="Fun(escape_(and @.msgtype=\'010\'))"} selected="selected"{/if}>\
          平台公告-活动宣传\
          </option>\
          <option value="<:escape_(and @.msgtype=\'011\')/>" \
          <if "Fun(arr(8))"=="Fun(escape_(and @.msgtype=\'011\'))"} selected="selected"{/if}>\
          平台公告-政策通知\
          </option>\
          <option value="<:escape_(and @.msgtype=\'012\')/>" \
          <if "Fun(arr(8))"=="Fun(escape_(and @.msgtype=\'012\'))"} selected="selected"{/if}>\
          平台公告-商品营销\
          </option>\
          <option value="<:escape_(and @.msgtype=\'013\')/>" \
          <if "Fun(arr(8))"=="Fun(escape_(and @.msgtype=\'013\'))"} selected="selected"{/if}>\
          平台公告-其它\
          </option>\
        </select>\
        &nbsp;&nbsp;&nbsp;&nbsp;\
        来源账户状态：\
        <select name="showMsgId" onChange="self.location.href=\'<.arr(1)/>/list/{r:arr(3)/>/1/_20/_20/{if "Fun(arr(7))"=="">\
          _20\
          <else/>\
          <.arr(7)/>\
          </if>\
          /{if "<.arr(8)/>"=="">_20\
          <else/>\
          <.arr(8)/>\
          </if>\
          /\'+this.options[this.selectedIndex].value+\'.html\'">\
          <option value="_20">所有状态</option>\
          <option value="{EFun(escape_(and @.receiverRead=true and @.fromuser=@.receiver))}" \
          <if "Fun(arr(9))"=="Fun(escape_(and @.receiverRead=true and @.fromuser=@.receiver))"} selected="selected"{/if}>\
          已读\
          </option>\
          <option value="{EFun(escape_(and @.receiverRead=false and @.fromuser=@.receiver))}" \
          <if "Fun(arr(9))"=="Fun(escape_(and @.receiverRead=false and @.fromuser=@.receiver))"} selected="selected"{/if}>\
          未读\
          </option>\
          <option value="{EFun(escape_(and @.receiverMark=true and @.fromuser=@.receiver))}"\
          <if "Fun(arr(9))"=="Fun(escape_(and @.receiverMark=true and @.fromuser=@.receiver))"} selected="selected"{/if}>\
          已标记\
          </option>\
          <option value="{EFun(escape_(and @.receiverMark=false and @.fromuser=@.receiver))}"\
          <if "Fun(arr(9))"=="Fun(escape_(and @.receiverMark=false and @.fromuser=@.receiver))"} selected="selected"{/if}>\
          未标记\
          </option>\
          <option value="{EFun(escape_(and @.receiverStatus=true and @.fromuser=@.receiver))}"\
          <if "Fun(arr(9))"=="Fun(escape_(and @.receiverStatus=true and @.fromuser=@.receiver))"} selected="selected"{/if}>\
          正常\
          </option>\
          <option value="{EFun(escape_(and @.receiverStatus=false and @.fromuser=@.receiver))}"\
          <if "Fun(arr(9))"=="Fun(escape_(and @.receiverStatus=false and @.fromuser=@.receiver))"} selected="selected"{/if}>\
          回收站\
          </option>\
        </select></td>\
    </tr>\
    <tr align="center">\
      <td>ID</td>\
      <td nowrap="nowrap">类型</td>\
      <td align="left">标题</td>\
      <td align="left" nowrap="nowrap">回复数</td>\
      <td>接收者</td>\
      <td colspan="3">接收者状态</td>\
      <td>发送者</td>\
      <td colspan="3">发送者状态</td>\
      <td nowrap="nowrap">发送时间</td>\
      <td>来源</td>\
      <td>来源ID</td>\
      <td nowrap="nowrap">来源用户</td>\
      <td>操作</td>\
    </tr>\
    <r:Message size=20 page=4 where=" where @.from=\'rendie\' <.unarr(5)/> <.unarr(7)/> {r:unarr(8)/> {r:unarr(9)/> order by @.SendTime desc,@.id desc">\
      <tr align="center">\
        <td nowrap="nowrap" align="left"><input type="checkbox" value="[Message:id]" name="pre_id"  class="checkbox" id="check-[Message:id]"/>\
          <label for="check-[Message:id]">[Message:id]</label></td>\
        <td nowrap="nowrap"><if "[Message:msgtype]"=="001"}买卖家消息-询盘\
		<elseif "[Message:msgtype]"=="002"}买卖家消息-订单\
		<elseif "[Message:msgtype]"=="003"}买卖家消息-其它\
		<elseif "[Message:msgtype]"=="004"}系统消息-订单\
		<elseif "[Message:msgtype]"=="005"}系统消息-产品\
		<elseif "[Message:msgtype]"=="006"}系统消息-付款/退款\
		<elseif "[Message:msgtype]"=="007"}系统消息-促销\
		<elseif "[Message:msgtype]"=="008"}系统消息-账户\
		<elseif "[Message:msgtype]"=="009"}系统消息-其它\
		<elseif "[Message:msgtype]"=="010"}平台公告-活动宣传\
		<elseif "[Message:msgtype]"=="011"}平台公告-政策通知\
		<elseif "[Message:msgtype]"=="012"}平台公告-商品营销\
		<elseif "[Message:msgtype]"=="013"}平台公告-其它\
		\
          <else/>\
          未知\
          </if></td>\
        <td align="left"><img src="/<.Path/>admin/img/Announce.gif" align="absmiddle"><a href="<.arr(1)/>/article/{r:arr(3)/>/[Message:fromid].html">[Message:name]</a></td>\
        <td>[Message:msgreplycount]</td>\
        <td>[Message:receiver]</td>\
        <td><if "[Message:receiverRead]"=="True"}\
		<span class="hasread" title="已读" onClick="receiverRead(false,[Message:fromid])">&nbsp;&nbsp;&nbsp;&nbsp;</span>\
          <else/>\
          <span class="inb-smcheck" title="未读" onClick="receiverRead(true,[Message:fromid])">&nbsp;&nbsp;&nbsp;&nbsp;</span>\
          </if></td>\
        <td><if "[Message:receiverMark]"=="True"}\
		<span class="hasmarked" title="已标记">&nbsp;&nbsp;&nbsp;&nbsp;</span>\
          <else/>\
          <span class="inb-smmark" title="未标记">&nbsp;&nbsp;&nbsp;&nbsp;</span>\
          </if></td>\
        <td nowrap="nowrap"><if "[Message:receiverStatus]"=="True"}回收站\
          <else/>\
          正常\
          </if></td>\
        <td>[Message:Sender]</td>\
        <td><if "[Message:senderRead]"=="True"}\
		<span class="hasread" title="已读">&nbsp;&nbsp;&nbsp;&nbsp;</span>\
          <else/>\
          <span class="inb-smcheck" title="未读">&nbsp;&nbsp;&nbsp;&nbsp;</span>\
          </if></td>\
        <td><if "[Message:senderMark]"=="True"}\
		<span class="hasmarked" title="已标记">&nbsp;&nbsp;&nbsp;&nbsp;</span>\
          <else/>\
          <span class="inb-smmark" title="未标记">&nbsp;&nbsp;&nbsp;&nbsp;</span>\
          </if></td>\
        <td nowrap="nowrap"><if "[Message:senderStatus]"=="True"}回收站\
          <else/>\
          正常\
          </if></td>\
        <td nowrap="nowrap">[Message:Sendtime]</td>\
        <td>[Message:from]</td>\
        <td>[Message:fromid]</td>\
        <td nowrap="nowrap">[Message:fromuser]</td>\
        <td nowrap="nowrap"><a onClick="return(confirm(\'删除后不可恢复，确定删除吗?\'))" href="#">删除</a></td>\
      </tr>\
    </r:Message>\
    <tr>\
      <td colspan=17 height="30"><input type="button" class="pn" value="反选"  />\
        <input type="submit" value="删除选中的记录" onClick="return(confirm(\'确定删除选中的记录吗？\'))" class="pn"></td>\
    </tr>\
  </table>\
  <.load(admin/html/分页通用.html)/>\
  <br/>\
  <table class="tb">\
    <tr class="thead">\
      <td height="25" colspan="2">短消息管理(批量删除)</td>\
    </tr>\
    <tr>\
      <td colspan="2" bgcolor="#FFFFFF" class=tdbg> 批量删除用户指定日期内短消息（默认为删除已读信息）：\
        <select name="delDate" size=1 >\
          <option value=7>一个星期前</option>\
          <option value=30>一个月前</option>\
          <option value=60>两个月前</option>\
          <option value=180>半年前</option>\
          <option value="all">所有信息</option>\
        </select>\
        &nbsp;\
        <input type="checkbox" name="isread" value="yes">\
        包括未读信息\
        <input type="submit" name="Submit" class="pn" value="提 交"></td>\
    </tr>\
    <tr>\
      <td colspan="2" bgcolor="#FFFFFF" class=tdbg> 批量删除含有某关键字短信（注意：本操作将删除所有已读和未读信息）：\
        关键字：\
        <input  type="text" name="keyword" size=30>\
        &nbsp;在\
        <select name="selaction" size=1 >\
          <option value=1>标题中</option>\
          <option value=2>内容中</option>\
        </select>\
        &nbsp;\
        <input type="submit" name="Submit" value="提 交" class=\'button\'></td>\
    </tr>\
    </table>'
    Tool.a01(html)
  }
}
fun.a01();
/*

function receiverRead(bool,fromid){
	let html="<pres><r: tag=\"sql\">update @.message set @.receiverRead="+bool+" where @.from='dhgate' and @.fromid="+fromid+"</r:></pres>"
	$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(html)},async:false}).responseText;
	window.location.reload();
}
*/