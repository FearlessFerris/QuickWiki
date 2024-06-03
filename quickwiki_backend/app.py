# QuickWiki Backend Application 


# Dependencies 
from flask import Flask 
from models import db, connect_db 


# Create Flask Application Object 
app = Flask( __name__ )


# Environmental Variables / Configuration 
app.config[ 'SQLALCHEMY_DATABASE_URI' ] = 'postgresql:///quickwiki'
connect_db( app )


@app.route( "/" )
def homepage(): 
    """ Homepage of Application """ 


    return ''' Welcome to QuickWiki '''
