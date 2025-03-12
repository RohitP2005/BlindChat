=================================
📱 Frontend Documentation
=================================

Overview
========
This document provides details on the **Android frontend** of our project, including setup instructions, folder structure, dependencies, and guidelines for contributing.

Tech Stack
==========
- **Framework**: React Native (Expo)
- **UI Library**: React Native Paper
- **Navigation**: Expo Router
- **State Management**: React Hooks (useState, useEffect)
- **Theme Support**: Light/Dark Mode

Folder Structure
================
.. code-block:: text

    /frontend
    │── /app
    │   ├── /chats          # Chat screen
    │   ├── /login          # Login screen
    │   ├── /register       # Registration screen
    │   ├── /otp            # OTP verification screen
    │   ├── _layout.js      # App layout
    │── /components         # Shared components
    │── /constants          # Colors, themes, and global styles
    │── /hooks              # Custom hooks (e.g., useColorScheme)
    │── /assets             # Images and fonts
    │── App.js              # Entry point
    │── package.json        # Project dependencies
    │── README.rst          # Documentation

Setup & Installation
====================

1️⃣ **Prerequisites**
---------------------
Ensure you have the following installed:
- **Node.js** (LTS version)
- **Expo CLI** (Install via `npm install -g expo-cli`)
- **Android Emulator** (or a real device with Expo Go)

2️⃣ **Clone the Repository**
----------------------------
.. code-block:: sh

    git clone https://github.com/your-repo/frontend.git
    cd frontend

3️⃣ **Install Dependencies**
----------------------------
.. code-block:: sh

    npm install

4️⃣ **Start the Expo Development Server**
-----------------------------------------
.. code-block:: sh

    npm start

or

.. code-block:: sh

    expo start

Then, scan the QR code with the Expo Go app or launch it in an emulator.

Features
========
✅ **User Authentication** (Login, Registration, OTP)  
✅ **Chat Interface** (Real-time messaging)  
✅ **Dark & Light Mode Support**  
✅ **Navigation with Expo Router**  

UI Styling
==========
- We use **React Native Paper** for styling.
- **Global color themes** are stored in `/constants/Colors.js`.
- **Dark mode support** is implemented using `useColorScheme()`.

API Integration
===============
Backend developers are working on authentication APIs. **Person 1** and **Person 2** should test the authentication API with the frontend.

Authentication Endpoints:
-------------------------
.. list-table::
   :header-rows: 1

   * - Method
     - Endpoint
     - Description
   * - `POST`
     - `/login`
     - Authenticate user
   * - `POST`
     - `/register`
     - Create new user
   * - `POST`
     - `/verify-otp`
     - OTP verification

📌 **Environment Variables**
----------------------------
Set up your `.env` file with API URLs.

.. code-block:: sh

    API_BASE_URL=https://your-backend.com/api

Contributing
============
1. **Fork the repository** and clone your copy.
2. **Create a new branch** for your feature:

   .. code-block:: sh

      git checkout -b feature-name

3. **Make changes & commit**:

   .. code-block:: sh

      git commit -m "Added feature XYZ"

4. **Push the branch & create a PR**:

   .. code-block:: sh

      git push origin feature-name

Troubleshooting
===============
- **Expo not starting?** Try clearing cache:

  .. code-block:: sh

      expo start -c

- **Issues with dependencies?** Reinstall:

  .. code-block:: sh

      rm -rf node_modules && npm install

