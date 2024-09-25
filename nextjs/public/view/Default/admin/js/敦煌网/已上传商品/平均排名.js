var fun =
{
    obj: { A1: 1, A2: 10, time: Tool.gettime(Tool.userDate13(Date.now())) },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        this.a02();
    },
    a02: function () {
        let str = '[\
    {\
      "size":30,\
      "count":<@count/>\
    }\
    <r:proupdhgatekeysranking_avg size=30 db="sqlite.dhgate" page=2 where=" order by @.time desc">,\
		{\
			"id":"<:id/>",\
			"keys1ranking":"<:keys1ranking/>",\
			"keys2ranking":"<:keys2ranking/>",\
			"keys3ranking":"<:keys3ranking/>",\
			"keys1Click":"<:keys1Click/>",\
			"keys2Click":"<:keys2Click/>",\
			"keys3Click":"<:keys3Click/>",\
			"count":"<:count/>",\
			"time":<:time/>\
    }\
    </r:proupdhgatekeysranking_avg>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (arr) {
        let html = "", A1 = [], A2 = [], A3 = [], A4 = [], A5 = [], A6 = [], A7 = [], A8 = [];
        for (let i = 1; i < arr.length; i++) {
            ///////////////////////////////////////////////
            A1.push([arr.length - i, arr[i].keys1ranking])
            A2.push([arr.length - i, arr[i].keys2ranking])
            A3.push([arr.length - i, arr[i].keys3ranking])
            A4.push([arr.length - i, "", Tool.userDate13(arr[i].time * 1000)])
            A5.push([arr.length - i, arr[i].count])
            A6.push([arr.length - i, arr[i].keys1Click])
            A7.push([arr.length - i, arr[i].keys2Click])
            A8.push([arr.length - i, arr[i].keys3Click])
            ///////////////////////////////////////////////
            html += '\
			<tr>\
				<td>'+ Tool.userDate13(arr[i].time * 1000) + '</td>\
				<td>'+ arr[i].keys1ranking + '</td>\
				<td>'+ arr[i].keys1Click + '</td>\
				<td>'+ arr[i].keys2ranking + '</td>\
				<td>'+ arr[i].keys2Click + '</td>\
				<td>'+ arr[i].keys3ranking + '</td>\
				<td>'+ arr[i].keys3Click + '</td>\
				<td>'+ arr[i].count + '</td>\
			</tr>'
        }
        html += '<tr><td colspan="8" class="left">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>'
        let html2 = Tool.header() + '\
    <div class="p-2">\
			<table class="table table-hover center">\
        <thead>\
					<tr><td class="p-3" colspan="8"><div id="visitors-container1" style="width:100%;height:300px"></div></td></tr>\
					<tr><td class="p-3" colspan="8"><div id="visitors-container2" style="width:100%;height:300px"></div></td></tr>\
					'+ this.b01() + '\
				</thead>\
				<tbody>'+ html + '</tbody>\
			</table>\
		</div>'
        Tool.html(this.a04, this, html2, [A1, A2, A3, A4, A5, A6, A7, A8]);
    },
    a04: function (arr) {
        $.plot($("#visitors-container1"),
            [
                {
                    data: arr[0],
                    label: "关键词一平均排名",
                    points: { show: true },
                    yaxis: 1
                },
                {
                    data: arr[1],
                    label: "关键词二平均排名",
                    points: { show: true },
                    lines: { show: true, fill: false },
                    yaxis: 1
                },
                {
                    data: arr[2],
                    label: "关键词三平均排名",
                    points: { show: true },
                    lines: { show: true, fill: false },
                    yaxis: 1
                }
            ],
            {
                series: {
                    lines: { show: true, fill: false },
                    points: {
                        show: true,
                        lineWidth: 2,
                        fill: true,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 5
                    },
                    shadowSize: 0
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#f9f9f9",
                    borderWidth: 1,
                    borderColor: "#eeeeee"
                },
                colors: ["#424F63", "#65CEA7", "#70a6ec"],
                tooltip: true,
                tooltipOpts:
                {
                    defaultTheme: false,
                    content: "%x<br/>%s：%y"
                },
                xaxis: {
                    tickFormatter: function (val, axis) {
                        return "<b>" + arr[3][arr[3].length - val][2] + "</b>";
                    },
                    ticks: arr[3]
                },
                yaxes: [{
                    tickFormatter: function (axis) {
                        return axis.toString();
                    }, position: "right"
                }],
                legend: { position: 'nw' }
            });
        //////////////////////////////////////////////////////////
        $.plot($("#visitors-container2"),
            [
                {
                    data: arr[4],
                    label: "有排名的商品数量",
                    points: { show: true },
                    yaxis: 2
                },
                {
                    data: arr[5],
                    label: "关键词一平均模拟点击次数",
                    points: { show: true }
                },
                {
                    data: arr[6],
                    label: "关键词二平均模拟点击次数",
                    points: { show: true }
                },
                {
                    data: arr[7],
                    label: "关键词三平均模拟点击次数",
                    points: { show: true }
                }
            ],
            {
                series: {
                    lines: { show: true, fill: false },
                    points: {
                        show: true,
                        lineWidth: 2,
                        fill: true,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 5
                    },
                    shadowSize: 0
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#f9f9f9",
                    borderWidth: 1,
                    borderColor: "#eeeeee"
                },
                colors: ["#ff0000", "#424F63", "#65CEA7", "#70a6ec"],
                tooltip: true,
                tooltipOpts:
                {
                    defaultTheme: false,
                    content: "%x<br/>%s：%y"
                },
                xaxis: {
                    tickFormatter: function (val, axis) {
                        return "<b>" + arr[3][arr[3].length - val][2] + "</b>";
                    },
                    ticks: arr[3]
                },
                yaxes: [
                    {
                        tickFormatter: function (axis) {
                            return axis.toString() + "（点击量）";
                        }
                    },
                    {
                        tickFormatter: function (axis) {
                            return axis.toString() + "（商品量）";
                        },
                        position: "right"
                    }], legend: { position: 'nw' }
            });
    },
    b01: function () {
        let html = '\
    <tr class="table-light">\
      <th class="left" style="padding-left: 30px;position: relative;">\
				<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
          <li onClick="fun.c02()"><a class="dropdown-item pointer">统计十天内的平均排名</a></li>\
        </ul>\
				日期</th>\
      <th>关键词一平均排名</th>\
      <th>关键词一平均模拟点击次数</th>\
      <th>关键词二平均排名</th>\
      <th>关键词二平均模拟点击次数</th>\
      <th>关键词三平均排名</th>\
      <th>关键词三平均模拟点击次数</th>\
      <th>有排名的商品数量</th>\
    </tr>'
        return html;
    },
    c01: function () { },
    c02: function () {
        let html = '\
		<header class="panel-heading"><a href="javascript:" onclick="location.reload();" class="arrow_back"></a>正在【统计十天内的平均排名】。。。</header>\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w100">进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备排名数据...</td></tr>\
      </tbody>\
      </table>\
    </div>'
        Tool.html(this.c03, this, html);
    },
    c03: function () {
        if (this.obj.A1 <= this.obj.A2) {
            let p1 = Math.ceil(this.obj.A1 / this.obj.A2 * 100)
            $("#A1").html(p1 + "%").css("width", p1 + "%");
            $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（条）');
            this.c04()
        }
        else {
            $("#state").html("统计完成。");
        }
    },
    c04: function () {
        let str = '\
		{\
			<r:proupdhkeysranking size=10 db="sqlite.aliexpress" where=" where @.addtime='+ this.obj.time + '">\
				"keys1ranking":<:avg(@.keys1ranking) tag=0/>,\
				"keys2ranking":<:avg(@.keys2ranking) tag=0/>,\
				"keys3ranking":<:avg(@.keys3ranking) tag=0/>,\
				"count":<:count(1)/>,\
				"time":'+ this.obj.time + '\
			</r:proupdhkeysranking>\
		}'
        $("#state").html("正在统计【" + Tool.js_date_time2(this.obj.time) + "】的平均排名。");
       Tool.ajax.a01( str,1,this.c05,this);
    },
    c05: function (oo) {
        let sel = "select count(1) from @.proupdhgatekeysranking_avg where @.time=" + oo.time
        let str = '""\
				<if Fun(Db(sqlite.aliexpress,'+ sel + ',count))==0>\
					<r: db="sqlite.aliexpress">insert into @.proupdhgatekeysranking_avg(@.keys1ranking,@.keys2ranking,@.keys3ranking,@.count,@.time)values('+ oo.keys1ranking + ',' + oo.keys2ranking + ',' + oo.keys3ranking + ',' + oo.count + ',' + oo.time + ')</r:>\
					<else/>\
					<r: db="sqlite.aliexpress">update @.proupdhgatekeysranking_avg set @.keys1ranking='+ oo.keys1ranking + ',@.keys2ranking=' + oo.keys2ranking + ',@.keys3ranking=' + oo.keys3ranking + ',@.count=' + oo.count + ' where  @.time=' + oo.time + '</r:>\
				</if>';
        $("#state").html("正在导入【" + Tool.js_date_time2(this.obj.time) + "】的平均排名。");
        Tool.ajax.a01(str, 1, this.c06, this);
    },
    c06: function (t) {
        if (t == "") {
            $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（完）');
            this.obj.A1++;
            this.obj.time -= 60 * 60 * 24;
            this.c03();
        }
        else { Tool.pre(t); }
    }
}
fun.a01();