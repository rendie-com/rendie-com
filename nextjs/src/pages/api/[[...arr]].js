import { fs } from 'fs'
import { path } from 'path'

export default async function handler(req, res) {
  let dbpath = path.join(process.cwd(), "/src/img/ad.jpg")
  fs.readFile(dbpath, (err, data) => {
    res.setHeader('content-type', 'image/jpg')
    res.end(data)
  })
}