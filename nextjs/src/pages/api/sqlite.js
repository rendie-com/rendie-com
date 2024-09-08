export const config = {
  api: {
    responseLimit: '5mb',
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};

export default async function handler(req, res) {
  try {
  const sqlite3 = require('sqlite3').verbose();
  const path = require('path');
  //注：这里这么写是为会发布后能访问数据库
  let dbpath=path.join(process.cwd(),"/sqlite/shopee/gather/pro/tw.db")  
  dbpath=path.join(process.cwd(),"/sqlite/shopee/gather/pro/my.db")  
  dbpath=path.join(process.cwd(),"/sqlite/shopee/gather/pro/br.db") 
  ////////////////////////////////////////////////////////////// 
  dbpath=path.join(process.cwd(),"/sqlite/shopee/gather/users/tw.db")  
  dbpath=path.join(process.cwd(),"/sqlite/shopee/gather/users/my.db")  
  dbpath=path.join(process.cwd(),"/sqlite/shopee/gather/users/br.db")  
  /////////////////////////////////////////////////////////////////
  dbpath=path.join(process.cwd(),"/sqlite/shopee/gather/accounts/tw.db")  
  dbpath=path.join(process.cwd(),"/sqlite/shopee/gather/accounts/my.db")  
  dbpath=path.join(process.cwd(),"/sqlite/shopee/gather/accounts/br.db")  
  /////////////////////////////////////////////////////////////////
  dbpath=path.join(process.cwd(),"/sqlite/shopee/task/task.db")  
  /////////////////////////////////////////////////////////////////
  dbpath=path.join(process.cwd(),"/sqlite/shopee/seller.db")  
  ///////////////////////////////////////////////////////////////
  const db = new sqlite3.Database(dbpath);// 创建一个新的SQLite数据库实例
  res.status(200).json(await new Promise((resolve, reject) => {
    //查询所有的用户数据
    db.all("select count(1) as total FROM rd_table", (err, rows) => {
      db.close();
      if (err) {
        reject(err.message);
      }
      resolve(rows)
    });
  }));
} catch (error) {
  let r = {
      status: "error",
      data: "查询数据库出错了：",
      error: error,
     
  };
  res.status(200).json(r);
}
}
