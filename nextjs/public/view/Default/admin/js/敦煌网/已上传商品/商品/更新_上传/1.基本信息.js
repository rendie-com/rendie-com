'use strict';
Object.assign(Tool, {
    upDHgateSeep1: {
        productname_keywords: {
            a01: function (name, keywords, typeenname, BrandName) {
                var reg = new RegExp(BrandName, "ig");
                name = name.replace(reg, " ")//删除标题中的品牌名称
                name += " " + typeenname
                name = name.replace(/\&amp;/ig, " ")
                name = name.replace(/\&/ig, " ")
                name = name.replace(/\#/ig, " ")
                name = name.replace(/ +/ig, " ")
                name = name.replace(/aliexpress.com/ig, " ")
                name = name.replace(/aliexpress/ig, " ")
                /////////////////////////////////////////////////////
                if (isNaN(keywords)) {
                    keywords = keywords.replace(reg, " ")//删除关键词中的品牌名称
                    keywords = keywords.replace(/\&/ig, " ")
                    keywords = keywords.replace(/ +/ig, " ")
                    keywords = keywords.replace(/aliexpress.com/ig, " ")
                    keywords = keywords.replace(/aliexpress/ig, " ")
                }
                else {
                    keywords = ",,";//是数字就不要了。
                }
                return this.a02(name, keywords)
            },
            a02: function (name, keywords) {
                let keyArr = keywords.split(","), Narr = [], num = 0;
                for (var i = 0; i < keyArr.length; i++) {
                    if (keyArr[i].search(/[A-Za-z]/g) != -1) {//俄语敦煌不给上传
                        num++;
                        if (i < 3) {//只要三个关键词
                            //注：敦煌关键词有长度40限制，但我不限制也可以。
                            Narr.push({
                                "name": "keyword" + num,
                                "value": Tool.Trim(keyArr[i])
                            });//上传要用上
                        }
                        else {
                            //多出来的关键词，放标题后面。
                            name += " " + keyArr[i];
                        }
                    }
                }
                return this.a03(name, Narr);
            },
            a03: function (name, Narr) {
                if (Narr.length < 3)//最小数组为3
                {
                    for (let i = Narr.length; i < 3; i++) {
                        Narr.push({ "name": "keyword" + (i + 1), "value": "" });//上传要用上
                    }
                }
                return this.a04(name, Narr)
            },
            a04: function (name, Narr) {
                let nameArr = name.split(" "), len = 0, NnameArr = [];
                for (let i = 0; i < nameArr.length; i++) {
                    len += nameArr[i].length;
                    if (len <= 140) {
                        //标题不能超个140个字符（不含空格）
                        NnameArr.push(nameArr[i]);
                    }
                    else {
                        break;
                    }
                }
                Narr.push({ "name": "productname", "value": NnameArr.join(" ") });//上传要用上
                return this.a05(Narr, NnameArr)
            },
            a05: function (Narr, NnameArr) {
                let str = '\
				<tbody>\
                <tr>\
					<td class="right">产品标题：</td>\
					<td><textarea name="productname" class="form-control" disabled="disabled">' + NnameArr.join(" ") + '</textarea>\
					您还可以输入' + (141 - NnameArr.join("").length) + '/140个字符</td>\
				</tr>\
				<tr>\
					<td class="right">产品关键词：</td>\
					<td>\
						<table class="w-100">\
						<tr>\
							<td><input class="form-control" maxlength="40" name="keyword1" type="text" disabled="disabled" value="'+ Narr[0].value + '"></td>\
							<td><input class="form-control" maxlength="40" name="keyword2" type="text" disabled="disabled" value="'+ Narr[1].value + '"></td>\
							<td><input class="form-control" maxlength="40" name="keyword3" type="text" disabled="disabled" value="'+ Narr[2].value + '"></td>\
						</tr>\
						</table>\
					</td>\
				</tr>\
                </tbody>'
                $("#body1").html(str);
                return Narr;
            },
        },
        //显示属性
        showAttrList:
        {
            //显示敦煌网属性
            a01: function (attr, Propertys) {
                let str = "";
                for (let i = 1; i < attr.length; i++) {
                    if (attr[i].name == "brand") {
                        str += '<tr>\
                                    <td class="right w300">' + attr[i].nameCn + '：</td>\
                                    <td>这个不用设置</td>\
                                </tr>'
                    }
                    else {
                        if (attr[i].buyAttr != "1") {//购买属性不在这里显示，但填写时，是在这里的。
                            str += '<tr>\
                                        <td class="right w300">' + attr[i].nameCn + "（" + attr[i].name.name + '）：</td>\
                                        <td>' + this.b01(attr[i].js, attr[i].type, attr[i].defined, attr[i].isother) + '</td>\
                                    </tr>'
                        }
                    }

                }
                str = '<table class="table table-hover mb-0 align-middle">' + str + this.b04(Propertys) + '<tr><td class="right">GTIN:</td><td title="全球贸易商品代码，用于以不重复的方式标识商品，提供此类标识码可以让您的商品更方便用户查找，更有机会获得免费的站内外流量。"><input class="form-control w200" type="text" disabled="disabled" value=""></td></tr></table>';
                $("#body1").append('<tr><td class="right">产品基本属性:</td><td class="p-0">' + str + '</td></tr>');
            },

            b01: function (arr, type, defined, isother) {
                let str = "";
                // 1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框
                if ( type == "0") {
                    str = "";
                }
                else if (type == "1") {
                    str = this.b03(arr, defined)//显示【多选框】
                }
                else if (type == "2") {
                    str = this.b02(arr, defined, isother)//显示【下拉框】
                }
                else if (type == "4" || type == "5" ) {
                    str = '<input class="form-control w300" type="text" disabled="disabled" value="' + arr[0].lineAttrvalNameBind + '">'
                }
                else {
                    Tool.pre(['---===没做====---', type, arr])
                    aaaaaaaaaaaaa
                }
                return str;
            },
            //显示【下拉框】
            b02: function (js, defined, isother) {
                let str = "";
                let attrName = "", attrValue = "";
                str = '<option>请选择</option>';
                for (let i = 0; i < js.length; i++) {
                    if (js[i].lineAttrvalNameBind) {//说明绑定这个值
                        attrName = js[i].lineAttrvalNameCn;
                        attrValue = js[i].lineAttrvalNameBind;
                        str += '<option value="' + js[i].catePubAttrvalId + '" selected="selected">' + js[i].lineAttrvalNameCn + '（' + js[i].lineAttrvalName + '）</option>';
                    }
                    else {
                        str += '<option value="' + js[i].catePubAttrvalId + '">' + js[i].lineAttrvalNameCn + '（' + js[i].lineAttrvalName + '）</option>';
                    }
                }
                str = '<select class="form-select w300">' + str + '</select>'
                //defined         属性的属性值是否可以自定义修改
                //isother         是否有other属性值
                if (defined == "1" || isother == "1") {
                    str = '\
                        <table class="center">\
                            <tr><td colspan="2">' + str + '</td></tr>\
                            <tr><th>默认参数</th><th>自定义内容</th></tr>\
                            <tr><td>'+ attrName + '</td><td><input class="form-control" type="text" disabled="disabled" value="' + attrValue + '"></td></tr>\
                        </table>'
                }

                return str;
            },
            //显示【多选框】
            b03: function (js, defined) {
                //defined         属性的属性值是否可以自定义修改
                let str = ''
                for (let i = 0; i < js.length; i++) {
                    str += '\
                    <div class="form-check form-check-inline">\
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" '+ (js[i].lineAttrvalNameBind ? ' checked=""' : '') + ' disabled="disabled">\
                        <label class="form-check-label" for="inlineCheckbox3">'+ js[i].lineAttrvalNameCn + ' （' + js[i].lineAttrvalName + '）</label>\
                    </div>';
                    if (js[i].lineAttrvalNameCn == "自定义" && js[i].lineAttrvalNameBind) {
                        str += '\
                        <table class="center border">\
                            <tr><th>默认参数</th><th class="w300">自定义内容</th></tr>\
                            <tr><td>自定义</td><td><input class="form-control" type="text" disabled="disabled" value="'+ js[i].lineAttrvalNameBind + '"></td></tr>\
                        </table>';
                    }
                }
                if (defined == "1") {
                    let tr = ""
                    for (let i = 0; i < js.length; i++) {
                        if (js[i].lineAttrvalNameBind) {
                            tr += '<tr><td>' + js[i].lineAttrvalNameCn + '</td><td><input class="form-control" type="text" disabled="disabled" value="' + js[i].lineAttrvalNameBind + '"></td></tr>'
                        }
                    }
                    str += '\
                    <table class="center border">\
                        <tr><th>默认参数</th><th class="w300">自定义内容</th></tr>'+ tr + '\
                    </table>'
                }
                return str;
            },
            b04: function (Propertys) {
                let str = '', count = 0;
                for (let i = 0; i < Propertys.length; i++) {
                    if (Propertys[i]) {
                        if (count < 10) {
                            count++;
                            str += '\
				            <tr>\
					            <td class="w60">'+ count + '</td>\
					            <td><input class="form-control w300" type="text" disabled="disabled" value="'+ Propertys[i].attrName + '"></td>\
					            <td><input class="form-control w300" type="text" disabled="disabled" value="'+ Propertys[i].attrValue + '"></td>\
				            </tr>'
                        }

                    }
                }
                str = '<table class="center">' + str + '</table>'
                return '<tr><td class="right">自定义属性：</td><td>' + str + '</td></tr>'
            }
        },
        specselfDef: {
            a01: function (titleArr, attr) {
                //attr   购物车属性要在这边显示，所以写过了
                let selfvalue = []
                for (let i = 2; i < titleArr.length; i++) {
                    if (titleArr[i].name.split("==")[1] == "self") {//这就说明用了【产品规格】
                        selfvalue = titleArr[i].value;
                        break;
                    }
                }
                return this.a02(selfvalue, attr);
            },
            a02: function (selfvalue, attr) {
                let oo = [], valArr = []
                for (let i = 0; i < selfvalue.length; i++) {
                    valArr = selfvalue[i][0].split("==")
                    if (valArr[1] != "DH属性值个数不足") {
                        oo.push({
                            "attrvalName": valArr[0],
                            "attrId": 9999,
                            "attrValId": "" + (1000 + i),
                            "picUrl": selfvalue[i][1] ? selfvalue[i][1] : ""
                        })
                    }
                }
                return this.a03(oo, attr)
            },
            a03: function (oo, attr) {
                let str = '<tr><th>编号</th><th class="w300">自定义规格名称</th><th>自定义图片（JPG格式，≤5M，可不添加）</th><tr>';
                for (let i = 0; i < oo.length; i++) {
                    str += '\
                    <tr>\
                        <td>' + (i + 1) + '</td>\
                        <td><input class="form-control" type="text" disabled="disabled" value="'+ oo[i].attrvalName + '"></td>\
                        <td>'+ (oo[i].picUrl ? '<a target="_blank" href="https://image.dhgate.com/' + oo[i].picUrl + '"><img class="border" src="https://image.dhgate.com/webp/m/50x50/' + oo[i].picUrl + '" title="点击预览" width="50"></a>' : '') + '</td>\
                    <tr>'
                }
                let selfstr = '<table class="center">' + str + '</table>'
                $("#body1").append('\
                    <tr>\
                        <td class="right w150">产品规格:</td>\
                        <td class="p-0">\
                            <table class="table table-hover mb-0 align-middle">\
                                '+ this.b01(attr) + '\
                                <tr><td class="w200 right">自定义规格：</td><td>' + selfstr + '</td></tr>\
                            </table>\
                        </td>\
                    </tr>');
                return [{
                    "name": "specselfDef",
                    "value": JSON.stringify(oo)
                }];
            },
            b01: function (attr) {
                let str = ""
                for (let i = 0; i < attr.length; i++) {
                    str += '\
                    <tr>\
                        <td class="w200 right">'+ attr[i].nameCn + '（' + attr[i].name.name + '）：</td>\
                        <td>'+ this.b02(attr[i]) + '</td>\
                    <tr>'
                }

                return str
            },
            b02: function (attr) {
                //attr				为敦煌网的属性
                //attr.name			属性英文名
                //attr.nameCn  		属性中文名
                //attr.required		是否必填
                //attr.isother		是否有other属性值
                //attr.defined		属性的属性值是否可以自定义修改
                //attr.buyAttr		是否购买属性（购买时，必选项）
                //attr.ischild		是否子属性（好加事件）
                //attr.attrId		属性ID
                //attr.type			DH:1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框
                //attr.js    	    js代码  
                let str = "";
                if (attr.type == "1") {//是否购买属性（购买时，必选项）
                    str += this.b03(attr.js)
                    if (attr.defined == "1") {//属性的属性值是否可以自定义修改
                        str += this.b04(attr.js);
                    }
                }
                else {
                    Tool.pre("购买属性，应该都是多选。到不了这里。");
                    aaaaaaaaaaaaaaaaaaa
                }
                return str
            },
            b03: function (js) {
                let str = ''
                for (let i = 0; i < js.length; i++) {
                    str += '\
                    <div class="form-check form-check-inline">\
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" '+ (js[i].lineAttrvalNameBind ? ' checked="checked"' : '') + ' disabled="">\
                        <label class="form-check-label" for="inlineCheckbox3">'+ js[i].lineAttrvalNameCn + ' （' + js[i].lineAttrvalName + '） </label>\
                    </div>';
                }
                return str
            },
            b04: function (js) {
                let count = 0, str = '<tr><th class="w50">编号</th><th>默认参数</th><th class="w300">自定义内容</th><th>自定义图片（JPG格式，≤5M，可不添加）</th><tr>';
                for (let i = 0; i < js.length; i++) {
                    if (js[i].lineAttrvalNameBind) {
                        count++;
                        str += '\
                        <tr>\
                            <td>' + count + '</td>\
                            <td>' + js[i].lineAttrvalNameCn + '</td>\
                            <td><input class="form-control" type="text" disabled="disabled" value="'+ js[i].lineAttrvalNameBind + '"></td>\
                            <td>'+ (js[i].picUrl ? '<a target="_blank" href="https://image.dhgate.com/' + js[i].picUrl + '"><img class="border" src="https://image.dhgate.com/webp/m/50x50/' + js[i].picUrl + '" title="点击预览" width="50"></a>' : '') + '</td>\
                        <tr>';
                    }
                }
                return '<table class="center border">' + str + '</table>';;
            }
        },
        chooseCustomized: function () {
            $("#body1").append('\
            <tbody>\
            <tr>\
                <td class="right">是否支持定制:</td>\
                <td class="p-0">\
                    <div class="form-check form-check-inline">\
                        <input class="form-check-input" type="radio" name="chooseCustomized" disabled="disabled">\
                        <label class="form-check-label" for="inlineRadio3">是</label>\
                    </div>\
                    <div class="form-check form-check-inline">\
                        <input class="form-check-input" type="radio" name="chooseCustomized" disabled="disabled" checked="checked">\
                        <label class="form-check-label" for="inlineRadio3">否</label>\
                    </div>\
                </td>\
            </tr>\
            </tbody>');
            return [{ "name": "chooseCustomized", "value": "0" }];
        }
    }
})
