import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes"

export default [
  layout("layouts/main-layout.tsx", [
    index("routes/home.tsx"),
    ...prefix("chats", [
      index("routes/chats.tsx"),
      route("global", "routes/chat-global.tsx"),
      route(":chatId", "routes/chat-specific.tsx"),
      route(":chatId/name", "routes/chat-name.tsx"),
      route(":chatId/read", "routes/chat-read.tsx"),
      route(":chatId/messages/text", "routes/message-text"),
      route(":chatId/messages/image", "routes/message-image"),
    ]),
    ...prefix("me", [
      index("routes/me.tsx"),
      route("picture", "routes/me-picture.tsx"),
      route("online", "routes/me-online.tsx"),
    ]),
    route("users", "routes/users.tsx"),
    route("users/:userId", "routes/user-specific.tsx"),
  ]),
  layout("layouts/auth-layout.tsx", [
    route("login", "routes/login.tsx"),
    route("logout", "routes/logout.tsx"),
    route("signup", "routes/signup.tsx"),
  ]),
] satisfies RouteConfig
