function productwhere(){
 let str='where 1=1 \
 	<if "Fun(arr(6))"!=""&&"Fun(arr(6))"!="_20">\
		<if "Fun(Db(select top 1 :id from @.type where @.fromid=\'<.arr(6)/>\' and @.from=\'aliexpress\' and @.isleaf=0,count))"!="">\
			and :type in(\
			select @.fromid from @.type where @.upid=\'<.arr(6)/>\' and @.from=\'aliexpress\' and @.isleaf=1\
			union all \
			select @.fromid from @.type where @.upid in\
			(\
				select @.fromid from @.type where @.upid=\'<.arr(6)/>\' and @.from=\'aliexpress\'  and @.isleaf=0\
			) and @.from=\'aliexpress\'  and @.isleaf=1\
			union all \
			select @.fromid from @.type where @.upid in \
			( \
				select @.fromid from @.type where @.upid in \
				(\
					select @.fromid from @.type where @.upid=\'<.arr(6)/>\' and @.from=\'aliexpress\' and @.isleaf=0\
				) and @.from=\'aliexpress\'  and @.isleaf=0\
			) and @.from=\'aliexpress\' and @.isleaf=1\
			)\
		<else/> and @.type=<.arr(6)/></if>\
	</if> <.unarr(5)/> <.unarr(8)/> {r:unarr(9)/> {r:unarr(10)/> order by @.id desc'
	//type字段说明
	//第一层if语句:将传过来的分类ID，先判断是否有子类目。
	//第二层if语句:子类目里是否还没子类目
 return str
}
function productpic(name)
{
	return name.split(";")[0]
}
function aeopAeProductSKUs(des,num)
{
	let minPrice,maxPrice
	try{ 
		eval("let obj="+des)
		if(obj[0])
		{
			for(let i=0;i<obj.length;i++)
			{
				if(i==0)
				{
					minPrice=obj[0].skuPrice
					maxPrice=obj[0].skuPrice
				}
				else
				{
					if(obj[i].skuPrice<minPrice)minPrice=obj[i].skuPrice
					if(obj[i].skuPrice>maxPrice)maxPrice=obj[i].skuPrice
				}
			}
			if(minPrice==maxPrice)
			{return (minPrice*num).toFixed(2)}
			else
			{return (minPrice*num).toFixed(2)+"-"+(maxPrice*num).toFixed(2)}
		}
		else
		{
			return ""
		}
	 }catch(e){return ""}
}