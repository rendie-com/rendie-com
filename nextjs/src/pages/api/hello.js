// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  //console.log(process.env)
  res.status(200).json(process.env);
}
