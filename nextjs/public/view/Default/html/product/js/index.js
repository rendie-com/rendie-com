"use strict";
var fun = {
    a01: function () {        
        Tool.ajax.json("/html/" + Tool.escape("product/html/self/ajax_index.js"), this.a02, this);
    },
    a02: function (oo) {
        $("body").html(
            Tool.header(oo.common, "", 0) +
            this.b01() +
            this.b02() +//shipping
            this.b03(oo.FeaturedCategories) +//FeaturedCategories
            this.b04() +//banner
            this.b05(oo.DealsOfTheWeeks) +
            this.b06(oo.BestSellers) +//BestSellers
            this.b07() +//banner
            this.b08(oo.RelatedToItems) +//Related to Items
            this.b09(oo.PopularProducts) +//PopularProducts
            this.b10(oo.YouMayLike) +//You May Like
            Tool.footer() +
            this.modal()//+this.popup()
        );
        Tool.c01();
        this.c01();
    },
    b01: function ()//slider
    {
        return '\
		<!--slider area start-->\
		<section class="slider_section">\
				<div class="slider_area owl-carousel">\
						<div class="single_slider d-flex align-items-center" data-bgimg="'+ o.path + 'html/product/img/slider/slider1.jpg">\
								<div class="container">\
										<div class="row">\
												<div class="col-lg-6">\
														<div class="slider_content">\
																<h1>Family Jewelery</h1>\
																<h2>Collection</h2>\
																<p>Designer Jewellry Necklaces-Bracelets-Earings</p> \
																<a href="/p/list/'+ Tool.JSONescape({ type: [0, 0, 200001681, 0] }) + '">Read more</a>\
														</div>\
												</div>\
										</div>\
								</div>\
						</div>\
						<div class="single_slider d-flex align-items-center" data-bgimg="'+ o.path + 'html/product/img/slider/slider2.jpg">\
								<div class="container">\
										<div class="row">\
												<div class="col-lg-6">\
														<div class="slider_content">\
																<h1>Diamonds Jewelry</h1>\
																<h2>Collection</h2>\
																<p>Shukra Yogam &amp; Silver Power Silver Saving Schemes.</p> \
																<a href="/p/list/'+ Tool.JSONescape({ type: [0, 0, 200000167, 0] }) + '">Read more </a>\
														</div>\
												</div>\
										</div>\
								</div>\
						</div>\
						<div class="single_slider d-flex align-items-center" data-bgimg="'+ o.path + 'html/product/img/slider/slider3.jpg">\
								<div class="container">\
										<div class="row">\
												<div class="col-lg-6">\
														<div class="slider_content">\
																<h1>Grace Designer</h1>\
																<h2>Jewellery</h2>\
																<p>Rings, Occasion Pieces, Pandora &amp; More.</p>\
																<a href="/p/list/'+ Tool.JSONescape({ type: [0, 0, 100007323, 0] }) + '">Read more</a>\
														</div>\
												</div>\
										</div>\
								</div>\
						</div>\
				</div>\
		</section>\
		<!--slider area end-->'
    },
    b02: function ()//shipping
    {
        return '\
		<!--shipping area start-->\
    <div class="shipping_area">\
        <div class="container">\
            <div class="row">\
                <div class="col-lg-3 col-md-6">\
                    <div class="single_shipping">\
                        <div class="shipping_icone">\
                            <img src="'+ o.path + 'html/product/img/about/shipping1.jpg" alt="">\
                        </div>\
                        <div class="shipping_content">\
                            <h3>Worry-free shopping</h3>\
                            <p>Easy Refund & Return and Buyer Protection</p>\
                        </div>\
                    </div>\
                </div>\
                <div class="col-lg-3 col-md-6">\
                    <div class="single_shipping col_2">\
                        <div class="shipping_icone">\
                            <img src="'+ o.path + 'html/product/img/about/shipping2.jpg" alt="">\
                        </div>\
                        <div class="shipping_content">\
                            <h3>Worldwide Delivery</h3>\
                            <p>Partner with leading global logistics companies to 200+ countries.</p>\
                        </div>\
                    </div>\
                </div>\
                <div class="col-lg-3 col-md-6">\
                    <div class="single_shipping col_3">\
                        <div class="shipping_icone">\
                            <img src="'+ o.path + 'html/product/img/about/shipping3.jpg" alt="">\
                        </div>\
                        <div class="shipping_content">\
                            <h3>24/7 Customer Service</h3>\
                            <p>24/7 online customer service and multiple consultation approach</p>\
                        </div>\
                    </div>\
                </div>\
                <div class="col-lg-3 col-md-6">\
                    <div class="single_shipping col_4">\
                        <div class="shipping_icone">\
                            <img src="'+ o.path + 'html/product/img/about/shipping4.jpg" alt="">\
                        </div>\
                        <div class="shipping_content">\
                            <h3>Secure Payment</h3>\
                            <p>Pay with top payment methods trusted by 100 million shoppers</p>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
    <!--shipping area end-->'
    },
    b03: function (oo)//product
    {
        return '\
		<!--product area start-->\
    <div class="product_area mb-64">\
        <div class="container">\
            <div class="row">\
                <div class="col-12">\
                    <div class="product_header">\
                        <div class="section_title">\
                           <h2>Featured Categories</h2>\
                        </div>\
                        <div class="product_tab_btn">\
                            <ul class="nav" role="tablist">\
                                <li>\
                                    <a class="active" data-toggle="tab" href="#plant1" role="tab" aria-controls="plant1" aria-selected="true">Kids&Toy</a>\
                                </li>\
                                <li>\
                                    <a data-toggle="tab" href="#plant2" role="tab" aria-controls="plant2" aria-selected="false">Home Decor</a>\
                                </li>\
                                <li>\
                                    <a data-toggle="tab" href="#plant3" role="tab" aria-controls="plant3" aria-selected="false">Sports</a>\
                                </li>\
                            </ul>\
                        </div>\
                    </div>\
                </div>\
            </div> \
            <div class="product_container">\
               <div class="row">\
                   <div class="col-12">\
                        <div class="tab-content">\
                            <div class="tab-pane fade show active" id="plant1" role="tabpanel">\
                                <div class="product_carousel product_column5 owl-carousel">'+ this.b12(oo.KidsToy) + '</div>  \
                            </div>\
                            <div class="tab-pane fade" id="plant2" role="tabpanel">\
                                <div class="product_carousel product_column5 owl-carousel">'+ this.b12(oo.HomeDecor) + '</div>\
                            </div>\
                            <div class="tab-pane fade" id="plant3" role="tabpanel">\
                                <div class="product_carousel product_column5 owl-carousel">'+ this.b12(oo.Sports) + '</div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
    <!--product area end-->'
    },
    b04: function ()//banner
    {
        return '\
		<!--banner area start-->\
    <div class="banner_area">\
        <div class="container">\
            <div class="row">\
                <div class="col-lg-4 col-md-4">\
                    <div class="single_banner">\
                        <div class="banner_thumb">\
                            <a href="/p/list/'+ Tool.JSONescape({ type: [0, 0, 100007323, 0] }) + '"><img src="' + o.path + 'html/product/img/bg/banner1.jpg" alt=""></a> \
                        </div>\
                    </div>\
                </div>\
                <div class="col-lg-4 col-md-4">\
                    <div class="single_banner">\
                        <div class="banner_thumb">\
                            <a href="/p/list/'+ Tool.JSONescape({ type: [0, 0, 200000167, 0] }) + '"><img src="' + o.path + 'html/product/img/bg/banner2.jpg" alt=""></a> \
                        </div>\
                    </div>\
                </div>\
                <div class="col-lg-4 col-md-4">\
                    <div class="single_banner">\
                        <div class="banner_thumb">\
                            <a href="/p/list/'+ Tool.JSONescape({ type: [0, 0, 200000162, 0] }) + '"><img src="' + o.path + 'html/product/img/bg/banner2-1.jpg" alt=""></a>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
    <!--banner area end-->'
    },
    b05: function (pro)//product
    {
        return '\
		<!--product area start-->\
    <div class="product_area product_deals mb-65">\
        <div class="container">\
            <div class="row">\
                <div class="col-12">\
                    <div class="section_title">\
                       <h2>Deals Of The Weeks</h2>\
                    </div>\
                </div>\
            </div> \
             <div class="product_container">  \
               <div class="row">\
                   <div class="col-12">\
                        <div class="product_carousel product_column5 owl-carousel">'+ this.b15(pro) + '</div>\
                    </div>\
                </div>\
            </div>  \
        </div> \
    </div>\
    <!--product area end-->'
    },
    b06: function (pro)//product
    {
        return '\
		<!--product banner area satrt-->\
    <div class="product_banner_area mb-65">\
        <div class="container">\
            <div class="row">\
                <div class="col-12">\
                    <div class="section_title">\
                       <h2>Best Sellers</h2>\
                    </div>\
                </div>\
            </div> \
            <div class="product_banner_container">\
                <div class="row">\
                    <div class="col-lg-3 col-md-3">\
                        <div class="banner_thumb">\
                            <a href="/p/list/'+ Tool.JSONescape({ type: [0, 0, 200001701, 0] }) + '"><img src="' + o.path + 'html/product/img/bg/banner4.jpg" alt=""></a> \
                        </div>\
                    </div>\
                    <div class="col-lg-9 col-md-9">\
                        <div class="small_product_area product_column2 owl-carousel">'+ this.b16(pro) + '</div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
    <!--product banner area end-->'
    },
    b07: function ()//banner product
    {
        return '\
		<!--banner fullwidth area satrt-->\
    <div class="banner_fullwidth">\
        <div class="container">\
            <div class="row">\
                <div class="col-12">\
                    <div class="banner_full_content">\
                        <p>Rings, Occasion Pieces, Pandora &amp; More.</p>\
                        <h2>Jewellery<span>Grace Designer</span></h2>\
                        <a href="/p/list/'+ Tool.JSONescape({ keys: "rings" }) + '">discover now</a>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
    <!--banner fullwidth area end-->'
    },
    b08: function (pro)//Related to Items
    {
        return '\
		<!--product area start-->\
    <div class="product_area mb-65">\
        <div class="container">\
            <div class="row">\
                <div class="col-12">\
                    <div class="section_title">\
                       <h2>Related to Items You\'ve Viewed</h2>\
                    </div>\
                </div>\
            </div> \
             <div class="product_container">\
               <div class="row">\
                   <div class="col-12">\
                        <div class="product_carousel product_column5 owl-carousel">'+ this.b17(pro) + '</div>\
                    </div>\
                </div>        \
            </div>  \
        </div> \
    </div>\
    <!--product area end-->'
    },//brand
    b09: function (pro) //PopularProducts
    {
        return '\
		<!--blog area start-->\
    <section class="blog_section">\
        <div class="container">\
            <div class="row">\
                <div class="col-12">\
                    <div class="section_title">\
                       <h2>Popular Products</h2>\
                    </div>\
                </div>\
            </div>\
            <div class="row">\
                <div class="blog_carousel blog_column3 owl-carousel">'+ this.b18(pro) + '</div>\
            </div>\
        </div>\
    </section>\
    <!--blog area end-->'
    },
    b10: function (pro)//You May Like
    {
        return '\
		<!--custom product area start-->\
    <div class="custom_product_area mb-65">\
        <div class="container">\
            <div class="row">\
                <div class="col-12">\
                    <div class="section_title">\
                       <h2>You May Like</h2>\
                    </div>\
                </div>\
            </div> \
            <div class="row">\
                <div class="col-12">\
                    <div class="small_product_area product_carousel product_column3 owl-carousel">'+ this.b19(pro) + '</div>\
                </div>\
            </div>\
        </div>\
    </div>\
    <!--custom product area end-->'
    },
    b11: function () {
    },
    b12: function (pro) {
        var arr1 = [], arr2 = [], str = '';
        for (var i = 1; i < pro.length; i++) {
            str = '\
			<article class="single_product bg-product">\
				<figure>\
					<div class="product_thumb h230 border">\
							<a class="primary_img" href="/p/item/'+ pro[i].id + '.html"><img src="' + pro[i].pic1 + '_250x250.jpg" alt=""></a>\
							'+ Tool.action_links() + '\
					</div>\
					<figcaption class="product_content">\
							<h4 class="product_name"><a href="/p/item/'+ pro[i].id + '.html" title="' + pro[i].name + '">' + pro[i].name + '</a></h4>\
							<p>\
								'+ pro[i].SaleNum + ' sold\
								<span style="width: 1.25px; height: 8.75px; margin: 1.25px 10px; border-left: 1.25px solid rgb(204, 204, 204);"></span>\
								'+ pro[i].Review + ' stars\
							</p>\
							<div class="price_box"> \
									<span class="current_price">US $'+ (pro[i].minprice * ((100 - pro[i].Discount) * 0.01)).toFixed(2) + '</span>\
									'+ (pro[i].Discount == 0 ? '' : '<span class="old_price">US $' + pro[i].minprice.toFixed(2) + '</span>') + '\
							</div>\
					</figcaption>\
				</figure>\
			</article>'
            if (i % 2 == 0) { arr2.push(str); }
            else { arr1.push(str); }
        }
        ////////////////////////////////////////
        str = ''
        for (i = 0; i < arr1.length; i++) {
            str += '<div class="product_items mb-1">' + arr1[i] + arr2[i] + '</div>'
        }
        return str;
    },
    b13: function (pro) { },
    b14: function (pro) { },
    b15: function (pro) {
        var str = ''
        for (var i = 1; i < pro.length; i++) {
            str += '\
			<article class="single_product bg-product mb-2">\
				<figure>\
						<div class="product_thumb h230 border">\
								<a class="primary_img" href="/p/item/'+ pro[i].id + '.html"><img src="' + pro[i].pic1 + '_250x250.jpg" alt=""></a>\
								<div class="product_timing">\
										<div data-countdown="2021/12/15"></div>\
								</div>\
								'+ Tool.action_links() + '\
						</div>\
						<figcaption class="product_content">\
								<h4 class="product_name"><a href="/p/item/'+ pro[i].id + '.html" title="' + pro[i].name + '">' + pro[i].name + '</a></h4>\
							<p>\
								'+ pro[i].SaleNum + ' sold\
								<span style="width: 1.25px; height: 8.75px; margin: 1.25px 10px; border-left: 1.25px solid rgb(204, 204, 204);"></span>\
								'+ pro[i].Review + ' stars\
							</p>\
							<div class="price_box"> \
									<span class="current_price">US $'+ (pro[i].minprice * ((100 - pro[i].Discount) * 0.01)).toFixed(2) + '</span>\
									'+ (pro[i].Discount == 0 ? '' : '<span class="old_price">US $' + pro[i].minprice.toFixed(2) + '</span>') + '\
							</div>\
						</figcaption>\
				</figure>\
			</article>'
        }
        return str;
    },
    b16: function (pro) {
        var arr1 = [], arr2 = [], arr3 = [], str = ''
        for (var i = 1; i < pro.length; i++) {
            str = '\
			<article class="single_product bg-product mb-4 ml-1">\
				<figure>\
						<div class="product_thumb h120 border">\
								<a class="primary_img" href="/p/item/'+ pro[i].id + '.html"><img src="' + pro[i].pic1 + '_140x140.jpg" alt=""></a>\
						</div>\
						<figcaption class="product_content mt-3">\
								<h4 class="product_name"><a href="/p/item/'+ pro[i].id + '.html">' + pro[i].name + '</a></h4>\
								<p>\
									'+ pro[i].SaleNum + ' sold\
									<span style="width: 1.25px; height: 8.75px; margin: 1.25px 10px; border-left: 1.25px solid rgb(204, 204, 204);"></span>\
									'+ pro[i].Review + ' stars\
								</p>\
								'+ Tool.action_links() + '\
								<div class="price_box"> \
									<span class="current_price">US $'+ (pro[i].minprice * ((100 - pro[i].Discount) * 0.01)).toFixed(2) + '</span>\
									'+ (pro[i].Discount == 0 ? '' : '<span class="old_price">US $' + pro[i].minprice.toFixed(2) + '</span>') + '\
								</div>\
						</figcaption>\
				</figure>\
			</article>'
            if (i % 3 == 0) { arr1.push(str); }
            else if (i % 3 == 1) { arr2.push(str); }
            else { arr3.push(str) }
        }
        str = ''
        for (var i = 0; i < arr1.length; i++) {
            str += '<div class="product_items">' + arr1[i] + arr2[i] + arr3[i] + '</div>'
        }
        return str;
    },
    b17: function (pro) {
        var str = '';
        for (var i = 1; i < pro.length; i++) {
            str += '\
			<article class="single_product bg-product mb-2">\
					<figure>\
							<div class="product_thumb border h230">\
									<a class="primary_img" href="/p/item/'+ pro[i].id + '.html"><img src="' + pro[i].pic1 + '_250x250.jpg" alt=""></a>\
									'+ Tool.action_links() + '\
							</div>\
							<figcaption class="product_content">\
									<h4 class="product_name"><a href="/p/item/'+ pro[i].id + '.html">' + pro[i].name + '</a></h4>\
									<p>\
										'+ pro[i].SaleNum + ' sold\
										<span style="width: 1.25px; height: 8.75px; margin: 1.25px 10px; border-left: 1.25px solid rgb(204, 204, 204);"></span>\
										'+ pro[i].Review + ' stars\
									</p>\
									<div class="price_box"> \
										<span class="current_price">US $'+ (pro[i].minprice * ((100 - pro[i].Discount) * 0.01)).toFixed(2) + '</span>\
										'+ (pro[i].Discount == 0 ? '' : '<span class="old_price">US $' + pro[i].minprice.toFixed(2) + '</span>') + '\
									</div>\
							</figcaption>\
					</figure>\
			</article>'
        }
        return str;
    },
    b18: function (pro) {
        var str = '';
        for (var i = 1; i < pro.length; i++) {
            str += '\
			<div class="col-lg-3">\
				<article class="single_blog">\
					<figure>\
							<div class="blog_thumb">\
									<a href="/p/item/'+ pro[i].id + '.html"><img src="' + pro[i].pic1 + '_640x640.jpg" alt=""></a>\
							</div>\
							<figcaption class="blog_content">\
								 <div class="articles_date">\
									<div class="price_box"> \
										<span class="current_price">US $'+ (pro[i].minprice * ((100 - pro[i].Discount) * 0.01)).toFixed(2) + '</span>\
										<span style="width: 1.25px; height: 8.75px; margin: 1.25px 10px; border-left: 1.25px solid rgb(204, 204, 204);"></span>\
										'+ (pro[i].Discount == 0 ? '' : '<span class="old_price">US $' + pro[i].minprice.toFixed(2) + '</span>') + '\
										<span style="width: 1.25px; height: 8.75px; margin: 1.25px 10px; border-left: 1.25px solid rgb(204, 204, 204);"></span>\
										'+ pro[i].SaleNum + ' sold\
										<span style="width: 1.25px; height: 8.75px; margin: 1.25px 10px; border-left: 1.25px solid rgb(204, 204, 204);"></span>\
										'+ pro[i].Review + ' stars\
									</div>\
									</div>\
									<h4 class="post_title"><a href="/p/item/'+ pro[i].id + '.html">' + pro[i].name + '</a></h4>\
									<footer class="blog_footer">\
											<a href="/p/item/'+ pro[i].id + '.html">Show more</a>\
									</footer>\
							</figcaption>\
					</figure>\
				</article>\
			</div>'
        }
        return str;
    },
    b19: function (pro) {
        var arr1 = [], arr2 = [], arr3 = [], str = ""
        for (var i = 1; i < pro.length; i++) {
            str = '\
			<article class="single_product bg-product mb-4">\
				<figure>\
						<div class="product_thumb border">\
								<a class="primary_img" href="/p/item/'+ pro[i].id + '.html"><img src="' + pro[i].pic1 + '_140x140.jpg" alt=""></a>\
						</div>\
						<figcaption class="product_content mt-3">\
								<h4 class="product_name"><a href="/p/item/'+ pro[i].id + '.html">' + pro[i].name + '</a></h4>\
								<p>\
										'+ pro[i].SaleNum + ' sold\
										<span style="width: 1.25px; height: 8.75px; margin: 1.25px 10px; border-left: 1.25px solid rgb(204, 204, 204);"></span>\
										'+ pro[i].Review + ' stars\
								</p>\
								'+ Tool.action_links() + '\
								<div class="price_box"> \
										<span class="current_price">US $'+ (pro[i].minprice * ((100 - pro[i].Discount) * 0.01)).toFixed(2) + '</span>\
										'+ (pro[i].Discount == 0 ? '' : '<span class="old_price">US $' + pro[i].minprice.toFixed(2) + '</span>') + '\
								</div>\
						</figcaption>\
				</figure>\
			</article>'
            if (i % 3 == 0) { arr1.push(str); }
            else if (i % 3 == 1) { arr2.push(str); }
            else { arr3.push(str) }
        }
        str = ''
        for (var i = 0; i < arr1.length; i++) {
            str += '<div class="product_items">' + arr1[i] + arr2[i] + arr3[i] + '</div>'
        }
        return str;
    },
    dataBackgroundImage: function ()//轮播图给背景
    {
        $('[data-bgimg]').each(function () {
            var bgImgUrl = $(this).data('bgimg');
            $(this).css({
                'background-image': 'url(' + bgImgUrl + ')', // + meaning concat
            });
        });

    },
    c01: function () {
        this.dataBackgroundImage();//轮播图给背景

        ////////////////////////////////
        /*---slider activation 轮播图---*/
        var $slider = $('.slider_area');
        if ($slider.length > 0) {
            $slider.owlCarousel({
                animateOut: 'fadeOut',
                autoplay: true,
                loop: true,
                nav: false,
                autoplay: false,
                autoplayTimeout: 8000,
                items: 1,
                dots: true,
            });
        }
        /*---product column6 activation---*/
        var $porductColumn5 = $('.product_column5');
        if ($porductColumn5.length > 0) {
            $porductColumn5.on('changed.owl.carousel initialized.owl.carousel', function (event) {
                $(event.target).find('.owl-item').removeClass('last').eq(event.item.index + event.page.size - 1).addClass('last')
            }).owlCarousel({
                autoplay: true,
                loop: true,
                nav: true,
                autoplay: false,
                autoplayTimeout: 8000,
                items: 6,
                margin: 20,
                dots: false,
                navText: ['<i class="ion-ios-arrow-left"></i>', '<i class="ion-ios-arrow-right"></i>'],
                responsiveClass: true,
                responsive:
                {
                    0: { items: 1 },
                    375: { items: 2 },
                    768: { items: 3 },
                    992: { items: 4 },
                    1200: { items: 5 },
                    1500: { items: 6 }
                }
            });
        }
        /*---product column3 activation---*/
        var $productColumn3 = $('.product_column3');
        if ($productColumn3.length > 0) {
            $productColumn3.on('changed.owl.carousel initialized.owl.carousel', function (event) {
                $(event.target).find('.owl-item').removeClass('last').eq(event.item.index + event.page.size - 1).addClass('last')
            }).owlCarousel({
                autoplay: true,
                loop: true,
                nav: true,
                autoplay: false,
                autoplayTimeout: 8000,
                items: 3,
                dots: false,
                margin: 20,
                navText: ['<i class="ion-ios-arrow-left"></i>', '<i class="ion-ios-arrow-right"></i>'],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    768: {
                        items: 2,
                    },
                    992: {
                        items: 3,
                    },
                    1200: {
                        items: 4,
                    },
                }
            });
        }
        /*---product column2 activation---*/
        var $productColumn2 = $('.product_column2');
        if ($productColumn2.length > 0) {
            $productColumn2.on('changed.owl.carousel initialized.owl.carousel', function (event) {
                $(event.target).find('.owl-item').removeClass('last').eq(event.item.index + event.page.size - 1).addClass('last')
            }).owlCarousel({
                autoplay: true,
                loop: true,
                nav: false,
                autoplay: false,
                autoplayTimeout: 8000,
                items: 2,
                dots: false,
                margin: 20,
                responsiveClass: true,
                responsive: {
                    0: { items: 1 },
                    768: { items: 1 },
                    992: { items: 2 },
                    1200: { items: 3 }
                }
            });
        }
        /*---blog column3 activation---*/
        var $blogColumn3 = $('.blog_column3');
        if ($blogColumn3.length > 0) {
            $('.blog_column3').owlCarousel({
                autoplay: true,
                loop: true,
                nav: true,
                autoplay: false,
                autoplayTimeout: 8000,
                items: 3,
                dots: false,
                navText: ['<i class="ion-ios-arrow-left"></i>', '<i class="ion-ios-arrow-right"></i>'],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    768: {
                        items: 2,
                    },
                    992: {
                        items: 3,
                    },
                }
            });
        }
        ///////////////////////////////
        $('.product_navactive a').on('click', function (e) {
            e.preventDefault();
            var $href = $(this).attr('href');
            $('.product_navactive a').removeClass('active');
            $(this).addClass('active');
            $('.product-details-large .tab-pane').removeClass('active show');
            $('.product-details-large ' + $href).addClass('active show');
        })
        /*---countdown activation---*/
        $('[data-countdown]').each(function () {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function (event) {
                $this.html(event.strftime('<div class="countdown_area"><div class="single_countdown"><div class="countdown_number">%D</div><div class="countdown_title">day</div></div><div class="single_countdown"><div class="countdown_number">%H</div><div class="countdown_title">hour</div></div><div class="single_countdown"><div class="countdown_number">%M</div><div class="countdown_title">min</div></div><div class="single_countdown"><div class="countdown_number">%S</div><div class="countdown_title">sec</div></div></div>'));
            });
        });
        /*---Newsletter Popup activation---*/
        setTimeout(function () {
            if ($.cookie('shownewsletter') == 1) $('.newletter-popup').hide();
            $('#subscribe_pemail').keypress(function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                    email_subscribepopup();
                }
                var name = $(this).val();
                $('#subscribe_pname').val(name);
            });
            $('#subscribe_pemail').change(function () {
                var name = $(this).val();
                $('#subscribe_pname').val(name);
            });
            //transition effect
            if ($.cookie("shownewsletter") != 1) {
                $('.newletter-popup').bPopup();
            }
            $('#newsletter_popup_dont_show_again').on('change', function () {
                if ($.cookie("shownewsletter") != 1) {
                    $.cookie("shownewsletter", '1')
                } else {
                    $.cookie("shownewsletter", '0')
                }
            });
        }, 2500);
        /*---slide toggle activation---*/
        /*---canvas menu activation---*/
        /*---Off Canvas Menu---*/
    },
    popup: function () {
        return '\
		<!--news letter popup start-->\
    <div class="newletter-popup">\
      <div id="boxes" class="newletter-container">\
          <div id="dialog" class="window">\
              <div id="popup2">\
                  <span class="b-close"><span>close</span></span>\
              </div>\
              <div class="box">\
                  <div class="newletter-title">\
                      <h2>Newsletter</h2>\
                  </div>\
                  <div class="box-content newleter-content">\
                      <label class="newletter-label">Enter your email address to subscribe our notification of our new post &amp; features by email.</label>\
                      <div id="frm_subscribe">\
                          <form name="subscribe" id="subscribe_popup">\
                                  <input type="text" value="" name="subscribe_pemail" id="subscribe_pemail" placeholder="Enter you email address here...">\
                                  <input type="hidden" value="" name="subscribe_pname" id="subscribe_pname">\
                                  <div id="notification"></div>\
                                  <a class="theme-btn-outlined" onclick="email_subscribepopup()"><span>Subscribe</span></a>\
                          </form>\
                          <div class="subscribe-bottom">\
                              <input type="checkbox" id="newsletter_popup_dont_show_again">\
                              <label for="newsletter_popup_dont_show_again">Don\'t show this popup again</label>\
                          </div>\
                      </div>\
                  </div>\
              </div>\
          </div>\
      </div>\
    </div>\
    <!--news letter popup start-->'
    },
    modal: function () {
        return '\
		<!-- modal area start-->\
    <div class="modal fade" id="modal_box" tabindex="-1" role="dialog"  aria-hidden="true">\
        <div class="modal-dialog modal-dialog-centered" role="document">\
            <div class="modal-content">\
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                  <span aria-hidden="true"><i class="icon-x"></i></span>\
                </button>\
                <div class="modal_body">\
                    <div class="container">\
                        <div class="row">\
                            <div class="col-lg-5 col-md-5 col-sm-12">\
                                <div class="modal_tab">  \
                                    <div class="tab-content product-details-large">\
                                        <div class="tab-pane fade show active" id="tab1" role="tabpanel" >\
                                            <div class="modal_tab_img">\
                                                <a href="#"><img src="'+ o.path + 'html/product/img/product/productbig1.jpg" alt=""></a>    \
                                            </div>\
                                        </div>\
                                        <div class="tab-pane fade" id="tab2" role="tabpanel">\
                                            <div class="modal_tab_img">\
                                                <a href="#"><img src="'+ o.path + 'html/product/img/product/productbig2.jpg" alt=""></a>    \
                                            </div>\
                                        </div>\
                                        <div class="tab-pane fade" id="tab3" role="tabpanel">\
                                            <div class="modal_tab_img">\
                                                <a href="#"><img src="'+ o.path + 'html/product/img/product/productbig3.jpg" alt=""></a>    \
                                            </div>\
                                        </div>\
                                        <div class="tab-pane fade" id="tab4" role="tabpanel">\
                                            <div class="modal_tab_img">\
                                                <a href="#"><img src="'+ o.path + 'html/product/img/product/productbig4.jpg" alt=""></a>    \
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="modal_tab_button">    \
                                        <ul class="nav product_navactive owl-carousel" role="tablist">\
                                            <li >\
                                                <a class="nav-link active" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="false"><img src="'+ o.path + 'html/product/img/product/product1.jpg" alt=""></a>\
                                            </li>\
                                            <li>\
                                                 <a class="nav-link" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false"><img src="'+ o.path + 'html/product/img/product/product6.jpg" alt=""></a>\
                                            </li>\
                                            <li>\
                                               <a class="nav-link button_three" data-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false"><img src="'+ o.path + 'html/product/img/product/product2.jpg" alt=""></a>\
                                            </li>\
                                            <li>\
                                               <a class="nav-link" data-toggle="tab" href="#tab4" role="tab" aria-controls="tab4" aria-selected="false"><img src="'+ o.path + 'html/product/img/product/product7.jpg" alt=""></a>\
                                            </li>\
\
                                        </ul>\
                                    </div>    \
                                </div>  \
                            </div> \
                            <div class="col-lg-7 col-md-7 col-sm-12">\
                                <div class="modal_right">\
                                    <div class="modal_title mb-10">\
                                        <h2>Donec Ac Tempus</h2> \
                                    </div>\
                                    <div class="modal_price mb-10">\
                                        <span class="new_price">$64.99</span>    \
                                        <span class="old_price" >$78.99</span>    \
                                    </div>\
                                    <div class="modal_description mb-15">\
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia iste laborum ad impedit pariatur esse optio tempora sint ullam autem deleniti nam in quos qui nemo ipsum numquam, reiciendis maiores quidem aperiam, rerum vel recusandae </p>    \
                                    </div> \
                                    <div class="variants_selects">\
                                        <div class="variants_size">\
                                           <h2>size</h2>\
                                           <select class="select_option">\
                                               <option selected value="1">s</option>\
                                               <option value="1">m</option>\
                                               <option value="1">l</option>\
                                               <option value="1">xl</option>\
                                               <option value="1">xxl</option>\
                                           </select>\
                                        </div>\
                                        <div class="variants_color">\
                                           <h2>color</h2>\
                                           <select class="select_option">\
                                               <option selected value="1">purple</option>\
                                               <option value="1">violet</option>\
                                               <option value="1">black</option>\
                                               <option value="1">pink</option>\
                                               <option value="1">orange</option>\
                                           </select>\
                                        </div>\
                                        <div class="modal_add_to_cart">\
                                            <form action="#">\
                                                <input min="1" max="100" step="2" value="1" type="number">\
                                                <button type="submit">add to cart</button>\
                                            </form>\
                                        </div>   \
                                    </div>\
                                    <div class="modal_social">\
                                        <h2>Share this product</h2>\
                                        <ul>\
                                            <li class="facebook"><a href="#"><i class="fa fa-facebook"></i></a></li>\
                                            <li class="twitter"><a href="#"><i class="fa fa-twitter"></i></a></li>\
                                            <li class="pinterest"><a href="#"><i class="fa fa-pinterest"></i></a></li>\
                                            <li class="google-plus"><a href="#"><i class="fa fa-google-plus"></i></a></li>\
                                            <li class="linkedin"><a href="#"><i class="fa fa-linkedin"></i></a></li>\
                                        </ul>    \
                                    </div>      \
                                </div>    \
                            </div>    \
                        </div>     \
                    </div>\
                </div>    \
            </div>\
        </div>\
    </div>\
    <!-- modal area end-->'
    }
}
$(function () { fun.a01(); });