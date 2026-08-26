import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db/client";
import { CreateEventBody, EVENT_TYPES } from "./types/event.types";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

app.post("/api/events", async (req: Request, res: Response) => {
  try {
    const { videoId, eventType } = req.body;

    // Basic validation
    if (!Number.isInteger(videoId) || !EVENT_TYPES.includes(eventType)) {
      return res.status(400).json({
        message: "Invalid videoId or eventType",
      });
    }

    // Check whether the video exists
    const videoResult = await pool.query(
      `
      SELECT id
      FROM videos
      WHERE id = $1
      `,
      [videoId],
    );

    if (videoResult.rowCount === 0) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Insert engagement event
    const eventResult = await pool.query(
      `
      INSERT INTO engagement_events (
        video_id,
        event_type
      )
      VALUES ($1, $2)
      RETURNING
        id,
        video_id AS "videoId",
        event_type AS "eventType",
        event_timestamp AS "timestamp"
      `,
      [videoId, eventType],
    );

    return res.status(201).json({
      message: "Engagement event created",
      data: eventResult.rows[0],
    });
  } catch (error) {
    console.error("Failed to create event:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/api/analytics/videos", async (req: Request, res: Response) => {
  try {
    // Get pagination query parameters
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

    const offset = (page - 1) * limit;

    const analyticsQuery = `
      SELECT
        v.id,
        v.title,
        v.video_url AS "videoUrl",
        p.id AS "productId",
        p.name AS "productName",

        COUNT(*) FILTER (
          WHERE e.event_type = 'view'
        )::int AS views,

        COUNT(*) FILTER (
          WHERE e.event_type = 'click'
        )::int AS clicks,

        COUNT(*) FILTER (
          WHERE e.event_type = 'add_to_cart'
        )::int AS conversions

      FROM videos v

      JOIN products p
        ON p.id = v.product_id

      LEFT JOIN engagement_events e
        ON e.video_id = v.id

      GROUP BY
        v.id,
        v.title,
        v.video_url,
        p.id,
        p.name

      ORDER BY v.id

      LIMIT $1
      OFFSET $2;
    `;

    const analyticsResult = await pool.query(analyticsQuery, [limit, offset]);

    const countResult = await pool.query(
      `
      SELECT COUNT(*)::int AS total
      FROM videos
      `,
    );

    const total = countResult.rows[0].total;

    return res.json({
      data: analyticsResult.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch video analytics:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/api/analytics/videos", async (req, res) => {});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
