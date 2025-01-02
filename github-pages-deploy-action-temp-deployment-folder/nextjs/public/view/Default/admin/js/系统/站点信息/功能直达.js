'use strict';
Object.assign(Tool, {
    EnvironmentInfo:
    {
        a01: function () {
            Tool.ajax.a01('<.GetApplicationRunInfo/>', 1, this.a02, this, "运行信息");
        },
        a02: function (oo, name) {
            let str = '', count = 0;
            for (let k in oo) {
                count++;

                str += '\
                <tr>\
                    <td>'+ count + '</td>\
                    <td class="right">'+ k + '</td>\
                   '+ (count == 1 && name =="运行信息" ? Tool.renderSize(oo[k],"left") : ' <td class="left">' + oo[k] +'</td>') + '\
                </tr>'
            }
            let html = '\
            <header class="panel-heading"><a class="arrow_back" onclick="location.reload();"></a>'+ name + '</header>\
            <div class="p-2">\
                <table class="table table-hover align-middle">\
                    <thead class="table-light">\
                        <tr>\
                            <th class="w50 center">编号</th>\
                            <th class="right w300" nowrap="nowrap">属性名</th>\
                            <th>属性值</th>\
                        </tr>\
                    </thead>\
                    <tbody>'+ str + '</tbody>\
                </table>\
            </div>'
            Tool.html(null, null, html);
        },
        a03: function () { Tool.ajax.a01('<.GetSystemPlatformInfo/>', 1, this.a02, this, "系统运行平台"); },
        a04: function () { Tool.ajax.a01('<.GetSystemRunEvnInfo/>', 1, this.a02, this, "运行环境"); },
        a05: function () { Tool.ajax.a01('<.GetAllNetworkInterfaces/>', 1, this.a02, this, "服务器上所有网卡的IP地址"); },
    },
    AllDrives: {
        a01: function () {
            Tool.ajax.a01('<.AllDrives/>', 1, this.a02, this)
        },
        a02: function (arr) {
            let str = '';
            arr.sort(function (a, b) {
                a = parseInt(a[4]);
                b = parseInt(b[4]);
                return b - a
            })
            for (let i = 0; i < arr.length; i++) {

                str += '\
                <tr>\
                    <td class="left">'+ arr[i][0] + '</td>\
                    <td><img src="/'+ o.path + 'admin/img/' + (arr[i][1] == "True" ? "√" : "i") + '.png"></td>\
                    <td class="left">'+ arr[i][2] + '</td>\
                    <td>'+ arr[i][3] + '</td>\
                    '+ Tool.renderSize(arr[i][4]) + '\
                    '+ Tool.renderSize(arr[i][5]) + '\
                </tr>'
            }
            let html = '\
            <header class="panel-heading"><a class="arrow_back" onclick="location.reload();"></a>服务器磁盘信息</header>\
            <div class="p-2">\
                <table class="table table-hover align-middle center">\
                <thead class="table-light">\
                    <tr>\
                        <th class="w300 left">盘符</th>\
                        <th class="w50">就绪</th>\
                        <th class="w300 left">卷标</th>\
                        <th class="w100">文件系统</th>\
                        <th class="w100 right">可用空间</th>\
                        <th class="right">总空间</th>\
                    </tr>\
                </thead>\
                <tbody>'+ str + '</tbody>\
                </table>\
            </div>'
            Tool.html(null, null, html);
        },
    },
    AreaProcesses: {
        a01: function () {
            Tool.ajax.a01('<.AreaProcesses()/>', 1, this.a02, this)
        },
        a02: function (arr) {
            let str = '';
            arr.sort(function (a, b) {
                a = parseInt(a[1]);
                b = parseInt(b[1]);
                return b - a
            })
            for (let i = 0; i < arr.length; i++) {
                str += '\
                <tr>\
                    <td>'+ (i + 1) + '</td>\
                    <td>'+ arr[i][0] + '</td>' +
                    Tool.renderSize(arr[i][1]) +
                    '<td>' + arr[i][2] + '</td>' +
                    Tool.renderSize(arr[i][3]) +
                    Tool.renderSize(arr[i][4]) +
                    Tool.renderSize(arr[i][5]) +
                    Tool.renderSize(arr[i][6]) +
                    Tool.renderSize(arr[i][7]) + '\
                </tr>'
            }
            let html = '\
            <header class="panel-heading"><a class="arrow_back" onclick="location.reload();"></a>服务器进程</header>\
            <div class="p-2">\
              <table class="table table-hover align-middle right">\
                <thead class="table-light">\
                  <tr>\
                    <th class="w50">编号</th>\
                    <th>进程名</th>\
                    <th>物理内存量</th>\
                    <th>优先级别</th>\
                    <th>可分页系统内存量</th>\
                    <th>分页内存量</th>\
                    <th>最大内存量</th>\
                    <th>最大虚拟内存量</th>\
                    <th>最大物理内存量</th>\
                  </tr>\
                </thead>\
                <tbody>'+ str + '</tbody>\
              </table>\
            </div>'
            Tool.html(this.a03, this, html);
        },
        a03: function () {
            Tool.Time(this.a01, 1000 * 10, this, "1");
        },
    },
    AssemblyLoad: {
        c26: function () {

            let path = "web,Load"
            //let path="E:/project/vs/web/bin/Debug/net6.0/web.dll,LoadFrom"
            //let path="E:/project/vs/web/bin/Debug/net6.0/System.Data.Odbc.dll,LoadFile"
            //let path="E:/project/vs/web/bin/Debug/net6.0/System.Drawing.Common.dll,LoadFrom"
            let str = '<.AssemblyLoad(' + path + ')/>'
            Tool.ajax.a01( str,1,this.c27, this)
        },
        c27: function (t) {
            let arr1 = t.split("<1/>"), str1 = ""
            for (let i = 1; i < arr1.length; i++) {
                //////////////////////////////////////////////////////////////////////////////////////////
                let arr2 = arr1[i].split("<2/>"), str2 = ''
                for (let j = 1; j < arr2.length; j++) {
                    let arr3 = arr2[j].split("<3/>"), str3 = ''
                    for (let k = 1; k < arr3.length; k++) {
                        let arr4 = arr3[k].split("<4/>")
                        str3 += '\
					<tr>\
						<td class="w50 center">'+ k + '</td>\
						<td>'+ arr4[0] + '</td>\
						<td nowrap>'+ arr4[1] + '</td>\
						<td nowrap>'+ arr4[2] + '</td>\
					</tr>'
                    }
                    str3 = '\
				<table class="table table-hover align-middle">\
				<thead class="table-light">\
					<tr>\
						<th colspan="5"><a href="javascript:" class="Mo MoA" onclick="fun.c01($(this))"></a>'+ arr3[0] + '</th>\
					</tr>\
				</thead>\
				<tbody>'+ str3 + "</tbody>\
				</table>"
                    //////////////////////////////////////////////////////////////////////////////
                    str2 += '\
				<tr>\
					<td class="w50 center">'+ j + '</td>\
					<td>'+ str3 + '</td>\
				</tr>'
                }
                str2 = '\
			<table class="table align-middle">\
			<thead class="table-light">\
				<tr>\
					<th colspan="2">'+ arr2[0] + '</th>\
				</tr>\
			</thead>\
			<tbody>'+ str2 + "</tbody>\
			</table>"
                /////////////////////////////////////////////////////////////////////////////////
                str1 += '\
      <tr>\
        <td class="center">'+ i + '</td>\
        <td>'+ str2 + '</td>\
      </tr>'
            }
            let html = '\
    <header class="panel-heading"><a class="arrow_back" onclick="location.reload();"></a>反射【web.dll】</header>\
    <div class="p-2">\
      <table class="table align-middle">\
        <thead class="table-light">\
          <tr>\
            <th class="w50 center">编号</th>\
            <th>路径</th>\
          </tr>\
        </thead>\
        <tbody>'+ str1 + '</tbody>\
      </table>\
    </div>'
            Tool.html(null, null, html);
        },
    }
})