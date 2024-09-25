'use strict';
var fun =
{
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页  
        obj.params.site = obj.params.site ? obj.params.site : 'tw'
        this.a02();
    },
    a02: function () {
        let data = [{
            action: "sqlite",
            database: "shopee/订单",
            sql: "select count(1) as total FROM @.table where @.site='" + obj.params.site + "'",
        }, {
            action: "sqlite",
            database: "shopee/订单",
            sql: "select " + Tool.fieldAs("payby_date,order_sn,actual_carrier,total_price,status,auto_cancel_arrange_ship_date,escrow_release_time,payment_method,order_items,buyer_user,create_time,shipping_confirm_time") + " FROM @.table where @.site='" + obj.params.site + "' order by @.create_time desc" + Tool.limit(10, obj.params.page),
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (arr) {
        let tr = [], t = arr[1]
        for (let i = 0; i < t.length; i++) {
            tr.push('\
            <tr>\
                <td class="p-0">'+ this.b07(t[i].order_sn, JSON.parse(t[i].buyer_user)) + '</td>\
                <td class="p-0">'+ this.b03(JSON.parse(t[i].order_items)) + '</td>\
                <td>'+ this.b04(obj.params.site) + t[i].total_price + '<br/>' + this.b05(t[i].payment_method) + '</td>\
                <td>'+ Tool.status_time(t[i].status, t[i].auto_cancel_arrange_ship_date, t[i].escrow_release_time, t[i].payby_date) + '</td>\
                <td>'+ t[i].actual_carrier + '</td>\
                <td class="p-0">'+ this.b06(t[i].create_time, t[i].shipping_confirm_time) + '</td>\
            </tr>')
        }
        let html = '\
        <header class="panel-heading">Shopee &gt; 订单</header>\
		<div class="p-2">\
            '+ Tool.header3(obj.params.jsFile, obj.params.site) + '\
			<table class="table align-top table-hover">\
				<thead class="table-light">'+ this.b01() + '</thead>\
                <tbody>'+ tr.join("") + '</tbody>\
			</table>\
            ' + Tool.page(arr[0][0].total, 10, obj.params.page) + '\
		</div>'
        Tool.html(null, null, html)
    },
    b01: function () {
        let html = '\
        <tr>\
            <th style="padding-left:30px;position: relative;" class="w200">'+ this.b02() + '订单编号</th>\
            <th>商品</th>\
            <th class="w150">买家支付金额</th>\
            <th>状态 | 发货时限</th>\
            <th class="w150">物流渠道</th>\
            <th class="w150">时间</th>\
        </tr>'
        return html;
    },
    b02: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
	        <li onClick="Tool.openR(\'?jsFile=js01&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*获取订单信息</a></li>\
        </ul>'
    },
    b03: function (arr) {
        let rArr = []
        for (let i = 0; i < arr.length; i++) {
            let td1 = '\
            <a href="https://s-cf-sg.shopeesz.com/file/' + arr[i].product.images[0] + '" target="_blank">\
                <img src="https://s-cf-sg.shopeesz.com/file/' + arr[i].product.images[0] + '_tn" class="img-fluid rounded">\
            </a>'
            rArr.push('\
            <tr>\
                <td class="w80 p-1" rowspan="2">' + td1 + '</td>\
                <td colspan="8">' + arr[i].product.name + '</td>\
            </tr>\
            <tr>\
                <td class="right w50">编码:</td>\
                <td class="w100">' + arr[i].item_model.sku + '</td>\
                <td class="right w50">数量:</td>\
                <td class="w50">' + arr[i].amount + '</td>\
                <td class="right w50">价格:</td>\
                <td class="w70">' + arr[i].order_price + ' </td>\
                <td class="right w50">规格:</td>\
                <td>' + arr[i].item_model.name + '</td>\
            </tr>\
           ')
        }
        return '<table class="table table-bordered align-middle mb-0">' + rArr.join("") + '</table>'
    },
    b04: function (site) {
        let unit = "未开发"
        switch (site) {
            case "my": unit = "RM"; break;
            case "br": unit = "R$"; break;
            case "tw": unit = "NT$"; break;
        }
        return unit;
    },
    b05: function (payment_method) {
        let str = "未开发:" + payment_method
        switch (payment_method) {
            case 1: str = "信用卡/银行卡"; break;
            case 6: str = "Cash on Delivery"; break;
            case 18: str = "Credit Card/Debit Card"; break;
            case 23: str = "Credit Card"; break;
            case 27: str = "ShopeePay"; break;
            case 33: str = "JKO Pay"; break;
            case 4:
            case 37:
                str = "网上银行"; break;
            case 100:
            case 79:
                str = "Pix"; break;
        }
        return '<font color="#8c8c8c">' + str + '</font>';
    },
    b06: function (create_time, shipping_confirm_time) {
        return '\
        <table class="table table-bordered align-middle mb-0">\
        <tr><td title="下单时间">' + Tool.js_date_time2(create_time) + '</td></tr>\
        <tr><td title="确认时间">' + Tool.js_date_time2(shipping_confirm_time) + '</td></tr>\
        </table>'
    },
    b07: function (order_sn, buyer_user) {
        return '\
        <table class="table table-bordered mb-0 center">\
            <tr><td><a href="javascript:" onclick="Tool.open5(\'js02\',\''+ order_sn + '\')">' + order_sn + '</a></td></tr>\
            <tr>\
                <td title="买家信息">\
                <img src="'+ this.b08(buyer_user.portrait) + '" class="w30 me-1 rounded-circle">' + buyer_user.user_name + '\
                </td>\
            </tr>\
        </table>'
    },
    b08: function (portrait) {
        if (portrait) {
            return 'https://s-cf-sg.shopeesz.com/file/' + portrait
        } else {
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAABJlBMVEXP2NxgfYtjf412j5uMoavO19uis7vG0dVxi5fBzNJyjJhjgI56kp5hfoxxi5h5kZ2ouL9ohJGInaipucCHnah3kJyxv8bL1NnM1dlphJGXqrN4kZzM1tqUp7Gnt76InqlkgY6wvsWGnKdrhpOnuL+xwMZ8lJ+3xMvAzNGCmaTFz9Sdr7fN1trN19tlgY5qhZJkgI6/y9COoqzL1dlphJJ0jZp7k566x8y7x81ng5CywMegsrp4kZ14kJyhs7uJn6nH0dZlgY+Fm6bG0daWqrO2xMqzwcfF0NXBzdK3xcu0wsh7k5+qusG0wsmzwchuiJVviZaYq7S7yM2Kn6m8yM6/y9GInqiWqbKNoqxzjJmjtLyqucGfsbmdr7iwv8WKoKpuiZVif42PQ9RwAAABzUlEQVR4Xu3YVZLjShBA0UyBmZmamXuYmZmZ3tv/Jua3Y8JWTdsKKR1zzwruR1aVlDIdAAAAAAAAAAAAAAAAAADyN1t+3fPqfiOTl7kQ1qp6QqkZinmdnP6hcFVs6wY6RtATwx75OlY7K2ZlczpBzmx194ZONOyKTbc0QiAmrWikFTHoIKeRKgdiz7o6LIo919XhophzRp3yYs01dcqINavqtCTWXFAnX6y5ok7nxZqyOhWJNjAeHERzVx6Py7Y6PRZzqnP4wSQ1dajN4U9AIRSDOhqpIyYFGuGs2HRuqBMNR/O3rKlYXjG1dazhbTGsF4yd557YtlFwrHpNCpslPeHZ81DmQj7T8OvFYt9vfM3LPwkAgOzDzMLdUqV/qHqnXymtLmRe3hPD9h/s7RzpGEc7e1v7Yk+4dX/zWCMsbw6eiClPgzV107XPL8SI3cEr/Wuv3+xK+t4ueXoq3rv3kq4PrbKeWvnjtqRn9MnTqXiDkaTkUkGn9uWypKK5rDM4/CYp+K4z+iGJW9SZrSc+z57OzEt6rtsag6ok6qfGYkOS1NJY/JIk/aexyEmS/tdYHEuSNCbzGU000UQTTTQAAAAAAAAAAAAAAAAAAL8BwZgl987F+p8AAAAASUVORK5CYII=';
        }
    },
}
fun.a01();