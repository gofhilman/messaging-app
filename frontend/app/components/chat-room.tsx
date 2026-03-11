import { useEffect, useRef } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { formatRelative } from "date-fns"
import { useFetcher } from "react-router"
import { cn } from "~/lib/utils"
import LoadingAnimation from "./loading-animation"
import { Avatar, AvatarBadge, AvatarImage } from "./ui/avatar"

export default function ChatRoom() {
  let myUsername: any, chatType: any, messages: any
  const fetcher = useFetcher()
  const viewportRef = useRef<HTMLDivElement>(null)
  const prevLastIdRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    fetcher.load(".")
    const id = setInterval(() => {
      fetcher.load(".")
    }, 3_000) // load for every 3 sec
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
    prevLastIdRef.current = lastId
    isFirstRender.current = false
  }, [fetcher.data])
  if (fetcher.data) {
    ;({
      me: { username: myUsername },
      chat: { messages, type: chatType },
    } = fetcher.data)
  }

  return (
    <>
      {fetcher.data ? (
        <div className="flex min-h-0 flex-col gap-5">
          {chatType === "GLOBAL" && (
            <h2 className="text-xl font-semibold">Global Chat</h2>
          )}
          <ScrollArea className="min-h-0 flex-1" ref={viewportRef}>
            <div className="flex flex-col-reverse gap-2 p-3">
              {messages?.map(
                ({ id, createdAt, user, type, text, image }: any) => (
                  <div
                    key={id}
                    className={cn(
                      "gap-1",
                      myUsername === user.username
                        ? "flex flex-row-reverse"
                        : "flex"
                    )}
                  >
                    {["GROUP", "GLOBAL"].includes(chatType) && (
                      <Avatar>
                        <AvatarImage src={user.picture} alt="" />
                        <AvatarBadge
                          className={
                            user.online ? "bg-chart-2" : "bg-muted-foreground"
                          }
                        />
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "flex max-w-17/20 flex-col gap-1 rounded-lg p-1",
                        myUsername === user.username
                          ? "items-end rounded-tr-none bg-primary-alt"
                          : "rounded-tl-none bg-secondary"
                      )}
                    >
                      {["GROUP", "GLOBAL"].includes(chatType) && (
                        <p className="text-sm font-semibold">{user.username}</p>
                      )}
                      {type === "TEXT" ? (
                        <p>{text}</p>
                      ) : (
                        <img src={image} alt="" className="rounded-md" />
                      )}
                      <p
                        className={cn(
                          "text-xs",
                          myUsername !== user.username ? "self-end" : ""
                        )}
                      >
                        {((s) => s[0].toUpperCase() + s.slice(1))(
                          formatRelative(createdAt, new Date())
                        )}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </ScrollArea>
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </>
  )
}
