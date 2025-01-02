Object.assign(Tool, {
    //////////////////////////////////////////////
    b01: function () {
        let arr = [
            "@.isup=1",
            //"@.ManualReview=9",
            //"@.DHAfterReview=0",
            //"@.penalty_type=0"
        ];
        if (obj.params.searchword) {
            switch (obj.params.field) {
                case "1": arr.push("@.proid='" + obj.params.searchword + "'"); break;//商品编码
                case "2": arr.push("@.fromID=" + obj.params.searchword); break;//DH商品ID
            }
        }
        if (obj.params.BeforeReview != "") { arr.push("@.BeforeReview=" + obj.params.BeforeReview); }
        if (obj.params.mode != "") {
            switch (obj.params.mode) {
                case "1": arr.push("(@.ms_nameLen<20 or @.ms_nameLen>100)"); break;
                case "2": arr.push("(@.en_nameLen<20 or @.en_nameLen>100)"); break;
                case "3": arr.push("(@.pt_nameLen<20 or @.pt_nameLen>100)"); break;
                case "4": arr.push("@.ManualReview_1688_unitWeight<=0"); break;
            }
        }
        if (obj.params.editStatus != "") { arr.push("@.editStatus=" + obj.params.editStatus); }
        if (obj.params.site != "") { arr.push("@.is" + obj.params.site + "=1"); }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b02: function (i, pic, field, proid) {
        let html = "";
        let str1 = '\
        <a href="javascript:;" onclick="fun.c10(\'pic\',\'' + pic + '\',\'' + proid + '\')" title="设置为【首图】">设置为【首图】</a>  | \
        <a href="javascript:;" onclick="Tool.delPic.a01($(this),\'' + pic + '\',\'' + field + '\',\'' + proid + '\')">删除</a>';
        if (pic != 0) {
            html = '\
            <figure class="figure border mb-1 p-1">\
                <div class="easyzoom easyzoom--overlay">\
                    <a href=\"https://s-cf-sg.shopeesz.com/file/' + pic + '\">\
                        <img src="https://s-cf-sg.shopeesz.com/file/'+ pic + '_tn"  class="figure-img img-fluid mb-0 rounded w200">\
                    </a>\
                </div>\
                <figcaption class="figure-caption text-center">'+ (i + 1) + '.' + str1 + '</figcaption>\
            </figure>'
        }
        return html;
    },
    b03: function () {
        return '\
        <div class="input-group w-50 m-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="field" value="'+ obj.params.field + '">' + this.b04(obj.params.field) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="Tool.c01(1)" value="1">商品编码</li>\
                <li class="dropdown-item pointer" onclick="Tool.c01(2)" value="2">商品ID</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ obj.params.searchword + '" onKeyDown="if(event.keyCode==13) Tool.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="Tool.c02();">搜索</button>\
        </div>'
    },
    b04: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "商品编码"; break;
            case "2": name = "商品ID"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b05: function (pic, ManualReview_1688_subject, id, tw_nameLen, ms_nameLen, en_nameLen, pt_nameLen, tw_name, ms_name, en_name, pt_name, _1688_subject, tw_ads_key, my_ads_key, br_ads_key, tw_keyword_cn_keyword, my_keyword_cn_keyword, br_keyword_cn_keyword) {
        return '\
        <table class="table table-bordered mb-0 align-middle">\
        <tr>\
            <td rowspan="6" class="w200 p-0" title="首图">\
                <div class="easyzoom easyzoom--overlay">\
                    <a href=\"https://s-cf-sg.shopeesz.com/file/' + pic + '\">\
                        <img src="https://s-cf-sg.shopeesz.com/file/'+ pic + '_tn"  class="figure-img img-fluid mb-0 rounded w200">\
                    </a>\
                </div>\
            </td>\
            <td colspan="5">\
                <div style="color:#999;">原标题：'+ (_1688_subject ? _1688_subject : '') + '</div>\
                <input type="text" value="'+ ManualReview_1688_subject + '" class="form-control" onblur="fun.c13($(this),' + id + ')" title="品牌名称 + 商品类型 + 主要特点（材质、颜色、尺寸、型号）">\
            </td>\
       </tr>\
        <tr class="table-light center">\
            <th class="w100">站点</th>\
            <th class="w100">语言</th>\
            <th class="w70">长度</th>\
            <th class="">主推关键词</th>\
            <th class="left">标题</th>\
        </tr>\
        <tr>\
            <td class="center">台湾</td>\
            <td class="center">中文(繁体)</td>\
            <td id="tw_nameLen" class="center">'+ tw_nameLen + '</td>\
            <td class="center">'+ (tw_ads_key ? tw_ads_key + '（' + tw_keyword_cn_keyword.tw_keyword_cn_keyword + '）' : '') + '</td>\
            <td id="tw_name">'+ tw_name + '</td>\
        </tr>\
        <tr>\
            <td class="center">马来西来</td>\
            <td class="center">马来语</td>\
            <td id="ms_nameLen" class="center">'+ ms_nameLen + '</td>\
            <td class="center">-</td>\
            <td id="ms_name">'+ ms_name + '</td>\
        </tr>\
        <tr>\
            <td class="center">马来西来</td>\
            <td class="center">英语</td>\
            <td id="en_nameLen" class="center">'+ en_nameLen + '</td>\
            <td class="center">'+ (my_ads_key ? my_ads_key + '（' + my_keyword_cn_keyword.my_keyword_cn_keyword + '）' : '') + '</td>\
            <td id="en_name">'+ en_name + '</td>\
        </tr>\
        <tr>\
            <td class="center">巴西</td>\
            <td class="center">葡萄牙语</td>\
            <td id="pt_nameLen" class="center">'+ pt_nameLen + '</td>\
            <td class="center">'+ (br_ads_key ? br_ads_key + '（' + br_keyword_cn_keyword.br_keyword_cn_keyword + '）' : '') + '</td>\
            <td id="pt_name">'+ pt_name + '</td>\
        </tr>\
    </table>'

        //说明：pt表示葡萄牙语。
    },
    b06: function (name, val) {
        let nArr = [], arr = Tool.BeforeReview;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + ("" + arr[i][0] === "" + val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '（' + config.GlobalPro_BeforeReview_count[i] + '）</option>');
        }
        return '\
        <select onChange="Tool.c03(\''+ name + '\',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">请选择【更新前本地状态】</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
        </select>'
    },
    b07: function (arr, field, proid) {
        let rArr = []
        for (let i = 0; i < arr.length; i++) {
            rArr.push(this.b02(i, arr[i].picB.shopee, field, proid))
        }
        return rArr.join("");
    },
    b08: function (arr, proid) {
        let rArr = []
        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                rArr.push(this.b13(i, arr[i].shopee, proid))
            }
        }
        return rArr.join("");
    },
    b09: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
            <li onClick="fun.c12(0);"><a class="dropdown-item pointer">把【未修改】设置成【更新前本地状态-未更新】</a></li>\
            <li onClick="fun.c12(1);"><a class="dropdown-item pointer">把【第一次修改】设置成【更新前本地状态-未更新】</a></li>\
            <li onClick="fun.c12(2);"><a class="dropdown-item pointer">把【第二次修改】设置成【更新前本地状态-未更新】</a></li>\
        </ul>'
    },
    b10: function (name, val) {
        return '\
        <select onChange="Tool.c08(\''+ name + '\',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">请选择【查询条件】</option>\
            <option value="1" ' + ("1" == val ? 'selected="selected"' : '') + '>20 &gt; 马来语标题长度 &gt;100</option>\
            <option value="2" ' + ("2" == val ? 'selected="selected"' : '') + '>20 &gt; 英语标题长度 &gt;100</option>\
            <option value="3" ' + ("3" == val ? 'selected="selected"' : '') + '>20 &gt; 葡萄牙语标题长度 &gt;100</option>\
            <option value="4" ' + ("4" == val ? 'selected="selected"' : '') + '>手动审核1688后单位重量&lt;=0</option>\
        </select>'
    },
    b11: function (name, val, configArr) {
        let nArr = [], arr = Tool.GlobalPro_editStatus;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + ("" + arr[i][0] == "" + val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '（' + configArr[i] + '）</option>');
        }
        return '\
        <select onChange="Tool.c16(\''+ name + '\',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">修改状态</option>\
            <option value="-1">更新数量</option>\
        ' + nArr.join("") + '\
        </select>'
    },
    b12: function (editStatus, proid) {
        let arr = Tool.GlobalPro_editStatus, str = ''
        for (let i = 0; i < arr.length; i++) {
            str += '\
            <div class="form-check form-check-inline">\
                <input class="form-check-input" type="radio" name="editStatus" id="editStatus'+ i + '" ' + (arr[i][0] == editStatus ? 'disabled checked' : '') + ' onclick="fun.c09(' + arr[i][0] + ' ,\'' + proid + '\')">\
                <label class="form-check-label" for="editStatus'+ i + '">' + arr[i][1] + '</label>\
            </div>'
        }
        return str
    },
    b13: function (i, pic, proid) {
        let html = "";
        let str1 = '<a href="javascript:;" onclick="fun.c10(\'pic\',\'' + pic + '\',\'' + proid + '\')" title="设置为【首图】">设置为【首图】</a>';
        if (pic != 0) {
            html = '\
            <figure class="figure border mb-1 p-1">\
                <div class="easyzoom easyzoom--overlay">\
                <a href=\"https://s-cf-sg.shopeesz.com/file/' + pic + '\">\
                    <img src="https://s-cf-sg.shopeesz.com/file/'+ pic + '_tn"  class="figure-img img-fluid mb-0 rounded w200">\
                </a>\
                </div>\
                <figcaption class="figure-caption text-center">'+ (i + 1) + '.' + str1 + '</figcaption>\
            </figure>'
        }
        return html;
    },
    b14: function (proid) {
        let str = "";
        if (proid) {
            str = '\
            <button title="操作" class="menu-button show" data-bs-toggle="dropdown" aria-expanded="true"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu">\
                <li onclick="fun.c11(\''+ proid + '\');"><a class="dropdown-item pointer">设置为【未更新】</a></li>\
            </ul>'+ proid;
        }
        return str
    },
    b15: function (name, val) {
        let nArr = [], arr = [
            ["tw", "台湾虾皮"],
            ["my", "马来西亚"],
            ["br", "巴西"]
        ];
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + arr[i][0] + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + arr[i][1] + '</option>');
        }
        return '\
        <select onChange="Tool.c08(\''+ name + '\',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">请选择【已发布站点】</option>\
            <option value="-1">翻译【已发布站点】标题和详情</option>\
            ' + nArr.join("") + '\
        </select>'
    },
    b16: function (ManualReview, arr) {
        let str = "未知:" + ManualReview;
        for (let i = 0; i < arr.length; i++) {
            if (ManualReview == arr[i][0]) {
                str = ManualReview + "." + arr[i][1];
                break;
            }
        }
        return str
    },
    b17: function (id, ManualReview_1688_description, tw_description, ms_description, en_description, pt_description) {
        let str = '\
        <ul class="makeHtmlTab">\
            <li onclick="Tool.c15($(this),1)" class="hover">中文（简体）</li>\
            <li onclick="Tool.c15($(this),2)">中文（繁体）</li>\
            <li onclick="Tool.c15($(this),3)">马来语</li>\
            <li onclick="Tool.c15($(this),4)">英语</li>\
            <li onclick="Tool.c15($(this),5)">葡萄牙语</li>\
        </ul>\
        <textarea id="description1" rows="10" class="form-control form-control" onblur="fun.c06($(this),' + id + ',\'ManualReview_1688_description\')">' + ManualReview_1688_description + '</textarea>\
        <textarea id="description2" rows="10" class="form-control form-control hide" onblur="fun.c06($(this),' + id + ',\'tw_description\')">' + tw_description + '</textarea>\
        <textarea id="description3" rows="10" class="form-control form-control hide" onblur="fun.c06($(this),' + id + ',\'ms_description\')">' + ms_description + '</textarea>\
        <textarea id="description4" rows="10" class="form-control form-control hide" onblur="fun.c06($(this),' + id + ',\'en_description\')">' + en_description + '</textarea>\
        <textarea id="description5" rows="10" class="form-control form-control hide" onblur="fun.c06($(this),' + id + ',\'pt_description\')">' + pt_description + '</textarea>'
        return str;
    },
    b18: function (t) {
        let str = "";
        if (t) {
            let nameArr = this.b20([], t.list[0])
            str = '\
                <button title="操作" class="menu-button show" data-bs-toggle="dropdown" aria-expanded="true"><div></div><div></div><div></div></button>\
                <ul class="dropdown-menu">\
                    <li onclick="Tool.BindCategory0.a01(\''+ t.fromid_1688 + '\');"><a class="dropdown-item pointer">绑定类目</a></li>\
            </ul>'+ nameArr.join(" &gt; ");
        }
        return str
    },
    b19: function () {//问号图片
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="height:16px;width:16px;"><path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path></svg>'
    },
    //整理成1维数组
    b20: function (newArr, arr) {
        if (arr.length != 0) {
            newArr.unshift(arr[0].name);
            return this.b20(newArr, arr[0].list[0])
        }
        return newArr
    },
    b21: function (oo) {
        let title = "每次修改都会把【更新前本地状态】设置成【0.未更新】\n且会修改【店铺商品】的【本地更新时间】为当前时间。"
        return '\
        <tr class="table-light">\
          <td class="right"style="padding-left:25px;position: relative;">'+ Tool.b09() + '<span title="' + title + '">设置【修改状态】' + Tool.b19() + '</span>：</td>\
          <td>'+ (oo.id ? Tool.b12(oo.editStatus, oo.proid) : '') + '</td>\
        </tr>\
        <tr>\
            <td class="p-0" colspan="2">'+
            (oo.id ? Tool.b05(
                oo.pic,
                oo.ManualReview_1688_subject,
                oo.id, oo.tw_nameLen,
                oo.ms_nameLen,
                oo.en_nameLen,
                oo.pt_nameLen,
                oo.tw_name,
                oo.ms_name,
                oo.en_name,
                oo.pt_name,
                (oo.list[0][0] ? oo.list[0][0].subject : ""),
                oo.tw_ads_key,
                oo.my_ads_key,
                oo.br_ads_key,
                oo.list[4][0],
                oo.list[5][0],
                oo.list[6][0]) : '') +
            '</td>\
        </tr>\
        <tr>\
          <td class="right w150">1688类目路径：</td>\
          <td>'+ (oo.list[1][0] ? (oo.list[1][0].catNamePath ? oo.list[1][0].catNamePath : '') : '') + '</td>\
        </tr>\
        <tr>\
          <td class="right">shopee类目路径：</td>\
          <td style="padding-left:30px;position: relative;">'+ Tool.b18(oo.list[1][0]) + '</td>\
        </tr>\
         <tr>\
          <td class="right w200">更新前本地状态：</td>\
          <td>'+ (oo.id ? Tool.b16(oo.BeforeReview, Tool.BeforeReview) : "") + '</td>\
        </tr>\
       <tr>\
          <td class="right">编码：</td>\
          <td style="padding-left:30px;position: relative;">'+ Tool.b14(oo.proid) + '</td>\
        </tr>\
        <tr>\
          <td class="right">手动选中的【详情ID】：</td>\
          <td>'+ (oo.manualreview_1688_fromid ? '<a href="https://detail.1688.com/offer/' + oo.manualreview_1688_fromid + '.html" target="_blank">' + oo.manualreview_1688_fromid + '</a>' : '') + '</td>\
        </tr>\
        <tr>\
          <td class="right">商品ID：</td>\
          <td>'+ (oo.fromID ? '<a href="https://seller.shopee.cn/portal/product/mtsku/' + oo.fromID + '" target="_blank">' + oo.fromID + '</a>' : '') + '</td>\
        </tr>\
        <tr>\
          <td class="right">手动审核1688后单位重量：</td>\
          <td>'+ (oo.id ? '<div class="input-group w200"><input type="text" value="' + oo.ManualReview_1688_unitWeight + '" class="form-control" onblur="fun.c04($(this),' + oo.id + ',\'ManualReview_1688_unitWeight\',\'' + oo.ManualReview_1688_unitWeight + '\')"><span class="input-group-text" id="inputGroup-sizing-sm">KG</span></div>' : '') + '</td>\
        </tr>\
        <tr>\
          <td class="right">折扣：</td>\
          <td>'+ (oo.id ? '<input type="text" value="' + oo.discount + '" class="form-control w100" onblur="fun.c04($(this),' + oo.id + ',\'discount\',\'' + oo.discount + '\')">' : '') + '</td>\
        </tr>'
    },
})