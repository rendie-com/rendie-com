'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let html = Tool.header('正在获取绑定到敦煌网类路径...') + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
		        <tr><td class="right w150">状态进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr></tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let str = '[<@page/>\
        <r:typebind db="sqlite.aliexpress" size=1 page=2 where=" where @.dhTypePath is null">,\
        {\
         "typeArr":[\
			<r:type db="sqlite.dhgate" where=" where @.fromid=\'<:dhType/>\'" size=1>\
				<r:type db="sqlite.dhgate" where=" where @.fromid=\'<:upid/>\'" size=1>\
					<r:type db="sqlite.dhgate" where=" where @.fromid=\'<:upid/>\'" size=1>\
						<r:type db="sqlite.dhgate" where=" where @.fromid=\'<:upid/>\'" size=1>\
							<:name tag=json/>,\
						</r:type>\
						<:name tag=json/>,\
					</r:type>\
					<:name tag=json/>,\
				</r:type>\
				<:name tag=json/>\
			</r:type>],\
          "dhType":"<:dhType/>"\
        }\
        </r:typebind>]'
        Tool.ajax.a01( str, this.obj.A1,this.a03, this);
    },
    a03: function (oo) {
        this.obj.A2 = oo[0];
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, oo[1])
   
    },
    a04: function (oo) {
        let html = '<r: db="sqlite.aliexpress">update @.typebind set @.dhtypepath=' + Tool.rpsql(JSON.stringify(oo.typeArr)) + ' where @.dhType=\'' + oo.dhType + '\'</r:>'
        Tool.ajax.a01( html,1,this.a05, this);
    },
    a05: function (t) {
        if (t == "") {
            this.a02();
        }
        else {
            Tool.at("出错"+t);
        }
    }
}
fun.a01();