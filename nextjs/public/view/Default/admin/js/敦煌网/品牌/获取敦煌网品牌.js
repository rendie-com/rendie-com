var fun =
  {
    obj:
    {
      A1: 1, A2: 0,
      B1: 1, B2: 0,
      where: " where @.sort=1",//只要一条就行了。
      username: "", password: "", fromid: 0
    },
    a01: function () {
      let html = Tool.header('正在【获取敦煌网品牌】...') + '\
    <div class="p-2">\
      <table class="table table-hover">\
        <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
        <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right">品牌页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
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
      let url = "https://seller.dhgate.com/syi/searchValidBrand.do?isblank=true"
      $("#url").html(url + '【post】');
      let arr = []
      arr.push("brandNameIndexCase=")
      arr.push("catePubId=024023002004")
      arr.push("pageNo=" + this.obj.B1)
      arr.push("pageSize=20")
      gg.postFetch(url, arr.join("&"), this.a07, this)
    },
    a07: function (t) {
      let count = parseInt(Tool.StrSplits(t, "<span>\n\t\t\t\t共有", "条记录")[0]);
      this.obj.B2 = Math.ceil(count / 20);
      let nameArr = Tool.StrSplits(t, "<span title=\"", "\">")
      nameArr = Tool.unique(nameArr);
      Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a08, this, this.a10, nameArr);
    },
    a08: function (arr) {      
      let nArr = [], selectType = "";
      for (let i = 0; i < arr.length; i++) {
        selectType = "select count(1) from @.brand where @.name=" + Tool.rpsql(arr[i])
        nArr.push('<if Fun(Db(sqlite.dhgate,' + selectType + ',count))==0><r: db="sqlite.dhgate">insert into @.brand(@.name,@.addtime)values(' + Tool.rpsql(arr[i]) + ',' + Tool.gettime("") + ')</r:></if>');
      }
      $("#state").html("正在添加品牌。。。");
     Tool.ajax.a01( '""' + nArr.join(""),1,this.a09,this);
    },
    a09: function (t) {
      this.obj.B1++;
      this.a06();
    },
    a10: function () {
      this.obj.A1++;
      this.a03();
    }
  }.a01();