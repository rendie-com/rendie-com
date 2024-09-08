'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile         选择JS文件
        this.a02();
    },
    a02: function () {
        let data = [{
            action: "sqlite",
            database: "shopee/卖家账户",
            sql: "select " + Tool.fieldAs("sort,id,note,name,company,phone,username,password") + " FROM @.table order by @.sort asc,@.id asc limit 50"
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let html = "", arr = t[0];
        for (let i = 0; i < arr.length; i++) {
            html += '\
			<tr>\
				<td class="p-0"><input type="text" class="form-control center" value="'+ arr[i].sort + '" onblur="fun.c44($(this),' + arr[i].id + ',\'sort\',\'' + arr[i].sort + '\')"/></td>\
				<td class="w30" style="padding-left: 30px;position: relative;">\
					<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
					<ul class="dropdown-menu" aria-labelledby="dropdown0">\
						<li onClick="Tool.openR(\'?jsFile=js02&id='+ arr[i].id + '\')"><a class="dropdown-item pointer">更多</a></li>\
						<li><a class="dropdown-item pointer" onClick="Tool.openR(\'?jsFile=js01&id='+ arr[i].id + '\')">修改</a></li>\
				        <li onClick="fun.c03('+ arr[i].id + ')"><a class="dropdown-item pointer">删除</a></li>\
					</ul>\
				</td>\
				<td class="left">* <a href="javascript:;" onclick="Tool.SignIn.a01('+ arr[i].id + ',$(this).parent())" title="点击登陆">' + arr[i].username + '</a></td>\
				<td>'+ arr[i].company + '</td>\
				<td>'+ arr[i].phone + '</td>\
				<td>'+ arr[i].name + '</td>\
				<td>'+ arr[i].note + '</td>\
            </tr>'
        }
        let urlArr = [
            "https://seller.sg.shopee.cn/registration/information-collection/records",
            "https://shopee.cn/edu/home",
        ]
        html = '\
        <header class="panel-heading">Shopee -&gt; 卖家账户</header>\
        <div class="p-2">\
            <table class="table table-hover align-middle center">\
                <thead class="table-light">'+ this.b01() + '</thead>\
                <tbody>'+ html + '</tbody>\
            </table>\
		    <table class="table">\
		    <tr>\
			    <td class="right w150">注册主账号：</td>\
			    <td><a href="'+ urlArr[0] + '" target="_blank">' + urlArr[0] + '</a></td>\
		    </tr>\
		    <tr>\
			    <td class="right w150">卖家学习中心：</td>\
			    <td>\
                    <a href="'+ urlArr[1] + '" target="_blank">' + urlArr[1] + '</a><hr/>\
                    <a href="https://shopee.cn/edu/courseDetail/511?lessonId=1611" target="_blank">【shopee】常见问题：什么是异常件</a><hr/>\
                    <a href="https://shopee.cn/edu/article/5091" target="_blank">【shopee】跨境物流成本（藏价）与物流运费一览</a><hr/>\
                    <a href="https://shopee.cn/edu/article/4416/" target="_blank">【shopee】佣金，服务费及交易手续费（含税率）</a><hr/>\
                    <a href="https://solutions.shopee.cn/sellers/pricing-simulator/#/" target="_blank">【shopee】跨境卖家自助服务站 - 定价模拟器</a><hr/>\
                    <a href="https://www.keyouyun.com/erp-package-agent/" target="_blank">【keyouyun】客优云货代贴面单</a><hr/>\
                    <a href="https://shopee.cn/edu/blog/513" target="_blank">【shopee】2024发货工作日：全面解析新政策下的发货规则</a><hr/>\
                    <a href="https://shopee.cn/edu/courseDetail/712?lessonId=2239" target="_blank">【shopee】免运和返现活动</a><hr/>\
                    <a href="https://www.bilibili.com/video/BV1ER4y1T7nz/?p=16&spm_id_from=pageDriver" target="_blank">【bilibili】Shopee虾皮卖家公告栏版块，佣金政策调整，发货流程与时效的内容</a><hr/>\
                    <a href="https://shopee.cn/edu/article/8803" target="_blank">【shopee】活动服务费率-FSS、CCB及VCX</a><hr/>\
                    <a href="https://shopee.cn/edu/courseDetail/511?lessonId=2590" target="_blank">【shopee】运输限制—违禁品详细介绍</a><hr/>\
                    <a href="https://shopee.cn/edu/article/17252" target="_blank">【shopee】【3PF】收费标准</a><hr/>\
                    <a href="https://www.keyouyun.com/shopee-fans-auto-follow-users/" target="_blank">【keyouyun】Shopee/虾皮粉丝自动关注、刷粉涨粉</a>\
                </td>\
		    </tr>\
		    </table>\
        </div>'
        Tool.html(null, null, html)
    },
    b01: function (t) {
        let str = '\
        <tr>\
          <th class="w50">排序</th>\
          <th class="w30" style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown0">\
              <li><a class="dropdown-item pointer" onClick="fun.c01()">添加</a></li>\
              <li onClick="Tool.openR(\'?jsFile=js21&table=seller&database=shopee\');"><a class="dropdown-item pointer">*把该表同步到【PostgreSQL】数据库</a></li>\
              <li onClick="Tool.openR(\'?jsFile=js03&table=seller&database=shopee&newdatabase=shopee/seller\');"><a class="dropdown-item pointer">把旧表复制到新表</a></li>\
           </ul>\
          </th>\
          <th class="left">用户名</th>\
          <th>公司</th>\
          <th>手机</th>\
          <th>提现人</th>\
          <th>备注</th>\
        </tr>'
        return str
    },
    c01: function () {
        let html = '"ok"<r: db="sqlite.shopee">INSERT into @.seller(@.addtime)VALUES(' + Tool.gettime("") + ')</r:>'
        Tool.ajax.a01(html, 1, Tool.reload)
    },
    c02: function (t) {

    },
    c03: function (id) {
        if (confirm('确定要删除吗？')) {
            let html = "\"ok\"<r: db=\"sqlite.shopee\">delete from @.seller where @.id=" + id + "</r:>"
            Tool.ajax.a01(html, 1, Tool.reload)
        }
    },
    ///////////////////////////////////////////////////////////////////////////////////
    c42: function (This, id, v) {
        This.attr("disabled", true);
        let html = "<r: db=\"sqlite.shopee\">update @.seller set @.hide=" + v + " where @.id=" + id + "</r:>"
        Tool.ajax.a01(html, 1, this.c43, this, 1, [This, v]);
    },
    c43: function (t, arr) {
        if (t == "") {
            arr[0].attr("disabled", false);
        }
        else { alert(t); }
    },
    c44: function (This, id, L, V) {
        let val = This.val(), html = "\"ok\"<r: db=\"sqlite.shopee\">update @.seller set @." + L + "='" + val + "' where @.id=" + id + "</r:>"
        if (val != V && !This.attr("disabled")) {
            This.attr("disabled", true);
            This.val("加载加...");
            Tool.ajax.a01(html, 1, this.c45, this, [This, val, L]);
        }
    },
    c45: function (t, oo) {
        if (t == "ok") {
            oo[0].attr("disabled", false);
            oo[0].val(oo[1]);
        }
        else { alert("出错：" + t); }
    },
}
fun.a01();