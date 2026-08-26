import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

type VideoAnalytics = {
  id: number;
  title: string;
  videoUrl: string;
  productId: number;
  productName: string;
  views: number;
  clicks: number;
  conversions: number;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type AnalyticsResponse = {
  data: VideoAnalytics[];
  pagination: Pagination;
};

const EVENT_TYPES = [
  "view",
  "click",
  "add_to_cart",
];

function App() {
  const [videos, setVideos] = useState<VideoAnalytics[]>([]);
  const [pagination, setPagination] =
    useState<Pagination | null>(null);

  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);
  const [error, setError] = useState("");

  async function fetchAnalytics(page = 1) {
    try {
      setLoading(true);
      setError("");
      console.log("api url", API_URL);
      const response = await fetch(
        `${API_URL}/api/analytics/videos?page=${page}&limit=10`
      );
      console.log("analytics api response", response);

      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const result: AnalyticsResponse =
        await response.json();

      setVideos(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error(error);
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }

  async function simulateTraffic() {
    if (videos.length === 0) return;

    try {
      setSimulating(true);

      // Pick a random video
      const randomVideo =
        videos[Math.floor(Math.random() * videos.length)];

      // Pick a random event type
      const randomEventType =
        EVENT_TYPES[
          Math.floor(Math.random() * EVENT_TYPES.length)
        ];

      await fetch(`${API_URL}/api/events`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          videoId: randomVideo.id,
          eventType: randomEventType,
        }),
      });

      // Refresh table
      await fetchAnalytics(
        pagination?.page || 1
      );
    } catch (error) {
      console.error(error);
      setError("Failed to simulate traffic");
    } finally {
      setSimulating(false);
    }
  }

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading && videos.length === 0) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Video Analytics Dashboard</h1>

          <p>
            Track the performance of your shoppable videos
          </p>
        </div>

        <button
          onClick={simulateTraffic}
          disabled={simulating || videos.length === 0}
        >
          {simulating
            ? "Simulating..."
            : "Simulate Traffic"}
        </button>
      </header>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Video</th>
              <th>Product</th>
              <th>Views</th>
              <th>Clicks</th>
              <th>Conversions</th>
              <th>Conversion Rate</th>
            </tr>
          </thead>

          <tbody>
            {videos.map((video) => {
              const conversionRate =
                video.views > 0
                  ? (
                      (video.conversions /
                        video.views) *
                      100
                    ).toFixed(2)
                  : "0.00";

              return (
                <tr key={video.id}>
                  <td>{video.title}</td>

                  <td>{video.productName}</td>

                  <td>{video.views}</td>

                  <td>{video.clicks}</td>

                  <td>{video.conversions}</td>

                  <td>{conversionRate}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="pagination">
          <button
            disabled={pagination.page === 1}
            onClick={() =>
              fetchAnalytics(pagination.page - 1)
            }
          >
            Previous
          </button>

          <span>
            Page {pagination.page} of{" "}
            {pagination.totalPages}
          </span>

          <button
            disabled={
              pagination.page ===
              pagination.totalPages
            }
            onClick={() =>
              fetchAnalytics(pagination.page + 1)
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;