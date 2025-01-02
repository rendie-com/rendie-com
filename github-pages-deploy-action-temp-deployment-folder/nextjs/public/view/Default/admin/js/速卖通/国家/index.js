'use strict';
var fun =
{
  obj: {},
  a01: function ()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    if(obj.arr[3]=="js01")
    {      
      Tool.scriptArr(['admin/js/速卖通/国家/正在获取国家下的.js']);
    }
		else
		{
			let str = '[0<r:country db="sqlite.aliexpress" size="500" where=" where @.upid=\'0\' order by @.name asc">,\
			{\
				"id":<:id/>,\
				"isleaf":<:isleaf/>,\
				"countryid":"<:countryid/>",\
				"sort":"<:sort/>",\
				"fromid":"<:fromid/>",\
				"name":"<:name/>",\
				"des":"<:des/>",\
				"area":"<:area/>",\
				"chinaarea":"<:chinaarea/>",\
				"countrycode":"<:countrycode/>",\
				"currency":"<:currency/>",\
				"callingcode":"<:callingcode/>"\
			}\
			</r:country>]'
			Tool.ajax.a01(str,1,this.a02,  this)
		}
  },
  a02: function(arr)
  {
    this.obj.Aarr = arr;
    let html = '', li1 = ''
    for (let i = 1; i < arr.length; i++)
    {
      if (arr[i].isleaf==0)
			{li1='<a href="javascript:" class="Mo MoA" onclick="fun.c01($(this),' + arr[i].fromid + ')"></a>' + i;}
      else
			{li1 = '<a class="Mo"></a>' + i;}
      html += '\
      <tr class="list-group-item-action">\
        <td class="left">'+ li1 + '</td>\
        <td>'+ arr[i].fromid + '</td>\
        <td>'+ arr[i].countryid + '</td>\
        <td class="left">'+ this.b01(arr[i].countryid) + arr[i].name + '</td>\
        <td>'+ arr[i].des + '</td>\
        <td>'+ arr[i].area + '</td>\
        <td>'+ arr[i].chinaarea + '</td>\
        <td>'+ arr[i].countrycode + '</td>\
        <td>'+ arr[i].currency + '</td>\
        <td>'+ arr[i].callingcode + '</td>\
        <td>'+ arr[i].sort + '</td>\
      </tr>'
    }
		html +='\
    <tr>\
    <td colspan="12" class="left">\
      <div class="btn-group btn-group-sm">\
        <button type="button" class="btn btn-secondary" onclick="fun.c03();">1.采集速卖通国家</button>\
        <button type="button" class="btn btn-secondary" onclick="fun.c05();">2.获取国家下的【State/Province/Region】和【city】</button>\
      </div>\
    </td>\
    </tr>'
    html = '\
		<header class="panel-heading">【速卖通】国家</header>\
		<div class="p-2">\
      <table class="table center align-middle">\
        <thead class="table-light">\
        <tr>\
          <th class="w70">编号</th>\
          <th class="w200">来源ID</th>\
          <th class="w50">代码</th>\
          <th class="left">国家名称</th>\
          <th>描述</th>\
          <th>区域</th>\
          <th>区域洲</th>\
          <th>国家代码</th>\
          <th>币种</th>\
          <th>区号代码</th>\
          <th>排序</th>\
        </tr>\
        </thead>\
        <tbody>'+html+'</tbody>\
      </table>\
    </div>'
    Tool.html(null,null,html)
  },
  b01:function(id)
  {
		let str="";
		switch (id){
			case "ALA": 
			case "GBA":
			case "ASC":
			case "SX":
			case "SRB":
			case "BLM": 
			case "PS": 
			case "MNE": 
			case "YT": 
			case "KS": 
			case "JEY": 
			case "GGY": 
			case "MAF": 
			case "ZR": 
			case "CC": 
			case "CX": 
			case "BQ": 
			case "CW": 
			case "SGS": 
			case "SS": 
			case "PM": 
			case "TLS": 
			case "EAZ": 
			case "xxxx": 
			case "xxxx": 
				break;
			default: str=id;
		}
		return str?'<img src="https://image.dhgate.com/images/flag/' + str + '.gif"/> ':"";
	},
  c01:function (This, fromid)
  {
    if (This.attr("Class") == "Mo MoB")
    {
      $("#Mo" + fromid).hide();
      This.attr("Class", "Mo MoA");
    }
    else
    {
      This.attr("Class", "Mo MoB")
      if ($("#Mo" + fromid).length)
      { $("#Mo" + fromid).show(); }
      else
      {
        let str = '\
        [{}<r:country db="sqlite.aliexpress" size="5000" where=" where @.upid=\'' + fromid + '\'">,\
        {\
          "id":"<:id/>",\
          "countryid":"<:countryid/>",\
          "isleaf":<:isleaf/>,\
          "bind":"",\
          "fromid":"<:fromid/>",\
          "name":"<:name/>",\
          "sort":"<:sort/>"\
        }\
        </r:country>]'
       Tool.ajax.a01( this, [This,this.c02, str, 1, fromid])
      }
    }
  },
  c02: function (arr, obj)
  {
    if (arr.length == 5000) { alert("益出001"); Tool.echo(arr) }
    else
    {
      let html = '', li1
      for (let i = 1; i < arr.length; i++) {
      if (arr[i].isleaf == "False")
      {li1 = '<a href="javascript:" class="Mo MoA" onclick="fun.c01($(this),' + arr[i].fromid + ')"></a>' + i }
      else
      {li1 = '<a class="Mo"></a>' + i }
      html += '\
      <tr class="list-group-item-action center">\
        <td class="left">'+ li1 + '</td>\
        <td>'+ arr[i].fromid + '</td>\
        <td>'+ arr[i].countryid + '</td>\
        <td class="left">'+ arr[i].name + '</td>\
      </tr>';
      }
      html = '<tr id="Mo' + obj[1] + '"><td colspan="12">\
      <table class="table table-bordered m-2 shadow bg-white rounded">\
        <thead class="table-light">\
        <tr>\
          <th class="w70">编号</th>\
          <th class="w200">来源ID</th>\
          <th class="w50">代码</th>\
          <th class="left">国家名称</th>\
        </tr>\
        </thead>\
        <tbody>' + html + '</tbody>\
        </table></td></tr>'
      obj[0].parent().parent().after(html);
    }
  },
	c03: function ()//采集速卖通国家
	{
			let arr = [{"c":"AF","id":"100001","needChildren":false,"n":"Afghanistan"},{"c":"ALA","id":"100002","needChildren":false,"n":"Aland Islands"},{"c":"AL","id":"100003","needChildren":false,"n":"Albania"},{"c":"GBA","id":"100004","needChildren":false,"n":"Alderney"},{"c":"DZ","id":"100005","needChildren":false,"n":"Algeria"},{"c":"AS","id":"100006","needChildren":false,"n":"American Samoa"},{"c":"AD","id":"100007","needChildren":false,"n":"Andorra"},{"c":"AO","id":"100008","needChildren":false,"n":"Angola"},{"c":"AI","id":"100009","needChildren":false,"n":"Anguilla"},{"c":"AG","id":"100011","needChildren":false,"n":"Antigua and Barbuda"},{"c":"AR","id":"100012","needChildren":false,"n":"Argentina"},{"c":"AM","id":"100013","needChildren":false,"n":"Armenia"},{"c":"AW","id":"100014","needChildren":false,"n":"Aruba"},{"c":"ASC","id":"100015","needChildren":false,"n":"Ascension Island"},{"c":"AU","id":"100016","needChildren":false,"n":"Australia"},{"c":"AT","id":"100017","needChildren":false,"n":"Austria"},{"c":"AZ","id":"100018","needChildren":false,"n":"Azerbaijan"},{"c":"BS","id":"100019","needChildren":false,"n":"Bahamas"},{"c":"BH","id":"100020","needChildren":false,"n":"Bahrain"},{"c":"BD","id":"100021","needChildren":false,"n":"Bangladesh"},{"c":"BB","id":"100022","needChildren":false,"n":"Barbados"},{"c":"BY","id":"100023","needChildren":false,"n":"Belarus"},{"c":"BE","id":"100024","needChildren":false,"n":"Belgium"},{"c":"BZ","id":"100025","needChildren":false,"n":"Belize"},{"c":"BJ","id":"100026","needChildren":false,"n":"Benin"},{"c":"BM","id":"100027","needChildren":false,"n":"Bermuda"},{"c":"BT","id":"100028","needChildren":false,"n":"Bhutan"},{"c":"BO","id":"100029","needChildren":false,"n":"Bolivia"},{"c":"BA","id":"100030","needChildren":false,"n":"Bosnia and Herzegovina"},{"c":"BW","id":"100031","needChildren":false,"n":"Botswana"},{"c":"BR","id":"32","needChildren":true,"n":"Brazil"},{"c":"BN","id":"243","needChildren":false,"n":"Brunei"},{"c":"BG","id":"100036","needChildren":false,"n":"Bulgaria"},{"c":"BF","id":"100037","needChildren":false,"n":"Burkina Faso"},{"c":"BI","id":"100038","needChildren":false,"n":"Burundi"},{"c":"KH","id":"100039","needChildren":false,"n":"Cambodia"},{"c":"CM","id":"100040","needChildren":false,"n":"Cameroon"},{"c":"CA","id":"37","needChildren":false,"n":"Canada"},{"c":"CV","id":"100042","needChildren":false,"n":"Cape Verde"},{"c":"BQ","id":"246","needChildren":false,"n":"Caribbean Netherlands"},{"c":"KY","id":"100043","needChildren":false,"n":"Cayman Islands"},{"c":"CF","id":"100044","needChildren":false,"n":"Central African Republic"},{"c":"TD","id":"100045","needChildren":false,"n":"Chad"},{"c":"CL","id":"43","needChildren":false,"n":"Chile"},{"c":"CX","id":"100048","needChildren":false,"n":"Christmas Island"},{"c":"CC","id":"100049","needChildren":false,"n":"Cocos (Keeling) Islands"},{"c":"CO","id":"46","needChildren":false,"n":"Colombia"},{"c":"KM","id":"100051","needChildren":false,"n":"Comoros"},{"c":"ZR","id":"100052","needChildren":false,"n":"Congo, The Democratic Republic Of The"},{"c":"CG","id":"100053","needChildren":false,"n":"Congo, The Republic of Congo"},{"c":"CK","id":"100054","needChildren":false,"n":"Cook Islands"},{"c":"CR","id":"100055","needChildren":false,"n":"Costa Rica"},{"c":"CI","id":"100056","needChildren":false,"n":"Cote D'Ivoire"},{"c":"HR","id":"100057","needChildren":false,"n":"Croatia (local name: Hrvatska)"},{"c":"CW","id":"257","needChildren":false,"n":"Curacao"},{"c":"CY","id":"100059","needChildren":false,"n":"Cyprus"},{"c":"CZ","id":"100060","needChildren":false,"n":"Czech Republic"},{"c":"DK","id":"100061","needChildren":false,"n":"Denmark"},{"c":"DJ","id":"100062","needChildren":false,"n":"Djibouti"},{"c":"DM","id":"100063","needChildren":false,"n":"Dominica"},{"c":"DO","id":"100064","needChildren":false,"n":"Dominican Republic"},{"c":"EC","id":"100066","needChildren":false,"n":"Ecuador"},{"c":"EG","id":"100067","needChildren":false,"n":"Egypt"},{"c":"SV","id":"100068","needChildren":false,"n":"El Salvador"},{"c":"GQ","id":"100069","needChildren":false,"n":"Equatorial Guinea"},{"c":"ER","id":"100070","needChildren":false,"n":"Eritrea"},{"c":"EE","id":"100071","needChildren":false,"n":"Estonia"},{"c":"ET","id":"100072","needChildren":false,"n":"Ethiopia"},{"c":"FK","id":"100073","needChildren":false,"n":"Falkland Islands (Malvinas)"},{"c":"FO","id":"100074","needChildren":false,"n":"Faroe Islands"},{"c":"FJ","id":"100075","needChildren":false,"n":"Fiji"},{"c":"FI","id":"100076","needChildren":false,"n":"Finland"},{"c":"FR","id":"72","needChildren":false,"n":"France"},{"c":"GF","id":"100079","needChildren":false,"n":"French Guiana"},{"c":"PF","id":"100080","needChildren":false,"n":"French Polynesia"},{"c":"GA","id":"100082","needChildren":false,"n":"Gabon"},{"c":"GM","id":"100083","needChildren":false,"n":"Gambia"},{"c":"GE","id":"100084","needChildren":false,"n":"Georgia"},{"c":"DE","id":"77","needChildren":false,"n":"Germany"},{"c":"GH","id":"100086","needChildren":false,"n":"Ghana"},{"c":"GI","id":"100087","needChildren":false,"n":"Gibraltar"},{"c":"GR","id":"100088","needChildren":false,"n":"Greece"},{"c":"GL","id":"100089","needChildren":false,"n":"Greenland"},{"c":"GD","id":"100090","needChildren":false,"n":"Grenada"},{"c":"GP","id":"100091","needChildren":false,"n":"Guadeloupe"},{"c":"GU","id":"100092","needChildren":false,"n":"Guam"},{"c":"GT","id":"100093","needChildren":false,"n":"Guatemala"},{"c":"GGY","id":"100094","needChildren":false,"n":"Guernsey"},{"c":"GN","id":"100095","needChildren":false,"n":"Guinea"},{"c":"GW","id":"100096","needChildren":false,"n":"Guinea-Bissau"},{"c":"GY","id":"100097","needChildren":false,"n":"Guyana"},{"c":"HT","id":"100098","needChildren":false,"n":"Haiti"},{"c":"HN","id":"100100","needChildren":false,"n":"Honduras"},{"c":"HK","id":"810000","needChildren":false,"n":"Hong Kong,China"},{"c":"HU","id":"100202","needChildren":false,"n":"Hungary"},{"c":"IS","id":"100203","needChildren":false,"n":"Iceland"},{"c":"IN","id":"100204","needChildren":false,"n":"India"},{"c":"ID","id":"100101","needChildren":true,"n":"Indonesia"},{"c":"IQ","id":"100206","needChildren":false,"n":"Iraq"},{"c":"IE","id":"100207","needChildren":false,"n":"Ireland"},{"c":"IL","id":"100209","needChildren":false,"n":"Israel"},{"c":"IT","id":"101","needChildren":false,"n":"Italy"},{"c":"JM","id":"100211","needChildren":false,"n":"Jamaica"},{"c":"JP","id":"104","needChildren":false,"n":"Japan"},{"c":"JEY","id":"100213","needChildren":false,"n":"Jersey"},{"c":"JO","id":"100214","needChildren":false,"n":"Jordan"},{"c":"KZ","id":"108","needChildren":false,"n":"Kazakhstan"},{"c":"KE","id":"100216","needChildren":false,"n":"Kenya"},{"c":"KI","id":"100217","needChildren":false,"n":"Kiribati"},{"c":"KR","id":"198","needChildren":false,"n":"Korea"},{"c":"KS","id":"100218","needChildren":false,"n":"Kosovo"},{"c":"KW","id":"100219","needChildren":false,"n":"Kuwait"},{"c":"KG","id":"100220","needChildren":false,"n":"Kyrgyzstan"},{"c":"LA","id":"100221","needChildren":false,"n":"Lao People's Democratic Republic"},{"c":"LV","id":"100222","needChildren":false,"n":"Latvia"},{"c":"LB","id":"100223","needChildren":false,"n":"Lebanon"},{"c":"LS","id":"100224","needChildren":false,"n":"Lesotho"},{"c":"LR","id":"100225","needChildren":false,"n":"Liberia"},{"c":"LY","id":"100226","needChildren":false,"n":"Libya"},{"c":"LI","id":"100227","needChildren":false,"n":"Liechtenstein"},{"c":"LT","id":"100228","needChildren":false,"n":"Lithuania"},{"c":"LU","id":"100229","needChildren":false,"n":"Luxembourg"},{"c":"MO","id":"820000","needChildren":false,"n":"Macau,China"},{"c":"MK","id":"100231","needChildren":false,"n":"Macedonia"},{"c":"MG","id":"100232","needChildren":false,"n":"Madagascar"},{"c":"MW","id":"100233","needChildren":false,"n":"Malawi"},{"c":"MY","id":"100234","needChildren":false,"n":"Malaysia"},{"c":"MV","id":"100235","needChildren":false,"n":"Maldives"},{"c":"ML","id":"100236","needChildren":false,"n":"Mali"},{"c":"MT","id":"100237","needChildren":false,"n":"Malta"},{"c":"MH","id":"100238","needChildren":false,"n":"Marshall Islands"},{"c":"MQ","id":"100239","needChildren":false,"n":"Martinique"},{"c":"MR","id":"100240","needChildren":false,"n":"Mauritania"},{"c":"MU","id":"100241","needChildren":false,"n":"Mauritius"},{"c":"YT","id":"100242","needChildren":false,"n":"Mayotte"},{"c":"MX","id":"134","needChildren":false,"n":"Mexico"},{"c":"FM","id":"100244","needChildren":false,"n":"Micronesia"},{"c":"MD","id":"100245","needChildren":false,"n":"Moldova"},{"c":"MC","id":"100246","needChildren":false,"n":"Monaco"},{"c":"MN","id":"100247","needChildren":false,"n":"Mongolia"},{"c":"MNE","id":"100248","needChildren":false,"n":"Montenegro"},{"c":"MS","id":"100249","needChildren":false,"n":"Montserrat"},{"c":"MA","id":"100250","needChildren":false,"n":"Morocco"},{"c":"MZ","id":"100251","needChildren":false,"n":"Mozambique"},{"c":"MM","id":"100252","needChildren":false,"n":"Myanmar"},{"c":"NA","id":"100253","needChildren":false,"n":"Namibia"},{"c":"NR","id":"100254","needChildren":false,"n":"Nauru"},{"c":"NP","id":"100255","needChildren":false,"n":"Nepal"},{"c":"NL","id":"147","needChildren":false,"n":"Netherlands"},{"c":"AN","id":"100257","needChildren":false,"n":"Netherlands Antilles"},{"c":"NC","id":"100258","needChildren":false,"n":"New Caledonia"},{"c":"NZ","id":"150","needChildren":false,"n":"New Zealand"},{"c":"NI","id":"100260","needChildren":false,"n":"Nicaragua"},{"c":"NE","id":"100261","needChildren":false,"n":"Niger"},{"c":"NG","id":"153","needChildren":false,"n":"Nigeria"},{"c":"NU","id":"100263","needChildren":false,"n":"Niue"},{"c":"NF","id":"100264","needChildren":false,"n":"Norfolk Island"},{"c":"MP","id":"100266","needChildren":false,"n":"Northern Mariana Islands"},{"c":"NO","id":"100267","needChildren":false,"n":"Norway"},{"c":"OM","id":"100268","needChildren":false,"n":"Oman"},{"c":"OTHER","id":"100269","needChildren":false,"n":"Other Country"},{"c":"PK","id":"100270","needChildren":false,"n":"Pakistan"},{"c":"PW","id":"100271","needChildren":false,"n":"Palau"},{"c":"PS","id":"100272","needChildren":false,"n":"Palestine"},{"c":"PA","id":"100273","needChildren":false,"n":"Panama"},{"c":"PG","id":"100274","needChildren":false,"n":"Papua New Guinea"},{"c":"PY","id":"100275","needChildren":false,"n":"Paraguay"},{"c":"PE","id":"165","needChildren":false,"n":"Peru"},{"c":"PH","id":"100277","needChildren":false,"n":"Philippines"},{"c":"PL","id":"167","needChildren":false,"n":"Poland"},{"c":"PT","id":"100280","needChildren":false,"n":"Portugal"},{"c":"PR","id":"100281","needChildren":false,"n":"Puerto Rico"},{"c":"QA","id":"100282","needChildren":false,"n":"Qatar"},{"c":"RE","id":"100283","needChildren":false,"n":"Reunion"},{"c":"RO","id":"100284","needChildren":false,"n":"Romania"},{"c":"RU","id":"174","needChildren":true,"n":"Russian Federation"},{"c":"RW","id":"100286","needChildren":false,"n":"Rwanda"},{"c":"BLM","id":"100287","needChildren":false,"n":"Saint Barthelemy"},{"c":"KN","id":"100288","needChildren":false,"n":"Saint Kitts and Nevis"},{"c":"LC","id":"100289","needChildren":false,"n":"Saint Lucia"},{"c":"MAF","id":"100290","needChildren":false,"n":"Saint Martin"},{"c":"VC","id":"100291","needChildren":false,"n":"Saint Vincent and the Grenadines"},{"c":"WS","id":"100292","needChildren":false,"n":"Samoa"},{"c":"SM","id":"100293","needChildren":false,"n":"San Marino"},{"c":"ST","id":"100294","needChildren":false,"n":"Sao Tome and Principe"},{"c":"SA","id":"185","needChildren":false,"n":"Saudi Arabia"},{"c":"SN","id":"100297","needChildren":false,"n":"Senegal"},{"c":"SRB","id":"100298","needChildren":false,"n":"Serbia"},{"c":"SC","id":"100299","needChildren":false,"n":"Seychelles"},{"c":"SL","id":"100300","needChildren":false,"n":"Sierra Leone"},{"c":"SG","id":"100301","needChildren":false,"n":"Singapore"},{"c":"SX","id":"191","needChildren":false,"n":"Sint Maarten"},{"c":"SK","id":"100302","needChildren":false,"n":"Slovakia (Slovak Republic)"},{"c":"SI","id":"100303","needChildren":false,"n":"Slovenia"},{"c":"SB","id":"100304","needChildren":false,"n":"Solomon Islands"},{"c":"SO","id":"100305","needChildren":false,"n":"Somalia"},{"c":"ZA","id":"100306","needChildren":false,"n":"South Africa"},{"c":"SGS","id":"100307","needChildren":false,"n":"South Georgia and the South Sandwich Islands"},{"c":"SS","id":"100309","needChildren":false,"n":"South Sudan"},{"c":"ES","id":"199","needChildren":true,"n":"Spain"},{"c":"LK","id":"100311","needChildren":false,"n":"Sri Lanka"},{"c":"PM","id":"100313","needChildren":false,"n":"St. Pierre and Miquelon"},{"c":"SR","id":"100315","needChildren":false,"n":"Suriname"},{"c":"SZ","id":"100317","needChildren":false,"n":"Swaziland"},{"c":"SE","id":"100318","needChildren":false,"n":"Sweden"},{"c":"CH","id":"100319","needChildren":false,"n":"Switzerland"},{"c":"TW","id":"710000","needChildren":false,"n":"Taiwan,China"},{"c":"TJ","id":"100322","needChildren":false,"n":"Tajikistan"},{"c":"TZ","id":"100323","needChildren":false,"n":"Tanzania"},{"c":"TH","id":"209","needChildren":false,"n":"Thailand"},{"c":"TLS","id":"100325","needChildren":false,"n":"Timor-Leste"},{"c":"TG","id":"100326","needChildren":false,"n":"Togo"},{"c":"TO","id":"100328","needChildren":false,"n":"Tonga"},{"c":"TT","id":"100329","needChildren":false,"n":"Trinidad and Tobago"},{"c":"TN","id":"100330","needChildren":false,"n":"Tunisia"},{"c":"TR","id":"218","needChildren":false,"n":"Turkey"},{"c":"TM","id":"100332","needChildren":false,"n":"Turkmenistan"},{"c":"TC","id":"100333","needChildren":false,"n":"Turks and Caicos Islands"},{"c":"TV","id":"100334","needChildren":false,"n":"Tuvalu"},{"c":"UG","id":"100335","needChildren":false,"n":"Uganda"},{"c":"UA","id":"223","needChildren":false,"n":"Ukraine"},{"c":"AE","id":"224","needChildren":false,"n":"United Arab Emirates"},{"c":"UK","id":"225","needChildren":false,"n":"United Kingdom"},{"c":"US","id":"228","needChildren":false,"n":"United States"},{"c":"UY","id":"100341","needChildren":false,"n":"Uruguay"},{"c":"UZ","id":"100342","needChildren":false,"n":"Uzbekistan"},{"c":"VU","id":"100343","needChildren":false,"n":"Vanuatu"},{"c":"VA","id":"100344","needChildren":false,"n":"Vatican City State (Holy See)"},{"c":"VE","id":"100345","needChildren":false,"n":"Venezuela"},{"c":"VN","id":"100346","needChildren":false,"n":"Vietnam"},{"c":"VG","id":"100347","needChildren":false,"n":"Virgin Islands (British)"},{"c":"VI","id":"100348","needChildren":false,"n":"Virgin Islands (U.S.)"},{"c":"WF","id":"100349","needChildren":false,"n":"Wallis And Futuna Islands"},{"c":"YE","id":"100351","needChildren":false,"n":"Yemen"},{"c":"ZM","id":"100353","needChildren":false,"n":"Zambia"},{"c":"EAZ","id":"100354","needChildren":false,"n":"Zanzibar"},{"c":"ZW","id":"100355","needChildren":false,"n":"Zimbabwe"}]//从速卖通复制过来的
			//国家来源 https://ilogisticsaddress.aliexpress.com/addressList.htm
			let sql = [], tmp = [], str
			for (let i = 0; i < arr.length; i++) {
					if ("|split|OTHER|".indexOf("|" + arr[i].c + "|") == -1) {
							if (("|" + tmp.join("|") + "|").indexOf("|" + arr[i].c + "|") == -1)//去重复
							{
									sql.push('insert into @.country(:countryid,:name,:fromid)values(\'' + arr[i].c + '\',\'' + arr[i].n.replace(/'/ig, "''") + '\',' + arr[i].id + ')']);
							}
							tmp.push(arr[i].c);
					}
			}
			str = '<if Fun(Db(sqlite.aliexpress,select count(1) from @.country,count))==0><r: db="sqlite.aliexpress">' + sql.join("<1/>") + '</r:></if>'
			Tool.ajax.a01( str,1,this.c04, this)
	},
	c04:function(t)
	{
		if(t == ""){alert("国家采集完");window.location.reload();}else{document.write("出错：" + t);}
	},
	c05:function()
	{
    let r=Tool.escape("/"+obj.arr.join("/"));//返回URL
    Tool.main('/js01/'+r);
  }
}
fun.a01();

	/*

  <button type="button" class="btn btn-secondary" onclick="fun.e01();">3.从敦煌网的国家抓过来其它信息</button>\
    e01:function()
		{
        $("#table").html('<img src="' + o.path + 'admin/img/loading-128x128.gif" style="margin-left:46%;"/>']);
        let arr = this.obj.Aarr, sql = []
        for (let i = 0; i < arr.length; i++) {
            sql.push('<r:country size="1" where=" where @.from=\'dhgate\' and @.upid=\'0\' and @.countryid=\'' + arr[i].countryid + '\'">update @.country set @.sort=<:sort/>,:des=\'<:des/>\',:area=\'<:area/>\',:chinaarea=\'<:chinaarea/>\',:countrycode=\'<:countrycode/>\',:currency=\'<:currency/>\',:callingcode=\'<:callingcode/>\' where @.from=\'aliexpress\' and @.countryid=\'<:countryid/>\' and @.upid=\'0\'</r:country>')
        }
       Tool.ajax.a01( sql.join("<1/>"),1,this.e02,this)
    },
    e02: function (t) {
        let arr = t.split("<1/>"), arr2 = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] != "") { arr2.push(arr[i]); }
        }
       Tool.ajax.a01( '<r: db="sqlite.aliexpress">' + arr2.join("<1/>") + '</r:>',1,this.e03,this)
    },
    e03: function (t) {
        if (t == "") { alert("抓完"); window.location.reload(); } else { document.write("出错：" + t) }
    },
    
j01:function(This,fromid,id)
{
let html='<r:country where=" where @.fromid='+fromid+' and @.from=\'dhgate\'" size="1"><r:country where=" where @.upid=<:bind/> and @.from=\'aliexpress\'" size="3500">,{"fromid":<:fromid/>,"name":"<:name/>"}</r:country></r:country>'
Tool.ajax.a01(html,1,[This,this.j02,this,id]);
},
j02:function(t,arr)
{
let str=''
eval("let arr2=["+t.substr(1)+']')
if(arr2.length==3500)
{
  alert("益出2000")
}
else
{
    for(let i=0;i<arr2.length;i++)
    {
        str+='<option value="'+arr2[i].fromid+'" title="'+arr2[i].name+'">'+arr2[i].name+'</option>'
    }
    str='<select onchange="fun.j03($(this),'+arr[1]+')" style="width: 250px"><option value="0">不用绑定</option>'+str+'</select>'
    arr[0].parent().html(str)
}
},
j03:function(This,id)
{
let str='<r: db="sqlite.aliexpress">update @.country set @.bind='+This.val()+' where @.id='+id+'</r:>'
Tool.ajax.a01(str,1,this.j04,this,This);
},
j04:function(t,This)
{
if(t=="")
{
    This.parent().html(This.find("option:selected").text());
}
else{document.write("出错:"+t)}
},
k01:function(This,id)
{
let str='<r: db="sqlite.aliexpress">delete from @.country where @.id='+id+'</r:>'
Tool.ajax.a01(str,1,this.k02,this,This);
},
k02:function(t,This)
{
if(t=="")
{
    This.parent().parent().remove()
}
else{document.write("出错:"+t)}
}
b01:function()
{
this.cityI=0;this.cityArr=[];
let p1=Math.ceil(this.I/this.arr.length*100)
let html='<ul class="Tul tr"><li class="label w100">绑定国家：</li><li id="A1" class="w500"><div class="progress"><span style="width:'+p1+'%;"><span>'+p1+'%</span></span></div></li><li id="A2">'+this.I+'/'+this.arr.length+' (条)</li></ul><ul class="Tul tr"><li class="label w100">绑定省：</li><li id="B1" class="w500"></li><li id="B2"></li></ul>'
$(".table2").html(html);
if(this.I<this.arr.length)
{
    let str='<r:country size="1" where=" where @.upid=0 and @.from=\'aliexpress\' and @.countryid=\''+this.arr[this.I].countryid+'\'"><:fromid/></r:country>'
 Tool.ajax.a01(str,1,this.b02,this)
}
else{$("#A2").html(this.I+'/'+this.arr.length+' (完)']);}

},
b02:function(t)
{
if(t=="")
{this.I++;this.b01();}//【国家】绑定不了【跳过】
else
{
    this.arr[this.I].bind=t
    let str='<r: db="sqlite.aliexpress">update @.country set @.bind='+t+' where @.countryid=\''+this.arr[this.I].countryid+'\' and @.from=\'dhgate\' and @.upid=0</r:>'
    if(this.arr[this.I].isleaf=="True"){this.I++;this.b01();}//国家下面没有省【跳过】
    else
    {
        str+='<r:country size="3500" where=" where @.upid='+this.arr[this.I].fromid+' and @.from=\'dhgate\'">,{"name":"<:name/>","fromid":"<:fromid/>"}</r:country>';
       Tool.ajax.a01(str,1,this.b03,this)
    }
}
},
b03:function(t)
{
eval("this.cityArr=["+t.substr(1)+"]")
if(this.cityArr.length==3500){alert("益出");}else{this.b04();}
},
b04:function()
{
let p1=Math.ceil(this.cityI/this.cityArr.length*100)
$("#B1").html('<div class="progress"><span style="width:'+p1+'%;"><span>'+p1+'%</span></span></div>']);
$("#B2").html(this.cityI+'/'+this.cityArr.length+' (页)']);
if(this.cityI<this.cityArr.length)
{
    let str='<r:country size="1" where=" where @.upid='+this.arr[this.I].bind+' and @.from=\'aliexpress\' and @.name=\''+this.cityArr[this.cityI].name+'\'"><:fromid/></r:country>'
   Tool.ajax.a01(str,1,this.b05,this)
}
else
{$("#B2").html(this.cityI+'/'+this.cityArr.length+' (完)']);this.I++;this.b01();}
},
b05:function(t)
{
if(t=="")
{
    this.cityI++;this.b04();//【省】绑定不了【跳过】
}
else
{
    let str='<r: db="sqlite.aliexpress">update @.country set @.bind='+t+' where @.fromid='+this.cityArr[this.cityI].fromid+' and @.from=\'dhgate\'</r:>'
 Tool.ajax.a01(str,1,this.b06,this)
}
},
b06:function(t){if(t==""){this.cityI++;this.b04();}else{document.write("出错4:"+t)}},
b011113:function(t,arr)
{
let sql=[],fromid
if(t=="")
{
    for(let i=0;i<arr.length;i++)
    {
        fromid=0
        for(let j=0;j<this.arr.length;j++)
        {
            if(arr[i].countryid==this.arr[j].countryid){fromid=this.arr[j].fromid;break;}
        }
        sql[i]='update @.country set @.bind='+fromid+' where @.countryid=\''+arr[i].countryid+'\' and @.from=\'aliexpress\' and @.upid=0'
    }
   Tool.ajax.a01('<r: db="sqlite.aliexpress">'+sql.join("<1/>")+'</r:>',1,this.b04,this)
}else{document.write("操作失败1："+t);}
},

h01:function(A,B)
{
let html='[<@page/><r:country where=" where @.fromid=0" size="50" page="2">,<:id/></r:country>]'
Tool.ajax.a01(html,1,[A,this.h02,this,B]);
},
h02:function(t,obj)
{
eval("let arr="+t);
if(t=='[0]'){obj[0].apply(obj[1]);}
else
{
    let p1=Math.ceil(1/arr[0]*100)
    $("#B1").html('<div class="progress"><span style="width:'+p1+'%;"><span>'+p1+'%</span></span></div>']);
    $("#B2").html('1/'+arr[0]+' (页)']);
    let ran=parseInt(Math.random()*(999999),10)//有99w的ID
    let txtArr=[]
    for(let i=1;i<arr.length;i++)
    {
        txtArr[txtArr.length]='<if "Fun(Db(select count(1) from @.country where @.fromid='+(ran+i)+',count))"=="0"><r: db="sqlite.aliexpress">update @.country set @.fromid='+(ran+i)+' where @.id='+arr[i]+'</r:></if>'
    }
   Tool.ajax.a01(txtArr.join(""),1,this.h03,this,obj);
}
},
h03:function(t,obj){if(t==""){this.h01(obj[0],obj[1]);}else{document.write("出错:"+t)}},

*/
