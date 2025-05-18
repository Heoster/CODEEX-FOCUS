
# CODEEX-FOCUS

CODEEX-FOCUS is your ultimate digital companion designed for focused learning, productive planning, and collaborative studying. It integrates an AI assistant, task and note management, a study planner, and community features to enhance your academic journey.

## ✨ Key Features

*   **Dashboard**: Get an overview of your tasks, study sessions, and points.
*   **Study Planner**: Organize your study sessions with a calendar and utilize a Pomodoro timer for focused work intervals.
*   **CODEEX AI Assistant**:
    *   Generate personalized study plans.
    *   Summarize content for quick understanding.
    *   Get answers to subject-specific questions.
*   **Tasks & Notes**: Manage your to-do list and capture your thoughts and lecture notes with a Markdown editor.
*   **Motivation & Rewards**: Track your progress, earn badges (placeholder), and see your position on a community leaderboard (placeholder).
*   **Community Hub**:
    *   **Discussion Forums**: Engage in subject-specific or general discussions. (Real-time updates via Firestore)
    *   **Leaderboard**: See how you rank among peers.
    *   *Study Groups & Shared Resources (Coming Soon)*
*   **User Authentication**: Secure login and registration system powered by Firebase Authentication.
*   **Settings**: Customize your profile, appearance (dark/light mode), and notification preferences.
*   **App Tour**: A guided tour for new users to discover app features.

## 🛠️ Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **AI Integration**: [Genkit (Firebase Genkit)](https://firebase.google.com/docs/genkit)
*   **Backend & Database**: [Firebase](https://firebase.google.com/)
    *   Authentication
    *   Firestore (for real-time database features like forums)
*   **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation.
*   **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 18.x or later recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   A Firebase project.

### Setup

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <your-repository-url>
    cd CODEEX-FOCUS
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Firebase:**
    *   Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (or use an existing one).
    *   Add a Web app to your Firebase project.
    *   Go to Project settings (gear icon) > General tab.
    *   Scroll down to "Your apps" and find your Web app.
    *   Under "SDK setup and configuration", choose "Config". You'll see your Firebase configuration object.

4.  **Create Environment Variables:**
    *   In the root directory of your project, create a file named `.env.local`.
    *   Copy your Firebase configuration values into this file, prefixing each key with `NEXT_PUBLIC_`. It should look like this:

        ```env
        NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyYOUR_API_KEY
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
        NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-YOUR_MEASUREMENT_ID # Optional, for Analytics
        ```
    *   **Important:** Ensure Firestore is enabled in your Firebase project for the community features.

5.  **Set up Genkit (if using AI features locally beyond default Firebase models):**
    *   Follow the Genkit documentation for setting up any necessary API keys or credentials for the AI models you intend to use (e.g., Google AI Studio API key if using Gemini). These might also go into your `.env.local` or be set up via `gcloud auth application-default login`.

### Running the Development Server

1.  **Start the Next.js development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This usually starts the app on `http://localhost:9002` (as per your `package.json`).

2.  **If you're actively developing Genkit flows, you might want to run the Genkit development server in a separate terminal:**
    ```bash
    npm run genkit:dev
    # or for auto-reloading on changes:
    npm run genkit:watch
    ```

Open [http://localhost:9002](http://localhost:9002) (or your configured port) with your browser to see the application.

## 📜 Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in development mode with Turbopack.
*   `npm run genkit:dev`: Starts the Genkit development server.
*   `npm run genkit:watch`: Starts the Genkit development server with watch mode.
*   `npm run build`: Builds the app for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Lints the codebase using Next.js's built-in ESLint configuration.
*   `npm run typecheck`: Runs TypeScript to check for type errors.

## 📁 Folder Structure

A brief overview of the key directories:

```
/
├── public/             # Static assets
├── src/
│   ├── ai/             # Genkit AI flows and configuration
│   ├── app/            # Next.js App Router (pages, layouts)
│   │   ├── (app)/      # Authenticated routes
│   │   ├── login/
│   │   └── register/
│   ├── components/     # Reusable UI components (custom & ShadCN UI)
│   ├── context/        # React context providers (e.g., AuthContext)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions, Firebase setup, types
│   └── ...
├── .env.local          # Local environment variables (Gitignored)
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json
```

## 🙏 Contributing

Contributions are welcome! (Details to be added if this project becomes open source).

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is currently under a placeholder license. If open-sourced, it will likely use the MIT License.

---

This website is developed by heoster.
For feedback, please use the "Send Feedback" option in the app or contact [90freeplay98@gmail.com](mailto:90freeplay98@gmail.com).
