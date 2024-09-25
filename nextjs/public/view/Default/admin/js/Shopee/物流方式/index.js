'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile     表示选择JS文件        
        //obj.params.site       站点
        switch (obj.params.jsFile) {
            case "js01": Tool.scriptArr(['admin/js/Shopee/物流方式/获取shopee的【物流方式】.js']); break;
            default: this.a02();
        }
    },
    a02: function () {
        let data = [{
            action: "sqlite",
            database: "shopee/物流方式",
            sql: "select "+Tool.fieldAs("id,name,cn_name,currency_unit,currency_symbol,description,cargo_types")+" FROM @.table"+(obj.params.site?" where @.id=" + obj.params.site:""),
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let arr1 = t[0];
        let html = "", platform = [];
        for (let i = 0; i < arr1.length; i++) {
            html += '\
            <tr>\
                <td>'+ arr1[i].name + '</td>\
                <td>'+ arr1[i].cn_name + '</td>\
                <td>'+ arr1[i].currency_unit + '</td>\
                <td>'+ arr1[i].currency_symbol + '</td>\
                <td class="p-0">'+ this.b03(arr1[i].cargo_types, arr1[i].description, arr1[i].cn_name) + '</td>\
            </tr>';
            platform.push([arr1[i].id, arr1[i].cn_name])
        }
        html = '\
        <header class="panel-heading">Shopee &gt; 物流方式</header>\
		<div class="p-2">\
			<table class="table center align-middle table-striped">\
				<thead class="table-light">'+ this.b01(platform) + '</thead>\
				<tbody>'+ html + '</tbody>\
			</table><div class="p-2 m-2">Shopee普货指的是尺寸和重量都较小的商品，而特货则是指尺寸和重量较大的商品。</div>\
		</div>'
        Tool.html(null, null, html)
    },
    ////////////////////////////////////////////////////////////////////
    b01: function (platform) {

        let html = '\
        <tr>\
            <th style="padding-left:25px;position: relative;">'+ this.b02() + '国家代码</th>\
            <th class="p-0">'+ this.b07(obj.params.site, platform) + '</th>\
            <th>货币单位</th>\
            <th>货币符号</th>\
            <th></th>\
        </tr>'
        return html;
    },
    b02: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
            <li onClick="Tool.openR(\'?jsFile=js01\');"><a class="dropdown-item pointer">*获取shopee的【物流方式】</a></li>\
		</ul>'
    },
    b03: function (cargo_types, description, cn_name) {
        //开始---站点
        let arr1 = []
        cargo_types = JSON.parse(cargo_types);
        for (let i = 0; i < cargo_types.length; i++) {
            arr1[i] = '\
            <tr>\
                <td>' + cn_name + "(" + cargo_types[i].cn_name + ')</td>\
                <td class="p-0">'+ this.b04(cargo_types[i].channels) + '</td>\
            </tr>'
        }
        return '\
        <table class="table mb-0 table-bordered align-middle">\
            <tr class="table-light">\
                <td>站点</td>\
                <td>物流方案</td>\
            </tr>\
           '+ arr1.join("") + '\
        </table>' + (description ? '<div class="m-2 left">说明：' + description + '</div>' : "")
    },
    b04: function (channels) {
        let str = '\
        <tr class="table-light">\
            <td>渠道</td>\
            <td>地区费用（* 当地货币）</td>\
        </tr>'
        for (let i = 0; i < channels.length; i++) {
            str += '\
            <tr>\
                <td>' + channels[i].cn_name + '</td>\
                <td class="p-0 w500">'+ this.b05(channels[i].zones) + '</td>\
            </tr>'
        }
        return '<table class="table mb-0 align-middle table-hover">' + str + '</table>';
    },
    b05: function (zones) {
        let str = '\
        <tr class="table-light">\
            <td>地区</td>\
            <td>跨境物流成本（藏价） </td>\
            <td>买家支付运费</td>\
        </tr>'
        //目的：同一列相同则合并。
        //解决方法：想像成一个二维数组，把要填“rowspan属性”算出来，然后再去显示。
        let nArr = [], seller_I = 0, seller_rowspan = 0, buyer_I = 0, buyer_rowspan = 0;
        for (let i = 0; i < zones.length; i++) {
            nArr[i] = {
                name: zones[i].name,
                seller: this.b06(zones[i].fee_modes, "Seller"),
                buyer: this.b06(zones[i].fee_modes, "Buyer"),
            }
            ///////////////////////////////////////////
            if (nArr[i].seller == nArr[seller_I].seller) {
                seller_rowspan++//相同计数
            }
            else {
                nArr[seller_I].seller_rowspan = seller_rowspan;
                seller_rowspan = 1;
                seller_I = i;
            }
            ///////////////////////////////////////
            if (nArr[i].buyer == nArr[buyer_I].buyer) {
                buyer_rowspan++//相同计数
            }
            else {
                nArr[buyer_I].buyer_rowspan = buyer_rowspan;
                buyer_rowspan = 1;
                buyer_I = i;
            }
            ////////////////////////////////////
        }
        nArr[seller_I].seller_rowspan = seller_rowspan;
        nArr[buyer_I].buyer_rowspan = buyer_rowspan;
        /////////////////////////////////////////////
        for (let i = 0; i < nArr.length; i++) {
            str += '\
             <tr>\
                 <td>'+ nArr[i].name + '</td>' +
                (nArr[i].seller_rowspan ? '<td rowspan=' + nArr[i].seller_rowspan + '>' + nArr[i].seller + '</td>' : '') +
                (nArr[i].buyer_rowspan ? '<td rowspan=' + nArr[i].buyer_rowspan + '>' + nArr[i].buyer + '</td>' : '') + '\
             </tr>'
        }
        return '<table class="table mb-0 align-middle table-bordered">' + str + '</table>';
    },
    b06: function (arr, type) {
        let nArr = [], Flat = "";
        arr.sort(function (a, b) {
            return a.start_weight - b.start_weight;
        });
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].type == type) {
                if (arr[i].start_weight != null) {
                    nArr.push(
                        (
                            arr[i].end_weight ?
                                (
                                    arr[i].start_weight ?
                                        arr[i].start_weight + 'g ~ ' + arr[i].end_weight + 'g : ' :
                                        '&lt;=' + arr[i].end_weight + 'g : '
                                ) :
                                (
                                    arr[i].start_weight ?
                                        '&gt;' + arr[i].start_weight + "g : " : ''
                                )
                        ) +
                        (
                            arr[i].original_fee ?
                                arr[i].original_fee :
                                arr[i].increment_amount + '/' + arr[i].increment_unit + "g"
                        )
                    )
                }
                else {
                    Flat = arr[i].original_fee
                }
            }
        }
        return nArr.join("<hr/>") + Flat
    },
    b07: function (val, arr) {
        let nArr = [];
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + arr[i][0] + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + arr[i][1] + '</option>');
        }
        return '\
        <select onChange="Tool.open(\'site\',this.options[this.selectedIndex].value)" class="form-select">\
			<option value="">站点</option>\
            ' + nArr.join("") + '\
		</select>'
    },
}
fun.a01();