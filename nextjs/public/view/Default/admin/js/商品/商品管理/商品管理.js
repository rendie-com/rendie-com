'use strict';
//let obj={arr1:"<.arr(1)/>",type1:"<:attr(type1)/>",searchlink:"<.arr(1)/>/<.arr(2)/>/<.arr(3)/>/1/",path:"<.Path/>",arr5:"{r:arr(5)/>";

function ProductRecycle(id){
  let str='<ren'+'die:area tag="sql">update @.product set @.hide=1 where @.id='+id+'</ren'+'die:area>'
  str=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(str)},async:false}).responseText;
  window.location.reload();
}

$(function(){
	$('#dhgate_dhitemadd').click(function(){
		let ids=[],updateAddUser
		$("input[type='checkbox'][name='pre_id']:checked").each(function(){ids[ids.length]=$(this).val();});
		updateAddUser=$("#updateAddUser").val()
		location.href='<.arr(1)/>/list/{rr:attr(type3)/>.html?ids='+ids.join("|")+"&userid="+updateAddUser
	})
	$('#selectBtn').click(function(){productSearch();})
	$('#UpdatePIC').click(function(){
		searchword=$("#PICborber").val()
		searchword=searchword.replace("/",'*')
		location.href="ajax/admin_content.aspx?UpdateProductPIC/"+searchword
	})
	/*
	$('[Modified]').live('click',function(){
		if ($(this).attr("Class")=="Modified ModifiedB")
		{
			$(this).attr("Class","Modified ModifiedA");
			let id=$(this).attr("Modified")
			$(".Mo"+id).parent().hide()
		}
		else
		{
			$(this).attr("Class","Modified ModifiedB")
			let id=$(this).attr("Modified")
			if($(".Mo"+id).css("padding-left"))
			{
					$(".Mo"+id).parent().show() 
			}
			else
			{
				let html=$.ajax({url:'?Modified/2/0/'+id+'/product.html',async:false}).responseText;
				$(this).parent().parent().after(html)
				let pl=20+parseInt($(this).parent().css("padding-left"))
				$(".Mo"+id).css("padding-left",pl+"px")
			}
		}
	});
	*/
});
function AliproductType(){
	producttype('#AliproductType','<.arr(1)/>/<.arr(2)/>/{r:arr(3)/>/1/0/{$ID/>.html','');$('#producttype').show();
}
function AddProduct()
{
  let str='<r: tag="sql">insert into @.product(@.name,:des)values(\'你好中国\',\'这里是剧情简介\')</r:>'
	$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:encodeURIComponent(str)},success:function(t){
	  alert(t)
  }});
}