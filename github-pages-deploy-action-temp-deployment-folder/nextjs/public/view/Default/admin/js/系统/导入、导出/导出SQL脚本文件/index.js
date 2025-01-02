'use strict';
var fun=
{
  newDB:{},
  a01:function()
  {
    let html='\
    <header class="panel-heading">\
			<div onclick="Tool.main();">导入</div>\
			<div onclick="Tool.main(\'js03\');" class="active">导出SQL脚本文件</div>\
		</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
        <tbody>\
        <tr><td class="right w150">（1）导出数据库：</td><td><select class="form-select" id="db" onchange="fun.c02($(this).val())">'+this.b01()+'</select></td></tr>\
        <tr><td class="right w150">（2）导出数据表：</td><td><select class="form-select" id="dbtable">'+this.b02("")+'</select></td></tr>\
        <tr><td></td><td><input type="button" class="btn btn-secondary" onclick="fun.c01()" value="开始导出"></td></tr>\
        </tbody>\
      </table>\
    </div>'
    Tool.html(null,null,html)
  },
  b01:function()
  {
		let dbName = "",dbArr={};
		for(let i=0;i<mssql.length;i++)
	  {
			if(mssql[i].db)
			{
				if(mssql[i].db.indexOf("|")==-1)
				{
					dbName=mssql[i].dbType+"."+mssql[i].db
					if(!dbArr[dbName]){dbArr[dbName]=[];}
					dbArr[dbName].push([mssql[i].name,mssql[i].des]);
				}
				else
				{
					let arr=mssql[i].db.split("|"),num=parseInt(arr[1]);
					for(let j=1;j<=num;j++)
					{
						dbName=mssql[i].dbType+"."+arr[0]+j
						if(!dbArr[dbName]){dbArr[dbName]=[];}
						dbArr[dbName].push([mssql[i].name,mssql[i].des]);
					}
				}
			}
			else
			{
				if(!dbArr["default"]){dbArr["default"]=[];}
				dbArr["default"].push([mssql[i].name,mssql[i].des]);
			}
		}
		/////////////////////////////////////////////////
		let str = '<option value="all">所有数据库</option>'
		for(let k in dbArr)
		{
			str+='<option value="'+k+'">'+k+'</option>'
		}
		////////////////////////////////
		this.newDB=dbArr;
		return str;
  },
  b02:function(val)
  {
		let str="",arr2=[],dbArr=this.newDB,arr3=[];
		for(let k in dbArr)
		{
			if(k==val)
			{
				arr2=dbArr[k];
				for(let i=0;i<arr2.length;i++)
				{
					arr3.push(arr2[i][0]);
					str+='<option value="'+arr2[i][0]+'">'+arr2[i][0]+"（"+arr2[i][1]+'）</option>'
				}
			}
		}
		return '<option value="' + (arr3.length == 0 ? 'all' : arr3.join(",")) + '">所有表</option>' + str
	},
  c01:function()
  {
    Tool.open6('js05',$("#db").val(),$("#dbtable").val());
  },
  c02:function(val)
  {
		$("#dbtable").html(this.b02(val));
  }
}
fun.a01();