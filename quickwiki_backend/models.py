from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy.exc import IntegrityError
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Table
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy import func
from datetime import datetime, timedelta
import uuid
import bcrypt 
import secrets

# Necessary Files 
from utils import create_system_user


# Other Settings 
db = SQLAlchemy()
Base = db.Model


# Association Tables 
bookmark_group_association = Table(
    'bookmark_group_association',
    Base.metadata,
    Column( 'bookmark_id', UUID( as_uuid = True ), ForeignKey( 'bookmarks.id' ), primary_key = True ),
    Column( 'group_id', UUID( as_uuid = True ), ForeignKey( 'bookmark_groups.id' ), primary_key = True )
) 

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
    searches = relationship('Search', back_populates='user')
    saved_info = relationship('SavedInfo', back_populates='user')
    authorizations = relationship('Authorization', back_populates='user')
    activity_logs = relationship('ActivityLog', back_populates='user')
    sessions = relationship('SessionInfo', back_populates='user')
    bookmarks = relationship('Bookmark', back_populates='user')
    bookmark_groups = relationship( 'BookmarkGroup', back_populates = 'user' );

    def __init__(self, username, email, password_hash, image_url=None, upload_image=None):
        self.username = username
        self.email = email
        self.password_hash = password_hash
        self.image_url = image_url
        self.upload_image = upload_image

    def get_user_profile(self):
        """ Retrieve entire User Profile """

        user_info = {
            'id': str(self.id),
            'username': self.username,
            'email': self.email,
            'image_url': self.image_url,
            'upload_image': self.upload_image
        }
        return user_info

    def update_user_profile(self, username=None, password=None, email=None, image_url=None, upload_image=None):
        """ Update Users Profile """

        if self.username:
            self.username = username
        if password: 
            self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(12)).decode('utf-8')
        if self.email:
            self.email = email
        if self.image_url:
            self.image_url = image_url
        if self.upload_image:
            self.upload_image = upload_image
        self.updated_at = func.now()

    @classmethod 
    def create_user(cls, username, email, password, image_url=None, upload_image=None):
        """ Create New User """

        hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(12)).decode('utf-8')
        new_user = cls(username=username, email=email, password_hash=hashed_pw, image_url=image_url, upload_image=upload_image)
        db.session.add(new_user)
        db.session.commit()
        return new_user 

    @classmethod
    def authenticate(cls, username, password):
        """ Authenticate User """

        user = User.query.filter_by(username=username).first()
        if user and bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
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

    def __init__(self, user_id, search_query):
        self.user_id = user_id
        self.search_query = search_query

    @classmethod
    def create_search(cls, user_id, search_query):
        """ Create Search Instance """

        if user_id is None: 
            user_id = create_system_user()
        new_search = cls(user_id=user_id, search_query=search_query)
        db.session.add(new_search)
        db.session.commit()
        return new_search


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
    page_id = Column( String, nullable = False )
    page_url = Column( String, nullable = True )
    group_id = Column(UUID(as_uuid=True), ForeignKey('bookmark_groups.id'), nullable=True)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships 
    user = relationship('User', back_populates='bookmarks' )
    group = relationship( 'BookmarkGroup', secondary = bookmark_group_association, back_populates = 'bookmark' ) 

    def __init__( self, user_id, page_id, page_url = None ):
        self.user_id = user_id
        self.page_id = page_id 
        self.page_url = page_url

    def convert_to_dictionary( self ):
        """ Convert Bookmark Instance to Dictionary """

        return {
            'id': str( self.id ),
            'user_id': str( self.user_id ),
            'page_id': self.page_id,
            'page_url': self.page_url,
            'created_at': self.created_at.strftime('%m/%d/%y')
        }
        
    @classmethod
    def create_bookmark(cls, user_id, page_id, page_url = None ):
        """ Create Bookmark Instance """

        new_bookmark = cls( user_id = user_id, page_id = page_id, page_url = page_url )
        print( f'User_id: { user_id }' )
        print( f'Page_id: { page_id }' )
        print( f'Page_url: { page_url }' )
        db.session.add( new_bookmark )
        db.session.commit()
        return new_bookmark

    @classmethod 
    def get_bookmarks( cls, user_id ):
        """ Retrieve all Bookmarks for a specific user """

        print( 'Retrieving Bookmarks!!!!!!' )
        return cls.query.filter_by( user_id = user_id ).filter( cls.group_id.is_( None )).all()
    
    @classmethod
    def remove_bookmark( cls, user_id, page_id ):
        """ Remove specific user selected Bookmark """

        bookmark = cls.query.filter_by( user_id = user_id, page_id = page_id ).first()
        return bookmark
    
    @classmethod
    def add_to_group( cls, user_id, page_id, group_id ):
        """ Add Bookmark to a Group """

        bookmark = cls.query.filter_by( user_id = user_id, page_id = page_id ).first()
        group = BookmarkGroup.query.filter_by( user_id = user_id, id = group_id ).first()
        if bookmark and group: 
            bookmark.groups.append( group )
            db.session.commit()
        return bookmark
    
    @classmethod
    def remove_from_group(cls, user_id, page_id, group_id):
        """ Remove Bookmark from a Group """
        bookmark = cls.query.filter_by(user_id=user_id, page_id=page_id).first()
        group = BookmarkGroup.query.filter_by(id=group_id).first()
        if bookmark and group:
            if group in bookmark.groups:
                bookmark.groups.remove(group)
                db.session.commit()
        return bookmark



class BookmarkGroup( Base ): 
    """ Bookmark Group Model """

    __tablename__ = 'bookmark_groups'
    id = Column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
    user_id = Column( UUID( as_uuid = True ), ForeignKey( 'users.id' ), nullable = False )
    name = Column( String, nullable = False )
    notes = Column( String, nullable = True )
    image_url = Column( String, nullable = True )
    uploaded_image = Column( String, nullable = True )
    created_at = Column( DateTime, server_default = func.now() )

    # Relationships 
    user = relationship( 'User', back_populates = 'bookmark_groups' )
    bookmark = relationship( 'Bookmark', secondary = bookmark_group_association, back_populates = 'group' )

    def __init__( self, user_id, name, notes = None, image_url = None, uploaded_image = None ):
        self.user_id = user_id 
        self.name = name 
        self.notes = notes 
        self.image_url = image_url 
        self.uploaded_image = uploaded_image 

    @classmethod
    def create_group( cls, user_id, name, notes = None, image_url = None, uploaded_image = None ):
        """ Create a Bookmark Group Instance """

        new_group = cls( user_id = user_id, name = name, notes = notes, image_url = image_url, uploaded_image = uploaded_image )
        print( f'You have just created a new group!!!! { new_group }' )
        db.session.add( new_group )
        db.session.commit()
        return new_group    


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
    endpoint = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships 
    user = relationship('User', back_populates='activity_logs')

    def __init__(self, user_id, action, endpoint, description=None):
        self.user_id = user_id 
        self.action = action 
        self.endpoint = endpoint 
        self.description = description

    @classmethod
    def create_activity_log(cls, user_id, action, endpoint, description):
        """ Create a user ActivityLog Instance """

        if user_id is None: 
            user_id = create_system_user()
        new_activity_log = cls(user_id=user_id, action=action, endpoint=endpoint, description=description)
        print(new_activity_log)
        db.session.add(new_activity_log)
        db.session.commit()
        return new_activity_log


class SessionInfo(Base):
    """ Session Info Model """

    __tablename__ = 'sessions'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    session_token = Column(String, nullable=False, unique=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    expires_at = Column(DateTime, nullable=False)

    # Relationships 
    user = relationship('User', back_populates='sessions')

    def __init__(self, user_id, session_token, created_at=None, expires_at=None):
        self.user_id = user_id 
        self.session_token = session_token
        self.created_at = created_at or datetime.utcnow()
        self.expires_at = expires_at or self.created_at + timedelta(days=1)

    @classmethod 
    def create_session_token(cls):
        """ Create a random Session Token """
        
        return secrets.token_urlsafe(32)

    @classmethod 
    def create_session_info(cls, user_id=None):
        """ Create a new SessionInfo Instance """

        session_token = cls.create_session_token()
        new_session = cls(user_id=user_id, session_token=session_token)
        db.session.add(new_session)
        db.session.commit()
        return new_session
        

def create_tables():
    print('Creating Tables')
    Base.metadata.create_all(db.engine)
    db.session.commit()
