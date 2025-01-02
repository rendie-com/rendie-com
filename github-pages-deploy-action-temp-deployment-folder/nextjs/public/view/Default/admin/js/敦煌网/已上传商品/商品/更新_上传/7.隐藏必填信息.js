'use strict';
Object.assign(Tool, {
    upDHgateSeep7: {
        a01: function (itemcode, catepubid) {
            let timeStamp = Tool.gettime("");
            let str = '\
            <tr>\
				<td class="right w150">产品类目ID(catepubid)：</td>\
				<td><input class="form-control w300" type="text" disabled="disabled" value="'+ catepubid + '"></td>\
			</tr>\
            <tr>\
				<td class="right">产品编码(itemcode)：</td>\
				<td><input class="form-control w300" type="text" disabled="disabled" value="'+ itemcode + '"></td>\
			</tr>\
            <tr>\
				<td class="right">时间戳(timeStamp)：</td>\
				<td><input class="form-control w300" type="text" disabled="disabled" value="'+ timeStamp + '"></td>\
			</tr>'
            let arr = [
                {
                    "name": "catepubid",
                    "value": catepubid
                },
                {
                    "name": "itemcode",
                    "value": itemcode
                },
                {
                    "name": "timeStamp",
                    "value": timeStamp
                },
            ]

            return this.a02(arr, str)
        },
        a02: function (arr1, str01) {

            let str = '', arr2 = this.b01();
            for (let i = 0; i < arr2.length; i++) {
                str += '\
                <tr>\
					<td class="right w300">'+ arr2[i].name + '：</td>\
					<td><textarea class="form-control" disabled="disabled">'+ arr2[i].value + '</textarea></td>\
				</tr>'
            }
            str = '<table class="table table-hover align-middle"><tbody>' + str01 + str + '</tbody></table>'
            $("#body7").html(str);
            return arr1.concat(arr2);
        },
        b01: function () {
            return [
                {
                    "name": "cpsAgreeStatus",
                    "value": "1"
                },
                {
                    "name": "productJoinCps",
                    "value": "1"
                },

                {
                    "name": "functionname_avim",
                    "value": "avim"
                },
                {
                    "name": "setdiscounttype",
                    "value": "1"
                },
                {
                    "name": "functionname",
                    "value": "albu"
                },
                {
                    "name": "current_oper_index",
                    "value": "1"
                },
                {
                    "name": "prospeclist",
                    "value": "[]"
                },


                {
                    "name": "prodCustomInfo",
                    "value": "{}"
                },
                {
                    "name": "discountRange",
                    "value": "[{\"startqty\":\"1\",\"discount\":\"0\"}]"
                },
                {
                    "name": "productInventorylist",
                    "value": "[{\"class\":\"com.dhgate.syi.model.ProductInventoryVO\",\"productInventoryId\":\"\",\"quantity\":231,\"hasBuyAttr\":\"0\",\"hasSaleAttr\":\"0\",\"commonSpec\":\"0\",\"supplierid\":\"\"}]"
                },


        

            ]
        }
    }


})
