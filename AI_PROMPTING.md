1. I have given this task
Project Overview:
You are tasked with building a simplified dashboard that e-commerce merchants use to track the
performance of shoppable videos on their storefronts.

Technical Requirements: 
Backend & Database (SQL)
Design a normalized SQL database with at least the following entities:
● Products: ID, Name, Price, CreatedAt
● Videos: ID, ProductID, VideoURL, Title
● EngagementEvents: ID, VideoID, EventType (e.g., 'view', 'click', 'add_to_cart'), 
Timestamp
Create the following API endpoints:
● POST /api/events: Ingests a new engagement event (simulate webhook traffic).
● GET /api/analytics/videos: Returns a list of videos aggregated with their total views,
clicks, and add_to_cart conversions. Must support basic pagination.

Frontend (React)
Build a clean, responsive dashboard with the following features:
● Data Table: Display the videos and their aggregated metrics (Views, Clicks,
Conversions) fetched from the backend.
● Conversion Rate Column: Calculate and display the conversion rate (Add to Carts /
Views) on the frontend.
● Simulate Traffic Button: A button that, when clicked, fires a random payload to the
POST /api/events endpoint to simulate a user interacting with a video. The table data
should refresh after this action.

I want to understand the requirement first.

2. lets start it with node express typescript react and we will use cloud postgres from aiven.

3. lets go ahead with datbase and table creation and seeding data. here is my aiven daatabase url postgres://avnadmin:<password>@pg-ecomm-ahmad-e256.e.aivencloud.com:16891/defaultdb?sslmode=require

4. perfect let move to api building
5. now lets go ahead with api/analytics/videos

6. lets do quick frontend set up vite react ts 
and following this below 
Build a clean, responsive dashboard with the following features:
● Data Table: Display the videos and their aggregated metrics (Views, Clicks,
Conversions) fetched from the backend.
● Conversion Rate Column: Calculate and display the conversion rate (Add to Carts /
Views) on the frontend.
● Simulate Traffic Button: A button that, when clicked, fires a random payload to the
POST /api/events endpoint to simulate a user interacting with a video. The table data
should refresh after this action.
we just want bare minimum.