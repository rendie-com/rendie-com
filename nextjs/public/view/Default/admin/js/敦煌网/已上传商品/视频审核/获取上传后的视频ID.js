'use strict';
var fun =
{
  obj:
  {
    A1: 1, A2: 0,
    B1: 1, B2: 0,
    where: "",
    username: "", password: "", fromid: 0
  },
  a01: function () {
    let html = Tool.header('正在【获取上传后的视频ID】...') + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
            <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
            <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">视频页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
            </tbody>\
            </table>\
        </div>'
    Tool.html(this.a02, this, html);
  },
  a02: function () {
    gg.isRD(this.a03, this);
  },
  a03: function () {
    Tool.getDHuser(this.a04, this);
  },
  a04: function () {
    $("#username").html(this.obj.username);
    Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
  },
  a05: function () {
    $("#state").html("正在验证登陆。。。");
    Tool.verifyUser.a01(this.a06, this);
  },
  a06: function () {
    let url = "https://seller.dhgate.com/merchant/video_list.do?dhpath=10001,93&pageNo=" + this.obj.B1 + "&pageSize=60"
    $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
    gg.getFetch(url,"json", this.a07, this)
  },
  a07: function (t) {
    let count = parseInt(Tool.StrSplits(t, "\n\t\t\t\t共有", "条记录")[0]);
    this.obj.B2 = Math.ceil(count / 60);
    let videoidArr = Tool.StrSplits(t, '<tr class="t-tbody" videoid="', '"')
    let nameArr = Tool.StrSplits(t, '<td class="t-body-item per30"><span>', '</span>');
    let fromidArr = Tool.StrSplits(t, 'class="t-body-item perc15">\n                                            <span>\n', '\n\n');
    if (videoidArr.length == nameArr.length && nameArr.length == fromidArr.length) {
      Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a08, this, this.a10, [videoidArr, nameArr, fromidArr]);
    }
    else {
      Tool.pre(["来源数据有问题", videoidArr.length + "----" + nameArr.length + "-----" + fromidArr.length])
    }
  },
  a08: function (arr) {
    let nArr = [];
    for (let i = 0; i < arr[2].length; i++) {
      if (arr[2][i].indexOf("\n") != -1) arr[2][i] = Tool.Trim(arr[2][i].split("\n")[1])

      nArr.push("update @.proupdhgate set @.video='{\"videoid\":\"" + arr[0][i] + "\",\"name\":\"" + arr[2][i] + "\"}' where @.fromid=" + arr[2][i]);
    }
    $("#state").html("正在修改视频信息。。。");
   Tool.ajax.a01( '""<r: db="sqlite.aliexpress">' + nArr.join("<1/>") + '</r:>',1,this.a09,this);
  },
  a09: function (t) {
    this.obj.B1++;
    this.a06();
  },
  a10: function (t) {
    this.obj.A1++;
    this.obj.B1 = 1;
    this.obj.B2 = 0;
    this.obj.username = ""
    this.obj.password = ""
    this.obj.fromid = 0
    $("#B1").css("width", "0%");
    $("#B1,#B2").html("");
    this.a03();
  }
}
fun.a01();