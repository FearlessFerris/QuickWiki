# QuickWiki Backend Application 


# Dependencies 
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from models import db, create_tables, User, Search, SearchResult, Page, Bookmark, Authorization, SessionInfo, ActivityLog, SavedInfo 


# Create Flask Application Object 
app = Flask( __name__ )
CORS( app )


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


# User Routes
@app.route( '/api/create', methods = [ 'POST' ])
def create():
    """ Create New User Route """

    data = request.get_json();
    print( f'Data: { data }' )

    username = data.get( 'username' )
    password = data.get( 'password' )
    confirm_password = data.get( 'confirmPassword' )
    email = data.get( 'email' )

    if not ( username and password and confirm_password and email ):
        return jsonify({ 'errors': { 'message': 'Please complete all required fields' }}), 400 
    
    if password != confirm_password:
        return jsonify({ 'errors': { 'confirmPassword': 'Passwords do not match!' }}), 400 
    
    try:
        new_user = User.create_user(username=username, email=email, password=password)
        print( f'New User: { new_user }' )
        return jsonify({'message': f'User {new_user.username} Successfully Created!', 'data': {
            'id': new_user.id,
            'username': new_user.username,
            'email': new_user.email,
            'image_url': new_user.image_url,
            'created_at': new_user.created_at
        }}), 200
    except ValueError as e:
        return jsonify({'errors': {'message': str(e)}}), 400
    except Exception as e:
        print( f'500: { e }' )
        return jsonify({'errors': {'message': str(e)}}), 500


@app.route( '/api/login', methods = [ 'POST' ])
def login(): 
    """ Login User Route """

    data = request.get_json();
    username = data.get( 'username' )
    password = data.get( 'password' )
    user = User.authenticate( username, password )
    if user:
        new_session = SessionInfo.create_session_info( user.id )
        session[ 'user_id' ] = str( user.id )
        return jsonify({ 'message': f'Welcome back { username }', 'user_id': str( user.id ), 'session_token': new_session.session_token }), 200 
    else: 
        return jsonify({ 'message': f'Incorrect Login, Please try again!' }), 401
    

