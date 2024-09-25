'use strict';
Object.assign(Tool, {
    upDHgateSeep6: {
        a01: function (afterSaleID) {

            let str = '\
            <tbody>\
                <tr>\
					<td class="right w150">售后服务模板：</td>\
					<td><input class="form-control w300" type="text" disabled="disabled" value="'+ afterSaleID + '"></td>\
				</tr>\
            </tbody>';
            $("#body6").html(str);
            return [{
                "name": "saleTemplateId",
                "value": afterSaleID
            },
            {
                "name": "saleTemplateName",
                "value": "售后服务"
            },]
        }
    }
})
