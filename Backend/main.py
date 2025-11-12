from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel
from mangum import Mangum
import os

# api_key = os.getenv("GROQ_API_KEY") # Your Qroq API keys
# Ai_model = "meta-llama/llama-4-scout-17b-16e-instruct" # Your Ai Model
frontend_url = os.getenv("FRONTEND_URL", "*") # Your Frontend/client-side web Url

# client = Groq(api_key=api_key)

# def prompts() -> str:
#     try:
#         filepath = os.path.join(os.path.dirname(__file__), "Prompt.txt")
#         with open(filepath, 'r', encoding='utf-8') as f:
#             return f.read()
#     except FileNotFoundError:
#         return "You are a helpful AI assistant."
    
# PROMPT = prompts()
PROMPT = "You are a helpful ai assistent"

# def bot_response(user_message, model, prompts) -> str:
#     model = client.chat.completions.create(
#         model=model,
#         messages=[
#             {
#                 "role": "system", # system maens -> your models brain
#                 "content": prompts # set the custom brain
#             },
#             {
#                 "role": "user", # user means -> for chatting
#                 "content": user_message
#             }
#         ],
#         temperature=1,
#         max_tokens=500,
#         top_p=1
#     )

#     return model.choices[0].message.content

# ====== now make our backend/server =======
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "*"],
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
    # return {
    #     "botMessage" : bot_response(
    #         user_message=msg.message,
    #         model=Ai_model,
    #         prompts=PROMPT
    #     )
    # }
    return {
        "botMessage": f"Bot: {msg.message}"
    }

handler = Mangum(app)