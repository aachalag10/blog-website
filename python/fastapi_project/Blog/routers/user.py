from fastapi import APIRouter,Depends,HTTPException,status
from .. import schemas,database,models
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from ..repository import user


router=APIRouter()



get_db=database.get_db

#hashing

# pwd_cxt=CryptContext(schemes=["bcrypt"],deprecated="auto")


router=APIRouter(
    prefix="/user",
    tags=['users']
)

@router.post('/')
def create_user(request:schemas.User,db:Session=Depends(get_db)):
    return user.create(request,db)

@router.get('/me/{id}',response_model=schemas.showUser)
def get_user(id:int,db:Session=Depends(get_db)):
    user=db.query(models.Users).filter(models.Users.id==id).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail=f"User not found"
        )
    return user
