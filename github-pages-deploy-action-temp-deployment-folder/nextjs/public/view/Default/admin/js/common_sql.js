'use strict';
Object.assign(Tool, {
    RunTime: {
        data: [],//会从Tool.ajax.a01中传值过来
        a01: function () {
            if ($("#table3").length) {
                if ($("#table3").is(":hidden")) {
                    $("#table2").hide();
                    $("#table3").show();
                }
                else {
                    $("#table2").show();
                    $("#table3").hide();
                }
            }
            else {
                $("#table2").after('<section class="m-2 shadow bg-white rounded" id="table3"></section>');
                this.a02();
            }
        },
        a02: function () {
            $("#table3").html('<header class="panel-heading"><a href="javascript:;" onclick="Tool.RunTime.a01()" class="arrow_back"></a>该页用时轨迹 <img src="/' + o.path + '/admin/img/loading.gif" height="20"></header>');
            this.a03(this.data)
        },
        a03: function (arr) {
            let html = '', num = 0, total = 0;
            let arr2 = [], arr0_0 = 0;
            //而1毫秒=10000ticks；所以1ticks=100纳秒=0.1微秒
            for (let i = 0; i < arr.length; i++) {
                arr2 = arr[i]
                //arr2[0]		运行前时间
                //arr2[1]		运行后时间
                //arr2[2]		数据库
                //arr2[3]		类型
                //arr2[4]		执行的内容                
                let arr2_0 = parseInt(arr2[0] / 10);
                if (i == 0) { arr0_0 = arr2_0; }//只要第一行，第一个。
                let arr2_1 = parseInt(arr2[1] / 10);
                if (arr2[3].indexOf(">") != -1) { arr2[3] = arr2[3].replace(/>/g, "&gt;"); }
                if (arr2[3].indexOf("<") != -1) { arr2[3] = arr2[3].replace(/</g, "&lt;"); }
                if (arr2[2] == "开始计时") {
                    html += '\
				    <thead class="table-light">\
                    <tr>\
					    <th>' + (i + 1) + '</th>\
					    '+ this.b01(arr2_0 - arr0_0 - num, "th")
                        + this.b01(arr2_1 - arr2_0, "th")
                        + this.b01(arr2_1 - arr0_0, "th") + '\
					    <th>' + arr2[2] + '</th>\
					    <th class="left">' + arr2[3] + '</th>\
				    </tr>\
                    </thead>'
                }
                else {
                    html += '\
				    <tr>\
					    <td>' + (i + 1) + '</td>\
					    '+ this.b01(arr2_0 - arr0_0 - num, "td")
                        + this.b01(arr2_1 - arr2_0, "td")
                        + this.b01(arr2_1 - arr0_0, "td") + '\
					    <td>' + arr2[2] + '</td>\
					    <td class="left">' + arr2[3] + '</td>\
				    </tr>'
                }
                num = arr2_1 - arr0_0;//轨迹
                total += arr2_1 - arr2_0;//合计
            }
            this.a04(html, total);
        },
        a04: function (str, total) {
            str += '\
            <thead class="table-light">\
                <tr>\
                <th colspan="2" class="right">合计：</th>\
                ' + this.b01(total, "th") + '\
                <th><a onclick="Tool.RunTime.a02()" href="javascript:;">刷新</a></th>\
                <th colspan="2"></th>\
                </tr>\
            </thead>'
            let html = '\
            <header class="panel-heading"><a href="javascript:" onclick="Tool.RunTime.a01()" class="arrow_back"></a>该页用时轨迹（只显示前100条）</header>\
            <div class="p-2">\
              <table class="table table-hover center align-middle">\
              <thead class="table-light">\
                <tr>\
                <th class="w50">编号</th>\
                <th class="w90">其它用时</th>\
                <th class="w90">用时</th>\
                <th class="w90">轨迹</th>\
                <th class="w100">类型</th>\
                <th class="left">轨迹信息</th>\
                </tr>\
              </thead>\
              <tbody>'+ str + '</tbody>\
              </table>\
            </div>'
            $("#table2").hide();
            $("#table3").html(html)
        },
        b01: function (us, tdorth) {
            if (us >= 1000000) {
                return '<' + tdorth + ' class="right" style="background-color:#fc682a;">' + (us / 1000000).toFixed(2) + " s<\/' + tdorth +'>";
            }
            else if (us >= 1000) {
                return '<' + tdorth + ' class="right" style="background-color:#ffc63d;">' + (us / 1000).toFixed(2) + " ms<\/' + tdorth +'>";
            }
            else {
                return '<' + tdorth + ' class="right" style="background-color:#fff9e4;">' + us.toFixed(2) + " us<\/' + tdorth +'>";
            }
        },
    }
})