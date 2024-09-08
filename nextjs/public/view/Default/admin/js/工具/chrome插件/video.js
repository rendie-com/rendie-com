'use strict';
let video_rendie_com =
{
    arr: [
        { "name": "纯净/B站", "url": "https://z1.m1907.cn/?jx=" },
        { "name": "高速接口", "url": "https://jsap.attakids.com/?url=" },
        { "name": "综合/B站1", "url": "https://vip.parwix.com:4433/player/?url=" },
        { "name": "OK解析", "url": "https://okjx.cc/?url=" },
        { "name": "乐多资源", "url": "https://api.leduotv.com/wp-api/ifr.php?isDp=1&vid=" },
        { "name": "虾米", "url": "https://jx.xmflv.com/?url=" },
        { "name": "全民", "url": "https://jx.quanmingjiexi.com/?url=" },
        { "name": "七哥", "url": "https://jx.mmkv.cn/tv.php?url=" },
        { "name": "冰豆", "url": "https://api.qianqi.net/vip/?url=" },
        { "name": "诺诺", "url": "https://www.ckmov.com/?url=" },
        { "name": "迪奥", "url": "https://123.1dior.cn/?url=" },
        { "name": "CK", "url": "https://www.ckplayer.vip/jiexi/?url=" },
        { "name": "LE", "url": "https://lecurl.cn/?url=" },
        { "name": "ckmov", "url": "https://www.ckmov.vip/api.php?url=" },
        { "name": "ccyjjd", "url": "https://ckmov.ccyjjd.com/ckmov/?url=" },
        { "name": "RDHK", "url": "https://jx.rdhk.net/?v=" },
        { "name": "爱豆", "url": "https://jx.aidouer.net/?url=" },
        { "name": "H8", "url": "https://www.h8jx.com/jiexi.php?url=" },
        { "name": "BL", "url": "https://vip.bljiex.com/?v=" },
        { "name": "解析la", "url": "https://api.jiexi.la/?url=" },
        { "name": "MUTV", "url": "https://jiexi.janan.net/jiexi/?url=" },
        { "name": "MAO", "url": "https://www.mtosz.com/m3u8.php?url=" },
        { "name": "老板", "url": "https://vip.laobandq.com/jiexi.php?url=" },
        { "name": "盘古", "url": "https://www.pangujiexi.cc/jiexi.php?url=" },
        { "name": "盖世", "url": "https://www.gai4.com/?url=" },
        { "name": "小蒋", "url": "https://www.kpezp.cn/jlexi.php?url=" },
        { "name": "YiTV", "url": "https://jiexi.us/?url=" },
        { "name": "星空", "url": "http://60jx.com/?url=" },
        { "name": "0523", "url": "https://go.yh0523.cn/y.cy?url=" },
        { "name": "17K云", "url": "https://17kyun.com/api.php?url=" },
        { "name": "4K", "url": "https://jx.4kdv.com/?url=" },
        { "name": "云析", "url": "https://jx.yparse.com/index.php?url=" },
        { "name": "8090", "url": "https://www.8090g.cn/?url=" },
        { "name": "江湖", "url": "https://api.jhdyw.vip/?url=" },
        { "name": "诺讯", "url": "https://www.nxflv.com/?url=" },
        { "name": "PM", "url": "https://www.playm3u8.cn/jiexi.php?url=" },
        { "name": "奇米", "url": "https://qimihe.com/?url=" },
        { "name": "思云", "url": "https://jx.ap2p.cn/?url=" },
        { "name": "听乐", "url": "https://jx.dj6u.com/?url=" },
        { "name": "aijx", "url": "https://jiexi.t7g.cn/?url=" },
        { "name": "夜幕", "url": "https://www.yemu.xyz/?url=" },
        { "name": "52", "url": "https://vip.52jiexi.top/?url=" },
        { "name": "黑米", "url": "https://www.myxin.top/jx/api/?url=" },
        { "name": "豪华啦", "url": "https://api.lhh.la/vip/?url=" },
        { "name": "凉城", "url": "https://jx.mw0.cc/?url=" },
        { "name": "33t", "url": "https://www.33tn.cn/?url=" },
        { "name": "180", "url": "https://jx.000180.top/jx/?url=" },
        { "name": "无名", "url": "https://www.administratorw.com/video.php?url=" },
        { "name": "黑云", "url": "https://jiexi.380k.com/?url=" },
        { "name": "九八", "url": "https://jx.youyitv.com/?url=" }
    ],
    T: [],
    Time: function (A, B, C, D, E) {
        let This = this;
        if (This.T[D]) {
            window.clearTimeout(This.T[D]);
            delete This.T[D];
        };
        This.T[D] = window.setTimeout(function () {
            if (E) { A.apply(C, [E]); } else { A.apply(C); }
        }, B);
    },//延时执行
    a01: function () {
        this.Time(this.a02, 100, this, "1");
    },
    a02: function () {
        if ($(".mod_player").length == 1) {
            let the_cookie = 0;
            //if(the_cookie==""){the_cookie=1;}else{the_cookie=parseInt(the_cookie);}
            //alert(the_cookie)
            //$.cookie('the_cookie', 'the_value', { expires: 7 });
            let arr = [];
            for (let i = 0; i < this.arr.length; i++) {
                if (i == the_cookie) { arr.push('<a href="#" class="ft_vcoin_item" style="padding:5px 0 5px;background:yellowgreen;"><span class="tit">' + this.arr[i].name + '</span></a>' + (i % 3 == 2 ? '<br/>' : '')) }
                else { arr.push('<a href="#" class="ft_vcoin_item" style="padding:5px 0 5px;"><span class="tit">' + this.arr[i].name + '</span></a>' + (i % 3 == 2 ? '<br/>' : '')) }

            }
            $(".ft_cell_pop").css({ "top": "-400px", "right": "0" });
            $(".ft_vcoin_content").html(arr.join("\n"));
            $(".ft_cell_feedback").remove();
            let html = '<iframe allowtransparency="true" frameborder="0" scrolling="no" allowfullscreen="true" name="jx_play" style="height:100%;width:100%" src="' + this.arr[the_cookie].url + window.location.href + '"></iframe>'
            $("#mod_player").html(html);
            /*
            $("a[_stat$='list:click']").on('mouseover',function(e)
            {
                let href = $(this).attr('href') || $(this).data("href");
                $(this).off('click.chrome');
                $(this).on('click.chrome', function()
                {
                    window.location.href = href
                }).attr('data-href', href).css({
                    cursor: 'pointer'
                }).removeAttr('href')
            })
*/
        }
        else { this.a01(); }
    }
}
video_rendie_com.a01();
/*

$(function(){})
<style>
#vip_movie_box7543401mmx{cursor:pointer; position:fixed; top:172px; left:26px; width:0px; z-index:99999999; font-size:16px; text-align:left;}
#vip_movie_box7543401mmx .img_box7543401mmx{width:26px; height:32px;line-height:32px;text-align:center;background-color:#FF4D40;}
#vip_movie_box7543401mmx .img_box7543401mmx>img {width:20px; display:inline-block; vertical-align:middle;}

#vip_movie_box7543401mmx .showhide_box7543401mmx{padding-left:5px;position: absolute;left: 26px;top: 0;}
#vip_movie_box7543401mmx .vip_mod_box_action_687ii{width:380px; max-height:400px; overflow-y:auto;background-color:rgba(241,241,241);}
#vip_movie_box7543401mmx .default-scrollbar-55678::-webkit-scrollbar{width:5px; height:1px;}
#vip_movie_box7543401mmx .default-scrollbar-55678::-webkit-scrollbar-thumb{box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2); background:#A8A8A8;}
#vip_movie_box7543401mmx .default-scrollbar-55678::-webkit-scrollbar-track{box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2); background:#F1F1F1;}

#vip_movie_box7543401mmx .vip_mod_box_action_687ii> .item_box7543401mmx{margin-bottom:10px;}
#vip_movie_box7543401mmx .vip_mod_box_action_687ii> .item_box7543401mmx:last-child{margin-bottom:0px;}
#vip_movie_box7543401mmx .vip_mod_box_action_687ii> .item_box7543401mmx >.title7543401mmx{font-size:14px; text-align:left;color:#000000;font-weight:600;margin:5px 3px;}
#vip_movie_box7543401mmx .vip_mod_box_action_687ii> .item_box7543401mmx >.interface_box7543401mmx{}
#vip_movie_box7543401mmx .vip_mod_box_action_687ii> .item_box7543401mmx >.interface_box7543401mmx>span{border-radius:3px;border-top:3px solid #FF4D40; border-bottom:3px solid #FF4D40;display:inline-block;width:calc(25% - 6px);width:-moz-calc(25% - 6px);width: -webkit-calc(25% - 6px);height:20px;line-height:20px;background-color:#FF4D40;color:#FFF;cursor:pointer;margin:3px;text-align:center;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;-o-text-overflow:ellipsis;font-size:12px!important;}							
#vip_movie_box7543401mmx .vip_mod_box_action_687ii> .item_box7543401mmx >.interface_box7543401mmx>span:hover{border-top:3px solid #000000; border-bottom:3px solid #000000;}
#vip_movie_box7543401mmx .vip_mod_box_action_687ii> .item_box7543401mmx >.interface_box7543401mmx>span.selected{border-top:3px solid #000000; border-bottom:3px solid #000000;}
#vip_movie_box7543401mmx .vip_mod_box_action_687ii> .item_box7543401mmx >.content7543401mmx{font-size:12px;color:#000000;margin-left:3px;}
</style>

<div id="vip_movie_box7543401mmx" style="cursor: pointer; left: 26px; top: 172px;">
<div class="plugin_inner_7543401mmx">
    <div class="img_box7543401mmx" id="img_box_jump_6667897iio"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAC9klEQVRoQ+2ZPWgVQRDH/7/CWqOIYOFHFbRSjJhGMGDpByoIago70cqvUtQgdipWFqawMWghGIidhcHKQAJqEURBRfED1CCCjc3IPu4em31775J7d3m8cAtX3O7szP7nPzszx6EeH/T4+VUD6DaDTQbMbE+3D7MY+8Ckkw8BPFuMki7KDtUAuuh9Z3oZMtBljxY2X9eBwq4raWPNQEmOLKxm+TBgZqsknQ1dAVzNco+ZhWsm6ZakHZLC1mQyrZ5OX2RvzMxnSa8lzQJ/YwLzGDCze5JOeoI/gbVtAMxJ6vPW7wKnkr4qbEuaxccDcGWBsfNV0mjMmSGAg5LGA6XbgFehITPbLel5MN84ZAUAUjMPgWO+zZY7YGbvJW0OvRoB8EjSEW9+BhhIvOvCp0wGfPPbgZfpRAzATUnn56GEmJyLd39cBNxeF99FADTa42BskuQef4wDh9oB2CXpRbDpMPA4nTOz05LuBDLrgW+dAACGIkxfkHTDm/8DrMwEkBxgOskkqdwEcMAD4GLf3YF0PACOe+uFGMgA4Bj4EAAbAGbcXLQOmNklSdeCTRuBT2bWL+lNsLYfeFIRgH2SJgJ7GwCXYjMBrJb0K9jUiHEzG5F02VubA9b4skXvQMiAmW2VdFSSn24/As0kk1mJzeyppL3ewaaBnWY2K2mLNz8S5ueCAMLwz3q/DZxreweSe3BC0v1Ai7tkYXrsB96WwMBCAfQBv3MBJCD+SVrhaXaZ54z3PgUMhpYrZKCF7bbNnJk5BhwT6fghyW8thoGxigE4my6tXwemQlt5AGI1oamDSIFLmCuURiW5BOGPL8C7drGV206b2XdJ6yJKxoDhmPKCIeS61ZZClncxFgLAtcyxrnEwRmknDFQFIFYTWnJ/CVmoGgYSj7Z81OR86Lg7sOgPmnY6s0IpN4TyYrDb6zWAmoEOPVCHUIcO7Hh7/YemYxcWU7AMf3BkNGDF/FP9rkwGqjddkoWWv5Ql6V1yNXUdWHKXBwZ7noH/dP+HQNqheToAAAAASUVORK5CYII=" title="选择解析线路"></div>
    <div class="showhide_box7543401mmx">									
        <div class="vip_mod_box_action_687ii default-scrollbar-55678">
            <div class="item_box7543401mmx">
                <div class="title7543401mmx"><b>全网VIP视频解析[内嵌播放]</b></div>
                <div class="interface_box7543401mmx">
                    <span title="纯净/B站" data-index="0">纯净/B站</span><span title="高速接口" data-index="1">高速接口</span><span title="综合/B站" data-index="2">综合/B站</span><span title="OK解析" data-index="3">OK解析</span><span title="夜幕" data-index="4">夜幕</span><span title="乐多资源" data-index="5">乐多资源</span><span title="爱豆" data-index="6">爱豆</span><span title="虾米" data-index="7">虾米</span><span title="M3U8.TV" data-index="8">M3U8.TV</span><span title="人人迷" data-index="9">人人迷</span><span title="全民" data-index="10">全民</span><span title="七哥" data-index="11">七哥</span><span title="冰豆" data-index="12">冰豆</span><span title="迪奥" data-index="13">迪奥</span><span title="CK" data-index="14">CK</span><span title="游艺" data-index="15">游艺</span><span title="LE" data-index="16">LE</span><span title="ckmov" data-index="17">ckmov</span><span title="playerjy/B站" data-index="18">playerjy/B站</span><span title="ccyjjd" data-index="19">ccyjjd</span><span title="爱豆" data-index="20">爱豆</span><span title="诺诺" data-index="21">诺诺</span><span title="H8" data-index="22">H8</span><span title="BL" data-index="23">BL</span><span title="解析la" data-index="24">解析la</span><span title="MUTV" data-index="25">MUTV</span><span title="MAO" data-index="26">MAO</span><span title="老板" data-index="27">老板</span><span title="盘古" data-index="28">盘古</span><span title="盖世" data-index="29">盖世</span><span title="小蒋" data-index="30">小蒋</span><span title="YiTV" data-index="31">YiTV</span><span title="星空" data-index="32">星空</span><span title="0523" data-index="33">0523</span><span title="17云" data-index="34">17云</span><span title="4K" data-index="35">4K</span><span title="云析" data-index="36">云析</span><span title="8090" data-index="37">8090</span><span title="江湖" data-index="38">江湖</span><span title="诺讯" data-index="39">诺讯</span><span title="PM" data-index="40">PM</span><span title="奇米" data-index="41">奇米</span><span title="思云" data-index="42">思云</span><span title="听乐" data-index="43">听乐</span><span title="aijx" data-index="44">aijx</span><span title="52" data-index="45">52</span><span title="黑米" data-index="46">黑米</span><span title="豪华啦" data-index="47">豪华啦</span><span title="凉城" data-index="48">凉城</span><span title="33t" data-index="49">33t</span><span title="180" data-index="50">180</span><span title="无名" data-index="51">无名</span><span title="黑云" data-index="52">黑云</span><span title="九八" data-index="53">九八</span>
                </div>
            </div>
            <div class="item_box7543401mmx">													
                <div class="title7543401mmx"><b>全网VIP视频解析[弹窗播放]</b></div>
                <div class="interface_box7543401mmx">
                    <span title="综合线路解析" data-index="54">综合线路解析</span><span title="纯净/B站" data-index="55">纯净/B站</span><span title="高速接口" data-index="56">高速接口</span><span title="综合/B站1" data-index="57">综合/B站1</span><span title="OK解析" data-index="58">OK解析</span><span title="夜幕" data-index="59">夜幕</span><span title="虾米" data-index="60">虾米</span><span title="全民" data-index="61">全民</span>
                </div>
            </div>
            <div class="item_box7543401mmx">
                <div class="title7543401mmx"><b>自动解析说明：</b></div>
                <div class="content7543401mmx">
                    1、开启自动开启后，网页打开2S后脚本将自动解析视频。如果自动解析失败，请手动选择不同的解析接口尝试。（PS：解析接口有些视频没资源，这个也没办法）
                    <br>2、<span style="color:red;">如果某些网站有会员可以关闭解析，关闭功能相互独立，互不影响</span>
                    <br>3、自动解析默认关闭
                    <br>4、当前使用的是第3个接口作为自动解析默认接口
                </div>
            </div>
            <div class="item_box7543401mmx">
                <div class="title7543401mmx"><b>免责声明：</b></div>
                <div class="content7543401mmx">
                    1、VIP视频解析中所用到的解析接口全部收集自互联网（源码可见），版权问题请联系相关解析接口所有者，脚本不承担相关责任！"<br>
                    2、为创造良好的创作氛围，请大家支持正版！<br>
                    3、脚本仅限个人学习交流，使用即已代表您已经充分了解相关问题，否则后果自负，特此声明！<br>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="img_box7543401mmx" id="img_box_6667897iio">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAaZJREFUaEPtmk1OAkEUhL86iH9bPYDRqJGVJzDRK+jerbB154Yr6F4X7iTizwVcuRHxIM9MwpChAQP0YxhIdzIhDPOqX1V1z6ILseRDS94/q0nAzM6AC2AN2FywSx3gF2hKug97GXLAzK6B+oKbHjd9XVKj+OMAATPbA94r2nze1r6kj/xLSKANHFScwKukw3EEfoD1gMAD8Ah8lUxsGzgFjoN5u5I2xhGw4OE3SQt1xMyeQxKS+isnXEIhgaFNU7ILmFnmQEaiP6YhUJPUKrvpcD4zGxA2ESjbkeRA2YqnPVBQIL2FPJZf2sQeKsZgJAdi1POoTQ54qBiDkRyIUc+jNjngoWIMRnIgRj2P2uSAh4oxGMmBGPU8apMDHirGYCQHYtTzqI1x4FJS06OJWTHM7AR4KtZPczbaklSbdXKPOjP7BHYmJfA9ItTLTqcbZZ9Sm9kucAtkn8XRkbSV3wjzgRegH994KDgHjLako3EEsnj1bg6TekKeF+PW1YpZc5l6cetNL/ALQz9PNSfB6gLZdVWMV0cuoUnQqvbMav5Xomoq/9fPH0I4X0Cu+FOiAAAAAElFTkSuQmCC" title="是否打开自动解析。若自动解析失败，请手动选择其它接口尝试！！"></div>
</div>
*/