'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,
        B1: 1, B2: 0, Barr: []
    },
    time: new Date(),
    a01: function () {
        let html = Tool.header("归类【劣质图片】") + '\
          <div class="p-2">\
            <table class="table table-hover align-middle mb-0">\
            <tbody>\
              <tr><td class="right w200">劣质图片说明：</td>\
                <td colspan="2">\
                  （1）【详情不存在】的商品，有首图会被清空。<br/>\
                  （2）【放大镜图片(DHpic)】或【属性图片(DHattrPic)】或【详情图片(DHdesPic)】还没数据时，全部做成【picA】且不要高度小于300px的图片，用于审核。<br/>\
                  （3）【属性图片(DHattrPic)】里面有【放大镜图片(DHpic)】，则删除【放大镜图片(DHpic)】且去重复。（即：放大镜图中不能有属性图）<br/>\
                  （4）详情中【DHdes字段】内的图片，没有在【DHdesPic字段】里面，则删除【DHdesPic字段】内的图片，来确保俩边图片一致且去重复。<br/>\
                  （5）【属性图片(DHattrPic)】+【放大镜图片(DHpic)】时里面有【详情图片(DHdesPic)】，则删除【详情图片(DHdes)和(DHdesPic)】且去重复。（即：详情图中不能有属性图和放大镜图）<br/>\
                  （6）【详情图片（DHdes）】数量 &gt;【属性图片（DHdesPic）】数量，标记为【详情异常】。<br/>\
                  （7）放大镜图+属性图+详情图 &lt; 8张，标记为【劣质图片】。（不包括【详情不存在】的商品）。\
                </td></tr>\
              <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
              <tr><td class="right">商品条进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
              <tr><td class="right">图片进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
              <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
              <tr><td class="right">商品编码（proid）：</td><td id="proid" colspan="2"></td></tr>\
              <tr><td class="right">放大镜图片(DHpic)：</td><td id="DHpic" colspan="2"></td></tr>\
              <tr><td class="right">属性图片(DHattrPic)：</td><td id="DHattrPic" colspan="2"></td></tr>\
              <tr><td class="right">详情图片(DHdesPic)：</td><td id="DHdesPic" colspan="2"></td></tr>\
            </tbody>\
            </table>\
          </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        $("#state").html('将【劣质图片】改为【未审核】');
        //let str = '""<r: db="sqlite.aliexpress">update @.proupdhgate SET @.ManualReview=0,@.err=null where @.ManualReview=7</r:>'
        //Tool.ajax.a01(str, 1, this.a03, this);
        this.a04();
    },
    a03: function (t) {
        if (t == "") {
            this.a04();
        }
        else {
            Tool.pre(["出错：" + t]);
        }
    },
    a04: function () {
        // where=" where rd_upuserid=901" where @.examine=0 where=" where @.ManualReview=0"
        // @.proid=\'R670115\'
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') +
            '<r:proupdhgate size=10 db="sqlite.dhgate" page=2 where=" where @.ManualReview=0">,\
        {\
            "prodes":\
            {\
                <r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
                "pic":"<:pic/>",\
                "DHpic":<:DHpic tag=0/>,\
                "aeopAeProductSKUs":<:aeopAeProductSKUs tag=0/>,\
                "DHattrPic":<:DHattrPic tag=0/>,\
                "des":<:des tag=json/>,\
                "DHdes":<:DHdes tag=json/>,\
                "DHdesPic":<:DHdesPic tag=0/>\
                </r:prodes>\
            },\
            "pic":<:pic tag=0/>,\
            "proid":"<:proid/>"\
        }\
        </r:proupdhgate>]'
        $("#state").html('正在获取图片...');
        Tool.ajax.a01(str, this.obj.A1, this.a05, this);
    },
    a05: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
        arr.shift();
        this.obj.B2 = arr.length;
        this.obj.Barr = arr;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a06, this, null)
    },
    a06: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a07, this, this.a17)
    },
    a07: function () {
        let oo = this.obj.Barr[this.obj.B1 - 1]
        $("#proid").html(oo.proid);
        $("#state").html('已获取到图片...')
        this.a08(oo)
    },
    a08: function (oo) {
        if (oo.prodes.DHpic == undefined) {
            $("#state").html('（1）【详情不存在】的商品，有首图会被清空。')
            let str = "";
            if (oo.pic != 0) {
                str = '""<r: db="sqlite.aliexpress">update @.proupdhgate SET @.pic=null where @.proid=\'' + oo.proid + '\'</r:>';
            }
            this.a15(str)
        }
        else {
            $("#state").html('说明详情存在，可以继续...');
            this.a09(oo);
        }
    },
    a09: function (oo) {
        if (oo.prodes.DHpic === 0) {
            $("#state").html("（2）【放大镜图片(DHpic)】没数据，做成【picA】用于审核。")
            Tool.prodes_DHpic.a01(oo.prodes.pic, oo.proid, this.a10, this, oo);
        }
        else {
            $("#state").html("（2）【放大镜图片(DHpic)】有数据，跳过。")
            $("#DHpic").html(Tool.showPic(oo.prodes.DHpic))
            this.a10(oo);
        }
    },
    a10: function (oo) {
        if (oo.prodes.DHattrPic === 0) {
            $("#state").html("（2）【属性图片(DHattrPic)】没数据，做成【picA】用于审核。");
            Tool.prodes_DHattrPic.a01(oo.prodes.aeopAeProductSKUs, oo.proid, this.a11, this, oo);
        }
        else {
            $("#state").html("（2）【属性图片(DHattrPic)】有数据，跳过。")
            $("#DHattrPic").html(Tool.showPic(oo.prodes.DHattrPic))
            this.a11(oo);
        }
    },
    a11: function (oo) {
        if (oo.prodes.DHdesPic == 0) {
            $("#state").html("（2）【详情图片(DHdesPic)】没数据，做成【picA】用于审核。");
            Tool.prodes_DHdesPic.a01(oo.prodes.des, oo.proid, this.a12, this, oo);
        }
        else {
            $("#state").html("（2）【详情图片(DHdesPic)】有数据，跳过。")
            $("#DHdesPic").html(Tool.showPic(oo.prodes.DHdesPic))
            this.a12(oo);
        }
    },
    a12: function (oo) {
        $("#state").html('（3）【属性图片(DHattrPic)】里面有【放大镜图片(DHpic)】，则删除【放大镜图片(DHpic)】且去重复。（即：放大镜图中不能有属性图）。（即：放大镜图中不能有属性图）注：只对【picA】判断重复。')
        let DHpicArr = this.b02(oo.prodes.DHpic); //去重复，返回新数组
        let DHattrPicArr = this.b02(oo.prodes.DHattrPic); //去重复，返回新数组
        let DHpic2 = this.b01(DHpicArr[1], DHattrPicArr[0]);//返回新的放大镱图片数组。
        let sqlArr = []
        //如果有重复，就修改【DHpic】字段。
        if (oo.prodes.DHpic.length != DHpic2.length) {
            sqlArr.push("@.DHpic=" + Tool.rpsql(JSON.stringify(DHpic2)));
        }
        this.a13(oo, sqlArr, DHpicArr, DHattrPicArr);
    },
    a13: function (oo, sqlArr, DHpicArr, DHattrPicArr) {
        $("#state").html('（4）详情中【DHdes字段】内的图片，没有在【DHdesPic字段】里面，则删除【DHdesPic字段】内的图片，来确保俩边图片一致且去重复。')
        oo.prodes.DHdes = this.b03(oo.prodes.DHdes)//去【DHdes字段】重复图片
        //为什么要删除【DHdesPic字段】内的图片？（因为详情图片（DHdes）在【详情审核】中删除了，但（DHdesPic）图片没有删除）。
        let DHdesPicArr = this.b05(oo.prodes.DHdes, oo.prodes.DHdesPic);//返回新的DHdesPic字段。
        /////////////////////////////////////////////////////////////////////////////
        $("#state").html('（5）【属性图片(DHattrPic)】+【放大镜图片(DHpic)】时里面有【详情图片(DHdesPic)】，则删除【详情图片(DHdes)和(DHdesPic)】且去重复。（即：详情图中不能有属性图和放大镜图）')
        let newArr = DHpicArr[0].concat(DHattrPicArr[0])//数组合并,去重用的
        let newDHdesArr = this.b07(newArr, DHdesPicArr, oo.prodes.DHdes);//详情图中不能有属性图和放大镜图。返回[DHdes,DHdesPic]
        this.a14(newDHdesArr, oo, sqlArr, newArr.length)
    },
    a14: function (newDHdesArr, oo, sqlArr, picLen) {
        let str = '""';
        if (newDHdesArr) {
            $("#DHdesPic").html(Tool.showPic(newDHdesArr[1]))
            if (newDHdesArr[1].length != oo.prodes.DHdesPic.length && newDHdesArr[1].length != 0) {//有改动
                sqlArr.push("@.DHdesPic=" + Tool.rpsql(JSON.stringify(newDHdesArr[1])));
                sqlArr.push("@.DHdes=" + Tool.rpsql(newDHdesArr[0]));
                str += '<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(oo.proid,50) + '">update @.prodes set ' + sqlArr.join(",") + ' where @.proid=' + Tool.rpsql(oo.proid) + '</r:>';
            }
            //////////////////////////////////////////////
            let err = "（7）放大镜图+属性图+详情图 < 8张，标记为【劣质图片】。（不包括【详情不存在】的商品）。"
            $("#state").html(err)
            if (picLen + newDHdesArr[1].length < 8) {
                // @.ManualReview=7    表示劣质图片
                str += '<r: db="sqlite.aliexpress">update @.proupdhgate SET @.ManualReview=7,@.err=' + Tool.rpsql(err) + ' where @.proid =' + Tool.rpsql(oo.proid) + '</r:>'
            }
            this.a15(str)
        }
        else {
            //str = '<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">update @.prodes set @.DHdes=null,@.DHdesPic=null where @.proid=' + Tool.rpsql(oo.proid) + '</r:>'
            alert("标记为【详情异常】")
           // str += '<r: db="sqlite.aliexpress">update @.proupdhgate SET @.ManualReview=16,@.err=\'（6）【详情图片（DHdes）】数量 &gt;【属性图片（DHdesPic）】数量，标记为【详情异常】。\' where @.proid =' + Tool.rpsql(oo.proid) + '</r:>'

        }
    },
    a15: function (str) {
        if (str == "") {
            this.a16("")
        }
        else {
            Tool.ajax.a01(str, 1, this.a16, this);
        }
    },
    a16: function (t) {
        if (t == "") {
            this.obj.B1++;
            $("#proid,#DHpic,#DHattrPic,#DHdesPic").html('')
            $("#state").html("正在准备下一个商品...");
            this.a06();
        }
        else {
            Tool.at("出错：" + t)
        }
    },
    a17: function () {
        this.obj.A1++;
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.obj.Barr = [];
        $("#B1").css("width", "0%");
        $("#B1,#B2").html('')
        this.a02();
    },
    //返回新的放大镱图片数组。
    b01: function (DHpicArr, DHattrPicArr) {
        let nArr = [];
        for (let i = 0; i < DHpicArr.length; i++) {
            //当前图片在属性中没有，则添加。
            if (DHattrPicArr.indexOf(DHpicArr[i].picA.fileurl) == -1) {
                nArr.push(DHpicArr[i]);
            }
        }
        return nArr;
    },
    //去重复，返回新数组
    b02: function (DHpic) {
        let arr1 = [], arr2 = [];
        for (let i = 0; i < DHpic.length; i++) {
            if (DHpic[i])//10个属性图，可能只有8个属性图。
            {
                if (arr1.indexOf(DHpic[i].picA.fileurl) == -1)//这个有去重复的功能。
                {
                    arr1.push(DHpic[i].picA.fileurl);
                    arr2.push(DHpic[i]);
                }
            }
        }
        return [arr1, arr2];
    },
    //【DHdes字段】去重复
    b03: function (DHdes) {
        let arr1 = this.b04(DHdes), arr2 = [];
        if (arr1) {
            for (let i = 0; i < arr1[1].length; i++) {
                if (arr2.indexOf(arr1[1][i]) == -1) {
                    arr2.push(arr1[1][i])
                }
                else {
                    //注：如果能找到，说明是重复的，要删除。
                    DHdes = DHdes.replace(arr1[0][i], "");
                }
            }
        }
        return DHdes;
    },
    b04: function (html) {
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
            return [arr, arr1];
        }
    },
    //（3）详情中【DHdes字段】内的图片，没有在【DHdesPic字段】里面，则删除【DHdesPic字段】内的图片，来确保俩边图片一致。
    b05: function (DHdes, DHdesPic) {
        let arr1 = this.b04(DHdes), nArr = [];
        if (arr1) {
            for (let i = 0; i < arr1[1].length; i++) {
                let isArr = this.b06(DHdesPic, arr1[1][i]) //DHdesPic中有没有arr1[1][i]------（arr1[1][i]  表示【DHdes字段】的一个图片地址）
                if (isArr) { nArr.push(isArr) }
            }
        }
        return nArr;
    },
    //DHdesPic中有没有详情【DHdes】中的当前图片
    b06: function (DHdesPic, pic) {
        let arr = null, fileurl;
        for (let i = 0; i < DHdesPic.length; i++) {
            fileurl = DHdesPic[i].picA.fileurl
            if (pic.indexOf(fileurl) != -1) {
                arr = DHdesPic[i]; break;
            }
            else {
                if (DHdesPic[i].picC) {//当图片还没下载到敦煌网时，【DHdes】详情存放的是【picA】的地址。  
                    fileurl = DHdesPic[i].picC.fileurl;
                    if (pic.indexOf(fileurl) != -1) {
                        arr = DHdesPic[i]; break;
                    }
                }
            }
        }
        return arr;
    },
    b07: function (arr, DHdesPic, DHdes) {
        let arr1 = this.b04(DHdes);
        if (arr1) {
            if (arr1[0].length == DHdesPic.length) {
                return this.b08(arr, DHdesPic, DHdes, arr1[0])
            }
            else {
                $("#state").html("（6）【详情图片（DHdes）】数量 >【属性图片（DHdesPic）】数量，标记为【详情异常】。")
                return false;
            }
        }
        else {
            $("#state").html("详情没有图片。。。过")
            return [DHdes, DHdesPic]
        }
    },
    b08: function (arr, DHdesPic, DHdes, imgArr) {
        //arr       表示【属性图片(DHattrPic)】+【放大镜图片(DHpic)】的数组；（注：都是【picA】）
        //DHdesPic  表示详情图
        //DHdes     表示详情
        //imgArr    表示取出详情中的图片数组。
        let newDHdesPic = [];
        for (let i = 0; i < DHdesPic.length; i++) {
            //如果不存在，就添加图片，否则删除该图片。
            if (arr.indexOf(DHdesPic[i].picA.fileurl) == -1) {
                newDHdesPic.push(DHdesPic[i]);//添加
            }
            else {
                //删除【DHdes字段】的图片。因为在【属性图】和【放大镜图】中存在。
                DHdes = this.b09(DHdes, DHdesPic[i], imgArr)
            }
        }
        return [DHdes, newDHdesPic]
    },
    //删除【DHdes字段】的图片。
    b09: function (DHdes, oo, imgArr) {
        //注：这里不去【DHdes字段】的重复图片。因为：（4）详情中【DHdes字段】内的图片，没有在【DHdesPic字段】里面，则删除【DHdesPic字段】内的图片，来确保俩边图片一致且去重复。
        for (let i = 0; i < imgArr.length; i++) {
            if (oo.picC) {//当图片还没下载到敦煌网时，【DHdes】详情存放的是【picA】的地址。   
                if (imgArr[i].indexOf(oo.picC.fileurl) != -1) {
                    DHdes = DHdes.replace(imgArr[i], "")
                    break;
                }
            }
            else {
                if (imgArr[i].indexOf(oo.picA.fileurl) != -1) {
                    DHdes = DHdes.replace(imgArr[i], "")
                    break;
                }
            }
        }
        return DHdes
    },
}
fun.a01();