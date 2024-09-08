import { sqlite } from '../../../common/db/sqlite.js'
import { PostgreSQL } from '../../../common/db/PostgreSQL.js'
import { index } from '../../../common/index.js'
import { self_config } from '../../../common/self_config.js'
import { fun } from '../../../common/fun.js'

export const config = {
  api: {
    responseLimit: '5mb',
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};

export default async function handler(req, res) {
  
  let obj = {};
  if (req.method === 'POST') {
    let body = req.body;
    if (body.action == "getToken") {
      if (self_config.default_db == "pg") {
        obj = await PostgreSQL.GetToken(body.name, body.pwd, body.time, req.headers);
      }
      else {
        obj = await sqlite.GetToken(body.name, body.pwd, body.time, req.headers);
      }
    }
    else if (body.list) {
      let list = JSON.parse(body.list)
      let oo = {}
      if (self_config.isInstall) {
        oo = { status: "success" }
      }
      else {
        let o1 = fun.getHeaders(req.rawHeaders, ["token"])
        if (self_config.default_db == "pg") {
          oo = await PostgreSQL.CheckPower(o1.token);
        }
        else {
          oo = await sqlite.CheckPower(o1.token);
        }
      }
      ///////////////////////////////    
      if (oo.status == "success") {
        obj = await index.init(list)
      }
      else { obj = oo; }
    }
    else {
      obj = { status: "error", data: "提交内容格式不对" };
    }
  }
  else {
    obj = { status: "error", data: "必须用POST提交。" };
  }
  res.status(200).json(obj);
}