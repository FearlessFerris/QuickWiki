# QuickWiki Utilities File 

from config import Config 
from sqlalchemy.orm.exc import NoResultFound 
import sqlalchemy
import bcrypt 
import uuid 
import secrets



def get_headers():
    print( 'Getting Headers' )
    return Config.HEADERS


def create_system_user():
    from models import db, User 

    try:
        system_user = User.query.filter_by(username='system').one()
    except sqlalchemy.exc.NoResultFound:
        hashed_pw = bcrypt.hashpw(secrets.token_bytes(16), bcrypt.gensalt(12)).decode('utf-8')
        new_system_user = User(
            username='system',
            email='system@quickwiki.com',
            password_hash=hashed_pw,
            image_url=None,
            upload_image=None
        )
        db.session.add(new_system_user)
        db.session.commit()
        system_user = new_system_user

    return system_user.id