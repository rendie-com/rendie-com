'use strict';
$(function()
{
  $('.tip').focus(function(){
	let $tip=$('<div id="tip"><div class="t_box"><div><s><i></i></s><img onerror="this.src=\'../pic/nopic.png\'" width="300" src="/<.Config(sitePath)/>'+this.value+'" /></div></div></div>');
	$('body').append($tip);
	$('#tip').show('fast');
  }).blur(function(){
	$('#tip').remove();
  }).focus(function(e){
	$('#tip').css({"top":(e.pageY-60)+"px","left":(e.pageX+30)+"px"})
  })
  $("#addnewspic").html(addbig(1)+addnewspicSkin(1))
})
function addbig(j){
  return '<div id="bigpic'+j+'">\
            <input type="hidden" name="picid" value="'+j+'"/>\
			<input type="text" size="6" name="bgcolor" style="border-left:20px #666666 solid;border-right:1px #666666 solid; border-bottom:1px #666666 solid; border-top:1px #666666 solid;">\
			<input type="text" class="tip" size="40" name="pic'+j+'" id="pic'+j+'_1">\
			<iframe src="fckeditor/rendie_upload.htm?pic'+j+'_1" scrolling="no" topmargin="0" width="200" height="30" marginwidth="0" marginheight="0" frameborder="0" align="center"></iframe>\
			<input type="text" size="2" name="W'+j+'" id="W'+j+'_1"/>x\
			<input type="text"size="2" name="H'+j+'" id="H'+j+'_1"/>\
			<input type="button" value="生成" size="2" class="pn" onclick="GenerateImages($(\'#pic'+j+'_1\').val(),\'pic'+j+'_1\',$(\'#W'+j+'_1\').val(),$(\'#H'+j+'_1\').val());"/>\
			<img onclick="$(\'#bigpic'+j+'\').remove();" src="/<.Path/>admin/img/btn_dec.gif" class="pointer" alt="删除第'+j+'组的所有图片" align="absmiddle"/>'+addsmallSkin(j,0)+'</div>'
}
function addbigend(j){
  $("#addnewspicSkin-"+j).before(addbig(j+1)+addnewspicSkin(j+1));	
  $("#addnewspicSkin-"+j).remove()
}
function addnewspicSkin(j){
  return '<div id="addnewspicSkin-'+j+'">\
			 <img src="/<.Path/>admin/img/btn_add.gif" style="cursor:pointer" onclick="addbigend('+j+')"/>&nbsp;&nbsp;\
			 <font color="red">您可以单击前面的按钮添加一组图片</font>\
		   </div>'
}
function addsmallSkin(j,i){
  return '<div id="addsmallSkin'+j+'-'+i+'">\
		    &nbsp;&nbsp;└<img src="/<.Path/>admin/img/btn_add.gif" style="cursor:pointer" onclick="addsmallend('+j+','+i+');"/>&nbsp;&nbsp;\
			<font color="red">您可以单击前面的按钮添加一个"子图片"，也可以按大小生成"子图片"或上传"子图片"</font>\
		  </div>'
}
function addsmall(j,i)
{
	return '\
	<div id="smallpic'+j+'-'+i+'">\
	  &nbsp;&nbsp;├<input type="text" size="2" name="W'+j+'" id="W'+j+'-'+i+'"/>x\
	  <input type="text"size="2" name="H'+j+'" id="H'+j+'-'+i+'"/>\
	  <input type="button" value="生成" size="2" class="pn" onclick="ImagesWH('+j+','+i+')" />\
	  <input type="text" size="30" class="tip" name="pic'+j+'" id="pic'+j+'-'+i+'">\
	  <iframe src="fckeditor/rendie_upload.htm?pic'+j+'-'+i+'" scrolling="no" topmargin="0" width="200" height="30" marginwidth="0" marginheight="0" frameborder="0" align="center"></iframe>\
	  <img onclick="$(\'#smallpic'+j+'-'+i+'\').remove();" src="/<.Path/>admin/img/btn_dec.gif" class="pointer" alt="删除第'+j+'组的'+i+'个图片" align="absmiddle"/>\
	</div>'
}
function addsmallend(j,i){
  $("#addsmallSkin"+j+"-"+i).before(addsmall(j,i+1)+addsmallSkin(j,i+1));	
  $("#addsmallSkin"+j+"-"+i).remove()
}
$(function(){
  $('#pre_addtime').DatePicker({
	  format:'Y/m/d',
	  date: $('#pre_addtime').val(),
	  current: $('#pre_addtime').val(),
	  starts: 1,
	  onBeforeShow: function(){
		  $('#pre_addtime').DatePickerSetDate($('#pre_addtime').val(), true);
	  },
	  onChange: function(formated, dates){
		  $('#pre_addtime').val(formated);
	  }
  });
})
