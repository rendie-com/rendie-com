'use strict';
Object.assign(Tool, {
    header: function (common, keys, type1) {
        return '\
		<!--offcanvas menu area start-->\
      <div class="off_canvars_overlay"></div>\
				<div class="offcanvas_menu">\
          <div class="container">\
              <div class="row">\
                  <div class="col-12">\
                      <div class="canvas_open">\
                          <a href="javascript:void(0)"><i class="icon-menu"></i></a>\
                      </div>\
                      <div class="offcanvas_menu_wrapper">\
                          <div class="canvas_close">\
                              <a href="javascript:void(0)"><i class="icon-x"></i></a>  \
                          </div>\
                          <div class="search_container">\
                             <form>\
                                  <div class="search_box">\
                                      <input placeholder="Search product..." type="text">\
                                       <button type="button"><span class="lnr lnr-magnifier"></span></button>\
                                  </div>\
                                 <div class="hover_category">\
                                   <select class="select_option" name="select" id="categori1">'+ this.b01(common.type, type1) + '</select>\
                                 </div>\
                              </form>\
                          </div>\
                          <div class="header_account_area">\
                              <div class="header_account_list register">\
                                  <ul>\
                                      <li><a href="/p/self/login.html">Register</a></li>\
                                      <li><span>/</span></li>\
                                      <li><a href="/p/self/login.html">Login</a></li>\
                                  </ul>\
                              </div>\
                              <div class="header_account_list header_wishlist">\
                                  <a href="/p/self/wishlist.html"><span class="lnr lnr-heart"></span> <span class="item_count">3</span> </a>\
                              </div>\
                              <div class="header_account_list  mini_cart_wrapper">\
                                 <a href="javascript:void(0)"><span class="lnr lnr-cart"></span><span class="item_count">2</span></a>\
                                  <!--mini cart-->\
                                  <div class="mini_cart">\
                                      <div class="cart_gallery">\
                                          <div class="cart_item">\
                                             <div class="cart_img">\
                                                 <a href="#"><img src="'+ o.path + 'html/product/img/s-product/product.jpg" alt=""></a>\
                                             </div>\
                                              <div class="cart_info">\
                                                  <a href="#">Primis In Faucibus</a>\
                                                  <p>1 x <span> $65.00 </span></p>    \
                                              </div>\
                                              <div class="cart_remove">\
                                                  <a href="#"><i class="icon-x"></i></a>\
                                              </div>\
                                          </div>\
                                          <div class="cart_item">\
                                             <div class="cart_img">\
                                                 <a href="#"><img src="'+ o.path + 'html/product/img/s-product/product2.jpg" alt=""></a>\
                                             </div>\
                                              <div class="cart_info">\
                                                  <a href="#">Letraset Sheets</a>\
                                                  <p>1 x <span> $60.00 </span></p>    \
                                              </div>\
                                              <div class="cart_remove">\
                                                  <a href="#"><i class="icon-x"></i></a>\
                                              </div>\
                                          </div>\
                                      </div>\
                                      <div class="mini_cart_table">\
                                          <div class="cart_table_border">\
                                              <div class="cart_total">\
                                                  <span>Sub total:</span>\
                                                  <span class="price">$125.00</span>\
                                              </div>\
                                              <div class="cart_total mt-10">\
                                                  <span>total:</span>\
                                                  <span class="price">$125.00</span>\
                                              </div>\
                                          </div>\
                                      </div>\
                                      <div class="mini_cart_footer">\
                                         <div class="cart_button">\
                                              <a href="cart.html"><i class="fa fa-shopping-cart"></i> View cart</a>\
                                          </div>\
                                          <div class="cart_button">\
                                              <a href="checkout.html"><i class="fa fa-sign-in"></i> Checkout</a>\
                                          </div>\
                                      </div>\
                                  </div>\
                                  <!--mini cart end-->\
                             </div>\
                          </div>\
                          <div id="menu" class="text-left ">\
                              <ul class="offcanvas_main_menu">\
                                  <li class="menu-item-has-children active">\
                                      <a href="#">Home</a>\
                                      <ul class="sub-menu">\
                                          <li><a href="index.html">Home 1</a></li>\
                                          <li><a href="index-2.html">Home 2</a></li>\
                                          <li><a href="index-3.html">Home 3</a></li>\
                                          <li><a href="index-4.html">Home 4</a></li>\
                                      </ul>\
                                  </li>\
                                  <li class="menu-item-has-children">\
                                      <a href="#">Shop</a>\
                                      <ul class="sub-menu">\
                                          <li class="menu-item-has-children">\
                                              <a href="#">Shop Layouts</a>\
                                              <ul class="sub-menu">\
                                                  <li><a href="shop.html">shop</a></li>\
                                                  <li><a href="shop-fullwidth.html">Full Width</a></li>\
                                                  <li><a href="shop-fullwidth-list.html">Full Width list</a></li>\
                                                  <li><a href="shop-right-sidebar.html">Right Sidebar </a></li>\
                                                  <li><a href="shop-right-sidebar-list.html"> Right Sidebar list</a></li>\
                                                  <li><a href="shop-list.html">List View</a></li>\
                                              </ul>\
                                          </li>\
                                          <li class="menu-item-has-children">\
                                              <a href="#">other Pages</a>\
                                              <ul class="sub-menu">\
                                                  <li><a href="/p/self/cart.html">cart</a></li>\
                                                  <li><a href="/p/self/wishlist.html">Wishlist</a></li>\
                                                  <li><a href="/p/self/checkout.html">Checkout</a></li>\
                                                  <li><a href="my-account.html">my account</a></li>\
                                                  <li><a href="/p/self/404.html">Error 404</a></li>\
                                              </ul>\
                                          </li>\
                                          <li class="menu-item-has-children">\
                                              <a href="#">Product Types</a>\
                                              <ul class="sub-menu">\
                                                  <li><a href="product-details.html">product details</a></li>\
                                                  <li><a href="product-sidebar.html">product sidebar</a></li>\
                                                  <li><a href="product-grouped.html">product grouped</a></li>\
                                                  <li><a href="variable-product.html">product variable</a></li>\
                                              </ul>\
                                          </li>\
                                      </ul>\
                                  </li>\
                                  <li class="menu-item-has-children">\
                                      <a href="#">blog</a>\
                                      <ul class="sub-menu">\
                                          <li><a href="blog.html">blog</a></li>\
                                          <li><a href="blog-details.html">blog details</a></li>\
                                          <li><a href="blog-fullwidth.html">blog fullwidth</a></li>\
                                          <li><a href="blog-sidebar.html">blog sidebar</a></li>\
                                      </ul>\
                                  </li>\
                                  <li class="menu-item-has-children">\
                                      <a href="#">pages </a>\
                                      <ul class="sub-menu">\
                                          <li><a href="about.html">About Us</a></li>\
                                          <li><a href="services.html">services</a></li>\
                                          <li><a href="faq.html">Frequently Questions</a></li>\
                                          <li><a href="contact.html">contact</a></li>\
                                          <li><a href="login.html">login</a></li>\
                                          <li><a href="404.html">Error 404</a></li>\
                                      </ul>\
                                  </li>\
                                  <li class="menu-item-has-children">\
                                      <a href="my-account.html">my account</a>\
                                  </li>\
                                  <li class="menu-item-has-children">\
                                      <a href="about.html">about Us</a>\
                                  </li>\
                                  <li class="menu-item-has-children">\
                                      <a href="contact.html"> Contact Us</a> \
                                  </li>\
                              </ul>\
                          </div>\
                          <div class="offcanvas_footer">\
                              <span><a href="#"><i class="fa fa-envelope-o"></i> info@rendie.com</a></span>\
                          </div>\
                      </div>\
                  </div>\
              </div>\
          </div>\
      </div>\
    <!--offcanvas menu area end-->\
    <header>\
		  <div class="main_header">\
          <div class="header_top">\
                <div class="container">\
                    <div class="row align-items-center">\
                        <div class="col-lg-12">\
                            <div class="header_social text-right">\
                                <ul>\
                                    <li><a href="#"><i class="ion-social-twitter"></i></a></li>\
                                    <li><a href="#"><i class="ion-social-googleplus-outline"></i></a></li>\
                                    <li><a href="#"><i class="ion-social-youtube-outline"></i></a></li>\
                                    <li><a href="#"><i class="ion-social-facebook"></i></a></li>\
                                    <li><a href="#"><i class="ion-social-instagram-outline"></i></a></li>\
                                </ul>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
						<div class="header_middle">\
              <div class="container">\
                  <div class="row align-items-center">\
                      <div class="col-lg-2">\
                          <div class="logo ml-3">\
                              <a href="/"><img src="'+ o.path + 'html/product/img/logo/logo.png" alt=""></a>\
													</div>\
                      </div>\
                      <div class="col-lg-10">\
                          <div class="header_right_info">\
                              <div class="search_container">\
                                 <form1>\
                                     <div class="hover_category">\
                                       <select class="select_option" id="category">'+ this.b01(common.type, type1) + '</select>\
                                     </div>\
                                      <div class="search_box">\
                                          <input placeholder="Search product..." value="'+ (keys ? keys : '') + '" type="text">\
                                          <button type="button"><span class="lnr lnr-magnifier"></span></button>\
                                      </div>\
															</form1>\
															<div class="hot-words">\
																<a href="/p/list/'+ this.JSONescape({ keys: "pin" }) + '">pin</a>\
																<a href="/p/list/'+ this.JSONescape({ keys: "jewelry" }) + '">jewelry</a>\
																<a href="/p/list/'+ this.JSONescape({ keys: "sports" }) + '">sports</a>\
																<a href="/p/list/'+ this.JSONescape({ keys: "consumer electronics" }) + '">consumer electronics</a>\
																<a href="/p/list/'+ this.JSONescape({ keys: "high quality jewelry" }) + '">high quality jewelry</a>\
																<a href="/p/list/'+ this.JSONescape({ keys: "Tools" }) + '">Tools</a>\
																<a href="/p/list/'+ this.JSONescape({ keys: "ring" }) + '">ring</a>\
																<a href="/p/list/'+ this.JSONescape({ keys: "necklace" }) + '">necklace</a>\
																<a href="/p/list/'+ this.JSONescape({ keys: "jewelry" }) + '">jewelry</a>\
															</div>\
                             </div>\
                              <div class="header_account_area">\
                                   <div class="header_account_list register">\
																			<ul>\
																					<li><a href="/p/self/login.html">Register</a></li>\
																					<li><span>/</span></li>\
																					<li><a href="/p/self/login.html">Login</a></li>\
																			</ul>\
																	</div>\
                                  <div class="header_account_list header_wishlist">\
                                      <a href="/p/self/wishlist.html"><span class="lnr lnr-heart"></span> <span class="item_count">3</span> </a>\
                                  </div>\
                                  <div class="header_account_list  mini_cart_wrapper">\
                                     <a href="javascript:void(0)"><span class="lnr lnr-cart"></span><span class="item_count">2</span></a>\
                                      <!--mini cart-->\
                                      <div class="mini_cart">\
                                          <div class="cart_gallery">\
                                              <div class="cart_item">\
                                                 <div class="cart_img">\
                                                     <a href="#"><img src="'+ o.path + 'html/product/img/s-product/product.jpg" alt=""></a>\
                                                 </div>\
                                                  <div class="cart_info">\
                                                      <a href="#">Primis In Faucibus</a>\
                                                      <p>1 x <span> $65.00 </span></p>    \
                                                  </div>\
                                                  <div class="cart_remove">\
                                                      <a href="#"><i class="icon-x"></i></a>\
                                                  </div>\
                                              </div>\
                                              <div class="cart_item">\
                                                 <div class="cart_img">\
                                                     <a href="#"><img src="'+ o.path + 'html/product/img/s-product/product2.jpg" alt=""></a>\
                                                 </div>\
                                                  <div class="cart_info">\
                                                      <a href="#">Letraset Sheets</a>\
                                                      <p>1 x <span> $60.00 </span></p>    \
                                                  </div>\
                                                  <div class="cart_remove">\
                                                      <a href="#"><i class="icon-x"></i></a>\
                                                  </div>\
                                              </div>\
                                          </div>\
                                          <div class="mini_cart_table">\
                                              <div class="cart_table_border">\
                                                  <div class="cart_total">\
                                                      <span>Sub total:</span>\
                                                      <span class="price">$125.00</span>\
                                                  </div>\
                                                  <div class="cart_total mt-10">\
                                                      <span>total:</span>\
                                                      <span class="price">$125.00</span>\
                                                  </div>\
                                              </div>\
                                          </div>\
                                          <div class="mini_cart_footer">\
                                             <div class="cart_button">\
                                                  <a href="cart.html"><i class="fa fa-shopping-cart"></i> View cart</a>\
                                              </div>\
                                              <div class="cart_button">\
                                                  <a href="checkout.html"><i class="fa fa-sign-in"></i> Checkout</a>\
                                              </div>\
                                          </div>\
                                      </div>\
                                      <!--mini cart end-->\
                                 </div>\
                              </div>\
                          </div>\
                      </div>\
                  </div>\
              </div>\
          </div>\
          <div class="sticky-header">\
              <div class="container">  \
                  <div class="row align-items-center">\
                      <div class="col-lg-3">\
                          <div class="categories_menu">\
                              <div class="categories_title">\
                                  <h2 class="categori_toggle">Categories</h2>\
                              </div>\
                              <div class="categories_menu_toggle border">\
                                  <ul>'+ this.b02(common) + '</ul>\
                              </div>\
                          </div>\
                      </div>\
                      <div class="col-lg-9">\
                          <!--main menu start-->\
                          <div class="main_menu menu_position"> \
                              <nav>  \
                                  <ul>\
                                      <li><a href="#">Flash Deals</a></li>\
                                      <li><a href="#">7 Days Delivery</a></li>\
                                      <li><a href="#">Super Deals</a></li>\
                                  </ul>  \
                              </nav> \
                          </div>\
                          <!--main menu end-->\
                      </div>\
                  </div>\
              </div>\
          </div>\
      </div>\
		</header>'
/*   

                                   <li><a href="#">Top rankings</a></li>\
                                      <li><a href="#">Today\'s Deals</a></li>\
                                      <li><a href="#">Just For You</a></li>\
*/	},
    b01: function (type, fromID) {
        var str = '<option ' + (fromID == 0 ? 'selected' : '') + ' value="0">All Categories</option>'
        for (var i = 1; i < type.length; i++) {
            str += '<option value="' + type[i].fromID + '" ' + (type[i].fromID == fromID ? 'selected' : '') + '>' + type[i].enname + '</option>'
        }
        return str;
    },
    b02: function (common) {
        var str = '', str1, list1, list2, str2, len1 = 0, len2 = 0;
        for (var i = 1; i < common.type.length; i++) {
            str1 = '';
            list1 = common.type[i].list
            if (list1.length != 1) {
                if (list1.length > 4) { len1 = 4 } else { len1 = list1.length; }
                for (var j = 1; j < len1; j++) {
                    str2 = '';
                    list2 = list1[j].list;
                    if (list2.length > 7) { len2 = 7; } else { len2 = list2.length; }
                    for (var k = 1; k < len2; k++) {
                        str2 += '<li><a href="/p/list/' + this.JSONescape({ type: [0, 0, list2[k].fromID, 0] }) + '">' + list2[k].enname + ' (' + this.toThousands(list2[k].sort) + ')</a></li>'
                    }
                    str1 += '\
					<li class="menu_item_children"><a href="/p/list/'+ this.JSONescape({ type: [0, list1[j].fromID, 0, 0] }) + '"><b>' + list1[j].enname + ' (' + this.toThousands(list1[j].sort) + ')</b></a>\
							<ul class="categorie_sub_menu">'+ str2 + '</ul>\
					</li>'
                }
                str2 = '<ul class="categories_mega_menu border">' + str1 + '</ul>'
                str += '<li class="menu_item_children"><a href="/p/list/' + this.JSONescape({ type: [common.type[i].fromID, 0, 0, 0] }) + '" title="' + this.toThousands(common.type[i].sort) + ' results">' + common.type[i].enname + '<i class="fa fa-angle-right"></i></a>' + str2 + '</li>'
            }
            else { break; }
        }
        return str;
    },
    c01: function () {
        var cache = {}, This = this;
        $(".search_box button").on("click", function () {
            This.search($(this).prev().val(), $(this).parent().prev().find("select option:selected").val());
        });//搜索按扭
        $(".search_box input").on("keydown", function (event)//搜索输入框
        {
            if (event.keyCode === $.ui.keyCode.ENTER) {
                This.search(this.value, $(this).parent().prev().find("select option:selected").val());
                event.preventDefault();
            }
        }).autocomplete({
            source: function (request, response) {
                var term = request.term;
                if (term in cache) {
                    response(cache[term]);
                    return;
                }
                $.getJSON("/p/self/ajax_autocomplete.html/" + encodeURIComponent(term), request, function (data, status, xhr) {
                    data.shift();
                    cache[term] = data;
                    response(data);
                });
            },
            select: function (event, ui) {
                This.search(ui.item.value, $(this).parent().prev().find("select option:selected").val());
                return true;
            }
        });
        ///////////////////////////////
        new WOW().init();
        /*---stickey menu 固定在顶部---*/
        $(window).on('scroll', function () {
            var scroll = $(window).scrollTop();
            if (scroll < 100) {
                $(".sticky-header").removeClass("sticky");
            } else {
                $(".sticky-header").addClass("sticky");
            }
        });
        ////////////////////////////////
        /*---categories slideToggle---*/
        $(".categories_title").on("click", function () {
            $(this).toggleClass('active');
            $('.categories_menu_toggle').slideToggle('medium');
        });
        /*--- niceSelect---*/
        $('.select_option').niceSelect();
        /*---  ScrollUp Active ---*/
        $.scrollUp({
            scrollText: '<i class="fa fa-angle-double-up"></i>',
            easingType: 'linear',
            scrollSpeed: 900,
            animation: 'fade'
        });
        $('.mini_cart_wrapper > a').on('click', function (event) {
            if ($(window).width() < 991) {
                $('.mini_cart').slideToggle('medium');
            }
        });
        $('.canvas_open').on('click', function () {
            $('.offcanvas_menu_wrapper,.off_canvars_overlay').addClass('active')
        });
        $('.canvas_close,.off_canvars_overlay').on('click', function () {
            $('.offcanvas_menu_wrapper,.off_canvars_overlay').removeClass('active')
        });
        /*---header account slideToggle---*/
        $(".header_account > a").on("click", function () {
            $(this).toggleClass('active');
            $('.dropdown_account').slideToggle('medium');
        });
        var $offcanvasNav = $('.offcanvas_main_menu'),
            $offcanvasNavSubMenu = $offcanvasNav.find('.sub-menu');
        $offcanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="fa fa-angle-down"></i></span>');

        $offcanvasNavSubMenu.slideUp();

        $offcanvasNav.on('click', 'li a, li .menu-expand', function (e) {
            var $this = $(this);
            if (($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand'))) {
                e.preventDefault();
                if ($this.siblings('ul:visible').length) {
                    $this.siblings('ul').slideUp('slow');
                } else {
                    $this.closest('li').siblings('li').find('ul:visible').slideUp('slow');
                    $this.siblings('ul').slideDown('slow');
                }
            }
            if ($this.is('a') || $this.is('span') || $this.attr('clas').match(/\b(menu-expand)\b/)) {
                $this.parent().toggleClass('menu-open');
            } else if ($this.is('li') && $this.attr('class').match(/\b('menu-item-has-children')\b/)) {
                $this.toggleClass('menu-open');
            }
        });
        /*---MailChimp---
    	
    $('#mc-form').ajaxChimp({
        language: 'en',
        callback: Tool.mailChimpResponse,
        // ADD YOUR MAILCHIMP URL BELOW HERE!
        url: 'http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef'

    });*/
    },
    mailChimpResponse: function (resp) {
        if (resp.result === 'success') {
            $('.mailchimp-success').addClass('active')
            $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
            $('.mailchimp-error').fadeOut(400);
        }
        else if (resp.result === 'error') {
            $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
        }
    },
    action_links: function () {
        return '\
		<div class="action_links">\
			<ul>\
				<li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box"  title="quick view"><span class="lnr lnr-magnifier"></span></a></li>\
				<li class="wishlist"><a href="#" title="Add to Wishlist"><span class="lnr lnr-heart"></span></a></li>\
			</ul>\
		</div>'
    },
    toThousands: function (num)//给数字加逗号
    {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    footer: function () {
        return '\
		<!--footer area start-->\
    <footer class="footer_widgets footer_border">\
        <div class="footer_top">\
            <div class="container">\
                <div class="row">\
                    <div class="col-lg-4 col-md-12 col-sm-7">\
                        <div class="widgets_container contact_us">\
                           <div class="footer_logo">\
                               <a href="/"><img src="'+ o.path + 'html/product/img/logo/logo.png" alt=""></a>\
                           </div>\
                           <p class="footer_desc">RenDie provides a buyer protection plan, a secure refund policy, express delivery, and shipment tracking, and is committed to providing a fast, easy, and safe buying experience to businesses and consumers worldwide.</p>\
                        </div>\
                    </div>\
                    <div class="col-lg-2 col-md-3 col-sm-5">\
                        <div class="widgets_container widget_menu">\
                            <h3>Dispatch & Delivery</h3>\
                            <div class="footer_menu">\
                                <ul>\
                                    <li><a href="/p/self/Delivery-Options.html">Delivery Options</a></li>\
                                    <li><a href="/p/self/Customs-Import-Tax.html">Customs & Import Tax</a></li>\
                                    <li><a href="/p/self/Tracking-Your-Items.html">Tracking Your Items</a></li>\
                                </ul>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="col-lg-2 col-md-3 col-sm-4">\
                        <div class="widgets_container widget_menu">\
                            <h3>Refund & Return</h3>\
                            <div class="footer_menu">\
                                <ul>\
                                    <li><a href="/p/self/Dispute-Process.html">Dispute Process</a></li>\
                                </ul>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="col-lg-4 col-md-6 col-sm-8">\
                        <div class="widgets_container widget_newsletter">\
                            <h3>Sign up newsletter</h3>\
                            <p class="footer_desc">Get updates by subscribe our weekly newsletter</p>\
                            <div class="subscribe_form">\
                                <form id="mc-form" class="mc-form footer-newsletter" >\
                                    <input id="mc-email" type="email" autocomplete="off" placeholder="Enter you email" />\
                                    <button id="mc-submit">Subscribe</button>\
                                </form>                                \
                                <div class="mailchimp-alerts text-centre">\
                                    <div class="mailchimp-submitting"></div>\
                                    <div class="mailchimp-success"></div>\
                                    <div class="mailchimp-error"></div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
        <div class="footer_bottom">\
            <div class="container">\
                <div class="row align-items-center">\
                    <div class="col-lg-6 col-md-7">\
                        <div class="copyright_area">\
                            <p>Copyright &copy; 2022.Company name All rights reserved.</p>\
                        </div>\
                    </div>    \
                    <div class="col-lg-6 col-md-5">    \
                        <div class="footer_payment">\
                            <ul>\
                                <li><a href="#"><img src="'+ o.path + '/html/product/img/icon/paypal1.jpg" alt=""></a></li>\
                                <li><a href="#"><img src="'+ o.path + '/html/product/img/icon/paypal2.jpg" alt=""></a></li>\
                                <li><a href="#"><img src="'+ o.path + '/html/product/img/icon/paypal3.jpg" alt=""></a></li>\
                                <li><a href="#"><img src="'+ o.path + '/html/product/img/icon/paypal4.jpg" alt=""></a></li>\
                            </ul>\
                        </div>\
                    </div>\
                </div>\
             </div>   \
        </div>\
    </footer>\
    <!--footer area end-->'
    },
    page: function (count, size, arr4) {
        var pagelen = 8,
            page1 = Math.ceil(count / size),
            page2 = fun.arr[arr4],
            page3 = page2 - Math.ceil(pagelen / 2),
            str = "";
        //page1    	总页数
        //page2			当前页码
        //page3    	临时页码
        str = '<ul>'
        if (count > size) {
            if (page2 != 1) {
                str += '<li><a href="javascript:" onclick="Tool.pageTo(' + arr4 + ',1)">&#8249;&#8249;</a></li><li><a href="javascript:" onclick="Tool.pageTo(' + arr4 + ',' + (page2 - 1) + ')">&#8249; Previous</a></li>';
            }
            if (page3 < 1) { page3 = 1; }
            for (var z = page3; z <= (page3 + pagelen > page1 ? page1 : page3 + pagelen); z++) {
                if (z == page2) { str += '<li class="current">' + z + '</li>'; }
                else { str += '<li><a href="javascript:" onclick="Tool.pageTo(' + arr4 + ',' + z + ');">' + z + '</a></li>'; }
            }
            if (page2 != page1) {
                str += '<li><a href="javascript:" onclick="Tool.pageTo(' + arr4 + ',' + (page2 + 1) + ')">next &#8250;</a></li><li><a href="javascript:" onclick="Tool.pageTo(' + arr4 + ',' + page1 + ')">&#8250;&#8250;</a></li>';
            }
        }
        str = str + '</ul>'
        return str
    },
    arr: function () {
        var arr = location.href.split('/')
        arr.shift();
        arr.shift();
        arr.shift();
        return arr;
    },
    search: function (keys, type) {
        var oo = {}
        if (type == 0) { oo = { keys: keys } }
        else { oo = { type: [type, 0, 0, 0], keys: keys } }
        location.href = '/p/list/' + this.JSONescape(oo);
    } 
})