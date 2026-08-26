# Video Analytics Dashboard

A dashboard for viewing and analyzing video performance metrics in a clear, interactive interface. It helps users monitor video engagement, compare performance, and identify trends through visual reports.

## Features

- Video analytics overview
- Performance and engagement metrics
- Filtering by video and time period
- Responsive dashboard layout
- Reusable UI components
- API-ready data integration

## Tech Stack

> Update this section to match the technologies used in the project.

- **Frontend:** React Typescript (Vite)
- **Language:** JavaScript / TypeScript
- **Backend/API:** REST API
- **Package Manager:** npm


## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/ahmad-DS/video-analytics-dashboard.git
cd video-analytics-dashboard
```

Install dependencies:

```bash
cd backend/
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file inside frontend root:

```env
VITE_API_BASE_URL=http://localhost:8001
```

Open the local URL shown in the terminal, typically:

```text
http://localhost:5173
```

### Example Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/events` | Add a user event to a video|
| GET | `/api/analytics/videos` | Get analytics of videos in  |

### Example Response

```json
{
  "videoId": "video-123",
  "views": 12500,
  "click": 126,
  "add_to_cart": 58,
  "engagementRate": 8.2
}
```

## Available Scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build
npm run lint      # Run linting
npm test          # Run tests, if configured
```

## Deployment

Build the project and deploy the generated output using a hosting provider such as:

- Vercel
- Netlify
- GitHub Pages


## Project Links

- **Explainer Video:** https://www.youtube.com/watch?v=QUGPsxmDyPo
- **GitHub Profile:** https://github.com/ahmad-DS
- **Candidate Video:** https://drive.google.com/file/d/13EWwzur1MiiTf9kQdbdjzU9tHmSqYzCW/view?usp=sharing

## License

This project is for demonstration and evaluation purposes.
