# TLE CP-Tracker

TLE CP-Tracker is a **Contest Tracking Web Application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), Web Scraping, GraphQL. It fetches **all upcoming and past coding contests** from platforms like **Codeforces, CodeChef, and LeetCode** and allows users to bookmark contests, filter them by platform, and access video solutions for past contests.

---
## 🌟 Features

### 🔍 **Contest Tracking**
- Fetches upcoming contests from **Codeforces, CodeChef, and LeetCode**.
- Displays contest **date and time remaining** before the start.
- Lists **past contests** for users to refer to previous problems.

### 🎯 **Filters & Search**
- Users can filter contests by **platform** (e.g., Only Codeforces, Only LeetCode, or multiple platforms).
- Search functionality to quickly find a contest.

### 🔖 **Bookmarking System**
- Allows users to **bookmark** contests they want to participate in.
- Bookmarked contests are saved for easy reference.

### 🎥 **Video Solutions & CP Resources**
- Contains **video solutions** of past contests from the **TLE Eliminators YouTube Channel**.
- Users can select a past contest and **attach solution links** from the channel.
- Provides links to **DSA/CP Sheets, CP-31 Sheet**, and their corresponding **video solutions**.
- Dedicated **YouTube section** with all **video solutions** categorized by platform.

### 🎨 **UI & Responsiveness**
- Fully **responsive** for **mobile and tablet users**.
- **Light/Dark mode toggle** for user preference.

### 📝 **Well-Documented Code**
- The project is **well-documented** to ensure ease of understanding and contribution.

---
## 🏗️ Tech Stack

- **Frontend**: React.js (with Tailwind CSS for styling)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (to store user data, bookmarks, and video solution links)
- **Scraping/API Handling**: Fetching contest details via API calls
- **Web Scraping**: Getting data from all platforms
- **GraphQL**: For better API handling and scraping data
- **Authentication**: JWT-based authentication for user sessions
- **Deployment**: Deployed on **Render**

---
## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/adityasharmawork/tle-new
cd tle-new
```

### 2️⃣ Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3️⃣ Setup Environment Variables
Create a **.env** file in the backend directory and add the following:
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:8080
``` 

### 4️⃣ Run the Application
```bash
# Start the backend server
npm run dev
```

---
## 📜 API Endpoints

### **Contests API**
- `GET /api/platform` → Fetch all contests of that platform
- `GET /api/platform/upcoming` → Fetch upcoming contests of that platform
- `GET /api/platform/past` → Fetch past contests of that platform

- `GET /api/codeforces` → Fetch all contests of codeforces
- `GET /api/codeforces/upcoming` → Fetch upcoming contests of codeforces
- `GET /api/codeforces/past` → Fetch past contests of codeforces

- `GET /api/codechef` → Fetch all contests of codechef
- `GET /api/codechef/upcoming` → Fetch upcoming contests of codechef
- `GET /api/codechef/past` → Fetch past contests of codechef

- `GET /api/leetcode` → Fetch all contests of leetcode
- `GET /api/leetcode/upcoming` → Fetch upcoming contests of leetcode
- `GET /api/leetcode/past` → Fetch past contests of leetcode

---
## 📌 Deployment

### Frontend
```bash
npm run build
npm start
# Deploy to Render/Vercel
```

---
## 🎯 Future Enhancements
- **User Accounts & Profiles**
- **Notification System** for upcoming contests
- **Leaderboard & Streaks** for motivation
- **Discussion Forum** for problem-solving

---
## 🌟 Show Your Support
If you like this project, give it a ⭐ on GitHub!
