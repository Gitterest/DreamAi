from fastapi import FastAPI
from pydantic import BaseModel
from nlp_model import extract_and_summarize
from rl_scheduler import schedule_cues

app=FastAPI()
class DreamLog(BaseModel): transcript:str; user_id:str

@app.post("/process-dream")
async def pd(log:DreamLog):
    summary,themes=extract_and_summarize(log.transcript)
    cues=schedule_cues(log.user_id,themes)
    return {"summary":summary,"themes":themes,"cues":cues}
