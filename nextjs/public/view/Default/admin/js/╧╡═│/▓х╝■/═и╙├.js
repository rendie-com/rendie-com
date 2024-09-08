'use strict';
let F1=
{
  //F1.getToken(this,this.a02,"",obj.arr[5]);
  //返回 
  //token 1/16c62835e6d552ce6129607396521f79
  //url 
  getToken:function(A,B,C,id)
  {
    let code=Tool.getQueryString("code")
    if(code==null)//是否要登陆
    {this.getToken02([A,B,C,id]);}
    else
    {
      let html='[<r: db="mysql.admin">update @.APIgather set @.token=\''+code+'\' where @.id='+id+'</r:>]'
     Tool.ajax.a01([A,C,this.getToken04, html, this,1,B,id])
    }
  },
  getToken02:function(arr)
  {
    let str='\
    <r:APIgather size=1 where=" where @.id='+arr[3]+'">\
    {\
      "url":"[APIgather:url]",\
      "token":"[APIgather:token]"\
    }\
    </r:APIgather>'
   Tool.ajax.a01( str,1,this.getToken03, this,arr)
  },
  getToken03:function(oo,arr)
  {
    if(oo.token=="")
    {
	    top.location.href=oo.url+"auth.html?url="+top.location.href;
	  }
    else
    {
      arr[0].obj=oo;
      
      arr[1].apply(arr[0],[arr[2]]);
    }
  },
  getToken04:function(oo,arr)
  {
    if(oo[0]==null)
    {
      this.getToken02(arr);
    }
    else
    {
      Tool.at(oo);
    }
  }
}