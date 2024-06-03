-- Create QuickWiki Database 

DROP DATABASE IF EXISTS quickwiki;
CREATE DATABASE quickwiki;
\c quickwiki




-- Create UUID Extension to generate unique UUID's 
CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';


-- Create Users Table 
CREATE TABLE users ( 
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
    username VARCHAR( 50 ) NOT NULL,
    email VARCHAR( 150 ) NOT NULL, 
    password_hash VARCHAR( 255 ) not null,
    image_url VARCHAR( 255 ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
);


-- Create Searches Table 
CREATE TABLE searches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    search_query TEXT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ( user_id ) REFERENCES users( id )
);


-- Create Bookmarks Table 
CREATE TABLE bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
)