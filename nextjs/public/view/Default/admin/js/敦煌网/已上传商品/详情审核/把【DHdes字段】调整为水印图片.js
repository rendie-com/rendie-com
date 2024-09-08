'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0, Aarr: [],
    },
    a01: function () {
        let html = Tool.header("正在把【DHdes字段】调整为水印图片...") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
                <tr><td class="right">卖家账号：</td><td id="upUser" colspan="2"></td></tr>\
                <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
                <tr><td class="right w150">商品进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
                </tbody>\
            </table>\
        </div>';
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        //@.ManualReview=9      图片且详情审核通过
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        <r:proupdhgate db="sqlite.dhgate" size="1" page=2 where=" where @.ManualReview=16">,\
        {\
        	<r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
        		"DHdes":<:DHdes tag=json/>,\
        		"DHdesPic":<:DHdesPic tag=0/>,\
        	</r:prodes>\
        	"upUser":<:upUser tag=json/>,\
        	"proid":"<:proid/>"\
        }\
        </r:proupdhgate>]'
        Tool.ajax.a01(str, this.obj.A1, this.a03, this);
    },
    a03: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
        this.obj.Aarr = arr[1];
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null)
    },
    a04: function () {
        $("#proid").html(this.obj.Aarr.proid);
        this.obj.Aarr.upUser = this.obj.Aarr.upUser.toLowerCase()
        $("#upUser").html(this.obj.Aarr.upUser);
        if (this.obj.Aarr.DHdesPic == 0) {
            this.a08("");
        }
        else {
            $("#state").html("正在修改...");
            this.a05(this.obj.Aarr.DHdes, this.obj.Aarr.DHdesPic)
        }
    },
    a05: function (DHdes, DHdesPic) {
        let arr1 = this.b01(DHdes)
        if (arr1) {
            if (arr1[1].length == DHdesPic.length) {
                if (DHdesPic.length == 0) {
                    $("#state").html("详情没有图片...");
                }
                else {
                    if (DHdesPic[0].picC) {
                        this.a06(DHdes, DHdesPic, arr1)
                    }
                    else {
                        $("#state").html("详情图片，必须先上传到敦煌网。。。")
                        let str = "update @.proupdhgate set @.proStatus=16 where @.proid='" + this.obj.Aarr.proid + "'";
                        let html = '""<r: db="sqlite.aliexpress">' + str + '</r:>'
                        Tool.ajax.a01(html, 1, this.a08, this);
                    }
                }
            }
            else {
                if (DHdesPic === true) {
                    alert("wwwwwwwwww")
                    //let proid = this.obj.Aarr.proid
                    //let str = "update @.prodes set @.DHdesPic=null,@.DHdes=null where @.proid='" + proid + "'";
                    //let html = '""<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">' + str + '</r:>'
                    //Tool.ajax.a01(html, 1, this.a08, this);
                }
                else {
                    $("#state").html("详情图片数量不一样---" + arr1[0].length + "----" + DHdesPic.length)
                    //this.d01(arr1, DHdes, DHdesPic)
                }
            }
        }
        else {
            let str = "update @.proupdhgate set @.proStatus=23 where @.proid='" + this.obj.Aarr.proid + "'";
            let html = '""<r: db="sqlite.aliexpress">' + str + '</r:>'
            Tool.ajax.a01(html, 1, this.a08, this);
        }
    },
    a06: function (DHdes, DHdesPic, arr1) {
        for (let i = 0; i < DHdesPic.length; i++) {
            if (DHdes.indexOf(DHdesPic[i].picA.fileurl) != -1) {
                DHdes = this.b03(DHdes, DHdesPic[i].picA.fileurl, arr1, DHdesPic[i].picC.fileurl)
            }
            else if (DHdes.indexOf(DHdesPic[i].picB.fileurl) != -1) {
                DHdes = DHdes.replace(DHdesPic[i].picB.fileurl, DHdesPic[i].picC.fileurl)
            }
            else if (DHdes.indexOf(DHdesPic[i].picC.fileurl) != -1) {
                $("#state").html("过-不用改...");
            }
            else {
                Tool.pre([
                    DHdes,
                    DHdesPic[i].picA.fileurl,
                    DHdesPic[i].picB.fileurl,
                    DHdesPic[i].picC.fileurl
                ])
                //Tool.at("到不了这里")
                aaaaaaaaaaaaaaa
            }
        }
        this.a07(DHdes, DHdesPic, this.obj.Aarr.proid)
    },
    a07: function (DHdes, DHdesPic, proid) {
        let str = "update @.prodes set @.DHdes=" + Tool.rpsql(DHdes) + ",@.DHdesPic=" + Tool.rpsql(JSON.stringify(DHdesPic)) + " where @.proid='" + proid + "'";
        let html = '""<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">' + str + '</r:>'
        Tool.ajax.a01(html, 1, this.a08, this);
    },
    a08: function (t) {
        if (t == "") {
            this.obj.A1++;
            this.obj.Aarr = [];
            $("#state").html("下一条...");
            this.a02()
        }
        else {
            Tool.pre(t)
        }
    },
    //取出图片
    b01: function (html) {
        let reg = /<img.*?>/ig
        // 提取出html中所有的img标签
        let arr = html.match(reg)
        if (arr == null) {
            return null;
        }
        else {
            let reg1 = /\s+src=['"](.*?)['"]/i
            let arr1 = arr.map(item => {
                if (item.match(reg1)) {//有时后img标签里面没有src属性。
                    let pic = item.match(reg1)[1];
                   
                    return pic;
                }
                else { return null; }
            });
            //console.log([arr,arr1])
            //Tool.pre([arr, arr1])
            return [arr, arr1];
        }
    },

    b03: function (DHdes, fileurlA, arr1, fileurlC) {
        for (let i = 0; i < arr1[1].length; i++) {
            if (fileurlA == arr1[1][i]) {
                DHdes = DHdes.replace(arr1[0][i], '<img src="//image.dhgate.com/' + fileurlC + '" width="800"/>')
            }
        }
        return DHdes;
    },
    b04: function (img, DHdesPic) {
        let isbool = true;//表示可以删除
        for (let i = 0; i < DHdesPic.length; i++) {
            let isPicC = false;
            if (DHdesPic[i].picC) {
                if (img.indexOf(DHdesPic[i].picC.fileurl) != -1) {
                    isPicC = true;
                }
            }
            ////////////////////////////////
            if (img.indexOf(DHdesPic[i].picA.fileurl) != -1 || isPicC) {
                isbool = false;//表示不能删除
                break;
            }
        }
        return isbool;
    },
    d01: function (arr1, DHdes, DHdesPic) {
        $("#state").html("【DHdes字段】里面图睡没在【DHdesPic字段】内，则删除【DHdes字段】里的图片")
        for (let i = 0; i < arr1[0].length; i++) {
            if (this.b04(arr1[0][i], DHdesPic)) {//这个图片找不到，则删除【DHdes字段】内的图片
                DHdes = DHdes.replace(arr1[0][i], '')
            }
        }
        this.d02(DHdes, DHdesPic)
    },
    d02: function (DHdes, DHdesPic) {
        $("#state").html("【DHdesPic字段】内的图片，不在【DHdes字段】内，则删除【DHdesPic字段】内的图片。")
        let nArr = [];
        for (let i = 0; i < DHdesPic.length; i++) {
            let isPicB = false;
            if (DHdesPic[i].picB) {
                if (DHdes.indexOf(DHdesPic[i].picB.fileurl) != -1) {
                    isPicB = true;
                }
            }
            //////////////////////////////////
            let isPicC = false;
            if (DHdesPic[i].picC) {
                if (DHdes.indexOf(DHdesPic[i].picC.fileurl) != -1) {
                    isPicC = true;
                }
            }
            //////////////////////////////////
            if (DHdes.indexOf(DHdesPic[i].picA.fileurl) != -1 || isPicB || isPicC) {//能找到，说明可以用
                nArr.push(DHdesPic[i])
            }
        }
        this.a05(DHdes, nArr)
    },
    d03: function (DHdes, DHdesPic) {
        $("#state").html("去重")
        let str = "----", arr2 = [];
        for (let i = 0; i < DHdesPic.length; i++) {
            let path = DHdesPic[i].picC.fileurl
            if (str.indexOf(path) == -1) {
                str += path + "-----";
                arr2.push(DHdesPic[i]);
            }
        }
        this.a05(DHdes, arr2)
    },
}
fun.a01();