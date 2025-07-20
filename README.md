# Affiliate++ Frontend

Affiliate++ is a modern affiliate link management web application designed to simplify and streamline the process of sharing, tracking, and analyzing affiliate links. This repository contains the **frontend** of the application, built with React.js.

## 🚀 Live Demo

👉 [Click here to view the live app](https://rococo-cannoli-9bd22c.netlify.app/)

---

## 🛠️ Tech Stack

### Frontend

- ⚛️ React.js
- 🎨 Material-UI (MUI) for responsive UI components
- 🌐 Axios
- 📦 React Context API (or Redux, if used)
- 🔐 OAuth 2.0 (Google Login)
- 🌍 React Router
- 💳 Razorpay Integration

### Backend

- 🧠 Node.js, Express.js
- 🗄️ MongoDB with Mongoose
- 🔐 JWT for token-based authentication
- 🔐 OAuth 2.0 (Google Sign-in flow)
- 🧰 Webhooks for real-time event handling
- 👤 RBAC (Role-Based Access Control: Admin/User roles)
- 🧱 Follows MVC (Model-View-Controller) architecture
- 🌐 CORS, dotenv

---

## 📦 Advanced Features

- ✅ **Material-UI** – Beautiful, responsive components
- ✅ **OAuth** – Login using Google securely
- ✅ **RBAC** – Different permissions for Admins & Users
- ✅ **Webhooks** – Real-time sync with external services (e.g., Razorpay or others)
- ✅ **MVC Pattern** – Clean and modular backend architecture

## 📦 Features

* 🔗 Shorten and manage affiliate links
* 📈 Track clicks and performance metrics (displayed on the user dashboard)
* 🔐 Secure authentication with JWT
* 🧾 User dashboard for managing campaigns

---

## 📸 Screenshots

> _Include a few images or GIFs of your app here for better presentation._


## 🧑‍💻 Getting Started (Local Setup)

To get the frontend up and running on your local machine, follow these steps:

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed.

### Clone and Install

```bash
# Clone this frontend repository
git clone [https://github.com/Babal1111/Affiliate_client.git](https://github.com/Babal1111/Affiliate_client.git)

# Navigate into the client directory
cd client

Environment Variables
Create .env files in both frontend and backend directories.
Frontend (.env):
REACT_APP_SERVER_ENDPOINT=http://localhost:5000
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key

# Install frontend dependencies
npm install

# Start the frontend development server
npm start



Backend
This frontend application requires a running backend to function correctly. The backend for Affiliate++ is hosted in a separate repository.
[https://github.com/Babal1111/Affiliate_server.git](https://github.com/Babal1111/Affiliate_server.git)

Backend (.env):
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
