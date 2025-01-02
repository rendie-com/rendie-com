'use strict';
Object.assign(Tool, {
    proupdhgate_pic: {
        a01: function (pic) {
            let str = '\
            <td colspan="4" class="p-0">\
                <ul class="makeHtmlTab" id="picTab">\
                    <li val="100" class="hover">1.首图【picA】来源图片</li>\
                    <li val="010">2.首图【picB】无水印图片</li>\
                    <li val="001">3.首图【picC】有水印图片</li>\
                </ul>\
                <div name="100_pic">'+ this.b01(pic, "picA") + '</div>\
                <div name="010_pic" class="hide">'+ this.b01(pic, "picB") + '</div>\
                <div name="001_pic" class="hide">'+ this.b01(pic, "picC") + '</div>\
            </td>'
            return str;
        },
        b01: function (pic, picABC) {
            var str = "", fileurlA = "", fileurlB = "";
            if (pic == 0) {
                str = '<figure class="figure border mb-1 mt-1 p-1 w100 center">还没有首图</figure>';
            }
            else {
                if (picABC == "picA") {
                    fileurlA = 'https://ae02.alicdn.com/kf/' + pic[picABC].fileurl;
                    fileurlB = 'https://ae02.alicdn.com/kf/' + pic[picABC].fileurl + '_200x200.jpg';
                    str += this.b02(fileurlA, fileurlB)
                }
                else if (picABC == "picB" || picABC == "picC") {
                    if (pic[picABC]) {
                        fileurlA = 'https://image.dhgate.com/webp/m/100x100/' + pic[picABC].fileurl;
                        fileurlB = 'https://image.dhgate.com/' + pic[picABC].fileurl
                        str += this.b02(fileurlA, fileurlB)
                    }
                    else {
                        str += ' <figure class="figure border mb-1 mt-1 p-1 w100 center">未上传图片</figure>'
                    }
                }
            }
            return str;
        },
        b02: function (fileurlA, fileurlB) {
            let str = '\
            <figure class="figure border mb-1 mt-1 p-1 pb-0">\
                <a href="' + fileurlA + '" target="_blank">\
                <img src="' + fileurlB + '" class="figure-img img-fluid rounded w100">\
                </a>\
            </figure>';
            return str;
        }
    }
});