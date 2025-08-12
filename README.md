# Task Management System (React + Node.js)

A simple task management application with backend APIs for comments and a frontend interface for tasks.  
Built with **Node.js (Express)** for the backend and **React** for the frontend.

---

## 📌 Features

### **Task 1** – Backend APIs
- Add, edit, and delete comments for a given task.
- Follows proper **CRUD principles**.
- Includes **automated tests** for APIs.

### **Task 2 (Bonus)** – Frontend Interface
- Add, edit, and delete tasks using existing CRUD APIs.
- Simple and responsive UI.

---

## 🚀 Live Demo & Walkthrough
- **Deployed App**: [Click here to view](https://your-deployment-link.com)
- **Video Walkthrough**: [Watch on Loom](https://your-video-link.com)

---

## 🛠️ Tech Stack
- **Frontend**: React, Axios, TailwindCSS
- **Backend**: Node.js, Express, MongoDB
- **Testing**: Jest, Supertest
- **Deployment**: Render / Vercel / Railway

---

## 📂 Project Structure


---
## 📄 API Endpoints

### Health Check
| Method | Endpoint      | Description          |
|--------|--------------|----------------------|
| GET    | `/api/health` | Check API status     |

### Comments
| Method | Endpoint                  | Description                              |
|--------|---------------------------|------------------------------------------|
| POST   | `/api/comments`            | Create a new comment                     |
| GET    | `/api/comments/task/:taskId` | Get comments for a task (with pagination) |
| PUT    | `/api/comments/:id`        | Update a comment                         |
| DELETE | `/api/comments/:id`        | Soft delete a comment                    |
| GET    | `/api/comments/search`     | Search comments by keyword               |

---

## 🧪 Running Locally
**Why is this change needed?**
Explain the purpose or bug fix.

**API Changes**
List endpoints added or modified.

**Database Changes**
Describe schema changes.

**UI Changes**
Attach screenshots if applicable.

**Testing**
Mention manual and automated test coverage.

