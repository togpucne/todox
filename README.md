# ToDoX

**Todox** is a full‑stack task‑management application built with a modern JavaScript/Node.js stack. Designed for real‑world practice and portfolio use, it lets users create, filter, and paginate to‑do items via a RESTful API and a responsive React frontend.

> 🚀 **Live demo:** [https://todox-s9r5.onrender.com/](https://todox-s9r5.onrender.com/)

## Key Features

- CRUD operations for tasks (create, read, update, delete)
- Filter and date‑range search to quickly find tasks
- Server‑side pagination for efficient data retrieval
- Responsive UI built with Vite, React, and Tailwind CSS
- Backend API with Express.js & MongoDB via Mongoose
- Modular architecture separating routes, controllers, and models
- Environment configuration and basic error handling
- Suitable as a résumé project demonstrating full‑stack JavaScript skills

## Technology Stack

| Layer       | Technologies                               |
| ----------- | ------------------------------------------ |
| Backend     | Node.js, Express, MongoDB, Mongoose        |
| Frontend    | React, Vite, Tailwind CSS                  |
| Build tools | npm, Vite, ESLint                          |
| Utilities   | Axios for HTTP, modular components & utils |

## Project Structure

```
todox/
├─ backend/
│  ├─ src/
│  │  ├─ config/db.js
│  │  ├─ controllers/tasks.controller.js
│  │  ├─ model/Tasks.js
│  │  └─ routes/tasks.route.js
│  └─ server.js
└─ frontend/
   ├─ src/
   │  ├─ components/ (AddTasks, TasksList, etc.)
   │  ├─ lib/ (axios.js, data.js, utils.js)
   │  └─ pages/ (HomePage, NotFound)
   ├─ index.html
   ├─ package.json
   └─ tailwind.config.js
```

## Getting Started

1. **Backend**

   ```bash
   cd backend
   npm install
   # create a .env with DB connection string
   npm start
   ```
2. **Frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Open the frontend in your browser, connect with the API, and start managing tasks.

## Deployment

The application is hosted on [Render](https://render.com) with both frontend and backend services running continuously. The live URL is above; any changes pushed to the repository trigger automatic rebuilds. To replicate the deployment locally or on another platform:

1. Set up a MongoDB database (MongoDB Atlas or local).
2. In the **backend** directory create a `.env` file with `MONGO_URI` pointing to your connection string.
3. Configure the frontend `src/lib/axios.js` base URL to match the deployed API or local server.
4. Use standard build commands (`npm run build` for frontend and `npm start` for backend) and serve the static output with a CDN or Node web server.

## Purpose & Highlights

This project demonstrates:

- Ability to build end‑to‑end features using modern JavaScript tools
- Clear separation of concerns and reusable components
- Experience with environment configuration and API design
- Practical knowledge of React, Node, Express, and MongoDB

Perfect for showcasing on a résumé or discussing during interviews!
