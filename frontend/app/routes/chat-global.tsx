import { getGlobalChat } from "~/api/chatsApi"
import ChatRoom from "~/components/chat-room"
import Composer from "~/components/composer"
import { getMe } from "~/api/authApi"
import type { Route } from "./+types/chat-global"
import { useSearchParams } from "react-router"
import { useEffect } from "react"
import { toast } from "sonner"

export async function clientLoader() {
  const { me } = await getMe()
  const { chat } = await getGlobalChat()
  return { me, chat }
}

export default function ChatGlobal({ loaderData }: Route.ComponentProps) {
  const {
    chat: { id },
  } = loaderData
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    const login = searchParams.get("login")
    if (login) {
      toast.success("You're now logged in", { id: +login })
      searchParams.delete("login")
      setSearchParams(searchParams)
    }
  }, [searchParams, setSearchParams])

  return (
    <main className="flex h-full min-h-0 flex-col gap-5">
      <title>Global Chat &mdash; SecreChat</title>
      <ChatRoom />
      <Composer chatId={id} />
    </main>
  )
}
