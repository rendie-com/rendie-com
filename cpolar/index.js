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
    if (count < 60 * 10 / 5) {//最多运行10分钟
      Enable = true;
    }
    else {
      Enable = false;
    }
  }
  console.log('已完成所有任务。');
})();
