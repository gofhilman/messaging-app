import { useEffect, useRef } from "react"
import { ScrollArea } from "./ui/scroll-area"

export default function ChatRoom({
  myUsername,
  chatType,
  messages,
  className,
}: any) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: isFirstRender.current ? "instant" : "smooth",
    })
    isFirstRender.current = false
  }, [messages])

  return (
    <ScrollArea className={className}>
      <div className="flex flex-col-reverse p-4">
        {messages.map(({ id, createdAt, user, type, text, image }: any) => (
          <div key={id}>
            {["GROUP", "GLOBAL"].includes(chatType) && <div></div>}
          </div>
        ))}
      </div>
      <div ref={bottomRef} />
    </ScrollArea>
  )
}
