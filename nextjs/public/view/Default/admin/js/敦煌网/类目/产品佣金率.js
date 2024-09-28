'use strict';
var fun =
{
    type: [],
    a01: function () {
        let str = '\
        [0\
		    <r:type db="sqlite.dhgate" where=" where @.upid=\'0\' order by @.sort asc" size=200>,\
            {\
			    "name":"<:name/>",\
			    "js":[0\
                    <r:type  db="sqlite.dhgate" where=" where @.upid=\'<:fromID/>\' order by @.sort asc" size=50>\
                    ,{\
                        "c0_300":"<:c0_300 f=2/>",\
                        "c300_1000":"<:c300_1000 f=2/>",\
                        "c1000_":"<:c1000_ f=2/>",\
                        "fromid":"<:fromid/>",\
                        "name":"<:name tag=js/>",\
                        "enname":"<:enname tag=js/>"\
                    }\
                    </r:type>]\
            }\
        </r:type>]'
       Tool.ajax.a01( str,1,this.a02,this);
    },
    a02: function (arr) {
        this.type = arr;
        let html2 = "", row = '';
        for (let i = 1; i < arr.length; i++) {
            row = '<td rowspan="' + (arr[i].js.length - 1) + '">' + arr[i].name + '</td>';
            for (let j = 1; j < arr[i].js.length; j++) {
                html2 += '\
                  <tr>\
                    '+ (j == 1 ? row : '') + '\
                    <td class="left">'+ arr[i].js[j].fromid + '</td>\
                    <td class="left">'+ arr[i].js[j].name + '</td>\
                    <td class="left">'+ arr[i].js[j].enname + '</td>\
                    <td>'+ (arr[i].js[j].c0_300 == -1 ? '未知' : arr[i].js[j].c0_300 + '%') + '</td>\
                    <td>'+ (arr[i].js[j].c300_1000 == -1 ? '未知' : arr[i].js[j].c300_1000 + '%') + '</td>\
                    <td>'+ (arr[i].js[j].c1000_ == -1 ? '未知' : arr[i].js[j].c1000_ + '%') + '</td>\
                  </tr>'
            }
        }
        html2 += '<tr><td class="right">信息来源：</td><td colspan="6" class="left"><a href="https://seller.dhgate.com/help/c7001/363001.html" target="_blank">https://seller.dhgate.com/help/c7001/363001.html</a></td></tr>'
        let html = '\
        <header class="panel-heading">\
            <div onclick="Tool.main()">【敦煌网】类目</div>\
            <div class="active" onclick="Tool.main(\'js01\')">商品佣金率</div>\
        </header>\
        <div class="p-2">\
          <table class="table table-hover align-middle center">\
          <thead class="table-light">\
            <tr>\
              <th style="padding-left: 30px;position: relative;">'+ this.b01() + '一级类目名称</th>\
              <th class="left">二级类目ID</th>\
              <th class="left">二级类目名称</th>\
              <th class="left">二级类目名称（英文）</th>\
              <th>订单金额：[0,300]</th>\
              <th>订单金额：[300,1000]</th>\
              <th>订单金额：[1000,]</th>\
            </ul>\
          </thead>\
          <tbody>'+ html2 + '</tbody>\
          </table>\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
		    <li onClick="fun.c01();"><a class="dropdown-item pointer">*从敦煌获取商品佣金率</a></li>\
        </ul>'
    },
    b02: function (js, bind, name1) {
        for (let i = 1; i < js.length; i++) {
            for (let j = 0; j < bind.length; j++) {
                if (bind[j]) {
                    if (js[i].name == bind[j].name) {
                        js[i].bind0_300 = bind[j].c0_300;
                        js[i].bind300_1000 = bind[j].c300_1000;
                        js[i].bind1000_ = bind[j].c1000_;
                        bind[j] = null;
                        break;
                    }
                }
            }
            if (!js[i].bind0_300) {
                Tool.pre(["这个没绑定:" + name1, js[i], "-----------------", bind])
                aaaaaaaaaaaaaaaaa
            }
        }
        return js;
    },
    c01: function () {
        let url = "https://seller.dhgate.com/help/c7001/363001.html"
        gg.getFetch(url,"json", this.c02, this)
    },
    c02: function (t) {
        let arr = Tool.StrSplits(t, "<tr>", "</tr>");
        let NewArr = {}, name1
        for (let i = 1; i < arr.length; i++) {
            let arr1 = arr[i].split('</span></span></span></span></span></p>\n			</td>')
            if (arr1.length == 7) {
                name1 = arr1[0].split('<span style=\"color:#444444\">')[1]
                let name = Tool.Trim(arr1[1].replace(new RegExp("<.*?>", "ig"), ""))
                NewArr[name1] = [{
                    name: name,
                    c0_300: arr1[3].split('<span style=\"color:#444444\">')[1],
                    c300_1000: arr1[4].split('<span style=\"color:#444444\">')[1],
                    c1000_: arr1[5].split('<span style=\"color:#444444\">')[1]
                }]

            }
            else {
                let name = Tool.Trim(arr1[0].replace(new RegExp("<.*?>", "ig"), ""))
                NewArr[name1].push({
                    name: name,
                    c0_300: arr1[2].split('<span style=\"color:#444444\">')[1],
                    c300_1000: arr1[3].split('<span style=\"color:#444444\">')[1],
                    c1000_: arr1[4].split('<span style=\"color:#444444\">')[1]
                })
            }
        }
        this.c03(NewArr)
    },
    //一级类目名称绑定
    c03: function (NewArr) {
        NewArr["汽车、摩托车"].push(
            {
                "name": "摩托车配饰 & 鞋靴 & 箱包",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "制造定制服务",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["母婴用品"].push(
            {
                "name": "婴幼儿尿布&如厕训练",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["计算机和网络"].push(
            {
                "name": "键盘,鼠标&输入设备",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["消费类电子"].push(
            {
                "name": "MP3 & MP4播放器",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "太阳能&风能产品",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "土耳其项目专属",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "存储卡及U盘",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "平板电脑屏幕保护膜",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["其他产品"].push(
            {
                "name": "DH Special",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "质保服务",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["发制品"].push(
            {
                "name": "顺发&辫发",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "新星假发",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["家居与花园"].push(
            {
                "name": "花园 工具",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "一次性塑料制品",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "电热毯",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "家居小物件",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["照明灯饰"].push(
            {
                "name": "灯管&灯泡",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "太阳能灯&可再生能源设备",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["商业及工业"].push(
            {
                "name": "化学制品",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "能源",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "机械加工及零配件",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "农产品 & 农用物资",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "化学品、橡胶 & 塑料，其他原材料",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "建筑 & 房地产",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "电气设备 & 电力产品，通信",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "能源 & 发电",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "机械加工 & 制造",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "专业牙科器材",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["运动与户外产品"].push(
            {
                "name": "专业运动&户外服装",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "游泳用品&装备",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "定制运动户外产品",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "新潮流户外服饰",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["服装"].push(
            {
                "name": "新潮流服装",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "新趋势服装",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        ///////////////////////////////
        NewArr["箱包及箱包辅料"].push(
            {
                "name": "定制箱包",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "新星箱包",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        ///////////////////////////////
        NewArr["手机和手机附件"].push(
            {
                "name": "AGM",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "配件",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["时尚配件"].push(
            {
                "name": "帽子、围巾及手套、头饰",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "钥匙链、钥匙扣及挂绳",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "配饰包装和收纳工具",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "新潮流时尚配饰",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["健康与美容"].push(
            {
                "name": "家用美容仪",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "美妆工具",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "新星彩妆",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "护肤品&护肤工具",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["珠宝"].push(
            {
                "name": "戒指指环",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "发饰品",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["鞋类及鞋类辅料"].push(
            {
                "name": "定制鞋类",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "潮流时尚鞋",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "邀请类目（鞋）",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            },
            {
                "name": "鞋CS",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["玩具与礼物"].push(
            {
                "name": "定制玩具&礼物",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        NewArr["表"].push(
            {
                "name": "新星腕表",
                "c0_300": "-1%",
                "c300_1000": "-1%",
                "c1000_": "-1%"
            })
        //注：-1%       表示还不知道绑定哪一个，先用-1%，用着先。
        //////////////////////////////////////////////////
        let type = this.type
        for (let i = 1; i < type.length; i++) {
            if (NewArr[type[i].name]) {
                type[i].bind = NewArr[type[i].name]
                NewArr[type[i].name] = null;
            }
            else if (type[i].name == "办公文教 & 工商业") {
                type[i].bind = NewArr["商业及工业"];
                NewArr["商业及工业"] = null;
            }
            else if (type[i].name == "食品饮料") {
                //这个敦煌【佣金率】没有。
                type[i] = null;
            }
            else if (type[i].name == "特定专用") {
                //这个敦煌【佣金率】没有。
                type[i] = null;
            }
            else if (type[i].name == "可再生能源") {
                //这个敦煌【佣金率】没有。
                type[i] = null;
            }
            else if (type[i].name == "箱包及箱包辅料") {
                //这个敦煌【佣金率】没有。
                type[i] = null;
            }
            else {
                Tool.pre(type[i])
                aaaaaaaaaaaaaaaa
            }
        }
        this.c04(type)
    },
    //二级类目名称绑定
    c04: function (type) {
        for (let i = 1; i < type.length; i++) {
            if (type[i]) {
                type[i].js = this.b02(type[i].js, type[i].bind, type[i].name)
            }
        }
        //能到这里，说明全部绑定成功。
        this.c05(type)
    },
    //二级类目名称绑定
    c05: function (type) {
        let sql = [];
        for (let i = 1; i < type.length; i++) {
            if (type[i]) {
                for (let j = 1; j < type[i].js.length; j++) {
                    let bind0_300 = type[i].js[j].bind0_300.split("%")[0]
                    let bind300_1000 = type[i].js[j].bind300_1000.split("%")[0]
                    let bind1000_ = type[i].js[j].bind1000_.split("%")[0]
                    sql.push("update @.type set @.c0_300=" + bind0_300 + ",@.c300_1000=" + bind300_1000 + ",@.c1000_=" + bind1000_ + " where @.fromid='" + type[i].js[j].fromid + "'")
                }
            }
        }
        let str = '""<r: db="sqlite.dhgate">' + sql.join("<1/>") + '</r:>';
        Tool.ajax.a01(str,1,Tool.reload);
    },
}
fun.a01();