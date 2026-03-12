import { Fragment, useEffect, useRef } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { formatRelative } from "date-fns"
import { Link, useFetcher } from "react-router"
import { cn } from "~/lib/utils"
import LoadingAnimation from "./loading-animation"
import { Avatar, AvatarBadge, AvatarImage } from "./ui/avatar"
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item"
import EditGroupDialog from "./edit-group-dialog"

export default function ChatRoom() {
  let myUsername: any,
    chatId: any,
    name: any,
    users: any,
    chatType: any,
    messages: any,
    mainUser: any
  const fetcher = useFetcher()
  const readFetcher = useFetcher()
  const viewportRef = useRef<HTMLDivElement>(null)
  const prevLastIdRef = useRef(null)
  const isFirstRender = useRef(true)
  const chatIdRef = useRef(null)
  const myUsernameRef = useRef(null)

  const recurringFetches = () => {
    fetcher.load(".")
    if (
      chatIdRef.current &&
      myUsernameRef.current &&
      myUsernameRef.current !== "guest"
    ) {
      readFetcher.submit(null, {
        action: `/chats/${chatIdRef.current}/read`,
        method: "post",
      })
    }
  }

  useEffect(() => {
    recurringFetches()
    const id = setInterval(recurringFetches, 3_000) // load for every 3 sec
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
      chat: { id: chatId, name, users, messages, type: chatType },
    } = fetcher.data)
    myUsernameRef.current = myUsername
    chatIdRef.current = chatId
    mainUser =
      users?.length === 1
        ? users[0]
        : users.find(({ username }: any) => username !== myUsername)
  }

  return (
    <>
      {fetcher.data ? (
        <div className="flex min-h-0 flex-1 flex-col gap-5">
          {chatType === "GLOBAL" && (
            <h2 className="text-xl font-semibold">Global Chat</h2>
          )}
          {chatType === "GROUP" && (
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">Group: {name}</h2>
              <EditGroupDialog />
            </div>
          )}
          {chatType === "PRIVATE" && (
            <Item
              className="p-0"
              render={
                <Link to={"/users/" + mainUser.username}>
                  <ItemMedia>
                    <Avatar size="lg">
                      <AvatarImage src={mainUser.picture} />
                      <AvatarBadge
                        className={
                          mainUser.online ? "bg-chart-2" : "bg-muted-foreground"
                        }
                      />
                    </Avatar>
                  </ItemMedia>
                  <ItemContent className="gap-1">
                    <ItemTitle className="text-xl">
                      {mainUser.username}
                    </ItemTitle>
                  </ItemContent>
                </Link>
              }
            />
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
                      <Link to={"/users/" + user.username}>
                        <Avatar>
                          <AvatarImage src={user.picture} alt="" />
                          <AvatarBadge
                            className={
                              user.online ? "bg-chart-2" : "bg-muted-foreground"
                            }
                          />
                        </Avatar>
                      </Link>
                    )}
                    <div
                      className={cn(
                        "flex max-w-17/20 flex-col gap-1 rounded-lg p-1.5",
                        myUsername === user.username
                          ? "items-end rounded-tr-none bg-primary-alt"
                          : "rounded-tl-none bg-secondary"
                      )}
                    >
                      {["GROUP", "GLOBAL"].includes(chatType) && (
                        <p className="text-sm font-semibold">{user.username}</p>
                      )}
                      {type === "TEXT" ? (
                        <p className="wrap-anywhere whitespace-pre-wrap">
                          {text}
                        </p>
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
