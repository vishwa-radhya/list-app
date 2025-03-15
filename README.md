# List App  

**Simplify Your Daily Activities with an All-in-One List Management Solution**  
![List App Banner](./favicons/favicon-32x32.png) 
## 🌟 Overview  
List App is a **Progressive Web Application (PWA)** built using **React Vite** and deployed with **Netlify**. It is designed to help users efficiently manage lists with advanced features such as **item organization, privacy protection, AI chat, and item transfer**.  
## 🚀 Features  
- **Item Listing** – Add, delete, rename, and star list items for easy access.  
- **Folder Management** – Create folders, organize lists, and use privacy-protected folders with a custom PIN.  
- **Google Account Switching** – Seamlessly switch between Google accounts.  
- **Item Transfer** – Send and receive list name messages from added friends.  
- **User Avatars** – Personalize profiles with **boring-avatars**.  
- **AI Chat** – Utilize an AI-powered chatbot for assistance and productivity.  

## 🛠️ Tech Stack & Dependencies  
- **Frontend**: React Vite  
- **Deployment**: Netlify  
- **Authentication & Database**: Firebase  
- **Styling & Animations**: animate.css  
- **AI Capabilities**: cohere-ai  
- **Icons & UI Enhancements**: react-icons, react-content-loader  
- **Navigation**: react-router-dom  
## 🔐 Privacy & Security
- Users can set up privacy-protected folders secured with a PIN.
- Privacy PINs can be modified as needed.
- Secure Google authentication using Firebase.
## 📦 Installation & Setup  
1. Clone the repository:  
   ```
   git clone https://github.com/your-repo/list-app.git
   cd list-app
2. Install dependencies:
   ```
   npm install
3. Run the development server:
   ```
   npm run dev
Also, don't forget to create a `.env` file in the project root folder and add your firebase **API keys** as the application uses firebase **google authentication** and **realtime database**.

4. Here are the `env` variable names
   ```
    VITE_FIREBASE_API_KEY=''
    VITE_FIREBASE_AUTH_DOMAIN='
    VITE_FIREBASE_DATABASE_URL=''
    VITE_FIREBASE_PROJECT_ID=''
    VITE_FIREBASE_STORAGE_BUCKET=''
    VITE_FIREBASE_MESSAGING_SENDER_ID=''
    VITE_FIREBASE_APP_ID=''
    VITE_COHERE_API_KEY=''
## 😭 I'm Sorry
Before you proceed i want to say something, as i developed this application specially for mobile view, the web version feels awful to users **(want to fix it actually)**, so if you want to experience it well please use mobile browsers Thank You.
## 🌍 Live Demo
[Try it now on Netlify!](https://v-list-app.netlify.app/)

Install it as **native application** in your mobile device By clicking **Add to Home Screen** from the **browser options.**