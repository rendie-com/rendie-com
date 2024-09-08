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
			this.b02()+
			Tool.footer()
		);
		Tool.c01();
  },
  b01:function() 
  {
		return '\
		<!--breadcrumbs area start-->\
    <div class="breadcrumbs_area">\
        <div class="container">\
            <div class="row">\
                <div class="col-12">\
                    <div class="breadcrumb_content">\
                        <ul>\
                            <li>Home</li>\
                            <li>Dispatch & Delivery</li>\
                            <li><b>Customs & Import Tax</b></li>\
                        </ul>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
    <!--breadcrumbs area end-->'
  },
  b02:function() 
  {
		return '\
		<!--Accordion area-->\
    <div class="accordion_area">\
        <div class="container">\
            <div class="row">\
            <div class="col-12"> \
                <div id="accordion" class="card__accordion">\
                  <div class="card card_dipult">\
                    <div class="card-header card_accor" id="headingOne">\
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">\
                         	Who is going to bear the Customs & Import Taxes?\
                          <i class="fa fa-plus"></i>\
                          <i class="fa fa-minus"></i>\
                        </button>\
                    </div>\
                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">\
                      <div class="card-body">\
                           <p>You will probably be charged to the customs fees on items ordered from DHgate, as your purchases on DHgate are considered imports since the packages are shipped from overseas.</p><p>Note: Customs taxes are not included in the price of the item or in the delivery costs.</p><p>&nbsp;</p><p>The taxes may depend on where your order was sent from, the type of items you bought, their value and the weight of the package. Different countries may have different tax policies regarding specific products. It’s always best to confirm this with the seller or your local customs authority.</p><p>&nbsp;</p><p>To avoid any unforeseen surprises, please pay attention to the following:</p><p>• Ask the seller if you need to pay any additional import duties, taxes or other customs-related charges.</p><p>• Contact your local post or customs office to find out more about your country’s customs duties and taxes.</p><p>• Import duties, taxed or other customs-related charges are normally collected by the shipping company upon delivery.</p><p>• Sellers are not responsible for delays caused by the customs department in your country.</p><p>• Additional costs or delays may occur during international trade.</p><p>• Some sellers offer domestic delivery. This means that they will send your order from a warehouse in your country. In this case, you won’t be asked to pay for any additional customs duties and taxes.</p>\
                      </div>\
                    </div>\
                  </div>\
                  <div class="card  card_dipult">\
                    <div class="card-header card_accor" id="headingTwo">\
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">\
                          If my parcel is seized by Customs what should i do?\
                           <i class="fa fa-plus"></i>\
                           <i class="fa fa-minus"></i>\
                        </button>\
                    </div>\
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">\
                      <div class="card-body">\
                        <p>If the items are detained by Customs after the shipment has left the seller\’s country, the buyer is responsible for clearance of the detained items. It is the buyer\'s responsibility for any Customs duty fees that may be charged upon delivery. How the import duty will be charged depends on each country\’s custom policies.</p><p> </p><p> If your items can not be cleared at Customs, you need to provide DHgate with the letter authorized by customs stating why they have been seized.</p><p>&nbsp;</p><p>These refer to cases in which the packages are held in detention at your Customs. The dispatching party should be responsible for providing evidence to explain the detention.</p><p>Case 1: If the item is held in detention at the dispatching party’s Customs, DHgate should make a full refund to the buyer.</p><p> Case 2: If Customs proves that the detention happens because the item is prohibited or a replica subject to a fine, DHgate should make a full refund to the buyer.</p><p> Case 3: If no written certification is provided by Customs about the detention, the goods are deemed to be en route and DHgate should handle the case based under the context that the shipping information is incomplete.</p>\
                      </div>\
                    </div>\
                  </div>\
                  <!--========-->\
                </div>\
            </div>\
        </div>\
        </div>\
    </div>\
    <!--Accordion area end-->'
  }
}
fun.a01();