import { getGlobalChat } from "~/api/chatsApi"
import type { Route } from "./+types/chat-global"
import ChatRoom from "~/components/chat-room"
import Composer from "~/components/composer"
import { getMe } from "~/api/authApi"

export async function clientLoader() {
  const { me } = await getMe()
  const { chat } = await getGlobalChat()
  return { me, chat }
}

export default function ChatGlobal({ loaderData }: Route.ComponentProps) {
  const { me, chat } = loaderData

  return (
    <main className="flex flex-col gap-10">
      <title>Global Chat &mdash; SecreChat</title>
      <h2 className="text-3xl font-bold">Global Chat</h2>
      <ChatRoom
        myUsername={me.username}
        chatType={chat.type}
        messages={chat.messages}
        className="flex-1"
      />
      <Composer />
    </main>
  )
}
