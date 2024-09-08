//  b01:function()
//  {
//		if(obj.arr[5]=="2")//问题数据【替换】
//		{
//			return '{<r:proupdhgate size=1 page=2 where=" a Inner Join @.pro b on a.@.proid=b.@.proid where a.@.upUserID='+this.obj.fromid+' and b.@.hide&gt;0">\
//			<r:freight size="1" where=" where @.freid=\''+this.obj.upmode.shop[0]+'\'">\
//			<r:pro size=1 where=" where @.shopid=[freight:shopid] and @.hide=0 and not EXISTS(select 0 from @.proupdhgate where @.proupdh.@.proid=@.pro.@.proid and @.pro.:shopid=[freight:shopid] and @.pro.:hide=0)">'+this.b02("pro:")+'</r:pro>\
//			</r:freight>\
//			"ratio":<:a.@.ratio/>,\
//			"fromid":<:a.@.fromid/>,\
//			"count":<@count/>\
//			</r:proupdhgate>}'
//		}
//		else if(obj.arr[5]=="4")//更新数据【更新】
//		{
//			// and a.@.examine=2 and a.@.fromid=542337345
//			return '\
//      {\
//        <r:proupdhgate db="sqlite.dhgate" size=1 page=2 where=" a Inner Join @.pro b on a.@.proid=b.@.proid where a.@.upUserID='+this.obj.fromid+' and b.@.hide=0 and a.@.examine=2">\
//			  '+this.b02("proupdh:b.")+'\
//			   "ratio":<:a.@.ratio/>,\
//			   "fromid":<:a.@.fromid/>,\
//			</r:proupdhgate>\
//			"count":<@count/>\
//      }'
//		}
// 		else if(obj.arr[5]=="6")//消失数据【替换】
//		{
//			return '{<r:proupdhgate size=1 page=2 where=" where @.upUserID='+this.obj.fromid+' and not EXISTS(select 0 from @.pro where @.proupdh.@.proid=@.pro.@.proid and @.proupdh.@.upuserid='+this.obj.fromid+')">\
//			<r:freight size="1" where=" where @.freid=\''+this.obj.upmode.shop[0]+'\'">\
//			<r:pro size=1 where=" where @.shopid=[freight:shopid] and @.hide=0 and not EXISTS(select 0 from @.proupdhgate where @.proupdh.@.proid=@.pro.@.proid and @.pro.:shopid=[freight:shopid] and @.pro.:hide=0)">'+this.b02("pro:")+'</r:product>\
//			</r:freight>\
//			"fromid":<:fromid/>,\
//			"ratio":<:a.@.ratio/>,\
//			"count":<@count/>\
//			</r:proupdhgate>}'
//		}
//		else if(obj.arr[5]=="8")//三个月未更新数据【更新】
//		{
//			//and a.@.status=1
//			return '{<r:proupdhgate size=1 page=2 where=" a Inner Join @.pro b on a.@.proid=b.@.proid where a.@.upUserID='+this.obj.fromid+' and b.@.hide=0 and DateDiff(DAY,a.:time,GETDATE())&gt;300">\
//      '+this.b02("proupdh:b.")+'\
//      "fromid":<:a.@.fromid/>,\
//      "ratio":<:a.@.ratio/>,\
//      </r:proupdhgate>\
//      "count":<@count/>}'
//		}
//		else{alert("未知01")}
//  },
