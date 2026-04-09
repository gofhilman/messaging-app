# SecreChat

SecreChat is a full-stack messaging app with global, private, and group conversations. The project is split into a React Router frontend and an Express + Prisma backend, with PostgreSQL for persistence and Cloudinary for image uploads.

## Features

- Guest mode for browsing the global chat without creating an account
- Sign up and login with JWT-based authentication
- Private chats between two users
- Group chats with member selection and editable group names
- Global chat room shared by everyone
- Text messages and image messages
- Profile picture uploads
- Online/offline presence indicators
- Read tracking per chat, surfaced as "New message" in the chat list
- User directory with search and quick-start chat actions
- Light, dark, and system theme support
- Responsive mobile-first layout with bottom navigation

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, React Router v7, TypeScript, Vite, Tailwind CSS v4 |
| UI | shadcn/ui, Base UI, Lucide React, Sonner, date-fns |
| Backend | Node.js, Express 5, TypeScript, Passport, passport-jwt, passport-anonymous |
| Database | PostgreSQL via Prisma ORM |
| Prisma details | Typed SQL, Prisma Client output to `backend/generated/prisma`, Prisma config in `backend/prisma.config.ts` |
| Uploads | Multer (memory storage) + Cloudinary |
| Reliability | `p-retry` on both fetch requests and Prisma queries |

## Project Structure

```text
.
├── backend/
│   ├── app.ts
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   ├── seeds/
│   │   └── sql/
│   └── routes/
├── frontend/
│   ├── app/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   └── routes/
│   └── public/
└── README.md
```

## Database Schema

![alt text](public/image.png)

### Core Models

| Model | Important fields | Purpose |
| --- | --- | --- |
| `User` | `id`, `createdAt`, `username`, `password`, `picture`, `online` | Stores authentication, profile data, and presence state |
| `Chat` | `id`, `lastMessageAt`, `name`, `type` | Represents a global, private, or group conversation |
| `Read` | `id`, `chatId` | Tracks which users have read a chat |
| `Message` | `id`, `createdAt`, `chatId`, `userId`, `type`, `text`, `image` | Stores text and image messages |

### Enums

- `ChatType`: `GLOBAL`, `PRIVATE`, `GROUP`
- `MessageType`: `TEXT`, `IMAGE`

### Relationships

- `User` to `Chat`: many-to-many chat membership
- `Chat` to `Message`: one-to-many
- `User` to `Message`: one-to-many
- `Chat` to `Read`: one-to-one
- `Read` to `User`: many-to-many readers for a chat

### Schema Notes

- The global room is a normal `Chat` row with `type = GLOBAL`.
- Private chats are created without a `name`.
- Group chats require a `name`.
- `lastMessageAt` is used to sort chats by recent activity.
- Sending a message resets the chat's read list to the sender only.

## Implementation Highlights

- Guest browsing works because `/auth/me` accepts anonymous users and `/chats/global` is public, while user-only endpoints are protected by JWT auth.
- Private chat creation is de-duplicated with typed SQL in `backend/prisma/sql/findChatByUsers.sql`, so the same participant set resolves to the same chat instead of creating duplicates.
- The UI is not websocket-based. Chat rooms poll for updates every 5 seconds, which keeps the experience near-real-time without a realtime service.
- Presence is heartbeat-based. The frontend pings `/users/me/online` every 50 seconds, and the backend flips the user offline after 60 seconds of inactivity.
- Image uploads go through Multer in memory and are pushed to Cloudinary. The backend accepts `jpeg`, `png`, `webp`, and `gif`, with a 50 MB upload limit.
- Both the frontend fetch layer and the Prisma client use `p-retry` to smooth over temporary failures.

## API Surface

### Auth

- `GET /auth/me`
- `POST /auth/signup`
- `POST /auth/login`

### Chats

- `GET /chats`
- `GET /chats/global`
- `GET /chats/:chatId`
- `POST /chats`
- `POST /chats/:chatId/messages/text`
- `POST /chats/:chatId/messages/image`
- `PATCH /chats/:chatId/name`
- `PATCH /chats/:chatId/read`

### Users

- `GET /users`
- `GET /users/:username`
- `PATCH /users/me/picture`
- `PATCH /users/me/online`

## How To Run

### Prerequisites

- Node.js 20+ recommended
- A PostgreSQL database
- Cloudinary credentials if you want image uploads to work

### 1. Create environment files

Create `backend/.env` before installing backend dependencies. The backend runs `prisma generate --sql` during `npm install`, and Prisma config expects `DIRECT_URL` to exist.

```bash
# backend/.env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="replace-with-a-long-random-secret"
GOD_PASSWORD="replace-with-a-password-for-the-seed-user"
PORT=3000

# Cloudinary is required for profile picture and image message uploads.
# Use either CLOUDINARY_URL or the standard split credentials.
CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
```

```bash
# frontend/.env
VITE_API_ROOT_URL="http://localhost:3000"
```

### 2. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Run database migrations

```bash
cd backend
npx prisma migrate dev
```

### 4. Seed the initial data

This step is important because the app expects a global chat to exist.

```bash
cd backend
npx tsx prisma/seeds/createInitData.ts
```

The seed creates:

- a `god` user using `GOD_PASSWORD`
- the initial `Global Chat`

### 5. Start the app

Run the backend in one terminal:

```bash
cd backend
npm run dev
```

Run the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Then open the frontend URL shown by Vite, usually `http://localhost:5173`.

## Available Scripts

### Backend

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Express API with file watching |
| `npm run start` | Starts the backend once with `tsx` |
| `npm run data` | Opens Prisma Studio without launching a browser |

### Frontend

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the React Router dev server |
| `npm run build` | Builds the production bundle |
| `npm run typecheck` | Generates route types and runs TypeScript |
| `npm run format` | Formats `ts` and `tsx` files with Prettier |

## Usage Notes

- Guests can open the global chat, but sending messages, starting private chats, creating groups, and uploading profile pictures require a registered account.
- The chat list only shows chats that already have at least one message.
- The app currently uses polling rather than websockets, so message delivery is near-real-time, not instant push.
- The backend is currently configured to use Prisma's Neon adapter in `backend/lib/prisma.ts`. If you are using a standard local PostgreSQL setup and prefer the `pg` adapter, there is already a commented `PrismaPg` alternative in that file.

## License

MIT
