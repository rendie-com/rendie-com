import { fun } from '../../common/fun.js'
export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function handler(req, res) {
    let oo=fun.getHeaders(req.rawHeaders,["folder","token"])
    let obj = await fun.upload(req, oo.folder)
    res.status(200).json(obj);
}