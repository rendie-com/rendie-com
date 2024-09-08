'use strict';
Object.assign(Tool, {
    upDHgateSeep3:
    {
        a01: function (DHpic, DHattrPic, DHdesPic, pic, group, DHdes, description, proid, fromid, name, attrDes, BrandName) {
            let shortDesc1 = description.replace(/aliexpress/ig, "DHgate")
            shortDesc1 = shortDesc1.replace(new RegExp(BrandName, "ig"), " ")//删除标题中的品牌名称
            //产品卖点&特性禁止与产品标题单词重复超过70%，请修改好再重新提交。
            let arr1 = shortDesc1.split(" "), arr2 = []
            for (let i = 0; i < arr1.length; i++) {
                if (name.toLowerCase().indexOf(arr1[i].toLowerCase()) == -1 && arr1[i] !== "&amp;") {
                    arr2.push(arr1[i]);
                }
            }
            shortDesc1 = arr2.join(" ")
            //////////////////////////////////////////////////////////////////////
            let shortDesc2 = "Buyers will be charged for import duties,,taxes and charges which are not included in the item price or shipping charges. We will try our best to reduce the risk of the custom duties.";
            let shortDesc3 = "Excemption clause: The seller shall not hold liable for non-delivery or delay in delivery of the order of natural disasters,war or other causes of Force majeure.";
            let shortDesc4 = "If you have any problems, please do not give us poor feedback. If you have any problems, please contact us.we guarantee the utmost effort to ensure your interests,please understand us.";
            let shortDesc5 = "Notice:\n1.Taxes: Buyer will be responsible for any possible inport duties / taxe \n 2.We only ship your order to the confirming address.Before you pay for it, please make sure your address is correct.";
            DHdes = attrDes.join("") + '<img src="//rendie.com/api/f3/albu/ry/n/14/' + proid + '/' + fromid + '/1bbc-4fe3-a440-9f4586c5a22d.jpg" />' + DHdes
            DHdes += '\
<br/>\
FAQ<br/>\
Q:Could you change others express, we need the goods ungently ? <br/>\
A: Yes, We also send goods by DHL, Fedex, UPS and others if you can pay us more express cost or you buy enought goods.please contact us or leave your messages.<br />\
Q:I am a reseller, i would like to buy many pieces of your item, whtat`s your wholesale price?<br/>\
A:Hi,Thanks for your inquiry,if you would like to buy large quantity,please send us email or leave your messages what your want to us,<br/>\
we would give your the best price within 24 hours.Thanks.<br/>\
Q:Do you have others product that we want to buy together with your product,i have not find it at your store?<br/>\
A:Yes,we can provide what your want,please send us the details and picture,we can find it for you.<br/>\
Q: Do you have minimum order quantity or amount?<br/>\
A: No minimum order quantity, no minimum order amount!<br/>\
Q: When will my order be shipped out ? <br/>\
A: If all the items in your order are in stock, you order will be shipped out in 2 working days.If some items are out of stock, we need 3~10days to produce, please be patience! <br/>\
Q: What should i do if there are problems of the products ? <br/>\
A: Please contact us first via DHgate message and send a photo in 7 days.We will get back to you asap.We will confirm your problem and refund for you in 3 working days.<br/><br/>\
Notice:<br/>\
1.Taxes: Buyer will be responsible for any possible inport duties / taxe <br/>\
2.We only ship your order to the confirming address.Before you pay for it, please make sure your address is correct.<br/><br/>\
Order Process<br/>\
1. We receive your order<br/>\
2. Your order is packed in a warehouse<br/>\
3. We wait for payment confirmation<br/>\
4. Your order is picked up by the shipping company<br/>\
5. Your order arrives in your country<br/>\
6. Your order clears customs<br/>\
7. Your order is in transit<br/>\
8. Your order is delivered<br/><br/>\
2.Buyers will be charged for import duties,,taxes and charges which are not included in the item price or shipping charges. We will try our best to reduce the risk of the custom duties.<br/>\
3.Excemption clause: The seller shall not hold liable for non - delivery or delay in delivery of the order of natural disasters, war or other causes of Force majeure.<br/><br/>\
About the feedback<br/>\
I hope you can give us a good feedback after receiving the goods, which is really important to us<br/>\
If you have any problems, please do not give us poor feedback.If you have any problems, please contact us.we guarantee the utmost effort to ensure your interests, please understand us.<br/><br/>\
How can  I  track my parcel?<br/>\
You can track your parcel on the following website using your tracking number: ① https://www.17track.net/zh-cn ② https://global.cainiao.com (Copied to the browser to open)<br/>\
<br/>\
1. If you are dissatisfied with our item or service, then please follow the good DHgate practice to contact us by message before leaving any feedback. We are committed to resolve all issues in a friendly and satisfactory manner.<br/>\
2. We always reply to DHgate messages within 1 - 2 business days.If you do not get a response from us, then please check your DHgate message.we reply DHgate message<br/>\
3. Original and return shipping fee will not be refunded or reimbursed under all circumstances.You must agree and acknowledge this term if you bid for this item.Therefore, please do not complain about having to ship back at your own expense.<br/>\
<br/>\
1.If have any question, Please contact us by DHgate message ,Reply within 24hours.<br/>\
2. We care about our valued buyers, if you have any questions, our Customer Service staffs will be very glad to help you.We try our best to reply to your emails as soon as possible, however, due to high volume of daily incoming emails and time zone difference, we may not be able to reply your emails immediately.Please allow 24 business hours for us to response.<br/>\
<br/>\
Dear buyers, we appreciate your business, if you are satisfied with our service, please leave us a positive feedback and rate the details of the transaction (Detailed Seller Ratings) with a "PERFECT 5 STARS". [When you rate the shipping time part please take international transit into consideration.] Your recognition will make us more confident to develop business and serve you better.<br/>\
Our goal is to make sure you are a happy buyer and pleasant shopping with us.Please give us DHgate messages message before leaving any 1 or 2 ratings, neutral, negative feedback or open any dispute.We understand the concerns and frustrations you might have, and will do our endeavor to resolve the issues.Please give us the opportunity to resolve any problem.\
Fast shipping method such as DHL, TNT, Fedex, UPS, Air Cargo, EMS are all supported. It takes 3-10 business days for arrival. Contact with us if you need.<br/><br/>\
Return & Resend<br/>\
1)Only defective product will be offered exchange.<br/>\
2)Defective products must be returned within 30 days from the date you placed your order.<br/>\
3)It may take up to 7 business days to process your return after we receive your product.The buyer is responsible for all further shipping fees.'

            $("#body3").html('\
				<tbody>\
                <tr>\
					<td class="right w150">产品图片：</td>\
					<td>'+ this.b01(DHpic, DHattrPic, DHdesPic) + '</td>\
				</tr>\
                <tr>\
					<td class="right">站内外推广图片：</td>\
					<td>'+ this.b02(pic, DHpic, DHattrPic, DHdesPic) + '</td>\
				</tr>\
				<tr>\
                    <td class="right">是否上传主图视频：</td>\
                    <td class="p-0">\
                        <div class="form-check form-check-inline">\
                            <input class="form-check-input" type="radio" name="vedio" disabled="disabled">\
                            <label class="form-check-label" for="inlineRadio3">是</label>\
                        </div>\
                        <div class="form-check form-check-inline">\
                            <input class="form-check-input" type="radio" name="vedio" disabled="disabled" checked="checked">\
                            <label class="form-check-label" for="inlineRadio3">否</label>\
                        </div>\
                    </td>\
                </tr>\
				<tr>\
                    <td class="right">商品分级管理：</td>\
                    <td class="p-0">\
                        <div class="form-check form-check-inline">\
                            <input class="form-check-input" type="radio" name="issample_adult" disabled="disabled" checked="checked">\
                            <label class="form-check-label" for="inlineRadio3">非成人属性</label>\
                        </div>\
                        <div class="form-check form-check-inline">\
                            <input class="form-check-input" type="radio" name="issample_adult" disabled="disabled">\
                            <label class="form-check-label" for="inlineRadio3">成人属性</label>\
                        </div>\
                    </td>\
                </tr>\
                <tr>\
					<td class="right">产品组：</td>\
					<td>'+ this.b03(group) + '</td>\
				</tr>\
                <tr>\
					<td class="right">产品卖点&特性：</td>\
					<td>'+ this.b04(shortDesc1, shortDesc2, shortDesc3, shortDesc4, shortDesc5) + '</td>\
				</tr>\
                <tr>\
					<td class="right">产品详细描述：</td>\
					<td>'+ this.b05(DHdes) + '</td>\
				</tr>\
                </tbody>')
            return this.a02(DHpic, DHattrPic, DHdesPic, pic, group, DHdes, shortDesc1, shortDesc2, shortDesc3, shortDesc4, shortDesc5)
        },
        a02: function (DHpic, DHattrPic, DHdesPic, pic, group, DHdes, shortDesc1, shortDesc2, shortDesc3, shortDesc4, shortDesc5) {
            let picArr = DHpic.concat(DHattrPic).concat(DHdesPic);
            let imglist = [], Rarr = [];
            for (let i = 0; i < picArr.length; i++) {
                if (picArr[i]) {//为什么会有这个判断？答：有的属性图只要个空位置。
                    if (Rarr.indexOf(picArr[i].picC.imgmd5) == -1) {//去复
                        if (Rarr.length == 8) {
                            break;
                        }
                        else {
                            Rarr.push(picArr[i].picC.imgmd5);
                            imglist.push({
                                "class": "com.dhgate.syi.model.TdProductAttachVO",
                                "fileurl": picArr[i].picC.fileurl,
                                "imgmd5": picArr[i].picC.imgmd5,
                                "sequence": i,
                                "filename": "",
                                "width": 0,
                                "height": 0
                            })
                        }
                    }

                }

            }
            //如果没有推广图，就用放大镜的第一张图
            if (!pic) {
                if (DHpic[0]) { pic = DHpic[0]; }
                else if (DHattrPic[0]) { pic = DHattrPic[0]; }
                else if (DHdesPic[0]) { pic = DHdesPic[0]; }
            }
            return this.a03(imglist, pic, group, DHdes, shortDesc1, shortDesc2, shortDesc3, shortDesc4, shortDesc5)
        },
        a03: function (imglist, pic, group, DHdes, shortDesc1, shortDesc2, shortDesc3, shortDesc4, shortDesc5) {
            let Narr2 = [
                {
                    "name": "imglist",
                    "value": JSON.stringify(imglist)
                },
                {
                    "name": "googleshoppingimagelist",
                    "value": pic.picB.fileurl
                },
                /////////视频---改了没反应////////////////////////////
                {
                    "name": "vedio",
                    "value": "0"
                },
                {
                    "name": "videoId",
                    "value": ""
                },
                {
                    "name": "videoName",
                    "value": ""
                },
                {
                    "name": "videoIntroduction",
                    "value": ""
                },
                ////////////////////////////////////////////////
                {
                    "name": "issample_adult",
                    "value": "3"// 3：非成人属性  2：成人属性
                },
                {
                    "name": "productgroupid",
                    "value": ""//产品组
                },
                {
                    "name": "shortDesc1",
                    "value": shortDesc1
                },
                {
                    "name": "shortDesc2",
                    "value": shortDesc2
                },
                {
                    "name": "shortDesc3",
                    "value": shortDesc3
                },
                {
                    "name": "shortDesc4",
                    "value": shortDesc4
                },
                {
                    "name": "shortDesc5",
                    "value": shortDesc5
                },
                {
                    "name": "elm",
                    "value": DHdes
                }
            ]
            return Narr2;
        },
        b01: function (DHpic, DHattrPic, DHdesPic) {
            let str = '', picArr = DHpic.concat(DHattrPic).concat(DHdesPic), Rarr = [];
            for (let i = 0; i < picArr.length; i++) {
                if (picArr[i]) {//为什么会有这个判断？答：有的属性图只要个空位置。
                    if (Rarr.indexOf(picArr[i].picC.imgmd5) == -1) {//去复
                        if (Rarr.length == 8) {
                            break;
                        }
                        else {
                            Rarr.push(picArr[i].picC.imgmd5);
                            str += '\
                        <figure class="figure border mb-0 p-1">\
                            <a href="https://image.dhgate.com/'+ picArr[i].picC.fileurl + '" target="_blank">\
                            <img src="https://image.dhgate.com/webp/m/260x260/'+ picArr[i].picC.fileurl + '" class="figure-img img-fluid rounded h180">\
                            </a>\
                        </figure>'
                        }
                    }
                }
            }
            return str;
        },
        b02: function (pic, DHpic, DHattrPic, DHdesPic) {
            //如果没有推广图，就用放大镜的第一张图
            if (!pic) {
                if (DHpic[0]) {pic = DHpic[0];}
                else if (DHattrPic[0]) { pic = DHattrPic[0]; }
                else if (DHdesPic[0]) { pic = DHdesPic[0]; }                
            }
            return '\
            <figure class="figure border mb-0 p-1">\
                <a href="https://image.dhgate.com/'+ pic.picB.fileurl + '" target="_blank">\
                <img src="https://image.dhgate.com/webp/m/260x260/'+ pic.picB.fileurl + '" class="figure-img img-fluid rounded h180">\
                </a>\
            </figure>'
        },
        b03: function (group) {
            let html1 = '<option value="">请选择产品分组</option>';
            let html2 = '<option value="">请选择产品子分组</option>';
            for (let i = 1; i < group.length; i++) {
                html1 += '<option value="' + group[i].groupId + '">' + group[i].cnname + '</option>';
                if (i == 1) {
                    for (let j = 0; j < group[i].itemChildGroupList.length; j++) {
                        html2 += '<option value="' + group[i].itemChildGroupList[j].groupId + '">' + group[i].itemChildGroupList[j].groupName + '</option>'
                    }
                }
            }
            let str = '<table><tr><td><select class="form-select">' + html1 + '</select></td><td><select class="form-select">' + html2 + '</select></td></tr></table>'
            return str;
        },
        b04: function (shortDesc1, shortDesc2, shortDesc3, shortDesc4, shortDesc5) {
            let str = '<textarea class="form-control" disabled="disabled" name="shortDesc1" placeholder="禁止录入相同的卖点和特性">' + shortDesc1 + '</textarea>'
            str += '您还可以输入' + (300 - shortDesc1.length) + '/300个字符'
            str += '<textarea class="form-control" disabled="disabled" name="shortDesc2" placeholder="禁止录入相同的卖点和特性">' + shortDesc2 + '</textarea>'
            str += '您还可以输入' + (300 - shortDesc2.length) + '/300个字符'
            str += '<textarea class="form-control" disabled="disabled" name="shortDesc3" placeholder="禁止录入相同的卖点和特性">' + shortDesc3 + '</textarea>'
            str += '您还可以输入' + (300 - shortDesc3.length) + '/300个字符'
            str += '<textarea class="form-control" disabled="disabled" name="shortDesc4" placeholder="禁止录入相同的卖点和特性">' + shortDesc4 + '</textarea>'
            str += '您还可以输入' + (300 - shortDesc4.length) + '/300个字符'
            str += '<textarea class="form-control" disabled="disabled" name="shortDesc5" placeholder="禁止录入相同的卖点和特性">' + shortDesc5 + '</textarea>'
            str += '您还可以输入' + (300 - shortDesc5.length) + '/300个字符'
            return str;
        },
        b05: function (DHdes) {
            let str = '<textarea class="form-control" disabled="disabled"  rows="30">' + DHdes + '</textarea>'
            return str;
        }
    }
})
