function aliexpressType(id){
 let str="<if \"Fun(Db(select top 1 :id from @.type where @.fromid='"+id+"' and @.from='aliexpress' and @.isleaf=0,count))\"!=\"\"><:Db(with area as(select @.fromID from @.type where @.fromID='"+id+"' and @.from='aliexpress' union all select a.@.fromID from @.type a join area b on a.@.upid=b.@.fromid and a.@.from='aliexpress')select count(1) as total from @.product c join @.OrderItem d on c.rd_id=d.rd_pid and exists(select c.rd_type from area e where c.rd_type=e.rd_fromid),count)/><else/><:Db(select count(1) as total from @.product c join @.OrderItem d on c.rd_id=d.rd_pid and @.type="+id+",count)/></if>"
 return str
}
