import { getGlobalChat } from "~/api/chatsApi"
import ChatRoom from "~/components/chat-room"
import Composer from "~/components/composer"
import { getMe } from "~/api/authApi"

export async function clientLoader() {
  const { me } = await getMe()
  const { chat } = await getGlobalChat()
  return { me, chat }
}

export default function ChatGlobal() {
  return (
    <main className="flex h-full min-h-0 flex-col gap-5">
      <title>Global Chat &mdash; SecreChat</title>
      <h2 className="text-xl font-semibold">Global Chat</h2>
      <ChatRoom className="min-h-0 flex-1" />
      <Composer />
    </main>
  )
}
