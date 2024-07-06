# QuickWiki Utilities File 

from config import Config 
from sqlalchemy.orm.exc import NoResultFound 
import bcrypt 
import uuid 
import secrets



def get_headers():
    print( 'Getting Headers' )
    return Config.HEADERS


def create_system_user():
    """ Create a system user if it doesn't already exist """
    from models import db, User
    
    try:
        system_user = User.query.filter_by(username='system').one()
        return system_user
    except Exception as e:
        hashed_pw = bcrypt.hashpw(secrets.token_urlsafe(16).encode('utf-8'), bcrypt.gensalt(12)).decode('utf-8')
        new_system_user = User(
            id=uuid.uuid4(),
            username='system',
            email='system@example.com', 
            password_hash=hashed_pw
        )
        db.session.add(new_system_user)
        db.session.commit()
        return new_system_user