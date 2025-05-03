const r=require('express').Router();
const { saveEncrypted }=require('../services/storage');
r.post('/',async(req,res)=>{
  try{
    const buf=Buffer.from(req.body.transcript,'utf8');
    const uri=await saveEncrypted(buf,req.body.userId);
    res.json({uri});
  }catch(e){ res.status(500).json({error:e.message}); }
});
module.exports=r;
