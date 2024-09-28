'use strict';
Object.assign(Tool, {
    Headers:
    {
        a01: function () {
            Tool.ajax.a01('<.AreaHeaders()/>', 1, this.c12, this);
        },
        c12: function (oo) {
            let str = '', count = 0;
            for (let k in oo) {
                count++;
                str += '\
                <tr>\
                    <td>'+ count + '</td>\
                    <td>'+ k + '</td>\
                    <td class="left">'+ oo[k] + '</td>\
                </tr>'
            }
            let html = '\
            <header class="panel-heading"><a class="arrow_back" onclick="location.reload();"></a>Request.Headers 变量列表(含客户端信息)</header>\
            <div class="p-2">\
              <table class="table table-hover align-middle center">\
                <thead class="table-light">\
                  <tr><th class="w50">编号</th><th class="w250">名称</th><th class="left">值</th></tr>\
                </thead>\
                <tbody>'+ str + '</tbody>\
              </table>\
            </div>'
            Tool.html(null, null, html);
        }
    },
    GetEnvironmentVariables: {
        a01: function () {
            Tool.ajax.a01('<.GetEnvironmentVariables/>', 1, this.a02, this)
        },
        a02: function (oo) {
            let str = '';
            let count = 0;
            for (let k in oo) {
                count++;
                str += '\
                <tr>\
                <td>'+ count + '</td>\
                <td>'+ k + '</td>\
                <td class="left">'+ oo[k] + '</td>\
                </tr>'
            }
            let html = '\
            <header class="panel-heading"><a class="arrow_back" onclick="location.reload();"></a>Environment.GetEnvironmentVariables 变量列表(服务器信息)</header>\
                <div class="p-2">\
                <table class="table table-hover align-middle center">\
                <thead class="table-light">\
                <tr><th class="w50">编号</th><th class="w350">名称</th><th class="left">值</th></tr>\
                </thead>\
                <tbody>'+ str + '</tbody>\
                </table>\
            </div>'
            Tool.html(null, null, html);
        },
    }
})