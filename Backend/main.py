from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("GROQ_API_KEY") # Your Qroq API keys
frontend_url = os.getenv("FRONTEND_URL") # Your Frontend/client-side web Url
Ai_model = "meta-llama/llama-4-scout-17b-16e-instruct" # Your Ai Model

client = Groq(api_key=api_key)

def prompts() -> str:
    with open('Prompt.txt', 'r') as f:
        return f.read()
PROMPT = prompts()

def bot_response(user_message, model, prompts) -> str:
    model = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user", # user means -> for chatting
                "content": user_message
            },
            {
                "role": "system", # system maens -> your models brain
                "content": prompts # set the custom brain
            }
        ],
        temperature=1,
        max_tokens=500,
        top_p=1
    )

    return model.choices[0].message.content

# ====== now make our backend/server =======
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url, frontend_url],
    allow_headers=["*"],
    allow_methods=["*"],
    allow_credentials=True
)

@app.get("/")
def home():
    return {
        "message": "Welcome to home page"
    }

class Message(BaseModel):
    message: str = None

@app.post("/chat")
def getMessage(msg: Message):
    return {
        "botMessage" : bot_response(
            user_message=msg.message,
            model=Ai_model,
            prompts=PROMPT
        )
    }