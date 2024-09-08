'use strict';
var fun =
{
    a01: function () {
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        let str = '[\
		{"count":<@count/>}\
		<r:shopanalysis_day db="sqlite.dhgate" size=90 page=2 where=" order by @.day desc">,\
		{\
			"day":"<:day/>",\
			"Exposure":<:Exposure/>,\
			"Browse":<:Browse/>,\
			"visitors":<:visitors/>,\
			"money":<:money/>,\
			"OrderNum":<:OrderNum/>,\
			"DelayQuantity":<:DelayQuantity/>,\
			"UploadVolume":<:UploadVolume/>,\
			"AuditFailed":<:AuditFailed/>,\
			"DelVolume":<:DelVolume/>,\
			"UpdateVolume":<:UpdateVolume/>,\
			"DeliverGoods":<:DeliverGoods/>,\
			"OnShelves":<:OnShelves/>,\
			"ImgBrowse":<:ImgBrowse/>\
		}\
		</r:shopanalysis_day>\
		]'
        Tool.ajax.a01(str, obj.arr[4], this.a02, this);
    },
    a02: function (oo) {
        let html = '', A1 = [], A2 = [], A3 = [], A4 = [], A5 = [], A6 = [], day
        for (let i = 1; i < oo.length; i++) {
            day = oo[i].day.substr(0, 4) + "年" + oo[i].day.substr(4, 2) + "月" + oo[i].day.substr(6) + "日"
            ///////////////////////////////////////////////
            A1.push([oo.length - i, oo[i].OnShelves])
            A2.push([oo.length - i, oo[i].Exposure])
            A3.push([oo.length - i, "", day])
            A4.push([oo.length - i, oo[i].Browse])
            A5.push([oo.length - i, oo[i].visitors])
            A6.push([oo.length - i, oo[i].ImgBrowse])
            ///////////////////////////////////////////////
            html += '\
            <tr>\
                <td>'+ i + '</td>\
                <td>'+ day + '</td>\
                <td>'+ oo[i].OnShelves + '</td>\
                <td>'+ oo[i].Exposure + '</td>\
                <td>'+ oo[i].Browse + '</td>\
                <td>'+ oo[i].ImgBrowse + '</td>\
                <td>'+ oo[i].visitors + '</td>\
                <td>'+ oo[i].money + '</td>\
                <td>'+ oo[i].OrderNum + '</td>\
                <td>'+ oo[i].DelayQuantity + '</td>\
                <td title="审核未通过数量">'+ oo[i].AuditFailed + '</td>\
                <td>'+ oo[i].UploadVolume + '</td>\
                <td>'+ oo[i].DelVolume + '</td>\
                <td>'+ oo[i].UpdateVolume + '</td>\
                <td>'+ oo[i].DeliverGoods + '</td>\
            </tr>'
        }
        html = '\
        <header class="panel-heading">\
          <div onclick="Tool.main();">单个店铺统计</div>\
          <div class="active">所有店铺统计</div>\
        </header>\
        <div class="p-2">\
          <table class="table table-hover center">\
          <thead>\
            <tr><td colspan="15" class="p-3"><div id="visitors-container1" style="width:100%;height:300px"></div></td></tr>\
            <tr><td colspan="15" class="p-3"><div id="visitors-container2" style="width:100%;height:300px"></div></td></tr>\
            <tr><td colspan="15" class="left">'+ Tool.page(oo[0].count, 90, 4) + '</td></tr>\
            <tr class="table-light">\
                <th style="padding-left: 30px;position: relative;">\
                    <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                    <ul class="dropdown-menu">\
                    <li onClick="Tool.open5(\'js01\',10)"><a class="dropdown-item pointer">同步店铺数据（10天）</a></li>\
                    <li onClick="Tool.open5(\'js01\',365*10)"><a class="dropdown-item pointer">同步店铺数据（十年）</a></li>\
                    </ul>\
                </th>\
                <th>日期</th>\
                <th title="已上架商品">已上架</th>\
                <th title="产品在搜索列表页展示的次数，不包括其余位置曝光">曝光量</th>\
                <th title="访问店铺页面或产品详情页的次数">浏览量</th>\
                <th>图片浏览量</th>\
                <th title="访问店铺页面或产品详情页的去重人数，一个人在单天内访问多次只记为一个">访客数</th>\
                <th title="统计时间内，付款成功并确认的总金额">成交金额</th>\
                <th title="统计时间内，付款成功并确认的订单数">订单数</th>\
                <th>延期量</th>\
                <th title="审核未通过数量">未过量</th>\
                <th>上传量</th>\
                <th>删除量</th>\
                <th>更新量</th>\
                <th>发货量</th>\
            </tr>\
          </thead>\
          <tbody>'+ html + '</tbody>\
          </table>\
        </div>'
        Tool.html(this.a03, this, html, [A1, A2, A3, A4, A5, A6])
    },
    a03: function (arr) {
        $.plot($("#visitors-container1"),
            [
                {
                    data: arr[0],
                    label: "已上架商品",
                    points: { show: true },
                    yaxis: 1
                },
                {
                    data: arr[1],
                    label: "曝光量",
                    points: { show: true },
                    lines: { show: true, fill: false },
                    yaxis: 2
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
                colors: ["#424F63", "#65CEA7"],
                tooltip: true,
                tooltipOpts:
                {
                    defaultTheme: false,
                    content: "%x<br/>%s：%y"
                },
                xaxis: {
                    tickFormatter: function (val, axis) {
                        return "<b>" + arr[2][arr[2].length - val][2] + "</b>";
                    },
                    ticks: arr[2]
                },
                yaxes: [{
                    tickFormatter: function (axis) {
                        return axis.toString() + "（上架量）";
                    }
                },
                {
                    tickFormatter: function (axis) {
                        return axis.toString() + "（曝光量）";
                    },
                    position: "right"
                }],
                legend: { position: 'nw' }
            });
        $.plot($("#visitors-container2"),
            [
                {
                    data: arr[3],
                    label: "浏览量",
                    points: { show: true },
                    yaxis: 1
                },
                {
                    data: arr[4],
                    label: "访客数",
                    points: { show: true },
                    lines: { show: true, fill: false },
                    yaxis: 2
                },
                {
                    data: arr[5],
                    label: "图片浏览量",
                    points: { show: true },
                    lines: { show: true, fill: false },
                    yaxis: 2
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
                colors: ["#424F63", "#65CEA7", "#65CE07"],
                tooltip: true,
                tooltipOpts:
                {
                    defaultTheme: false,
                    content: "%x<br/>%s：%y"
                },
                xaxis: {
                    tickFormatter: function (val, axis) {
                        return "<b>" + arr[2][arr[2].length - val][2] + "</b>";
                    },
                    ticks: arr[2]
                },
                yaxes: [{
                    tickFormatter: function (axis) {
                        return axis.toString() + "（浏览量）";
                    }
                },
                {
                    tickFormatter: function (axis) {
                        return axis.toString() + "（访客数/图片浏览量）";
                    },
                    position: "right"
                }],
                legend: { position: 'nw' }
            });
    }
}
fun.a01();