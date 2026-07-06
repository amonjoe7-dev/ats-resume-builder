# ATS Resume Builder - Frontend

A production-ready React + TypeScript frontend for an ATS (Applicant Tracking System) optimized resume builder.

## Features

✨ **Complete Authentication System**
- Login, Signup, and Password Reset pages
- Form validation and error handling
- Persistent authentication state with Zustand

📊 **Dashboard**
- Resume management interface
- Resume creation and overview
- Quick actions (Edit, View, Delete)

🎨 **Responsive Design**
- Mobile-first approach
- Responsive sidebar navigation
- Fully mobile-optimized interface

🧩 **Reusable Components**
- Button, Input, Card, Alert, Badge
- Layout components (Sidebar, Header, MainLayout, AuthLayout)
- Custom hooks for authentication and route protection

📝 **Resume Editor**
- Resume creation and editing
- Multi-section support (Personal Info, Experience, Education, Skills)
- Real-time preview

## Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Zustand** - State Management
- **Axios** - HTTP Client
- **Lucide React** - Icons

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   └── layout/          # Layout components
├── pages/
│   ├── auth/            # Authentication pages
│   ├── dashboard/       # Dashboard pages
│   └── resume/          # Resume pages
├── stores/              # Zustand stores
├── hooks/               # Custom hooks
├── services/            # API services
├── types/               # TypeScript types
├── utils/               # Utility functions
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## Environment Variables

Create a `.env.local` file:

```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=ATS Resume Builder
VITE_APP_VERSION=1.0.0
```

## Authentication Flow

1. User signs up or logs in
2. JWT token stored in localStorage
3. Token attached to API requests automatically
4. Protected routes redirect unauthenticated users to login
5. Invalid tokens trigger automatic logout

## State Management

### Auth Store (Zustand)
- User information
- Authentication token
- Login/Signup actions
- Loading and error states

### Resume Store (Zustand)
- Resume list
- Current resume
- CRUD operations
- Loading and error states

## API Integration

The API client automatically:
- Adds authorization headers
- Handles token expiration
- Manages error responses
- Redirects to login on 401 errors

## Styling

Tailwind CSS with custom color palette:
- **Primary**: Sky blue (0ea5e9)
- **Secondary**: Slate gray (475569)

Custom components extend Tailwind's utilities for consistency.

## Best Practices

✅ Type-safe with TypeScript
✅ Modular component architecture
✅ Centralized state management
✅ Custom hooks for reusability
✅ Form validation utilities
✅ Error handling throughout
✅ Responsive design patterns
✅ Accessible UI components
✅ Clean code organization

## License

MIT
