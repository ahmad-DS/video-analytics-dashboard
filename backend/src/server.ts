import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db/client";
import {
  CreateEventBody,
  EVENT_TYPES,
} from "./types/event.types";

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

app.get("/api/analytics/videos", async (req, res) => {});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
