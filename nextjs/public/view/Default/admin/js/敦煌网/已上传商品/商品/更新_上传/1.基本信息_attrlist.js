'use strict';
Object.assign(Tool.upDHgateSeep1, {
    attrlist:
    {
        a01: function (attr, aliAttr1, sku0, bindattr) {
            //bindattr是什么意思？有的属性要求必填，而我们又绑定不上，但有些必填属性可以在【标题】【关键词】【类目名称】中找到，所以这个是绑定必填属性用的。
            $("#state").html("把【速卖通的属性】绑定到【敦煌网的属性】上，绑定不上的做成自定义属性");
            //速卖通属性名替换
            let aliAttr2 = [],
                attrValueArr = [];//【属性值】不能重复。如果重复了，在敦煌会报错。
            for (let i = 0; i < aliAttr1.length; i++) {
                let val = Tool.Trim(aliAttr1[i].attrValue.toLowerCase())
                if (aliAttr1[i].attrName.toLowerCase().indexOf("brand") == -1 &&//去掉品牌
                    aliAttr1[i].attrValue.toLowerCase().indexOf("brand") == -1 &&//去掉品牌
                    attrValueArr.indexOf(val) == -1 &&//去重
                    aliAttr1[i].attrValue.toLowerCase().indexOf("none") == -1 &&//因为DH不给上传
                    aliAttr1[i].attrValue.toLowerCase() != "others" &&//因为DH不给上传
                    aliAttr1[i].attrValue.toLowerCase().indexOf("aliexpress") == -1 &&//此产品为涉嫌侵犯aliexpress品牌的违规产品
                    aliAttr1[i].attrValue.toLowerCase() != "other")//因为DH不给上传
                {
                    attrValueArr.push(val)
                    aliAttr1[i].attrValue = aliAttr1[i].attrValue.replace(/ +/g, " ")//多个空格替换成一个空格,去重时会用上。
                    aliAttr1[i].attrValue = aliAttr1[i].attrValue.replace(/（/g, "(")
                    aliAttr1[i].attrValue = aliAttr1[i].attrValue.replace(/）/g, ")")
                    aliAttr2.push(aliAttr1[i]);
                }
            }
            return this.a02(attr, aliAttr2, sku0, bindattr);
        },
        //速卖通【属性值】长度大于40，放到详情中去。（因为敦煌限长度为：40）
        a02: function (attr, Propertys, sku0, bindattr) {
            let PropertysDesArr = []//【属性值】长度大于40，放到详情中去。（因为敦煌限长度为：40）
            for (let i = 0; i < Propertys.length; i++) {
                if (Propertys[i].attrValue.length > 40) {
                    PropertysDesArr.push('<div><strong>' + Propertys[i].attrName + ':</strong><span>' + Propertys[i].attrValue + '</span></div>')
                    Propertys[i] = null;
                }
            }
            return this.a03(attr, Propertys, sku0, bindattr, PropertysDesArr);
        },
        //看【属性值】来绑定【属性名】
        a03: function (attr, Propertys, sku0, bindattr, PropertysDesArr) {
            $("#state").html("把【速卖通的属性】绑定到【敦煌网的属性】上")
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
            let NewBuyAttr = [];//这个是显示时要用的。
            //i=2是为什么？答：i=1是品牌，这个可以不用管。
            //为什么不直接i=2？答：因为敦煌属性里面会出现俩个品牌，而第二个品牌就要管了。
            let valI = 1
            if (attr[1]) {//有时后，也会没有属性
                if (attr[1].name.toLowerCase() == "brand" || attr[1].name.toLowerCase() == "brand name") { valI = 2 }
            }
            for (let i = valI; i < attr.length; i++) {
                if (attr[i].buyAttr == "1") {//是否购买属性（购买时，必选项）
                    let o1 = this.b10(attr[i].name, attr[i].js, sku0)//把绑定好的，写到DH格式中去。
                    attr[i].name = { name: attr[i].name, bindSMT: o1.name };//【属性名】绑定
                    attr[i].js = o1.js
                    NewBuyAttr.push(attr[i])
                }
                else {//非购买选项
                    let o2 = this.b15(attr[i].js, Propertys);//看【属性值】来绑定【属性名】
                    if (o2.attrName) {//【属性值】是否能绑定上。注：速卖通的【属性值】，在敦煌网有，那就可以绑定上。
                        attr[i].name = { name: attr[i].name, bindSMT: o2.attrName };//【属性名】绑定
                        attr[i].js = this.b02(attr[i].js, o2.attrValue, attr[i].type, attr[i].isother, attr[i].defined, bindattr);//【属性值】绑定(注：attrValue  是一定有值的。)
                    }
                }
            }
            return this.a04(attr, Propertys, NewBuyAttr, bindattr, PropertysDesArr, valI)
        },
        //看【属性名】来绑定【属性名】
        a04: function (attr, Propertys, NewBuyAttr, bindattr, PropertysDesArr, valI) {
            //SMT的属性值，不能在敦煌【购买属性值】中
            for (let i = 0; i < Propertys.length; i++) {
                if (Propertys[i]) {
                    Propertys[i] = this.b03(NewBuyAttr, Propertys[i])
                }
            }
            return this.a05(attr, Propertys, NewBuyAttr, bindattr, PropertysDesArr, valI)
        },

        a05: function (attr, Propertys, NewBuyAttr, bindattr, PropertysDesArr, valI) {
            //为什么要俩个一样的for循环?
            //因为“看【属性值】来绑定【属性名】”时，当前敦煌属性值，没绑定上，但可能会在下一个敦煌属性值绑定上，
            //如果写到上面的for循环里，就有可能被【属性名】绑定上，而真正想绑定的没绑定上，所以写俩个for循环。
            for (var i = valI; i < attr.length; i++) {
                if (attr[i].buyAttr != "1") {//不要购买属性
                    if (!attr[i].name.name) {//不要已绑定的
                        let o1 = this.b01(attr[i].name, Propertys);//【属性名】是否能绑定上
                        $("#state").html("没绑定上的【属性值】填“Not filled”，可以提高DH评分。")
                        if (o1.attrName) {//是否绑定成功。                            
                            attr[i].name = { name: attr[i].name, bindSMT: o1.attrName };//【属性名】绑定
                            attr[i].js = this.b02(attr[i].js, o1.attrValue, attr[i].type, attr[i].isother, attr[i].defined, bindattr);//【属性值】绑定(注：attrValue  是一定有值的。)
                        }
                        else {
                            attr[i].name = { name: attr[i].name, bindSMT: false };//属性名绑定
                            attr[i].js = this.b06(attr[i].js, attr[i].type, attr[i].isother, attr[i].defined, bindattr);//没绑定上的绑“Not filled”
                        }
                    }
                }
            }
            Tool.upDHgateSeep1.showAttrList.a01(attr, Propertys)//显示属性
            return this.a06(attr, Propertys, NewBuyAttr, PropertysDesArr)
        },
        a06: function (attr, Propertys, NewBuyAttr, PropertysDesArr) {
            let o1 = [];
            for (var i = 1; i < attr.length; i++) {
                o1.push({
                    "class": "com.dhgate.syi.model.ProductAttributeVO",
                    "attrId": attr[i].attrId,
                    "attrName": attr[i].name.name,
                    "isbrand": attr[i].name.name == "BRAND" ? "1" : "0",
                    "valueList": this.b09(attr[i].js)
                })
            }
            return this.a07(o1, Propertys, NewBuyAttr, PropertysDesArr)
        },
        //自定义属性---没有绑定的都是自定义属性，超出的属性放到详情中去
        a07: function (o1, Propertys, NewBuyAttr, PropertysDesArr) {
            let o2 = [];
            for (let i = 0; i < Propertys.length; i++) {
                if (Propertys[i]) {
                    if (o2.length < 10 && Propertys[i].attrName.length<40) {
                        o2.push({
                            "class": "com.dhgate.syi.model.ProductAttributeValueVO",
                            "attrValId": 0,
                            "lineAttrvalName": Propertys[i].attrValue,
                            "lineAttrvalNameCn": "",
                            "iscustomsized": "0",
                            "picUrl": "",
                            "brandValId": "",
                            "attrId": 11,
                            "attrName": Propertys[i].attrName
                        });
                    }
                    else {
                        PropertysDesArr.push('<div><strong>' + Propertys[i].attrName + ':</strong><span>' + Propertys[i].attrValue + '</span></div>') //用不完的自定义属性，放到详情里面。
                    }
                }
            }
            return this.a08(o1, o2, PropertysDesArr, NewBuyAttr)
        },
        //自定义属性---没有绑定的都是自定义属性，超出的属性放到详情中去
        a08: function (o1, o2, PropertysDesArr, NewBuyAttr) {
            o1.push({
                "class": "com.dhgate.syi.model.ProductAttributeVO",
                "attrId": 11,
                "attrName": "",
                "isbrand": "0",
                "valueList": o2
            });
            let Narr = [
                {
                    "name": "attrlist",
                    "value": JSON.stringify(o1)
                },
                { "name": "gtin", "value": "" }
            ]
            return [Narr, PropertysDesArr, NewBuyAttr];
        },
        //属性名，是否能绑定上
        b01: function (name, Propertys) {
            let oo = {}
            for (var j = 0; j < Propertys.length; j++) {
                if (Propertys[j]) {
                    if (Tool.Trim(name.toLowerCase()) == Tool.Trim(Propertys[j].attrName.toLowerCase())) {
                        oo = Propertys[j];
                        Propertys[j] = null;//Propertys值会生效。
                        break;
                    }
                }
            }
            return oo;
        },
        //属性值绑定
        b02: function (js, SMTvalue, type, isother, defined, bindattr) {
            //type            1:多选框 2:下拉框 4:字符型输入框 5: 数值型输入框
            //defined         属性的属性值是否可以自定义修改
            //isother         是否有other属性值
            if (type == "2" || type == "1")//下拉框 || 多选框
            {
                js = this.b07(js, SMTvalue, isother, defined, bindattr)//【下拉框】绑定                    

            }
            else if (type == "4") {
                js[0] = { lineAttrvalNameBind: SMTvalue };//给第一个绑定就可以了。                    
            }
            else if (type == "5") {
                js[0] = {
                    "attrValId": 0,
                    lineAttrvalNameBind: "0"
                };
            }
            else {
                Tool.pre(["没做-----", type, js])
                aaaaaaaaaaa
            }
            return js;
        },
        b03: function (NewBuyAttr, oo) {
            for (let i = 0; i < NewBuyAttr.length; i++) {
                for (let j = 0; j < NewBuyAttr[i].js.length; j++) {
                    if (Tool.Trim(oo.attrValue.toLowerCase()) == Tool.Trim(NewBuyAttr[i].js[j].lineAttrvalName.toLowerCase())) {
                        return null;//说明要删除
                    }
                }
            }
            return oo;//说明不要删除
        },
        //没绑定上的【属性值】上“Not filled”，可以提高DH评分。
        b06: function (js, type, isother, defined, bindattr) {
            //type          1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框          
            if (type == "2" || type == "1") {
                //说明：type==1        因为要填“Not filled”，可以当成单选
                js = this.b07(js, "Not filled", isother, defined, bindattr)//【下拉框】绑定
            }
            else if (type == "4") {
                js = [{ lineAttrvalNameBind: "Not filled" }]
            }
            else if (type == "5") {
                js = [
                    {
                        "attrValId": 0,
                        lineAttrvalNameBind: "0"
                    }
                ]
            }
            else {
                Tool.pre(['====没做======', type]);
                aaaaaaaaaaaaaaaaaaaaaaaa
            }
            return js;
        },
        //【下拉框】绑定(单选的意思)
        b07: function (js, SMTvalue, isother, defined, bindattr) {
            let isArr = this.b12(SMTvalue, js)//正常【属性值】绑定。
            if (isArr) {
                js = isArr;
                if (isother == "1") {//是否有other属性值
                    js.push({ attrValId: 0, lineAttrvalName: "Customize", lineAttrvalNameCn: "自定义" })//显示时要用
                }
            }
            else {
                if (isother == "1") {//是否有other属性值
                    js.push({ attrValId: 0, lineAttrvalName: "Customize", lineAttrvalNameCn: "自定义", lineAttrvalNameBind: SMTvalue })
                }
                else {
                    if (defined == "1")//是否自定义
                    {
                        js[0].lineAttrvalNameBind = SMTvalue;//给第一个绑定就可以了。
                    }
                    else {
                        //不能自定义，也没other属性值
                        $("#state").html("不能自定义，也没other属性值,那就从【bindattr】中去找，看有没有差不多的。(表示：不给自定义，也没有其它属性值，还需选一个)")
                        js = this.b13(js, bindattr, SMTvalue)
                    }
                }
            }
            return js;
        },
        b09: function (js) {
            let oo = [];
            for (let i = 0; i < js.length; i++) {
                if (js[i].lineAttrvalNameBind) {
                    oo.push({
                        "class": "com.dhgate.syi.model.ProductAttributeValueVO",
                        "attrValId": js[i].attrValId,
                        "lineAttrvalName": js[i].lineAttrvalNameBind,
                        "lineAttrvalNameCn": "",
                        "iscustomsized": "0",
                        "picUrl": "",
                        "brandValId": ""
                    })
                }
            }
            return oo;
        },
        //把绑定好的，写到DH格式中去。
        b10: function (name, js, sku0) {
            let attrName = "", attrValue = []
            for (let i = 2; i < sku0.length; i++) {
                let arr = sku0[i].name.split("==")
                if (name == arr[1]) {
                    attrName = arr[0];
                    attrValue = sku0[i].value
                    break;
                }
            }
            return this.b11(attrName, js, attrValue)
        },
        b11: function (name, js, attrValue) {
            for (let i = 0; i < js.length; i++) {
                let lineAttrvalNameBind = "", picUrl = "";
                for (let j = 0; j < attrValue.length; j++) {
                    let arr = attrValue[j][0].split("==")
                    if (js[i].lineAttrvalName == arr[1]) {
                        lineAttrvalNameBind = arr[0];
                        picUrl = attrValue[j][1];
                        break;
                    }
                }
                if (lineAttrvalNameBind) js[i].lineAttrvalNameBind = lineAttrvalNameBind;
                if (picUrl) js[i].picUrl = picUrl;
            }
            return { name: name, js: js }
        },
        //单选--正常【属性值】绑定。
        b12: function (name, js) {
            let isbool = false;
            for (let i = 0; i < js.length; i++) {
                if (Tool.Trim(name.toLowerCase()) == Tool.Trim(js[i].lineAttrvalName.toLowerCase())) {
                    isbool = true;
                    js[i].lineAttrvalNameBind = js[i].lineAttrvalName;
                    break;
                }
            }
            return (isbool ? js : false)
        },
        //不给自定义，也没有其它属性值，还需选一个（单选）
        b13: function (js, bindattr, SMTvalue) {
            let isbool = false, str = Tool.Trim(bindattr.toLowerCase());
            for (let i = 0; i < js.length; i++) {
                if (str.indexOf(Tool.Trim(js[i].lineAttrvalName.toLowerCase())) != -1) {
                    isbool = true;
                    js[i].lineAttrvalNameBind = js[i].lineAttrvalName;
                    break;
                }
            }
            ///////////////////////
            if (!isbool) {//还是没绑定上就用第一个吧(注：绑定这个没什么用，但必选项我就选第一个)
                js[0].lineAttrvalNameBind = SMTvalue;
            }
            return js;
        },
        //看【属性值】来绑定【属性名】
        b15: function (js, Propertys) {
            let oo = {}
            for (var j = 0; j < Propertys.length; j++) {
                if (Propertys[j]) {
                    let isbool = this.b16(js, Propertys[j].attrValue);
                    if (isbool) {
                        oo = Propertys[j];
                        Propertys[j] = null;//Propertys值会生效。
                        //break;为什么不要【break】？因为敦煌本来是单选，但SMT有二个以上的值能匹配，那SMT的值只能留一个，如果想则敦煌要报错。
                    }
                }
            }
            return oo;
        },
        //js中有没有attrValue
        b16: function (js, attrValue) {
            let isbool = false;
            for (let i = 0; i < js.length; i++) {
                if (Tool.Trim(js[i].lineAttrvalName.toLowerCase()) == Tool.Trim(attrValue.toLowerCase())) {
                    isbool = true;
                    break;
                }
            }
            return isbool;
        }
    }

})
