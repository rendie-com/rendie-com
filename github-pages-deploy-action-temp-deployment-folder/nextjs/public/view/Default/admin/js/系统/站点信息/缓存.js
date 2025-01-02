'use strict';
Object.assign(Tool, {
    ArrConfig:
    {
        a01: function () {
            Tool.ajax.a01("<.ArrConfig/>",1,this.a02,  this);
        },
        a02: function (t) {
            let str = "", i = 0;
            for (let k in t) {
                i++;
                str += '\
			<tr>\
				<td>'+ i + '</td>\
				<td class="right">'+ k + '</td>\
				<td>'+ t[k] + '</td>\
			</tr>'
            }
            let html = '\
            <header class="panel-heading"><a class="arrow_back" onclick="location.reload();"></a>配置缓存</header>\
            <div class="p-2">\
              <table class="table align-middle">\
                <thead class="table-light center">\
                  <tr>\
                    <th class="w50">编号</th>\
                    <th class="w300 right">配置名</th>\
                    <th class="left">配置值</th>\
                  </tr>\
                </thead>\
                <tbody>'+ str + '</tbody>\
              </table>\
            </div>'
            Tool.html(null, null, html);
        },
    },
})