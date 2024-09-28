'use strict';
Object.assign(Tool, {
    PurchaseStatus: function (PurchaseStatus) {
        let str = "";
        switch (PurchaseStatus) {
            case 0: str = "等待采购"; break;
            case 1: str = "待付款"; break;
            case 2: str = "已付款"; break;
            case 3: str = "退款中"; break;
            case 4: str = "取消"; break;
            case 5: str = "问题订单"; break;
            case 6: str = "无需采购"; break;
            case 7: str = "问题订单(未发货)"; break;
            case 8: str = "假运单号(已发货)"; break;
            case 9: str = "申请二次采购"; break;
            case 10: str = "采购退款成功"; break;
            case 11: str = "采购退款失败"; break;
            case 12: str = "非正常采购"; break;
            default: str = "未知:" + PurchaseStatus;
        }
        return str;
    },
    queryState: function (queryState) {
        let str = "";
        switch (queryState) {
            case 13: str = "无需查询"; break;
            case 0: str = "未查询"; break;
            case 1: str = "【菜鸟】查询不到"; break;
            case 2: str = "【菜鸟】揽收"; break;
            case 3: str = "【菜鸟】运输中"; break;
            case 4: str = "【菜鸟】妥投失败"; break;
            case 5: str = "【菜鸟】妥投"; break;
            case 6: str = "【17track】查询不到"; break;
            case 7: str = "【17track】运输途中"; break;
            case 8: str = "【17track】到达待取"; break;
            case 9: str = "【17track】投递失败"; break;
            case 10: str = "【17track】成功签收"; break;
            case 11: str = "【17track】可能异常"; break;
            case 12: str = "【17track】运输过久"; break;
            default: str = "未知:" + queryState;
        }
        return str;
    },
    Express: function (name)//先用个ePacket发下，看能否成功，不成功就改成万能的。
    {
        let str = "";
        switch (name) {
            case "ePacket":
            case "Sweden Post":
            case "DHL":
            case "SF eParcel":
            case "Fedex IE":
            case "EMS":
            case "e-EMS":
            case "TNT":
            case "Ocean":
                str = name; break;
            case "CNE":
            case "Other Shipping Method":
            case "USPS":
            case "SunYou":
            case "AliExpress Standard Shipping":
            case "AliExpress&nbsp;Saver&nbsp;Shipping":
            case "China Post Ordinary Small Packet Plus":
            case "China Post Registered Air Mail":
            case "Yanwen Economic Air Mail":
            case "4PX Singapore Post OM Pro":
            case "Seller's Shipping Method":
            case "SunYou Economic Air Mail":
            case "POS Malaysia":
            case "Special Line-YW":
            case "Correos Economy":
            case "Other":
            case "Singapore Post":
            case "Seller's Shipping Method - US":
            case "HongKong Post Air Mail":
            case "UPS Express Saver":
            case "PostNL":
            case "UBI":
            case "Enterprise des Poste Lao":
            case "DHL e-commerce":
            case "Bpost International":
            case "SF Economic Air Mail":
            case "Turkey Post":
            case "SF Express":
            case "DPD":
            case "4PX RM":
            case "Cainiao Super Economy":
            case "CNE Express":
            case "One World Express":
            case "AliExpress Premium Shipping":
            case "Cainiao Standard For Special Goods":
            case "中国邮政平常小包+":
            case "e邮宝":
            case "菜鸟专线-标准":
            case "菜鸟超级经济-顺友":
            case "菜鸟超级经济-燕文":
            case "AliExpress 无忧物流-标准":
            case "4PX新邮经济小包":
            case "卖家自定义-中国":
            case "中国邮政挂号小包":
            case "AliExpress 无忧物流-简易":
            case "菜鸟超级经济":
            case "老挝邮政":
            case "马来西亚邮政挂号小包":
            case "卖家自定义-法国":
            case "E特快":
            case "新加坡邮政挂号小包":
            case "燕文航空挂号小包":
            case "UPS全球快捷":
            case "4PX美国FEDEX本地邮局派送":
            case "无忧集运-沙特":
            case "卖家自定义-美国":
            case "卖家自定义-中国":
            case "菜鸟超级经济Global":
            case "递四方专线小包":
            case "荷兰邮政挂号小包":
            case "中外运-西邮经济小包":
            case "比利时邮政":
            case "菜鸟特货专线－超级经济":
            case "菜鸟专线经济":
            case "香港邮政挂号小包":
            case "土耳其邮政挂号小包":
            case "顺友":
            case "佳成专线":
            case "出口易":
            case "美国邮政":
            case "三态物流":
            case "UPS全球速快":
            case "AliExpress 无忧物流-优先":
            case "顺友特货专线":
            case "菜鸟无忧物流-简易":
            case "菜鸟无忧物流-标准":
            case "菜鸟特货专线-标快":
            case "Cainiao Super Economy Global":
            case "AliExpress Saver Shipping":
            case "Cainiao Expedited Economy":
            case "SHUNYOU_STANDARD_SG":
            case "TOPYOU Special Economy":
                str = "ePacket"; break;//先用ePacket发货不行再必改
            case "顺丰国际挂号小包":
            case "顺丰国际经济小包":
            case "顺丰速运":
                str = "SF eParcel"; break;
            case "Fedex IP": str = "FEDEX_IP"; break;
            default: str = " 未知物流【" + name + "】";
        }
        return str;
    },
    //获取敦煌【seller】表1条信息(主要用于进度条当中)
    DH_seller: function (where, field, A2) {
        let arr1 = field.split(","),
            arr2 = ["username", "password", "afterSaleID", "note"],
            arr3 = ["token", "shippingModel", "upmode", "group", "cookies"],
            arr4 = ["fromid", "time1", "time2", "time3", "time4", "time5", "time6", "time7"],
            nArr = [];
        for (let i = 0; i < arr1.length; i++) {
            if (arr2.indexOf(arr1[i]) != -1) {
                nArr.push('"' + arr1[i] + '":"<:' + arr1[i] + '/>"')
            }
            else if (arr3.indexOf(arr1[i]) != -1) {
                nArr.push('"' + arr1[i] + '":<:' + arr1[i] + ' tag=0/>')
            }
            else if (arr4.indexOf(arr1[i]) != -1) {
                nArr.push('"' + arr1[i] + '":<:' + arr1[i] + '/>')
            }
            else {
                Tool.at('【seller】表;不存在' + arr1[i] + '字段;')
                zzz
            }
        }
        return '\
        { \
            "A2":'+ (A2 == 0 ? '<@count/>' : 0) + '\
            <r:seller db="sqlite.dhgate" size=1 page=2 where=" '+ where + ' order by @.sort asc,@.id asc">,\
            '+ nArr.join(",") + '\
            </r:seller>\
        }'
    },
    //站内信设置【已读】【未读】
    //用法：
    //Tool.message_status(this,this.message_status04);
    //输入：this.obj.fromid=xxx
    //      this.obj.token=[{expires_in:xxx,access_token:xxx:,refresh_token:xxx}]
    //      this.obj.username=xxx
    //      this.obj.password=xxx
    //      this.obj.msg={isRead:xxx,msgIds:xxx};
    //输出：无
    message_status: function (A, B)//设置【已读】【未读】
    {
        this.obj.fromid = A.obj.fromid
        this.obj.token = A.obj.token
        this.GetToken(this, this.message_status02, [A, B]);//得到token
    },
    message_status02: function (arr) {
        let oo =
        {
            access_token: this.token,
            method: "dh.message.status.update",
            timestamp: new Date().getTime(),
            v: "2.0",
            msgIds: arr[0].obj.msg.msgIds,
            readStatus: arr[0].obj.msg.isRead
        }
        gg.postFetch("http://api.dhgate.com/dop/router", oo, this.message_status03, this, arr);
    },
    message_status03: function (oo, arr) {
        if (oo.result == true) {
            this.message_status04(arr);
        }
        else if (oo.message == "令牌Access Token过期或不存在" || oo.message == "非法的参数")//【DH的问题】没解决之前，都得用这个
        {
            alert("qqqqqqqqqqqqqqqqq")
            //win.isRD(this.c04,this,arr);
        }
        else {
            Tool.echo(oo);
        }
    },
    message_status04: function (arr) {
        let str = '\
		<r: db="sqlite.dhgate">\
			update @.msg set @.receiverRead='+ arr[0].obj.msg.isRead + ' where @.fromid=' + arr[0].obj.msg.msgIds + ' and @.receiver=\'' + arr[0].obj.username + '\'\
		<1/>\
			update @.msg set @.SenderRead='+ arr[0].obj.msg.isRead + ' where @.fromid=' + arr[0].obj.msg.msgIds + ' and @.Sender=\'' + arr[0].obj.username + '\'\
		</r:>';
        Tool.ajax.a01(str, 1, this.message_status05, this, arr)//不用软件
    },
    message_status05: function (t, arr)//不用软件
    {
        if (Tool.Trim(t) == "") {
            arr[1].apply(arr[0]);
        }
        else {
            Tool.at("出错002:" + t);
        }
    },
})
////////////////////////////////////////
//  c04:function(arr)
//	{
//    this.obj={username:arr[0].obj.username,password:arr[0].obj.password}
//    this.login(this,this.c05,arr);
//  },
//  c05:function(arr)
//	{
//    let URL="http://seller.dhgate.com/messageweb/read.do?state="+arr[0].obj.msg.isRead+"&topicid="+arr[0].obj.msg.msgIds
//    win.ajax("2",URL,this.c06,this,arr);
//  },
//  c06:function(arr)
//	{
//    let str=win.WebGetHTML("2","html|");
//    if(str.indexOf('"isSuccess":true')!=-1)
//    {
//      this.loginout(this,this.c07,arr);
//    }
//    else
//    {Tool.Time(this.c06,300,this,"1",arr);}
//  },
//  c07:function(arr){this.message_status04(arr);},
//  ////////////////////////////////////////////////////
//  /*
//  删除DH商品和本地商品
//  用法：
//  Tool.d01(this,this.message_status04,itemCode);
//  输入：this.token=xxxxxxxxxx
//  输出：无
//  */
//  d01:function(A,B,itemCodes)
//  {
//    let URL = "http://api.dhgate.com/dop/router?access_token=" + A.token + "&method=dh.item.delete.list&timestamp=" + new Date().getTime()+"&v=2.0&itemCodes="+itemCodes.join(",")
//		Tool.ajax.a01("<.WebClientPost("+escape(URL)+")/>",1,[A,B,this.d02,this,itemCodes]);
//  },
//  d02:function(oo,arr)
//  {
//		if(oo.isSuccess)
//		{
//			let html='<.Db("sqlite.aliexpress","delete from @.proupdhgate where @.fromid in('+arr[2].join(",")+')","execute")/>'
//			Tool.ajax.a01(html,1,this.d03,this,arr);
//		}else{Tool.echo(oo);}
//  },
//  d03:function(t,arr)
//  {
//    if(t=="")
//    {arr[1].apply(arr[0]);}
//    else
//    {Tool.echo(t);}
//  },
//}