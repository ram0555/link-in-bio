# Link-in-Bio Application

A modern, responsive link-in-bio application with social media integration and analytics. This application allows you to showcase all your social media profiles in one place, track visitor analytics, and customize the appearance with themes.

## Features

- 🔗 Centralized social media links
- 📱 Responsive design for all devices
- 📊 Analytics for page views and link clicks
- 📝 Newsletter signup functionality
- 📢 Featured content showcase
- 🎨 Theme customization
- 📱 Add-to-home screen functionality
- 📷 QR code generation for easy sharing

## Tech Stack

- **Frontend**: React with TypeScript, TailwindCSS, shadcn UI components
- **Backend**: Node.js with Express
- **State Management**: React Query, Context API
- **Storage**: In-memory storage (can be extended to use a database)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/link-in-bio.git
   cd link-in-bio
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── contexts/      # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and configuration
│   │   ├── pages/         # Application pages
│   │   ├── App.tsx        # Main App component
│   │   └── main.tsx       # Application entry point
├── server/                # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage implementation
└── shared/                # Shared code between client and server
    └── schema.ts          # Data schemas and types
```

## Customization

You can customize your profile by editing the sample data in `server/storage.ts`. In a production environment, you would connect this to a database for persistent storage.

## Deployment

This application can be deployed to any hosting service that supports Node.js applications, such as:

- Vercel
- Netlify
- Heroku
- AWS
- DigitalOcean

## License

MIT