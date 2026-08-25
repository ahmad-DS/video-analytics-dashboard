CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    video_url TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,

    CONSTRAINT fk_videos_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS engagement_events (
    id BIGSERIAL PRIMARY KEY,
    video_id INTEGER NOT NULL,
    event_type VARCHAR(50) NOT NULL
        CHECK (event_type IN ('view', 'click', 'add_to_cart')),
    event_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_events_video
        FOREIGN KEY (video_id)
        REFERENCES videos(id)
        ON DELETE CASCADE
);


CREATE INDEX IF NOT EXISTS idx_videos_product_id
ON videos(product_id);


CREATE INDEX IF NOT EXISTS idx_engagement_events_video_id
ON engagement_events(video_id);


CREATE INDEX IF NOT EXISTS idx_engagement_events_event_type
ON engagement_events(event_type);