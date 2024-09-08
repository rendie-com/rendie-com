export default async function handler(req, res) {
  const fs = require('fs'); 
  const path = require('path'); 
  //console.log(path.join(process.cwd(),'/src/app/img/ad.jpg'))
  fs.readFile(path.join(process.cwd(),'/src/app/img/ad.jpg'), (err, data) => {
    res.setHeader('content-type', 'image/jpg')
    res.end(data)
  })
}