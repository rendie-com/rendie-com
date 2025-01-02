var fun =
    {
        obj:
        {
            A1: 1, A2: 0,
            B1: 1, B2: 0,
            where: "",//只要一条就行了。
            username: "", password: "", fromid: 0
        },
        a01: function () {
            let html = Tool.header('正在【获取已上传商品的详情】...') + '\
    <div class="p-2">\
      <table class="table table-hover">\
        <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
        <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right">商品条进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
        </tbody>\
      </table>\
    </div>'
            Tool.html(this.a02, this, html);
        },
        a02: function () {
            gg.isRD(this.a03, this);
        },
        a03: function () {
            Tool.getDHuser(this.a04, this);
        },
        a04: function () {
            $("#username").html(this.obj.username);
            Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
        },
        a05: function () {
            $("#state").html("正在验证登陆。。。");
            Tool.verifyUser.a01(this.a06, this);
        },
        a06: function () {
            var str = '[' + (this.obj.B2 == 0 ? '<@count/>' : 0) + '\
      <r:proupdhgate size=1 db="sqlite.dhgate" where=" where @.upuserid='+ this.obj.fromid + '" page=2>,\
      {\
        <r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
			    "pic":<:pic tag=json/>,\
			    "DHdes":<:DHdes tag=json/>,\
		    </r:prodes>\
        "proid": "<:proid/>",\
        "fromID":"<:fromID/>"\
      }\
      </r:proupdhgate>]'
            Tool.ajax.a01(str, this.obj.B1, this.a07, this);
        },
        a07: function (arr) {
            if (this.obj.B2 == 0) this.obj.B2 = arr[0];
            this.a08(arr[1]);
        },
        a08: function (oo) {
            Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a09, this, this.a12, oo);
        },
        a09: function (oo) {
            //如果有【image.dhgate.cf】就跳过。
            if (oo.pic) {
                if (oo.DHdes.indexOf("//image.dhgate.cf") == -1) {
                    var url = "http://seller.dhgate.com/syi/edit.do?designatedVersion=1&pid=" + oo.fromID
                    $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
                    $("#state").html("正在获取详情内容。。。");
                    gg.getFetch(url,"json", this.a10, this, oo);
                }
                else { this.a11(""); }
            }
            else {
                let str = '<r: db="sqlite.aliexpress">delete  from @.proupdhgate where @.proid=\'' + oo.proid + '\'</r:>';
                $("#state").html("没有详情就删除吧。。。。。。");
                Tool.ajax.a01(str, 1, this.a11, this);
            }
        },
        a10: function (t, oo) {
            let des = Tool.StrSlice(t, '<script id="elm" type="text/plain" name="elm">', '</script>')
            let proid = oo.proid;
            let str = '<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">update @.prodes set @.DHdes=' + Tool.rpsql(des) + ' where @.proid=\'' + proid + '\'</r:>';
            $("#state").html("正在保存详情内容。。。");
            Tool.ajax.a01(str, 1, this.a11, this);
        },
        a11: function (t) {
            if (t == "") {
                this.obj.B1++;
                this.a06();
            }
            else { Tool.at(t); }

        },
        a12: function (t) {
            this.obj.A1++;
            this.obj.B1 = 1;
            this.obj.B2 = 0;
            this.a03();
        }
    }.a01();