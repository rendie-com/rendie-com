'use strict';
var fun =
{
    a01: function () {
        let str = '\
		[0\
			<r:weblog_os size=30 where=" order by @.count desc">,\
			{\
				"count":<:count/>,\
				"os":"<:os/>"\
			}\
			</r:weblog_os>\
		]'
        Tool.ajax.a01(str, 1, this.a02, this)
    },
    a02: function (oo) {
        let arr = this.b01(oo)
        let html = '\
        <header class="panel-heading">\
          <div onclick="Tool.main(\''+ obj.arr[2] + '\')">访问日志</div>\
          <div onclick="Tool.main(\'js03\')" class="active">操作系统占比</div>\
        </header>\
		    <div class="p-2">\
          <table class="table align-top">\
				    <tbody>\
				    <tr>\
					    <td id="pie-donutContainer"></td>\
					    <td class="w-25 p-0">'+ arr[0] + '</td>\
				    </tr>\
				    </tbody>\
          </table>\
        </div>'
        Tool.html(this.a03, this, html, arr[1])
    },
    a03: function (oo) {
        let op = {
            series:
            {
                pie:
                {
                    show: true,
                    radius: 720,
                    innerRadius: 0.5,
                    label:
                    {
                        show: true,
                        radius: 1,
                        threshold: 0.01,
                        formatter: function (label, series) {
                            return '<div style="font-size:8px;text-align:center;padding:2px 20px 2px 5px;color:white;">' + label + '<br/><b>' + Math.round(series.percent) + '%</b></div>';
                        },
                        background: { opacity: 0.5, color: '#000' }
                    }
                }
            },
            legend: { show: false },
            grid: { hoverable: true },
            tooltip: true,
            tooltipOpts:
            {
                defaultTheme: false,
                content: "占比：%p.0%<br/>国家：%s"
            }
        }
        if (oo[0]) { $.plot($("#pie-donutContainer"), oo, op); }
    },
    b01: function (arr) {
        let html = '\
		<table class="table center table-hover mb-0">\
		<thead class="table-light">\
			<tr>\
				<th class="w60" style="padding-left: 30px;position: relative;">\
					<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
					<ul class="dropdown-menu">\
						<li onClick="Tool.open5(\'js04\',\'weblog\')"><a class="dropdown-item pointer">获取新的操作系统</a></li>\
						<li onClick="Tool.open5(\'js05\',\'weblog\')"><a class="dropdown-item pointer">统计操作系统的访问次数</a></li>\
					</ul>编号\
				</th>\
				<th>操作系统</th><th>访问次数</th><th>占比</th></tr>\
		</thead>\
		<tbody>'
        if (arr.length == 31) { alert("操作系统有30个，会益出，请与管理员联系。"); }
        let data = [], count = 0, count2 = 0;
        for (let i = 1; i < arr.length; i++) { count += arr[i].count }
        for (let i = 1; i < arr.length; i++) {
            if (count) { count2 = ((arr[i].count / count) * 100).toFixed(); }
            html += '<tr><td>' + i + '</td><td>' + arr[i].os + '</td><td>' + arr[i].count + '</td><td>' + count2 + ' %</td></tr>'
            data.push({ label: arr[i].os, data: arr[i].count });
        }
        return [html + "</tbody></table>", data];
    },
}
fun.a01()