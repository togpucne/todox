# ToDoX

**ToDoX** is a full‑stack task‑management application built with a modern JavaScript/Node.js stack. Designed for real‑world practice and portfolio use, it lets users create, filter, and paginate to‑do items via a RESTful API and a responsive React frontend.

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

## Purpose & Highlights

This project demonstrates:

- Ability to build end‑to‑end features using modern JavaScript tools
- Clear separation of concerns and reusable components
- Experience with environment configuration and API design
- Practical knowledge of React, Node, Express, and MongoDB

Perfect for showcasing on a résumé or discussing during interviews!
