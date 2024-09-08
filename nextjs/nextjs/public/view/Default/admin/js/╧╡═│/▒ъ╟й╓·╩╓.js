'use strict';
var fun =
{
    a01: function () {
        this.a02()
    },
    a02: function () {
        let html = '\
		'+ this.b01() + '\
    <div class="p-2" id="des">\
      '+ this.b02() + '\
    </div>'
        Tool.html(this.a03, this, html);
    },
    a03: function () {
        new ClipboardJS('.btn-clipboard');
        var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
            lineNumbers: true,
            mode: "text/html",
            matchBrackets: true
        });
        var editor = CodeMirror.fromTextArea(document.getElementById("returnCode"), {
            lineNumbers: true,
            mode: "text/html",
            matchBrackets: true
        });
    },
    b01: function () {
        return '\
    <header class="panel-heading">\
      <div onclick="fun.c01(1);" val="1" class="active">标签助手</div>\
      <div onclick="fun.c01(2);" val="2">全局标签</div>\
      <div onclick="fun.c01(3);" val="3">数据库标签</div>\
      <div onclick="fun.c01(4);" val="4">区块标签</div>\
      <div onclick="fun.c01(5);" val="5">内部方法</div>\
    </header>'
    },
    b02: function ()//URL标签
    {
        let str = '\
		<table class="table table-bordered align-middle">\
			<tr>\
				<td class="right w100">标签：</td>\
				<td>\
					<div class="bd-clipboard w-100">\
						<textarea id="code" rows="15" class="form-control form-control-sm"><.URLtoBase64(https://ae01.alicdn.com/kf/H2de519e610344c05809df1beb097d5fcf/STIGMA-20-50pcs-Tattoo-Needles-Round-Shader-Revolution-Disposable-Cartridge-for-Tattoos-Pen-Machines-10-0.jpg)/></textarea>\
						<button class="btn-clipboard" data-clipboard-target="#code">复制</button>\
					</div>\
				</td>\
			</tr>\
			<tr>\
				<td class="right">请求地址：</td>\
				<td class="input-group input-group">\
					<input type="text" class="form-control form-control-sm" value="/ajax" id="url">\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c02();">ajax提交</button>\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c04();">json提交</button>\
				</td>\
			</tr>\
			<tr>\
				<td class="right">返回结果：</td>\
				<td>\
					<div class="bd-clipboard w-100">\
						<textarea id="returnCode" rows="15" class="form-control form-control-sm"></textarea>\
						<button class="btn-clipboard" data-clipboard-target="#returnCode">复制</button>\
					</div>\
				</td>\
			</tr>\
    </table>\
		<header class="panel-heading">JavaScript 编码和解码方法</header>\
		<table class="table table-bordered table-hover align-middle">\
			<thead class="table-light">\
				<tr class="table-light"><th class="w100 center">字符</th><th class="w100 center">转义后</th><th>说明</th></tr>\
      </thead>\
			<tr><td class="center">/</td><td class="center">%2F</td><td>当获取值为【/】时，返回地址：/admin/list/23/js01/%2Fadmin%2Flist%2F23%2F%20%2F1</td></tr>\
      <tr><td class="center">空格</td><td class="center">%20</td><td>当获取值为【空】时：/admin/list/14/1/1/%20/105003</td></tr>\
			<tr>\
				<td class="right">注：</td>\
				<td colspan="2">只有【encodeURIComponent编码】【decodeURIComponent解码】符合要求。</td>\
			</tr>\
			<tr>\
				<td colspan="3">\
					<div class="input-group input-group">\
						<input type="text" class="form-control form-control-sm" value="/admin/list/23/js01/%2Fadmin%2Flist%2F23%2F%20%2F1" id="codeURI1"/>\
						<button class="btn btn-outline-secondary" type="button" onclick="$(\'#codeURI1\').val(encodeURIComponent($(\'#codeURI1\').val()));">encodeURIComponent编码</button>\
						<button class="btn btn-outline-secondary" type="button" onclick="$(\'#codeURI1\').val(decodeURIComponent($(\'#codeURI1\').val()));">decodeURIComponent解码</button>\
					</div>\
				</td>\
			</tr>\
			<tr>\
				<td colspan="3">\
					<div class="input-group input-group">\
						<input type="text" class="form-control form-control-sm" value="/admin/list/23/js01/%2Fadmin%2Flist%2F23%2F%20%2F1" id="codeURI2"/>\
						<button class="btn btn-outline-secondary" type="button" onclick="$(\'#codeURI2\').val(encodeURI($(\'#codeURI2\').val()));">encodeURI编码</button>\
						<button class="btn btn-outline-secondary" type="button" onclick="$(\'#codeURI2\').val(decodeURI($(\'#codeURI2\').val()));">decodeURI解码</button>\
					</div>\
				</td>\
			</tr>\
			<tr>\
				<td colspan="3">\
					<div class="input-group input-group">\
						<input type="text" class="form-control form-control-sm" value="/admin/list/23/js01/%2Fadmin%2Flist%2F23%2F%20%2F1" id="codeURI3"/>\
						<button class="btn btn-outline-secondary" type="button" onclick="$(\'#codeURI3\').val(escape($(\'#codeURI3\').val()));">escape编码</button>\
						<button class="btn btn-outline-secondary" type="button" onclick="$(\'#codeURI3\').val(unescape($(\'#codeURI3\').val()));">unescape解码</button>\
					</div>\
				</td>\
			</tr>\
    </table>'
        return str
    },
    b03: function ()//全局标签
    {
        let str = '\
		<table class="table table-bordered table-hover center">\
    <thead class="table-light">\
      <tr><th class="w200">标签</th><th class="left">标签说明</th></tr>\
  	</thead>\
    <tbody>\
      <tr><td>&lt;strip&gt;...&lt;/strip&gt;</td><td class="left">移除html标签外多余的空格、换行符、制表符、html注释，起压缩网页大小作用，使网页打开更快（注：不能嵌套）</td></tr>\
      <tr><td>&lt;load 模板名/&gt;</td><td class="left">载入“附加模板”（例如:&lt;load 头部.html/&gt;）。（注：可以嵌套---要弃用）</td></tr>\
      <tr><td>&lt;template 模板名/&gt;</td><td class="left">载入“通用模板”（例如:&lt;template 头部.html/&gt;）（注：不能嵌套---要弃用）</td></tr>\
      <tr><td>&lt;.方法名/&gt;</td><td class="left">方法标签，执行内部方法。（例如：<a href="#for7">无参数</a> | <a href="#for8">有参数</a> | <a href="#for9">内部方法</a>）</td></tr>\
      <tr><td>&lt;if 1==1&gt;...&lt;/if&gt;</td><td class="left">if标签，条件判断。（例如：<a href="#for1">基础判断</a> | <a href="#for2">嵌套</a> | <a href="#for3">内部方法</a> | <a href="#for4">与方法标签配合</a> | <a href="#for5">与数据库标签配合</a> | <a href="#for6">与区块标签配合</a>）</td></tr>\
      <tr><td colspan="2" class="left">注：嵌套功能有【方法标签；if标签；数据库标签；区块标签】。</td></tr>\
    </tbody>\
    </table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例1. if标签：基础判断<a name="for1"></a></th></tr></thead>\
      <tr><td>&lt;if 1==2&gt;......标签1......&lt;/if&gt;</td></tr>\
      <tr><td>&lt;if 1==2&gt;......标签1......&lt;else/&gt;......标签2......&lt;/if&gt;</td></tr>\
      <tr><td>&lt;if 1==2&gt;......标签1......&lt;elseif 1==3/&gt;......标签2......&lt;/if&gt;</td></tr>\
      <tr><td>&lt;if 1==2&gt;......标签1......&lt;elseif 1==3/&gt;......标签2......&lt;else/&gt;......标签3......&lt;/if&gt;</td></tr>\
      <tr><td>说明：<br/>1. 运算符只有：等于【==】；不等于【!=】；小于【&lt;】；共三种。<br/>2. 只有条件成立，if标签内的标签才会执行。</td></tr>\
      <tr><td>&lt;if 1==&gt;......标签1......&lt;/if&gt;</td></tr>\
      <tr><td>说明：这个表达式是成立的。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例2. if标签：嵌套<a name="for2"></a></th></tr></thead>\
      <tr>\
				<td>\
				&lt;if 1==1&gt;<br/>\
				&nbsp;&nbsp;......标签1......<br/>\
				&nbsp;&nbsp;&lt;if 2==2&gt;<br/>\
				&nbsp;&nbsp;&nbsp;&nbsp;......标签2......<br/>\
				&nbsp;&nbsp;&lt;/if&gt;<br/>\
				&nbsp;&nbsp;......标签1......<br/>\
				&lt;/if&gt;<br/>\
				</td>\
			</tr>\
      <tr><td>说明：是层次执行的。（在该表达式中，先执行【标签1】，然后执行【标签2】。）</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例3. if标签：内部方法<a name="for3"></a></th></tr></thead>\
      <tr>\
				<td>\
				&lt;if Fun(Db(mysql.admin,select count(1) FROM @.ip where @.ip=\'127.0.0.1\',count))==0&gt;<br/>\
				&nbsp;&nbsp;......没有......<br/>\
				&lt;else/&gt;<br/>\
				&nbsp;&nbsp;......有......<br/>\
				&lt;/if&gt;<br/>\
				</td>\
			</tr>\
      <tr><td>说明：以【Fun(】就表示执行内部方法。（注：左小括号，需与右小括号对等）</td></tr>\
      <tr>\
				<td>\
				&lt;if Fun(Db("mysql.admin","select count(1) FROM @.ip where @.ip=\'12,7,.,0,.0.1\'","count"))==0&gt;<br/>\
				&nbsp;&nbsp;......没有......<br/>\
				&lt;else/&gt;<br/>\
				&nbsp;&nbsp;......有......<br/>\
				&lt;/if&gt;<br/>\
				</td>\
			</tr>\
      <tr><td>说明：只要三个参数，但会现三个以上的逗号，需用双引号。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例4. if标签：与方法标签配合<a name="for4"></a></th></tr></thead>\
      <tr>\
				<td>\
				&lt;if 1==0&gt;<br/>\
				&nbsp;&nbsp;......&lt;.Path/&gt;......<br/>\
				&lt;else/&gt;<br/>\
				&nbsp;&nbsp;......&lt;.GetMd5(xxx)/&gt;......<br/>\
				&lt;/if&gt;<br/>\
				</td>\
			</tr>\
      <tr><td>说明：在该表达式中，&lt;.Path/&gt;不会执行，因为条件为假。</td></tr>\
      <tr>\
				<td>\
				&lt;if &lt;.Path/&gt;==不是变量是字符串&gt;<br/>\
				&nbsp;&nbsp;......&lt;.Path/&gt;......<br/>\
				&lt;else/&gt;<br/>\
				&nbsp;&nbsp;......&lt;.GetMd5(xxx)/&gt;......<br/>\
				&lt;/if&gt;<br/>\
				</td>\
			</tr>\
      <tr><td>说明：这个表达式是成立的，因为前面有【/】。（注：【elseif】里面不能这么写）</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例5. if标签：与数据库标签配合<a name="for5"></a></th></tr></thead>\
      <tr>\
				<td>\
				&lt;if 1==0&gt;<br/>\
				&nbsp;&nbsp;......&lt;r:ip size=10&gt;&lt;:id/&gt;&lt;/r:ip&gt;......<br/>\
				&lt;/if&gt;<br/>\
				</td>\
			</tr>\
      <tr><td>说明：在该表达式中，数据库标签不会执行，因为条件为假。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例6. if标签：与区块标签配合<a name="for6"></a></th></tr></thead>\
      <tr>\
				<td>\
				&lt;if 1==0&gt;<br/>\
				&nbsp;&nbsp;......&lt;r: db="mysql.admin"&gt;update @.type set @.template=\'xxx\' where @.id=0&lt;/r:&gt;......<br/>\
				&lt;/if&gt;<br/>\
				</td>\
			</tr>\
      <tr><td>说明：在该表达式中，区块标签不会执行，因为条件为假。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例7. 方法标签：无参数<a name="for7"></a></th></tr></thead>\
      <tr>\
				<td>&lt;.Path/&gt; 或 &lt;.Path()/&gt;</td>\
			</tr>\
      <tr><td>说明：加不加括号都一样。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例8. 方法标签：有参数<a name="for8"></a></th></tr></thead>\
      <tr>\
				<td>&lt;.WebClientPost(http://api.dhgate.com/dop/router,{})/&gt;</td>\
			</tr>\
      <tr>\
				<td>&lt;.WebClientPost("http://api.dhgate.com/dop/router","{}")/&gt;</td>\
			</tr>\
      <tr>\
				<td>&lt;.WebClientPost(["]http://api.dhgate.com/dop/router["],["]{}["])/&gt;</td>\
			</tr>\
      <tr><td>说明：以上三个表达式，意思是一样的。</td></tr>\
      <tr>\
				<td>&lt;.WebClientPost(["]http://api.dhgate.com/dop/router["],["]{"aaa":"&lt;img src="xxxx"/&amp;gt;"}["])/&gt;</td>\
			</tr>\
      <tr><td>说明：在该表达式中，提交的结果，会把【/&amp;gt;】替换为【/&gt;】。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例9. 方法标签：内部方法<a name="for9"></a></th></tr></thead>\
      <tr>\
				<td>&lt;.方法1(xxxxFun(方法2)xxxxxx)/&gt;</td>\
			</tr>\
      <tr><td>说明：先执行【方法2】，再执行【方法1】。</td></tr>\
      <tr>\
				<td>&lt;.WebClientPost(["]http://api.dhgate.com/dop/router["],["]{"method":"dh.album.img.upload","v":"2.1","funType":"albu","imgName":"1648898269937.jpg","imgBase64":"Fun(URLtoBase64(https://ae01.alicdn.com/kf/H2de519e610344c05809df1beb097d5fcf/STIGMA-20-50pcs-Tattoo-Needles-Round-Shader-Revolution-Disposable-Cartridge-for-Tattoos-Pen-Machines-10-0.jpg))","timestamp":1648898269937,"access_token":"idpmc0ooZhH3LxEJr48ItC0FwCMffGnk9Sy0A4Tn"}["])/&gt;</td>\
			</tr>\
      <tr><td>说明：先执行【URLtoBase64】，再执行【WebClientPost】。</td></tr>\
		</table>'
        return str
    },
    b04: function ()//数据库标签
    {
        let str = '\
		<table class="table table-bordered align-middle">\
		<thead class="table-light"><tr><th>执行前参数</th></tr></thead>\
    <tbody>\
    <tr>\
      <td>\
        <table class="table mb-0 table-bordered table-hover center">\
        <thead class="table-light"><tr><th class="w100">属性</th><th class="left">取值说明</th></tr></thead>\
        <tbody>\
          <tr><td>size</td><td class="left">显示多少条.默认12条（例如：<a href="#for1">显示10条数据</a>）</td></tr>\
          <tr><td>where</td><td class="left">传入sql语句（可执行内部方法）（例如：<a href="#for2">按id倒序</a> | <a href="#for6">嵌套</a> | <a href="#for3">内部方法</a>  | <a href="#for8">字段退层</a> | <a href="#for7">多表联合查询</a>）</td></tr>\
          <tr><td>page</td><td class="left">是否分页，如分页输入分页位置（例如：<a href="#for4">分页</a>）</td></tr>\
          <tr><td>db</td><td class="left">数据库，默认为：【mysql.admin】（例如：<a href="#for5">指定数据库</a>）</td></tr>\
          <tr><td>left</td><td class="left">写在【select】左边的sql语句。（例如：<a href="#for9">查询结果呈树形结构</a>）</td></tr>\
          <tr><td>right</td><td class="left">写在【select】右边的sql语句。（例如：<a href="#for11">去掉重复记录</a>）</td></tr>\
          <tr><td>pre</td><td class="left">指定字段和表名的前缀。（默认前缀在配置文件中）（例如：<a href="#for10">不要前缀</a>）</td></tr>\
        </tbody>\
        </table>\
      </td>\
    </tr>\
		<thead class="table-light"><tr><th>通用字段</th></tr></thead>\
		<tr>\
      <td>\
			“i”&nbsp;编号（例如：<a href="#for12">显示编号</a>）\
      </td>\
    </tr>\
		<thead class="table-light"><tr><th>执行后参数</th></tr></thead>\
		<tr>\
      <td>\
        <table class="table mb-0 table-bordered table-hover center align-middle" >\
        <thead class="table-light"><tr><th class="w100">属性</th><th class="left">取值说明</th></tr></thead>\
        <tbody>\
        <tr><td>len</td><td class="left">截取长度（例如：【&lt;:name len=10&gt;】当取值大于10个字符，后面补【...】。）</td></tr>\
        <tr><td>f</td><td class="left">保留小数点位数（例如：【&lt;:price f=2&gt;】保留俩位数小数，当值为0时结果为【0.00】。）</td></tr>\
        <tr><td>Fun</td><td class="left">使用内部方法（$1：字段值）。（例如：【&lt;countryid Fun=Db(sqlite.dhgate,select count(1) from @.country where @.upid=\'$1\',count)&gt;】取到值后再执行Db方法。）</td></tr>\
        <tr>\
          <td>tag</td>\
          <td>\
            <table class="table mb-0 table-bordered table-hover center">\
            <thead class="table-light"><tr><th class="w100">属性</th><th class="left">取值说明</th></tr></thead>\
            <tbody>\
              <tr><td>json</td><td class="left">做成JSON的格式（相当于JavaScript JSON.stringify() ）</td></tr>\
              <tr><td>0</td><td class="left">将【空】，替换为【0】（例如：执行sql语句要用到函数（如:sum），会返回空。）</td></tr>\
              <tr><td>True</td><td class="left">将True替换为1，将False替换为0。（例如：在Sql Server中布尔字段会返回“True”）</td></tr>\
            </tbody>\
            </table>\
          </td>\
        </tr>\
        </tbody>\
        </table>\
      </td>\
    </tr>\
		<thead class="table-light"><tr><th>分页标签（全局生效）</th></tr></thead>\
		<tr><td>&lt;@page/&gt;总页数</td></tr>\
		<tr><td>&lt;@count/&gt;总条数</td></tr>\
		<tr><td>说明：<br/>1. 必须有分页时才会生效。 <br/>2. 如果不写该标签，则会少执行一条sql语句，从而提高性能。</td></tr>\
    </tbody>\
    </table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例1.显示10条数据<a name="for1"></a></th></tr></thead>\
      <tr><td>&lt;r:ip size=10&gt;......&lt;:id/&gt;......&lt;/r:ip&gt;</td></tr>\
      <tr><td>说明：<br/>【ip】表示表名；【id】表示字段名。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例2.按id倒序<a name="for2"></a></th></tr></thead>\
      <tr><td>&lt;r:ip where=" order by @.id desc"&gt;......&lt;:id/&gt;......&lt;/r:ip&gt;</td></tr>\
      <tr><td>说明：<br/>【@.】表示字段名的前缀。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例3.内部方法<a name="for3"></a></th></tr></thead>\
      <tr><td>&lt;r:ip where="  where @.id=Fun(AdminID)"&gt;<:id/>&lt;/r:ip&gt;</td></tr>\
      <tr><td>说明：<br/>【Fun】表示要使用内部方法。【AdminID】表示方法名。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例4.分页<a name="for4"></a></th></tr></thead>\
      <tr><td>&lt;r:ip page=2&gt;......&lt;:id/&gt;......&lt;/r:ip&gt;【&lt;@page/&gt;总页数】【&lt;@count/&gt;总条数】</td></tr>\
      <tr>\
				<td>说明：<br/>\
					page=2表示翻页在url的第【2】个位置。如果要看第三页内容，则请求地址为【/ajax/3】表示第三页，【/ajax/4】表示第四页。<br/>\
					page=3表示翻页在url的第【3】个位置。如果要看第三页内容，则请求地址为【/ajax/%20/3】表示第三页，【/ajax/%20/4】表示第四页。\
				</td>\
			</tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例5.指定数据库<a name="for5"></a></th></tr></thead>\
      <tr><td>&lt;r:fav db="mysql.tool"&gt;&lt;:id/&gt;&lt;/r:fav&gt;</td></tr>\
      <tr><td>说明：【db参数】表示使用【mysql数据库】中的【tool数据库名】。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例6.嵌套<a name="for6"></a></th></tr></thead>\
      <tr><td>\
				&lt;r:ip size=1&gt;<br/>\
				&nbsp;&nbsp;&lt;r:usergroup size=10 where=" where @.id=<:id/>"&gt;<br/>\
				&nbsp;&nbsp;&nbsp;&nbsp;<:id/><br/>\
				&nbsp;&nbsp;&lt;/r:usergroup&gt;<br/>\
				&lt;/r:ip&gt;<br/>\
			</td></tr>\
      <tr><td>说明：这是俩层嵌套。</td></tr>\
      <tr><td>\
				&lt;r:ip size=10&gt;<br/>\
				&nbsp;&nbsp;&lt;r:usergroup size=1 where=" where @.id=1"&gt;<br/>\
				&nbsp;&nbsp;&nbsp;&nbsp;<:id/><br/>\
				&nbsp;&nbsp;&lt;/r:usergroup&gt;<br/>\
				&lt;/r:ip&gt;<br/>\
			</td></tr>\
      <tr><td>说明：在该表达式中,结果与下面的一样，累计执行【2条】SQL语句。【推荐】</td></tr>\
      <tr><td>\
				&lt;r:ip size=10&gt;<br/>\
				&nbsp;&nbsp;&nbsp;&nbsp;<:id Fun=Db(mysql.admin,select @.random from @.manager where @.id=1,count)/><br/>\
				&lt;/r:ip&gt;<br/>\
			</td></tr>\
      <tr><td>说明：在该表达式中,结果与上面的一样，累计执行【11条】SQL语句。【不推荐】</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例7.多表联合查询<a name="for7"></a></th></tr></thead>\
      <tr>\
				<td>\
				&lt;r:proupdhgate where=" a Inner Join @.pro b on a.@.proid=b.@.proid where b.@.hide=0"&gt;......&lt;:b.@.proid/&gt;......&lt;/r:proupdh&gt;\
				</td>\
			</tr>\
      <tr><td>说明：为方便理解，当心出错，最好先写出SQL语句，测式完后，再改写在标签形式。</td></tr>\
      <tr>\
				<td>\
				如果需要sql语句为：select top 10 stu.c_id from student stu LEFT JOIN class cl on stu.c_id=cl.Id where stu.Score&gt;80 and cl.Name=\'一班\'<br/>\
				写法如下：<br/>\
				&lt;r:student pre="" size=10 where=" stu LEFT JOIN class cl on stu.c_id=cl.Id where stu.Score&amp;gt;80 and cl.Name=\'一班\'"&gt;<br/>\
					&nbsp;&nbsp;<:stu.c_id/><br/>\
				&lt;/r:student&gt;<br/>\
				</td>\
			</tr>\
      <tr><td>说明：<br/>1. 需要把【&gt;】改写成【&amp;gt;】。<br/>2. 如果是【/&gt;】就不需改写。<br/>注：使用【区块标签】速度快一点点，但这种写法更适用于【标签嵌套】。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例8.字段退层<a name="for8"></a></th></tr></thead>\
      <tr><td>\
				&lt;r:ip size=1&gt;<br/>\
				&nbsp;&nbsp;&lt;r:usergroup size=10 where=" where @.id=&lt;:id/&gt;"&gt;<br/>\
				&nbsp;&nbsp;&nbsp;&nbsp;&lt;r:type size=10 where=" where @.id=&lt;:id/&gt;"&gt;<br/>\
				&nbsp;&nbsp;&nbsp;&nbsp;------第1个:&lt;:id/&gt;-----------第2个:&lt;1:id/&gt;-----------------第3个:&lt;2:id/&gt;<br/>\
				&nbsp;&nbsp;&nbsp;&nbsp;&lt;/r:type&gt;<br/>\
				&nbsp;&nbsp;&lt;/r:usergroup&gt;<br/>\
				&lt;/r:ip&gt;<br/>\
			</td></tr>\
      <tr><td>说明：在该表达式中，id的表达的意思不同。<br/>第1个表示type表的id；第2个表示usergroup表的id；第3个表示ip表的id。</td></tr>\
      <tr><td>\
				&lt;r:ip size=1&gt;<br/>\
				&nbsp;&nbsp;&lt;r:usergroup size=10 where=" where @.id=&lt;:id/&gt;"&gt;<br/>\
				&nbsp;&nbsp;&nbsp;&nbsp;&lt;if 11==22&gt;<br/>\
				&nbsp;&nbsp;&nbsp;&nbsp;------第1个:&lt;1:id/&gt;-----------第2个:&lt;2:id/&gt;<br/>\
				&nbsp;&nbsp;&nbsp;&nbsp;&lt;/if&gt;<br/>\
				&nbsp;&nbsp;&lt;/r:usergroup&gt;<br/>\
				&lt;/r:ip&gt;<br/>\
			</td></tr>\
      <tr><td>说明：【if标签】也算层次。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例9.查询结果呈树形结构<a name="for9"></a></th></tr></thead>\
      <tr>\
				<td>\
				&lt;r:pro size=1 left="with area as(select @.fromID,@.isleaf from @.type where @.fromID=\'1524\' union all select a.@.fromID,a.@.isleaf from @.type a join area b on a.@.upid=b.@.fromid)" where=" a where a.@.hide=0 and exists(select b.@.fromID from area b where a.@.type=b.@.fromID and b.@.isleaf=1)"><br/>\
				&nbsp;&nbsp;&lt;:a.@.id/&gt;<br/>\
				&lt;/r:pro&gt;\
			</td></tr>\
      <tr><td>说明：<br/>\
				什么是树形结构？例如：类目表中【服装】类目下有【民族服装】【男装】【女装】等等。但我需要服装类目下的所有产品，且产品表中的类目id，只存的是叶子节点id，这样就可用with来处理。<br/>\
				注：该操作，执行sql语句用时有点多。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例10.不要前缀<a name="for10"></a></th></tr></thead>\
      <tr><td>\
				&lt;r:sysobjects pre="" where=" where xtype=\'u\'"&gt;......&lt;:xtype/&gt;......&lt;/r:sysobjects&gt;\
			</td></tr>\
      <tr><td>说明：一般用来查询数据库自带的数据库或表。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例11.去掉重复记录<a name="for11"></a></th></tr></thead>\
      <tr><td>\
				&lt;r:pro right="distinct" where=" where @.proid=\'R00001\'"&gt;......&lt;:id/&gt;......&lt;/r:pro&gt;\
			</td></tr>\
      <tr><td>说明：实际SQL语句为：【select distinct @.id from @.pro where @.proid=\'R00001\'】。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例12.显示编号<a name="for12"></a></th></tr></thead>\
      <tr><td>\
				&lt;r:pro size=3&gt;......&lt;:i/&gt;......&lt;/r:pro&gt;\
			</td></tr>\
      <tr><td>返回结果为：......0............1............2......。</td></tr>\
		</table>\
		'
        return str;
    },
    b05: function () {
        let str = '\
		<table class="table table-bordered">\
		<thead class="table-light"><tr><th>执行前参数</th></tr></thead>\
		<tr>\
		 	<td>\
	      <table class="table mb-0 table-bordered table-hover">\
          <thead class="table-light"><tr><th class="center w100">参数</th><th>取值说明</th></tr></thead>\
          <tr><td class="center">file</td><td>保存文件（例如：<a href="#for1">保存txt文件</a>）</td></tr>\
          <tr><td class="center">db</td><td>执行SQL，可以返回json。（例如：<a href="#for2">单条语句</a> | <a href="#for3">多条语句</a>  | <a href="#for4">json返回值</a> ）</td></tr>\
        </table>\
      </td>\
    </tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th>例1.保存txt文件<a name="for1"></a></th></tr></thead>\
      <tr><td>&lt;r: file="/1.txt"&gt;这是保存的信息&lt;/r:&gt;</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th><a name="for2"></a>例2.执行sql语句（单条语句）</th></tr></thead>\
      <tr><td>&lt;r: db="mysql.admin"&gt;update @.type set @.template=\'xxx\' where @.id=0&lt;/r:&gt;</td></tr>\
      <tr><td>说明：<br/>【@.】表示表名或字段名的前缀。<br/>【db参数】表示使用【mysql数据库】中的【admin数据库名】。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th><a name="for2"></a>例3.执行sql语句（多条语句）</th></tr></thead>\
      <tr><td>&lt;r: db="mysql.admin"&gt;update @.type set @.template=\'xxx\' where @.id=0&lt;1/&gt;update @.type set @.template=\'xxx\' where @.id=0&lt;/r:&gt;</td></tr>\
      <tr><td>说明：<br/>执行多条语句时用【&lt;1/&gt;】做为分隔符。</td></tr>\
		</table>\
		<table class="table table-bordered">\
			<thead class="table-light"><tr><th><a name="for4"></a>例4.执行sql语句（json返回值）</th></tr></thead>\
      <tr><td>单条：&lt;r: db="mysql.admin,json"&gt;select @.id,@.IP,@.isp,@.country,@.addtime FROM @.ip order by @.id desc limit 30&lt;/r:&gt;</td></tr>\
      <tr><td>多条：&lt;r: db="mysql.admin,json"&gt;select @.template from @.type where @.id=174<1/>select @.id,@.IP,@.isp,@.country,@.addtime FROM @.ip order by @.id desc limit 30&lt;/r:&gt;</td></tr>\
		</table>'
        return str
    },
    c01: function (val) {
        $('.panel-heading div').removeClass()
        $(".panel-heading div[val=" + val + "]").addClass("active");
        let str = ""
        if (val == 1) { str = this.b02(); }
        else if (val == 2) { str = this.b03(); }
        else if (val == 3) { str = this.b04(); }
        else if (val == 4) { str = this.b05(); }
        $("#des").html(str)
    },
    c02: function () {
        let html = $("#code").val()
        let url = $("#url").val()
        Tool.ajax.a01(html, 1, this.c03, this, url)
    },
    c03: function (t) {
        $("#returnCode").html(t);
    },
    c04: function () {
        let html = $("#code").val()
        let url = $("#url").val()
        Tool.ajax.a01(html, 1, this.c05, this, url)
    },
    c05: function (oo) {
        this.c03(JSON.stringify(oo, null, 2));
    }
}
fun.a01()