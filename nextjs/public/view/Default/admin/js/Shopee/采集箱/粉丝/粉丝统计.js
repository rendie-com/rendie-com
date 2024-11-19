'use strict';
var fun =
{
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
        obj.params.site = obj.params.site ? obj.params.site : 'tw'//站点
        this.a02()
    },
    a02: function () {
        let tr = "", dbname, is_following, sum_is_following = 0, is_my_following, sum_is_my_following = 0
        for (let i = 1; i < 101; i++) {
            dbname = i.toString().padStart(3, '0')
            is_following = config[obj.params.site].is_following[dbname]
            if (is_following) sum_is_following += is_following
            is_my_following = config[obj.params.site].is_my_following[dbname]
            sum_is_my_following += is_my_following
            /////////////////////////////////////
            tr += '\
            <tr>\
              <td>'+ dbname + '</td>\
              <td>'+ (is_following ? is_following : '') + '</td>\
              <td>'+ is_my_following + '</td>\
            </tr>'
        }
        let html = Tool.header2(obj.params.jsFile, obj.params.site) + '\
        <div class="p-2">\
            '+ Tool.header4(obj.params.site,1) + '\
        	<table class="table align-middle table-hover center">\
        		<thead class="table-light">'+ this.b01(sum_is_following, sum_is_my_following) + '</thead>\
        		<tbody>'+ tr + '</tbody>\
        	</table>\
        </div>'
        Tool.html(null, null, html)
    },
    //////////////////////////////////////////////
    b01: function (sum_is_following, sum_is_my_following) {
        let html = '\
        <tr>\
          <th>数据库</th>\
          <th>关注我('+ sum_is_following + ')</th>\
          <th>我关注('+ sum_is_my_following + ')</th>\
          <th>我关注次数</th>\
          <th>我取关次数</th>\
        </tr>'
        return html;
    },
}
fun.a01();