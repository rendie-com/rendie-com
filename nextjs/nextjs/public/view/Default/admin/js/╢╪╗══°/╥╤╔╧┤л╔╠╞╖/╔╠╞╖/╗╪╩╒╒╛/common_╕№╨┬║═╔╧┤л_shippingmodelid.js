'use strict';
Object.assign(Tool, {
	shippingmodelid:
	{
    a01: function (next, This, Barr, shippingModel) {
			let html = '<r:freight db="sqlite.aliexpress" size=1 where=" where @.name=\'' + this.b01(Barr) + '\'"><:freightID/></r:freight>'
      Tool.ajax.a01( html,1,this.a02, this,  [next, This, shippingModel]);
    },
    a02: function (modelName, nextThis) {
      if (modelName == "") {
        $("#state").html("无一个国家能在20天内送达");
        nextThis[0].apply(nextThis[1], [{ err: "出错", proStatus: 48, msg: "无一个国家能在20天内送达" }]);
      }
      else {
        let arr = nextThis[2], shippingTempId = ""
        for (let i = 0; i < arr.length; i++)//找出免运费的模板ID
        {
          if (modelName == arr[i].modelName) {
            shippingTempId = arr[i].shippingTempId;
            $("#state").append('运费模板：' + shippingTempId + '（' + arr[i].modelName + '）')
            break;
          }
        }

        if (shippingTempId == "") {

          $("#state").html("请在DH创建要一个运费模板");
          //nextThis[0].apply(nextThis[1], [{ err: "出错", proStatus: 44, msg: "请在DH创建要一个运费模板" }]);
         
        }
        else
        {
          nextThis[0].apply(nextThis[1], [shippingTempId]);
        }
      }
    },
    b01: function (items) {
      let nArr = [], arr1 = ["RU", "IN", "BR", "SE", "CA", "DE", "AU", "IT", "ES", "UK", "FR", "US", "MY", "NL", "IE"]//注：顺序不能乱调（否则就不能判断名称有重复）
      for (let i = 0; i < arr1.length; i++) {
        if (items["minDay" + arr1[i]] != undefined) {
          if (items["minDay" + arr1[i]] <20) { nArr.push(arr1[i]); }
        }
        else {
          Tool.at("站点【" + arr1[i] + "]字段没有填写。")
        }
      }
      return nArr.join(",")
    }
	}
})