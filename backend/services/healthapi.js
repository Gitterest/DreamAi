const axios=require('axios');
const TK=process.env.FITBIT_TOKEN;
async function fetchSleepStages(uid){
  const resp=await axios.get(
    `https://api.fitbit.com/1.2/user/${uid}/sleep/date/today.json`,
    { headers:{Authorization:`Bearer ${TK}`} }
  );
  return resp.data.sleep[0].levels;
}
module.exports={ fetchSleepStages };
