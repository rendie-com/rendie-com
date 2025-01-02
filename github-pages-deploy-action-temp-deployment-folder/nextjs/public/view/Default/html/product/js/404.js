"use strict";
var fun={
  a01:function()
  {
		Tool.ajax(this.a02,"",this,"/html/product/html/self/ajax_common.js");
  },
  a02:function(oo) 
  {
      
		$("body").html(
			Tool.header(oo)+
			this.b01()+
			Tool.footer()
		);
		Tool.c01();
  },
  b01:function() 
  {
		return '\
		<!--error section area start-->\
    <div class="error_section">\
        <div class="container">   \
            <div class="row">\
                <div class="col-12">\
                    <div class="error_form">\
                        <h1>404</h1>\
                        <h2>Opps! PAGE NOT BE FOUND</h2>\
                        <p>Sorry but the page you are looking for does not exist, have been<br> removed, name changed or is temporarily unavailable.</p>\
                        <a href="/">Back to home page</a>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
    <!--error section area end-->'
  }
}
fun.a01();