'use strict';
var fun =
{
    a01: function () {       
        obj.params.folder = obj.params.folder ? obj.params.folder : "./"//站点根目录
        this.a02()
    },
    a02: function () {
        let data = [{
            action: "fs",
            fun: "readdir",
            path: obj.params.folder,

        },{
            action: "process",
            fun: "cwd",
        },{
            action: "__dirname",      
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {   
        t[1]=t[1].replace(/\\/g, "\/")+"/"
        if(obj.params.folder=="./"){obj.params.folder = t[1];}       
        let data1 = [],data2 = [],arr = t[0].sort()
        for (let i = 0; i < arr.length; i++) {
            data1.push({
                action: "fs",
                fun: "stat",
                path: obj.params.folder+"/"+ arr[i],
            })
            data2.push({
                action: "fs",
                fun: "access",
                path: obj.params.folder+"/" + arr[i],
                mode: 2,
            })
        }        
        let oo={
            readdir:arr,
            cwd:t[1],
            __dirname:t[2].replace(/\\/g, "\/")+"/"
        }       
        let data3=data1.concat(data2)       
        Tool.ajax.a01(data3, this.a04, this, oo);
    },
    a04: function (t1,oo) {            
        let html1 = this.b01(t1,oo.readdir,obj.params.folder);
        let html2 = '\
        <header class="panel-heading">文件管理</header>\
        <div class="p-2">\
            '+this.b03(oo.cwd,"",obj.params.folder,oo.__dirname)+'\
            <table class="table table-hover align-middle center">\
                <thead class="table-light">\
                    <tr>\
                        <th class="w50">编号</th>\
                        <th class="left">文件名</th>\
                        <th class="right">文件大小</th>\
                        <th>写入权限</th>\
                        <th>访问时间</th>\
                        <th>修改时间</th>\
                        <th>创建时间</th>\
                    </tr>\
                    </thead>\
                <tbody>\
                '+ html1 + '\
            </tbody>\
            </table>\
                    <div class="input-group">\
                    <input type="file" class="form-control" id="UploadFile">\
                    <button type="button" class="btn btn-outline-secondary" onclick="fun.c01($(this),\''+ obj.params.folder + '\');">开始上传</button>\
                    </div>\
        </div>'
        Tool.html(null, null, html2)
    },
    b01: function (arr1, arr2,folderPath) {
        let folder=[],file=[],len=arr1.length/2
        for (let i = 0; i < arr2.length; i++) {
            if(arr1[i].isDirectory){
                folder.push('\
                <tr>\
                   <td>'+(folder.length+1)+'</td>\
                   <td class="left" style="padding-left:25px;position: relative;">'+this.b05()+'\
                        <a onclick="Tool.main(\'?folder='+ folderPath+arr2[i]+"/"+ '\');" href=\'javascript:\'>\
                            <img src="/'+ o.path + 'admin/img/icon/folder.gif" class="w20 mx-1">' + arr2[i] + '\
                        </a>\
                    </td>\
                    <td class="right">-</td>\
                    <td>'+(arr1[len+i].length==0?'无':'有')+'</td>\
                    <td>'+ Tool.js_date_time2(arr1[i].atimeMs/1000)+ '</td>\
                    <td>'+ Tool.js_date_time2(arr1[i].mtimeMs/1000)+ '</td>\
                    <td>'+ Tool.js_date_time2(arr1[i].birthtimeMs/1000)+'</td>\
                </tr>')
            }
            if(arr1[i].isFile){                
                    file.push('\
                        <tr>\
                            <td>'+(file.length+1)+'</td>\
                            <td class="left" style="padding-left:25px;position: relative;">'+this.b05()+'<a href=\'javascript:\'>'+Tool.fileImg(arr2[i]) + arr2[i] + '</a></td>\
                            '+ Tool.renderSize(arr1[i].size)+'\
                            <td>'+(arr1[len+i].length==0?'无':'有')+'</td>\
                            <td>'+ Tool.js_date_time2(arr1[i].atimeMs/1000)+ '</td>\
                            <td>'+ Tool.js_date_time2(arr1[i].mtimeMs/1000)+ '</td>\
                            <td>'+ Tool.js_date_time2(arr1[i].birthtimeMs/1000)+ '</td>\
                        </tr>')
                               
            }                
        }
        return folder.join("")+file.join("");
    },
    //当前位置
    b02: function (absPath) {
        let pathArr2 = [], pathArr = [];
        let arr = absPath.split("/"),len= arr.length-1
        for (let i = 0; i < len; i++) {
            if (i == len - 1) {//最后一个目录，不用给链接
                pathArr2.push('<span class="m-1">'+arr[i]+'</span>')
            }
            else {
                pathArr.push(arr[i])
                pathArr2.push('<a href="javascript:;"onclick="Tool.main(\'?folder=' + pathArr.join("/") + '/\');" class="m'+(i==0?'e':'')+'-1">' + arr[i] + '</a>')
               
            }
        }
        return pathArr2.join("/");
    },
    b03: function (cwd, logicaldisk, folder,__dirname) {       
        let cwd2 = cwd + "public/view/Default/"
        let cwd3="/tmp/"       
        let str = '\
        <table class="mb-2">\
            <tr>\
                <td class="w100 right">分区磁盘：</td>\
                <td>'+ this.b04(logicaldisk) + '</td>\
            </tr>\
            <tr>\
                <td class="right">快捷操作：</td>\
                <td>\
                    <a href="javascript:;" onclick="Tool.main(\'?folder=' +cwd + '\');" class="me-3">' + cwd.substring(0,cwd.length-1) + '</a>\
                    <a href="javascript:;" onclick="Tool.main(\'?folder=' + cwd2 + '\');" class="me-3">' + cwd2.substring(0,cwd2.length-1) + '</a>\
                    <a href="javascript:;" onclick="Tool.main(\'?folder=' + __dirname + '\');" class="me-3">' + __dirname.substring(0,__dirname.length-1) + '</a>\
                    <a href="javascript:;" onclick="Tool.main(\'?folder=' + cwd3 + '\');" class="me-3">' + cwd3.substring(0,cwd3.length-1) + '</a>\
                    <a href="javascript:;" onclick="Tool.main(\'?folder=/\');" class="me-3">根目录</a>\
                </td>\
            </tr>\
            <tr>\
                <td class="right">当前位置：</td>\
                <td>'+ this.b02(folder) + '</td>\
            </tr>\
        </table>'
        return str;
    },    
    //分区磁盘
    b04: function (logicaldisk) {   
        let nArr=[]     
        if(logicaldisk.status!="error"){
            let strArr = logicaldisk.split("\r\r\n")
            strArr.shift();              
            for (let i = 0; i < strArr.length-2; i++) {
                strArr[i]=Tool.Trim(strArr[i])            
                nArr.push('<a href="javascript:;" onclick="Tool.main(\'?folder=' + strArr[i] + '/\');" class="m'+(i==0?'e':'')+'-1">' + strArr[i] + '</a>')
            }       
        }        
        return nArr.join("")       
    },
    b05: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
            <li onClick="fun.c05($(this),\'\');"><a class="dropdown-item pointer">压缩</a></li>\
            <li onClick="fun.c04(\'\');"><a class="dropdown-item pointer">删除</a></li>\
		</ul>'
    },
    ////////////////////////////////////////////////////////////////////////////
    c01: function (This, folder) {
        let UploadFile= $("#UploadFile")
        UploadFile.attr("disabled", true)
        This.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>').attr("disabled", true);
        let formData = new FormData();//构造空对象，下面用append 方法赋值。        
        formData.append("file", UploadFile[0].files[0]);              
        Tool.ajax.uploadFile(formData,folder, this.c02, this);
    },
    c02: function (t) {
        Tool.pre(t)
        // if (arr[0].indexOf("/wwwroot/") != -1) {
        //     window.location.reload();
        // }
        // else {
        //     Tool.pre(arr)
        // }
    },
}
$(function () {
    fun.a01()
})

   
 
 // b05: function (arr, obj_arr4, wwwroot) {
    //     let arr1 = arr.sort(), html = "";
    //     for (let i = 0; i < arr1.length; i++) {
    //         let li1 = "", arr2 = arr1[i].split(",")
    //         if (arr2[1] == ".zip") {
    //             if (obj_arr4 != wwwroot) {//如果不是【站点根目录】，就显示
    //                 li1 += '<a class="detail-button" href="javascript:;" onclick="fun.c02(\'' + obj_arr4 + "/" + arr2[0] + '\',\'' + wwwroot + "/" + arr2[0] + '\')">移动到站点根目录</a>\
    //                 &nbsp;|&nbsp;';
    //             }
    //             li1 += '<a class="detail-button" href="javascript:;" onclick="fun.c01(\'' + obj_arr4 + "/" + arr2[0] + '\',\'' + obj_arr4 + '\')">解压缩</a>\
    //             &nbsp;|&nbsp;';
    //         }
    //         else {
    //             li1 = '<a class="detail-button" href="javascript:;" onclick="fun.c05($(this),\'' + (obj_arr4 + "/" + arr2[0]) + '\')">压缩</a>\
    //             &nbsp;|&nbsp;';
    //         }
    //         html += '\
    //         <tr>\
    //             <td class="left">\
    //             <a href="javascript:;" onclick="fun.c07(\''+ (obj_arr4 + "/" + arr2[0]) + '\',\'' + arr2[1] + '\')">\
    //                 ' + Tool.fileImg(arr2[1], obj_arr4 + "/" + arr2[0]) + arr2[0] + '\
    //             </a>\
    //             </td>\
    //             <td class="right">\
    //             '+ li1 + '\
    //             <a href=\'javascript:\' onClick="fun.c03($(this),\''+ (obj_arr4 + "/" + arr2[0]) + '\')">删除</a>\
    //             </td>\
    //             '+ Tool.renderSize(arr2[2]) + '\
    //             <td>'+ arr2[5] + '</td>\
    //             <td>'+ Tool.js_date_time2(arr2[3], "-") + '</td>\
    //             <td>'+ Tool.js_date_time2(arr2[6], "-") + '</td>\
    //             <td>'+ Tool.js_date_time2(arr2[7], "-") + '</td>\
    //         </tr>'
    //     }
    //     return html;
    // },
    // c01: function (a, b) {
    //     Tool.ajax.a01("\"\"<.UnZip(" + a + "," + b + ")/>", 1, Tool.reload);
    // },
    // c02: function (a, b) {
    //     Tool.ajax.a01("\"<.MoveFile(" + a + "," + b + ")/>\"", 1, this.c12, this);
    // },
    // c03: function (This, URL) {
    //     if (confirm('确定要删除文件【' + URL + '】吗？')) {
    //         This.parent().html("<img src='/" + o.path + "admin/img/loading.gif' align='absmiddle'/>");
    //         Tool.ajax.a01("\"<.DelFile(" + URL + ")/>\"", 1, Tool.reload);
    //     }
    // },
    // c04: function (URL) {
    //     if (confirm('确定要删除目录【' + URL + '】吗?')) {
    //         Tool.ajax.a01("\"<.DelFolder(" + URL + ")/>\"", 1, Tool.reload);
    //     }
    // },
    // c05: function (This, a) {
    //     This.parent().html("<img src='/" + o.path + "admin/img/loading.gif' align='absmiddle'/>");
    //     Tool.ajax.a01("\"<.Zip(" + a + ")/>\"", 1, Tool.reload);
    // },
    // c06: function (t) {
    //     if (t == "") {
    //         window.location.reload();
    //     }
    //     else
    //     {
    //         alert("出错:" + t); 
    //     }        
    // },
    // c07: function (url, mode) {
    //     if ("|.config|.asax|.json|.html|.htm|.js|.css|.sql|.txt|".indexOf("|" + mode + "|") != -1) {
    //         Tool.ajax.txt("<.LoadFile(" + url + ")/>", this.c08, this, url);
    //     }
    //     else {
    //         url = "/" + url.split("/wwwroot/")[1]
    //         window.open(url);
    //     }
    // },
    // c08: function (t, url) {
    //     let html = '\
    //     <header class="panel-heading"><a class="arrow_back" onclick="location.reload();"></a>修改文件</header>\
    // 	    <div class="p-2">\
    //       <table class="table table-hover align-middle">\
    //         <tbody>\
    //         <tr><td class="right w100">文件名：</td><td><input type="text" class="form-control form-control-sm" value="'+ url + '" id="url"></td></tr>\
    //         <tr>\
    //           <td class="right">文件内容：</td>\
    //           <td><textarea class="form-control form-control-sm" style="height:500px;" id="des">'+ t + '</textarea></td>\
    //         </tr>\
    //         <tr><td></td><td><button type="button" class="btn btn-secondary btn-sm" onclick="fun.c09()">确定修改</button></td></tr>\
    //         </tbody>\
    //       </table>\
    //     </div>'
    //     Tool.html(null, null, html);
    // },
    // c09: function () {
    //     let url = $("#url").val(), des = Tool.escape($("#des").val())
    //     Tool.ajax.a01("<.SaveFile(" + des + "," + url + ",utf-8)/>", 1, this.c06, this);
    // },
   
    // c12: function (t) {
    //     if (t == "") {
    //         Tool.main(obj.arr[3]);
    //     }
    //     else {
    //         Tool.at("出错：" + t);
    //     }
    // }