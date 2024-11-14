import crypto from 'crypto';

export const fun = {
  vStr: function () {
    return "这个主要是做‘加密’所加的参数，从而可以保证不被别人猜到来破解。同时也是仿伪标志。【这是rendie.com的仿伪标志，他人用必定是想盗号】";
  },
  //如果有10天没有登录，则更新Random字段
  getRandom: function (Random, LastLoginTime) {
    //如果有10天没有登录，则更新Random字段
    let ts = Date.now() / 1000 - LastLoginTime;
    if (ts / 60 / 60 / 24 > 10) {
      Random = this.sha256(crypto.randomBytes(32));
    }
    return Random;
  },
  sha256: function (t) {
    const hash = crypto.createHash('sha256'); // 使用SHA256创建一个哈希对象               
    hash.update(t); // 更新哈希对象与传入的数据                
    return hash.digest('hex');// 返回哈希的字符串表示
  },
  rpsql: function (t) {
    if (t == "" || t == null) { return "null"; }
    else {
      return "'" + t.replace(/'/g, "''") + "'";
    }
  },
  uuid: function () {
    return crypto.randomUUID()
  },
  //获取Headers的参数
  getHeaders: function (arr, fArr) {
    let oo = {}
    for (let i = 0; i < arr.length; i += 2) {
      if (fArr.indexOf(arr[i].toLowerCase()) != -1) {
        oo[arr[i].toLowerCase()] = arr[i + 1];
        fArr.shift();
        if (fArr.length == 0) { break; }
      }
    }
    return oo;
  },
  fieldAs: function (fields) {
    let arr = fields.split(","), nArr = []
    for (let i = 0; i < arr.length; i++) {
      nArr.push("@." + arr[i] + " as " + arr[i])
    }
    return nArr;
  }
};