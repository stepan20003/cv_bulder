# CVGenie - Professional CV Builder

CVGenie is a modern, full-stack web application designed for creating professional, ATS-friendly CVs and resumes. It features a real-time editor, multiple customizable templates, and instant PDF generation.

## 🚀 Features

-   **Live Preview**: See your CV update in real-time as you type.
-   **Multiple Templates**: Choose from Modern, Classic, Minimal, and Creative styles.
-   **Secure Authentication**: Personal dashboard to manage multiple CVs.
-   **High-Quality PDF**: Backend PDF generation for perfectly formatted resumes.
-   **Responsive Design**: Build your CV on desktop or mobile.

## 🛠 Tech Stack

-   **Frontend**: React, Tailwind CSS, Framer Motion, Lucide Icons.
-   **Backend**: Node.js, Express, SQLite.
-   **PDF Generation**: PDFKit.
-   **Authentication**: JWT (JSON Web Tokens) with password hashing.

## 🏁 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
JWT_SECRET=your_super_secret_key_here
```

### 3. Run Locally

**Start the Backend:**
```bash
cd backend
npm start
```

**Start the Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📦 Deployment Instructions

### Backend (Render / Railway)
1. Push the code to a GitHub repository.
2. Connect your repository to **Render** or **Railway**.
3. Set the build command: `cd backend && npm install`.
4. Set the start command: `cd backend && node src/index.js`.
5. Add your environment variables (`JWT_SECRET`).

### Frontend (Vercel / Netlify)
1. Connect your repository to **Vercel** or **Netlify**.
2. Set the build command: `cd frontend && npm install && npm run build`.
3. Set the output directory: `frontend/dist`.
4. Ensure the `VITE_API_URL` in your frontend points to your deployed backend.

## 📁 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Auth and error middleware
│   │   ├── models/        # SQLite database config
│   │   ├── routes/        # API route definitions
│   │   ├── services/      # PDF generation logic
│   │   └── index.js       # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Auth state management
│   │   ├── pages/         # Application pages
│   │   ├── templates/     # CV layout designs
│   │   └── App.jsx        # Routing
│   └── package.json
└── README.md
```

## 📜 License
MIT
