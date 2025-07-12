# 🧠 StackIt – AI-Powered Q&A Forum Web App

StackIt is a smart, interactive Q&A platform where users can ask questions with rich formatting, view AI-suggested similar questions, and contribute answers — all built with React and Firebase.

---

## 🚀 Features

- ✅ **Ask Questions** with:
  - Bold, Italic, Strikethrough
  - Ordered & Bullet Lists
  - Image Upload
  - Emoji Insertion
  - Hyperlink Support
  - Text Alignment (Left, Center, Right)
- 📸 **Photo Upload** support inside the description editor
- 🤖 **AI-Powered Similar Question Suggestions** (via OpenRouter GPT)
- 🏷️ Tag-based question filtering
- 💬 Answer submission section with the same rich editor
- 🔼 Upvote & 🔽 Downvote support
- 🧑 Role-based access (Guest/User)
- ⚡ Firebase-backed database and hosting-ready

---

## 📂 Folder Structure

stackit-odoo/
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── styles/
│ │ └── utils/
│ ├── public/
│ └── index.html
├── .env
└── README.md



---

## 🔧 Tech Stack

- **Frontend**: React + Vite
- **Database**: Firebase Firestore
- **Hosting**: Netlify (Optional)
- **AI Integration**: OpenRouter (ChatGPT API)
- **Styling**: Bootstrap
- **Authentication**: Firebase Auth (optional)

---

## ⚙️ Setup & Installation

```bash
git clone https://github.com/your-username/stackit.git
cd stackit-odoo/frontend
npm install
npm run dev
```

Create a .env file in the frontend/ directory and paste:

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_OPENROUTER_API_KEY=your_openrouter_key


🤖 AI Suggestions Feature
Whenever a user types a new question title, AI fetches related threads from Firestore and shows “Similar Questions” in real-time using GPT via OpenRouter API.

✅ Helps prevent duplicates
🤝 Boosts discoverability
🧠 Feels like StackOverflow but smarter!


🧪 Coming Soon
Firebase Auth (Login/Signup)
Admin moderation panel
Search functionality
User profiles with reputation
Real-time chat or discussions

🙋‍♀️ Made With
🔥 Firebase (Firestore + optional Auth)
⚛️ React + Vite
🎨 Bootstrap
🤖 OpenRouter (ChatGPT API)


Team members :
Samradhi Sharma - TL
Rajvi Bhatt
Birva Bhatt

