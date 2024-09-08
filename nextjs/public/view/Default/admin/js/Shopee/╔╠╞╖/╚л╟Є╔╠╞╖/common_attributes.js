'use strict';
Object.assign(Tool, {
    attributes://商品属性
    {
        a01: function (fromid, attr_1688, next, This, t) {
            let oo = {
                attr_1688: attr_1688,
                next: next,
                This: This,
                t: t
            }
            this.a02(fromid, oo)
        },
        a02: function (fromid, oo) {
            let data = [{
                action: "sqlite",
                database: "shopee/类目/类目",
                sql: "select @.upid as upid FROM @.table where @.fromid=" + fromid,
            }, {
                action: "sqlite",
                database: "shopee/类目/属性",
                sql: "select @.json as json FROM @.table where @.cateId=" + fromid,
            }]
            $("#state").html("正在获取【shopee】类目路径和叶子类目属性。。。");
            oo.category_path = [fromid]
            Tool.ajax.a01(data, this.a03, this, oo)
        },
        a03: function (t, oo) {
            oo.category_path.unshift(t[0][0].upid)
            oo.attributes = JSON.parse(t[1][0].json)
            this.a04(oo)
        },
        a04: function (oo) {
            let data = [{
                action: "sqlite",
                database: "shopee/类目/类目",
                sql: "select @.upid as upid FROM @.table where @.fromid=" + oo.category_path[0],
            }]
            Tool.ajax.a01(data, this.a05, this, oo)
        },
        a05: function (t, oo) {
            if (t[0][0].upid == 0) {
                this.d01(oo)
            }
            else {
                oo.category_path.unshift(t[0][0].upid)
                this.a04(oo)
            }
        },

        d01: function (oo) {
            $("#state").html("正在提取叶子类目属性，的重要属性，好去绑定【attr】段内容。。。");
            let attr_shopee = [], arr1 = oo.attributes, arr2, arr3, arr4
            ////////////////////////////////////////////////
            for (let i = 0; i < arr1.length; i++) {
                arr2 = arr1[i].children; arr3 = []; arr4 = [];
                for (let j = 0; j < arr2.length; j++) {
                    arr3.push(arr2[j].display_name);//属性【值】名称
                    arr4.push(arr2[j].value_id);//属性【值】ID
                }
                attr_shopee.push({
                    "attrName": arr1[i].display_name,
                    "attrValue": [arr3, arr4],
                    "mandatory": arr1[i].mandatory,//是否必填
                    "id": arr1[i].attribute_id,
                    "input_type": arr1[i].attribute_info.input_type,//1：单选（不可自定义）	   2：单选(可自定义)	 	3：文本框		 5：多选
                    "input_validation_type": arr1[i].attribute_info.input_validation_type//2:可以用数字和字母    3：只能用数字    
                })
                /*
                    input_type的值有：1，2，3，5                    1：单选（不可自定义）	   2：单选(可自定义)	 	3：文本框		 5：多选
                    input_validation_type的值有：0，2，3            2：可以用数字和字母        3：只能用数字    
                */
            }
            this.d02(attr_shopee, oo)

        },
        d02: function (attr_shopee, oo) {
            //思路：在字段【attr_1688】填上绑定好的ID。不管必填属性
            let attrNameId, attrValueIdArr, attr_1688 = this.b03(oo.attr_1688), isErr = false;//删除没用的属性
            for (let i = 0; i < attr_1688.length; i++) {
                attrNameId = "未绑定";
                attrValueIdArr = []
                for (let j = 0; j < attr_shopee.length; j++) {
                    if (this.b08(attr_shopee[j].attrName, attr_1688[i].name))//属性名称是否能绑定
                    {
                        //属性名称绑定成功
                        attrNameId = attr_shopee[j].id;
                        //去绑定属性【值】
                        attrValueIdArr = this.b04(attr_shopee[j].attrName, attr_shopee[j].attrValue, attr_1688[i].values, attr_shopee[j].input_type, attr_shopee[j].input_validation_type);
                        //console.log(attrValueIdArr,attr_shopee[j])
                        if (attrValueIdArr == false) {
                            Tool.pre([
                                "属性名：" + attr_shopee[j].attrName,
                                "-----------------------------------------------------------",
                                attr_shopee[j].attrValue,
                                "-----------------------------------------------------------",
                                attr_1688[i].values,
                                "-----------------------------------------------------------",
                                "input_type:" + attr_shopee[j].input_type,
                                "input_validation_type:" + attr_shopee[j].input_validation_type,
                                "属性值,想绑定,绑定不了，请查看原因。"
                            ])
                            isErr = true;
                        }
                        break;
                    }
                }
                attr_1688[i].bindShopee = {
                    attrNameId: attrNameId,
                    attrValueIdArr: attrValueIdArr
                }
            }
            if (isErr) {
                //Tool.at("属性值,想绑定,绑定不了，请查看原因。")
                //oo.next.apply(oo.This, ["属性值,想绑定,绑定不了，请查看原因。", oo.t]);
            }
            else {
                oo.attr_1688 = attr_1688;//注：这个要填写,如果不写【1688没用的属性】会进来。
                this.d03(attr_shopee, oo)
            }
        },
        //取出必填属性
        d03: function (attr_shopee1, oo) {
            let attr_shopee2 = []
            for (let i = 0; i < attr_shopee1.length; i++)//取出必填属性
            {
                if (attr_shopee1[i].mandatory == true)//表示必填属性
                {
                    attr_shopee2.push(attr_shopee1[i])
                }
            }
            this.d04(attr_shopee2, oo);
        },
        //已绑定好的属性里，没有必填属性，就写入到已绑定好的属性里
        d04: function (attr_shopee2, oo) {
            //attr_shopee2      表示shopee必填属性
            let isErr = false, attr_1688 = oo.attr_1688, _1688Bind = []
            for (let i = 0; i < attr_shopee2.length; i++) {
                let isBind = false;//是否绑定过了
                for (let j = 0; j < attr_1688.length; j++) {
                    if (this.b08(attr_shopee2[i].attrName, attr_1688[j].name)) {
                        isBind = true;
                        break;
                    }
                }
                if (!isBind) {//如果没绑定就进来,一定要绑定一个，因为是【必填属性】。
                    let o1 = this.b05(attr_shopee2[i])//必填属性  必需要给个值
                    if (o1 == false) {
                        Tool.pre([attr_shopee2[i], "---------------", attr_1688])
                        isErr = true;
                        break;
                    }
                    else {
                        _1688Bind.push(o1);
                    }
                }
            }
            oo.attr_1688 = attr_1688.concat(_1688Bind)
            if (isErr) {
                oo.next.apply(oo.This, ["必填属性,必需要给一个值。", oo.t]);
            }
            else {
                this.d05(oo);
            }
        },
        d05: function (oo)//做成post提交的json
        {
            let arr = [], description = "", o1
            for (let i = 0; i < oo.attr_1688.length; i++) {
                o1 = oo.attr_1688[i].bindShopee
                if (o1.attrNameId == "未绑定")//写到【商品描述】中去
                {
                    description += "✅ " + oo.attr_1688[i].name + ":" + oo.attr_1688[i].value + "\n"
                }
                else if (o1.attrValueIdArr.length > 0)//说明绑定成功的
                {
                    if (o1.attrValueIdArr[0].raw_value)//说明是自定义的属性
                    {
                        for (let j = 0; j < o1.attrValueIdArr.length; j++) {
                            if (o1.attrValueIdArr[j])//单选自定义，该值是空。否则就是多选自定义。
                            {
                                arr.push({
                                    attribute_id: o1.attrNameId,
                                    custom_value: {
                                        raw_value: o1.attrValueIdArr[j].raw_value,
                                        unit: ""
                                    }
                                })
                            }
                        }
                    }
                    else {
                        //说明是单选，的绑定
                        arr.push({
                            attribute_id: o1.attrNameId,
                            attribute_value_id: o1.attrValueIdArr[0]
                        })
                    }
                }
                else {
                    Tool.pre(["有错误", attr])
                }
            }
            /////////////////////////////////////////////////
            let o2 = {
                attributes: this.b06(arr),//去重复
                category_path: oo.category_path,
                description: description.replace(/\\\\/g, " ")
            }
            oo.next.apply(oo.This, [o2, oo.t]);
        },
        b03: function (arr)//删除没用的属性
        {
            let nArr = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].name == "主要下游平台" ||
                    arr[i].name == "货号" ||
                    arr[i].name == "主要销售地区" ||
                    arr[i].name == "品牌" ||
                    arr[i].name == "产地" ||
                    arr[i].name == "是否跨境出口专供货源" ||
                    arr[i].name == "有可授权的自有品牌" ||
                    arr[i].name == "是否专利货源" ||
                    arr[i].name == "是否进口" ||
                    arr[i].name == "是否IP授权" ||
                    arr[i].name == "加工定制" ||
                    arr[i].name == "销售序列号" ||
                    arr[i].name == "是否有版权或专利" ||
                    arr[i].name == "是否跨境电商货源" ||
                    arr[i].name == "加印LOGO" ||
                    arr[i].name == "品牌类型" ||
                    arr[i].name == "是否外贸" ||
                    arr[i].name == "货源类别" ||
                    arr[i].name == "贸易属性" ||
                    arr[i].name == "专利" ||
                    arr[i].name == "是否专供外贸" ||
                    arr[i].name == "外贸类型" ||
                    arr[i].name == "专利类型" ||
                    arr[i].name == "外贸出口认证" ||
                    arr[i].name == "质检报告编号" ||
                    arr[i].name == "是否库存" ||
                    arr[i].name == "库存类型" ||
                    arr[i].name == "是否跨境货源" ||
                    arr[i].name == "跨境风格类型" ||
                    arr[i].name == "主要下游销售地区1" ||
                    arr[i].name == "主要下游销售地区2" ||
                    arr[i].name == "价格段" ||
                    arr[i].name == "版权" ||
                    arr[i].name == "是否支持一件代发" ||
                    arr[i].name == "售后服务" ||
                    arr[i].name == "最快出货时间" ||
                    arr[i].name == "加工方式" ||
                    arr[i].value == "无" ||
                    arr[i].value == "其它" ||
                    arr[i].value == "其他" ||
                    arr[i].value == "null" ||
                    arr[i].value == "-" ||
                    arr[i].value == "-1" ||
                    arr[i].name == "订" ||
                    arr[i].name == "生产编号" ||
                    arr[i].name == "产品编号" ||
                    arr[i].name == "是否定制" ||
                    arr[i].name == "源头厂家" ||
                    arr[i].name == "服务保障" ||
                    arr[i].name == "发货时效" ||
                    arr[i].name == "上市年份/季节" ||
                    arr[i].name == "样品或现货" ||
                    arr[i].name == "是否工厂厂家直销货源" ||
                    arr[i].name == "logo" ||
                    arr[i].name == "logo" ||
                    arr[i].name == "logo") {
                    //不要这个
                }
                else {
                    nArr.push(arr[i]);
                }
            }
            return nArr;
        },
        b04: function (attrName, attr_shopeeArr, attr_1688Arr, input_type, input_validation_type)//属性【值】绑定
        {
            //attr_shopeeArr 表示shopee的attr表的属性值
            //attr_1688Arr 表示1688的attr属性值
            //input_type			1：单选（不可自定义）	   2：单选(可自定义)	 	3：文本框		 5：多选
            //input_validation_type的值有：0，2，3           2： 可以用数字和字母    3：只能用数字 
            let val;
            if (attr_1688Arr.length == 1) { attr_1688Arr = attr_1688Arr[0].split("/"); }//有可能是【/】分隔的。
            if (attr_1688Arr.length == 0) { attr_1688Arr = ["更新中"]; }//1688属性值为空的也有。
            for (let i = 0; i < attr_1688Arr.length; i++)//1688的attr属性值
            {
                attr_1688Arr[i] = this.b07(attrName, attr_1688Arr[i])//属性名转换
                val = "未绑定";
                for (let j = 0; j < attr_shopeeArr[0].length; j++)//示shopee的attr表的属性值
                {
                    if (attr_1688Arr[i] == attr_shopeeArr[0][j].toLowerCase()) {
                        attr_1688Arr[i] = "已绑定-这个值不要了"
                        val = attr_shopeeArr[1][j];
                        break;
                    }
                }
                ////////////////////////////////////////////////////
                if (val == "未绑定" && input_type == 5)//多选
                {
                    //自定义属性,填入。
                    attr_1688Arr[i] = {
                        raw_value: attr_1688Arr[i],
                        unit: ""
                    }
                    break;
                }
                else if (val == "未绑定" && input_type == 3)//文本框
                {
                    if (input_validation_type == 3)//3：只能用数字 
                    {
                        attr_1688Arr[i] = { "raw_value": "0" + (attr_1688Arr[i].replace(/[^\d]/g, "")), "unit": "" }
                    }
                    else {
                        attr_1688Arr[i] = {
                            "raw_value": attr_1688Arr[i],
                            "unit": ""
                        }
                    }

                    break;
                }
                else if (val == "未绑定" && input_type == 1)//单选(不可自定义)
                {
                    attr_1688Arr = false;
                    break;
                }
                else if (val == "未绑定" && input_type == 2)//单选(可自定义)
                {
                    if (i == 0) {
                        attr_1688Arr[i] = { "raw_value": attr_1688Arr[i], "unit": "" }
                    }
                    else { attr_1688Arr[i] = null; }//单选，后面的没用
                }
                else if (val == "未绑定") {
                    attr_1688Arr = false;
                    break;
                }
                else {
                    attr_1688Arr[i] = val;
                    break;
                }
            }
            return attr_1688Arr;
        },
        b05: function (o1)//必填属性  必需要给一个值
        {
            let o2 = {};
            for (let i = 0; i < o1.attrValue[0].length; i++) {
                if (
                    (o1.attrName == "性别" && o1.attrValue[0][i] == "男女皆宜") ||
                    (o1.attrName == "保修期限" && o1.attrValue[0][i] == "无保修") ||
                    (o1.attrName == "商品类型" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "饰品套装" && o1.attrValue[0][i] == "否") ||
                    (o1.attrName == "项链/手链款式" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "家庭护理用品种类" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "耳环款式" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "材质" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "纸巾种类" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "手套类型" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "短款上衣" && o1.attrValue[0][i] == "否") ||
                    (o1.attrName == "加大码" && o1.attrValue[0][i] == "否") ||
                    (o1.attrName == "图案" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "腰线高度" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "泳衣种类" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "衣领" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "收纳类型" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "季节装饰" && o1.attrValue[0][i] == "否") ||
                    (o1.attrName == "连衣裙/裙子长度" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "连衣裙/裙子款式" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "场合" && o1.attrValue[0][i] == "其他") ||
                    (o1.attrName == "保质期" && o1.attrValue[0][i] == "1个月") ||
                    (o1.attrName == "xxxxxx" && o1.attrValue[0][i] == "xxxxxxxxx") ||
                    (o1.attrName == "xxxxxx" && o1.attrValue[0][i] == "xxxxxxxxx") ||
                    (o1.attrName == "xxxxxx" && o1.attrValue[0][i] == "xxxxxxxxx") ||
                    (o1.attrName == "xxxxxx" && o1.attrValue[0][i] == "xxxxxxxxx") ||
                    (o1.attrName == "xxxxxx" && o1.attrValue[0][i] == "xxxxxxxxx") ||
                    (o1.attrName == "xxxxxx" && o1.attrValue[0][i] == "xxxxxxxxx") ||
                    (o1.attrName == "原产地" && o1.attrValue[0][i] == "中国大陆")
                ) {
                    o2.bindShopee = {
                        msg: "说明：必填属性  必需要给一个值。(这句只是个说明，可以删除。)",
                        attrNameId: o1.id,
                        attrValueIdArr: [o1.attrValue[1][i]]
                    }
                    break;
                }
            }

            if (!o2.bindShopee) {
                o2 = false
            }
            return o2;
        },
        b06: function (arr1)//去重复
        {
            let arr2 = [], arr3 = []
            for (let i = 0; i < arr1.length; i++) {
                if (arr2.indexOf(arr1[i].attribute_id) == -1) {
                    arr2.push(arr1[i].attribute_id);
                    arr3.push(arr1[i])
                }
            }
            return arr3
        },
        b07: function (attrName, val) {
            if (attrName == "性别") {
                switch (val) {
                    case "女式":
                    case "女士":
                        val = "女"; break;
                    case "男式": val = "男"; break;
                    case "儿童":
                    case "男女通用":
                    case "男士女士":
                    case "情侣式":
                    case "通用":
                        val = "男女皆宜";
                        break;
                }
            }
            return val;
        },
        //属性名转换
        b08: function (attrName_shopee, attrName_1688) {
            if (attrName_shopee == "性别") {
                switch (attrName_1688) {
                    case "适用人群": attrName_1688 = "性别"; break;
                }
            }
            return attrName_shopee == attrName_1688;
        },
    },
})
// let txt = '{\
//     "category_path":[\
//     <r:type db="sqlite.shopee" where=" where @.fromid='+ fromid + '" size=1>\
//         <r:type db="sqlite.shopee" where=" where @.fromid=<:upid/>" size=1>\
//             <r:type db="sqlite.shopee" where=" where @.fromid=<:upid/>" size=1>\
//                 <r:type db="sqlite.shopee" where=" where @.fromid=<:upid/>" size=1>\
//                     <:fromid/>,\
//                 </r:type>\
//                 <:fromid/>,\
//             </r:type>\
//             <:fromid/>,\
//         </r:type>\
//         <:fromid/>\
//     </r:type>],\
//     <r:attr db="sqlite.shopee" where=" where @.cateId='+ fromid + '">\
//         "attributes":<:json tag=0/>\
//     </r:attr>\
// }'