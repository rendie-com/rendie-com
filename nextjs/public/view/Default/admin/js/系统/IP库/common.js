Object.assign(Tool,{
  header:function()
	{
		let html='\
    <header class="panel-heading">\
      <div onclick="Tool.main()"'+(obj.arr[3]=="-_-20"?' class="active"':'')+'>IP库</div>\
      <div onclick="Tool.main(\'js01\')"'+(obj.arr[3]=="js01"?' class="active"':'')+'>国家分布</div>\
    </header>'
		return html;
	}
})