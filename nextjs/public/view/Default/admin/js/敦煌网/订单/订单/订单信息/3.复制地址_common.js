'use strict';
Object.assign(Tool.CopyAddress, {
    bind: {
        tmp: null,//点击绑定的时后要用
        a01: function (countrybindCountryId, o3, next, This, t)//列出【已绑定国家】下的【省/洲】来绑定。
        {
            let str = '[0\
			<r:country db="sqlite.aliexpress" where=" where @.countryid=\''+ countrybindCountryId + '\'" size=1>\
				<r:country db="sqlite.aliexpress" where=" where @.upid=\'<:fromid/>\' order by @.name asc" size=5000>,\
				{\
                    "name":"<:name/>",\
					"Isleaf":<:Isleaf/>\
                }\
				</r:country>\
			</r:country>]'
            Tool.ajax.a01(str, 1, this.a02, this, [o3, next, This, t])//列出【已绑定国家】下的【省/洲】来绑定。
        },
        a02: function (arr2, arr3)//去绑定【province】
        {            
            if (arr2.length == 5001) {
                $("#state").html("【province】益出");
            }
            else {
                let str = '', bind = []
                for (let i = 1; i < arr2.length; i++) {
                    str += '<option value="' + arr2[i].name + '">' + arr2[i].name + '</option>';
                    if (arr3[0].province.toLowerCase() == arr2[i].name.toLowerCase()) { bind = arr2[i]; break; }//可以自动绑定
                }
                ////////////////////////////////////////////////////////
                if (bind.length == 0) {
                    if (arr3[0].country == "United States" && arr3[0].province.length == 2)//绑简写
                    {
                        this.a03(arr3);//有的国家【province】，用的是简写，那这就知道是什么了
                    }
                    else {
                        this.a05(str, arr3[0].province)//需要手动绑定【province/State】

                    }
                }
                else {
                    this.c01(bind, arr3);//去绑定【province】
                }
            }
        },
        a03: function (arr) {
            let str = '"<r:country db="sqlite.dhgate" where=" where @.fromid=' + Tool.rpsql(arr[0].province) + ' and @.upid=\'US\'" size=1><:name/></r:country>"'
            Tool.ajax.a01(str, 1, this.a04, this, arr)
        },
        a04: function (t, arr) {
            Tool.apply({ province: t }, arr[1], arr[2], arr[3]);
        },
        a05: function (str, province) {
            let err = "需要手动绑定【province/State】"
            $("#state").html(err);
            $("#seep3").html("*(3)").attr("class", "btn btn-danger");
            let html = '\
			<table class="table table-bordered table-hover">\
				<tr>\
					<td class="right">province/State：</td>\
					<td>'+ province + '</td>\
				</tr>\
				<tr>\
					<td class="right">绑定为：</td>\
					<td><select id="CopyAddress_c06" class="form-select">'+ str + '</select></td>\
				</tr>\
			</table>'
            let btn = '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="Tool.CopyAddress.c06();" data-bs-dismiss="modal">确认绑定</button>'
            Tool.Modal(err, html, btn, '');
        },
        c01: function (bind, arr3)//去绑定【province】
        {
            let o3 = arr3[0];
            o3.provinceBind = bind.name;
            if (bind.Isleaf == 1)//【省/洲】就已经是叶子类目了
            {
                o3.cityBind = o3.city;
                let str = '""<r: db="sqlite.dhgate">insert into @.countrybind(@.addressA,@.addressB,@.isleafB)values(\'' + o3.country + ' - ' + o3.province.replace(/'/g, "''") + '\',\'' + (o3.CountryId + " - " + bind.name).replace(/'/g, "''") + '\',1)</r:>'//绑定【省/洲】
                Tool.ajax.a01(str, 1, this.c04, this, arr3);
            }
            else//【省/洲】【不是】叶子类目
            {
                let str = '[0\
                <r:country db="sqlite.aliexpress" where=" where @.countryid=\'' + o3.CountryId + '\'" size=1>\
                <r:country db="sqlite.aliexpress" where=" where @.upid=\'<:fromid/>\' and @.name=\'' + bind.name + '\'" size=1>\
                <r:country db="sqlite.aliexpress" where=" where @.upid=\'<:fromid/>\' order by @.name asc" size=5000>,\
                {\
                    "name":<:name tag=json/>,\
                    "Isleaf":"<:Isleaf/>"\
                }\
                </r:country>\
                </r:country>\
                </r:country>]'
                Tool.ajax.a01(str, 1, this.c02, this, arr3);//列出【绑定国】的【绑定省】的城市。
            }
        },
        c02: function (arr2, arr3) {
            let o3 = arr3[0];
            if (arr2.length == 5001) { $("#state").html("【城市】益出"); }
            else {
                let str = '', bind = {}
                for (let i = 1; i < arr2.length; i++) {

                    str += '<option value="' + arr2[i] + '">' + arr2[i].name + '</option>';
                    if (o3.city.toLowerCase() == arr2[i].name.toLowerCase()) { bind = arr2[i]; break; }
                }
                if (!bind.name) {
                    let err = "需要手动绑定【city】"
                    $("#state").html(err);
                    $("#seep3").html("*(3)").attr("class", "btn btn-danger");
                    str = '\
                        <table class="table table-hover">\
                        <tr>\
        	                <td class="right">city：</td>\
        	                <td>'+ o3.city + '</td>\
                        </tr>\
                        <tr>\
        	                <td class="right">绑定为：</td>\
        	                <td><select id="CopyAddress_c05" class="form-select">'+ str + '</select></td>\
                        </tr>\
                        </table>'
                    this.tmp = arr3;//点击，绑定的时后要用
                    Tool.Modal(err, str, '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="Tool.CopyAddress.bind.c05(Tool.CopyAddress.bind.tmp);" data-bs-dismiss="modal">确认绑定</button>', '');
                }
                else {
                    this.c03(bind, arr3);//去绑定【城市】
                }
            }
        },
        c03: function (bind, arr3) {
            let o3 = arr3[0];
            let str = '""<r: db="sqlite.dhgate">insert into @.countrybind(@.addressA,@.addressB,@.isleafB)values(' + Tool.rpsql(o3.country + ' - ' + o3.province + ' - ' + o3.city) + ',' + Tool.rpsql(o3.CountryId + " - " + o3.provinceBind + " - " + bind.name) + ',1)</r:>'
            o3.cityBind = bind.name;
            Tool.ajax.a01(str, 1, this.c04, this, arr3);
        },
        c04: function (t, arr) {
            if (t == "") {
                this.tmp = null;
                Tool.apply(arr[0], arr[1], arr[2], arr[3]);
            } else {
                $("#state").html(t);
            }
        },
        c05: function (arr3) {
            let val = $("#CopyAddress_c05").val().split("=");
            this.c03(val, arr3)
        },
        //c06: function () {
        //    let val = $("#CopyAddress_c06").val().split("=");
        //    this.c01(val)
        //},


    }
})