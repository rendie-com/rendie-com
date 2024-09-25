'use strict';
var fun=
{
  obj:{A1:47644,A2:0},data:{},
  a01:function()
  {
    //let url=o.cacheFolder+"ImportDate.txt?"+Math.random()
    //let This=this;$.ajax(url,{type:'get',success:function(t){This.a02(t);}});
    let html='\
		<header class="panel-heading">第三步 正在导入...</header>\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w100">进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在获取内容...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
  {
    let html='[{"count":<@count/>}\
    <r:product page="2" size="1">,\
    {\
      "proid":"<:proid/>",\
      "HistoryPrice":"<:HistoryPrice tag=js/>",\
      "fromUrl":"<:fromUrl/>",\
      "videoUrl":"<:videoUrl/>",\
      "aeopAeProductPropertys":"<:aeopAeProductPropertys tag=js/>",\
      "aeopAeProductSKUs":"<:aeopAeProductSKUs tag=js/>",\
      "pic":"<:pic/>",\
      "des":"<:des tag=js/>",\
      "note":"<:note tag=js/>"\
    }\
    </r:product>]'
      Tool.ajax.a01(html, this.obj.A1,this.a03,this)
  },
  a03:function(t)
  {
    eval("let oo="+t)
    let arr1=[],arr2=[],html="";
    if(this.obj.A2==0){this.obj.A2=oo[0].recordcount;}
    oo.shift();
    let proid=parseInt(oo[0].proid.substr(1));
    for(let k in oo[0])
    {
      arr1.push(k);
      if(k=="err"&&oo[0][k].length>255){oo[0][k]=oo[0][k].substr(0,255);}
      oo[0][k]="'"+(oo[0][k]).replace(/'/g, "''")+"'";
      arr2.push(oo[0][k]);
    }
    ///////////////////////////////////////
    let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
    $("#A1").html(p1+"%").css("width",p1+"%");
    $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');  
    $("#state").html("正在采集。。。");
    //////////////////////////////////////
    let desI=Math.ceil(proid/100000)
    if(desI>9){desI=1;}
    html='insert into @.smtProDes'+desI+'(:'+arr1.join(',:')+')values('+arr2.join(",")+')'
    /////////////////////////////////////////
    /*
    for(let i=1;i<=99;i++)
    {
       arr1.push("Drop table :smtProDes"+i)  
    }
    html=arr1.join("<1/>")
    */
    /////////////////////////////////
    Tool.ajax.a01('[<r: db="mysql.admin">'+html+'</r:>]',1,this.a04, this)
  },
  a04:function(oo)
  {
    if(oo[0]==null)
    {
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');  
      this.obj.A1++
      if(this.obj.A1<=this.obj.A2)
      {
        this.a02();
      }
      else
      {
        $("#state").html("全部完成。");
      }
    }
    else
    {alert("出错"+oo[0]);}
  }
}
fun.a01();
/*
  a02:function(t)
  {
		eval("let obj2="+t);this.date=obj2
		this.page.A1=1;	
		let html=''
		Tool.ajax.a01(html,1,this.a03,this)
  },
  a03:function(txt)
  {
		eval("let obj2=["+txt.substr(1)+"]");
		this.date.columns=obj2;				
		this.a06();
  },
  a04:function(txt)
  {
		if(txt.indexOf(',["')!=-1)
		{
			eval("let obj2="+txt);this.page.A2=obj2[0]
			let p4=Math.ceil(this.page.A1/this.page.A2*100)
			$(".table2").html('\
			<div class="thead">第三步 正在导入...</div>\
			<ul class="Tul tr"><li class="label w100">当页进度：</li><li id="A1" class="w500"><div class="progress"><span style="width:'+p4+'%;"><span>'+p4+'%</span></span></div></li><li id="A2">'+this.page.A1+'/'+this.page.A2+'</li></ul>')
			obj2.shift();
			let sql=[]
			for(let i=0;i<obj2.length;i++)
			{
				let arrA=[],arrB=[],proid="";
				for(let j=0;j<this.date.columns.length;j++)
				{
					if(this.date.columns[j]!="rd_id")
					{
						arrA[arrA.length]=this.date.columns[j];arrB[arrB.length]=obj2[i][j].replace(/\'/g,"''");
						if(this.date.columns[j]=="rd_proid"){proid=obj2[i][j];}
					}
				}
			  sql[i]="<r: tag=\"sql\">insert into "+this.date.nameB+"("+arrA.join(",")+")values('"+arrB.join("','")+"')</r:>";
			}
			Tool.ajax.a01(sql.join(""),1,this.a05,this);
		}
		else
		{
			alert(txt)
			//this.date.A1=this.page.A1;
			//Tool.ajax.a01('<r: tag="file" file="'+this.cacheFolder+'ImportDate.txt">'+JSON.stringify(this.date)+'</r:>',1,this.a05,this);
		}
  },
  a05:function(txt)
  {
		if(txt=="")
		{
			$("#A2").html(this.page.A1+'/'+this.page.A2+" (完)");
			this.page.A1++;
			if(this.page.A1<=this.page.A2)
			{
				this.a06();			  
			}else{alert("全部完");}
		}
		else
		{
			document.write(txt)
    }
  },
  a06:function()
  {
		let html=""
		for(let i=0;i<this.date.columns.length;i++){html+=(i==0?"":",")+'"['+this.date.nameA+':'+this.date.columns[i]+' tag="js"]"'}
		html='<.connect('+this.date.conn+')/>[<@page/><r:'+this.date.nameA+' size="10" where=" order by @.id asc" pre="" page="2">,['+html+']</r:'+this.date.nameA+'>]'
		Tool.ajax.a01(html,this.page.A1,this.a04,this)
  }
*/