import { getMe } from "~/api/authApi"
import type { Route } from "./+types/chat-specific"
import { getSpecificChat } from "~/api/chatsApi"
import ChatRoom from "~/components/chat-room"
import Composer from "~/components/composer"
import { redirect, useSearchParams } from "react-router"
import { useEffect } from "react"
import { toast } from "sonner"

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { me } = await getMe()
  if (me.username === "guest") return redirect("/")
  const { chat } = await getSpecificChat(params.chatId)
  return { me, chat }
}

export default function ChatSpecific({ loaderData }: Route.ComponentProps) {
  const {
    me,
    chat: { id, name, type, users },
  } = loaderData
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const chat = searchParams.get("chat")
    if (chat) {
      toast.success("Group has been created", { id: +chat })
      searchParams.delete("chat")
      setSearchParams(searchParams)
    }
  }, [searchParams, setSearchParams])

  const titleName =
    type === "GROUP"
      ? name
      : users.length === 1
        ? users[0].username
        : users.find(({ username }: any) => username !== me.username).username

  return (
    <main className="flex h-full min-h-0 flex-col gap-5">
      <title>{`${titleName} \u2014 SecreChat`}</title>
      <ChatRoom />
      <Composer chatId={id} myUsername={me.username} />
    </main>
  )
}
