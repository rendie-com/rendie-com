'use strict';
Object.assign(Tool, {
    header01: function (mode) {
        return '\
        <ul class="makeHtmlTab">\
            <li '+ (mode == "-_-20" ? ' class="hover"' : '') + 'onclick="Tool.main()">相册API</li>\
            <li '+ (mode == "js01" ? ' class="hover"' : '') + ' onclick="Tool.main(\'js01\')">类目API</li>\
            <li '+ (mode == "js07" ? ' class="hover"' : '') + ' onclick="Tool.main(\'js07\')">客户评论API</li>\
            <li '+ (mode == "js08" ? ' class="hover"' : '') + ' onclick="Tool.main(\'js08\')">在线发货API</li>\
            <li '+ (mode == "js09" ? ' class="hover"' : '') + ' onclick="Tool.main(\'js09\')">物流API</li>\
            <li '+ (mode == "js10" ? ' class="hover"' : '') + ' onclick="Tool.main(\'js10\')">站内信API</li>\
            <li '+ (mode == "js11" ? ' class="hover"' : '') + ' onclick="Tool.main(\'js11\')">订单API</li>\
            <li '+ (mode == "js12" ? ' class="hover"' : '') + ' onclick="Tool.main(\'js12\')">产品API</li>\
            <li '+ (mode == "js13" ? ' class="hover"' : '') + ' onclick="Tool.main(\'js13\')">用户API</li>\
		</ul>'
    },
    fromid_username_token: 
    {
        obj: {},
        token:"",
        a01: function (next, This, t) {
            let str = '\
			{<r:seller db="sqlite.dhgate" size=1 where=" order by @.sort asc">\
				"fromid":"<:fromid/>",\
				"username":"<:username/>",\
				"token":<:token tag=0/>\
			</r:seller>}';
           Tool.ajax.a01( 1, This,this.a02, str, this, [next, t]);
        },
        a02: function (oo, t) {
            this.obj = oo;
            Tool.GetToken(this, this.a03, t)
        },
        a03: function (t) {
            Tool.apply(this.token, t[1], t[0], t[2]);
        }
    },
    header02:
    {
        a01: function (mode, next, This, t) {
            let str = '[0\
			<r:seller db="sqlite.dhgate" size=100 where=" order by @.sort asc">,\
			{\
				"fromid":"<:fromid/>",\
				"username":"<:username/>",\
				"token":<:token tag=0/>\
			}\
			</r:seller>]';
            Tool.ajax.a01(str,1, this.a02, this,  [mode, next, This, t]);
        },
        a02: function (arr1, arr2) {
            let arr3 = this.b01(arr1)//返回   【option内容，fromid，username，token】
            let html = '\
			<header class="panel-heading">\
				<div onclick="Tool.main()" '+ (arr2[0] == "-_-20" ? ' class="active"' : '') + '>卖家API</div>\
				<div onclick="Tool.main(\'js02\')"'+ (arr2[0] == "js02" ? ' class="active"' : '') + '>买家API</div>\
				<div onclick="Tool.main(\'js03\')"'+ (arr2[0] == "js03" ? ' class="active"' : '') + '>公共API</div>\
				<div onclick="Tool.main(\'js04\')"'+ (arr2[0] == "js04" ? ' class="active"' : '') + '>分销API</div>\
				<div onclick="Tool.main(\'js05\')"'+ (arr2[0] == "js05" ? ' class="active"' : '') + '>平台错误码</div>\
				<div onclick="Tool.main(\'js06\')"'+ (arr2[0] == "js06" ? ' class="active"' : '') + '>授权错误响应</div>\
				<span style="position: absolute; right:91px;">\
				切换账户：<select onChange = "Tool.open(5,this.options[this.selectedIndex].value);" class="form-select w300" style="position: relative;left: 80px;top: -31px;">'+ arr3[0] + '</select>\
				</span>\
			</header>'
            arr2[1].apply(arr2[2], [html, arr3[1], arr3[2], arr3[3], arr2[3]]);
        },
        b01: function (arr) {
            let str = '', username = "", fromid, token
            for (let i = 1; i < arr.length; i++) {
                str += '<option value="' + arr[i].fromid + '" ' + (obj.arr[5] == arr[i].fromid ? 'selected="selected"' : '') + '>（' + i + '）' + arr[i].username + '</option>'
                ///////////////////////////////
                if (obj.arr[5] == arr[i].fromid) {
                    fromid = arr[i].fromid
                    username = arr[i].username
                    token = arr[i].token
                }
            }
            if (obj.arr[5] == "-_-20")//没有选中就用第一个
            {
                fromid = arr[1].fromid;
                username = arr[1].username;
                token = arr[1].token;
            }
            return [str, fromid, username, token]
        },
    }
})