from sqlalchemy import Column, Integer, Text
from .database import Base


class SubmittedCode(Base):
    __tablename__ = "submitted_code"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(Text, nullable=False)
    output = Column(Text, nullable=False)
