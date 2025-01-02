'use strict';
var fun =
    {
        a01: function () {
            let str = '\
            <r:action db="sqlite.tool" size=1 where=" where @.id='+ obj.arr[5] + '">\
            {\
              "code":<:code tag=0/>,\
              "js":"<:js/>",\
              "name":"<:name/>"\
            }\
            </r:action>'
            Tool.ajax.a01(str, 1, this.a02, this);
        },
        a02: function (oo) {
            Tool.action.code = oo.code;
            Tool.action.name = oo.name;
            let path = "admin/js/工具/windows插件/打开/"
            Tool.scriptArr(['admin/js/rendie.js',
                'admin/js/common_img/index.js',
                'admin/js/common_img/比较图片获取相似度.js',
                'admin/js/common_img/俩图比较取不同.js',
                'admin/js/common_img/切图复制粘贴.js',
                'admin/js/common_img/查找图片的位置.js',
                'admin/js/common_img/俩图片合并删除重叠.js',
                path + '英雄联盟/common.js',
                path + '英雄联盟/连招/痛苦之拥.js',
                path + '英雄联盟/小地图/英雄.js',
                path + '英雄联盟/小地图/野怪.js',
                path + '英雄联盟/小地图/地图.js',
                path + oo.js]);
        }
    }.a01();