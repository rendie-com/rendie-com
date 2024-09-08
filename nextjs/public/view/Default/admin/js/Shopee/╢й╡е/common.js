Object.assign(Tool, {
    //状态 | 发货时限
    status_time: function (status, auto_cancel_arrange_ship_date, escrow_release_time, payby_date) {
        let str = "未开发" + status
        switch (status) {
            case 1:
                str = '待付款<br/><font color="#8c8c8c">在' + Tool.js_date_time2(payby_date) + '前完成付款</font>';
                break;
            case 5:
                str = '已取消';
                break;
            //case 2:
            //    str = '已出货<br/><font color="#8c8c8c">等待买家在' + Tool.js_date_time2(escrow_release_time) + '前点选完成订单</font>';
            //    break;
            case 2:
                str = ' 待出货<br/><font color="#8c8c8c">为了避免延迟出货，请在' + Tool.js_date_time2(auto_cancel_arrange_ship_date) + '之前运送</font>';
                break;
            case 4: str = '已完成'; break;
        }
        return str;
    },
})