'use strict';
Object.assign(Tool, {
  SkuInfo:
	{
    a01: function (next, This, attrArr) {
      //attrArr[0]---表示拼装后敦煌的系统属性组
      //attrArr[1]---表示拼装后购物车属性（购买时，必选项）
      let Barr = This.obj.Barr, buyAttr = attrArr[1]
      Barr.prodes.aeopAeProductSKUs = this.b04(Barr.prodes.aeopAeProductSKUs);//解决出现as pictrue的问题(as pictrue必须唯一，因为DH要这么做)
      if (buyAttr.length == 0)//敦煌有【0】个，速卖通有【N】个价格属性则用自定义属性和敦煌的价格属性
      {
        if (Barr.prodes.aeopAeProductSKUs[0]) {
          this.b12(Barr.prodes.aeopAeProductSKUs);//将2组3组4组合成1组----注：buyAttr 和 aeopAeProductSKUs  是会被修改的
          this.a02(Barr, next, This, attrArr);//敦煌有【0】个，速卖通有【N】个价格属性
        }
        else
        {
          $("#state").html('这个是单价格没做');
          next.apply(This, [{ err: "出错", proStatus: 29, msg: "这个是单价格没做" }]);
        }
      }
      else if (buyAttr.length == 1)//敦煌有【1】组购物车属性
      {
        this.b01(buyAttr, Barr.prodes.aeopAeProductSKUs);//敦煌只有1组--是否要给敦煌增加一组，并保证俩边组数相同----注：buyAttr 和 aeopAeProductSKUs  是会被修改的
        if (buyAttr.length == 1) {
          //俩边都是1组 给【proSkuInfo】【oldSkuInfo】【attrlist】【specselfDef】传值
          let arr2 = this.b05(buyAttr, Barr.prodes.aeopAeProductSKUs, Barr.ratio, Barr.proid, Barr.fromid, Barr.prodes.freight);
          attrArr[0].push(arr2[2]);
          arr2[2] = attrArr[0];
          next.apply(This, arr2);
        }
        else
        {
          //alert("eeeeeeeeeeeeeeeeeeeee")
          next.apply(This, [{ err: "出错", proStatus: 42, msg:"敦煌有【1】组购物车属性,变二组"}]);
        }
       
      }
      else if (buyAttr.length == 2)//敦煌有【2】组购物车属性
      {
          next.apply(This, [
              {
                  err: "出错",
                  proStatus: 7,
                  msg: "敦煌有【2】组购物车属性"
              }]);
        //this.obj.Barr.prodes.aeopAeProductSKUs = this.b32(buyAttr, this.obj.Barr.prodes.aeopAeProductSKUs);
      }
      else
      {
        $("#state").html('敦煌有3组以上购物车属性');
        next.apply(This, [{ err: "出错", proStatus: 26, msg: "敦煌有3组以上购物车属性" }]);        
      }
    },
    //敦煌有【0】个，速卖通有【N】个价格属性
    a02: function (Barr, next, This, attrArr) {
      let oo = [], specselfDef = this.b18(Barr.prodes.aeopAeProductSKUs[0])//给DH上自定义属性
      if (specselfDef == false) {
        $("#state").html('只有发货地的单价格。');
        next.apply(This, [{ err: "出错", proStatus: 30, msg: "只有发货地的单价格" }]); 
      }
      else {
        let proSkuInfo = this.b19(Barr), oldSkuInfo = this.b20(Barr)
        if (proSkuInfo != false) {
          //specselfDef       自定义购物车属性，包括图片
          //proSkuInfo        价格，编码，库存信息
          //oldSkuInfo        价格，编码，库存信息---有商品编码在里面
          //attrArr[0]        表示拼装后敦煌的系统属性组
          //attrArr[1]        表示拼装后购物车属性（购买时，必选项）
          $("#body").append('<tr><td class="right">产品价格区间：</td><td>' + this.b21(proSkuInfo)+'</td></tr>');
          //Tool.pre(proSkuInfo)
          //dddddddddddd
          next.apply(This, [proSkuInfo, oldSkuInfo, attrArr[0], specselfDef]);

        }
        else
        {
          $("#state").html('库存为0不能要了。');
          next.apply(This, [{ err: "出错", proStatus: 9, msg: "库存为0不能要了" }]);
        }
      }
    },
    //敦煌只有1组--是否要给敦煌增加一组，并保证俩边组数相同
    b01: function (dh, ali) {
      if (ali[0]) {
        if (ali[0].length > 1)//速卖通有【>1】个
        {
          $("#state").html('速卖通有【&gt;1】个');
          dh.push(this.b02());
          this.b03(ali);//将3组4组5组合成2组
        }
      }      
    },
    b02: function () {
      let arr = []
      for (let i = 0; i < 20; i++) {
        arr.push({ "attrValId": 1000 + i })
      }
      return {
        "name": "self",
        "nameCn": "自定义规格",
        "attrId": 9999,
        "js": arr
      }
    },
    b03: function (alisku)//将3组4组合成2组
    {
      if (alisku[0].length == 2) { }
      else if (alisku[0].length == 3) { alisku[0] = [alisku[0][0], this.b14(alisku, 1, 2)]; }//俩组合成一组
      else if (alisku[0].length == 4) { alisku[0] = [alisku[0][0], this.b15(alisku, 1, 2, 3)]; }//三组合成一组
      else if (alisku[0].length == 5) { alisku[0] = [alisku[0][0], this.b16(alisku, 1, 2, 3, 4)]; }//四组合成一组
      else { alert("SMT超过5组，请与管理员联系。1"); }
    },
    //解决出现as pictrue的问题(as pictrue必须唯一，因为DH要这么做)
    b04: function (skuobj) {
      ////////////////////【解决出现as pictrue的问题(as pictrue必须唯一，因为DH要这么做)】//////////////////////////////
      let str = ''
      if (skuobj[0]) {
        for (let i = 0; i < skuobj[0].length; i++) {
          let arr = skuobj[0][i].skuPropertyValues
          for (let j = 0; j < arr.length; j++) {
            arr[j].skuPropertyTips = Tool.Trim(arr[j].skuPropertyTips.replace(/ +/g, ' '))//将多个空格转换成一个空格；因为DH上传后也是这么转的。
            if (str.indexOf('|' + arr[j].skuPropertyTips + '|') != -1) { arr[j].skuPropertyTips += "-" + (j + 1) }
            str += "|" + arr[j].skuPropertyTips + "|"
          }
        }
      }
      //////////////////去掉#后面的东西////////////////////////////
      for (let i = 0; i < skuobj[1].length; i++) {
        skuobj[1][i].skuAttr = skuobj[1][i].skuAttr.replace(/(#.*?;)/g, ';').replace(/(#.*?$)/g, '')//去掉#后面的东西
        if (skuobj[1][i].skuAttr.indexOf(";200007763:") != -1)//【200007763】表示发货地ID。  注：如果有多个发货国家，只要第一个
        {
          skuobj[1][i].skuAttr = skuobj[1][i].skuAttr.split(";200007763:")[0];//发货地，在最后一个
        }
        else if (skuobj[1][i].skuAttr.indexOf("200007763:") != -1) {
          let arr = skuobj[1][i].skuAttr.split(";");
          arr.shift();
          skuobj[1][i].skuAttr = arr.join(";");//发货地，在第一个
        }
      }
      ////////////////////////////////////////////////////////
      return skuobj
    },
    //俩边都是1组 给【proSkuInfo】【oldSkuInfo】【attrlist】【specselfDef】传值
    b05: function (dh, ali, ratio, proid, fromid, freight) {  
      let arr = [], o1 = [], o2 = [], o3 = []
      if (ali[0]) {
        let len = dh[0].js.length > ali[0][0].skuPropertyValues.length ? ali[0][0].skuPropertyValues.length : dh[0].js.length;//以敦煌长度为主，截断长度。
        for (let i = 0; i < len; i++) {
          arr = this.b06(ali[1], ali[0][0].skuPropertyId, ali[0][0].skuPropertyValues[i].propertyValueId);//算出价格和库存
          o1.push(this.b08(dh[0], arr, i, ratio, proid, freight));//给【proSkuInfo】传值
          o2.push(this.b09(dh[0], arr, i, ratio, proid, freight));//给【oldSkuInfo】传值
          o3.push(this.b11(dh[0], ali[0][0].skuPropertyValues, i))//购物车必填属性
        }
      }      
      return this.b10(o1, o2, o3,[], fromid, dh[0]);
    },
    //算出价格和库存
    b06: function (smtsku, skuPropertyId, propertyValueId) {
      let skuAttr = [], arr1 = ("" + skuPropertyId).split(" - "), arr2 = ("" + propertyValueId).split(" - ");
      for (let i = 0; i < arr1.length; i++) {
        skuAttr.push(arr1[i] + ":" + arr2[i])
      }
      //////////////////////////////////////////////////////////
      let Narr = [];
      for (let i = 0; i < smtsku.length; i++) {
        if (smtsku[i].skuAttr == skuAttr.join(";")) { Narr = [smtsku[i].skuVal.skuAmount.value, smtsku[i].skuVal.inventory]; }
      }
      return Narr;
    },
    b07: function (retailPrice, PriceRatio, freight) {
      let fAmount = 0;
      for (let k in freight) {
        for (let i = 0; i < freight[k].length; i++) {
          let fre = parseInt(freight[k][i].fAmount);
          fAmount = fre > fAmount ? fre : fAmount
        }
      }     
      //设置价格=(成本+20%税费+0.031415926手续费+最高运费)*价格倍数
      return ((retailPrice + (retailPrice * 0.2) + 0.031415926 + fAmount) * PriceRatio).toFixed(2);
    },
    b08: function (dh, arr, i, ratio, proid, freight) {
      return {
        "class": "#",
        "attrList": [
          { "attrId":""+ dh.attrId, "attrVid": ""+dh.js[i].attrValId, "type": "1", "class": "##" },
          { "attrId": "8888", "attrVid": "CN", "type": "1", "class": "##" }
        ],
        "status": "" + (arr[1] ? 1 : 0),
        "price": this.b07(arr[0], ratio, freight),
        "stock": "" + arr[1],
        "skuCode": proid + "-" + (i + 1),
        "id": dh.attrId + "_" + dh.js[i].attrValId + "A8888_CN"
      }
    },
    b09: function (dh, arr, i, ratio, proid, freight) {
      return {
        "attrList": [
          { "attrId": dh.attrId, "attrValCode": null, "attrValName": "", "attrVid":""+ dh.js[i].attrValId, "type": "1" },
          { "attrId": "8888", "attrValCode": "CN", "attrValName": "中国", "attrVid": null, "type": "4" }
        ],
        //"id": "37b2faba7c9b034a470da69707bdd2c4",
        "oriPrice": "",
        "price": this.b07(arr[0], ratio, freight),
        "realIncome": null,
        "skuCode": proid + "-" + (i + 1),
        "status": "" + (arr[1] ? 1 : 0),
        "stock": "" + arr[1]
      }
    },
    b10: function (o1, o2, o3,o4, fromid,dh) {
      //////////////////////////////////////////////////
      let oo1 = {
        "prodInvenLocationList": [
          {
            "class": "###",
            "inventoryLocation": "CN",
            "leadingTime": "4"
          }
        ],
        "skuInfoList": o1
      }
      ///////////////////////////////////////////////////
      let oo2 = {
        "prodInvenLocationList": [
          {
            "createDate": null,
            "invenLocationId": null,
            "inventoryLocation": "CN",
            "inventoryLocationEn": "China",
            "inventoryLocationName": "中国",
            "itemcode": fromid,
            "leadingTime": 7,
            "skuInfoList": null,
            "sortVal": null,
            //"supplierId": "ff8080815b142982015b7aa734a92e2e",
            "updateDate": null
          }],
        "skuInfoList": o2
      }
      /////////////////////////////////////////
      let oo3 = {
        "class": "com.dhgate.syi.model.ProductAttributeVO",
        "attrId": dh.attrId,
        "attrName": dh.name,
        "isbrand": "0",
        "valueList": o3
      }
      ///////////////////////////////////////////////////////
      return [oo1,oo2,oo3,o4]
    },
    b11: function (dh, ali, i) {
      return {
        "class": "com.dhgate.syi.model.ProductAttributeValueVO",
        "attrValId": dh.js[i].attrValId,
        "lineAttrvalName": ali[i].skuPropertyTips,
        "lineAttrvalNameCn": "",
        "iscustomsized": "0",
        "picUrl": ali[i].fileurl,
        "brandValId": ""
      }
    },
    //将2组3组4组合成1组----注：buyAttr 和 aeopAeProductSKUs  是会被修改的
    b12: function (alisku) {
      alisku[0] = this.b13(alisku[0]);//去掉"Ships From"
      if (alisku[0].length == 1 || alisku[0].length == 0) { }
      else if (alisku[0].length == 2) {
        $("#state").html("俩组合成一组");
        alisku[0] = [this.b14(alisku, 0, 1)];
      }
      else if (alisku[0].length == 3) {
        $("#state").html("三组合成一组");
        alisku[0] = [this.b15(alisku, 0, 1, 2)];
      }
      else if (alisku[0].length == 4) {
        $("#state").html("四组合成一组");
        alisku[0] = [this.b16(alisku, 0, 1, 2, 3)];
      }
      else if (alisku[0].length == 5) {
        $("#state").html("四五组合成一组");
       alisku[0] = [this.b17(alisku, 0, 1, 2, 3, 4)];
      }
      else {
        $("#state").html("五组以上合成一组，没做");
        //alert("SMT超过，请与管理员联系。" + alisku[0].length);
      }
    },
    //去掉"Ships From"
    b13: function (alisku)
    {
      if (!alisku) alisku = [];
      let arr = [];
      for (let i = 0; i < alisku.length; i++) {
        if (alisku[i].skuPropertyName != "Ships From") {//不要【Ships From】因为第二个数组中没有用到
          arr.push(alisku[i]);
        }
      }
      return arr;
    },
    //俩组合成一组
    b14: function (alisku, A, B)
    {
      let newArr = {
        skuPropertyId: alisku[0][A].skuPropertyId + " - " + alisku[0][B].skuPropertyId,
        skuPropertyName: alisku[0][A].skuPropertyName + " - " + alisku[0][B].skuPropertyName,
        skuPropertyValues: []
      }
      for (let i = 0; i < alisku[0][A].skuPropertyValues.length; i++) {
        for (let j = 0; j < alisku[0][B].skuPropertyValues.length; j++) {
          newArr.skuPropertyValues.push(
            {
              propertyValueId: alisku[0][A].skuPropertyValues[i].propertyValueId + " - " + alisku[0][B].skuPropertyValues[j].propertyValueId,
              skuPropertyTips: alisku[0][A].skuPropertyValues[i].skuPropertyTips + " - " + alisku[0][B].skuPropertyValues[j].skuPropertyTips,
              fileurl: (
                alisku[0][A].skuPropertyValues[i].fileurl ?
                  alisku[0][A].skuPropertyValues[i].fileurl :
                  (
                    alisku[0][B].skuPropertyValues[j].fileurl ?
                      alisku[0][B].skuPropertyValues[j].fileurl : ""
                  )
              ),
            })
        }
      }
      return newArr
    },
    //三组合成一组
    b15: function (alisku, A, B, C) {
      let newArr = {
        skuPropertyId: alisku[0][A].skuPropertyId + " - " + alisku[0][B].skuPropertyId + " - " + alisku[0][C].skuPropertyId,
        skuPropertyName: alisku[0][A].skuPropertyName + " - " + alisku[0][B].skuPropertyName + " - " + alisku[0][C].skuPropertyName,
        skuPropertyValues: []
      }
      for (let i = 0; i < alisku[0][A].skuPropertyValues.length; i++) {
        for (let j = 0; j < alisku[0][B].skuPropertyValues.length; j++) {
          for (let k = 0; k < alisku[0][C].skuPropertyValues.length; k++) {
            newArr.skuPropertyValues.push(
              {
                propertyValueId: alisku[0][A].skuPropertyValues[i].propertyValueId + " - " + alisku[0][B].skuPropertyValues[j].propertyValueId + " - " + alisku[0][C].skuPropertyValues[k].propertyValueId,
                skuPropertyTips: alisku[0][A].skuPropertyValues[i].skuPropertyTips + " - " + alisku[0][B].skuPropertyValues[j].skuPropertyTips + " - " + alisku[0][C].skuPropertyValues[k].skuPropertyTips,
                fileurl: (
                  alisku[0][A].skuPropertyValues[i].fileurl ?
                    alisku[0][A].skuPropertyValues[i].fileurl :
                    (
                      alisku[0][B].skuPropertyValues[j].fileurl ?
                        alisku[0][B].skuPropertyValues[j].fileurl :
                        (
                          alisku[0][C].skuPropertyValues[k].fileurl ?
                            alisku[0][C].skuPropertyValues[k].fileurl : ""
                        )
                    )
                ),
              })
          }
        }
      }
      return newArr
    },
    //四组合成一组
    b16: function (alisku, A, B, C, D)
    {
      let newArr = {
        skuPropertyId: alisku[0][A].skuPropertyId + " - " + alisku[0][B].skuPropertyId + " - " + alisku[0][C].skuPropertyId + " - " + alisku[0][D].skuPropertyId,
        skuPropertyName: alisku[0][A].skuPropertyName + " - " + alisku[0][B].skuPropertyName + " - " + alisku[0][C].skuPropertyName + " - " + alisku[0][D].skuPropertyName,
        skuPropertyValues: []
      }
      for (let i = 0; i < alisku[0][A].skuPropertyValues.length; i++) {
        for (let j = 0; j < alisku[0][B].skuPropertyValues.length; j++) {
          for (let k = 0; k < alisku[0][C].skuPropertyValues.length; k++) {
            for (let l = 0; l < alisku[0][D].skuPropertyValues.length; l++) {
              newArr.skuPropertyValues.push(
                {
                  propertyValueId: alisku[0][A].skuPropertyValues[i].propertyValueId + " - " + alisku[0][B].skuPropertyValues[j].propertyValueId + " - " + alisku[0][C].skuPropertyValues[k].propertyValueId + " - " + alisku[0][D].skuPropertyValues[l].propertyValueId,
                  skuPropertyTips: alisku[0][A].skuPropertyValues[i].skuPropertyTips + " - " + alisku[0][B].skuPropertyValues[j].skuPropertyTips + " - " + alisku[0][C].skuPropertyValues[k].skuPropertyTips + " - " + alisku[0][D].skuPropertyValues[l].skuPropertyTips,
                  fileurl: (
                    alisku[0][A].skuPropertyValues[i].fileurl ?
                      alisku[0][A].skuPropertyValues[i].fileurl :
                      (
                        alisku[0][B].skuPropertyValues[j].fileurl ?
                          alisku[0][B].skuPropertyValues[j].fileurl :
                          (
                            alisku[0][C].skuPropertyValues[k].fileurl ?
                              alisku[0][C].skuPropertyValues[k].fileurl :
                              (
                                alisku[0][D].skuPropertyValues[l].fileurl ?
                                  alisku[0][D].skuPropertyValues[l].fileurl : ""
                              )
                          )
                      )
                  ),
                })
            }
          }
        }
      }
      return newArr
    },
    //五组合成一组
    b17: function (alisku, A, B, C, D, E)
    {
      let newArr = {
        skuPropertyId: alisku[0][A].skuPropertyId + " - " + alisku[0][B].skuPropertyId + " - " + alisku[0][C].skuPropertyId + " - " + alisku[0][D].skuPropertyId + " - " + alisku[0][E].skuPropertyId,
        skuPropertyName: alisku[0][A].skuPropertyName + " - " + alisku[0][B].skuPropertyName + " - " + alisku[0][C].skuPropertyName + " - " + alisku[0][D].skuPropertyName + " - " + alisku[0][E].skuPropertyName,
        skuPropertyValues: []
      }
      for (let i = 0; i < alisku[0][A].skuPropertyValues.length; i++) {
        for (let j = 0; j < alisku[0][B].skuPropertyValues.length; j++) {
          for (let k = 0; k < alisku[0][C].skuPropertyValues.length; k++) {
            for (let l = 0; l < alisku[0][D].skuPropertyValues.length; l++) {
              for (let m = 0; m < alisku[0][E].skuPropertyValues.length; m++) {
                newArr.skuPropertyValues.push(
                  {
                    propertyValueId: alisku[0][A].skuPropertyValues[i].propertyValueId + " - " + alisku[0][B].skuPropertyValues[j].propertyValueId + " - " + alisku[0][C].skuPropertyValues[k].propertyValueId + " - " + alisku[0][D].skuPropertyValues[l].propertyValueId + " - " + alisku[0][E].skuPropertyValues[m].propertyValueId,
                    skuPropertyTips: alisku[0][A].skuPropertyValues[i].skuPropertyTips + " - " + alisku[0][B].skuPropertyValues[j].skuPropertyTips + " - " + alisku[0][C].skuPropertyValues[k].skuPropertyTips + " - " + alisku[0][D].skuPropertyValues[l].skuPropertyTips + " - " + alisku[0][E].skuPropertyValues[m].skuPropertyTips,
                    fileurl: (
                      alisku[0][A].skuPropertyValues[i].fileurl ?
                        alisku[0][A].skuPropertyValues[i].fileurl :
                        (
                          alisku[0][B].skuPropertyValues[j].fileurl ?
                            alisku[0][B].skuPropertyValues[j].fileurl :
                            (
                              alisku[0][C].skuPropertyValues[k].fileurl ?
                                alisku[0][C].skuPropertyValues[k].fileurl :
                                (
                                  alisku[0][D].skuPropertyValues[l].fileurl ?
                                    alisku[0][D].skuPropertyValues[l].fileurl :
                                    (
                                      alisku[0][E].skuPropertyValues[m].fileurl ?
                                        alisku[0][E].skuPropertyValues[m].fileurl : ""
                                    )
                                )
                            )
                        )
                    ),
                  })
              }
            }
          }
        }
      }
      return newArr
    },
    //给DH上自定义属性
    b18: function (smtsku) {
      let o1 = [], len,str="";
      if (smtsku.length == 1) {
        //SMT只能是一组购物车属性，多组还没做,没样本
        len = smtsku[0].skuPropertyValues.length < 20 ? smtsku[0].skuPropertyValues.length : 20;//自定义属性不能超过20个。
        for (var i = 0; i < len; i++) {
          o1.push({
            "attrvalName": smtsku[0].skuPropertyValues[i].skuPropertyTips,
            "attrId": 9999,
            "attrValId": 1000 + i,
            "picUrl": smtsku[0].skuPropertyValues[i].fileurl
          })
          //////////////////////////////////
          str += '\
          <tr>\
            <td><input class="form-control w200" type="text" disabled="disabled" value="' + smtsku[0].skuPropertyValues[i].skuPropertyTips + '"></td>\
            <td><img src="//img4.dhresource.com/50x50/' + smtsku[0].skuPropertyValues[i].fileurl + '"></td>\
          </tr>';
        }
        /////////////////////////////////////////
        $("#body").append('<tr><td class="right">产品规格：</td><td><table>' + str + '</table></td></tr>')
      }
      else {
        //alert("不可能到这。")
        //Tool.pre(smtsku)
        o1 = false;
      }
      return o1;
    },
    b19: function (Barr) {
      let arr = [], o1 = [], stock = 0, smtsku = Barr.prodes.aeopAeProductSKUs
      let len = smtsku[0][0].skuPropertyValues.length < 20 ? smtsku[0][0].skuPropertyValues.length : 20;
      for (let i = 0; i < len; i++) {
        arr = this.b06(smtsku[1], smtsku[0][0].skuPropertyId, smtsku[0][0].skuPropertyValues[i].propertyValueId);//算出价格和库存
        stock += arr[1]
        o1.push({
          "class": "#",
          "attrList": [
            { "attrId": "9999", "attrVid": "" + (1000 + i), "type": "1", "class": "##" },
            { "attrId": "8888", "attrVid": "CN", "type": "1", "class": "##" }
          ],
          "status": "" + (arr[1] ? 1 : 0),
          "price": this.b07(arr[0], Barr.ratio, Barr.prodes.freight),
          "stock": "" + arr[1],
          "skuCode": Barr.proid + "-" + (i + 1),
          "id": "9999_" + (1000 + i) + "A8888_CN"
        })
      }
      let oo = {
        "prodInvenLocationList": [
          {
            "class": "###",
            "inventoryLocation": "CN",
            "leadingTime": "4"
          }
        ],
        "skuInfoList": o1
      }
      return stock == 0 ? false : oo;
    },
    b20: function (Barr) {
      let arr = [], o1 = [], smtsku = Barr.prodes.aeopAeProductSKUs;
      let len = smtsku[0][0].skuPropertyValues.length < 20 ? smtsku[0][0].skuPropertyValues.length : 20;
      for (let i = 0; i < len; i++) {
        arr = this.b06(smtsku[1], smtsku[0][0].skuPropertyId, smtsku[0][0].skuPropertyValues[i].propertyValueId);//算出价格和库存
        o1.push({
          "attrList": [
            {
              "attrId": "9999",
              "attrValCode": null,
              "attrValName": null,
              "attrVid": "" + (1000 + i),
              "type": "3"
            },
            {
              "attrId": "8888",
              "attrValCode": "CN",
              "attrValName": "中国",
              "attrVid": "6778",
              "type": "4"
            }
          ],
          "oriPrice": "",
          "price": this.b07(arr[0], Barr.ratio, Barr.prodes.freight),
          "realIncome": null,
          "skuCode": Barr.proid + "-" + (i + 1),
          "status": "1",
          "stock": arr[1]
        })
      }
      ///////////////////////////////////////////////////////
      let oo = {
        "prodInvenLocationList": [
          {
            "createDate": null,
            "invenLocationId": null,
            "inventoryLocation": "CN",
            "inventoryLocationEn": "China",
            "inventoryLocationName": "中国",
            "itemcode": Barr.fromid,
            "leadingTime": 7,
            "skuInfoList": null,
            "sortVal": null,
            // "supplierId": "ff8080815fbe392b01608264ffbc779e",
            "updateDate": null
          }],
        "skuInfoList": o1
      }
      return oo;
    },
    b21: function (proSkuInfo) {
      let arr = proSkuInfo.skuInfoList, str = this.b22(arr[0].attrList)
      
      for (let i = 0; i < arr.length; i++) {
        str += '<tr>\
        '+ this.b23(arr[i].attrList)+'\
        <td><select class="form-select" disabled="disabled"><option value="1" '+ (arr[i].status == "1" ? 'selected="selected"' : "") + '>可销售</option><option value="0" ' + (arr[i].status == "0" ? 'selected="selected"' : "") +'>不可销售</option></select></td>\
        <td><table class="w-100"><tr><td class="right">US $ </td><td><input class="form-control" type="text" disabled="disabled" value="'+ arr[i].price+'"></td><td> 件</td></table></td>\
        <td>'+ arr[i].price +'</td>\
        <td>'+ arr[i].stock +'</td>\
        <td>'+ arr[i].skuCode +'</td>\
        </tr>'
      }
      return '<table class="w-100">' + str + '</table>';
    },
    b22: function (arr) {
      let str = '<tr>'
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].attrId == "9999") {
          str += '<th>自定义</th>'
        }
        else if (arr[i].attrId == "8888") {
          str += '<th>备货地</th>'
        }
      }
      str += '<th>销售状态</th><th>预计收入</th><th>买家价格</th><th>备货数量</th><th>商品编码</th></tr>'
      return str;
    },
    b23: function (arr) {
      let str = ''
      for (let i = 0; i < arr.length; i++) {
        
        if (arr[i].attrVid == "CN") {
          str += '<td>中国</td>'
        } else {
          str += '<td>' + arr[i].attrVid + '</td>'
        }
      }
      return str;
    },
	}
})