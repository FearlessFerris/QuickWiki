# QuickWiki Backend Application 


# Dependencies 
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, create_tables, User, Search, SearchResult, Page, Bookmark, Authorization, SessionInfo, ActivityLog, SavedInfo 


# Create Flask Application Object 
app = Flask( __name__ )
CORS( app )
jwt = JWTManager( app )


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
    image_url = data.get( 'imageUrl' )
    upload_image = data.get( 'uploadImage' )

    if not ( username and password and confirm_password and email ):
        return jsonify({ 'errors': { 'message': 'Please complete all required fields' }}), 400 
    
    if password != confirm_password:
        return jsonify({ 'errors': { 'confirmPassword': 'Passwords do not match!' }}), 400 
    
    try:
        new_user = User.create_user(username=username, email=email, password=password, image_url = image_url, upload_image = upload_image )
        print( f'New User: { new_user }' )
        return jsonify({'message': f'User {new_user.username} Successfully Created!', 'data': {
            'id': new_user.id,
            'username': new_user.username,
            'email': new_user.email,
            'image_url': new_user.image_url,
            'upload_image': new_user.upload_image, 
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
    user = User.query.filter_by( username = username ).first()
    if user:
       authenticated_user = User.authenticate( username, password )
       if authenticated_user:
           new_session = SessionInfo.create_session_info( authenticated_user.id )
           session[ 'user_id' ] = str( authenticated_user.id )
           ActivityLog.create_activity_log( authenticated_user.id, 'login', 'User Login Successful' )
           access_token = create_access_token( identity = { 'username': username })
           print( f'Access Token: { access_token }' )
           return jsonify({ 
               'message': f'Welcome back { username }, hope you are well today!', 
               'user_id': str( authenticated_user.id ),  
               'access_token': access_token 
            }), 200
       else: 
           ActivityLog.create_activity_log( user.id, 'login failed', 'User Login Failed' ) 
           return jsonify({ 'message': 'Incorrect Login, Please try again' }), 401 
    else: 
        ActivityLog.create_activity_log( None, 'login failed', f'Login attempt for username: { username } failed' )
        return jsonify({ 'message': f'Profile with username: { username } was not found, please try again' })


@app.route( '/api/profile', methods = [ 'GET' ])
@jwt_required()
def profile():
    """ Retrieve User Profile """

    current_user = get_jwt_identity()
    username = current_user.get( 'username' )
    user = User.query.filter_by( username = username ).first()
    if user: 
        user_info = user.get_user_profile()
        print( f'User Info: ', user_info )
        return jsonify({ 'message': f'User: { username } was successfully found!',  'user': user_info }), 200
    return jsonify({ 'message': 'User not found' }), 404









