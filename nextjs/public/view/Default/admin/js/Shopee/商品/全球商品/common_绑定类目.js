'use strict';
Object.assign(Tool, {
    BindCategory0://选中【Shopee类目】将它绑定到1688类目
    {
        obj: {
            _1688: {},
            searchword: "",
        },
        a01: function (fromid) {
            if (fromid == 0) {
                Tool.Modal("提示", "<p>1688的类目ID，不能为0。<p>", '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>', '')
            }
            else {
                let data = [{
                    action: "sqlite",
                    database: "1688/类目/现货类目",
                    sql: "select " + Tool.fieldAs("catnamepath,bindshopee") + " FROM @.table where  @.fromid=" + fromid + " limit 1",
                    list: this.b04("${bindshopee}").concat(this.b02("${bindshopee}"))
                }]
                //正在获取【1688】类目路径
                Tool.ajax.a01(data, this.a02, this, fromid)
            }
        },
        a02: function (t, fromid) {
            let nameArr = this.b01([], t[0][0].list[0])
            t[0][0].fromid = fromid
            t[0][0].nameArr = nameArr
            if (t[0][0].bindshopee != 0) { t[0][0].arr04 = this.b06([t[0][0].list[1]]); }
            this.obj._1688 = t[0][0];//后面还会用到   
            ///////////////////////////////////////
            let nArr = [], arr = t[0][0].catnamepath.replace(/、/g, ">").split(">")
            for (let i = 0; i < arr.length; i++) {
                nArr.push("@.name like'%" + (Tool.Trim(arr[i]).replace(/'/g, "''")) + "%'");
            }
            this.a03(nArr)
        },
        a03: function (nArr) {
            //对类目路径中的名称，都在【shopee】中搜索一下
            let data = [{
                action: "sqlite",
                database: "shopee/类目/类目",
                sql: "select @.fromid as fromid FROM @.table where " + nArr.join(" or "),
                //翻译成中文
                list: this.b04("${fromid}")
            }]
            if (this.obj._1688.bindshopee == 0) {
                data.push({
                    action: "sqlite",
                    database: "shopee/类目/类目",
                    sql: "select " + Tool.fieldAs("name,fromid,isleaf") + " FROM @.table where @.upid=0 order by @.sort asc",
                })
            }
            Tool.ajax.a01(data, this.a04, this)
        },
        a04: function (t) {
            if (t[1]) {
                this.obj._1688.arr04 = this.b06([
                    [
                        {
                            "list": [[], t[1]]
                        }
                    ]
                ]);
            }
            this.a05(this.b05(t[0]))
        },
        a05: function (typeArr) {
            let button = '<button type="button" class="btn btn-outline-secondary" onclick="Tool.BindCategory0.c01(' + this.obj._1688.bindshopee + ');" title="点击【选中该类目】">' + this.obj._1688.nameArr.join(" &gt; ") + '</button>'
            let t1 = '已绑定【Shopee类目】：' + (this.obj._1688.bindshopee == 0 ? '' : button) + '<hr/>'
            ///////////////////显示搜索结果/////////////////////////////////////////////////////////////////////////
            for (let i = 0; i < typeArr.length; i++) {
                t1 += '<button type="button" class="btn btn-outline-secondary m-1" onclick="Tool.BindCategory0.c01(' + typeArr[i].fromid + ');" title="点击【选中该类目】">' + typeArr[i].name + '</button>';
            }
            this.a06(t1)
        },
        a06: function (t1) {
            let nArr = [], arr = this.obj._1688.catnamepath.split(">")
            for (let i = 0; i < arr.length; i++) {
                nArr.push('<a href="javascript:;" onclick="Tool.BindCategory0.c03(\'' + ("" + arr[i]).replace(/'/g, "\\'") + '\');" data-bs-dismiss="modal">' + arr[i] + '</a>');
            }
            this.a07(nArr, t1)
        },
        a07: function (nArr, t1) {
            let arr4 = this.obj._1688.arr04;
            let html = '\
            <div class="input-group w-50">\
        	    <input type="text" class="form-control" id="ShopeeSearchword" value="'+ this.obj.searchword + '">\
        	    <button class="btn btn-outline-secondary" type="button" onclick="Tool.BindCategory0.c03($(\'#ShopeeSearchword\').val());">搜索</button>\
            </div>\
            <table class="table">\
        	    <tr><td colspan=4"">'+ t1 + '</td></tr>\
        	    <tr>\
        		    <td class="w-20 p-0"><select size="2" class="form-select" style="height:300px" id="shopeeList1" onChange="Tool.BindCategory0.c04(this.value,\'2\',\'3,4,5\')">'+ arr4[0] + '</select></td>\
        		    <td class="w-20 p-0"><select size="2" class="form-select" style="height:300px" id="shopeeList2" onChange="Tool.BindCategory0.c04(this.value,\'3\',\'4,5\')">'+ arr4[1] + '</select></td>\
        		    <td class="w-20 p-0"><select size="2" class="form-select" style="height:300px" id="shopeeList3" onChange="Tool.BindCategory0.c04(this.value,\'4\',\'5\')">'+ arr4[2] + '</select></td>\
        		    <td class="w-20 p-0"><select size="2" class="form-select" style="height:300px" id="shopeeList4">'+ arr4[3] + '</select></td>\
        		    <td class="w-20 p-0"><select size="2" class="form-select" style="height:300px" id="shopeeList5">'+ arr4[4] + '</select></td>\
        	    </tr>\
            </table>'
            let button = '\
            <button type="button" class="btn btn-secondary" onClick="Tool.BindCategory0.c07([[]]);" data-bs-dismiss="modal">关闭</button>\
            <button type="button" class="btn btn-primary" onClick="Tool.BindCategory0.c06(false);" data-bs-dismiss="modal">确定绑定</button>\
            <button type="button" class="btn btn-primary" onClick="Tool.BindCategory0.c06(true);" data-bs-dismiss="modal">确定绑定且设置该类为【未更新】</button>'
            Tool.Modal('选中【Shopee类目】将它绑定到1688类目【' + nArr.join("&nbsp;&gt;&nbsp;") + '】', html, button, 'modal-xl');
        },
        //整理成1维数组
        b01: function (newArr, arr) {
            if (arr.length != 0) {
                newArr.unshift(arr[0].name);
                return this.b01(newArr, arr[0].list[0])
            }
            return newArr
        },
        b02: function (fromid) {
            let data = [{
                action: "sqlite",
                database: "shopee/类目/类目",
                sql: "select " + Tool.fieldAs("upid,fromid") + " FROM @.table where @.fromid=" + fromid + " limit 1",
                list: [{
                    action: "sqlite",
                    database: "shopee/类目/类目",
                    sql: "select " + Tool.fieldAs("upid,fromid") + " FROM @.table where @.fromid=${upid} limit 1",
                    list: [{
                        action: "sqlite",
                        database: "shopee/类目/类目",
                        sql: "select " + Tool.fieldAs("upid,fromid") + " FROM @.table where @.fromid=${upid} limit 1",
                        list: [{
                            action: "sqlite",
                            database: "shopee/类目/类目",
                            sql: "select " + Tool.fieldAs("upid,fromid") + " FROM @.table where @.fromid=${upid} limit 1",
                            list: [{
                                action: "sqlite",
                                database: "shopee/类目/类目",
                                sql: "select " + Tool.fieldAs("upid,fromid") + " FROM @.table where @.fromid=${upid} limit 1",
                                list: [{
                                    action: "sqlite",
                                    database: "shopee/类目/类目",
                                    sql: "select " + Tool.fieldAs("upid,fromid") + " FROM @.table where @.fromid=${upid} limit 1",
                                    list: []
                                },
                                {
                                    action: "sqlite",
                                    database: "shopee/类目/类目",
                                    sql: "select " + Tool.fieldAs("name,fromid,isleaf") + " FROM @.table where @.upid=${upid} order by @.sort asc"
                                }]
                            },
                            {
                                action: "sqlite",
                                database: "shopee/类目/类目",
                                sql: "select " + Tool.fieldAs("name,fromid,isleaf") + " FROM @.table where @.upid=${upid} order by @.sort asc"
                            }]
                        },
                        {
                            action: "sqlite",
                            database: "shopee/类目/类目",
                            sql: "select " + Tool.fieldAs("name,fromid,isleaf") + " FROM @.table where @.upid=${upid} order by @.sort asc"
                        }]
                    },
                    {
                        action: "sqlite",
                        database: "shopee/类目/类目",
                        sql: "select " + Tool.fieldAs("name,fromid,isleaf") + " FROM @.table where @.upid=${upid} order by @.sort asc"
                    }]
                },
                {
                    action: "sqlite",
                    database: "shopee/类目/类目",
                    sql: "select " + Tool.fieldAs("name,fromid,isleaf") + " FROM @.table where @.upid=${upid} order by @.sort asc"
                }]
            }]
            return data;
        },
        //整理成1维数组
        b03: function (newArr, arr) {
            if (arr.length != 0) {
                newArr.unshift({ fromid: arr[0].fromid, list: arr[0].list[1] });
                return this.b03(newArr, arr[0].list[0])
            }
            return newArr
        },
        b04: function (fromid) {
            return [{
                action: "sqlite",
                database: "shopee/类目/类目",
                sql: "select " + Tool.fieldAs("name,upid") + " FROM @.table where @.fromid=" + fromid + " limit 1",
                list: [{
                    action: "sqlite",
                    database: "shopee/类目/类目",
                    sql: "select " + Tool.fieldAs("name,upid") + " FROM @.table where @.fromid=${upid} limit 1",
                    list: [{
                        action: "sqlite",
                        database: "shopee/类目/类目",
                        sql: "select " + Tool.fieldAs("name,upid") + " FROM @.table where @.fromid=${upid} limit 1",
                        list: [{
                            action: "sqlite",
                            database: "shopee/类目/类目",
                            sql: "select " + Tool.fieldAs("name,upid") + " FROM @.table where @.fromid=${upid} limit 1",
                            list: [{
                                action: "sqlite",
                                database: "shopee/类目/类目",
                                sql: "select " + Tool.fieldAs("name,upid") + " FROM @.table where @.fromid=${upid} limit 1"
                            }]
                        }]
                    }]
                }]
            }]
        },
        b05: function (arr) {
            let newArr = []
            for (let i = 0; i < arr.length; i++) {
                newArr.push({
                    fromid: arr[i].fromid,
                    name: this.b01([], arr[i].list[0]).join(" &gt; ")
                })
            }
            newArr.sort((a, b) => a.name.localeCompare(b.name));
            return newArr
        },
        b06: function (t) {
            let arr4 = this.b03([], t[0])//整理成1维数组
            let arr04 = ["", "", "", "", ""]
            for (let i = 0; i < arr4.length; i++) {
                for (let j = 0; j < arr4[i].list.length; j++) {
                    arr04[i] += '\
                    <option value="' + arr4[i].list[j].fromid + '" ' + (arr4[i].list[j].fromid == arr4[i].fromid ? 'selected="selected"' : '') + '>' +
                        (arr4[i].list[j].isleaf == 1 ? "&nbsp; &nbsp;" : "+") + arr4[i].list[j].name +
                        '</option>';
                }
            }
            return arr04
        },
        //////////////////////////////////////////////
        c01: function (fromid) {
            $("#shopeeList1").html("<option>加载中...</option>")
            $("#shopeeList2,#shopeeList3,#shopeeList4").html("")
            let data = this.b02(fromid)
            Tool.ajax.a01(data, this.c02, this)
        },
        c02: function (t) {
            let arr04 = this.b06(t);
            $("#shopeeList1").html(arr04[0])
            $("#shopeeList2").html(arr04[1])
            $("#shopeeList3").html(arr04[2])
            $("#shopeeList4").html(arr04[3])
            $("#shopeeList5").html(arr04[4])
        },
        c03: function (val) {
            val = Tool.Trim(val)
            if (val) {
                this.obj.searchword = val
                let data = [{
                    action: "sqlite",
                    database: "shopee/类目/类目",
                    sql: "select @.fromid as fromid FROM @.table where @.name like '%" + val.replace(/'/g, "''") + "%'",
                    //翻译成中文
                    list: this.b04("${fromid}")
                }]
                Tool.ajax.a01(data, this.a04, this)
            }
            else {
                Tool.at("请输入搜索关键词");
            }
        },
        //////////////////////////////////////////////
        c04: function (val, num, celar) {
            if (celar == "3,4,5") { $("#shopeeList3,#shopeeList4,#shopeeList5").html(""); }
            else if (celar == "4,5") { $("#shopeeList4,#shopeeList5").html(""); }
            else if (celar == "5") { $("#shopeeList5").html(""); }
            let This = $("#shopeeList" + num);
            This.html('<option>加载中。。。</option>');
            let data = [{
                action: "sqlite",
                database: "shopee/类目/类目",
                sql: "select " + Tool.fieldAs("name,fromid,isleaf") + " FROM @.table where @.upid=" + val + " order by @.sort asc",
            }]
            Tool.ajax.a01(data, this.c05, this, This)
        },
        c05: function (t, This) {
            let html = "", arr = t[0]
            for (let i = 0; i < arr.length; i++) {
                html += '<option value="' + arr[i].fromid + '">' + (arr[i].isleaf == 1 ? "&nbsp;&nbsp;&nbsp;" : "+") + arr[i].name + '</option>';
            }
            This.html(html);
        },
        ///////////////////////////////////
        c06: function (isUpType) {
            let proselected, valid
            for (let i = 5; i > 0; i--) {
                proselected = $("#shopeeList" + i).find("option:selected").text()
                if (proselected) { valid = $("#shopeeList" + i).val(); break; }
            }
            if (valid) {
                //bindshopee        表示绑定Shopee的哪个类目ID
                let data = [{
                    action: "sqlite",
                    database: "1688/类目/现货类目",
                    sql: "update @.table set @.bindshopee=" + valid + " where @.fromid=" + this.obj._1688.fromid,
                }]
                if (isUpType) {
                    //BeforeReview=0        表示 更新前本地状态:0.未更新
                    data.push({
                        action: "sqlite",
                        database: "shopee/商品/全球商品",
                        sql: "update @.table set @.BeforeReview=0 where @.ManualReview_1688_categoryId=" + this.obj._1688.fromid,
                    })
                }
                Tool.ajax.a01(data, this.c07, this);
            }
            else { Tool.at("选择绑定的分类"); }
        },
        c07: function (t) {
            if (t[0].length == 0) {
                this.obj = {
                    _1688: {},
                    searchword: "",
                }
                Tool.reload(t)
            }
            else {
                Tool.pre(["更新出错", t])
            }
        },

    }
})










// let txt = '[\
// <r:type db="sqlite.shopee" where=" where @.fromid='+ fromid + '" size=1>\

// 	<r:type db="sqlite.shopee" where=" where @.fromid=<:upid/>" size=1>\
// 		<r:type db="sqlite.shopee" where=" where @.fromid=<:upid/>" size=1>\
// 			<r:type db="sqlite.shopee" where=" where @.fromid=<:upid/>" size=1>\
// 			    <r:type db="sqlite.shopee" where=" where @.fromid=<:upid/>" size=1>\
// 				    '+ this.b02('<:fromid/>', '<:upid/>') + ',\
// 			    </r:type>\
// 			'+ this.b02('<:fromid/>', '<:upid/>') + ',\
// 			</r:type>\
// 			'+ this.b02('<:fromid/>', '<:upid/>') + ',\
// 		</r:type>\
// 		'+ this.b02('<:fromid/>', '<:upid/>') + ',\
// 	</r:type>\

// 	'+ this.b02('<:fromid/>', '<:upid/>') + '\
// </r:type>]';
// b02: function (fromid, upid) {
//     return '\
//     {\
// 	    "list":['+ fromid + '\
// 		    <r:type db="sqlite.shopee" where=" where @.upid='+ upid + ' order by @.sort asc" size=200>,\
// 			    {"fromid":<:fromid/>,"name":<:name tag=json/>,"isleaf":<:isleaf/>}\
// 		    </r:type>\
// 	    ]\
//     }'
// },