# AI CV Builder

A professional full-stack CV generation application built with React, Node.js, and SQLite.

## Features

- 🔹 **Live Preview**: See your CV changes in real-time as you type.
- 🔹 **Multiple Templates**: Choose between Modern, Classic, and Minimal designs.
- 🔹 **Secure Auth**: User registration and login with JWT and password hashing.
- 🔹 **CV Management**: Create, edit, and delete multiple CVs.
- 🔹 **PDF Export**: Generate and download high-quality PDFs of your CV.
- 🔹 **Responsive Design**: Works on mobile and desktop.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion, Lucide React, Axios.
- **Backend**: Node.js, Express, SQLite, PDFKit, JWT, Bcrypt.
- **Database**: SQLite (Easy to set up, no external server needed).

## Local Setup

### 1. Clone the repository

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
JWT_SECRET=your_secret_key
```
Start the backend:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Deployment Instructions

### Backend (Render / Railway)
1. Push your code to GitHub.
2. Connect your repository to Render or Railway.
3. Set the build command to `npm install`.
4. Set the start command to `node src/server.js`.
5. Add environment variables (`PORT`, `JWT_SECRET`).

### Frontend (Vercel / Netlify)
1. Connect your repository to Vercel or Netlify.
2. Set the build command to `npm run build`.
3. Set the output directory to `dist`.
4. Add environment variable `VITE_API_URL` pointing to your deployed backend.

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Auth middleware
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # PDF generation service
│   │   └── server.js    # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Auth state management
│   │   ├── pages/       # Page components (Dashboard, Editor, etc.)
│   │   ├── services/    # API client
│   │   └── templates/   # CV design templates
```
