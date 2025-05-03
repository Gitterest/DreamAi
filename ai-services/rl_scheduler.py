import os,numpy as np
from stable_baselines3 import PPO

MODEL="lucidity_ppo.zip"
model=PPO.load(MODEL) if os.path.exists(MODEL) else None
user_states={}

def schedule_cues(user_id:str,themes:list):
    state=user_states.get(user_id,np.zeros(10))
    if model: action,_=model.predict(state,deterministic=True)
    else: action=np.random.rand(2)
    time_offset=int(action[0]*600)
    cue_type="audio" if action[1]<0.5 else "light"
    user_states[user_id]=state
    return [{"time_offset_sec":time_offset,"cue_type":cue_type}]
