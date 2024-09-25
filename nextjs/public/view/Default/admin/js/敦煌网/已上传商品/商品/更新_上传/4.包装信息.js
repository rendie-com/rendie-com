'use strict';
Object.assign(Tool, {
    upDHgateSeep4: {
        a01: function () {
            let str = '\
            <tbody>\
                <tr>\
					<td class="right w150">包装后重量：</td>\
					<td>'+ this.b01() + '</td>\
				</tr>\
                <tr>\
					<td class="right w150">包装后尺寸：</td>\
					<td>'+ this.b02() + '</td>\
				</tr>\
            </tbody>';
            $("#body4").html(str);
            return this.a02()
        },
        a02: function () {
            return [
                /////包装后重量////////////////////////////////
                {
                    "name": "productweight",
                    "value": "0.1"
                },
                {
                    "name": "baseqt",
                    "value": ""
                },
                {
                    "name": "stepqt",
                    "value": ""
                },
                {
                    "name": "stepweight",
                    "value": ""
                },
                ////////////////////////////////////////
                {
                    "name": "sizelen",
                    "value": "20.0"
                },
                {
                    "name": "sizewidth",
                    "value": "20.0"
                },
                {
                    "name": "sizeheight",
                    "value": "30.0"
                }
            ]
        },
        b01: function () {
            let str = '<table>\
            <tr>\
                <td><input name="productweight" value="0.1" disabled="disabled" class="form-control w100" type="text"></td>\
                <td> 公斤（KG）</td>\
            </tr>\
            </table>'
            return str;
        },
        b02: function () {
            let str = '\
            <table>\
            <tr>\
                <td><input class="form-control w100" type="text" disabled="disabled" value="20"></td>\
                <td> * </td>\
                <td><input class="form-control w100" type="text" disabled="disabled" value="20"></td>\
                <td> * </td>\
                <td><input class="form-control w100" type="text" disabled="disabled" value="30"></td>\
                <td> 单位均为：厘米</td>\
            </tr>\
            </table>'
            return str;
        }
    }
})
