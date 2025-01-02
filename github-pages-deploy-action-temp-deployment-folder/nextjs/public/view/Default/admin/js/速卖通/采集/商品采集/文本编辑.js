'use strict';
var fun =
{
    a01: function () {
        //obj.arr[4]---返回url
        //obj.arr[5]---商品ID
        this.a02();
    },
    a02: function () {
        let str = '\
		{\
		<r:gather db="sqlite.aliexpress" size=1 where=" where @.id='+ obj.arr[5] + '">\
			"sort":<:sort/>,\
			"name":"<:name/>",\
			"note":"<:note/>",\
			"code":<:code tag=0/>\
		</r:gather>\
		}'
       Tool.ajax.a01( str,1,this.a03,this)
    },
    a03: function (oo) {
        let html = Tool.header('文本编辑')+'\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
            <tr>\
                <td class="right w150">排序：</td>\
                <td><input type="text" value="'+ oo.sort +'" id="sort" class="form-control w100 center"/></td>\
            </tr>\
            <tr>\
                <td class="right">采集配置信息说明：</td>\
                <td><input type="text" value="'+ oo.note +'" id="note" class="form-control"/></td>\
            </tr>\
            <tr>\
                <td class="right">采集类目说明：</td>\
                <td><input type="text" value="'+ oo.name +'" id="name" class="form-control"/></td>\
            </tr>\
            <tr>\
                <td class="right">配置代码：</td>\
                <td><textarea rows="25" cols="70" id="code" class="form-control">'+ JSON.stringify(oo.code, null, 2) +'</textarea></td>\
            </tr>\
            <tr>\
                <td></td><td><button type="button" class="btn btn-secondary" onclick="fun.c01('+ obj.arr[5] + ')">确定保存</button></td>\
            </tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(null, this, html)
    },
    c01: function (id) {
        let oo, sort = $("#sort").val(), note = $("#note").val(), name = $("#name").val(), code = $("#code").val();
        try {
            eval("oo=" + code)
            let sql = "update @.gather set @.sort=" + sort + ",@.note=" + Tool.rpsql(note) + ",@.name=" + Tool.rpsql(name) + ",@.code=" + Tool.rpsql(JSON.stringify(oo)) + " where @.id=" + id + ""
            let str = '<r: db="sqlite.aliexpress">' + sql + '</r:>'
            Tool.ajax.a01(str,1,Tool.reload)
        }
        catch (err) {
            Tool.at("JSON语法错误：" + err.message);
        }
    }
    
}
fun.a01();