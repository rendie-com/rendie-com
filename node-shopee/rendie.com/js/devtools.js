var fun =
{
    T: [],
    a01: function () {
        var This = this
        chrome.runtime.onMessage.addListener(function (request, sender, next) {
            if (request.cmd == "devtools") {
                switch (request.action) {
                    case "getNetwork": This.getNetwork.a01(request.content, next); break;
                    default:
                        This.b01("出错:" + request.action);
                }
            }
            return true;
        });
        this.a02()
    },
    a02: function () {
        // 创建自定义面板，同一个插件可以创建多个自定义面板
        // 几个参数依次为：panel标题、图标（其实设置了也没地方显示）、要加载的页面、加载成功后的回调
        chrome.devtools.panels.create('MyPanel', 'img/icon16.png', 'mypanel.html', function (panel) {
            console.log('自定义面板创建成功！'); // 注意这个log看不到（ 不能直接输出）
        });
        // 创建自定义侧边栏
        chrome.devtools.panels.elements.createSidebarPane("Images", function (sidebar) {
            // sidebar.setPage('../sidebar.html'); // 指定加载某个页面
            sidebar.setExpression('document.querySelectorAll("img")', 'All Images'); // 通过表达式来指定
            //sidebar.setObject({aaa: 111, bbb: 'Hello World!'}); // 直接设置显示某个对象
        });
        //this.getNetwork.a01("freightinfoservice", null);
    },
    b01: function (des) {
        chrome.devtools.inspectedWindow.eval('console.log("request.url: " + unescape("' + escape(des) + '"))');
    },
    getNetwork: {
        a01: function (content, next) {
            var This = this;
            chrome.devtools.network.onRequestFinished.addListener(function (e) {
                This.a02(e, content, next)
            });
        },
        a02: function (e, content, next) {
            //rq 包含请求响应数据，如：url,响应内容等
            //rq.request.url 接口 的url
            //rq.getContent 接口返回的内容
            e.getContent(function (t, encoding) {
                if (JSON.stringify(t).indexOf(content) != -1)//如果能找到，就获取内容
                {
                    fun.b01("++++++aaaa+++++" + JSON.stringify(t))
                    //next(t)
                }
            })
        },
    }

}
fun.a01();
                

//setNetwork:function(request)
//{
//	this.obj.url=request.url;
//	this.obj.content="";
//	request.next()
//},
//getNetwork:function(request)
//{
//	this.Time(this.getNetwork02,100,this,"1",request);//延时
//},
//getNetwork02:function(request)
//{
//	var content=this.obj.content
//	if(content!="")
//	{
//		this.obj.url="";
//		this.obj.content="";
//		request.next(content)
//	}
//	else
//	{this.Time(this.getNetwork02,100,this,"1",request);}
//},
//Time:function(A,B,C,D,E)//延时执行
//{
//	var This=this;
//	if(This.T[D])
//	{
//		window.clearTimeout(This.T[D]);
//		delete This.T[D];
//	};
//	This.T[D]=window.setTimeout(function()
//	{
//		if(E){A.apply(C,[E]);}else{A.apply(C);}
//	},B);
//}