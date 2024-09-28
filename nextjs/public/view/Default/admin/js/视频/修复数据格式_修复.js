'use strict';
let t
$(function(){
	let sql=[],SKUs,id,price
	$("td[aeopAeProductSKUs]").each(function()
	{
		SKUs=$(this).attr("aeopAeProductSKUs")
		id=$(this).attr("val")
		if(SKUs)
		{
			price=aeopAeProductSKUs(SKUs)
			if(price==0)
			{sql[sql.length]="update @.product set @.hide=2,:err='商品价格格式错误' where @.id="+id;}
			else
			{sql[sql.length]="update @.product set @.price="+price+" where @.id="+id;}			
		}
		else
		{sql[sql.length]="update @.product set @.hide=2,:err='无商品价格' where @.id="+id;}
		$(this).html(sql[sql.length-1])
	})
	$.ajax({type:"post",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape("<r: tag=\"sql\">"+sql.join("<1/>")+"</r:>操作成功,")},success:function(result){
		let pobj=$(".pages")
		obj.arr4=obj.arr4==""?1:parseInt(obj.arr4)
		if(obj.arr4<parseInt(pobj.attr("pagecount")))
		{
			pobj.parent().parent().append('<tr><td colspan="2">'+result+'暂停0.5秒后继续...</td></tr>');
			t=setTimeout("nextURL();",500);
		}
		else
		{
			pobj.parent().parent().append('<tr><td colspan="2">'+result+'全部完成。</td></tr>');
		}
	}});
})
function nextURL(){location.href=obj.nextlink+(obj.arr4+1);}
function aeopAeProductSKUs(des)
{
	let Price=0,num=0
	try{ 
		eval("let obj2="+des)
		if(obj2[0])
		{
			for(let i=0;i<obj2.length;i++)
			{
				Price+=parseFloat(obj2[0].skuPrice)
				num++
			}
		}else{return 0}
	 }catch(e){return 0}
	return (Price/num).toFixed(2)
}