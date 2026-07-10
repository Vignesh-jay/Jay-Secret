# 🔒 JΛY Secret

> **Share secrets securely. Reveal once. Gone forever.**

JΛY Secret is a beautiful, self-destructing secret sharing application built with Node.js, Express and SQLite. It allows users to securely share passwords, API keys, OTPs or any sensitive information using one-time links that automatically expire or self-destruct after being viewed.

---

## ✨ Features

- 🔐 End-to-end encrypted secret storage
- 👁️ One-time secret reveal
- 💥 Secret permanently destroyed after viewing
- ⏳ Automatic expiry timer
- 🕒 Multiple expiry options
  - 10 Minutes
  - 15 Minutes
  - 30 Minutes
  - 1 Hour
  - 90 Minutes
  - 24 Hours
  - 48 Hours
- ⭕ Live countdown timer
- 🌿 Animated nature background
- 🍃 Falling leaf animation
- 💎 Liquid Glass (Frost) UI
- 📱 Responsive design
- 📋 One-click copy
- 🚫 No accounts required
- ⚡ Fast and lightweight

---

## Create Secret

- Beautiful Frost UI
- Create a one-time secret
- Choose expiry
- Share instantly

---

## Reveal Secret

- Countdown timer
- One-click reveal
- Self-destruct after viewing

---

## 🛠 Tech Stack

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript

### Backend

- Node.js
- Express.js

### Database

- SQLite3

### Encryption

- AES-256 Encryption
- Node Crypto

---

# 📂 Project Structure

```
JAY-Secret/

│

├── public/
│   ├── assets/
│   │   ├── css/
│   │   ├── images/
│   │   └── js/
│   │
│   ├── index.html
│   └── reveal.html
│
├── server/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/vigneshjay/JAY-Secret.git

cd JAY-Secret
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment

Create a `.env` file.

```env
SECRET_KEY=YOUR_64_CHARACTER_SECRET_KEY
PORT=3000
```

Generate a secure key:

```bash
node
```

```javascript
require("crypto").randomBytes(32).toString("hex");
```

---

## Run

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🔐 How It Works

```
Create Secret
      │
      ▼
Encrypt Secret (AES)
      │
      ▼
Store in SQLite
      │
      ▼
Generate Unique Link
      │
      ▼
Share Link
      │
      ▼
Recipient Opens Link
      │
      ▼
Reveal Secret Once
      │
      ▼
Secret Destroyed Forever
```

---

# 🎨 Design Philosophy

JΛY Secret was designed around a calm, premium experience inspired by Apple's Liquid Glass aesthetic.

Features include:

- Frosted Glass Interface
- Animated Meadow Background
- Dynamic Sunlight
- Falling Leaves
- Glass Countdown Timer
- Smooth Micro Animations

The goal was to create an experience that feels peaceful while handling something as serious as sharing sensitive information.

---

# 🔒 Security

- AES Encryption
- Secrets never stored as plain text
- One-time reveal
- Automatic expiry
- Server-side validation
- Random NanoID links

---

# 👨‍💻 Author

**Vignesh Jayaraman**

Assistant Manager – IT Infrastructure

Cybersecurity Analyst • Developer

---

## 🌐 Connect

Portfolio

> https://vignesh-jay.xyz

GitHub

> https://github.com/vigneshjay

---

# 📄 License

MIT License

---

# ❤️ Built with Passion

JΛY Secret is part of the **JΛY Ecosystem**, a collection of beautifully crafted productivity and infrastructure tools built with simplicity, speed and elegant design in mind.

### Other Projects

- JΛY Workplace
- JΛY Meeting
- JΛY Matrix
- JΛY Cloud
- JΛY Files
- JΛY Streamr

---

## ⭐ Support

If you enjoyed this project, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future development.

---

**JΛY Secret**

**Share Securely. Reveal Once. Gone Forever.**
