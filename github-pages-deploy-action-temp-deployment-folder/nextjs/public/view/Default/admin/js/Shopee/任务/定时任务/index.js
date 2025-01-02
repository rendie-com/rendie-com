var fun =
{
    obj: {
        DEFAULT_DB: "",
    },
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页  
        this.a02();
    },
    a02: function () {
        let data = [{
            action: "process",
            fun: "env",
            name: "NEXTJS_CONFIG_DEFAULT_DB"
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        this.obj.DEFAULT_DB = t[0];
        let sessionObj = {}
        let str = sessionStorage.getItem(window.location.pathname + obj.params.jsFile)
        if (str) sessionObj = JSON.parse(str)
        Tool.ajax.a01(this.b04(t[0], sessionObj[obj.params.page]), this.a04, this, sessionObj);
    },
    a04: function (t, sessionObj) {
        let html = '', arr = Tool.getArr(t[0], this.obj.DEFAULT_DB);
        for (let i = 0; i < arr.length; i++) {
            html += '\
            <tr>\
                <td>' + arr[i].priority + '</td>\
                <td>'+ (arr[i].isenable ? '<font color="blue">已开启</font>' : '已关闭') + '</td>\
                <td style="padding-left: 30px;position: relative;" class="left">'+ this.b02(arr[i].id)  + arr[i].taskname + '</td>\
                <td>'+ arr[i].runuser + ' </td>\
                <td>'+ arr[i].runcycle + ' 分钟</td>\
                <td>'+ Tool.js_date_time2(arr[i].runtime) + '</td>\
                <td>'+ Tool.js_date_time2(arr[i].nexttime) + '</td>\
            </tr>'
        }
        html = Tool.header2(obj.params.jsFile) + '\
        <div class="p-2">\
            <table class="table table-hover align-middle center">\
                <thead class="table-light center">'+ this.b01() + '</thead>\
                <tbody>'+ html + '</tbody>\
            </table>' + Tool.page(t[1][0].Count, 20, obj.params.page) + '\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        let str = '\
        <tr>\
            <th class="w70">优先级</th>\
            <th class="w70">状态</th>\
            <th style="padding-left:25px;position: relative;" class="left">'+ this.b03() + '任务名称</th>\
            <th>执行者用户名</th>\
            <th class="w120">执行周期</th>\
            <th class="w170">运行时时间</th>\
            <th class="w170">下次运行时间</th>\
        </tr>'
        return str
    },
    b02: function (id) {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu" aria-labelledby="dropdown0">\
			<li><a class="dropdown-item pointer" onClick="Tool.openR(\'?jsFile=js01&id='+ id + '\')">修改</a></li>\
			<li onClick="fun.c03('+ id + ')"><a class="dropdown-item pointer">删除</a></li>\
			<li onClick="fun.c04('+ id + ')"><a class="dropdown-item pointer">【下次运行时间】归零</a></li>\
		</ul>'
    },
    b03: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
            <li onClick="fun.c01();"><a class="dropdown-item pointer">添加任务</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js03&table=table&database=shopee/任务/定时任务&toaction=pg01\');"><a class="dropdown-item pointer">*把【sqlite】数据库该表同步到【PostgreSQL】【pg01】数据库</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js03&table=table&database=shopee/任务/定时任务&toaction=pg02\');"><a class="dropdown-item pointer">*把【sqlite】数据库该表同步到【PostgreSQL】【pg02】数据库</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js03&table=table&database=shopee/任务/定时任务&toaction=pg03\');"><a class="dropdown-item pointer">*把【sqlite】数据库该表同步到【PostgreSQL】【pg03】数据库</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js03&table=table&database=shopee/任务/定时任务&toaction=dynamodb\');"><a class="dropdown-item pointer">*把【sqlite】数据库该表同步到【DynamoDB】数据库</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js02\');"><a class="dropdown-item pointer">*启动定时任务</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js05&table=task&database=shopee&newdatabase=shopee/任务/定时任务\');"><a class="dropdown-item pointer">把一个db文件拆分成多个db文件</a></li>\
		</ul>'
    },
    b04: function (DEFAULT_DB, ExclusiveStartKey) {
        let data = [], size = 20
        if (DEFAULT_DB == "dynamodb") {
            data = this.b05(size, DEFAULT_DB, ExclusiveStartKey)
        }
        else {
            data = [{
                action: DEFAULT_DB,
                database: "shopee/任务/定时任务",
                sql: "select " + Tool.fieldAs("id,taskname,runuser,runtime,nexttime,runcycle,isenable,priority") + " FROM @.table" + Tool.limit(size, obj.params.page, this.obj.DEFAULT_DB),//order by @.isenable desc,@.priority asc
            }]
            if (obj.params.page == 1) {
                data.push({
                    action: DEFAULT_DB,
                    database: "shopee/任务/定时任务",
                    sql: "select count(1) as Count FROM @.table",
                })
            }
        }
        return data;
    },
    b05: function (size, DEFAULT_DB, ExclusiveStartKey) {
        let TableName = Tool.getChinaAscii('shopee_任务_定时任务_table')
        let params = {
            ProjectionExpression: 'id,taskname,runtime,nexttime,runcycle,isenable,priority', // 只获取这些字段
            Limit: size, // 每页项目数上限
            TableName: TableName,
        }
        if (ExclusiveStartKey && obj.params.page != 1) {//翻页
            params.ExclusiveStartKey = ExclusiveStartKey;
        }
        let data = [{
            action: DEFAULT_DB,
            fun: "scan",
            params: params,
        }]
        /////////////////////////////////////////////
        if (obj.params.page == 1) {
            data.push({
                action: DEFAULT_DB,
                fun: "scan",
                params: {
                    TableName: TableName,
                    Select: 'COUNT' // 请求只返回项目总数
                }
            })
        }
        return data;
    },
    ///////////////////////////////////////////////
    c01: function () {
        let data = [{
            action: this.obj.DEFAULT_DB,
            database: "shopee/任务/定时任务",
            sql: "INSERT into @.table(@.addtime)VALUES(" + Tool.gettime("") + ")",
        }]
        Tool.ajax.a01(data, this.c02, this)
    },
    c02: function (t) {
        if (t[0].length == 0) {
            location.reload();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    c03: function (id) {
        if (confirm('确定删除该任务吗?')) {
            let data = [{
                action: this.obj.DEFAULT_DB,
                database: "shopee/任务/定时任务",
                sql: "delete from @.table where @.id=" + id,
            }]
            Tool.ajax.a01(data, this.c02, this)
        }
    },
    c04: function (id) {
        let data = [{
            action: this.obj.DEFAULT_DB,
            database: "shopee/任务/定时任务",
            sql: "update @.table set @.nexttime=0 where @.id=" + id,
        }]
        Tool.ajax.a01(data, this.c02, this)
    },
}
fun.a01();