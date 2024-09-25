'use strict';
var fun=
{
  obj:
  {
    A1: 0, A2: 0,
    B1: 1, B2: 0,
    C1: 1, C2: 0, Carr: [],
    where: "",
    username: "", password: "", fromid: 0
  },
  a01: function () {
    this.obj.A1 = obj.arr[5] ? Tool.int(obj.arr[5]) : 1;//账号进度
    let html = Tool.header('正在获取【知识产权投诉】。。。') + '\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
        <tr><td class="right w150">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right">页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
        <tr><td class="right">条进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
        <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02, this, html);
  },
  a02: function () {
    gg.isRD(this.a03, this);
  },
  a03: function () {
    Tool.getDHuser(this.a04, this);//获得账号等信息
  },
  a04: function () {
    $("#username").html(this.obj.username);
    Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
  },
  a05: function () {
    $("#state").html("正在确认登陆。。。");
    Tool.verifyUser.a01(this.a06, this)
  },
  a06: function () {
    let url = "https://seller.dhgate.com/sellerbrand/beComplained/list.do?dhpath=10001,70,7002&page=" + this.obj.B1;
    $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
    gg.getFetch(url,"json",this.a07,this)
  },
  a07: function (t) {
    if (t.indexOf("Sorry, there is no records about you") == -1) {
      let rcount = Tool.Trim(Tool.StrSlice(t, '				共有', '条记录'));
      this.obj.B2 = Math.ceil(parseInt(rcount) / 10)
      this.a08(t);
    }
    else {
      this.a16();
    }
    
  },
  a08: function (t) {
    Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a09, this, this.a16,t)
  },
  a09: function (t) {
    let arr = Tool.StrSplits(t, '<tr class="tr-border">', '</tr>')
    let createTime = [],//投诉日期
      itemcode = [],//产品编号
      reportCompanyName = [],//投诉人
      email = [],
      intelRightName = [],//知识产权名称
      complainStatus = [],//投诉状态（2：等待被投诉方处理；3:等待投诉方处理;4等待DHgate裁决；5：投诉完结）
      complainResult = [], //投诉结果（4：投诉成功；7：投诉失败）
      reportid = [];//被投诉ID
    for (let i = 0; i < arr.length; i++) {
      let arr2 = arr[i].split("</td>"),time=arr2[0].split(">")[1]
      if (Tool.Trim(time) == "") { time = 0; } else { time = Tool.gettime(time) }
      createTime.push(time);
      itemcode.push(Tool.StrSlice(arr2[1], "openItemLink('", "'"));
      reportCompanyName.push(arr2[2].split(">")[1])
      email.push(arr2[3].split(">")[1]);
      intelRightName.push(arr2[4].split(">")[1]);
      complainStatus.push(Tool.Trim(arr2[5].split(">")[1]));
      complainResult.push(Tool.Trim(arr2[6].split(">")[1]));
      reportid.push(Tool.StrSlice(arr2[7], "reportid=", "&"));
    }
    this.obj.Carr = [createTime, itemcode, reportCompanyName, email, intelRightName, complainStatus, complainResult, reportid];
    this.obj.C2 = itemcode.length;
    this.a10()
  },
  a10: function () {
    Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a11, this, this.a15)
 },
  a11: function () {
    let url = "https://seller.dhgate.com/sellerbrand/beComplained/viewreport.do?reportid=" + this.obj.Carr[7][this.obj.C1 - 1] + "&itemcode=" + this.obj.Carr[1][this.obj.C1 - 1] +"&from=seller&dhpath=10001,70,7002";
    $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
    $("#state").html("正在获取详情。。。");
    gg.getFetch(url,"json", this.a12, this)
  },
  a12: function (t) {
    let Carr = this.obj.Carr
    let sql = {
      createTime: Carr[0][this.obj.C1 - 1],
      itemcode: Carr[1][this.obj.C1 - 1],
      reportCompanyName: Tool.rpsql(Carr[2][this.obj.C1 - 1]),
      email: Tool.rpsql(Carr[3][this.obj.C1 - 1]),
      intelRightName: Tool.rpsql(Carr[4][this.obj.C1 - 1]),
      complainStatus: this.b01(Carr[5][this.obj.C1 - 1]),
      complainResult: this.b02(Carr[6][this.obj.C1 - 1]),
      reportid: Carr[7][this.obj.C1 - 1],
      sellerID: this.obj.fromid,
      sellerUser:Tool.rpsql(this.obj.username)
    };
    let completeTime = Tool.StrSlice(t, "完成时间：", "</span>  <br/>")//完成时间
    sql.completeTime = Tool.gettime(Tool.Trim(completeTime.split("<span>")[1]))//完成时间
    let ProcessedBy = Tool.StrSlice(t, "投诉人：</td>", "</td>")//投诉人
    sql.ProcessedBy = Tool.rpsql(Tool.Trim(ProcessedBy.split("<td>")[1]))//投诉人

    sql.reason = Tool.rpsql(Tool.StrSlice(t, "裁决原因： </span>\n                        <span>", "</span>\n                    </td>"))//裁决原因
    let ReasonComplaint = Tool.StrSlice(t, "投诉原因：</td>", "</td>\n\t</tr>")//投诉原因
    sql.ReasonComplaint = Tool.rpsql(Tool.Trim(ReasonComplaint.split("-->\n\t\t<td >")[1].replace(/\t/g, "").replace(/  +/g, " ")))//投诉原因
    let PropertyType = Tool.rpsql(Tool.Trim(Tool.StrSlice(t, "知识产权类型：</td>\n\t\t<td>", "</td>")))//知识产权类型
    if (PropertyType == "null") PropertyType = "'未知'";
    sql.PropertyType = PropertyType;
    sql.PlaceRegistration = Tool.rpsql(Tool.Trim(Tool.StrSlice(t, "注册地：</td>\n\t\t<td>", "</td>")))//注册地
    sql.PropertyNumber = Tool.rpsql(Tool.Trim(Tool.StrSlice(t, "知识产权编号：</td>\n\t\t<td>", "</td>")))//知识产权编号
    let PropertyProveStr = Tool.Trim(Tool.StrSlice(t, "知识产权证明：</td>\n        <td>", "</td>"))//知识产权证明
    sql.PropertyProveName = Tool.rpsql(Tool.Trim(Tool.StrSlice(PropertyProveStr, ">", "<")))//知识产权证明(名称)
    sql.PropertyProveUrl = Tool.rpsql(Tool.Trim(Tool.StrSlice(PropertyProveStr, "<a href=\"", "\"")))//知识产权证明(地址)
    let authorizationProveStr = Tool.Trim(Tool.StrSlice(t, "授权证明：</td>\n        <td>", "</td>"))//授权证明
    if (authorizationProveStr == "") {
      sql.authorizationProveName = "''";
      sql.authorizationProveUrl = "''";
    }
    else {
      sql.authorizationProveName = Tool.rpsql(Tool.Trim(Tool.StrSlice(authorizationProveStr, ">", "<")))//授权证明(名称)
      sql.authorizationProveUrl = Tool.rpsql(Tool.Trim(Tool.StrSlice(authorizationProveStr, "<a href=\"", "\"")))//授权证明(地址)
    }
    let otherProveStr = Tool.Trim(Tool.StrSlice(t, "其他文件：</td>\n        <td>", "</td>"))//其他文件
    if (otherProveStr == "") {
      sql.otherProveName = "''";
      sql.otherProveUrl = "''";
    }
    else {
      sql.otherProveName = Tool.rpsql(Tool.Trim(Tool.StrSlice(otherProveStr, ">", "<")))//其他文件(名称)
      sql.otherProveUrl = Tool.rpsql(Tool.Trim(Tool.StrSlice(otherProveStr, "<a href=\"", "\"")))//其他文件(地址)

    }
    sql.otherEmail = Tool.rpsql(Tool.Trim(Tool.StrSlice(t, "联系邮箱：</td>\n\t\t<td>", "</td>")))//其它投诉信息(联系邮箱)
    sql.otherPhone = Tool.rpsql(Tool.Trim(Tool.StrSlice(t, "联系电话：</td>\n\t\t<td>", "</td>")))//其它投诉信息(联系电话)
    this.a13(sql)
  },
  a13: function (sql) {
    let arrA = [], arrB = [];
    for (let k in sql) {
      arrA.push(k)
      arrB.push(sql[k]);
    }
    let str='\
		<if Fun(Db("sqlite.dhgate","select count(1) from @.beComplained where @.itemcode='+ sql.itemcode + '","count"))==0>\
			<r: db="sqlite.dhgate">insert into @.beComplained(@.'+ arrA.join(",@.")+')values('+arrB.join(",")+')</r:>\
		</if>';
   Tool.ajax.a01( str,1,this.a14,this);
  },
  a14: function (t) {
    if (Tool.Trim(t) == "") {
      this.obj.C1++;
      this.a10();
    }
    else {
      Tool.at("出错"+t)
    }
  },
  a15: function () {
    this.obj.B1++;
    this.obj.C1 = 1;
    this.obj.C2 = 0;
    this.obj.Carr = [];
    $("#C1").css("width", "0%");
    $("#C1,C2").html("");
    this.a06();
  },
  a16: function () {
    this.obj.A1++;
    this.obj.B1 = 1
    this.obj.B2 = 0
    $("#B1").css("width", "0%");
    $("#B1,#B2").html("")
    $("#state").html("正在准备下一个账号...");
    this.obj.C1 = 1;
    this.obj.C2 = 0;
    this.obj.Carr = [];
    $("#C1").css("width", "0%");
    $("#C1,C2").html("");
    this.obj.username=""
    this.obj.password=""
    this.obj.fromid = 0;
    Tool.main(obj.arr[3] + "/" + obj.arr[4] + "/" +this.obj.A1)
  },
  b01: function (complainStatus) {
    //投诉状态（2：等待被投诉方处理；3:等待投诉方处理;4等待DHgate裁决；5：投诉完结）
    let num = 0;
    if (complainStatus == "投诉完结") {
      num = 5;
    }
    return num;
  },
  b02: function (complainResult) {
    //投诉结果（4：投诉成功；7：投诉失败）
    let num = 0;
    if (complainResult == "投诉成立,产品已处理") {
      num = 4;
    }
    else if (complainResult == "投诉不成立，产品正常") {
      num = 7;
    }
    return num;
  },

  //<r: db="sqlite.dhgate">update @.beComplained set @.complainResult='+ this.b02(complainResult[i]) +' where @.itemcode='+ itemcode[i] + '</r:>
}
fun.a01();