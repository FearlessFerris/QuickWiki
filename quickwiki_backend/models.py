# Models for QuickWiki 


# Dependencies 
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship  
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy import func, ForeignKey
import uuid
import datetime


db = SQLAlchemy()


# Models 
class Base( DeclarativeBase ):
    pass 


class User ( Base ):
    """ User Model """

    __tablename__ = 'users'
    id: Mapped[ uuid.UUID ] = mapped_column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
    username: Mapped[ str ] = mapped_column( unique = True, nullable = False )
    email: Mapped[ str ] = mapped_column( unique = True, nullable = False )
    password_hash: Mapped[ str ] = mapped_column( nullable = False )
    image_url: Mapped[ str ] = mapped_column( nullable = True )
    created_at: Mapped[ datetime.datetime ] = mapped_column( server_default = func.now() )
    updated_at: Mapped[ datetime.datetime ] = mapped_column( server_default = func.now(), onupdate = func.now() )


class Search ( Base ): 
    """ Search Model """

    __tablename__ = 'searches'
    id: Mapped[ uuid.UUID ] = mapped_column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
    user_id: Mapped[ uuid.UUID ] = mapped_column( ForeignKey( 'users.id' ), nullable = False )
    search_query: Mapped[ str ] = mapped_column( nullable = False )
    created_at: Mapped[ datetime.datetime ] = mapped_column( server_default = func.now() )

    # Relationships 
    user = relationship( 'User', back_populates = 'searches' )
    result = relationship( 'SearchResult', back_populates = 'search' )


class SearchResult ( Base ): 
    """ Search Results Model """

    __tablename__ = 'search_results'
    id: Mapped[ int ] = mapped_column( primary_key = True, autoincrement = True )
    search_id: Mapped[ uuid.UUID ] = mapped_column( ForeignKey( 'searches.id' ), nullable = False )
    key: Mapped[ str ] = mapped_column( nullable = False )
    title: Mapped[ str ] = mapped_column( nullable = False )
    excerpt: Mapped[ str ] = mapped_column( nullable = False )
    description: Mapped[ str ] = mapped_column( nullable = False )
    thumbnail: Mapped[ dict ] = mapped_column( JSONB, nullable = True )
    created_at: Mapped[ datetime.datetime ] = mapped_column( server_default = func.now() )

    # Relationships 
    search = relationship( 'Search', back_populates = 'results' )


class Page ( Base ):
    """ Page Model """

    __tablename__ = 'pages'
    id: Mapped[ int ] = mapped_column( primary_key = True, autoincrement = True )
    key: Mapped[ str ] = mapped_column( nullable = False, unique = True )
    title: Mapped[ str ] = mapped_column( nullable = False )
    latest_id: Mapped[ int ] = mapped_column( nullable = False )
    latest_timestamp: Mapped[ datetime.datetime ] = mapped_column( nullable = False )
    content_model: Mapped[ str ] = mapped_column( nullable = False )
    liscense_url: Mapped[ str ] = mapped_column( nullable = False )
    liscense_title: Mapped[ str ] = mapped_column( nullable = False )
    html_url: Mapped[ str ] = mapped_column( nullable = False )
    created_at: Mapped[ datetime.datetime ] = mapped_column( server_default = func.now() ) 


class Bookmark ( Base ): 
    """ Bookmark Model """

    __tablename__ = 'bookmarks'
    id: Mapped[ uuid.UUID ] = mapped_column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
    user_id: Mapped[ str ] = mapped_column( ForeignKey( 'users.id' ), nullable = False )
    page_id: Mapped[ int ] = mapped_column( ForeignKey( 'pages.id' ), nullable = False )
    created_at: Mapped[ datetime.datetime ] = mapped_column( server_default = func.now() )

    # Relationships 
    user = relationship( 'User' )
    page = relationship( 'Page' )


class Authorization( Base ):
    """ Authorization Info Model """

    __tablename__ = 'authorizations'
    id: Mapped[ uuid.UUID ] = mapped_column( UUID( as_uuid=True ), primary_key = True, default = uuid.uuid4 )
    user_id: Mapped[ uuid.UUID ] = mapped_column( ForeignKey( 'users.id' ), nullable = False)
    role: Mapped[ str ] = mapped_column( nullable=False )
    permissions: Mapped[ str ] = mapped_column( nullable=False )
    created_at: Mapped[ datetime.datetime ] = mapped_column( server_default = func.now() )
    updated_at: Mapped[ datetime.datetime ] = mapped_column( server_default = func.now(), onupdate = func.now() )


class SessionInfo ( Base ):
    """ Session Info Model """

    __tablename__ = 'sessions'
    id: Mapped[ uuid.UUID ] = mapped_column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
    user_id: Mapped[ uuid.UUID ] = mapped_column( ForeignKey( 'users.id' ), nullable = False )
    session_token: Mapped[ str ] = mapped_column( nullable = False, unique = True )
    created_at: Mapped[ datetime.datetime ] = mapped_column( server_default = func.now() )
    expires_at: Mapped[ datetime.datetime ] = mapped_column( nullable = False )


class ActivityLog ( Base ):
    """ Activity Log Model """

    __tablename__ = 'activity_logs'
    id: Mapped[ uuid.UUID ] = mapped_column( UUID( as_uuid = True), primary_key = True, default = uuid.uuid4 )
    user_id: Mapped[ uuid.UUID ] = mapped_column( ForeignKey( 'users.id' ), nullable = False )
    activity_type: Mapped[ str ] = mapped_column( nullable = False )
    activity_description: Mapped[ str ] = mapped_column( nullable = True )
    created_at: Mapped[ datetime.datetime ] = mapped_column( server_default = func.now() )


class SavedInfo ( Base ):
    """ Saved Information Model """

    __tablename__ = 'saved_information'
    id: Mapped[ uuid.UUID ] = mapped_column( UUID( as_uuid = True ), primary_key = True, default = uuid.uuid4 )
    user_id: Mapped[ uuid.UUID ] = mapped_column( ForeignKey( 'users.id' ), nullable = False )
    info_type: Mapped[ str ] = mapped_column( nullable = False )  
    info_content: Mapped[ str ] = mapped_column( nullable = False )
    created_at: Mapped[ datetime.datetime ] = mapped_column( server_default=func.now() )
 

def connect_db( app ):
    db.app = app
    db.init_app( app )


