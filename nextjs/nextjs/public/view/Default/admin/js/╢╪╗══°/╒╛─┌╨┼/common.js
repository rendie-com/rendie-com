Object.assign(Tool, {
    header: function () {
        let html = '\
        <header class="panel-heading">\
            <div '+ (obj.arr[5] == "-_-20" ? 'class= "active"' : '') + 'onclick="Tool.main(\'' + obj.arr[3] + '\');">买卖家消息</div>\
            <div '+ (obj.arr[5] == "2" ? 'class= "active"' : '') + ' onclick="Tool.main(\'' + obj.arr[3] + '/1/2\');">系统消息</div>\
            <div '+ (obj.arr[5] == "3" ? 'class= "active"' : '') + ' onclick="Tool.main(\'' + obj.arr[3] + '/1/3\');">平台公告</div>\
            <div '+ (obj.arr[5] == "4" ? 'class= "active"' : '') + ' onclick="Tool.main(\'' + obj.arr[3] + '/1/4\');">站内信用户</div>\
            <div '+ (obj.arr[3] == "js08" ? 'class= "active"' : '') + ' onclick="Tool.main(\'js08\');">站内信帮助</div>\
        </header>'
        return html;
    }
})