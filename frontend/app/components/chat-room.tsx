import { useEffect, useRef } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { formatRelative } from "date-fns"
import { useFetcher } from "react-router"

export default function ChatRoom({ className }: any) {
  let myUsername: any, chatType: any, messages: any
  const fetcher = useFetcher()
  const viewportRef = useRef<HTMLDivElement>(null)
  const prevLastIdRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    fetcher.load(".")
    const id = setInterval(() => {
      fetcher.load(".")
    }, 60_000) // load for every minute
    return () => clearInterval(id)
  }, [])
  useEffect(() => {
    if (!messages) return
    const viewport = viewportRef.current
    if (!viewport) return
    const lastId = messages[0]?.id
    if (lastId === prevLastIdRef.current) return
    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: isFirstRender.current ? "instant" : "smooth",
    })
    isFirstRender.current = false
  }, [messages])
  if (fetcher.data) {
    ;({
      me: { username: myUsername },
      chat: { messages, type: chatType },
    } = fetcher.data)
  }

  return (
    <ScrollArea className={className} ref={viewportRef}>
      <div className="flex flex-col-reverse p-3">
        {messages?.map(({ id, createdAt, user, type, text, image }: any) => (
          <div key={id}>
            {["GROUP", "GLOBAL"].includes(chatType) && (
              <img
                src={user.picture}
                alt=""
                className="h-10 w-10 rounded-full object-cover ring-2 ring-border"
              />
            )}
            <div>
              {["GROUP", "GLOBAL"].includes(chatType) && <p>{user.username}</p>}
              {type === "TEXT" ? <p>{text}</p> : <img src={image} alt="" />}
              <p>
                {((s) => s[0].toUpperCase() + s.slice(1))(
                  formatRelative(createdAt, new Date())
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
