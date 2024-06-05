# QuickWiki Backend Application 


# Dependencies 
from flask import Flask 
from models import db, connect_db, User, Search, SearchResult, Page, Bookmark, Authorization, SessionInfo, ActivityLog, SavedInfo 
# from flask_debugtoolbar import DebugToolbarExtension

# Create Flask Application Object 
app = Flask( __name__ )
app.debug = True 

# Environmental Variables / Configuration 
app.config[ 'SQLALCHEMY_DATABASE_URI' ] = 'postgresql:///quickwiki'
app.config[ 'SQLALCHEMY_TRACK_MODIFICATIONS' ] = False 
app.config[ 'SECRET_KEY' ] = 'imasecret'
# toolbar = DebugToolbarExtension( app )
connect_db( app )


@app.route( "/" )
def homepage(): 
    """ Homepage of Application """ 

    
    return ''' Welcome to QuickWiki '''
