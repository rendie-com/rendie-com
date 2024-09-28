'use strict';
var fun=
{
  obj:{A1:1,A2:0},
  a01:function()
  {
		let html = Tool.header('正在记录是否有【视频】...')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w150">商品页进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
  {
    let html='[\
		{"A2":'+(this.obj.A2==0?'<@page/>':'0')+'}\
		<r:pro db="sqlite.aliexpress" page=2 size=50>,\
		{\
			<r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
				"videoUrl":"<:videoUrl/>",\
			</r:prodes>\
			"proid":"<:proid/>"\
		}\
		</r:pro>\
		]';
    Tool.ajax.a01(html,this.obj.A1,this.a03,this)
  },
  a03:function(oo)
  {
    if(this.obj.A2==0){this.obj.A2=oo[0].A2;}
		oo.shift()
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04,this,null,oo)
  },
  a04:function(oo)
  {
		let sqlArr=[]
		for(let i=0;i<oo.length;i++)
		{
      sqlArr.push("update @.pro set @.isVideo=" + (oo[i].videoUrl ? 1 : 0)+" where @.proid='"+oo[i].proid+"'")
		}
		let html='""<r: db="sqlite.aliexpress">'+sqlArr.join('<1/>')+'</r:>'
		Tool.ajax.a01(html,1,this.a05,this)
  },
  a05:function(t)
  {
		this.obj.A1++;
		this.a02();
  }
}.a01();