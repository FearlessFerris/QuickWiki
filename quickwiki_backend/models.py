from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy import func
from datetime import datetime, timedelta
import uuid
import bcrypt 
import secrets

# Necessary Files 

# Other Settings 
db = SQLAlchemy()
Base = db.Model

class User(Base):
    """ User Model """

    __tablename__ = 'users'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    image_url = Column(String, nullable=True)
    upload_image = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    # Relationships
    pages = relationship('Page', back_populates='user')
    searches = relationship('Search', back_populates='user')
    saved_info = relationship('SavedInfo', back_populates='user')
    authorizations = relationship('Authorization', back_populates='user')
    activity_logs = relationship('ActivityLog', back_populates='user')
    sessions = relationship('SessionInfo', back_populates='user')
    bookmarks = relationship('Bookmark', back_populates='user')

    def __init__(self, username, email, password_hash, image_url=None, upload_image=None):
        self.username = username
        self.email = email
        self.password_hash = password_hash
        self.image_url = image_url
        self.upload_image = upload_image

    @classmethod 
    def create_user(cls, username, email, password, image_url=None, upload_image=None):
        """ Create New User """

        hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(12)).decode( 'utf-8' )
        new_user = cls(username=username, email=email, password_hash=hashed_pw, image_url=image_url, upload_image=upload_image)
        db.session.add(new_user)
        db.session.commit()
        return new_user 

    @classmethod
    def authenticate( cls, username, password ):
        """ Authenticate User """

        user = User.query.filter_by( username = username ).first();
        if user and bcrypt.checkpw( password.encode( 'utf-8' ), user.password_hash.encode( 'utf-8' )):
            return user
        return None

class Search(Base):
    """ Search Model """

    __tablename__ = 'searches'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    search_query = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships     
    user = relationship('User', back_populates='searches')
    results = relationship('SearchResult', back_populates='search')

    def __init__(self, user_id, search_query, created_at):
        self.user_id = user_id
        self.search_query = search_query
        self.created_at = created_at 


class SearchResult(Base):
    """ Search Results Model """

    __tablename__ = 'search_results'
    id = Column(Integer, primary_key=True, autoincrement=True)
    search_id = Column(UUID(as_uuid=True), ForeignKey('searches.id'), nullable=False)
    key = Column(String, nullable=False)
    title = Column(String, nullable=False)
    excerpt = Column(String, nullable=False)
    description = Column(String, nullable=False)
    thumbnail = Column(JSONB, nullable=True)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships 
    search = relationship('Search', back_populates='results')

    def __init__(self, search_id, key, title, excerpt, description, thumbnail, created_at):
        self.search_id = search_id 
        self.key = key 
        self.title = title 
        self.excerpt = excerpt 
        self.description = description 
        self.thumbnail = thumbnail 
        self.created_at = created_at 


class Page(Base):
    """ Page Model """

    __tablename__ = 'pages'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False) 
    key = Column(String, nullable=False, unique=True)
    title = Column(String, nullable=False)
    latest_id = Column(Integer, nullable=False)
    latest_timestamp = Column(DateTime, nullable=False)
    content_model = Column(String, nullable=False)
    license_url = Column(String, nullable=False)
    license_title = Column(String, nullable=False)
    html_url = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships
    user = relationship('User', back_populates='pages')  
    bookmarks = relationship('Bookmark', back_populates='page')  

    def __init__(self, user_id, key, title, latest_id, latest_timestamp, content_model, license_url, license_title, html_url, created_at):
        self.user_id = user_id
        self.key = key
        self.title = title
        self.latest_id = latest_id
        self.latest_timestamp = latest_timestamp
        self.content_model = content_model
        self.license_url = license_url
        self.license_title = license_title
        self.html_url = html_url
        self.created_at = created_at



class SavedInfo(Base):
    """ Saved Information Model """

    __tablename__ = 'saved_information'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    info_type = Column(String, nullable=False)
    info_content = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now()) 

    # Relationships 
    user = relationship('User', back_populates='saved_info')

    def __init__(self, user_id, info_type, info_content, created_at):
        self.user_id = user_id 
        self.info_type = info_type 
        self.info_content = info_content 
        self.created_at = created_at 


class Bookmark(Base):
    """ Bookmark Model """

    __tablename__ = 'bookmarks'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    page_id = Column(Integer, ForeignKey('pages.id'), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships 
    user = relationship('User', back_populates='bookmarks')
    page = relationship('Page', back_populates='bookmarks')

    def __init__(self, user_id, page_id, created_at):
        self.user_id = user_id 
        self.page_id = page_id 
        self.created_at = created_at 


class Authorization(Base):
    """ Authorization Info Model """

    __tablename__ = 'authorizations'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    role = Column(String, nullable=False)
    permissions = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    # Relationships 
    user = relationship('User', back_populates='authorizations')

    def __init__(self, user_id, role, permissions, created_at, updated_at):
        self.user_id = user_id 
        self.role = role 
        self.permissions = permissions 
        self.created_at = created_at 
        self.updated_at = updated_at 


class ActivityLog(Base):
    """ Activity Log Model """

    __tablename__ = 'activity_logs'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    action = Column(String, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships 
    user = relationship('User', back_populates='activity_logs')

    def __init__(self, user_id, action, description = None ):
        self.user_id = user_id 
        self.action = action 
        self.description = description 

    @classmethod
    def create_activity_log( cls, user_id, action, description ):
        """ Create a user ActivityLog Instance """

        new_activity_log = cls( user_id = user_id, action = action, description = description )
        print( new_activity_log )
        db.session.add( new_activity_log )
        db.session.commit()
        return new_activity_log


class SessionInfo(Base):
    """ Session Info Model """

    __tablename__ = 'sessions'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    session_token = Column(String, nullable=False, unique=True)
    created_at = Column(DateTime, server_default=func.now(), nullable = False )
    expires_at = Column(DateTime, nullable=False)

    # Relationships 
    user = relationship('User', back_populates='sessions')

    def __init__(self, user_id, session_token, created_at = None, expires_at = None ):
        self.user_id = user_id 
        self.session_token = session_token
        self.created_at = created_at or datetime.utcnow()
        self.expires_at = expires_at or self.created_at + timedelta( days = 1 )

    @classmethod 
    def create_session_token( cls ):
        """ Create a random Session Token """
        
        return secrets.token_urlsafe( 32 )

    @classmethod 
    def create_session_info( cls, user_id = None ):
        """ Create a new SessionInfo Instance """

        session_token = cls.create_session_token();
        new_session = cls( user_id = user_id, session_token = session_token )
        db.session.add( new_session )
        db.session.commit()
        return new_session
        

def create_tables():
    print('Creating Tables')
    Base.metadata.create_all(db.engine)
    db.session.commit()
