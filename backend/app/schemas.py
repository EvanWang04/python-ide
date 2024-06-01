from pydantic import BaseModel


class CodeTestRequest(BaseModel):
    code: str


class CodeSubmitRequest(BaseModel):
    code: str


class CodeResponse(BaseModel):
    code: str
    output: str

    class Config:
        orm_mode = True
