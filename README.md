# 🗒️ Notes App

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38bdf8)](https://tailwindcss.com/)
[![Upstash Redis](https://img.shields.io/badge/Rate%20Limit-Upstash%20Redis-red)](https://upstash.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yourusername/notes-app/pulls)

A clean and minimal full-stack notes application built with **React**, **Tailwind CSS**, and **Express.js**. It supports creating, editing, and deleting notes with server-side rate limiting using **Upstash Redis**.

---

## 🚀 Features

- ✅ Create, update, and delete notes
- ✅ Fully responsive and accessible UI
- ✅ Semantic HTML + Tailwind CSS
- ✅ Backend API with Express.js
- ✅ Redis-based rate limiting (via Upstash)
- ✅ Clean component structure with React Router
- ✅ Error and loading state handling

---

## 🛠️ Tech Stack

| Frontend     | Backend    | Other         |
| ------------ | ---------- | ------------- |
| React + Vite | Node.js    | Upstash Redis |
| Tailwind CSS | Express.js | Dotenv        |
| React Router | CORS       | Lucide Icons  |

---

## 📦 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/aditya-narayan-sahoo/think-notes.git

cd think-notes
```

### 2. Set Up the Server

```bash
cd backend
npm install
npm run dev
```

> Make sure `.env` includes:
>
> ```env
> PORT=your_port
> UPSTASH_REDIS_REST_URL=your_upstash_url
> UPSTASH_REDIS_REST_TOKEN=your_upstash_token
> MONGO_URI=your_mongodb_uri
> ```

### 3. Set Up the Client

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 API Routes

- `GET /api/notes` – Get all notes
- `POST /api/notes` – Create a new note
- `PUT /api/notes/:id` – Update a note
- `DELETE /api/notes/:id` – Delete a note

> All routes are rate-limited (5 requests / 120 seconds per IP).

---

## ✨ UI Overview

- **Empty State**: Encourages creating your first note
- **Note Editor**: Form-based editing with clean UI
- **Loading States**: Spinners and feedback during actions
- **Semantic Tags**: Accessible and well-structured HTML

---

## 📁 Project Structure

```
think-notes/
├── frontend/          # React frontend
│   └── src/
│       └── components/
├── backend/          # Express backend
│   └── routes/
├── .env
├── README.md
```

---

## 📌 TODO

- [ ] Add user authentication
- [ ] Tagging or categories for notes
- [ ] Full markdown support
- [ ] Deployment (Vercel/Render)

---

## 📄 License

MIT License — feel free to fork and build on top of it!

---

## 🙌 Acknowledgements

- [Upstash Redis](https://upstash.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Project Video on YT](https://youtu.be/Ea9rrRj9e0Y?si=J3cw7-c24X7UgQBH)
