require('dotenv').config();
const express=require('express'), bp=require('body-parser');
const sleepR=require('./routes/sleep'), voiceR=require('./routes/voice');
const app=express(); app.use(bp.json());
app.use('/sleep',sleepR); app.use('/voice',voiceR);
app.listen(process.env.PORT,()=>console.log('OK',process.env.PORT));
