var fun =
{
  obj:
  {
    A1: 679, A2: 0
  },
  a01: function () {
    let html = Tool.header('正在【获取商品表中的品牌】...') + '\
    <div class="p-2">\
      <table class="table table-hover">\
        <tbody>\
        <tr><td class="right w150">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
        </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02, this, html);
  },
  a02: function () {
    let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '<r:pro db="sqlite.aliexpress" page=2 size="50">,<:brand tag=json/></r:pro>]'
    Tool.ajax.a01( str, this.obj.A1,this.a03, this);
  },
  a03: function (arr) {
    if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
    arr.shift();
    Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, arr);
  },
  a04: function (arr) {
    arr = Tool.unique(arr);
    let nArr = [], selectType = "";
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != "NoEnName_Null") {
        selectType = "select count(1) from @.brand where @.name=" + Tool.rpsql(arr[i])
        nArr.push('<if Fun(Db(sqlite.aliexpress,' + selectType + ',count))==0><r: db="sqlite.aliexpress">insert into @.brand(@.name,@.addtime)values(' + Tool.rpsql(arr[i]) + ',' + Tool.gettime("") + ')</r:></if>');
      }
    }
    $("#state").html("正在添加品牌。。。");
    Tool.ajax.a01('""' + nArr.join(""),1,this.a05,  this);
  },
  a05: function (t) {
    this.obj.A1++;
    this.a02();
  }
}
fun.a01();