Object.assign(Tool,{
  header:function()
	{
		let html='\
    <header class="panel-heading">\
      <div onclick="Tool.main()"'+(obj.arr[3]=="-_-20"?' class="active"':'')+'>无排名</div>\
      <div onclick="Tool.main(\'js04\')"'+(obj.arr[3]=="js04"?' class="active"':'')+'>有排名</div>\
    </header>'
		return html;
	}
})