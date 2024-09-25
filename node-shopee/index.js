// process.env.NODE_SHOPEE_REFRESH_TOKEN = "0cee4a4acbd473a53b4faffb007751287070e2ea117f82b4b83913100954176b"
// process.env.NODE_SHOPEE_ACCESS_TOKEN = "2ff68998b46cded1119bb2fa1406b7f84fdc988bd8bdef2374a379490eefc717"
// process.env.NODE_SHOPEE_NAME = "gather"
///////////////////本地gather登陆 开始//////////////////////////////////////////////////////
process.env.NODE_SHOPEE_REFRESH_TOKEN = "a800dac18ea0bce3ea46bcd533e9b47898d9515bf2bcbaabac68251a6df19367"
process.env.NODE_SHOPEE_ACCESS_TOKEN = "ddc3c04977f7209511538f727c62250caee5513eb4bd3e6221cabd66c15c33d3"
process.env.NODE_SHOPEE_NAME = "gather"
///////////////////本地gather登陆 结束///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
import puppeteer from 'puppeteer';
import path from 'path';
(async () => {
  const pathToExtension = path.join(process.cwd(), 'rendie.com');
  const browser = await puppeteer.launch({
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
      //'--lang=zh-CN',//这个是给客户获取用的
      // '--no-sandbox', 
      // '--disable-setuid-sandbox'
    ],
    ignoreDefaultArgs: ["--enable-automation"],//如何避免Puppeteer被前端JS检测  https://segmentfault.com/a/1190000019539509
    //headless: 'new',//'new':表示后台运行
    headless: false,//false:表示打开窗口  
  });
  ////////////////////////////////////////////////////////////
  let timeout = function (delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(1)
        } catch (e) {
          reject(0)
        }
      }, delay);
    })
  }
  ///////////////////////////////////////////////////////////////
  const page = await browser.newPage();
  await page.evaluateOnNewDocument('const newProto = navigator.__proto__;delete newProto.webdriver;navigator.__proto__ = newProto;');//puppeteer去除webdriver标记问题+打包   https://www.cnblogs.com/yangdadaBO/p/14956397.html
  await page.setViewport({ width: 1920, height: 1080 });
  /////////////////////////////////////////////////////////////////////////
  const url = "http://localhost:3000/admin.html"
  await page.goto(url);//为什么这个要执行俩次？答：必须要先打开网页才能设置“localStorage”。
  //通过page.evaluate进行localStorag 设置
  await page.evaluate(oo => {
    localStorage.setItem("expires_in", 1722844755);
    //////////////////////////////////////
    localStorage.setItem("refresh_token", oo.refresh_token);
    localStorage.setItem("access_token", oo.access_token);
    localStorage.setItem("name", oo.name);
    ///////////////////////////////////////////////////////////////////////
    localStorage.setItem("menuList", '{"top1":1,"top2":{"18":{"name":"任务","id":"18","isbool":true,"url":"http://localhost:3000/view/Default/admin/html/Shopee/%E4%BB%BB%E5%8A%A1.html?jsFile=js02&return=%2Fview%2FDefault%2Fadmin%2Fhtml%2FShopee%2F%25E4%25BB%25BB%25E5%258A%25A1.html%3FjsFile%3Djs04"}}}');
  }, {
    refresh_token: process.env.NODE_SHOPEE_REFRESH_TOKEN,
    access_token: process.env.NODE_SHOPEE_ACCESS_TOKEN,
    name: process.env.NODE_SHOPEE_NAME,
  });
  await page.goto(url);
  /////////////////////////////////// 
  let count = 0;
  let Enable = true;
  while (Enable) {
    count++
    console.log('已运行：' + ((count * 5) / 60).toFixed(2) + '（分钟）');
    await timeout(5000);//5秒   
    try {
      let content = await page.$eval('title', ele => ele.innerHTML);
      if (count < 60 * 5 / 5) {//最多运行5分钟
        Enable = content == "已完成所有任务。" ? false : true;
      }
      else {
        Enable = false;
      }
    } catch (error) {
      // 处理错误的代码
      console.log("出错退出。")
    }
  }
  ///////////////////////
  await page.close()
  await browser.close()
  console.log('已完成所有任务。');
})();
