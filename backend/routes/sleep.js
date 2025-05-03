const r=require('express').Router();
const { fetchSleepStages }=require('../services/healthApi');
r.get('/:uid',async(req,res)=>{
  try{ const d=await fetchSleepStages(req.params.uid); res.json(d); }
  catch(e){ res.status(500).json({error:e.message}); }
});
module.exports=r;
