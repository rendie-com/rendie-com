'use strict';
let webHTML=""
function DrawRectangle()
{
	DrawRectangleY()
	Painting()
}
function DrawRectangleY()
{
	let html='<r:pictoweblist where=" where @.type=\'X\' and @.sort=1" size=1>[pictoweblist:color]</r:pictoweblist}'//Y轴上的线
	html=$.ajax({type:"POST",url:"/Default.aspx/exe.html?"+Math.random(),data:{data:escape(html)},async:false}).responseText;
	let arr=html.split(","),start,curX=0,height=0,len=arr.length,color
	start=arr[0];
	for(let i=1;i<len;i++)//Y轴上找
	{
		if(start!=arr[i])//找到一个不同的颜色
		{
			height=i-curX//已知高度
			color=start.substr(2)
			if(height>150)//高度大于150，就认为里面可能还有矩形//opacity:0.5;
			{
				//'+DrawRectangle2X(height,i-height-1,start)+'
			 webHTML+='<div style="background:#'+color+';height:'+(height)+'px;width:100%;">'+DrawRectangleX(height,i)+'</div><div style="clear:both"></div>'	
			}
			else
			{
				webHTML+='<div style="background:#'+color+';height:'+(height)+'px;width:100%;">'+DrawRectangleX(height,i)+'</div><div style="clear:both"></div>'			
			}
			curX=i
			start=arr[i]
		}			
	}
}
function DrawRectangle2X(height,x,color)//已知一条Y轴直线，且3个点的颜色相同
{
	//x取三条水平线，来确定新起点，绘矩形
	let html='<r:pictoweblist where=" where @.type=\'Y\' and @.sort='+(x+50)+'" size=1>[pictoweblist:color]</r:pictoweblist}[分隔符]<r:pictoweblist where=" where @.type=\'Y\' and @.sort='+(x+100)+'" size=1>[pictoweblist:color]</r:pictoweblist}[分隔符]<r:pictoweblist where=" where @.type=\'Y\' and @.sort='+(x+150)+'" size=1>[pictoweblist:color]</r:pictoweblist}'//X轴线
	html=$.ajax({type:"POST",url:"/Default.aspx/exe.html?"+Math.random(),data:{data:escape(html)},async:false}).responseText;
	let ret,retcolor,arrI=[],arr=html.split("[分隔符]")
	for(let i=0;i<arr.length;i++){arrI[i]=arr[i].split(",")}
	for(let i=0;i<arrI[0].length;i++)
	{
		if(arrI[0][i]==arrI[1][i]&&arrI[1][i]==arrI[2][i]&&arrI[0][i]!=color)
		{
			ret=i//新起点
			retcolor=arrI[0][i]//新起点的颜色
			break;
		}
	}
	html="",arr=[]
	if(ret)
	{
		html='<r:pictoweblist where=" where @.type=\'X\' and @.sort='+(ret+1)+'" size=1>[pictoweblist:color]</r:pictoweblist}'//Y轴上的线
		html=$.ajax({type:"POST",url:"/Default.aspx/exe.html?"+Math.random(),data:{data:escape(html)},async:false}).responseText;
		arr=html.split(",")
		html=""
		let break2=0,curX=x,H=0
		for(let i=x;i<height+x;i++)//新起点的Y轴
		{
			if(retcolor!=arr[i])
			{
				H=i-curX
				html+='<div style="height:'+H+'px;">'+DrawRectangleX(H,curX+1)+'</div><div style="clear:both"></div>'
				retcolor=arr[i]
				curX=i
				break2++
				//if(break2==10)	break;
			}
		}
	}
	
	return html
}

function DrawRectangleX(height,pre_sort)//已知一条水平线和第一个像素颜色和一个高度，绘一行矩形。
{
	let html='<r:pictoweblist where=" where @.type=\'Y\' and @.sort='+pre_sort+'" size=1>[pictoweblist:color]</r:pictoweblist}'//X轴线
	html=$.ajax({type:"POST",url:"/Default.aspx/exe.html?"+Math.random(),data:{data:escape(html)},async:false}).responseText;
	let arr=html.split(","),start,curX=0,width=0,len=arr.length
	html=""
	start=arr[0];
	for(let i=1;i<len;i++)//X轴上找
	{
		if(start!=arr[i])//找到一个不同的颜色
		{
			width=i-curX
			start=start.substr(2)
			html+='<div style="background:#'+start+';height:100%;width:'+width+'px;float:left;"></div>'
			start=arr[i]
			curX=i
		}			
	}
	return html
}
function Painting()
{
	let txt='<!DOCTYPE HTML><html><head><style>body{margin:0;padding:0}</style><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>无标题文档</title></head><body style="background:url('+$("#src").val()+');">'+webHTML+'</body></html>'
	let html='<r: tag="file" file="/1.html"}'+txt+'</r:>'
	$.ajax({type:"post",url:"/Default.aspx/exe.html?"+Math.random(),data:{data:escape(html)},success:function(result){
		$("#Painting").html('<a href="/1.html" target="_blank">查看结果</a>')
	}});	
		
	
}
function GetImg()
{
	let img=$("#src").val()
	GetImgPage(img,1,"X")
}
function GetImgPage(img,page,type)
{
	$("#resultImg").html("<img src='"+path+"admin/img/loading.gif' align='absmiddle'/>")
	let html="{Fun(GetImg("+img+","+page+","+type+"))}"
	$.ajax({type:"post",url:"/Default.aspx/exe.html?"+Math.random(),data:{data:escape(html)},success:function(result){
		if(result.indexOf("错误")>0)
		{
			$("#resultImg").html("("+type+":"+result+")")
		}
		else
		{
			let arr=result.split("/")
			if(parseInt(arr[0])>parseInt(arr[1])&&type=="X")
			{
				setTimeout("GetImgPage('"+img+"',1,'Y');",1000)
			}
			else if(parseInt(arr[0])>parseInt(arr[1])&&type=="Y")
			{
				$("#resultImg").html("数据库入完成")
				alert("数据库入完成")	
			}
			else
			{
				setTimeout("GetImgPage('"+img+"',"+(page+1)+",'"+type+"');",1000)			
				$("#resultImg").html("("+type+":"+result+")")
			}
		}
	}});	
}
function Screenshot(id)
{
	let html
	$("#img").html("<td><img src='"+path+"admin/img/loading.gif' align='absmiddle'/></td>")
	$("#img").show()
	if(id==1)
	{
		html="{Fun(WebPageBitmap("+$("#url").val()+",/"+cacheFolder+"/"+id+".jpg))}"
	}
	else
	{
		html="{Fun(GetBitmap2("+$("#url").val()+",/"+cacheFolder+"/"+id+".jpg))}"
	}
	$.ajax({type:"post",url:"/exe.html?"+Math.random(),data:{data:escape(html)},success:function(result){
		$("#img").html("<td><img src='/"+cacheFolder+"/"+id+".jpg' align='absmiddle'/></td>")
		//document.write(result)
	}});
}
