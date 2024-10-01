var fun =
{
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页  
        this.a02();
    },
    a02: function () {
        let data = [{
            action: "${default_db}",
            database: "shopee/任务/定时任务",
            sql: "select count(1) as total FROM @.table",
        }, {
            action: "${default_db}",
            database: "shopee/任务/定时任务",
            sql: "select " + Tool.fieldAs("id,name,remark,runtime,nexttime,cycle,isenable,priority") + " FROM @.table order by @.isenable desc,@.priority asc" + Tool.limit(20, obj.params.page, "sqlite"),
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let html = '', arr = t[1]
        for (let i = 0; i < arr.length; i++) {
            html += '\
            <tr>\
                <td>' + arr[i].priority + '</td>\
                <td style="padding-left: 30px;position: relative;">'+ this.b02(arr[i].id) + '' + arr[i].name + '</td>\
                <td>' + arr[i].remark + '</td>\
                <td>'+ arr[i].cycle + ' 分钟</td>\
                <td>'+ Tool.js_date_time2(arr[i].runtime) + '</td>\
                <td>'+ Tool.js_date_time2(arr[i].nexttime) + '</td>\
                <td>'+ (arr[i].isenable ? '<font color="blue">已开启</font>' : '已关闭') + '</td>\
            </tr>'
        }
        html = Tool.header2(obj.params.jsFile) + '\
        <div class="p-2">\
            <table class="table table-hover align-middle center">\
                <thead class="table-light center">'+ this.b01() + '</thead>\
                <tbody>'+ html + '</tbody>\
            </table>' + Tool.page(t[0][0].total, 20, obj.params.page) + '\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        let str = '\
        <tr>\
            <th class="w70">优先级</th>\
            <th style="padding-left:25px;position: relative;" class="w350">'+ this.b03() + '任务名称</th>\
            <th>任务说明</th>\
            <th>执行周期</th>\
            <th>运行时时间</th>\
            <th>下次运行时间</th>\
            <th>状态</th>\
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
            <li onClick="Tool.openR(\'?jsFile=js02\');"><a class="dropdown-item pointer">*启动定时任务</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js05&table=task&database=shopee&newdatabase=shopee/任务/定时任务\');"><a class="dropdown-item pointer">把旧表复制到新表</a></li>\
		</ul>'
    },
    c01: function () {
        let data = [{
            action: "sqlite",
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
                action: "sqlite",
                database: "shopee/任务/定时任务",
                sql: "delete from @.table where @.id=" + id,
            }]
            Tool.ajax.a01(data, this.c02, this)
        }
    },
    c04: function (id) {
        let data = [{
            action: "sqlite",
            database: "shopee/任务/定时任务",
            sql: "update @.table set @.nexttime=0 where @.id=" + id,
        }]
        Tool.ajax.a01(data, this.c02, this)
    },
}
fun.a01();