from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import code
from .database import engine, Base

Base.metadata.create_all(bind=engine)

app: FastAPI = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(code.router)


@app.get("/")
def hello_word():
    return {"message": "hello world"}
