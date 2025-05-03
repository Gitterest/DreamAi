import os,json,openai
openai.api_key=os.getenv("OPENAI_API_KEY")

def extract_and_summarize(text:str):
    prompt=(
      "You are a dream analyst. Extract characters, locations, emotions and "
      "summarize. Return JSON with keys 'summary' and 'themes' (list).\n\n"+text
    )
    resp=openai.ChatCompletion.create(
      model="gpt-4",messages=[{"role":"user","content":prompt}],temperature=0.7
    )
    return json.loads(resp.choices[0].message.content)
