var fun =
{
    obj:
    {
        A1: 1, A2: 0, Aobj: {},
        B1: 1, B2: 0, Barr: [],
        seller: {},
        runtime: 0,//运行时时间
        stop: false,
    },
    a01: function () {
        //obj.params.jsFile         选择JS文件
        //obj.params.return         返回URL
        this.obj.runtime = Tool.gettime("")
        this.a02();
    },
    a02: function () {
        let html = Tool.header(obj.params.return, "Shopee &gt; 任务 &gt; 定时任务 &gt; 启动定时任务") + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
		        <tr><td class="right w200">运行时时间：</td><td colspan="2">'+ Tool.js_date_time2(this.obj.runtime) + '</td></tr>\
		        <tr><td class="right">已运行时长：</td><td id="time" colspan="2"></td></tr>\
		        <tr><td class="right">用户名：</td><td id="username" colspan="2"></td></tr>\
		        <tr><td class="right">执行周期：</td><td id="runcycle" colspan="2"></td></tr>\
		        <tr><td class="right">任务名称：</td><td id="taskname" colspan="2"></td></tr>\
		        <tr><td class="right">任务说明：</td><td id="remark" colspan="2"></td></tr>\
		        <tr><td class="right">任务进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">站点：</td><td id="site" colspan="2"></td></tr>\
		        <tr><td class="right">站点进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            <tbody id="tbody"></tbody>\
            </table>\
        </div>'
        Tool.html(this.a03, this, html);
    },
    a03: function () {
        this.c01()//已运行时长
        Tool.login.a01(this.a04, this);
    },
    a04: function (t) {
        this.obj.seller = t;
        let arr = []
        for (let k in t) {
            if (k != "SPC_CDS") {
                arr.push(k)
            }
        }
        this.obj.Barr = arr;
        this.obj.B2 = arr.length;
        this.d01()
    },
    //////////////////////////////////////
    c01: function () {
        if (!this.obj.stop) {
            Tool.Time("name", 1000, this.c02, this);
        }
    },
    c02: function () {
        $("#time").html(Tool.dateDHM(false, this.obj.runtime * 1000, "s"))
        this.c01();
    },
    /////////////////////////////
    d01: function () {
        $("#state").html("正在获取任务信息。。。");
        let where = "where @.nexttime<" + this.obj.runtime + " and @.isenable=1 and @.runuser=\'" + Tool.getStorage("username") + "\'"
        let data = [{
            action: "${default_db}",
            database: "shopee/任务/定时任务",
            sql: "select " + Tool.fieldAs("jsfile,taskname,id,runcycle,remark") + " FROM @.table " + where + " order by @.priority asc limit 1",
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "${default_db}",
                database: "shopee/任务/定时任务",
                sql: "select count(1) as total FROM @.table " + where,
            })
        }
        Tool.ajax.a01(data, this.d02, this);
    },
    d02: function (t) {
        if (this.obj.A2 == 0) this.obj.A2 = t[1][0].total
        this.obj.Aobj = t[0][0]
        this.d03()
    },
    d03: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d04, this, this.f03)
    },
    d04: function () {
        let oo = this.obj.Aobj
        $("#taskname").html(oo.taskname);
        $("#remark").html(oo.remark);
        $("#runcycle").html(oo.runcycle + " 分钟");
        Tool.jsArr(JSON.parse(oo.jsfile), this.e01, this);
    },
    /////////////////////////////////////////
    e01: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.e02, this, this.f01)
    },
    e02: function () {
        let site = this.obj.Barr[this.obj.B1 - 1]
        $("#site").html(Tool.site(site))
        task.a01(this.obj.seller, site, this.e03, this)
    },
    e03: function () {
        this.obj.B1++;
        this.e01();
    },
    f01: function () {
        let oo = this.obj.Aobj
        let data = [{
            action: "${default_db}",
            database: "shopee/任务/定时任务",
            sql: "update @.table set @.runtime=" + this.obj.runtime + ",@.nexttime=" + (this.obj.runtime + oo.runcycle * 60) + " where @.id=" + oo.id,
        }]
        Tool.ajax.a01(data, this.f02, this);
    },
    f02: function (t) {
        if (t[0].length == 0) {
            this.obj.B1 = 1;
            $("#B1").css("width", "0%"); $("#B1,#B2,#site").html("");
            this.obj.A1++;
            this.d01();
        }
        else {
            Tool.pre(["出错2024.12.21-16:03", t])
        }
    },
    f03: function () {
        this.obj.stop = true;
        $("#state").html("已完成所有任务。")
        frameElement._DialogArguments.$("title").html("已完成所有任务。")
    },
}
fun.a01();