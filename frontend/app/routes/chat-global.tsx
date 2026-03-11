import { getGlobalChat } from "~/api/chatsApi"
import ChatRoom from "~/components/chat-room"
import Composer from "~/components/composer"
import { getMe } from "~/api/authApi"
import type { Route } from "./+types/chat-global"

export async function clientLoader() {
  const { me } = await getMe()
  const { chat } = await getGlobalChat()
  return { me, chat }
}

export default function ChatGlobal({ loaderData }: Route.ComponentProps) {
  const {
    chat: { id },
  } = loaderData

  return (
    <main className="flex h-full min-h-0 flex-col gap-5">
      <title>Global Chat &mdash; SecreChat</title>
      <ChatRoom />
      <Composer chatId={id} />
    </main>
  )
}
