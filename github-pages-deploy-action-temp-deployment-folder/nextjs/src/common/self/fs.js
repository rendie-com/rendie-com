import fs from 'fs'
import path from 'path'
import axios from 'axios';
import formidable from 'formidable';
import videoshow from 'videoshow';

export const self_fs = {
  a01: async function (obj) {
    let nObj = {}
    switch (obj.fun) {
      case "writeFile": nObj = await this.writeFile(obj.path, obj.data); break;
      case "readdir": nObj = await this.readdir(obj.path); break;
      case "stat": nObj = await this.stat(obj.path); break;
      case "access_sqlite": nObj = await this.access(process.env.NEXTJS_CONFIG_SQLITE.replace("{database}", obj.database), obj.mode); break;
      case "access": nObj = await this.access(obj.path, obj.mode); break;
      case "download_sqlite": nObj = this.download_sqlite(obj.urlArr, obj.database); break;
      case "download": nObj = await this.download(obj.url, obj.path); break;
      case "upload": nObj = await this.upload(obj.folder); break;
      case "videoshow": nObj = await this.videoshow(obj.images); break;
    }
    return nObj;
  },
  videoshow: async function (https_images) {
    let images = [], path
    for (let i = 0; i < https_images.length; i++) {
      path = "public/tmp/" + https_images[i].split("/").pop()
      let r = await this.download(https_images[i], path);
      if (r == "下载完成") {
        images.push(path)
      }
      else {
        console.error("下载图片出错", r)
      }
    }
    ////////////////////////////////////
    return new Promise((resolve) => {
      var videoOptions = {
        fps: 25,// 数值，表示帧速率（每秒传输帧数），默认为 30。
        loop: 5, //视频循环播放的次数，默认为 0，表示不循环。
        transition: true,
        transitionDuration: 1, // seconds
        videoBitrate: 1024,
        videoCodec: 'libx264',
        size: '640x?',//输出视频的分辨率，格式为 <width>x<height>，例如 '640x480'。
        audioBitrate: '128k',//音频码率，影响音质和文件大小。
        audioChannels: 2,
        format: 'mp4',
        pixelFormat: 'yuv420p'
      }
      videoshow(images, videoOptions)
        .audio('src/song.mp3')
        .save(path + '.mp4')
        // .on('start', function (command) {
        //   console.log('ffmpeg process started:', command)
        // })
        .on('error', function (err, stdout, stderr) {
          console.error('Error:', err)        
          console.error('ffmpeg stderr:', stderr)
          resolve(err)
        })
        .on('end', function (output) {
          //console.error('Video created in:', output)
          resolve(output)
        })
    });
  },
  writeFile: async function (dirName, data) {
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
  readdir: async function (path) {
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
  stat: async function (path) {
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
  access: async function (path, mode) {
    return new Promise((resolve) => {
      //nodejs的fs模块API基础应用         https://www.cnblogs.com/ZheOneAndOnly/p/15946915.html   
      fs.access(path, mode, (err) => {
        resolve(!err ? [{}] : []);//为什么要写成这种格式？答：为了能够使用“list:[]”和“elselist:[]”
        //“[{}]”    表示true 
        //“[]”      表示false
      })
    });
  },
  download_sqlite: async function (urlArr, database) {
    let ret = "";
    for (let i = 0; i < urlArr.length; i++) {
      ret = await this.download(urlArr[i], process.env.NEXTJS_CONFIG_SQLITE.replace("{database}", database));
      if (ret == "下载完成") { break; }
    }
    return ret;
  },
  download: async function (url, filePath) {
    //使用Axios下载超过80MB的数据     https://cloud.tencent.com/developer/information/%E4%BD%BF%E7%94%A8Axios%E4%B8%8B%E8%BD%BD%E8%B6%85%E8%BF%8780MB%E7%9A%84%E6%95%B0%E6%8D%AE
    const directoryPath = path.join(filePath, '..'); // 相对于当前文件的上级目录
    return new Promise((resolve) => {
      fs.mkdir(directoryPath, { recursive: true }, (err1) => {
        if (err1) {
          resolve("创建目录失败:" + err1);
        } else {
          //下载 
          axios({
            url,
            method: 'GET',
            responseType: 'stream',
          }).then((response) => {
            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);
            // let loaded = 0;
            // const total = parseInt(response.headers['content-length'], 10);      
            // response.data.on('data', (chunk) => {
            //   loaded += chunk.length;
            //   const progress = Math.floor((loaded * 100) / total);
            //   console.log(`Downloading ${progress}%`);
            //   // 这里可以更新进度条的UI
            // });      
            response.data.on('end', () => {
              resolve("下载完成");
              // 这里可以进行下载完成后的操作
            });
            writer.on('finish', () => {
              writer.close();
            });
          }).catch((error) => {
            // 这里可以处理下载失败的情况
            resolve(error.status);
          });
        }
      })
    })
  },
  upload: async function (folder) {
    // 创建formidable实例
    const form = new formidable.IncomingForm({
      uploadDir: folder, // 设置文件上传的目录
      keepExtensions: true, // 保留文件的扩展名
      multiples: true,
    });
    return new Promise((resolve) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          resolve({ status: "error", data: err });
        }
        else {
          const oldPath = files.file[0].filepath
          const newPath = folder + files.file[0].originalFilename
          fs.renameSync(oldPath, newPath)//移动文件到指定目录
          resolve({ status: "success", data: files.file[0] });
        }
      });
    })
  },
};