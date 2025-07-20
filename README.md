# Affiliate++ Frontend

Affiliate++ is a modern affiliate link management web application designed to simplify and streamline the process of sharing, tracking, and analyzing affiliate links. This repository contains the **frontend** of the application, built using React.js.

---

## 🚀 Live Demo

👉 [Click here to view the live app](https://rococo-cannoli-9bd22c.netlify.app/)

---

## 🛠️ Tech Stack

### Frontend

- ⚛️ React.js
- 🎨 Material-UI (MUI)
- 🅱️ Bootstrap 5
- 🔐 JWT Authentication
- 🌐 OAuth 2.0 (Google Login)
- 📦 Axios for HTTP requests
- 🧭 React Router
- 💳 Razorpay (for payments)
- 🧩 React Context API

### Backend (in separate repo)

- 🧠 Node.js + Express.js
- 🗄️ MongoDB + Mongoose
- 🔐 bcryptjs + JWT
- 📬 Webhooks (Razorpay)
- 👥 RBAC (Admin/User roles)
- 🧱 MVC Architecture
- 🌐 CORS, dotenv

📁 Backend Repository: [Affiliate++ Server](https://github.com/Babal1111/Affiliate_server.git)

---

## 📦 Key Features

- 🔗 Create and manage affiliate links
- 📊 Track clicks and link performance
- 🔐 Secure JWT-based authentication
- 👤 Google OAuth login
- ⚙️ Admin/User role-based access (RBAC)
- 💳 Razorpay payment support
- 📬 Webhook integration
- 🧱 Backend follows MVC pattern
- 🎨 Clean UI with Material-UI + Bootstrap

---

## 📸 Screenshots

> _You can include screenshots like login page, dashboard, analytics page, etc._  
> Example:
> ![Dashboard Screenshot](./screenshots/dashboard.png)

---

## 🧑‍💻 Getting Started (Local Setup)

Follow these steps to set up the project locally.

---

### 🔧 Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas)
- Git

---

### 🚀 Frontend Setup

```bash
# Clone this frontend repository
git clone https://github.com/Babal1111/Affiliate_client.git

# Navigate into the project directory
cd Affiliate_client

# Install dependencies
npm install

# Create a .env file
touch .env
Frontend .env:

REACT_APP_SERVER_ENDPOINT=http://localhost:5000
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key

bash

# Start development server
npm start
⚙️ Backend Setup
bash

# Clone the backend repository
git clone https://github.com/Babal1111/Affiliate_server.git

# Navigate into backend
cd Affiliate_server

# Install dependencies
npm install

# Create backend .env file
touch .env
Backend .env:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
bash

# Start backend server
npm run dev
📦 Dependency Summary
Frontend (Affiliate_client/package.json)
Package	Use Case
react	Frontend framework
react-router-dom	Routing
axios	HTTP requests
jwt-decode	Decode JWT in frontend
bootstrap	Styling
@mui/material	Material UI components
@mui/icons-material	Icons for MUI
react-google-login	OAuth authentication
razorpay	Razorpay payment integration

Backend (Affiliate_server/package.json)
Package	Use Case
express	Web server framework
mongoose	MongoDB ORM
jsonwebtoken	JWT-based auth
bcryptjs	Password hashing
cors	Cross-origin support
dotenv	Manage env variables
razorpay	Payment processing integration
express-validator	Request validation
uuid	Unique ID generation
cookie-parser	JWT in cookies
nodemon	Dev server auto-restart

🤝 Contributing
Contributions are welcome!
Feel free to fork this repo, raise issues, or submit a pull request.

📜 License
This project is licensed under the MIT License.

🙌 Authors
Created with 💻 by BP Singh
Backend: Affiliate++ Server

⭐️ If you found this project helpful, don't forget to star it!



---

Let me know if you want this as a downloadable file or want a separate backend README version too!







