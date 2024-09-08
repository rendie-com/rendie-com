"use strict";
var fun={
	arr:Tool.arr(),
  a01:function()
  {
		var id=this.arr[2].split(".html")[0]
		Tool.ajax(this.a02,"",this,"/html/product/html/self/ajax_item.html/"+id);
	},
  a02:function(oo) 
  {
		$("title").html(oo.pro.name)
		$('[name="keywords"]').attr("content",oo.pro.keywords)
		$('[name="description"]').attr("content",oo.pro.description)
		$("body").html(
			Tool.header(oo.common,"",0)+
			this.b01()+
			this.b02(oo.pro)+
			this.b03(oo.pro)+
			this.b04(oo.RelatedProducts)+
			this.b05(oo.UpsellProducts)+
			Tool.footer()
		);
		Tool.c01();
		this.c01();
  },
  b01:function() 
  {
		return '\
		<!--breadcrumbs area start-->\
    <div class="breadcrumbs_area">\
			<div class="container">   \
				<div class="row">\
					<div class="col-12">\
						<div class="breadcrumb_content">\
							<ul>\
								<li><a href="/">home</a></li>\
								<li>product details</li>\
							</ul>\
						</div>\
					</div>\
				</div>\
			</div>\
    </div>\
    <!--breadcrumbs area end-->'
	},
  b02:function(pro) 
  {
		return '\
		<!--product details start-->\
    <div class="product_details mb-70">\
        <div class="container">\
            <div class="row">\
                <div class="col-lg-5 col-md-5">\
                    <div class="product-details-tab">\
                        <div class="zoomWrapper single-zoom product-cover slider-for border p-1">'+this.b09(pro.pic)+'</div>\
                        <div class="single-zoom-thumb">\
                            <div class="product-images slider-nav">'+this.b08(pro.pic)+'</div>\
                        </div>\
                    </div>\
                </div>\
                <div class="col-lg-7 col-md-7">\
                    <div class="product_d_right">\
                       <form>\
                            <h1>'+pro.name+'</h1>\
                            <div class="price_box">\
                                <span class="current_price">$'+(pro.minprice*((100-pro.Discount)*0.01)).toFixed(2)+'</span>\
                                <span class="old_price">$'+pro.minprice.toFixed(2)+'</span>\
                            </div>\
                            <div class="product_desc">\
                                <p>'+pro.description+'</p>\
                            </div>\
                            <div class="product_variant color">\
                                <h3>Available Options</h3>\
                                '+this.b11(pro.aeopAeProductSKUs[0])+'\
                            </div>\
                            <div class="product_variant quantity">\
                                <label>quantity</label>\
                                <input min="1" max="100" value="1" type="number">\
                                <button class="button" type="submit">add to cart</button>  \
                                \
                            </div>\
                            <div class=" product_d_action">\
                               <ul>\
                                   <li><a href="#" title="Add to wishlist">+ Add to Wishlist</a></li>\
                               </ul>\
                            </div>\
                            <div class="product_meta">\
                                <span>Category: <a href="#">Clothing</a></span>\
                            </div>\
                            \
                        </form>\
                        <div class="priduct_social">\
                            <ul>\
                                <li><a class="facebook" href="#" title="facebook"><i class="fa fa-facebook"></i> Like</a></li>\
                                <li><a class="twitter" href="#" title="twitter"><i class="fa fa-twitter"></i> tweet</a></li>\
                                <li><a class="pinterest" href="#" title="pinterest"><i class="fa fa-pinterest"></i> save</a></li>\
                                <li><a class="google-plus" href="#" title="google +"><i class="fa fa-google-plus"></i> share</a></li>\
                                <li><a class="linkedin" href="#" title="linkedin"><i class="fa fa-linkedin"></i> linked</a></li>\
                            </ul>      \
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>    \
    </div>\
    <!--product details end-->'
	},
  b03:function(pro) 
  {
		var des=pro.des.replace(/style\="([\s\S]*?)"/ig,'').replace(/(<map [\S\s]*?<\/map>)/ig,"")
		return '\
		<!--product info start-->\
    <div class="product_d_info mb-65">\
        <div class="container">   \
            <div class="row">\
                <div class="col-12">\
                    <div class="product_d_inner">   \
                        <div class="product_info_button">    \
                            <ul class="nav" role="tablist">\
                                <li >\
                                    <a class="active" data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="false">Description</a>\
                                </li>\
                                <li>\
                                     <a data-toggle="tab" href="#sheet" role="tab" aria-controls="sheet" aria-selected="false">Specification</a>\
                                </li>\
                                <li>\
                                   <a data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews (1)</a>\
                                </li>\
                            </ul>\
                        </div>\
                        <div class="tab-content">\
                            <div class="tab-pane fade show active" id="info" role="tabpanel" >\
                                <div class="product_info_content">\
                                    <p>'+des+'</p>\
                                </div>\
                            </div>\
                            <div class="tab-pane fade" id="sheet" role="tabpanel" >\
                                <div class="product_d_table">\
                                   <form>\
																			<table>\
																				<tbody>'+this.b10(pro.aeopAeProductPropertys)+'</tbody>\
																			</table>\
                                    </form>\
                                </div>\
                                <div class="product_info_content">\
                                    <p>aaaaaaaaaaaaaaaaaaaaaa has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman\'s wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!</p>\
                                </div>    \
                            </div>\
                            <div class="tab-pane fade" id="reviews" role="tabpanel" >\
                                <div class="reviews_wrapper">\
                                    <h2>1 review for Donec eu furniture</h2>\
                                    <div class="reviews_comment_box">\
                                        <div class="comment_thmb">\
                                            <img src="'+o.path+'html/product/img/blog/comment2.jpg" alt="">\
                                        </div>\
                                        <div class="comment_text">\
                                            <div class="reviews_meta">\
                                                <div class="star_rating">\
                                                    <ul>\
                                                        <li><a href="#"><i class="icon-star"></i></a></li>\
                                                       <li><a href="#"><i class="icon-star"></i></a></li>\
                                                       <li><a href="#"><i class="icon-star"></i></a></li>\
                                                       <li><a href="#"><i class="icon-star"></i></a></li>\
                                                       <li><a href="#"><i class="icon-star"></i></a></li>\
                                                    </ul>   \
                                                </div>\
                                                <p><strong>admin </strong>- September 12, 2018</p>\
                                                <span>roadthemes</span>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="comment_title">\
                                        <h2>Add a review </h2>\
                                        <p>Your email address will not be published.  Required fields are marked </p>\
                                    </div>\
                                    <div class="product_ratting mb-10">\
                                       <h3>Your rating</h3>\
                                        <ul>\
                                            <li><a href="#"><i class="icon-star"></i></a></li>\
                                               <li><a href="#"><i class="icon-star"></i></a></li>\
                                               <li><a href="#"><i class="icon-star"></i></a></li>\
                                               <li><a href="#"><i class="icon-star"></i></a></li>\
                                               <li><a href="#"><i class="icon-star"></i></a></li>\
                                        </ul>\
                                    </div>\
                                    <div class="product_review_form">\
                                        <form action="#">\
                                            <div class="row">\
                                                <div class="col-12">\
                                                    <label for="review_comment">Your review </label>\
                                                    <textarea name="comment" id="review_comment" ></textarea>\
                                                </div> \
                                                <div class="col-lg-6 col-md-6">\
                                                    <label for="author">Name</label>\
                                                    <input id="author"  type="text">\
                                                </div> \
                                                <div class="col-lg-6 col-md-6">\
                                                    <label for="email">Email </label>\
                                                    <input id="email"  type="text">\
                                                </div>\
                                            </div>\
                                            <button type="submit">Submit</button>\
                                         </form>   \
                                    </div> \
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>    \
    </div>  \
    <!--product info end-->'
	},
  b04:function(pro)//Related Products
  {
		return '\
		<!--product area start-->\
    <section class="product_area related_products">\
        <div class="container">\
            <div class="row">\
                <div class="col-12">\
                    <div class="section_title">\
                        <h2>Related Products	</h2>\
                    </div>\
                </div>\
            </div> \
            <div class="row">\
                <div class="col-12">\
                    <div class="product_carousel product_column5 owl-carousel">'+this.b06(pro)+'</div>\
                </div>\
            </div>\
        </div>\
    </section>\
    <!--product area end-->'
	},
  b05:function(pro)//Upsell Products
  {
		return '\
		<!--product area start-->\
    <section class="product_area upsell_products">\
        <div class="container">\
            <div class="row">\
                <div class="col-12">\
                    <div class="section_title">\
                        <h2>Upsell Products	</h2>\
                    </div>\
                </div>\
            </div> \
            <div class="row">\
                <div class="col-12">\
                    <div class="product_carousel product_column5 owl-carousel">'+this.b07(pro)+'</div>\
                </div>\
            </div>\
        </div>\
    </section>\
    <!--product area end-->'
	},
  b06:function(pro)
  {
		var str=""
		for(var i=1;i<pro.length;i++)
		{
			str+='\
			<article class="single_product bg-product mb-2">\
				<figure>\
					<div class="product_thumb border h230">\
							<a class="primary_img" href="/p/item/'+pro[i].id+'.html"><img src="'+pro[i].pic1+'_250x250.jpg" alt=""></a>\
							<div class="action_links">\
									<ul>\
											<li class="add_to_cart"><a href="cart.html" title="Add to cart"><span class="lnr lnr-cart"></span></a></li>\
											<li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box"  title="quick view"> <span class="lnr lnr-magnifier"></span></a></li>\
											 <li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><span class="lnr lnr-heart"></span></a></li>  \
											<li class="compare"><a href="#" title="Add to Compare"><span class="lnr lnr-sync"></span></a></li>\
									</ul>\
							</div>\
					</div>\
					<figcaption class="product_content">\
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
					</figcaption>\
				</figure>\
			</article>'
		}
		return str;
	},
  b07:function(pro)
  {
		var str=""
		for(var i=1;i<pro.length;i++)
		{
			str+='\
			<article class="single_product bg-product mb-2">\
				<figure>\
						<div class="product_thumb border h230">\
								<a class="primary_img" href="/p/item/'+pro[i].id+'.html"><img src="'+pro[i].pic1+'_250x250.jpg" alt=""></a>\
								<div class="action_links">\
										<ul>\
												<li class="add_to_cart"><a href="cart.html" title="Add to cart"><span class="lnr lnr-cart"></span></a></li>\
												<li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box"  title="quick view"> <span class="lnr lnr-magnifier"></span></a></li>\
												<li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><span class="lnr lnr-heart"></span></a></li>  \
												<li class="compare"><a href="#" title="Add to Compare"><span class="lnr lnr-sync"></span></a></li>\
										</ul>\
								</div>\
						</div>\
						<figcaption class="product_content">\
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
						</figcaption>\
				</figure>\
			</article>'
		}
		return str;
	},
  b08:function(pic)
  {
		var arr=pic.split(";"),str=''
		for(var i=0;i<arr.length;i++)
		{
			str+='\
			<div class="thumb-container">\
				<div class="border p-1"><img class="thumb js-thumb selected" src="'+arr[i]+'_140x140.jpg"></div>\
			</div>'
		}
		return str;
	},
  b09:function(pic)
  {
		var arr=pic.split(";"),str=''
		for(var i=0;i<arr.length;i++)
		{
			str+='\
			<div class="thumb-item">\
				<div class="easyzoom easyzoom--overlay"><a href="'+arr[i]+'"><img data-lazy="'+arr[i]+'" style="height:600px;"></a></div>\
			</div>'
		}
		return str;
	},
  b10:function(arr) 
  {
		var str=""
		for(var i=0;i<arr.length;i++)
		{
			str+='\
			<tr>\
				<td class="first_child">'+arr[i].attrName+'</td>\
				<td>'+arr[i].attrValue+'</td>\
			</tr>'
		}
		return str;
	},
  b11:function(arr) 
  {
		var str1="",str2=""
		for(var i=0;i<arr.length;i++)
		{
			str2=""
			for(var j=0;j<arr[i].skuPropertyValues.length;j++)
			{
				str2+='<li>'+arr[i].skuPropertyValues[j].skuPropertyTips+'</li>'
			}
			str1+='<label>'+arr[i].skuPropertyName+'</label><ul>'+str2+'</ul>'
		}
		return str1
	},
  c01:function() 
  {
    /*---product column5 activation---*/
    var $porductColumn5 =  $('.product_column5');
    if($porductColumn5.length > 0){
        $porductColumn5.on('changed.owl.carousel initialized.owl.carousel', function (event) {
            $(event.target).find('.owl-item').removeClass('last').eq(event.item.index + event.page.size - 1).addClass('last')}).owlCarousel({
            autoplay: true,
            loop: true,
            nav: true,
            autoplay: false,
            autoplayTimeout: 8000,
            items: 6,
            margin: 20,
            dots:false,
            navText: ['<i class="ion-ios-arrow-left"></i>','<i class="ion-ios-arrow-right"></i>'],
            responsiveClass:true,
            responsive:{
                    0:{
                    items:1,
                },
                576:{
                    items:2,
                },
                768:{
                    items:3,
                },
                992:{
                    items:4,
                },
                1200:{
                    items:6,
                },

              }
        });
    }
    /*---single product activation---*/
     var $singleProductActive = $('.single-product-active');
        if($singleProductActive.length > 0){  
        $('.single-product-active').owlCarousel({
            autoplay: true,
            loop: true,
            nav: true,
            autoplay: false,
            autoplayTimeout: 8000,
            items: 4,
            margin:15,
            dots:false,
            navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
            responsiveClass:true,
            responsive:{
                    0:{
                    items:1,
                },
                320:{
                    items:2,
                },
                400:{
                    items:3,
                },
                992:{
                    items:3,
                },
                1200:{
                    items:5,
                },


              }
        });
    }
   
		////////////////////////////////////////////////////////////////////////
		$('.slider-for').slick({
	   slidesToShow: 1,
	   slidesToScroll: 1,
	   focusOnSelect: true,//启用对选定元素的关注（单击）
	   arrows: false, //上一个/下一个箭头
	   fade: true,//启用淡入淡出
	   infinite: true,//无限循环滑动
	   lazyLoad: 'ondemand',//设置延迟加载技术。接受“按需”或“渐进式”
	   asNavFor: '.slider-nav'//将滑块设置为其他滑块的导航（类或ID名称）
		});
		$('.single-zoom-thumb .slider-nav').slick({
		 slidesToShow: 5,//要显示的幻灯片数量
		 slidesToScroll: 1,//要滚动的幻灯片数
		 //centerMode: true,//通过部分上一张/下一张幻灯片启用居中视图。与奇数的slidesToShow计数一起使用。
		 asNavFor: '.slider-for',//将滑块设置为其他滑块的导航（类或ID名称）
		 dots: false, //显示圆点指示器
		 arrows: true, //上一个/下一个箭头
		 infinite: true,//无限循环滑动
		 focusOnSelect: true//启用对选定元素的关注（单击）
		});
		$('.slider-for').slickLightbox();
 
		
	 ///////////////////////////////////////////////////////////////////////////
  }
}
$(function(){fun.a01();});