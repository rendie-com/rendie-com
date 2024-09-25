var fun =
{
  obj:
  {
    A1: 1, A2: 0,bindname:"",
  },
  a01: function () {
    let html = Tool.header('正在【从品牌名称中获取信息】...') + '\
    <div class="p-2">\
      <table class="table table-hover">\
        <tbody>\
        <tr><td class="right w150">品牌进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
        </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02, this, html);
  },
  a02: function () {
    let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '<r:brand db="sqlite.aliexpress" size="1" page=2 where=" where @.uptime=0">,<:name tag=json/></r:brand>]'
    Tool.ajax.a01( str,1,this.a03, this);
  },
  a03: function (arr) {
    if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
    this.obj.bindname=arr[1]
    Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this);
  },
  a04: function () {
    if (this.obj.A1 == 1) {
      let url = "https://csp.aliexpress.com/apps/onboarding/brand/authorized_refactor?spm=5261.25514605.0.0.52324edfnPsc4T";
      $("#state").html("正在打开【申请品牌授权】页面。。。"+url);
      gg.tabs_remove_create_indexOf(2, url, 'aria-label="搜索"', true,this.a05, this)

    }
    else {
      this.a06("")
    }

  },
  a05: function (t) {
    $("#state").html("正在获取注入文件。。。");
    Tool.ajaxText("/view/Default/admin/js/速卖通/品牌/common_注入_获取商品表中的品牌.js", this.a06, this);
  },
  a06: function (t) {
    $("#state").html("正在填写品牌,再点搜索。。。");
    gg.tabs_executeScript_indexOf(2, null, t + '\nfun.a01("' + this.obj.bindname + '")', 'type="radio"<1/>您搜索的商标目前不在商标资质申请列表中',true, this.a07, this);
  },
  a07: function (t) { 
    if (t[0].indexOf('您搜索的商标目前不在商标资质申请列表中') != -1) {
      $("#state").html("您搜索的商标目前不在商标资质申请列表中")
      this.a08(["未知", "不在商标资质申请列表中","未知"])
    }
    else
    {
      let str = Tool.StrSplits(t[0], '<tr ', '</tr>')[0]
      let arr = str.split("</td>"), nArr = []
      //////////////////////////////
      arr[1] = arr[1].split('</span></div></div>')[0]
      let arr2 = arr[1].split(">")
      nArr.push(arr2[arr2.length-1])//这个是品牌名称，做为中文名存字段。
      /////////////////////////////////////
      for (var i = 2; i < arr.length - 1; i++)
      {
          nArr.push(Tool.removeHTMLCode(arr[i], "*"))
      }
      nArr[1] = nArr[1] ? nArr[1] : "未知"
      nArr[1] = nArr[1].length > 100 ? nArr[1].substr(0, 100) : nArr[1];
      nArr[2] = nArr[2] ? nArr[2] : "未知"
      this.a08(nArr);
    }
  },
  a08: function (arr) { 
    let str = '<r: db="sqlite.aliexpress">update @.brand set @.uptime=' + Tool.gettime("") +
      ',@.nameCn=' + Tool.rpsql(arr[0]) +
      ',@.company=' + Tool.rpsql(arr[1]) +
      ',@.location=' + Tool.rpsql(arr[2]) +
      ' where @.name=' + Tool.rpsql(this.obj.bindname) + '</r:>'
    $("#state").html("正在更新品牌。。。");
    Tool.ajax.a01(str, arr[0] =="未知",this.a09,  this, 1);
  },
  a09: function (t,isbool) { 
    if (isbool) {
      location.reload();
    }
    else {
      if (t == "") {
        $("#state").html("正在修改网页内容。。。");
        gg.tabs_executeScript_indexOf(2, null, 'fun.a02()', 'xxxxxxxxxx',true, this.a10, this);
      }
      else {
        alert("更新出错。。" + t)
      }
    }
      
       
  },
  a10: function (t) {
    this.obj.A1++;
    this.obj.bindname = false;
    this.a02()
  },
}
fun.a01();