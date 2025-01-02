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
      <td colspan="7">问题列表管理 (<a href="?">所有问题列表</a> &nbsp;|&nbsp;<a href="?action=verifyanswer">审核用户的回答</a>)</td>\
    </tr>\
    <tr>\
      <td colspan="7"><b>查看：</b> <a href="KS.AskList.asp"><font color=#999999>全部</font></a> - <a href="?showmode=1"><font color=#999999>待解决</font></a> - <a href="?showmode=2"><font color=#999999>已解决</font></a> - <a href="?showmode=3"><font color=#999999>有悬赏</font></a> - <a href="?showmode=4"><font color=#999999>未审核</font></a> - <a href="?showmode=5"><font color=#999999>已审核</font></a> &nbsp;&nbsp;<b>排序方式:</b>\
        <select name="orders" onChange="location.href=\'?orders=\'+this.value" >\
          <option value="">--选择排序方式--</option>\
          <option value="TopicID Desc">最新提问</option>\
          <option value="LastPostTime Desc,TopicID Desc">最新回答</option>\
          <option value="Hits Desc,TopicID Desc">浏览次数最多</option>\
          <option value="Reward Desc,TopicID Desc">悬赏分最高</option>\
        </select></td>\
    </tr>\
    <tr>\
      <td>选择</td>\
      <td>标题</td>\
      <td>用户名</td>\
      <td>状态</td>\
      <td>发布日期</td>\
      <td>浏览</td>\
      <td>管理操作</td>\
    </tr>\
    <form name="myform" id="myform" method="post" action="?">\
      <input type="hidden" name="action" id="action" value="del">\
      <tr>\
        <td><input type="checkbox" name="ID" value=\'180\' id="ID-180">\
          <label for="ID-180">180</label></td>\
        <td> [<a href="../ask/showlist.aspx?id=8" target="_blank">搜房卡</a>] <a href="../ask/q.aspx?id=85" target="_blank">我来问一个问题</a></td>\
        <td>admin</td>\
        <td><a target="_blank" href="../ask/q.aspx?id=85"><img src="../ask/<.Path/>admin/ask1.gif" border="0"/></a></td>\
        <td>2012/4/1</td>\
        <td>16</td>\
        <td><span style=\'color:#999\'>回答</span>&nbsp;|&nbsp;<a href="?action=asked&topicid=85">编辑</a>&nbsp;|&nbsp;<a href="?action=del&id=85" onClick="return confirm(\'删除后将不能恢复，您确定要删除吗?\')">删除</a></td>\
      </tr>\
      <tr>\
        <td colspan="7"><input type="button" class="pn" value="反选"/>\
          <input class="pn" type="submit" name="submit_button1" value="批量删除" onClick="$(\'action\').value=\'del\';return confirm(\'您确定执行该操作吗?\');">\
          <input type="submit" value="审核" class="pn" onClick="$(\'#action\').val(\'verify\');return(confirm(\'确定批量审核吗?\'));">\
          <input type="submit" value="取消审核" class="pn" onClick="$(\'#action\').val(\'unverify\');return(confirm(\'确定批量取消审核吗?\'));">\
          <input type="submit" value="推荐" class="pn" onClick="$(\'#action\').val(\'recommend\');return(confirm(\'将问题设置为推荐将给会员增加相应的积分,确定设置吗?\'));">\
          <input type="submit" value="取消推荐" class="pn" onClick="$(\'#action\').val(\'unrecommend\');return(confirm(\'为保护会员权益,取消推荐将不再扣除原设置推荐所得会员积分,确定设置吗?\'));"></td>\
      </tr>\
    </form>\
    <tr>\
      <td colspan="7"><div>\
          <form action="KS.AskList.asp" name="myform" method="get">\
            <div style="border:1px dashed #cccccc;margin:3px;padding:4px"> &nbsp;<strong>快速搜索=></strong> &nbsp;关键字:\
              <input type="text"  name="keyword">\
              &nbsp;分类:\
              <select name="class">\
                <option value="">所有分类</option>\
                <option value="1" >新房置业</option>\
                <option value="7" >&nbsp;&nbsp;├ 楼盘咨询</option>\
                <option value="8" >&nbsp;&nbsp;├ 搜房卡</option>\
                <option value="9" >&nbsp;&nbsp;├ 商业贷款</option>\
                <option value="10" >&nbsp;&nbsp;├ 购房合同</option>\
                <option value="11" >&nbsp;&nbsp;├ 收房入住</option>\
                <option value="12" >&nbsp;&nbsp;├ 购房常识</option>\
                <option value="2" >二手房源</option>\
                <option value="14" >&nbsp;&nbsp;├ 房贷理财</option>\
                <option value="15" >&nbsp;&nbsp;├ 交易</option>\
                <option value="16" >&nbsp;&nbsp;├ 价格</option>\
                <option value="17" >&nbsp;&nbsp;├ 过户</option>\
                <option value="18" >&nbsp;&nbsp;├ 产权</option>\
                <option value="19" >&nbsp;&nbsp;├ 置业常识</option>\
                <option value="3" >房屋租赁</option>\
                <option value="20" >&nbsp;&nbsp;├ 求租</option>\
                <option value="21" >&nbsp;&nbsp;├ 出租</option>\
                <option value="22" >&nbsp;&nbsp;├ 合租</option>\
                <option value="23" >&nbsp;&nbsp;├ 租赁常识</option>\
                <option value="5" >业主生活</option>\
                <option value="30" >&nbsp;&nbsp;├ 教育科技</option>\
                <option value="31" >&nbsp;&nbsp;├ 运动爱好</option>\
                <option value="32" >&nbsp;&nbsp;├ 电脑网络</option>\
                <option value="33" >&nbsp;&nbsp;├ 社区团购</option>\
                <option value="38" >建材知识</option>\
                <option value="39" >&nbsp;&nbsp;├ 地板</option>\
                <option value="40" >&nbsp;&nbsp;├ 瓷砖石材</option>\
                <option value="41" >&nbsp;&nbsp;├ 木材板材</option>\
                <option value="42" >&nbsp;&nbsp;├ 门窗</option>\
                <option value="43" >&nbsp;&nbsp;├ 建筑陶瓷</option>\
                <option value="44" >&nbsp;&nbsp;├ 管线管材</option>\
                <option value="45" >&nbsp;&nbsp;├ 金属材质</option>\
                <option value="46" >&nbsp;&nbsp;├ 油漆涂料</option>\
                <option value="47" >&nbsp;&nbsp;├ 厨房卫浴</option>\
                <option value="48" >&nbsp;&nbsp;├ 五金配件</option>\
                <option value="49" >&nbsp;&nbsp;├ 防水防火</option>\
                <option value="50" >&nbsp;&nbsp;├ 水电</option>\
                <option value="51" >&nbsp;&nbsp;├ 采暖</option>\
                <option value="52" >&nbsp;&nbsp;├ 其他材料</option>\
                <option value="53" >&nbsp;&nbsp;├ 吊顶</option>\
                <option value="54" >&nbsp;&nbsp;├ 中央空调</option>\
                <option value="55" >家居用品</option>\
                <option value="56" >&nbsp;&nbsp;├ 家居布艺</option>\
                <option value="57" >&nbsp;&nbsp;├ 生活家电</option>\
                <option value="58" >&nbsp;&nbsp;├ 家居饰品</option>\
                <option value="59" >&nbsp;&nbsp;├ 灯具灯饰</option>\
                <option value="60" >&nbsp;&nbsp;├ 家居家具</option>\
                <option value="61" >&nbsp;&nbsp;├ 日常用品</option>\
                <option value="62" >装潢装修</option>\
                <option value="63" >&nbsp;&nbsp;├ 装修设计</option>\
                <option value="64" >&nbsp;&nbsp;├ 装潢公司</option>\
                <option value="65" >&nbsp;&nbsp;├ 设计师</option>\
                <option value="66" >&nbsp;&nbsp;├ 装修卖场</option>\
                <option value="67" >&nbsp;&nbsp;├ 装修预算</option>\
                <option value="68" >&nbsp;&nbsp;├ 合同签订</option>\
                <option value="69" >&nbsp;&nbsp;├ 施工现场</option>\
                <option value="70" >&nbsp;&nbsp;├ 监理验收</option>\
              </select>\
              &nbsp;\
              问题状态:\
              <select name="showmode">\
                <option value="0">全部</option>\
                <option value="1">待解决</option>\
                <option value="2">待解决</option>\
                <option value="3">有悬赏</option>\
                <option value="4">未审核</option>\
                <option value="5">已审核</option>\
              </select>\
              排序方式\
              <select name="orders">\
                <option value="TopicID Desc">最新提问</option>\
                <option value="LastPostTime Desc,TopicID Desc">最新回答</option>\
                <option value="Hits Desc,TopicID Desc">浏览次数最多</option>\
                <option value="Reward Desc,TopicID Desc">悬赏分最高</option>\
              </select>\
              <div style="padding-left:83px"> 提问者:\
                <input type="text" name="askName"  size="12">\
                回答者:\
                <input type="text" name="answerName"  size="12">\
                <input type="submit" value="开始搜索" class="pn" name="s1">\
              </div>\
            </div>\
          </form>\
        </div></td>\
    </tr>\
    <tr>\
      <td colspan="6" style="border:1px solid #f1f1f1;line-height:21px;padding-left:10px"><font color=red><strong>操作说明:</strong></font><br />\
        1.将问题设置为推荐将给会员增加相应的积分,会员所得积分在"问答参数设置"里设定<br />\
        2.为保护会员权益,取消推荐将不再扣除原设置推荐所得会员积分,一般建议一旦设置为推荐后就不要再取消推荐<br />\
        3.如果您将问题推荐后,然后取消推荐,又重新推荐可能导致多次给会员增加积分 </td>\
    </tr>\
    </table>'
    Tool.a01(html)
  }
}
fun.a01();