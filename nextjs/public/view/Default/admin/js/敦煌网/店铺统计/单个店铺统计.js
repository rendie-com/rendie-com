'use strict';
var fun =
{
    obj: { seller: [] },
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        let path = "admin/js/敦煌网/店铺统计/"
        if (obj.arr[3] == "js01") {
            Tool.scriptArr([path + '同步店铺数据.js']);
        }
        else if (obj.arr[3] == "js02") {
            Tool.scriptArr([path + '所有店铺统计.js']);
        }
        else {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : 1;//翻页
            this.a02();
        }
    },
    a02: function () {
        let str = '\
        [0\
          <r:seller db="sqlite.dhgate" size=50 where=" order by @.sort asc">\
          ,{\
				    "fromid":<:fromid/>,\
				    "UserName":"<:UserName/>",\
				    "industry":"<:industry/>",\
				    "hide":<:hide/>\
			     }\
          </r:seller>\
        ]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this)
    },
    a03: function (arr) {
        if (arr.length == 51) { Tool.at("账户数量超50，需要重新开发。"); }
        else if (arr.length == 1) {
            obj.arr[5] = 0
            this.a04();
        }
        else {

            obj.arr[5] = obj.arr[5] ? obj.arr[5] : arr[1].fromid;//来源账户ID
            this.obj.seller = arr;
            this.a04();//选第一个账户
        }
    },
    a04: function () {
        let str = '[{"count":<@count/>,"size":90}\
		<r:shopanalysis db="sqlite.dhgate" size=90 page=2 where="'+ this.b03() + '">\
        ,{\
            "id":<:id/>,\
            "fromid":<:fromid/>,\
            "Exposure":<:Exposure/>,\
            "Browse":<:Browse/>,\
            "visitors":<:visitors/>,\
            "money":<:money/>,\
            "OrderNum":<:OrderNum/>,\
            "ConversionRate":<:ConversionRate/>,\
            "ServiceCapability":<:ServiceCapability/>,\
            "DelayQuantity":<:DelayQuantity/>,\
            "UploadVolume":<:UploadVolume/>,\
            "DelVolume":<:DelVolume/>,\
            "UpdateVolume":<:UpdateVolume/>,\
            "OnShelves":<:OnShelves/>,\
            "Disputes":<:Disputes/>,\
            "AuditFailed":<:AuditFailed/>,\
            "Complaint":<:Complaint/>,\
            "DeliverGoods":<:DeliverGoods/>,\
            "Appropriate":<:Appropriate/>,\
            "Punish1":<:Punish1/>,\
            "Punish2":<:Punish2/>,\
            "Punish3":<:Punish3/>,\
            "Punish4":<:Punish4/>,\
            "name":"<:name/>",\
            "uptime":<:uptime/>,\
            "year":<:year/>,\
            "month":<:month/>,\
            "day":<:day/>\
        }\
        </r:shopanalysis>]'
        Tool.ajax.a01(str, obj.arr[4], this.a05, this)
    },
    a05: function (arr) {
        let html = '', A1 = [], A2 = [], A3 = [], A4 = [], A5 = []
        for (let i = 1; i < arr.length; i++) {
            ///////////////////////////////////////////////
            A1.push([arr.length - i, arr[i].OnShelves])
            A2.push([arr.length - i, arr[i].Exposure])
            A3.push([arr.length - i, "", arr[i].year + '年' + arr[i].month + '月' + arr[i].day + "日"])
            A4.push([arr.length - i, arr[i].Browse])
            A5.push([arr.length - i, arr[i].visitors])
            ////////////////////////////////////////////////////////
            html += '\
            <tr>\
            <td class="p-0">\
                <table class="table mb-0 table-bordered table-hover">\
                    <tr><td colspan="4">'+ arr[i].name + '</td></tr>\
                    <tr>\
                        <td>'+ this.b02(2) + '</td>\
                        <td title="状态">'+ this.b02(3) + '</td>\
                        <td title="物流服务等级">'+ this.b06(arr[i].Appropriate) + '</td>\
                        <td title="服务能力">'+ arr[i].ServiceCapability + ' 分</td>\
                    </tr>\
                </table>\
            </td>\
            <td class="p-0">\
            <table class="table mb-0 table-bordered table-hover">\
            <tr><td title="统计时间">'+ arr[i].year + '年' + arr[i].month + '月' + arr[i].day + '日</td></tr>\
            <tr><td title="更新时间">'+ Tool.js_date_time2(arr[i].uptime) + '</td></tr>\
            </table>\
            </td>\
            <td class="p-0">\
            <table class="table mb-0 table-bordered table-hover">\
            <tr>\
            <td title="已上架">'+ arr[i].OnShelves + '</td>\
            <td title="搜索曝光量">'+ arr[i].Exposure + '</td>\
            <td title="商铺浏览量">'+ arr[i].Browse + '</td>\
            <td title="访客数">'+ arr[i].visitors + '</td></tr>\
            <tr>\
            <td title="订单数：统计时间内，付款成功并确认的订单数">'+ arr[i].OrderNum + '</td>\
            <td title="成交金额：统计时间内，付款成功并确认的总金额">'+ arr[i].money + '</td>\
            <td title="纠纷中">'+ arr[i].Disputes + '</td>\
            <td title="投诉量">'+ arr[i].Complaint + '</td>\
            </tr>\
            </table>\
            </td>\
            <td>'+ arr[i].ConversionRate + '%</td>\
            <td class="p-0">\
            <table class="table mb-0 table-bordered table-hover">\
            <tr>\
            <td title="交易违规">'+ arr[i].Punish1 + '</td>\
            <td title="产品违规">'+ arr[i].Punish2 + '</td>\
            </tr>\
            <tr>\
            <td title="产权禁限售">'+ arr[i].Punish3 + '</td>\
            <td title="第三方投诉">'+ arr[i].Punish4 + '</td>\
            </tr>\
            </table>\
            </td>\
            <td class="p-0">\
            <table class="table mb-0 table-bordered table-hover">\
            <tr>\
            <td title="上传量">'+ arr[i].UploadVolume + '</td>\
            <td title="删除量">'+ arr[i].DelVolume + '</td>\
            <td title="更新量">'+ arr[i].UpdateVolume + '</td>\
            </tr>\
            <tr>\
            <td title="延期量">'+ arr[i].DelayQuantity + '</td>\
            <td title="审核未通过数量">'+ arr[i].AuditFailed + '</td>\
            <td title="发货量">'+ arr[i].DeliverGoods + '</td>\
            </tr>\
            </table>\
            </td>\
            </tr>'
        }
        html = this.b01() + '\
        <div class="p-2">\
          <table class="table center">\
          <thead>\
            <tr><td class="p-3" colspan="15"><div id="visitors-container1" style="width:100%;height:300px"></div></td></tr>\
            <tr><td class="p-3" colspan="15"><div id="visitors-container2" style="width:100%;height:300px"></div></td></tr>\
				    <tr><td colspan="6" class="left">'+ Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>\
				    '+ this.b05(arr[0]) + '\
			    </thead>\
          <tbody>'+ html + '</tbody>\
          </table>\
        </div>'
        Tool.html(this.a06, this, html, [A1, A2, A3, A4, A5])
    },
    a06: function (arr) {
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
                        return axis.toString() + "（浏览量）";
                    }
                },
                {
                    tickFormatter: function (axis) {
                        return axis.toString() + "（访客数）";
                    },
                    position: "right"
                }],
                legend: { position: 'nw' }
            });
    },
    b01: function () {
        let str = '\
        <header class="panel-heading">\
          <div class="active">单个店铺统计</div>\
          <div onclick="Tool.main(\'js02\');">所有店铺统计</div>\
        </header>'
        return str
    },
    b02: function (mode) {
        let str = "", arr = this.obj.seller
        for (let i = 1; i < arr.length; i++) {
            if (mode == 1) {
                str += '\
          <Option value="'+ arr[i].fromid + '" ' + (obj.arr[5] == arr[i].fromid ? 'selected="selected"' : '') + '>\
            ('+ i + ')' + arr[i].UserName + '\
          </option>';
            }
            else if (mode == 2) {
                str = "<span title=\"" + this.b04(arr[i].industry) + "\">" + arr[i].industry + ' 类</span>'; break;
            }
            else if (mode == 3) {
                switch (arr[i].hide) {
                    case 0: str = "正常"; break;
                    case 1: str = "已禁用"; break;
                    case 2: str = "限物流"; break;
                    case 3: str = "受限"; break;
                    default: str = "未知";
                }
            }
        }
        return str;
    },
    b03: function () {
        let where = ' where @.fromid=' + obj.arr[5];
        return where + ' order by @.year desc,@.month desc,@.day desc';
    },
    b04: function (val) {
        let str = ""
        switch (val) {
            case "A": str = "计算机和网络\n手机和手机附件\n消费类电子\n数码相机、摄影器材\n电玩游戏\n安全与监控\n家用电器"; break;
            case "B": str = "服装"; break;
            case "C": str = "表\n珠宝\n时尚配件"; break;
            case "D": str = "鞋类及鞋类辅料\n箱包及箱包辅料"; break;
            case "E": str = "婚纱礼服"; break;
            case "F": str = "健康与美容\n发制品"; break;
            case "G": str = "母婴用品\n玩具与礼物"; break;
            case "H": str = "运动与户外产品\n战术装备"; break;
            case "I": str = "家居与花园\n商业及工业"; break;
            case "J": str = "照明灯饰"; break;
            case "K": str = "汽车、摩托车"; break;
            case "L": str = "乐器"; break;
            case "M": str = "其他产品"; break;
            case "N": str = "食品饮料"; break;
            default:
        }
        return str;
    },
    b05: function (arr) {
        return '\
        <tr class="table-light">\
          <th class="p-0"><select onChange="Tool.open(5,this.options[this.selectedIndex].value)" class="form-select">'+ this.b02(1) + '</select></th>\
          <th>【统计/更新】时间</th>\
          <th title="浏览量：访问店铺页面或产品详情页的次数\n访客数：访问店铺页面或产品详情页的去重人数，一个人在单天内访问多次只记为一个">反馈信息</th>\
          <th>转化率</th>\
          <th title="交易违规 | 产品违规 | 产权禁限售 | 第三方投诉">处罚</th>\
          <th>操作信息</th>\
        </ul>'
    },
    b06: function (val) {
        let str = ""
        switch (val) {
            case 0: str = "优秀"; break;
            case 1: str = "良好"; break;
            case 2: str = "合格"; break;
            case 3: str = "待改善"; break;
            case 4: str = "无"; break;
            default: str = "未知：" + val;
        }
        return str;
    },
}
fun.a01();