'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile     表示选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页  
       this.a02()
    },
    a02: function () {
        let data = [{
            action: "sqlite",
            database: "aliexpress",
            sql: "select count(1) as total FROM @.typebind",
        }, {
            action: "sqlite",
            database: "aliexpress",
            sql: "select " + Tool.fieldAs("time,type,dhType,c0_300,c300_1000,c1000_,dhTypePath") + " FROM @.typebind  order by @.time desc" + Tool.limit(30, obj.params.page),
        }]
        Tool.ajax.a01(data,this.a03, this);
    },
    a03: function (t) {
        let html = '',oo=t[1];
        for (let i = 0; i < oo.length; i++) {
            html += '<tr>\
                <td>'+ oo[i].type +'</td>\
                <td>'+ oo[i].dhType +'</td>\
                <td>'+ JSON.parse(oo[i].dhTypePath).join(" &gt; ") +'</td>\
                <td>'+ oo[i].c0_300 +'%</td>\
                <td>'+ oo[i].c300_1000 +'%</td>\
                <td>'+ oo[i].c1000_ +'%</td>\
                <td>'+ Tool.js_date_time2(oo[i].time) +'</td>\
            </tr>'
        }
        html = '\
        <header class="panel-heading">\
	        <div onclick="Tool.main(\'\')">【速卖通】类目</div>\
            <div class="active" onclick="Tool.main(\'?jsFile=js01\')">绑定到【敦煌网】类目</div>\
        </header>\
        <div class="p-2">\
          <table class="table table-hover">\
          <thead class="table-light">\
            <tr>\
              <th class="w200" style="padding-left: 30px;position: relative;">'+ this.b01() +'速卖通叶子类目ID</th>\
              <th class="w200" title="都是叶子类目">绑定到敦煌网叶子类目ID</th>\
              <th>绑定到敦煌网类路径</th>\
              <th title="订单金额：[0,300]">敦煌网佣金率A</th>\
              <th title="订单金额：[300,1000]">敦煌网佣金率B</th>\
              <th title="订单金额：[1000,]">敦煌网佣金率C</th>\
              <th class="w170">绑定时间</th>\
            </tr>\
          </thead>\
          <tbody>'+html+'</tbody>\
          </table>' + Tool.page(t[0][0].total, 30, obj.params.page) + '\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        return '\
        <ul class="dropdown-menu">\
			<li onClick="Tool.open4(\'js08\');"><a class="dropdown-item pointer">获取绑定到敦煌网类路径</a></li>\
			<li onClick="Tool.open4(\'js09\');"><a class="dropdown-item pointer">同步【敦煌网佣金率】</a></li>\
		</ul>\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>'
    }
}
fun.a01();