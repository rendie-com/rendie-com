'use strict';
var fun =
{
    obj: {
        username: "", fromid: 0, token: []
    },
    a01: function () {
        //obj.arr[3]        选择JS文件
        //obj.arr[4]        翻页
        //obj.arr[5]        切换账户
        Tool.header02.a01("-_-20",this.a03, this);
    },
    a03: function (header, fromid, username, token) {
        this.obj.fromid = fromid
        this.obj.username = username
        this.obj.token = token
        ////////////////////////////////////////
        let html = header + '\
		<div class="p-2">\
            '+ Tool.header01(obj.arr[3]) +'\
            <div class="border">\
                 <ul class="makeHtmlTab" id="makeHtmlTab">\
                    <li class="hover" val="100">接口</li>\
                    <li val="010">相册</li>\
                    <li val="001">当前代码</li>\
		        </ul>\
                <div id="api">'+this.b01()+'</div>\
                <div id="dh_album_list"></div>\
                <table class="table align-middle hide mb-0" id="thisCode">\
                    <tbody>\
                        <tr>\
                            <td class="right w100">请求地址：</td><td><input type="text" class="form-control" id="thisUrl" disabled="disabled"></td>\
                        </tr>\
                        <tr>\
                            <td class="right w100">post参数：</td><td><textarea id="thisPost" rows="10" class="form-control" disabled="disabled"></textarea></td>\
                        </tr>\
                        <tr>\
                            <td class="right w100">返回内容：</td><td><textarea id="thisJson" rows="30" class="form-control" disabled="disabled"></textarea></td>\
                        </tr>\
                    </tbody>\
                </table>\
            </div>\
       </div>'
        Tool.html(this.a04, this, html);
    },
    a04: function () {
        let This = this;
        $("#makeHtmlTab li").click(function () {
            $("#makeHtmlTab li").removeAttr('class')
            $(this).attr("class", "hover")
            let mode = $(this).attr("val")
            if (mode == "100") {
                $("#api").show()
                $("#dh_album_list,#thisCode").hide()
            }
            else if (mode == "010") {
                $("#dh_album_list").show()
                $("#api,#thisCode").hide()
                Tool.dh_album_list.a01(This.obj.token.access_token);
            }
            else if (mode == "001") {
                $("#api,#dh_album_list").hide()
                $("#thisCode").show()
            }
        })
    },
    //卖家API>相册API
    b01: function () {
        let str= '\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/98654f7a9af4435e9893c702b0382a69" target="_blank">dh.album.get$2.0</a></td>\
          <td>卖家获取相册详情</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/efa0f2c3b28241a2bfbeaff27b34dfad" target="_blank">dh.album.img.delete$2.0</a></td>\
          <td>卖家刪除相册圖片接口,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/5312f698d3cf4cbf9cceb778d51e4219" target="_blank">dh.album.img.list$2.0</a></td>\
          <td>获取相册图片列表接口,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/3414e6f5156b4815b98e1fa77315cf11" target="_blank">dh.album.img.post$1.1</a></td>\
          <td>卖家保存图片到相册,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/74c5b8664567435e84d173232a4af69c" target="_blank">dh.album.img.post$2.0</a></td>\
          <td>卖家批量保存图片到相册,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/a36dec2d0b584207a4fa2c06c10fceb8" target="_blank">dh.album.img.upload$2.0</a></td>\
          <td>卖家上传产品图片,文件编码为BASE64的字符串,必须以POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/3b162b6d0cdd401cbfde43b2729f3433" target="_blank">dh.album.img.upload$2.1</a></td>\
          <td>卖家上传产品图片,仅支持商品图片类型,文件编码为BASE64的字符串,必须以POST方式提交请求,若返回图片url地址类似f2/albu/g1/M00/01/02/rBVaIVPxjnCIBEuBAAB1EDXekqMAAAYbgGJ1EkAAHUo678.jpg，其获取方式为http://image.dhgate.com/100x100/f2/albu/g1/M00/01/02/rBVaIVPxjnCIBEuBAAB1EDXekqMAAAYbgGJ1EkAAHUo678.jpg,若其返回图片url类似albu_841432510_00，则该图片获取路径为http://image.dhgate.com/albu_841432510_00/1.0x0.jpg</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/114771a7ac08429abf742cc3048c1208" target="_blank">dh.album.list$2.0</a></td>\
          <td>卖家获取相册列表</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/a3a7a525dd7945f08c998aa5a14fe4cd" target="_blank">dh.album.repeat.get$2.0</a></td>\
          <td>判断图片文件是否重复上传,仅支持POST方式提交请求</td>\
        </tr>\
        <tr>\
          <td><a href="https://open.dhgate.com/docs/api/detail/0784780efb844d26974e9fa6a7fea5ba" target="_blank">dh.albums.get$1.0</a></td>\
          <td>卖家获取相册列表</td>\
        </tr>\
        <tr>\
          <td class="right">来源：</td>\
          <td><a href="https://open.dhgate.com/docs/api/001001" target="_blank">https://open.dhgate.com/docs/api/001001</a>（卖家API &gt; 相册API）</td>\
        </tr>';
        return '<table class="table mb-0 table-hover">\
                  <thead class="table-light"><tr><th class="w300">API名称</th><th>API描述</th></tr></thead>\
                  <tbody id="tbody">'+ str + '</tbody>\
                </table>'
    },
}
fun.a01();