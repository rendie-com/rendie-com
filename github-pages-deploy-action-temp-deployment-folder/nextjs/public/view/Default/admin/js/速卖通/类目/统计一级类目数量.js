var fun =
{
    obj: { A1: 1, A2: 0, Aarr: [] },
    a01: function () {
        let html = Tool.header('正在统计一级类目数量...') + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
		    <tr><td class="right w150">类目进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr></tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let str = '[0<r:type db="sqlite.aliexpress" where=" where @.upid=0 order by @.sort desc" size=50>,<:fromID/></r:type>]'
        Tool.ajax.a01(str, 1, this.a03, this);
    },
    a03: function (arr) {
        arr.shift();
        this.obj.Aarr = arr;
        this.obj.A2 = arr.length;
        this.a04();
    },
    a04: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this)
    },
    a05: function () {
        let html = '[\
		<r:pro size=1 where=" where @.type1='+ this.obj.Aarr[this.obj.A1 - 1] + ' and @.hide=0 and @.isUpDHgate=0" db="sqlite.aliexpress">\
		    <:count(1)/>,\
		</r:pro>\
		<r:pro size=1 where=" where @.type1='+ this.obj.Aarr[this.obj.A1 - 1] + ' and @.isUpDHgate=1" db="sqlite.aliexpress">\
		    <:count(1)/>\
		</r:pro>\
		]'
        $("#state").html("正在统计数量");
        Tool.ajax.a01(html, 1, this.a06, this);
    },
    a06: function (arr) {
        //count1   可以上传
        //count3   已上传
        let str = '""<r: db="sqlite.aliexpress">update @.type set @.count1=' + arr[0] + ',@.count3=' + arr[1] + ' where @.fromid=' + this.obj.Aarr[this.obj.A1 - 1] + '</r:>'
        Tool.ajax.a01(str, 1, this.a07, this);
    },
    a07: function (t) {
        if (t == "") {
            $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（完）');
            this.obj.A1++;
            this.a04();
        }
        else { Tool.pre(["出错", t]) }
    }
}
fun.a01();