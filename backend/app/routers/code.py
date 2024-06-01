from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas, database
from ..utils.docker_utils import execute_code_in_docker

router = APIRouter()


@router.post("/test", response_model=schemas.CodeResponse)
def test_code(request: schemas.CodeTestRequest) -> schemas.CodeResponse:
    output: str = execute_code_in_docker(request.code)
    return schemas.CodeResponse(code=request.code, output=output)


@router.post("/submit", response_model=schemas.CodeResponse)
def submit_code(
    request: schemas.CodeSubmitRequest, db: Session = Depends(database.get_db)
) -> schemas.CodeResponse:
    output: str = execute_code_in_docker(request.code)

    db_code: models.SubmittedCode = models.SubmittedCode(
        code=request.code, output=output
    )
    db.add(db_code)
    db.commit()
    db.refresh(db_code)

    return schemas.CodeResponse(code=request.code, output=output)


@router.get("/submissions", response_model=list[schemas.CodeResponse])
def fetch_submitted_code(
    db: Session = Depends(database.get_db),
) -> List[schemas.CodeResponse]:
    submissions: list[schemas.CodeResponse] = reversed(
        db.query(models.SubmittedCode).all()
    )
    return submissions
