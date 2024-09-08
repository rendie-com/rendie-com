'use strict';
Object.assign(Tool, {
	bodyAppend: function (arr) {
		for (var i = 0; i < arr.length; i++) {
			$("#body").append('<tr><td class="right">' + arr[i].name + '：</td><td colspan="2">' + (arr[i].name == "elm" ? "详情不显示":arr[i].value) + '</td></tr>');
		}
	},
	imglist_googleshoppingimagelist: function (DHpic, DHattrPic, DHdesPic, pic) {
		//pic   表示站外首图
		let Narr = [], strPic="", imglist = [], arr = this.DHpic_DHattrPic_DHdesPic(DHpic, DHattrPic, DHdesPic);//去重复;
		let len = arr.length > 8 ? 8 : arr.length;
		for (var i = 0; i < len; i++) {//主图只要8个
			imglist.push(
				{
					"class": "com.dhgate.syi.model.TdProductAttachVO",
					"fileurl": arr[i].picC.fileurl,
					"imgmd5": arr[i].picC.imgmd5,
					"sequence": i,
					"filename": "",
					"width": 0,
					"height": 0
				})
			///////////////////////////////////////////
			strPic += '<figure class="figure border mb-1 p-1">\
			<a href="//img4.dhresource.com/'+ arr[i].picC.fileurl+'" target="_blank">\
				<img src="//img4.dhresource.com/260x260/'+ arr[i].picC.fileurl+'" class="figure-img img-fluid rounded h260">\
			</a>\
			</figure>'
		}
		///////////////////////////////////////////////////////
		//Narr.push({ "name": "googleshoppingimagelist", "value": pic.picC.fileurl })//这个不要看行不行？
		Narr.push({ "name": "googleshoppingimagelink", "value": pic.picC.fileurl })
		///////////////////////////////////////////////////////
		Narr.push({ "name": "imglist", "value": JSON.stringify(imglist) })
		let str = '\
		<tr>\
			<td class="right">产品图片：</td>\
			<td>'+ strPic +'</td>\
		</tr>\
		<tr>\
			<td class="right">站内外推广图片：</td>\
			<td>\
			<figure class="figure border mb-1 p-1">\
			<a href="//img4.dhresource.com/'+ pic.picC.fileurl + '" target="_blank">\
				<img src="//img4.dhresource.com/260x260/'+ pic.picC.fileurl +'" class="figure-img img-fluid rounded h260">\
			</a>\
			</figure>\
			</td>\
		</tr>'
		$("#body").append(str);
		return Narr;
	},
	//去重复
	DHpic_DHattrPic_DHdesPic: function (pic, attrPic, desPic) {
		let arr1 = pic.concat(attrPic).concat(desPic), arr2 = [arr1[0]], isbool
		for (let i = 1; i < arr1.length; i++) {
			if (arr1[i] != null && arr1[i] != 0)//为什么要有null?因为购物车属性有图片时，可以不全是图片。
			{
				isbool = true;
				for (let j = 0; j < arr2.length; j++) {
					if (arr1[i].picC.imgmd5 == arr2[j].picC.imgmd5) {
						isbool = false; break;
					}

				}
				if (isbool) arr2.push(arr1[i])
			}			
		}
		return arr2;
	},
	shortDesc12345: function (description) {
		description = description.replace(/AliExpress/ig, "")
		let arr = [{
			"name": "shortDesc1",
			"value": "carabiner clip buy carabiner clip with and return online carabiner clip is durable for long lasting use find products of with high quality"
		},
		{
			"name": "shortDesc2",
			"value": ""
		},
		{
			"name": "shortDesc3",
			"value": ""
		},
		{
			"name": "shortDesc4",
			"value": ""
		},
		{
			"name": "shortDesc5",
			"value": ""
			}];
		///////////////////////////////////////////////////////////////////////
		let str = '\
		<tr>\
			<td class="right">产品卖点&特性：</td>\
			<td>\
				<table class="w-100">\
				<tr>\
					<td><textarea name="productname" class="form-control" disabled="disabled">'+ arr[0].value + '</textarea>您还可以输入' + (300 - arr[0].value.length) +'/300个字符</td>\
				</tr>\
				<tr>\
					<td><textarea name="productname" class="form-control" disabled="disabled">'+ arr[1].value + '</textarea>您还可以输入' + (300 - arr[1].value.length) +'/300个字符</td>\
				</tr>\
				<tr>\
					<td><textarea name="productname" class="form-control" disabled="disabled">'+ arr[2].value + '</textarea>您还可以输入' + (300 - arr[2].value.length) +'/300个字符</td>\
				</tr>\
				<tr>\
					<td><textarea name="productname" class="form-control" disabled="disabled">'+ arr[3].value + '</textarea>您还可以输入' + (300 - arr[3].value.length) +'/300个字符</td>\
				</tr>\
				<tr>\
					<td><textarea name="productname" class="form-control" disabled="disabled">'+ arr[4].value + '</textarea>您还可以输入' + (300 - arr[4].value.length) +'/300个字符</td>\
				</tr>\
				</table>\
			</td>\
		</tr>'
		$("#body").append(str);
		return arr;
	},
	other1: function () {
		var arr = [
			//是否支持定制: （1）是  （0）否
			{
				"name": "chooseCustomized",
				"value": "0"
			},
			//设置产品的价格区间(同步标准价格的批发区间至所有区域定价组)
			{
				"name": "startqty",
				"value": "3"
			},
			{
				"name": "discount",
				"value": "2"
			},
			{
				"name": "startqty",
				"value": "5"
			},
			{
				"name": "discount",
				"value": "3"
			},
			{
				"name": "startqty",
				"value": "7"
			},
			{
				"name": "discount",
				"value": "4"
			},
			/////////////////////////////////
			//是否上传主图视频：(1)是   (0)否
			{
				"name": "vedio",
				"value": "1"
			},
			//商品分级管理:   (3)非成人属性       (2)成人属性
			{
				"name": "issample_adult",
				"value": "3"
			},
			//包装后重量：      0.1 公斤（KG）/包
			{
				"name": "productweight",
				"value": "0.1"
			},
			//包装后尺寸：      10.0      *      10.0      *      10.0      单位均为：厘米
			{
				"name": "sizelen",
				"value": "10.0"
			},
			{
				"name": "sizewidth",
				"value": "10.0"
			},
			{
				"name": "sizeheight",
				"value": "10.0"
			},

		]
		this.bodyAppend(arr);
		return arr;
	},
	productDes: function (desArr, DHdes, proid) {
		//注：敦煌上传详情后，图片会自动被替换为敦煌的图片，所以修改完后，就用这个。
		let des=""
		if (DHdes.indexOf("rendie.com/api") == -1) {			
			des = '<img src=\"//rendie.com/api/f3/albu/ry/n/14/' + proid + '/65514f18-1bbc-4fe3-a440-9f4586c5a22d.jpg\" />' + DHdes;		
		}
		else
		{
			des = DHdes;
		}
		Tool.at(des)
		aaaaaaaaaaaa
		///////////////////////////////////////
		let arr = [{
			"name": "elm",
			"value": (desArr.length == 0 ? "" : '<ul class="attrul">' + desArr.join("") + '</ul>') + this.removeHTMLCode(des, "SCRIPT")
		}];
		this.bodyAppend(arr);
		return arr;
	},
	//把上传好的属性图片写到sku里面
	DHattrPic_fileurl: function (prodes)
	{
		let isbool = true, smtsku = prodes.aeopAeProductSKUs[0];
		if (!smtsku) smtsku = [];
		let DHattrPic = prodes.DHattrPic, arr1 = [];
		for (let i = 0; i < smtsku.length; i++) {
			if (smtsku[i].skuPropertyValues[0].skuPropertyImagePath) {
				//Tool.pre(DHattrPic)
				//alert(smtsku[i].skuPropertyValues.length + "---------存：" + DHattrPic.length)
				//Tool.pre([smtsku[i].skuPropertyValues, DHattrPic])
				if (smtsku[i].skuPropertyValues.length == DHattrPic.length) {
					arr1 = smtsku[i].skuPropertyValues;
					for (let j = 0; j < arr1.length; j++) {
						arr1[j].fileurl = DHattrPic[j] ? DHattrPic[j].picC.fileurl : "";
					}
				}
				else {
					isbool = false;
				}
				break;
			}
		}
		//Tool.pre(smtsku); //注：这里能找到fileurl的内容。
		return isbool;
	},
	//选分组产品所属产品组ID
	productgroupid: function (val, Group) {
		let turn = "="
		for (let i = 1; i < Group.length; i++) {
			if (val == Group[i].remark) { turn = Group[i].groupId + "=" + Group[i].groupName; break; }
			else {
				for (let j = 0; j < Group[i].itemChildGroupList.length; j++) {
					if (val == Group[i].itemChildGroupList[j].remark) {
						turn = Group[i].itemChildGroupList[j].groupId + "=" + Group[i].itemChildGroupList[j].groupName; break;
					}
				}
				if (turn != "=") break;
			}
		}
		if (turn == "=") { turn = Group[1].groupId + "=" + Group[1].groupName }//如果为空，就拿第一个吧，分组不太重要，以后搞。
		return turn
	},
	//获取品牌，且删除原有品牌。
	getDelBrandName: function (aeopAeProductPropertys) {
		let name="没有品牌",oo=[]
		for (let i = 0; i < aeopAeProductPropertys.length; i++) {
			if (aeopAeProductPropertys[i].attrName == "Brand Name") {
				name = aeopAeProductPropertys[i].attrValue;
			}
			else {
				oo.push(aeopAeProductPropertys[i]);
			}
		}		
		return [name, oo];
	}
})
