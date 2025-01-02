'use strict';
let F3 =
{
    a01: function () {
        let bind = fun.obj.F3[1], txt;
        if (!bind) {
            txt = '\
      [0,{\
        "fromid":"0",\
        "arr":\
        [0\
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
      <r:type db="sqlite.aliexpress" where=" where @.fromid=\''+ bind + '\'" size=1>\
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
        Tool.ajax.a01(txt, 1, this.a02, this)
    },
    a02: function (arr2) {
        let arr4 = ['', '', '', '']
        for (let j = 1; j < arr2.length; j++) {
            for (let i = 1; i < arr2[j].arr.length; i++) {
                arr4[j - 1] += '<option value="' + arr2[j].arr[i].fromid + '" ' + (arr2[j].arr[i].fromid == arr2[j].fromid ? 'selected="selected"' : '') + '>' + (arr2[j].arr[i].isleaf == 1 ? "" : "+") + arr2[j].arr[i].name + '</option>';
            }
        }
        let html = '\
    <ul class="Tul border-n row">\
      <li class="col"><select size="2" class="form-select" style="height:300px" id="prolist1" onChange="F3.c01(this.value,\'2\',\'3,4\')">'+ arr4[0] + '</select></li>\
      <li class="col"><select size="2" class="form-select" style="height:300px" id="prolist2" onChange="F3.c01(this.value,\'3\',\'4\')">'+ arr4[1] + '</select></li>\
      <li class="col"><select size="2" class="form-select" style="height:300px" id="prolist3" onChange="F3.c01(this.value,\'4\',\'\')">'+ arr4[2] + '</select></li>\
      <li class="col"><select size="2" class="form-select" style="height:300px" id="prolist4">'+ arr4[3] + '</select></li>\
    </ul>'
        Tool.Modal('请选择要上传的速卖通类目', html, '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onClick="F3.c03();" data-bs-dismiss="modal">确定</button>', 'modal-xl');
    },
    c01: function (val, id, celar) {
        if (celar == "3,4") { $("#prolist3,#prolist4").html(""); } else if (celar == "4") { $("#prolist4").html(""); }
        let str = '[0\
		<r:type db="sqlite.aliexpress" where=" where @.upid=\''+ val + '\' order by @.sort asc" size=150>,\
		{\
			"fromid":<:fromid/>,\
			"name":"<:name/>",\
			"isleaf":<:isleaf/>\
		}\
		</r:type>]'
        let This = $("#prolist" + id);
        This.html('<option>加载中。。。</option>')
        Tool.ajax.a01(str, 1, this.c02, this, This)
    },
    c02: function (arr, This) {
        let html = ""
        for (let i = 1; i < arr.length; i++) {
            html += '<option value="' + arr[i].fromid + '">' + (arr[i].isleaf == 1 ? "&nbsp;&nbsp;&nbsp;" : "+") + arr[i].name + '</option>';
        }
        This.html(html);
    },
    c03: function () {
        let proselected = "", valid, isbool = true, arr = []
        for (let i = 4; i > 0; i--) {
            proselected = $("#prolist" + i).find("option:selected").text();
            if (proselected) {
                if (isbool) { isbool = false; valid = $("#prolist" + i).val(); }
                arr[i - 1] = Tool.Trim(proselected).replace("+", "").replace(/&nbsp;/g, "");
            }
        }
        if (valid) {

            fun.obj.upmode.types = valid;
            fun.obj.upmode.typesname = arr.join(" &gt; ");
            let str = '<r: db="sqlite.dhgate">update @.seller set @.upmode=\'' + JSON.stringify(fun.obj.upmode) + '\' where @.fromid=' + obj.arr[4] + '</r:>"' + arr.join(" &gt; ") + '"'
            Tool.ajax.a01(str, 1, this.c04, this);
        } else { alert("请选择分类"); }
    },
    c04: function (t) {
        $("#uptype").html(t)
    }
}
F3.a01();