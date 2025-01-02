var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let html = Tool.header('敦煌网 &gt; 已上传商品 &gt; 商品 &gt 手动审核状态_归类【18.成人用品】') + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
		        <tr><td class="right w150">状态进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr></tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        //@.type2=200001508     表示成人用品
        let str = '[' + (this.obj.A1 == 1 ? '<@page/>' : 0) + '<r:pro db="sqlite.aliexpress" size=30 page=2 where=" where @.type2=200001508">,"<:proid/>"</r:pro>]'
        Tool.ajax.a01(str, this.obj.A1, this.a03, this)        
    },
    a03: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo[0]; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, oo);
    },
    a04: function (oo) {
        oo.shift();
        let str = '<r: db="sqlite.aliexpress">update @.proupdhgate set @.ManualReview=18 where @.proid in (\'' + oo.join("','") + '\')</r:>'
        Tool.ajax.a01('"ok"' + str, 1, this.a05, this)
    },
    a05: function (t) {
        if (t == "ok") {
            this.obj.A1++
            this.a02()
        }
        else {
            Tool.pre(["出错", t])
        }
    },
}
fun.a01();