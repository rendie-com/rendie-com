'use strict';
Object.assign(Tool, {
	attrlist:
	{
		a01: function (next, This, attr) {
			$("#state").html("把【速卖通的属性】绑定到【敦煌网的属性】上，绑定不上的做成自定义属性");
			let aliattr = this.b01(This.obj.Barr.prodes.aeopAeProductPropertys);//速卖通的属性名称替换
			attr=this.b03(attr, aliattr)//把【速卖通的属性】绑定到【敦煌网的属性】上
			let attrArr = this.b04(attr)//把敦煌自定义属性输出来-----[自定义属性,购物车属性]
			//attrArr[0]---表示拼装后敦煌的系统属性组
			//attrArr[1]---表示拼装后购物车属性（购买时，必选项）
			let selfArr = this.b06(aliattr);//自定义属性
			//selfArr[0]---自定义属性(不超过10个)
			//selfArr[1]---超出10个的放到详情中去
			attrArr[0].push(selfArr[0]);
			$("#body").append('\
				<tr><td class="right">产品基本属性:</td><td>' + this.b07(attr, selfArr[0].valueList) + '</td></tr>\
			');
			next.apply(This, [attrArr, selfArr[1]]);
		},
		b01: function (Propertys)//属性值转换
		{
			for (let i = 0; i < Propertys.length; i++) {				
				if (Propertys[i].attrValue == "Other" || Propertys[i].attrValue == "NONE"){ Propertys[i].attrValue = "Not filled"; }//不替换DH不给上传
			}
			return Propertys;
		},
		//属性名称，是否能绑定上
		b02: function (name, arr) {
			let oo = {}
			for (var j = 0; j < arr.length; j++) {
				if (name.toLowerCase() == arr[j].attrName.toLowerCase()) {
					oo = arr[j];
					break;
				}
			}
			return oo;
		},
		//把【速卖通的属性】绑定到【敦煌网的属性】上
		b03: function (attr, aliattr)
		{
			let o1 = {};
			for (var i = 1; i < attr.length; i++) {
				o1 = this.b02(attr[i].name, aliattr);//属性名称，是否能绑定上
				if (o1.attrName) {
					attr[i].bind = o1;
				}
			}
			return attr;
		},
		//把敦煌自定义属性输出来-----[自定义属性,购物车属性]
		b04: function (attr) {
			//attr           为敦煌网的属性
			//attr.name      属性英文名
			//attr.nameCn  	 属性中文名
			//attr.required  是否必填
			//attr.isother   是否有other属性值
			//attr.defined   属性的属性值是否可以自定义修改
			//attr.buyAttr   是否购买属性（购买时，必选项）
			//attr.ischild   是否子属性（好加事件）
			//attr.attrId    属性ID
			//attr.type      DH:1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框
			//attr.js    	   js代码
			let o1 = [], buyAttr = [];
			for (var i = 1; i < attr.length; i++) {
				if (attr[i].buyAttr == "1") {
					$("#state").html("说明有，是购买属性（购买时，必选项）。")
					buyAttr.push(attr[i])
				}
				else {
					//给敦煌网的属性默认值。
					o1.push({
						"class": "com.dhgate.syi.model.ProductAttributeVO",
						"attrId": attr[i].attrId,
						"attrName": attr[i].name,
						"isbrand": attr[i].name == "BRAND" ? "1" : "0",
						"valueList": attr[i].name == "BRAND" ? [] : this.b05(attr[i])
					})
				}
			}
			return [o1, buyAttr]
		},
		b05: function (attr) {
			//attr           为敦煌网的属性
			//attr.name      属性英文名
			//attr.nameCn  	 属性中文名
			//attr.required  是否必填
			//attr.isother   是否有other属性值
			//attr.defined   属性的属性值是否可以自定义修改
			//attr.buyAttr   是否购买属性（购买时，必选项）
			//attr.ischild   是否子属性（好加事件）
			//attr.attrId    属性ID
			//attr.type      DH:1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框
			//attr.js    	   js代码
			///////////////////////////////////
			let oo = [
				{
					"class": "com.dhgate.syi.model.ProductAttributeValueVO",
					"attrValId": "0",
					"lineAttrvalName": "Not filled",
					"lineAttrvalNameCn": "",
					"iscustomsized": "0",
					"picUrl": "",
					"brandValId": ""
				}
			]
			////////////////////////////////
			if (attr.bind) {oo[0].lineAttrvalName = attr.bind.attrValue;}
			if (attr.isother == "1") {oo[0].attrValId = 0;}
			else if (attr.js.length == 0) {oo[0].attrValId = 0;}
			else {oo[0].attrValId = attr.js[0].attrValId;}
			return oo;
		},
		//自定义属性---没有绑定的都是自定义属性，超出的属性放到详情中去
		b06: function (o2) {
			let oo = [], o3 = [];
			for (let i = 0; i < o2.length; i++) {
				if (o2[i].attrName.toLowerCase().indexOf("brand") == -1) {//自定义属性名称不能含有\\\"brand\\\"字样
					if (i < 10 && o2[i].attrValue.length <= 40) {
						oo.push({
							"class": "com.dhgate.syi.model.ProductAttributeValueVO",
							"attrValId": 0,
							"lineAttrvalName": o2[i].attrValue,
							"lineAttrvalNameCn": "",
							"iscustomsized": "0",
							"picUrl": "",
							"brandValId": "",
							"attrId": 11,
							"attrName": o2[i].attrName
						});
					}
					else {
						//用不完的自定义属性，放到详情里面。
						o3.push('<li><strong>' + o2[i].attrName + ':</strong><div class="des-wrap">' + o2[i].attrValue + '</div></li>')
					}
				}
			}
			////////////////////////////
			let o4 = {
				"class": "com.dhgate.syi.model.ProductAttributeVO",
				"attrId": 11,
				"attrName": "",
				"isbrand": "0",
				"valueList": oo
			};
			return [o4, o3]
		},	
		b07: function (attr, selfArr) {
			let str = "";
			for (let i = 1; i < attr.length; i++) {
				str += '<tr><td class="right w200">' + attr[i].nameCn + "（" + attr[i].name + '）：</td><td>' + this.b08(attr[i].js, attr[i].type, attr[i].nameCn, attr[i].isother) +'</td></tr>'
			}
			str += '\
			<tr><td class="right w200">自定义属性：	</td><td>' + this.b09(selfArr) +'</td></tr>\
			<tr><td class="right">GTIN:</td><td title="全球贸易商品代码，用于以不重复的方式标识商品，提供此类标识码可以让您的商品更方便用户查找，更有机会获得免费的站内外流量。"><input class="form-control w200" type="text" disabled="disabled" value=""></td></tr>'
			return '<table class="w-100">'+str+'</table>'
		},
		b08: function (arr, type, nameCn, isother) {
			let str = "";
			if (type == "2") {
				if (nameCn == "品牌") {
					str = '<option>- 无品牌 -</option>';
				}
				else {
					str = '<option>请选择</option>';
					for (let i = 0; i < arr.length; i++) {
						str += '<option>' + arr[i].lineAttrvalNameCn +'</option>';
					}
				}
				if (isother == "1") { str += '<option value="0">自定义</option>'; }
				str ='<select class="form-select w300">'+str+'</select>'
			}
			else
			{
				str += '===没做====';
			}			
			return str;
		},
		b09: function (selfArr) {
			let str = '';
			for (let i = 0; i < selfArr.length; i++) {
				str += '\
				<tr>\
					<td class="w60">'+(i+1)+'</td>\
					<td><input class="form-control w200" type="text" disabled="disabled" value="'+ selfArr[i].attrName +'"></td>\
					<td><input class="form-control w200" type="text" disabled="disabled" value="'+ selfArr[i].lineAttrvalName +'"></td>\
				</tr>'
			}
			return '<table class="center">'+str+'</table>'
		}
	}
})