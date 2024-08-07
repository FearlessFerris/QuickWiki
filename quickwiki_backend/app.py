# QuickWiki Backend Application 


# Dependencies 
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, create_tables, User, Search, Bookmark, Authorization, SessionInfo, ActivityLog, SavedInfo 
from bs4 import BeautifulSoup
import requests


# Necessary Files 
from config import Config 
from utils import get_headers


# Create Flask Application Object 
app = Flask( __name__ )
CORS( app, origins="http://localhost:3000" )
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


# URLS
search_pages_base = 'https://en.wikipedia.org/w/rest.php/v1/search/page'
get_page_base = 'https://en.wikipedia.org/w/rest.php/v1/page'



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
        ActivityLog.create_activity_log( new_user.id, 'create', '/api/create', 'User Create POST Successful' )
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

    data = request.get_json()
    username = data.get( 'username' )
    password = data.get( 'password' )
    user = User.query.filter_by( username = username ).first()
    if user:
       authenticated_user = User.authenticate( username, password )
       if authenticated_user:
           new_session = SessionInfo.create_session_info( authenticated_user.id )
           session[ 'user_id' ] = str( authenticated_user.id )
           ActivityLog.create_activity_log( authenticated_user.id, 'login', '/api/login', 'User Login POST Successful' )
           access_token = create_access_token( identity = { 'username': username, 'user_id': user.id })
           print( f'Access Token: { access_token }' )
           return jsonify({ 
               'message': f'Welcome back { username }, hope you are well today!', 
               'user_id': str( authenticated_user.id ),  
               'access_token': access_token 
            }), 200
       else: 
           ActivityLog.create_activity_log( user.id, 'login', '/api/login', 'User Login POST Failed' ) 
           return jsonify({ 'message': f'Sorry { username }, the password you entered is incorrect, please try again!' }), 401 
    else: 
        ActivityLog.create_activity_log( None, 'login', '/api/login', 'User Login POST Failed' )
        return jsonify({ 'message': f'Sorry, profile with username: { username } was not found, please try again' }), 401


@app.route( '/api/profile', methods = [ 'GET' ])
@jwt_required()
def profile():
    """ Retrieve User Profile """

    current_user = get_jwt_identity()
    username = current_user.get( 'username' )
    user = User.query.filter_by( username = username ).first()
    if user: 
        user_info = user.get_user_profile()
        ActivityLog.create_activity_log( user.id, 'profile', '/api/profile', 'User Profile GET Successful' )
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
    if user:
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
            ActivityLog.create_activity_log( user.id, 'profile', '/api/profile', 'User Profile PATCH Successful' )
            db.session.commit()
            return jsonify({ 'message': 'User was successfully updated!', 'user': user.get_user_profile() }), 200
        except Exception as e: 
            ActivityLog.create_activity_log( user.id, 'profile', '/api/profile', 'User Profile PATCH Failed' )
            db.session.rollback()
            print( f'Error: { e }')
            return jsonify({ 'message': str(e)}), 500

    return jsonify({ 'message': f'User: { username }, Not Found!' }), 404 


@app.route( '/api/user/bookmark/add/<title>', methods = [ 'POST' ])
@jwt_required()
def add_bookmark( title ):
    """ Add Bookmark to a Users Account """

    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({ 'message': 'Error, must be logged in to add a bookmark!' }), 401 
    user_id = current_user.get( 'user_id' )
    page_url = f'{ get_page_base }/{ title }/html'
    data = { 'user_id': user_id, 'page_id': title, 'page_url': page_url }
    try: 
        bookmark = Bookmark.create_bookmark( user_id, title, page_url )
        ActivityLog.create_activity_log( user_id, 'bookmark', '/api/user/bookmark/add', 'Add Bookmark POST Successful' )
        db.session.commit()
        return jsonify({ 'message': 'You have successfully made a request to /bookmark/add', 'data': data }), 200 
    except Exception as e: 
        db.session.rollback()
        ActivityLog.create_activity_log( user_id, 'bookmark', '/api/user/bookmark/add', 'Add Bookmark POST Failed' )
        db.session.commit()
        return jsonify({ 'message': f'Internal server error, could not add { title } to bookmarks', 'error': str( e ) }), 500    
    
    return jsonify({ 'message': f'Error adding { title } to bookmarks' }), 400  


@app.route( '/api/user/bookmark', methods = ['GET'])
@jwt_required()
def get_bookmarks():
    """ List all Bookmarks on a User Account """

    current_user = get_jwt_identity()
    username = current_user.get( 'username' )
    user_id = current_user.get( 'user_id' )
    if not current_user: 
        return jsonify({ 'message': 'Error, must be logged in to add a bookmark!' }), 401
    try:
        user_bookmarks = Bookmark.get_bookmarks( user_id )
        bookmark_list = [ bookmark.convert_to_dictionary() for bookmark in user_bookmarks ]
        ActivityLog.create_activity_log( user_id, 'bookmark', '/api/bookmark', 'All Bookmark GET Successful' )
        return jsonify({ 'message': f'Here is a list of all of your bookmarks { username }', 'data': bookmark_list }), 200 
    except Exception as e: 
        db.session.rollback()
        ActivityLog.create_activity_log( user_id, 'bookmark', '/api/bookmark', 'All Bookmark GET Failed' )
        return jsonify({ 'message': 'Internal server error, could not retrieve bookmarks', 'error': str( e ) }), 500  
      
    return jsonify({ 'message': 'Error retrieving user bookmarks' }), 400


# Search Routes 
@app.route('/api/search/<query>', methods=['GET'])
@jwt_required(optional=True)
def search(query):
    """ Search results based on Query """

    current_user = get_jwt_identity()
    user_id = None

    if current_user:
        user_id = current_user.get('user_id')

    print( f'UserID: { user_id }')
    print( f'Query: { query }' )
    try:
        headers = get_headers()
        params = {'q': query, 'limit': '100'}
        res = requests.get(search_pages_base, headers=headers, params=params)
        data = res.json()

        if user_id:
            Search.create_search( user_id, query )
            ActivityLog.create_activity_log(user_id, 'search', f'/api/search/{query}', 'Search GET Successful')
        else:
            Search.create_search( user_id, query )
            ActivityLog.create_activity_log(None, 'search', f'/api/search/{query}', 'Search GET Successful')

        db.session.commit()
        return jsonify({'message': 'You have successfully made a search!', 'data': data}), 200

    except Exception as e:
        if user_id:
            Search.create_search( user_id, query )
            ActivityLog.create_activity_log(user_id, 'search', f'/api/search/{query}', 'Search GET Failed')
        else:
            Search.create_search( user_id, query )
            ActivityLog.create_activity_log(None, 'search', f'/api/search/{query}', 'Search GET Failed')

        db.session.rollback()
        return jsonify({'message': str(e)}), 500


@app.route('/api/search/page/<title>', methods=['GET'])
@jwt_required(optional=True)
def search_page(title):
    """ Search specific page based on Query """

    current_user = get_jwt_identity()
    user_id = None

    if current_user:
        user_id = current_user.get('user_id')

    try:
        headers = get_headers()
        json_url = f'{get_page_base}/{title}/bare'
        html_url = f'{get_page_base}/{title}/html'

        json_res = requests.get(json_url, headers=headers)
        html_res = requests.get(html_url, headers=headers)

        json_data = json_res.json()
        print( f'JSON Page Data: ', json_data )
        html_data = html_res.text

        soup = BeautifulSoup( html_data, 'html.parser' )
        base_tag = soup.find( 'base' )
        if base_tag:
            base_tag.decompose()
        
        for anchor in soup.find_all('a', href=True):
            href = anchor['href']
            if href.startswith('/wiki/'):
                anchor['href'] = f'/search/page/{href[6:]}'
            elif href.startswith('//en.wikipedia.org/wiki/'):
                anchor['href'] = f'/search/page/{href.split("/")[-1]}'

        for tag in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']):
            if tag.name == 'h1':
                tag['style'] = 'font-size: 34px;'
            elif tag.name == 'h2':
                tag['style'] = 'font-size: 32px;'
            elif tag.name == 'h3':
                tag['style'] = 'font-size: 30px;'
            elif tag.name == 'h4':
                tag['style'] = 'font-size: 28px;'
            elif tag.name == 'h5':
                tag['style'] = 'font-size: 26px;'
            elif tag.name == 'h6':
                tag['style'] = 'font-size: 25px;'
            elif tag.name == 'p':
                tag['style'] = 'font-size: 20px;'

        cleaned_html = str(soup)

        if user_id:
            ActivityLog.create_activity_log(user_id, 'search', f'/api/search/page/{title}', 'Search Page GET Successful')
        else:
            ActivityLog.create_activity_log(None, 'search', f'/api/search/page/{title}', 'Search Page GET Successful')

        db.session.commit()
        return jsonify({'message': 'You have successfully made a request to /search/page, YAY', 'data': json_data, 'html': cleaned_html}), 200

    except Exception as e:
        if user_id:
            ActivityLog.create_activity_log(user_id, 'search', f'/api/search/page/{title}', 'Search Page GET Failed')
        else:
            ActivityLog.create_activity_log(None, 'search', f'/api/search/page/{title}', 'Search Page GET Failed')

        db.session.rollback()
        return jsonify({'message': str(e)}), 500
    


   




    

        
    





