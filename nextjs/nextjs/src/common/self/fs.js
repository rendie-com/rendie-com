import { fs } from 'fs'
import { path } from 'path'

export const self_fs = {
  a01: async function (obj) {
    let nObj = {}
    switch (obj.fun) {
      case "writeFile": nObj = await this.writeFile(fs, obj.path, obj.data); break;
      case "readdir": nObj = await this.readdir(fs, obj.path); break;
      case "stat": nObj = await this.stat(fs, obj.path); break;
      case "access": nObj = await this.access(fs, obj.path, obj.mode); break;
    }
    return nObj;
  },
  writeFile: async function (fs, dirName, data) {
    return new Promise((resolve) => {
      //创建目录
      const directoryPath = path.join(dirName, '..'); // 相对于当前文件的上级目录
      fs.mkdir(directoryPath, { recursive: true }, (err1) => {// recursive（是否递归创建不存在的目录，默认false不递归创建）
        if (err1) {
          resolve("创建目录失败:" + err1);
        } else {
          //创建成功
          fs.writeFile(dirName, data, function (err) {
            if (!err) {
              resolve("写入成功");
            }
            else {
              resolve("写入失败:" + err);
            }
          })
        }
      });
    });
  },
  readdir: async function (fs, path) {
    return new Promise((resolve) => {
      fs.readdir(path, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          resolve("获取目录失败:" + err);
        }
      })
    });
  },
  stat: async function (fs, path) {
    return new Promise((resolve) => {
      //https://nodejs.cn/api/fs.html
      //stats详解         https://www.jb51.net/article/135359.htm      
      fs.stat(path, (err, data) => {
        if (!err) {
          data.isDirectory = data.isDirectory();//是否是目录
          data.isFile = data.isFile();//是否是文件
          resolve(data);
        } else {
          resolve("查看目录下文件的具体信息失败:" + err);
        }
      })
    });
  },
  access: async function (fs, path, mode) {
    return new Promise((resolve) => {
      //nodejs的fs模块API基础应用         https://www.cnblogs.com/ZheOneAndOnly/p/15946915.html   
      fs.access(path, mode, (err) => {
        resolve(!err ? true : false);
      })
    });
  },
};