Object.assign(Tool, {
    delPic: {
        a01: function (This, src, field, proid) {
            This = This.parent();
            This.html("正在删除。。。");
            let html = '{\
            <r:prodes db="sqlite.aliexpress_prodes/' + Tool.pronum(proid, 50) + '" size=1 where=" where @.proid=\'' + proid + '\'">\
                "DHpic":<:'+ field +' tag=0/>\
            </r:prodes>}'
            let oo = {
                This: This,
                src: src,
                field: field,
                proid:proid
            }
            Tool.ajax.a01(html, 1, this.a02, this, oo);
        },
        a02: function (t, oo) {
            let arr = t.DHpic, newDHpic = []
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].picB.shopee != oo.src) {
                    newDHpic.push(arr[i]);
                }
            }
            this.a03(newDHpic, oo)
        },
        a03: function (newDHpic, oo) {
            let str = "update @.prodes set @."+oo.field+"=" + Tool.rpsql(JSON.stringify(newDHpic)) + " where @.proid='" + oo.proid + "'";
            let html = '"ok"<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(oo.proid, 50) + '">' + str + '</r:>'
            Tool.ajax.a01(html, 1, this.a04, this, oo.This);
        },
        a04: function (t, This) {
            if (t == "ok") {
                This.parent().remove();
            }
            else {
                Tool.pre(["出错",t])
            }
        }
    },
})