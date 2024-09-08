(async () => {  
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
  //////////////////////////////////////////
  let count = 0;
  let Enable = true;
  while (Enable) {
    count++
    console.log('已运行：' + ((count * 5) / 60).toFixed(2) + '（分钟）');
    await timeout(5000);//5秒    
    let content = await page.$eval('title', ele => ele.innerHTML);
    if (count < 60 * 5 / 5) {//最多运行5分钟
      Enable = content == "已完成所有任务。" ? false : true;
    }
    else {
      Enable = false;
    }
  }
  console.log('已完成所有任务。');
})();
