'use strict';
Object.assign(Tool, {
    upVideo://上传视频返回,上传好的图片地址。
    {
        next: null, This: null, t: null,
        a01: function (url, next, This, t) {
            this.next = next;
            this.This = This;
            this.t = t;
            this.a02(url)
        },
        a02: function (url) {
            let str = '""<r: db="mysql.tool">update @.action set @.code=\'"' + url + '"\' where @.name=\'Shopee上传视频铺助\'</r:>'
            $("#state").html("正在发送数据给【rendie软件】。。。");
            Tool.ajax.a01(str, 1, this.a03, this)
        },
        a03: function () {
            $("#state").html("等待【rendie软件】上传数据，直到全部上传完，才断续。。。");
            Tool.Time(this.a04, 500, this, "1");
        },
        a04: function () {
            let str = '<r:action db="mysql.tool" size=1 where=" where @.name=\'Shopee上传视频铺助\'"><:code tag=0/></r:action>'
            $("#state").html('正在查询数数据，看是否存在，不存在说明上传完了。。。');
            Tool.ajax.a01(str, 1, this.a05, this)
        },
        a05: function (t) {
            if (t == 0) {
                $("#state").html("上传完，正在获得信息。。。")
                this.a06();
            }
            else { this.a03(); }
        },
        a06: function () {
            $("#state").html("监听url(包含)。(浏览器必须打开调试模式。即F12)")
            gg.setNetwork("seller.shopee.cn/api/upload/v1/get_video_upload_result_batch", this.a07, this)
        },
        a07: function () {
            $("#state").html("点确认，等待上视频上传成功，可能要等久一点。。。")
            let code = '$(function(){$(".shopee-button--primary span:contains(\'确认\')").click();});'//点确认
            gg.tabs_executeScript_indexOf(2, null, code, '视频时长无效<1/>s-cf-sg.shopeesz.com/file/<1/>错误。请稍后再试',true, this.a08, this);
        },
        a08: function (t) {
            if (t.indexOf('视频时长无效') != -1) {
                this.a10(null, "视频时长无效")
            }
            else if (t.indexOf('错误。请稍后再试') != -1) {
                let code = '$(function(){$(".action-delete i.shopee-icon").click();});'//删除商品视频
                gg.tabs_executeScript_indexOf(2, null, code, 'upload-text">添加视频',true, this.a10, this, '错误。请稍后再试');
            }
            else {
                $("#state").html("正在获得监听结果")
                gg.getNetwork(this.a09, this)
            }
        },
        a09: function (t) {
            let oo; eval("oo=" + t)
            let nArr = [
                {
                    "vid": oo.data[0].vid,
                    "video_id": oo.data[0].video_info.video_id,
                    "thumb_url": oo.data[0].video_info.thumbnail,
                    "duration": oo.data[0].video_info.duration,
                    "version": 2,
                }
            ]
            let code = '$(function(){$(".action-tools-icon:eq(1)").click();});'//删除商品视频
            gg.tabs_executeScript_indexOf(2, null, code, 'upload-text">添加视频',true, this.a10, this, nArr);
        },
        a10: function (temp, arr)//返回
        {
            let next = this.next, This = this.This, t = this.t;
            this.next = null
            this.This = null
            this.t = null
            next.apply(This, [arr, t]);
        }
    },
})

//	/////////////////////////////////////////
//	arr[1].obj.time2=oo.time2;//【秒杀活动】结束时间
//	arr[1].obj.time3=oo.time3;//【折扣活动】结束时间
//	arr[1].obj.time5=oo.time5;//【新优惠券】结束时间
//	arr[0].apply(arr[1]);
//},
