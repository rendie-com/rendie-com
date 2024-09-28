'use strict';
Object.assign(Tool, {
    dh_album_list: {
        access_token: "",
        a01: function (access_token) {
            this.access_token = access_token;
            this.a02();
        },
        a02: function () {
            let oo = {
                access_token : this.access_token,
                method: "dh.album.list",
                timestamp: (new Date).getTime(),
                v  : "2.0"
            }, url = "http://api.dhgate.com/dop/router";
            $("#thisUrl").val(url);
            $("#thisPost").html(JSON.stringify(oo, null, 2));
            gg.postFetch(url, oo, this.a03, this)
        },
        a03: function (oo) {
            $("#thisJson").html(JSON.stringify(oo, null, 2));
            let obj2 = oo.albWindowList
		    let html="\
			<thead class=\"table-light\">\
			<tr>\
			    <th>相册窗口ID</th>\
			    <th>相册名称</th>\
			    <th>图片总数</th>\
			    <th>默认相册</th>\
			    <th>相册封面图片</th>\
			    <th>相册创建时间</th>\
			    <th>空间大小</th>\
			    <th>相册更新时间</th>\
			</tr>\
			</thead><tbody>"
			for(let i=0;i<obj2.length;i++)
			{
				html+="\
				<tr>\
					<td>"+obj2[i].albWindowId+"</td>\
					<td>"+obj2[i].albName+"</td>\
					<td>"+obj2[i].albNumber+"</td>\
					<td>"+obj2[i].defAlbum+"</td>\
					<td>"+obj2[i].firstImg+"</td>\
					<td>"+obj2[i].insertDate+"</td>\
					<td>"+obj2[i].spaceSize+"</td>\
					<td>"+obj2[i].udpateDate+"</td>\
				</tr>"
			}	
			html ='<table class="table table-hover mb-0 align-middle center">'+html+'</tbody></table>'
			$("#dh_album_list").html(html)
        },

    }
})