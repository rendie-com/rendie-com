'use strict';
var fun={
	obj:
	{
		A1:1,A2:0,B1:1,B2:0,
		table:obj.arr[5],//表名
		iswww:false//是否从www网址上获取信息
	},
  a01:function()
	{
    let html=Tool.header("正在从IP中获取【国家】【归属地】信息。。。")+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w200">（第一步）导入到【IP库】：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">（第二步）获取IP信息：</td>'+Tool.htmlProgress('B')+'</tr>\
        <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
  {
		gg.isRD(this.a03,this);
  },
  a03:function()//先将IP入的IP库中。
  {
		let table=this.obj.table
		$("#state").html("正在获取IP...");
	  let str='\
    [\
      <@page/>\
      <r:'+table+' db="mysql.admin" where=" where @.ct is null order by @.id asc" page=2 size=20>\
        ,"<:ip/>"\
      </r:'+table+'>\
    ]';		
	  Tool.ajax.a01(str, this.obj.A1,this.a04,this);
	},
	a04:function(oo)
  {
		if(oo[0]==0)
		{$("#state").html("没有可获取的地址。");this.a08();}
		else
		{
			this.obj.A2=oo[0];
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（页）');
			///////////////////////////////////////////////
			oo.shift();
			oo=Tool.unique(oo);
			this.a05(oo)
		}
	},
	a05:function(arr)
  {
		$("#state").html("正在导入到IP库。。。");
		let str="",select1="";
		for(let i=0;i<arr.length;i++)
		{
			arr[i] = arr[i].replace(/>/g, "&gt;");//未知IP会进来，可能是黑客。
			select1="select count(1) from @.ip where @.ip='"+arr[i]+"'"
			str+='\
			<if Fun(Db(mysql.admin,'+select1+',count))==0>\
				<r: db="mysql.admin">insert into @.ip(@.ip,@.addtime)values(\''+arr[i]+'\','+Tool.gettime("")+')</r:>\
			<else/>\
				<r:ip db="mysql.admin" where=" where @.ip=\''+arr[i]+'\'" size=1>,\
					{\
						"asn":<:asn tag=json/>,\
						"ct":"<:ct/>",\
						"ip":"<:ip/>"\
					}\
				</r:ip>\
			</if>';
		}
		Tool.ajax.a01('[0'+str+']',1,this.a06,this);
	},
	a06:function(oo)
  {
	  if(oo.length==1)
		{this.a07();}
		else if(oo[1].asn!="")
		{
			$("#state").html("【IP库】已存在，修复就好了。。。");
			Tool.ajax.a01(this.b01(oo),1,this.a14,this);
		}
		else
		{this.a07();}
	},
	a07:function()
  {
		$("#state").html("导入成功。。。");
		$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
		this.obj.A1++;
		if(this.obj.A1<=this.obj.A2)
		{
			this.a03();
		}
		else
		{
			$("#A1").html("0%").css("width","0%");
			$("#A2").html("");				
			$("#state").html("导入完成。");
			this.a08()
		}
	
	},
	a08:function()
  {
		$("#state").html("正在获取【IP库】中的IP...");
	  let str='\
		[\
		  <@page/>\
		  <r:ip db="mysql.admin" where=" where @.ct is null order by @.id asc" page=2 size=1>\
			,"<:ip/>"\
		  </r:ip>\
		]';
		Tool.ajax.a01(str,1,this.a09,this);
	},
	a09:function(oo)
  {
		if(oo[0]==0)
		{$("#state").html("在【ip库】中，没有可获取的地址。");}
		else
		{
			if(this.obj.B2==0){this.obj.B2=oo[0];}
			let p1=Math.ceil(this.obj.B1/this.obj.B2*100)
			$("#B1").html(p1+"%").css("width",p1+"%");
			$("#B2").html(this.obj.B1+'/'+this.obj.B2+'（页）');
			///////////////////////////////////////////////
			this.a10(oo[1])
		}
	},
	a10:function(ip)
  {
		if(ip=="::1")
		{
			this.a12("保留地址","",ip,"保留地址","","","","")
    }
    else if (ip.substr(0, 7) == "::ffff:") {
      
      
      this.a10A(ip);
    }
    else if (ip.indexOf(":") != -1) {
			this.d01(ip);//这个是IPv6;
		}
		else		
		{
      this.a10A(ip);
		}
  },
	a10A: function (ip) {
		if (ip.indexOf("?") != -1 || ip.indexOf("=") != -1 || ip.indexOf("$") != -1) {
			this.a12("未知IP", '', ip, '未知', '', '', '', '');
		}
		else
		{
			$("#state").html("正在获取地址信息。。。");    
			let url = "https://" + (this.obj.iswww ? 'www.' : '') + "ip138.com/iplookup.asp?ip=" + (ip.substr(0, 7) == "::ffff:" ? ip.substr(7) : ip) + "&action=2"
			$("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
			this.obj.ip = ip;
			gg.tabs_remove_create_indexOf(2, url, '请输入iP地址或者域名" value="<1/><title>502 Bad Gateway</title><1/><title>局域网ip', true, this.a11, this, null);
		}
  },
  a11: function (t) {
		if(t.indexOf("<title>502 Bad Gateway</title>")!=-1)
		{
			if(this.obj.iswww)
			{alert("要换公网IP了。");}
			else
			{
				this.obj.iswww=true;
				this.a08();
			}
		}
		else if(t.indexOf("<title>局域网ip")!=-1)
		{
			this.a12("本地局域网IP",'',this.obj.ip,'保留地址','','','','');
		}
		else
		{
			let asn=Tool.StrSlice(t,'"ASN归属地":"','"');
			if(asn)
			{
				asn=Tool.Trim(asn);
				let isp=Tool.StrSplits(t,'"yunyin":"','"').pop();
				let ip=Tool.StrSlice(t,'请输入iP地址或者域名" value="','"');
				let ct=Tool.StrSplits(t,'"ct":"','"').pop();
				let prov=Tool.StrSplits(t,'"prov":"','"').pop();
				let city=Tool.StrSplits(t,'"city":"','"').pop();
				let area=Tool.StrSplits(t,'"area":"','"').pop();
        let idc = Tool.StrSplits(t, '"idc":"', '"').pop();

        if (ip == (this.obj.ip.substr(0, 7) == "::ffff:" ? this.obj.ip.substr(7) : this.obj.ip))
        { this.a12(asn, isp, this.obj.ip,ct,prov,city,area,idc);}
				else
				{
					alert("ip不一样")
				}
			}
			else
			{Tool.at("出错："+t);}
		}
	},
	a12:function(asn,isp,ip,ct,prov,city,area,idc)
  {
		if(asn.length>30){asn=asn.substr(0,27)+"..."}
		asn=asn?"'"+asn+"'":"null"
		let str="[<r: db=\"mysql.admin\">update @.ip set @.asn="+asn+",@.isp='"+isp+"',@.ct='"+ct+"',@.prov='"+prov+"',@.isp='"+isp+"',@.city='"+city+"',@.area='"+area+"',@.idc='"+idc+"' where @.ip='"+ip+"'<1/>update @."+this.obj.table+" set @.asn="+asn+",@.ct='"+ct+"' where @.ip='"+ip+"'</r:>]";
		Tool.ajax.a01(str,1,this.a13,this);
	},
	a13:function(oo)
  {
	  if(oo[0]==null)
		{
			$("#state").html("地址更新成功。。。");
      $("#B2").html(this.obj.B1+'/'+this.obj.B2+'（完）');
			this.obj.B1++;
			if(this.obj.B1<=this.obj.B2)
			{
				gg.cookiesRemove("https://ip138.com/","ASPSESSIONIDCQATTBRT",this.a15,this)
			}
			else
			{
				$("#state").html("全部完成。");
			}
		}
		else
		{alert("出错")}
	},
	a14:function(t)
  {
		if(t=="")
		{
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
			$("#state").html("【修复好了】。。。");
			this.a03();
		}else
    { Tool.at("出错01" + t); }
	},
	a15:function()
  {
		gg.cookiesRemove("https://ip138.com/","FPTOKEN",this.a08,this)
	},
	b01:function(oo)
  {
		let arr=[],table=this.obj.table
		for(let i=1;i<oo.length;i++)
		{
			arr.push("update @."+table+" set @.asn="+Tool.rpsql(oo[i].asn)+",@.ct="+Tool.rpsql(oo[i].ct)+" where @.ip='"+oo[i].ip+"'")
		}
		return '<r: db="mysql.admin">'+arr.join("<1/>")+'</r:>';
	},
	d01: function (ip) {
    let url = "https://rest.ipw.cn/api/aw/v1/ipv6?ip=" + ip +"&warning=please-direct-use-please-use-ipplus360.com"
    $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
		//gg.getFetch(url,"json",this.d02,this)
		this.a12('ipv6不处理了', '', ip, 'ipv6不处理了', '', '', '', '')
	},
  d02: function (t) {
		if (t.code == "Success") {
			let asn = t.data.country + " " + t.data.prov + " " + t.data.city
			this.a12(asn, t.data.isp, t.ip, t.data.country, t.data.prov, t.data.city, '', '')
    }
		else if (t.code == 429)
		{
			
		}
		else
		{
      $("#state").html("出错001：")
      Tool.pre(t);
    }
	}	
}
fun.a01()
