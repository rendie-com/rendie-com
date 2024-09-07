import puppeteer from 'puppeteer';
import path from 'path';
////////////////////////////
(async () => {
  const pathToExtension = path.join(process.cwd(), 'rendie.com');
  const browser = await puppeteer.launch({
    //executablePath: 'D:\\project\\vscode\\node-shopee\\chrome\\win64-128.0.6613.119\\chrome-win64\\chrome.exe',
    //executablePath: '/root/.cache/puppeteer/chrome/linux-127.0.6533.88/chrome-linux64/chrome',
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
      //'--lang=zh-CN',//这个是给客户获取用的
      // '--no-sandbox', 
      // '--disable-setuid-sandbox'
    ],
    ignoreDefaultArgs: ["--enable-automation"],//如何避免Puppeteer被前端JS检测  https://segmentfault.com/a/1190000019539509
    headless: 'new',//'new':表示后台运行
    //headless: false,//false:表示打开窗口  
  });
  ////////////////////////////////////////
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
  //////////////////////////////
  const page = await browser.newPage();
  await page.evaluateOnNewDocument('const newProto = navigator.__proto__;delete newProto.webdriver;navigator.__proto__ = newProto;');//puppeteer去除webdriver标记问题+打包   https://www.cnblogs.com/yangdadaBO/p/14956397.html
  await page.setViewport({ width: 1920, height: 1080 });
  //await page.goto('https://www.rendie.com/admin.html');
  await page.goto('http://192.168.100.1:3000/admin.html');
  //////////////////////////////
  //通过page.evaluate进行localStorage 设置
  await page.evaluate(() => {
    localStorage.setItem("expires_in", 1722844755);
    localStorage.setItem("refresh_token", "0cee4a4acbd473a53b4faffb007751287070e2ea117f82b4b83913100954176b");
    localStorage.setItem("access_token", "2ff68998b46cded1119bb2fa1406b7f84fdc988bd8bdef2374a379490eefc717");
    localStorage.setItem("name", "gather");
    localStorage.setItem("menuList", '{"top1":1,"top2":{"18":{"name":"任务","id":"18","isbool":true,"url":"http://192.168.100.1:3000/view/Default/admin/html/Shopee/%E4%BB%BB%E5%8A%A1.html?jsFile=js02&return=%2Fview%2FDefault%2Fadmin%2Fhtml%2FShopee%2F%25E4%25BB%25BB%25E5%258A%25A1.html%3FjsFile%3Djs04"}}}');
  });
  /////////////////////////////////// 
  let count = 0;
  let Enable = true;
  while (Enable) {
    count++
    console.log('已运行：' + ((count * 5) / 60).toFixed(2) + '（分钟）');
    await timeout(5000);//5秒    
    let content = await page.$eval('title', ele => ele.innerHTML);
    if (count < 60 * 2 / 5) {//最多运行2分钟
      Enable = content == "已完成所有任务。" ? false : true;
    }
    else {
      Enable = false;
    }
  }
  ///////////////////////
  await page.close()
  await browser.close()
  console.log('已完成所有任务。');
})();
