'use strict';
var fun=
{
  obj:{A1:1,A2:0},
  a01:function()
	{
    //obj.arr[4]  shopID
    //obj.arr[5]  演示/执行
		obj.arr[7]=obj.arr[7]?parseInt(obj.arr[7]):1;//选择JS文件
		let html=Tool.header('店铺详情替换【'+(obj.arr[5]=="1"?"演示":"执行替换")+'】')+'\
		 <div class="p-2">\
      <table class="table">\
        <tbody>\
          <tr><td class="right w100">店铺ID：</td><td id="shopid" colspan="2"></td></tr>\
          <tr><td class="right">进度：</td>'+Tool.htmlProgress('A')+'</tr>\
          <tr><td class="right">查找规则：</td><td colspan="2"><textarea cols="100" rows="5" class="form-control form-control-sm" id="replaceItem"></textarea></td>\
          </tr>\
          <tr>\
            <td class="right">进度：</td>\
            <td colspan="2">\
              <div class="btn-group btn-group-sm">\
              <button type="button" class="btn btn-secondary" onclick="fun.c02(2);">执行替换</button>\
              <button type="button" class="btn btn-secondary" onclick="fun.c05();">使该店铺在DH【需要更新】</button>\
              </div>\
            </td>\
          </tr>\
          <tr>\
            <td class="right">状态：</td>\
            <td colspan="2">\
              <table class="table table-hover mb-0 table-bordered">\
                <thead class="table-light center"><tr><th class="w500">原图</th><th>查找结果</th></tr></thead>\
                <tbody id="des"></tbody>\
              </table>\
            </td>\
          </tr>\
        </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
	{
		let html='[\
    <r:smtShop size=1 where=" where @.shopid='+obj.arr[4]+'">\
    {\
      "count":<@count/>,\
      "A2":<@page/>,\
      "shopid":"[smtShop:shopid]",\
      "replaceItem":"[smtShop:replaceItem tag=js]"\
    }\
    <r:product size=10 page=2 where=" where @.from=\'aliexpress\' and @.hide<3 and @.shopid=[smtShop:shopid]">,\
    {\
      "id":<:id/>,\
      "fromurl":"<:fromurl/>",\
      "des":"<:des tag=加密/>"\
    }\
    </r:product>\
    </r:smtShop>\
    ]'
		Tool.ajax.a01(html,obj.arr[7],this.a03,this);
  },
  a03:function(arr1)
	{
    this.obj.A1=obj.arr[7];
    this.obj.A2=arr1[0].A2
    this.obj.replaceItem=arr1[0].replaceItem
    let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
    $("#shopid").html(arr1[0].shopid)
    $("#replaceItem").html(arr1[0].replaceItem)
    $("#A1").html(p1+"%").css("width",p1+"%");
    $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（页）');
    this.a04(arr1)
  },
  a04:function(arr1)
	{
    let arr2=arr1[0].replaceItem.split("\n"),arr3=[],sql=[]
    let html=''
    for(let i=1;i<arr1.length;i++)
		{
      
      arr3=this.b01(arr2,unescape(arr1[1].des),arr1[i].id)
			html+='\
      <tr>\
        <td>\
          <div style="height:800px;width:700px;overflow:scroll;">'+arr3[0]+'</div>\
        </td>\
        <td>\
          <div style="height:800px;width:700px;overflow:scroll;">'+arr3[1]+'</div>\
        </td>\
      </tr>';
      sql.push('update @.smtPro set @.des=\''+arr3[2].replace(/'/ig,"''")+'\' where @.id='+arr1[i].id)
    }
    html+='<tr><td colspan="2">'+Tool.page(arr1[0].count,10,7)+'</td></tr>'
    $("#des").html(html)
    this.a05(sql)
  },
	a05:function(sql)
	{
		if(obj.arr[5]=="2")
		{
			Tool.ajax.a01('<r: db="sqlite.aliexpress">'+sql.join("<1/>")+'</r:>',1,this.a06,this);	
		}
  },
  a06:function(t)
	{
		if(t=="")
		{
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
		  this.obj.A1++;
      if(this.obj.A1<=this.obj.A2)
      {
        obj.arr[7]=this.obj.A1;
        this.a02();
      }
      else
      {$("#A2").html((this.obj.A1-1)+'/'+this.obj.A2+'（全部完成）');}
		}
		else
		{alert("出错001："+t);}
  },
  b01:function(arr2,des,id)
	{
    let result2=[],des2=Tool.removeHTMLCode(des,""),patt1,result1;
    for(let j=0;j<arr2.length;j++)
    {
      if(arr2[j].substr(0,4)=="img:")
      {
        patt1=new RegExp('<img[^>]*?src="[^"]*?"[^>]*?>',"ig")
        do
        {
          result1=patt1.exec(des);
          if(result1)
          {
            if(result1[0].indexOf(arr2[j].split("img:")[1])!=-1)
            {
              result2.push(result1[0]);
              des2=des2.replace(result1[0],"")//去图片
            }
           
          }
        }while(result1!=null)
      }
      else
      {
        patt1=new RegExp(arr2[j],"ig")
        do
        {
          result1=patt1.exec(des);
          if(result1)
          {
            result2.push(result1[1]);
            des2=des2.replace(result1[1],"")//去正则表达式选中的内容
          }
        }while(result1!=null)
      }
    }
    return [this.b02(des2,id),result2.join(""),des2]
  },
  b02:function(des2,id)
  {
    let arr=[],html1="",patt1=new RegExp('<img[^>]*?src="([^"]*?)"[^>]*?>',"ig"),result1
    do
    {
      result1=patt1.exec(des2);
      if(result1){arr.push(result1[1]);}
    }while(result1!=null)
    ////////////////////////////////
    for(let i=0;i<arr.length;i++)
    {
      html1+='\
      <img src="'+arr[i]+'" class="border"/>\
      <div class="input-group">\
        <input type="text" class="form-control" id="img'+i+'_'+id+'" value="img:'+arr[i]+'">\
        <button class="btn btn-outline-secondary" type="button" onclick="fun.c03(\''+i+'_'+id+'\');">添加到【查找规则】</button>\
      </div>'
    }
    return html1
  },
  c01:function(page)
  {
    obj.arr[7]=page;
    Tool.main(obj.arr.join("/"))
  },
  c02:function(val)
  {
    obj.arr[5]=val;
    Tool.main(obj.arr.join("/"))
  },
  c03:function(id)
  {
    let val=$("#img"+id).val();
    let str='update @.smtShop set @.replaceItem=\''+this.obj.replaceItem+'\n'+val+'\' where @.shopid='+obj.arr[4]
   Tool.ajax.a01('[<r: db="sqlite.aliexpress">'+str+'</r:>]',1,this.c04,this);	
  },
  c04:function(t)
  { 
    if(t[0]==null){location.reload();}else{alert(t);}
  },
  c05:function()
  {
    let str='[<r: db="sqlite.aliexpress">update @.dhUpPro set @.examine=2 where @.shopid='+obj.arr[4]+'</r:>]'
   Tool.ajax.a01(str,1,this.c04,this);
  }
}
fun.a01();