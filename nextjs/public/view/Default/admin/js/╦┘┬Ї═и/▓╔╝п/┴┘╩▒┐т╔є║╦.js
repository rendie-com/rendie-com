'use strict';
//let obj={searchlink:"<.arr(1)/>/list/<.arr(3)/>/1/%20/%20/%20/",list:"list/<.arr(2)/>/1/<.arr2(4)/>/<.arr2(5)/>/<.arr2(6)/>/",arr4:"<.unarr(4)/>",arr7:"{r:unarr(7)/>";

var fun=
{
	arr4:obj.arr4,arr7:obj.arr7,
	list:obj.list,
	searchlink:obj.searchlink,
	a01:function(id)//禁
	{
		let err="在审核商品时，对图该店的商品不满意（如：水印，有禁卖商品等）"
		let str='<r:tempproduct where=" where @.id='+id+'"><:shopname db="sqlite.aliexpress"/><r: db="sqlite.aliexpress">insert into @.Restriction(rd_from,rd_mode,rd_name,rd_des,:time)values(\'aliexpress\',2,\'<:shopname db="sqlite.aliexpress"/>\',\''+err+'\',getdate())<1/>update @.tempproduct set @.examine=3,:hide=6,:err=\''+err+'\'  where @.from=\'aliexpress\' and @.shopname=\'<:shopname db="sqlite.aliexpress"/>\'</r:></r:tempproduct>'
		Tool.ajax.a01(html,1,this.a02,this);
	},
	a02:function(t){if(t==""){window.location.reload();}else{alert("出错001："+t);}},
	a03:function(id)//过
	{
		let str='<r:tempproduct where=" where @.id='+id+'"><r: db="sqlite.aliexpress">update @.tempproduct set @.examine=1 where @.from=\'aliexpress\' and @.hide=0 and @.shopname=\'<:shopname db="sqlite.aliexpress"/>\'</r:></r:tempproduct>'
		Tool.ajax.a01(html,1,this.a02,this);
  },
	ProEdit01:function(val)
	{
		let arr=[];
		$("input[type='hidden'][id$='___Config']").each(function()
		{
			let id=$(this).val(),examine,des,oEditor,picArr=[],pic,hide=""
			$("[name='pic"+id+"'] img").each(function(){picArr[picArr.length]=$(this).attr("src");});
			pic=picArr.join(";")
			examine=$("[name='examine"+id+"']:checked").val()
			if(examine=="3"){hide=",:hide=5,:err='手动审核不通过'";}
			oEditor = FCKeditorAPI.GetInstance("des"+id);
			des=":des='"+(oEditor.GetXHTML(true)).replace(/'/ig,"''")+"'"
			if(val==1&&examine=="0"){examine=1;}
			arr[arr.length]='update @.tempproduct set @.examine='+examine+','+des+hide+',:pic=\''+pic+'\' where @.from=\'aliexpress\' and @.id='+id
		});
		let html='<r: db="sqlite.aliexpress">'+arr.join("<1/>")+'</r:>';
		Tool.ajax.a01(html,1,this.ProEdit02,this)
	},
	ProEdit02:function(txt){if(txt==""){window.location.reload();}else{alert("错误01："+txt);}},
	ProEdit03:function()
	{
		let arr=[];
		$("input[type='hidden'][id$='___Config']").each(function()
		{
			let id=$(this).val()
		  arr[arr.length]='update @.dhUpPro set @.examine=3 where @.from=\'dhgate\' and @.id='+id
			arr[arr.length]='update @.smtPro set @.examine=3,:hide=3,:err=\'手动审核不通过\' where @.id='+id
		});
		let html='<r: db="sqlite.aliexpress">'+arr.join("<1/>")+'</r:>';
		Tool.ajax.a01(html,"1",this.ProEdit02,this)
	},
	b01:function()
	{
		let val=$("#ddes").val().replace(/'/ig,"''")
		let str='<r: db="sqlite.aliexpress">update @.tempproduct set @.examine=3,rd_hide=3 where @.from=\'aliexpress\' and @.hide=0 and @.des like \'%'+val+'%\'</r:>'
		Tool.ajax.a01(str,"1",this.b02,this)
	},
	b02:function(t)
	{
		if(t=="")
		{
			
		 window.location.reload();
		}
		else
		{alert("出错01："+t)}
	}
}