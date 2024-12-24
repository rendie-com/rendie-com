'use strict';
if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
        'use strict';
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        target = Object(target);
        for (let index = 1; index < arguments.length; index++) {
            let source = arguments[index];
            if (source != null) {
                for (let key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}
Object.assign(Tool, {
    action: "", next: null, This: null, t: null,
    script: function (url) {
        let arr = url.split(",");
        this.script02(arr);
    },
    script02: function (arr) {
        let url = ""
        if (arr[0].substr(0, 1) == "/") {
            url = arr[0]
        }
        else {
            url = "/" + o.path + arr[0];
        }
        $.getScript({ type: 'GET', url: url, cache: true, dataType: 'script' }, function () {
            if (arr.length != 1) {
                arr.shift();
                Tool.script02(arr);
            }
        });
    },
    limit: function (size, page, action) {
        if (action == "pg01" || action == "pg02") {
            return " limit " + size + (page == 1 ? "" : " offset " + ((page - 1) * size))
        }
        else {
            return " limit " + (page == 1 ? "" : ((page - 1) * size) + ",") + size
        }
    },
    page: function (count, size, CurrentPage) {
        //CurrentPage     当前页
        let pagelen = 8,
            CountPage = Math.ceil(count / size),
            tempPage = CurrentPage - Math.ceil(pagelen / 2),
            str = "";
        //CountPage    	总页数        
        //tempPage    	临时页码
        str = '<ul class="pagination justify-content-end"><li class="col p-2">显示 ' + count + ' 条中的 ' + (((CurrentPage - 1) * size) + 1) + '-' + (((CurrentPage - 1) * size) + size) + ' 条</li>'
        if (count > size) {
            if (CurrentPage != 1) {
                str += '\
                <li class="page-item"><a href="javascript:" class="page-link" onclick="Tool.pageTo(1)">&#8249;&#8249; 第一页</a></li>\
                <li class="page-item"><a href="javascript:" class="page-link" onclick="Tool.pageTo(' + (CurrentPage - 1) + ')">&#8249; 上一页</a></li>';
            }
            if (tempPage < 1) { tempPage = 1; }
            for (let z = tempPage; z <= (tempPage + pagelen > CountPage ? CountPage : tempPage + pagelen); z++) {
                if (z == CurrentPage) { str += '<li class="page-item active"><span class="page-link">' + z + '</span></li>'; }
                else { str += '<li class="page-item"><a href="javascript:" class="page-link" onclick="Tool.pageTo(' + z + ');">' + z + '</a></li>'; }
            }
            if (CurrentPage != CountPage) {
                str += '\
                <li class="page-item"><a href="javascript:" class="page-link" onclick="Tool.pageTo(' + (CurrentPage + 1) + ')">下一页 &#8250;</a></li>\
                <li class="page-item"><a href="javascript:" class="page-link" onclick="Tool.pageTo(' + CountPage + ')">最后页 &#8250;&#8250;</a></li>';
            }
        }
        str = str + '</ul>'
        return str
    },
    page2: function (sessionObj, LastEvaluatedKey, obj, DEFAULT_DB, size, CurrentPage, jsFile) {
        let name = window.location.pathname + jsFile;
        if (DEFAULT_DB == "dynamodb") {
            if (CurrentPage == 1) {
                sessionObj = { count: obj.Count, "2": LastEvaluatedKey }
                sessionStorage.setItem(name, JSON.stringify(sessionObj));
            }
            else {
                sessionObj[CurrentPage + 1] = LastEvaluatedKey
                sessionStorage.setItem(name, JSON.stringify(sessionObj));
            }
            ////////////////////////////////////////////////////////
            let Count = sessionObj.count
            let CountPage = Math.ceil(Count / size)
            let str = '<ul class="pagination justify-content-end"><li class="col p-2">显示 ' + Count + ' 条中的 ' + (((CurrentPage - 1) * size) + 1) + '-' + (((CurrentPage - 1) * size) + size) + ' 条</li>'
            if (CurrentPage != 1) {
                str += '<li class="page-item"><a href="javascript:" class="page-link" onclick="Tool.pageTo(' + (CurrentPage - 1) + ')">&#8249; 上一页</a></li>';
            }
            str += '<li class="page-item"><span class="page-link">' + CurrentPage + "/" + CountPage + '</span></li>';
            if (CurrentPage != CountPage) {
                str += '<li class="page-item"><a href="javascript:" class="page-link" onclick="Tool.pageTo(' + (CurrentPage + 1) + ')">下一页 &#8250;</a></li>';
            }
            return str + '</ul>'
        }
        else {
            if (CurrentPage == 1) {
                sessionObj = { count: obj[0].Count }
                sessionStorage.setItem(name, JSON.stringify(sessionObj));
            }
            return this.page(sessionObj.count, size, CurrentPage)
        }
    },
    pageTo: function (page) {
        let urlParams = Tool.setQueryParam(location.search, "page", page)
        Tool.url(location.href.split("?")[0] + "?" + urlParams);
    },
    loadJS: function (url, next, This) {
        $.getScript({ type: 'GET', url: url, cache: false, dataType: 'script' }, function () { next.apply(This); });
    },
    write: function (oo) { document.writeln(oo); },
    IpQuery: function (ip) {
        if (!ip) ip = "";
        if (ip.indexOf("%") != -1) ip = ip.split("%")[0];//ipv6会有“%”
        return '\
        <a href="https://ipw.cn/'+ (ip.indexOf(":") == -1 ? 'ip' : 'ipv6') + '/?ip=' + ip + '" target="_blank">\
          <img height="15" src="/'+ o.path + 'admin/img/ico/ipw.cn.ico" title="IP地址查询" align="absmiddle"/>\
        </a>\
        <a href="https://ip138.com/iplookup.asp?ip='+ ip + '&action=2" target="_blank">\
          <img height="15" src="/'+ o.path + 'admin/img/ico/ip138.com.ico" title="IP地址查询" align="absmiddle"/>\
        </a>\
        <a href="https://ip.tool.chinaz.com/'+ ip + '" target="_blank">\
          <img height="15" src="/' + o.path + 'admin/img/ico/chinaz.com.ico" title="IP地址查询"/>\
        </a>'
    },
    main: function (val) {
        let url = location.href.split("?")[0] + val
        frameElement._DialogArguments.fun.a05(url);
    },
    url: function (url) {
        frameElement._DialogArguments.fun.a05(url);
    },
    open: function (name, val) {
        Tool.main("?" + Tool.setQueryParam(location.search, name, val));
    },
    openR: function (val) {
        Tool.main(val + "&return=" + encodeURIComponent(location.pathname + location.search));//返回URL
    },
    header: function (url, title) {
        return '\
		<header class="panel-heading">\
			<a href="javascript:;" onclick="Tool.url(\''+ url + '\')" class="arrow_back"></a>' + title + '\
		</header>'
    },
    x1x2: function (x, x1, x2, next1, This, next2, t) {
        if (x1 <= x2) {
            let p1 = Math.ceil(x1 / x2 * 100)
            $("#" + x + "1").html(p1 + "%").css("width", p1 + "%");
            $("#" + x + "2").html(x1 + '/' + x2);
            if (next1) { next1.apply(This, [t]); }
        }
        else {
            $("#" + x + "2").html((x1 - 1) + '/' + x2 + '（完）');
            $("#state").html("【" + x + "进度】完成！");
            if (next2) { next2.apply(This, [t]); }
        }
    },
    SMTselectType: function (fromid, next, This, t) {
        this.action = "SMTselectType"
        this.next = next;
        this.This = This;
        this.t = t;
        ///////////////////////////////////
        let txt
        if (!fromid) {
            txt = '\
            [0,{\
                "fromid":"0",\
                "arr":[0\
                  <r:type db="sqlite.aliexpress" where=" where @.upid=\'0\' and @.hide=0 order by @.sort desc" size=200>,\
		            {\
			            "fromid":<:fromid/>,\
			            "name":"<:name tag=js/>",\
			            "isleaf":<:isleaf/>\
		            }\
                  </r:type>\
                ]\
            }]';
        }
        else {
            txt = '[0\
              <r:type db="sqlite.aliexpress" where=" where @.fromid=\''+ fromid + '\'" size=1>\
                <r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:upid/>\'" size=1>\
                  <r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:upid/>\'" size=1>\
                    <r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:upid/>\'" size=1>,\
			        {\
				        "fromid":<:fromid/>,\
				        "arr":[0\
				        <r:type db="sqlite.aliexpress" where=" where @.upid=\'<:upid/>\' order by @.sort desc" size=200>,\
				        {\
					        "fromid":<:fromid/>,\
					        "name":"<:name tag=js/>",\
					        "isleaf":<:isleaf/>\
				        }\
				        </r:type>\
				        ]\
			        }\
                    </r:type>\
                    ,{\
                    "fromid":<:fromid/>,\
                    "arr":[0\
                    <r:type db="sqlite.aliexpress" where=" where @.upid=\'<:upid/>\' order by @.sort desc" size=200>,\
					{\
						"fromid":<:fromid/>,\
						"name":"<:name/>",\
						"isleaf":<:isleaf/>\
					}\
                    </r:type>\
                    ]}\
                  </r:type>\
                  ,{\
          	        "fromid":<:fromid/>,\
          	        "arr":[0\
                  <r:type db="sqlite.aliexpress" where=" where @.upid=\'<:upid/>\' order by @.sort desc" size=200>,\
				    {\
					    "fromid":<:fromid/>,\
					    "name":"<:name/>",\
					    "isleaf":<:isleaf/>\
				    }\
                  </r:type>]\
					        }\
                </r:type>\
                ,{\
			        "fromid":<:fromid/>,\
			        "arr":[0\
			        <r:type db="sqlite.aliexpress" where=" where @.upid=\'<:upid/>\' order by @.sort desc" size=200>,\
			        {\
				        "fromid":<:fromid/>,\
				        "name":"<:name/>",\
				        "isleaf":<:isleaf/>\
			        }\
			        </r:type>]\
		        }\
              </r:type>]';
        }
        this.json(this.SMTselectType02, txt, this)
    },
    SMTselectType02: function (arr2) {
        let arr4 = ['', '', '', '']
        for (let j = 1; j < arr2.length; j++) {
            for (let i = 1; i < arr2[j].arr.length; i++) {
                arr4[j - 1] += '<option value="' + arr2[j].arr[i].fromid + '" ' + (arr2[j].arr[i].fromid == arr2[j].fromid ? 'selected="selected"' : '') + '>' + (arr2[j].arr[i].isleaf == 1 ? "" : "+") + arr2[j].arr[i].name + '</option>';
            }
        }
        let html = '\
        <ul class="Tul border-n row">\
          <li class="col"><select size="2" class="form-select" style="height:300px" id="SMTprolist1" onChange="Tool.SMTselectType03(this.value,\'2\',\'3,4\')">'+ arr4[0] + '</select></li>\
          <li class="col"><select size="2" class="form-select" style="height:300px" id="SMTprolist2" onChange="Tool.SMTselectType03(this.value,\'3\',\'4\')">'+ arr4[1] + '</select></li>\
          <li class="col"><select size="2" class="form-select" style="height:300px" id="SMTprolist3" onChange="Tool.SMTselectType03(this.value,\'4\',\'\')">'+ arr4[2] + '</select></li>\
          <li class="col"><select size="2" class="form-select" style="height:300px" id="SMTprolist4">'+ arr4[3] + '</select></li>\
        </ul>'
        Tool.Modal('请选择【速卖通】类目', html, '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onClick="Tool.SMTselectType05();" data-bs-dismiss="modal">确定</button>', 'modal-xl');
    },
    SMTselectType03: function (val, id, celar) {
        if (celar == "3,4") { $("#SMTprolist3,#SMTprolist4").html(""); } else if (celar == "4") { $("#SMTprolist4").html(""); }
        let str = '[0\
        <r:type db="sqlite.aliexpress" where=" where @.upid=\''+ val + '\' order by @.sort asc" size=150>,\
	    {\
		    "fromid":<:fromid/>,\
		    "name":"<:name/>",\
		    "isleaf":<:isleaf/>\
	    }\
        </r:type>]'
        let This = $("#SMTprolist" + id);
        This.html('<option>加载中。。。</option>')
        Tool.ajax.a01(str, 1, this.SMTselectType04, this, This)
    },
    SMTselectType04: function (arr, This) {
        let html = ""
        for (let i = 1; i < arr.length; i++) {
            html += '<option value="' + arr[i].fromid + '">' + (arr[i].isleaf == 1 ? "&nbsp;&nbsp;&nbsp;" : "+") + arr[i].name + '</option>';
        }
        This.html(html);
    },
    SMTselectType05: function () {
        let proselected = "", valid, isbool = true, arr = []
        for (let i = 4; i > 0; i--) {
            proselected = $("#SMTprolist" + i).find("option:selected").text();
            if (proselected) {
                if (isbool) { isbool = false; valid = $("#SMTprolist" + i).val(); }
                arr[i - 1] = Tool.Trim(proselected).replace("+", "");
            }
        }
        if (valid) {
            if (this.action == "SMTselectType") {
                let next = this.next, This = this.This, t = this.t;
                this.action = ""
                this.next = null
                this.This = null
                this.t = null
                next.apply(This, [valid, arr.join(" &gt; ").replace(/\&nbsp;/g, ""), t]);
            }
            else {
                alert("异常：有数据在里面。")
            }
        } else { alert("请选择分类"); }
    },
    Modal: function (title, body, footer, style) {
        let str = '\
        <div class="modal fade" tabindex="-1">\
          <div class="modal-dialog modal-dialog-centered '+ style + '" role="document">\
            <div class="modal-content">\
              <div class="modal-header">\
                <h5 class="modal-title" id="exampleModalCenterTitle">'+ title + '</h5>\
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\
                </button>\
              </div>\
              <div class="modal-body">'+ body + '</div>\
              <div class="modal-footer">'+ footer + '</div>\
            </div>\
          </div>\
        </div>'
        $("body").append(str)
        $('.modal').on('hidden.bs.modal', function (e) { $(this).remove(); }).modal("toggle");
    },
    //15个常用国家
    country: function () {
        //注：顺序不能乱调（否则就不能判断名称有重复）
        return [
            {
                "id": "RU",
                "name": "俄罗斯",
                "enname": "Russia"
            },
            {
                "id": "IN",
                "name": "印度",
                "enname": "India"
            },
            {
                "id": "BR",
                "name": "巴西",
                "enname": "Brazil"
            },
            {
                "id": "SE",
                "name": "瑞典",
                "enname": "Sweden"
            },
            {
                "id": "CA",
                "name": "加拿大",
                "enname": "Canada"
            },
            {
                "id": "DE",
                "name": "德国",
                "enname": "Germany"
            },
            {
                "id": "AU",
                "name": "澳大利亚",
                "enname": "Australia"
            },
            {
                "id": "IT",
                "name": "意大利",
                "enname": "Italy"
            },
            {
                "id": "ES",
                "name": "西班牙",
                "enname": "Spain"
            },
            {
                "id": "UK",
                "name": "英国",
                "enname": "United Kingdom"
            },
            {
                "id": "FR",
                "name": "法国",
                "enname": "France"
            },
            {
                "id": "US",
                "name": "美国",
                "enname": "United States"
            },
            {
                "id": "MY",
                "name": "马来西亚",
                "enname": "Malaysia"
            },
            {
                "id": "NL",
                "name": "荷兰",
                "enname": "Netherlands"
            },
            {
                "id": "IE",
                "name": "爱尔兰",
                "enname": "Ireland"
            }
        ]
    },
    html: function (next, This, html, t) {
        $("#table").html(html)
        if (next) {
            if (t) {
                next.apply(This, [t]);
            } else {
                next.apply(This);
            }
        }
        ///////给了个，淡出动画////////////////////////////////////
        /*
        $("body").fadeOut("slow",function(){
            $("#table").html(html)
            $(this).fadeIn("slow",function(){
                if(next)
                {
                    if(t){next.apply(This,[t]);}else{next.apply(This);}
                }
            });
        })
        */
    },
    remainder: function (id, num) {
        return (Math.abs(id % num) + 1).toString().padStart(2, '0');
    },
    remainder3: function (id, num) {
        return (Math.abs(id % num) + 1).toString().padStart(3, '0');
    },
    pronum: function (proid, num) {
        let id = parseInt(proid.substring(1))
        return this.remainder(id, num);
    },
    returnID: function () {
        let id = [];
        $("input[type='checkbox'][name='pre_id']:checked").each(function () {
            id[id.length] = $(this).val();
        });
        return id.join(",")
    }
})