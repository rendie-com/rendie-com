'use strict';
Object.assign(Tool, {
    dh_item_list:
    {
        access_token: "",
        a01: function (access_token) {
            this.access_token = access_token;
            //obj.arr[3]        选择JS文件
            //obj.arr[4]        翻页
            //obj.arr[5]        切换账户
            obj.arr[6] = obj.arr[6] ? obj.arr[6] : "0"//产品状态		100000=未定义;100100=上架产品;100200=待审核产品;100300=审核未通过产品;100400=下架产品;100500=品牌商投诉产品;100600=疑似侵权产品;100700=内容违规品;示例值：100100
			obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20"//产品编码列表
			obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20"//搜索字段
            this.a02();
        },
        a02: function () {
            let oo = {}, url = "http://api.dhgate.com/dop/router", today = new Date();
            oo.access_token = this.access_token
            oo.method = "dh.item.list"
            oo.timestamp = today.getTime()
            oo.operateDateStart = Tool.js_date_time(today.setDate(today.getDate() - 366), "-")
            oo.v = "2.0"
            oo.pages = obj.arr[4]
            oo.pageSize = 10
            oo.state = obj.arr[6]
            oo.itemCodes = obj.arr[7] == "-_-20" ? "" : obj.arr[7];
            $("#thisUrl").val(url);
            $("#thisPost").html(JSON.stringify(oo, null, 2));
            gg.postFetch(url, oo, this.a03, this)
        },
        a03: function (oo) {
            $("#thisJson").html(JSON.stringify(oo, null, 2));
            let total = oo.total;
            let html = '\
			'+ this.b02() + '\
			<table class="table table-hover">\
				'+ this.b01() + '\
				<tbody>\
					'+ this.b04(oo.itemList) + '\
					<tr><td colspan="4\">'+ total + '</td></tr></table>\
				</tbody>\
			</table>'
            $("#dh_item_list").html(html)
        },
        b01: function () {
            return '\
			<thead class="table-light center">\
			<tr>\
				<th>产品编码</th>\
				<th>图片</th>\
				<th>产品信息</th>\
				<th>时间</th>\
				<th class="p-0">\
					<select onchange="fun.a04(this.options[this.selectedIndex].value)" class="form-select">\
					<option value="100000" '+ (obj.arr[7] == "0" ? 'selected="selected"' : "") + '>未定义</option>\
					<option value="100100" '+ (obj.arr[7] == "100100" ? 'selected="selected"' : "") + '>上架产品</option>\
					<option value="100200" '+ (obj.arr[7] == "100200" ? 'selected="selected"' : "") + '>待审核产品</option>\
					<option value="100300" '+ (obj.arr[7] == "100300" ? 'selected="selected"' : "") + '>审核未通过产品</option>\
					<option value="100400" '+ (obj.arr[7] == "100400" ? 'selected="selected"' : "") + '>下架产品</option>\
					<option value="100500" '+ (obj.arr[7] == "100500" ? 'selected="selected"' : "") + '>品牌商投诉产品</option>\
					<option value="100600" '+ (obj.arr[7] == "100600" ? 'selected="selected"' : "") + '>疑似侵权产品</option>\
					</select>\
				</th>\
			</tr>\
			</thead>'
        },
        b02: function () {
            let html = '\
			<div class="input-group w-50 m-2">\
			  <input type="text" class="form-control" id="searchword" value="'+ (obj.arr[8] == "-_-20" ? "" : Tool.unescape(obj.arr[8])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
			  <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
			</div>'
            return html;
        },
        b03: function (m) {
            let str = "";
            switch (m) {
                case 1: str = "自主下架操作"; break;
                case 2: str = "有效期下架自动程序"; break;
                case 3: str = "强制下架问题产品"; break;
                case 5: str = "备货售完下架"; break;
                default: str = "没下架";
            }
            return str;
        },
        b04: function (arr) {
            let html = ""
            for (let i = 0; i < arr.length; i++) {
                html += '\
			  <tr>\
				<td><a href="javascript:;" onclick="fun.b01('+ arr[i].itemCode + ')">' + arr[i].itemCode + '</a></td>\
				<td>\
				  <a target="_blank" href="//image.dhgate.com/'+ arr[i].imgUrl + '">\
								<img src="//image.dhgate.com/'+ arr[i].imgUrl + '" title="点击预览" class="border" width="95" align="left">\
				  </a>\
				</td>\
				<td title="产品简短描述:'+ arr[i].shortDes + '">\
				  <a href="//www.dhgate.com/'+ arr[i].itemUrl + '" target="_blank">' + arr[i].itemName + '</a><hr/>\
				  <b>展示类目:</b>'+ arr[i].cateDispId + '&nbsp;&nbsp;\
				  <b>叶子类目编号:</b>'+ arr[i].catePubId + '&nbsp;&nbsp;\
				  <b>有效期:</b>'+ arr[i].vaildDay + '天&nbsp;&nbsp;\
				  <b>未审核通过原因:</b>'+ arr[i].unpassCause + '&nbsp;&nbsp;\
				  <b>下架操作类型:</b>'+ this.b03(arr[i].withDrawalType) + '&nbsp;&nbsp;\
				  <b>是否如实描述:</b>'+ arr[i].accuratelyDescribe + '</b>&nbsp;&nbsp;\
				  <b>是否免运费:</b>'+ arr[i].isFreeShip + '<hr/>\
				  <b>产品组id:</b>'+ arr[i].itemGroupId + '&nbsp;&nbsp;\
				  <b>运输物流模板Id:</b>'+ arr[i].shippingModelId + '\
				</td>\
				<td class="p-0">'+ this.b05(arr[i].operateDate, arr[i].upDate, arr[i].expireDate) + '\
						</td>\
				<td>'+ arr[i].state + '</td>\
			</tr>'
            }
            return html;
        },
        b05: function (operateDate, upDate, expireDate) {
            return '\
		<table class="table table-bordered mb-0">\
			<tr><td title="上架时间">'+ operateDate + '</td></tr>\
			<tr><td title="修改时间">'+ upDate + '</td></tr>\
			<tr><td title="有效期">'+ expireDate + '</td></tr>\
		</table>'
        },
    }
})