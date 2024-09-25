'use strict';
Object.assign(Tool, {
    upDHgateSeep5: {
        a01: function (shippingModel, shippingmodelname) {
            let str = '<option value="">如果被选中，说明没适合它的运费模板</option>', shippingmodelid = "";
            for (let i = 0; i < shippingModel.length; i++) {
                if (shippingmodelname == shippingModel[i].modelName) {
                    str += '<option value="' + shippingModel[i].shippingTempId + '" selected="selected">' + shippingModel[i].modelName + '</option>'
                    shippingmodelid = shippingModel[i].shippingTempId;
                }
                else {
                    str += '<option value="' + shippingModel[i].shippingTempId + '">' + shippingModel[i].modelName + '</option>'
                }
            }
            let html = '\
            <tbody>\
                <tr>\
					<td class="right w150">选择运费模板：</td>\
					<td><select class="form-select w-50">'+ str + '</select></td>\
				</tr>\
            </tbody>';
            $("#body5").html(html);
            return [
                {
                    "name": "shippingmodelid",
                    "value": shippingmodelid
                },
                {
                    "name": "shippingmodelname",
                    "value": shippingmodelname
                }
            ]
        }
    }
})
