-- Users table
CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password      VARCHAR(255) NOT NULL,           -- hashed password
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Links table
CREATE TABLE links (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    original_url    TEXT NOT NULL,
    short_code      VARCHAR(20) UNIQUE NOT NULL,
    title           VARCHAR(255),
    expires_at      TIMESTAMP WITH TIME ZONE,
    
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Clicks table
CREATE TABLE clicks (
    id              SERIAL PRIMARY KEY,
    link_id         INTEGER NOT NULL REFERENCES links(id) ON DELETE CASCADE,
    
    clicked_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address      VARCHAR(45),                    -- supports IPv6
    user_agent      TEXT,
    referrer        TEXT,
    country         VARCHAR(100)
);