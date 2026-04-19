# 🐍 بازی Snake با React

بازی کلاسیک Snake پیاده‌سازی شده با React و Canvas API. این پروژه در دوره کارآموزی فرانت‌اند در **خانه رباتیک کمان** توسعه داده شده است.

## ✨ ویژگی‌ها

- 🎮 گیم‌پلی کلاسیک Snake با کنترل‌های جهت‌دار (کلیدهای جهت‌نما)
- 🍎 تولید تصادفی غذا در موقعیت‌های معتبر
- 📊 سیستم امتیازدهی و نمایش Highest Score
- 💥 تشخیص برخورد با دیوارها و بدن مار
- 🔄 قابلیت شروع مجدد بازی پس از Game Over
- 🎨 استایل‌دهی مدرن با TailwindCSS

## 🛠️ تکنولوژی‌ها

| دسته | تکنولوژی | دلیل استفاده |
|------|----------|--------------|
| Framework | React + Vite | توسعه سریع و HMR |
| State Management | React Hooks | مدیریت state بازی با useState و useRef |
| Game Loop | requestAnimationFrame | حلقه بازی با فریم‌ریت کنترل شده |
| Styling | TailwindCSS | طراحی رابط کاربری |
| Code Quality | ESLint + Prettier | یکپارچگی کد |

## 🎯 چالش‌های فنی و راه‌حل‌ها

| چالش | راه‌حل پیاده‌سازی شده |
|------|----------------------|
| **تشخیص ورودی کیبورد بدون تاخیر** | `useEffect` با event listener و `preventDefault` برای کلیدهای جهت‌نما |
| **جلوگیری از حرکت معکوس مار** | بررسی جهت جدید قبل از به‌روزرسانی state |
| **افزایش سرعت با رشد مار** | کاهش تاخیر بین فریم‌ها بر اساس طول مار |

# 🐍 Snake Game in React

Classic Snake game built with React and Canvas API. This project was developed during my frontend internship at **Kaman Robotics House**.

![Snake Game Demo](./screenshots/gameplay.gif)

## ✨ Features

- 🎮 Classic Snake gameplay with arrow key controls
- 🍎 Random food generation at valid positions
- 📊 Score tracking and persistent high score
- 💥 Collision detection (walls and self)
- 🔄 Restart functionality after Game Over
- 🎨 Modern UI with TailwindCSS

## 🛠️ Tech Stack

- **Framework:** React + Vite
- **State:** React Hooks (useState, useEffect, useCallback)
- **Game Loop:** requestAnimationFrame
- **Styling:** TailwindCSS
- **Code Quality:** ESLint + Prettier

## 🎯 Technical Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Game loop in React | `requestAnimationFrame` inside `useEffect` with proper cleanup |
| Responsive keyboard input | Event listener with `preventDefault` for arrow keys |
| Preventing reverse movement | Direction validation before state update |

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
