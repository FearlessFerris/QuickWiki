# QuickWiki Backend Application 


# Dependencies 
from flask import Flask 
from models import db, create_tables, User, Search, SearchResult, Page, Bookmark, Authorization, SessionInfo, ActivityLog, SavedInfo 


# Create Flask Application Object 
app = Flask( __name__ )


# Environmental Variables / Configuration 
app.config[ 'SQLALCHEMY_DATABASE_URI' ] = 'postgresql://marcus:Civil392601*@localhost:5432/quickwiki'
app.config[ 'SQLALCHEMY_TRACK_MODIFICATIONS' ] = False 
app.config['SQLALCHEMY_ECHO'] = True
app.config[ 'SECRET_KEY' ] = 'imasecret'
app.debug = True 


db.init_app( app )
with app.app_context():
    create_tables()






@app.route( "/" )
def homepage(): 
    """ Homepage of Application """ 


    return ''' Welcome to QuickWiki '''

