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
    
    print( 'hello' )
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
    image_url = data.get( 'image_url' )
    upload_image = data.get( 'upload_image' )


    if not ( username and password and confirm_password and email ):
        return jsonify({ 'errors': { 'message': 'Please complete all required fields' }}), 400 
    
    if password != confirm_password:
        return jsonify({ 'errors': { 'confirmPassword': 'Passwords do not match!' }}), 400 
    try:
        new_user = User.create_user(username=username, email=email, password=password, image_url = image_url, upload_image = upload_image )
        ActivityLog.create_activity_log( new_user.id, 'create', '/api/create', 'User Successfully Created' )
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
           ActivityLog.create_activity_log( authenticated_user.id, 'login', '/api/login', 'User Login Successful' )
           access_token = create_access_token( identity = { 'username': username })
           print( f'Access Token: { access_token }' )
           return jsonify({ 
               'message': f'Welcome back { username }, hope you are well today!', 
               'user_id': str( authenticated_user.id ),  
               'access_token': access_token 
            }), 200
       else: 
           ActivityLog.create_activity_log( user.id, 'login failed', '/api/login', 'User Login Failed' ) 
           return jsonify({ 'message': 'Incorrect Login, Please try again' }), 401 
    else: 
        ActivityLog.create_activity_log( None, 'login failed', '/users/login', f'Login attempt for username: { username } failed' )
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
        ActivityLog.create_activity_log( user.id, 'profile', '/api/profile', 'User Profile Successful' )
        print( f'User Info: ', user_info )
        return jsonify({ 'message': f'User: { username } was successfully found!',  'user': user_info }), 200
    return jsonify({ 'message': 'User not found' }), 404


@app.route( '/api/profile', methods = [ 'PATCH' ])
@jwt_required()
def update_profile():
    """ Update User Profile """

    current_user = get_jwt_identity()
    username = current_user.get( 'username' )
    user = User.query.filter_by( username = username ).first()
    if user :
        data = request.json
        print( f'Responde Data: ', data )
        try:
            user.update_user_profile( 
                username = data.get( 'username' ),
                password = data.get( 'password' ),
                email = data.get( 'email' ),
                image_url = data.get( 'image_url' ),
                upload_image = data.get( 'upload_image' )
            )
            db.session.commit()
            return jsonify({ 'message': 'User was successfully updated!', 'user': user.get_user_profile() }), 200
        except Exception as e: 
            db.session.rollback()
            print( f'Error: { e }');
            return jsonify({ 'message': str(e)}), 500

    return jsonify({ 'message': f'User: { username }, Not Found!' }), 404 







