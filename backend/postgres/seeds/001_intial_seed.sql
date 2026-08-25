TRUNCATE TABLE
    engagement_events,
    videos,
    products
RESTART IDENTITY
CASCADE;

INSERT INTO products (name, price)
VALUES
    ('Classic Running Shoes', 2999.00),
    ('Premium Cotton T-Shirt', 799.00),
    ('Wireless Bluetooth Headphones', 4999.00),
    ('Smart Fitness Watch', 6999.00),
    ('Travel Backpack', 2499.00);


INSERT INTO videos (product_id, video_url, title)
VALUES
    (
        1,
        'https://example.com/videos/running-shoes-demo.mp4',
        'Running Shoes Product Demo'
    ),
    (
        1,
        'https://example.com/videos/running-shoes-review.mp4',
        'Why These Running Shoes Are Different'
    ),
    (
        2,
        'https://example.com/videos/tshirt-demo.mp4',
        'Premium Cotton T-Shirt Lookbook'
    ),
    (
        3,
        'https://example.com/videos/headphones-demo.mp4',
        'Wireless Headphones Sound Test'
    ),
    (
        3,
        'https://example.com/videos/headphones-review.mp4',
        'Headphones Unboxing and Review'
    ),
    (
        4,
        'https://example.com/videos/watch-demo.mp4',
        'Smart Fitness Watch Features'
    ),
    (
        5,
        'https://example.com/videos/backpack-demo.mp4',
        'Travel Backpack Capacity Test'
    );


INSERT INTO engagement_events (video_id, event_type)
VALUES

    -- Video 1
    (1, 'view'),
    (1, 'view'),
    (1, 'view'),
    (1, 'view'),
    (1, 'view'),
    (1, 'click'),
    (1, 'click'),
    (1, 'add_to_cart'),

    -- Video 2
    (2, 'view'),
    (2, 'view'),
    (2, 'view'),
    (2, 'click'),

    -- Video 3
    (3, 'view'),
    (3, 'view'),
    (3, 'view'),
    (3, 'view'),
    (3, 'click'),
    (3, 'add_to_cart'),

    -- Video 4
    (4, 'view'),
    (4, 'view'),
    (4, 'view'),
    (4, 'view'),
    (4, 'view'),
    (4, 'click'),
    (4, 'click'),

    -- Video 5
    (5, 'view'),
    (5, 'view'),
    (5, 'view'),
    (5, 'add_to_cart'),

    -- Video 6
    (6, 'view'),
    (6, 'view'),
    (6, 'click'),

    -- Video 7
    (7, 'view');