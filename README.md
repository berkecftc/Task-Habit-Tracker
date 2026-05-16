# 🚀 Task & Habit Tracker

A modern, responsive, and highly scalable Task & Habit Tracker application built with React, TypeScript, and Tailwind CSS. 
Designed with clean architecture principles and a beautiful SaaS-like user interface.

## ✨ Features

- **Full CRUD Operations**: Create, Read, Update, and Delete tasks seamlessly.
- **Advanced Filtering & Search**: Find tasks instantly by title, description, or category with optimized debounce search.
- **Dynamic Statistics**: Real-time insights into completion rates, pending tasks, and overall progress.
- **Dark Mode**: Built-in dark mode toggle with smooth transitions.
- **Local Storage Persistence**: Your data stays safe directly in your browser without needing a backend.
- **Premium UI**: Beautiful design utilizing modern Tailwind CSS features, empty states, and toast notifications.

## 🛠️ Technologies Used

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API & Custom Hooks
- **Icons & Notifications**: React Icons, React Hot Toast
- **Utilities**: Lodash (Debounce), UUID

## 📸 Screenshots

*(Replace these links with your actual image links later)*

| Dashboard (Light) | Dashboard (Dark) |
| :---: | :---: |
| ![Light Mode](https://via.placeholder.com/400x250/ffffff/000000?text=Light+Mode+Screenshot) | ![Dark Mode](https://via.placeholder.com/400x250/0f172a/ffffff?text=Dark+Mode+Screenshot) |

## 🚀 Live Demo

Check out the live application here: **[Netlify Live URL Here](#)**

## 💻 Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-habit-tracker.git
   cd task-habit-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Architecture

This project strictly follows Clean Code principles:
- **Modular Components** (`layout`, `task`).
- **Custom Hooks** (`useLocalStorage`, `useDarkMode`) to isolate side effects.
- **Context API** to handle global state and prevent prop-drilling.
- **TypeScript Interfaces** for strict type safety.

---
*Developed as a modern web development project.*
