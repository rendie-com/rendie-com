var fun =
{
    a01: function () {
        let str = '\
        [0\
        <r:task db="sqlite.tool" size=20 page=4>\
        ,{\
          "id":<:id/>,\
          "name":"<:name/>",\
          "url":"<:url/>",\
          "starttype":<:starttype/>,\
          "time":"<:time/>",\
          "Isenable":<:Isenable/>\
        }\
        </r:task>]'
        Tool.ajax.a01(str, 1, this.a02, this);
    },
    a02: function (arr) {
        let html = ''
        for (let i = 1; i < arr.length; i++) {
            html += '\
            <tr align="center">\
                <td align="left"><input type="checkbox" value="'+ arr[i].id + '" name="pre_id"  class="checkbox" id="check-' + arr[i].id + '"/><label for="check-' + arr[i].id + '">' + arr[i].id + '</label></td>\
                <td align="left">'+ arr[i].name + '</td>\
                <td><a href="'+ arr[i].url + '" target="_blank">' + arr[i].url + '</a></td>\
                <td>'+ this.b02() + '</td>\
                <td>'+ arr[i].time + '</td>\
                <td> {if 1==<:Isenable/>}<font color=blue>开启</font><else/>关闭</if></td>\
                <td align="center"><a href="<.arr(1)/>/article/<.arr(3)/>/<:id/>.html">修改</a> &nbsp;|&nbsp; <a href="/{r:Config(admin)/>/ajax/admin_tool.aspx/TaskAllDel/<:id/>.html" onClick="return(confirm(\'确定删除该任务吗?\'))">删除</a></td>\
            </tr>'
        }
        html = '\
        <header class="panel-heading">\
          <div class="active">定时任务</div>\
          <div>添加任务</div>\
          <div>开始启动</div>\
        </header>\
        <table class="table table-hover align-middle">\
          <thead class="table-light center">'+ this.b01() + '</thead>\
          <tbody>'+ html + '</tbody>\
        </table>'
        Tool.html(null, null, html);
    },
    b01: function () {
        let str = '\
        <tr align="center">\
            <th width="60">ID</th>\
            <th>任务名称</th>\
            <th>执行网址</th>\
            <th>执行周期</th>\
            <th>执行时间</th>\
            <th>状 态</th>\
            <th>管理操作</th>\
        </tr>'
        return str
    },
    b02: function () {
        /*
        {if <:starttype/>==1}\
        每天
        <else/>
        {if <:starttype/>==2}
        每周&nbsp;&nbsp;
        {if <:week/>==1}星期一<else/>{if <:week/>==2}星期二<else/>{if <:week/>==3}
        星期三
        <else/>
        {if <:week/>==4}
        星期四
        <else/>
        {if <:week/>==5}
        星期五
        <else/>
        {if <:week/>==6}
        星期六
        <else/>
        {if <:week/>==7}
        星期日
        <else/>
        未知星几
                </if>
                </if>
                </if>
                </if>
                </if>
                </if>
                </if>
                <else/>
                {if <:starttype/>==3}
                按时间段
                <else/>
                未知
                </if>
                </if>
                </if>*/
        return ""
    }

}
fun.a01();
/*
      


  function openwin(){ 
  window.open ("<r:type type=<.arr(2)/> size=2 start=1 by=manager><:id/></r:type>", "newwindow", "height=450, width=550, top=0, left=0, toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, status=no")
  } 

*/