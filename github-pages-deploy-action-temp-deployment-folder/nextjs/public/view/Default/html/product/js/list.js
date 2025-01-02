"use strict";
var fun=
{
	arr:Tool.arr(),
	obj:{keys:'',type:[],shipTo:"",price:[],isFreeShipping:false,Sort:1},
  a01:function()
  {
		//this.arr[2]	where语句
		if(!this.arr[3]){this.arr[3]=1;}else{this.arr[3]=parseInt(this.arr[3])}//翻页
		////////////////////////////////////////////////////
		var whereArr=[],oo={}
		eval("oo="+Tool.unescape(this.arr[2]))
		if(oo.type)
		{
			this.obj.type=oo.type;
			for(var i=0;i<4;i++)
			{
				if(oo.type[i]!="")
				{
					whereArr.push("type"+(i==3?'':i+1)+"="+oo.type[i]);break;
				}
			}
		}
		/////////////////////////////////////
		this.a02(whereArr,oo)
	},
  a02:function(whereArr,oo) 
  {
		if(oo.keys)
		{
			this.obj.keys=oo.keys;
			whereArr.push("keywords like '%,"+oo.keys+",%'");
		}
		////////////////////////////////
		if(oo.price)
		{
			this.obj.price=oo.price;
			if(oo.price[0]!=0){whereArr.push("price&gt;"+oo.price[0]);}
			if(oo.price[1]!=30){whereArr.push("price<"+oo.price[1]);}
		}
		//////////////////////////////////////
		var shipTo=Tool.getCookie("shipTo");
		if(shipTo==""){shipTo="US";}
		///////////////////////////////////
		if(oo.isFreeShipping)
		{this.obj.isFreeShipping=true;whereArr.push(Tool.escape("shipTo"+shipTo+"=1"));}
		else
		{whereArr.push(Tool.escape("shipTo"+shipTo+"<2"));}
		this.obj.shipTo=shipTo;
		/////////////////////////////////////////
		var orderBy=""
		switch(oo.Sort)
		{
			case 2:orderBy=" order by @.ReviewsNum desc,@.SaleNum desc";break;
			case 3:orderBy=" order by @.Review desc,@.SaleNum desc";break;
			case 4:orderBy=" order by @.price asc,@.SaleNum desc";break;
			case 5:orderBy=" order by @.price desc,@.SaleNum desc";break;
			default:orderBy=" order by @.SaleNum desc";break;
		}		
		if(oo.Sort){this.obj.Sort=oo.Sort;}
		/////////////////////////////////////////
		var where="";
		if(whereArr.length==0)
		{where="id&gt;0";}
		else
		{where=whereArr.join(" and @.");}
	  Tool.ajax.a01("", "/p/self/ajax_list.html/" + Tool.escape(where + orderBy) + "/" + this.arr[3],this.a03,this);
	},
  a03:function(oo) 
  {
		oo.pro=this.b10(oo.pro,oo.common.type);//把type1,type3,type3的值组成数组
		oo.pro[0].leftArr=this.b06(oo.pro)//左边分类
		if(oo.pro[0].leftArr[1].length==0)
		{this.a04([],oo);}
		else
		{ Tool.ajax.a01("", "/p/self/ajax_list2.html/" + Tool.escape(oo.pro[0].leftArr[1]),this.a04,this,oo);}
	},
  a04:function(t,oo) 
  {
		oo.pro[0].leftArr[1]=t;
		$("body").html(
			Tool.header(oo.common,this.obj.keys,this.obj.type[0])+
			this.b01(oo.pro,oo.common.type)+//位置
			this.b02(oo.pro)+//商品
			Tool.footer()
		);
		Tool.c01();
		this.c01();
  },
  b01:function(pro,commonType)//位置
  {
		var arr1=[[],[]],arr2=[],type=this.obj.type
		if(type[3]!="")
		{
			arr2=this.b07(pro,type[3])
			arr1=this.b18(arr2);
		}
		else
		{
		  if(type[2]!="")
			{
				arr2=this.b09(pro,type[2]);
				arr1=this.b18(arr2);
			}
			else
			{
				if(type[1]!="")
				{
					arr2=this.b15(pro,type[1]);
					arr1=this.b18(arr2);
				}
				else
				{
					if(type[0]!="")
					{
						arr2=this.b16(pro,type[0])
						if(arr2.length==0){arr2=this.b17(commonType,type[0]);}
						arr1=this.b18(arr2);
					}
					else
					{
						arr1=this.b18([]);
					}
				}	
			}
		}
		///////////////////////////
		var keys=this.obj.keys
		if(keys)
		{
			arr1[0].push(keys);
			arr1[1].push('<li onclick="fun.c05()"><div class="searchresult-selected-item"><b>'+keys+'</b><i class="icon-x"></i></div></li>');
		}
		$("title").html(arr1[0].join(" - ")+' | rendie.com')
		return '\
		<!--breadcrumbs area start-->\
    <div class="breadcrumbs_area">\
			<div class="container">   \
				<div class="row">\
					<div class="col-12">\
						<div class="breadcrumb_content pl-3">\
							<ul>'+arr1[1].join("")+'</ul>\
						</div>\
					</div>\
				</div>\
			</div>\
    </div>\
    <!--breadcrumbs area end-->'
	},
  b02:function(pro) 
  {
		var str=''
		if(pro[0].count>pro[0].size)	
		{
			str='\
			<div class="shop_toolbar t_bottom">\
				<div class="pagination">'+Tool.page(pro[0].count,pro[0].size,3)+'</div>\
			</div>'
		}
		return '\
		<!--shop  area start-->\
    <div class="shop_area shop_reverse">\
        <div class="container">\
            <div class="row">\
                <div class="col-lg-3 col-md-12">\
                   <!--sidebar widget start-->\
                    <aside class="sidebar_widget mb-3">\
											<div class="widget_inner">\
												<div class="widget_list widget_filter">\
													<h3>Filter by price</h3>\
													<form> \
														<div id="slider-range"></div>   \
														<button type="button" onclick="fun.c06()">Filter</button>\
														<input type="text" id="amount"/>\
													</form> \
												</div>\
												'+this.b05(pro)+this.b04(pro)+'\
											</div>\
                    </aside>\
                    <!--sidebar widget end-->\
                </div>\
                <div class="col-lg-9 col-md-12 mb-3">\
                    <!--shop toolbar start-->\
                    <div class="shop_toolbar_wrapper">\
                        <div class="shop_toolbar_btn mt-2">\
                            <button data-role="grid_4" type="button"  class="active btn-grid-4" data-toggle="tooltip" title="4"></button>\
                            <button data-role="grid_list" type="button"  class="btn-list" data-toggle="tooltip" title="List"></button>\
                        </div>\
												<div class="niceselect_option">\
                                <select name="ShipTo" id="ShipTo" class="select_option">\
                                    <option value="US" '+(this.obj.shipTo=='US'?'selected':'')+'>Ship to: United States</option>\
                                    <option value="FR" '+(this.obj.shipTo=='FR'?'selected':'')+'>Ship to: France</option>\
                                    <option value="UK" '+(this.obj.shipTo=='UK'?'selected':'')+'>Ship to: United Kingdom</option>\
                                    <option value="ES" '+(this.obj.shipTo=='ES'?'selected':'')+'>Ship to: Spain</option>\
                                    <option value="IT" '+(this.obj.shipTo=='IT'?'selected':'')+'>Ship to: Italy</option>\
                                    <option value="AU" '+(this.obj.shipTo=='AU'?'selected':'')+'>Ship to: Australia</option>\
                                    <option value="DE" '+(this.obj.shipTo=='DE'?'selected':'')+'>Ship to: Germany</option>\
                                    <option value="CA" '+(this.obj.shipTo=='CA'?'selected':'')+'>Ship to: Canada</option>\
                                    <option value="SE" '+(this.obj.shipTo=='SE'?'selected':'')+'>Ship to: Sweden</option>\
                                    <option value="BR" '+(this.obj.shipTo=='BR'?'selected':'')+'>Ship to: Brazil</option>\
                                    <option value="IN" '+(this.obj.shipTo=='IN'?'selected':'')+'>Ship to: India</option>\
                                    <option value="RU" '+(this.obj.shipTo=='RU'?'selected':'')+'>Ship to: Russia</option>\
                                    <option value="MY" '+(this.obj.shipTo=='MY'?'selected':'')+'>Ship to: Malaysia</option>\
                                </select>\
                        </div>\
                        <div class="shop_toolbar_btn mt-2">\
													<input type="checkbox" '+(this.obj.isFreeShipping?'checked':'')+' id="FreeShipping" style="vertical-align: middle;">\
													<label for="FreeShipping">Free shipping</label>\
                        </div>\
                        <div class="niceselect_option">\
                                <select name="orderby" class="select_option" id="SortBy">\
                                    <option value="1" '+(this.obj.Sort==1?'selected':'')+'>Sort by Bestselling</option>\
                                    <option value="2" '+(this.obj.Sort==2?'selected':'')+'>Sort by popularity</option>\
                                    <option value="3" '+(this.obj.Sort==3?'selected':'')+'>Sort by average rating</option>\
                                    <option value="4" '+(this.obj.Sort==4?'selected':'')+'>Sort by price: low to high</option>\
                                    <option value="5" '+(this.obj.Sort==5?'selected':'')+'>Sort by price: high to low</option>\
                                </select>\
                        </div>\
                        <div class="page_amount">\
                            <p>Showing  '+Tool.toThousands(((this.arr[3]-1)*pro[0].size)+1)+'-'+Tool.toThousands(((this.arr[3]-1)*pro[0].size)+pro[0].size)+' of '+Tool.toThousands(pro[0].count)+' results</p>\
                        </div>\
                    </div>\
                    <!--shop toolbar end-->\
                    <div class="row shop_wrapper grid_4">'+this.b03(pro)+'</div>\
                   '+str+'\
                    <!--shop toolbar end-->\
                    <!--shop wrapper end-->\
                </div>\
            </div>\
        </div>\
    </div>\
    <!--shop  area end-->'
	},
  b03:function(pro)
  {
		var str=''
		for(var i=1;i<pro.length;i++)
		{
			str+='\
			<div class="col-lg-3 col-md-4 col-sm-6 bg-product">\
				<div class="single_product mt-3 mb-3">\
					<div class="product_thumb h230 border">\
						<a class="primary_img" href="/p/item/'+pro[i].id+'.html"><img src="'+pro[i].pic1+'_250x250.jpg" alt=""></a>\
						'+Tool.action_links()+'\
					</div>\
					<div class="product_content grid_content">\
						<h4 class="product_name"><a href="/p/item/'+pro[i].id+'.html">'+pro[i].name+'</a></h4>\
						<p>\
							'+pro[i].SaleNum+' sold\
							<span style="width: 1.25px; height: 8.75px; margin: 1.25px 10px; border-left: 1.25px solid rgb(204, 204, 204);"></span>\
							'+pro[i].Review+' stars\
						</p>\
						<div class="price_box"> \
							<span class="current_price">US $'+(pro[i].minprice*((100-pro[i].Discount)*0.01)).toFixed(2)+'</span>\
							'+(pro[i].Discount==0?'':'<span class="old_price">US $'+pro[i].minprice.toFixed(2)+'</span>')+'\
						</div>\
					</div>\
					<div class="product_content list_content">\
						<h4 class="product_name"><a href="/p/item/'+pro[i].id+'.html">'+pro[i].name+'</a></h4>\
						'+this.b14(pro[i].type1Arr[0]+' &gt; '+pro[i].type2Arr[0]+' &gt; '+pro[i].type3Arr[0],pro[i].type1)+'\
						<p>\
							'+pro[i].SaleNum+' sold\
							<span style="width: 1.25px; height: 8.75px; margin: 1.25px 10px; border-left: 1.25px solid rgb(204, 204, 204);"></span>\
							'+pro[i].Review+' stars\
						</p>\
						<div class="price_box"> \
							<span class="current_price">US $'+(pro[i].minprice*((100-pro[i].Discount)*0.01)).toFixed(2)+'</span>\
							'+(pro[i].Discount==0?'':'<span class="old_price">US $'+pro[i].minprice.toFixed(2)+'</span>')+'\
						</div>\
						<div class="product_desc">\
								<p>'+pro[i].keywords+'</p>\
						</div>\
						<div class="action_links list_action_right">\
								<ul>\
										<li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box"  title="quick view"> <span class="lnr lnr-magnifier"></span></a></li>\
										<li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><span class="lnr lnr-heart"></span></a></li>  \
								</ul>\
						</div>\
					</div>\
				</div>\
			</div>'
		}
		if(str==""){str='<h3 class="mt-100 mb-100 mx-auto">Your search keywords do not match any products.</h3>';}
		return str;
	},
  b04:function(pro)//PRODUCT TAGS
  {
		var arr=[],arr2=[],val='',len=0,str='';
		for(var i=1;i<pro.length;i++)
		{
			arr2=pro[i].keywords.split(',')
			if(arr2.length>3){len=3}else{len=arr2.length;}
			for(var j=0;j<len;j++)
			{
				val=Tool.Trim(arr2[j])
				if(val!=''&&val.indexOf("&")==-1) arr.push(val);
			}
		}
		if(arr.length!=0)
		{
			arr=Tool.unique(arr)
			var nArr=[]
			for(var i=0;i<arr.length;i++)
			{			
				nArr.push('<a href="/p/list/'+Tool.JSONescape({keys:arr[i]})+'">'+arr[i]+'</a>')
			}
			str='<div class="widget_list tags_widget">\
						<h3>Product tags</h3>\
						<div class="tag_cloud">'+nArr.join("")+'</div>\
					</div>'
		}
		return str
	},
  b05:function(pro)
  {
		var type1=pro[0].leftArr[0]
		var str1='',str2='',str3=''
		for(var k in type1)
		{
			if(type1[k].arr[1]!=0)
			{
				str2=''
				for(var l in type1[k])
				{
					if(l!="arr")
					{
						str3=''
						for(var m in type1[k][l])
						{
							if(m!="arr")
							{
								str3+='<li><a href="javascript:;" onclick="fun.c03(2,\''+m+'\')" title="'+type1[k][l][m][0]+' ('+type1[k][l][m][1]+' results)"><input type="radio" name="type" style="vertical-align: middle;" '+(m==this.obj.type3?'checked="checked"':'')+'> '+type1[k][l][m][0]+'<span>('+type1[k][l][m][1]+')</span></a></li>'
							}
						}
						str2+='\
						<li class="widget_sub_categories"><a href="javascript:;" onclick="fun.c03(1,\''+l+'\')" title="'+type1[k][l].arr[0]+' ('+type1[k][l].arr[1]+' results)"><input type="radio" name="type" style="vertical-align: middle;" '+(l==this.obj.type2?'checked="checked"':'')+'> '+type1[k][l].arr[0]+'<span>('+type1[k][l].arr[1]+')</span></a>\
							<ul class="widget_dropdown_categories">'+str3+'</ul>\
						</li>'
					}
				}
				str1+='\
				<div class="widget_list widget_categories"><h3><a href="javascript:;" onclick="fun.c03(0,\''+k+'\')" title="'+type1[k].arr[0]+' ('+type1[k].arr[1]+' results)"><input type="radio" name="type" style="vertical-align: middle;" '+(k==this.obj.type1?'checked="checked"':'')+'> '+type1[k].arr[0]+' ('+type1[k].arr[1]+')</a></h3>\
					<ul>'+str2+'</ul>\
				</div>'
			}
		}
		//////////////////////////////////////////////////////////////////////
		var leafType=pro[0].leftArr[1],leafTypeStr=""
		for(var i=1;i<leafType.length;i++)//相关类目
		{
			leafTypeStr+='\
			<li>\
				<a href="javascript:;" onclick="fun.c03(3,\''+leafType[i].fromID+'\')" title="'+leafType[i].enname+' ('+leafType[i].sort+' results)">\
				<input type="radio" name="type" style="vertical-align: middle;" '+(""+leafType[i].fromID==this.obj.type?'checked="checked"':'')+'>\
				'+leafType[i].enname+'\
				<span>('+leafType[i].sort+')</span>\
				</a>\
			</li>'
		}
		if(leafTypeStr)
		{
			str1+='\
			<div class="widget_list widget_color">\
				<h3>Leaf Categories</h3>\
				<ul>'+leafTypeStr+'</ul>\
			</div>'
		}
		return str1;
	},
  b06:function(pro,type) 
  {
		var type1={},leafType={},arr=[]
		for(var i=1;i<pro.length;i++)
		{
			if(pro[i].type!=pro[i].type2&&pro[i].type!=pro[i].type3){leafType[pro[i].type]=true;}
			if(!type1[pro[i].type1]){type1[pro[i].type1]={};type1[pro[i].type1].arr=pro[i].type1Arr;}			
			if(!type1[pro[i].type1][pro[i].type2]){type1[pro[i].type1][pro[i].type2]={};type1[pro[i].type1][pro[i].type2].arr=pro[i].type2Arr}			
			if(pro[i].type3!=0)
			{
				if(!type1[pro[i].type1][pro[i].type2][pro[i].type3]){type1[pro[i].type1][pro[i].type2][pro[i].type3]=pro[i].type3Arr;}
			}
		}
		for(var k in leafType)
		{
			arr.push(k)
		}
		return [type1,arr]
	},
  b07:function(pro,type) 
  {
		var arr=[]
		for(var i=1;i<pro.length;i++)
		{
			if(type==""+pro[i].type)
			{
				arr=[
				{type:pro[i].type1,name:pro[i].type1Arr[0]},
				{type:pro[i].type2,name:pro[i].type2Arr[0]},
				{type:pro[i].type3,name:pro[i].type3Arr[0]},
				{type:pro[i].type,name:this.b08(pro[0].leftArr[1],pro[i].type)}
				]
				break;
			}
		}
		return arr
	},
  b08:function(typeArr,type) 
  {
		var name=""
		for(var i=1;i<typeArr.length;i++)
		{
			if(type==typeArr[i].fromID)
			{
				name=typeArr[i].enname
				break;
			}
		}
		return name;
	},
  b09:function(pro,type)
  {
		var arr=[]
		for(var i=1;i<pro.length;i++)
		{
			if(type==""+pro[i].type3)
			{
				arr=[
				{type:pro[i].type1,name:pro[i].type1Arr[0]},
				{type:pro[i].type2,name:pro[i].type2Arr[0]},
				{type:pro[i].type3,name:pro[i].type3Arr[0]}
				]
				break;
			}
		}
		return arr
	},
  b10:function(pro,type) 
  {
		var arr1=[]
		for(var i=1;i<pro.length;i++)
		{
			//////////////////////////////////////////////
			if(!pro[i].type1Arr)
			{
				arr1=this.b11(type,pro[i].type1)
				for(var j=i;j<pro.length;j++)//把重复的type1,传值。
				{
					if(pro[i].type1==pro[j].type1)
					{
						pro[j].type1Arr=arr1
					}
				}
			}
			////////////////////////////////////////////////////////////
			if(!pro[i].type2Arr)
			{
				arr1=this.b12(type,pro[i].type1,pro[i].type2)
				for(var j=i;j<pro.length;j++)//把重复的type2,传值。
				{
					if(pro[i].type2==pro[j].type2)
					{
						pro[j].type2Arr=arr1
					}
				}
			}
			////////////////////////////////////////////////////////
			if(!pro[i].type3Arr)
			{
				arr1=this.b13(type,pro[i].type1,pro[i].type2,pro[i].type3)
				for(var j=i;j<pro.length;j++)//把重复的type2,传值。
				{
					if(pro[i].type3==pro[j].type3)
					{
						pro[j].type3Arr=arr1
					}
				}
			}
			/////////////////////////////////////////////////////////
		}
		return pro;
	},
  b11:function(type,fromID) 
  {
		var arr=["*"+fromID,0]
		for(var i=1;i<type.length;i++)
		{
			if(fromID==""+type[i].fromID)
			{
				arr=[type[i].enname,Tool.toThousands(type[i].sort)]
				break;
			}
		}
		return arr;
	},
  b12:function(type,type1,type2) 
  {
		var arr=['*'+type1+'-'+type2,0]
		for(var i=1;i<type.length;i++)
		{
			if(type1==""+type[i].fromID)
			{
				for(var j=1;j<type[i].list.length;j++)
				{
					if(type2==""+type[i].list[j].fromID)
					{
						arr=[type[i].list[j].enname,Tool.toThousands(type[i].list[j].sort)]
						break;
					}				
				}
				break;
			}
		}
		return arr;
	},
  b13:function(type,type1,type2,type3)
  {
		var arr=['*'+type1+'-'+type2+'-'+type3,0]
		for(var i=1;i<type.length;i++)
		{
			if(type1==""+type[i].fromID)
			{
				for(var j=1;j<type[i].list.length;j++)
				{
					if(type2==""+type[i].list[j].fromID)
					{
						for(var k=1;k<type[i].list[j].list.length;k++)
						{
							if(type3==""+type[i].list[j].list[k].fromID)
							{
								arr=[type[i].list[j].list[k].enname,Tool.toThousands(type[i].list[j].list[k].sort)]
								break;							
							}						
						}
						break;
					}				
				}
				break;
			}
		}
		return arr;
	},
  b14:function(typestr,type1) 
  {
		var str=''
		if(typestr.substr(0,1)!="*")
		{
			str='<p class="mb-3">'+typestr+'</p>'
		}
		return str;
		},
  b15:function(pro,type)
  {
		var arr=[]
		for(var i=1;i<pro.length;i++)
		{
			if(type==""+pro[i].type2)
			{
				arr=[
				{type:pro[i].type1,name:pro[i].type1Arr[0]},
				{type:pro[i].type2,name:pro[i].type2Arr[0]}
				]
				break;
			}
		}
		return arr
	},
  b16:function(pro,type)
  {
		var arr=[]
		for(var i=1;i<pro.length;i++)
		{
			if(type==""+pro[i].type1)
			{
				arr=[{type:pro[i].type1,name:pro[i].type1Arr[0]}]
				break;
			}
		}
		return arr
	},
  b17:function(commonType,type)
  {
		var arr=[]
		for(var i=1;i<commonType.length;i++)
		{
			if(type==""+commonType[i].fromID)
			{
				arr=[{type:commonType[i].fromID,name:commonType[i].enname}]
				break;
			}
		}
		return arr
  },
  b18:function(oo)
  {
		var arr1=[],arr2=[],len=oo.length;
		arr1.push('All Categories')
		arr2.push('\
		<li>\
			<input type="radio" name="common" style="vertical-align: middle;cursor: pointer;" id="common0" '+(0==len?'checked="checked"':'')+' onclick="fun.c07()">\
			<label for="common0" class="mb-0" style="cursor: pointer;">All Categories</label>\
		</li>')
		for(var i=0;i<len;i++)
		{
			arr1.push(oo[i].name)
			arr2.push('\
			<li>\
				<input type="radio" name="common" style="vertical-align: middle;cursor: pointer;" id="common'+oo[i].type+'" '+(i+1==len?'checked="checked"':'')+' onclick="fun.c03('+i+',\''+oo[i].type+'\')">\
				<label for="common'+oo[i].type+'" class="mb-0" style="cursor: pointer;">'+oo[i].name+'</label>\
			</li>')
		}
		return [arr1,arr2];
	},
  c01:function() 
  {
    /*---slider-range here  按价格搜---*/
		var price=[0,30]
		if(this.obj.price.length!=0){price=this.obj.price;}
    $( "#slider-range").slider({
        range: true,
        min: 0,
        max: 30,
        values: price,
        slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
       }
    });
    $("#amount").val( "$" + $( "#slider-range" ).slider( "values", 0 ) +" - $" + $( "#slider-range" ).slider( "values", 1 ) );//文本修改搜索价格
    /*---shop grid activation---*/
    $('.shop_toolbar_btn > button').on('click',function(e){
			e.preventDefault();
			$('.shop_toolbar_btn > button').removeClass('active');
			$(this).addClass('active');
			var parentsDiv = $('.shop_wrapper');
			var viewMode = $(this).data('role');
			parentsDiv.removeClass('grid_3 grid_4 grid_list').addClass(viewMode);
			if(viewMode == 'grid_4'){
				parentsDiv.children().addClass('col-lg-3 col-md-4 col-sm-6').removeClass('col-lg-4 col-cust-5 col-12');
			}
			if(viewMode == 'grid_list')
			{
				parentsDiv.children().addClass('col-12').removeClass('col-lg-3 col-lg-4 col-md-4 col-sm-6 col-cust-5');
			}
		});
		///////////////////////////////////////////////////////////////////////////////////
		var This=this;
		$('#ShipTo').on("change", function(e)
		{
			Tool.setCookie("shipTo",this.value,365*24)
			This.c04();
		});
		$('#FreeShipping').on("click", function(e)
		{
			This.obj.isFreeShipping=$('#FreeShipping').is(':checked');
			This.c04();
		});
		$('#SortBy').on("change", function(e)
		{
			This.obj.Sort=parseInt(this.value);
			This.c04();
		});
  },
  c02:function(page) 
  {
    this.arr[3]=page;
    location.href="/"+this.arr.join("/")
	},
  c03:function(j,val)
  {
		for(var i=0;i<4;i++)
		{
			if(i==j)
			{this.obj.type[i]=val;}
			else
			this.obj.type[i]="";//清空以前的
		}
		this.c04();
	},
  c04:function()
  {
		var oo={}
		if(this.obj.type.length!=0){oo.type=this.obj.type;}
		if(this.obj.keys){oo.keys=this.obj.keys;}
		if(this.obj.price.length!=0){oo.price=this.obj.price;}
		if(this.obj.isFreeShipping){oo.isFreeShipping=this.obj.isFreeShipping;}
		if(this.obj.Sort!=1){oo.Sort=this.obj.Sort;}
		location.href="/p/list/"+Tool.JSONescape(oo);
	},
  c05:function()
  {
		this.obj.keys="";
		this.c04();
	},
  c06:function()
  {
		var amount=$("#amount").val()
		var arr=$("#amount").val().split("-")
		arr[0]=parseInt(Tool.Trim(arr[0].split("$")[1]))
		arr[1]=parseInt(Tool.Trim(arr[1].split("$")[1]))
		this.obj.price=arr;
		this.c04();
	},
  c07:function()
  {
		this.obj.type=[]
		this.c04();
	}
}
$(function(){fun.a01();});


/*		var arrStr2=Tool.unescape(this.arr[2]),typeArr=[]
		this.obj.keys=Tool.StrSlice(arrStr2,"like '%","%'")
		///////////////////////////////////////////////////////
		typeArr[0]=Tool.strRepArr(arrStr2,"type1\=([0-9]+)",1)[0];
		typeArr[1]=Tool.strRepArr(arrStr2,"type2\=([0-9]+)",1)[0];
		typeArr[2]=Tool.strRepArr(arrStr2,"type3\=([0-9]+)",1)[0];
		typeArr[3]=Tool.strRepArr(arrStr2,"type\=([0-9]+)",1)[0];
		for(var i=0;i<4;i++)
		{
			if(typeArr[i])
			{this.obj.type[i]=typeArr[i];break;}
			else
			{this.obj.type[i]="";}
		}
		//////////////////////////////////////////////////////
		var arr1=[]
		arr1[0]=Tool.strRepArr(arrStr2,"price&gt;([0-9]+)",1)[0];
		arr1[1]=Tool.strRepArr(arrStr2,"price<([0-9]+)",1)[0];
		if(arr1[0]){this.obj.price[0]=parseInt(arr1[0]);}
		if(arr1[1]){this.obj.price[1]=parseInt(arr1[1]);}
		///////////////////////////////////////////////////////
		var shipTo=Tool.strRepArr(arrStr2,"shipTo([A-Z]+[=|<])",1)[0];
		if(shipTo)
		{
			if(shipTo.indexOf("=")!=-1)
			{
				this.obj.isFreeShipping=true;
				this.obj.shipTo=shipTo.split("=")[0];
			}
			else
			{
				this.obj.isFreeShipping=false;
				this.obj.shipTo=shipTo.split("<")[0];
			}
		}*/