🚀 𝐌𝐨𝐜𝐤 𝐀𝐈 𝐈𝐧𝐭𝐞𝐫𝐯𝐢𝐞𝐰 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦

An AI-powered interview preparation platform that helps candidates practice technical and behavioral interviews through realistic mock interview sessions.

Built with Next.js, Firebase, VAPI, and Google Gemini AI, this platform generates personalized interview questions based on the user's role, experience level, and technology stack.

✨ 𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬

🤖 𝐀𝐈-𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞𝐝 𝐈𝐧𝐭𝐞𝐫𝐯𝐢𝐞𝐰 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧𝐬
Generate interview questions tailored to:
.Job Role
.Experience Level
.Tech Stack
.Powered by Google Gemini AI

🎙️ 𝐕𝐨𝐢𝐜𝐞-𝐁𝐚𝐬𝐞𝐝 𝐈𝐧𝐭𝐞𝐫𝐯𝐢𝐞𝐰 𝐄𝐱𝐩𝐞𝐫𝐢𝐞𝐧𝐜𝐞

.Interactive voice conversations using VAPI
.Realistic interview simulation
.Natural spoken responses

🔐 𝐀𝐮𝐭𝐡𝐞𝐧𝐭𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐒𝐲𝐬𝐭𝐞𝐦

.Secure user authentication
.User account management
.Session persistence

📊 𝐏𝐞𝐫𝐬𝐨𝐧𝐚𝐥𝐢𝐳𝐞𝐝 𝐈𝐧𝐭𝐞𝐫𝐯𝐢𝐞𝐰 𝐒𝐞𝐬𝐬𝐢𝐨𝐧𝐬
.Create custom mock interviews
.Practice multiple domains and technologies
.Role-specific interview preparation

⚡ 𝐌𝐨𝐝𝐞𝐫𝐧 𝐔𝐬𝐞𝐫 𝐄𝐱𝐩𝐞𝐫𝐢𝐞𝐧𝐜𝐞
.Responsive design
.Fast performance with Next.js
.Clean and intuitive interface

🛠️𝐓𝐞𝐜𝐡 𝐒𝐭𝐚𝐜𝐤
𝐅𝐫𝐨𝐧𝐭𝐞𝐧𝐝
.Next.js 15
.React
.TypeScript
.Tailwind CSS
.Shadcn UI

𝐁𝐚𝐜𝐤𝐞𝐧𝐝 & 𝐒𝐞𝐫𝐯𝐢𝐜𝐞𝐬
.Firebase Authentication
.Firebase Admin SDK
.Google Gemini AI
.VAPI AI
.Development Tools
.ESLint
.PostCSS
.Git & GitHub

📂  𝐏𝐫𝐨𝐣𝐞𝐜𝐭 𝐒𝐭𝐫𝐮𝐜𝐭𝐮𝐫𝐞

mock_ai_interview/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── layout.tsx
│   ├── (root)/
│   │   ├── interview/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── vapi/
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   └── sonner.tsx
│   ├── Agent.tsx
│   ├── AuthForm.tsx
│   ├── DisplayTechIcons.tsx
│   ├── FormField.tsx
│   └── InterviewCard.tsx
├── constants/
│   └── index.ts
├── firebase/
│   ├── admin.ts
│   └── client.ts
├── lib/
│   ├── actions/
│   │   └── auth.action.ts
│   ├── utils.ts
│   └── vapi.sdk.ts
├── public/
├── types/
├── .env.local
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json


⚙️ 𝐄𝐧𝐯𝐢𝐫𝐨𝐧𝐦𝐞𝐧𝐭 𝐂𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐚𝐭𝐢𝐨𝐧
Create a .env.local file:

# Firebase
FIREBASE_PROJECT_ID=""
FIREBASE_CLIENT_EMAIL=""
FIREBASE_PRIVATE_KEY=""

# Gemini AI
GOOGLE_GENERATIVE_AI_API_KEY=""

# VAPI
NEXT_PUBLIC_VAPI_PUBLIC_KEY=""
VAPI_PRIVATE_KEY=""

🚀 𝐋𝐨𝐜𝐚𝐥 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐦𝐞𝐧𝐭
𝐂𝐥𝐨𝐧𝐞 𝐑𝐞𝐩𝐨𝐬𝐢𝐭𝐨𝐫𝐲
git clone https://github.com/parth766/Mock_Ai_Interview_Platform.git

𝐈𝐧𝐬𝐭𝐚𝐥𝐥 𝐃𝐞𝐩𝐞𝐧𝐝𝐞𝐧𝐜𝐢𝐞𝐬
npm install

𝐂𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐞 𝐄𝐧𝐯𝐢𝐫𝐨𝐧𝐦𝐞𝐧𝐭 𝐕𝐚𝐫𝐢𝐚𝐛𝐥𝐞𝐬
𝐂𝐫𝐞𝐚𝐭𝐞:
.env.local
and add all required credentials.

𝐑𝐮𝐧 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐦𝐞𝐧𝐭 𝐒𝐞𝐫𝐯𝐞𝐫
npm run dev

𝐕𝐢𝐬𝐢𝐭:
http://localhost:3000

📈𝐅𝐮𝐭𝐮𝐫𝐞 𝐑𝐨𝐚𝐝𝐦𝐚𝐩
𝐈𝐧𝐭𝐞𝐫𝐯𝐢𝐞𝐰 𝐄𝐯𝐚𝐥𝐮𝐚𝐭𝐢𝐨𝐧 𝐒𝐲𝐬𝐭𝐞𝐦

𝐏𝐫𝐨𝐯𝐢𝐝𝐞:
.Communication Score
.Technical Score
.Confidence Analysis
.AI Feedback Reports

𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞 𝐝𝐞𝐭𝐚𝐢𝐥𝐞𝐝 𝐢𝐧𝐭𝐞𝐫𝐯𝐢𝐞𝐰 𝐫𝐞𝐩𝐨𝐫𝐭𝐬 𝐢𝐧𝐜𝐥𝐮𝐝𝐢𝐧𝐠:
.Strengths
.Weaknesses
.Suggested Improvements

𝐑𝐞𝐬𝐮𝐦𝐞 𝐀𝐧𝐚𝐥𝐲𝐬𝐢𝐬
.Upload a resume and automatically generate interview questions based on the candidate's profile.

𝐂𝐨𝐦𝐩𝐚𝐧𝐲-𝐒𝐩𝐞𝐜𝐢𝐟𝐢𝐜 𝐏𝐫𝐞𝐩𝐚𝐫𝐚𝐭𝐢𝐨𝐧𝐞 𝐀𝐧𝐚𝐥𝐲𝐬𝐢𝐬
Practice interviews tailored for:
.Google
.Microsoft
.Amazon
.Salesforce
.Adobe
.Flipkart

🧪𝐏𝐫𝐨𝐣𝐞𝐜𝐭 𝐒𝐭𝐚𝐭𝐮𝐬
𝐌𝐨𝐝𝐮𝐥𝐞                                           𝐒𝐭𝐚𝐭𝐮𝐬
Authentication	                              ✅ Complete
Firebase Integration	                        ✅ Complete
Interview Generation	                        ✅ Complete
Gemini Integration                          	✅ Complete(APi key Limit Exceeded issue)
VAPI Integration	                            ✅ Complete
Responsive UI	                                ✅ Complete
AI Feedback Engine	                          🚧 In Progress

🤝 𝐂𝐨𝐧𝐭𝐫𝐢𝐛𝐮𝐭𝐢𝐧𝐠
Contributions, suggestions, and improvements are welcome.

.Fork the repository
.Create a feature branch
.Commit your changes
.Open a Pull Request

