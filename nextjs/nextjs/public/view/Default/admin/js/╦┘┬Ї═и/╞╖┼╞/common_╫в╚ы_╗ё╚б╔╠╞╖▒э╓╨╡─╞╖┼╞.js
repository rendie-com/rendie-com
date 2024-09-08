var fun =
{
  T: [],
  a01: function (bind) {
    this.b01($('input[name="brandName"]'), bind)
    $('.next-search-btn').children(":first").click();
  },
  a02: function () {
    $('[type="radio"]').attr("type","xxxxxxxxxx");//这个是要是清空一下，防止下次会被找出来  
  },
  b01: function (oo, value) {
    let casess = oo.get(0);
    casess.value = value;
    var event = document.createEvent('HTMLEvents');
    event.initEvent("input", true, true);
    event.eventType = 'message';
    casess.dispatchEvent(event);
  },
 
 
}