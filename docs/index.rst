=====================================
🚀 Blind Chat - Android Frontend & Backend Development
=====================================

📌 Overview
-----------
Blind Chat is a secure, anonymous chat platform with an **Android frontend (React Native)** and a **separate backend**.  
This repository documents the development process, API endpoints, authentication, and deployment.

🛠️ Tech Stack
--------------
**Frontend (React Native)**
- Framework: React Native (Expo)
- Navigation: Expo Router
- UI Library: React Native Paper
- State Management: React Hooks
- Theming: Custom Color Scheme with Dark Mode Support

**Backend**
- Framework: Node.js (Express)
- Database: MongoDB
- Authentication: JWT-based authentication
- Deployment: Docker + AWS

🚀 Getting Started
------------------

🔹 **Frontend Setup**
^^^^^^^^^^^^^^^^^^^^^
1. **Clone the repository**
   
   .. code-block:: sh

      git clone https://github.com/your-org/blind-chat.git
      cd blind-chat/frontend

2. **Install dependencies**
   
   .. code-block:: sh

      npm install

3. **Run the app**
   
   .. code-block:: sh

      expo start

4. **Environment Variables (`.env`)**
   
   .. code-block:: sh

      API_BASE_URL=https://api.blindchat.com

🔹 **Backend Setup**
^^^^^^^^^^^^^^^^^^^^^
1. **Navigate to backend folder**
   
   .. code-block:: sh

      cd blind-chat/backend

2. **Install dependencies**
   
   .. code-block:: sh

      npm install

3. **Run the server**
   
   .. code-block:: sh

      npm start

4. **Environment Variables (`.env`)**
   
   .. code-block:: sh

      PORT=5000
      MONGO_URI=mongodb+srv://...
      JWT_SECRET=your_secret_key

🔑 Authentication Flow
----------------------
1. **User registers with phone/email**
2. **OTP sent via email/SMS**
3. **User verifies OTP → Redirect to chats**
4. **JWT Token generated for session handling**

📡 API Endpoints (Backend)
--------------------------
.. list-table::
   :widths: 10 30 40 10
   :header-rows: 1

   * - Method
     - Endpoint
     - Description
     - Auth Required
   * - POST
     - `/auth/register`
     - Register a new user
     - ❌ No
   * - POST
     - `/auth/login`
     - Login user
     - ❌ No
   * - POST
     - `/auth/verify-otp`
     - Verify OTP
     - ❌ No
   * - GET
     - `/chats`
     - Fetch user chats
     - ✅ Yes
   * - POST
     - `/chats/send`
     - Send a message
     - ✅ Yes

For full API

