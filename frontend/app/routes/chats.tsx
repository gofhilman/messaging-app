import { getChats, postChat } from "~/api/chatsApi"
import type { Route } from "./+types/chats"
import { data, Link, redirect } from "react-router"
import { ScrollArea } from "~/components/ui/scroll-area"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "~/components/ui/item"
import { Avatar, AvatarBadge, AvatarImage } from "~/components/ui/avatar"
import { getMe } from "~/api/authApi"
import { formatRelative } from "date-fns"

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData()
  const chat: any = Object.fromEntries(formData)
  chat.userIds = chat.userIds ? chat.userIds.split(", ") : []
  try {
    const {
      chat: { id },
    } = await postChat(chat)
    return redirect(`${id}?chat=${chat.toastId}`)
  } catch (error: any) {
    const errors = await error.json()
    return data({ errors }, { status: error.status })
  }
}

export async function clientLoader() {
  const { chats } = await getChats()
  const { me } = await getMe()
  return { chats, me }
}

export default function Chats({ loaderData }: Route.ComponentProps) {
  const { chats, me } = loaderData
  return (
    <main className="flex h-full min-h-0 flex-col gap-5">
      <title>Chats &mdash; SecreChat</title>
      <ScrollArea className="min-h-0 flex-1">
        <ItemGroup className="gap-1 px-4">
          {chats.map(
            ({ id, lastMessageAt, name, read, type, users, messages }: any) => {
              let user
              if (type === "PRIVATE") {
                if (users.length === 1) {
                  user = users[0]
                } else {
                  user = users.find(
                    ({ username }: any) => username !== me.username
                  )
                }
              }
              return (
                <Item
                  key={id}
                  className="p-2"
                  render={
                    <Link to={id} viewTransition>
                      {type === "PRIVATE" && (
                        <ItemMedia>
                          <Avatar size="lg">
                            <AvatarImage src={user.picture} />
                            <AvatarBadge
                              className={
                                user.online
                                  ? "bg-chart-2"
                                  : "bg-muted-foreground"
                              }
                            />
                          </Avatar>
                        </ItemMedia>
                      )}
                      <ItemContent>
                        <ItemTitle>
                          {type === "PRIVATE" ? user.username : name}
                        </ItemTitle>
                        <ItemDescription className="line-clamp-1">
                          {messages[0].type === "TEXT"
                            ? messages[0].text
                            : "(Image)"}
                        </ItemDescription>
                      </ItemContent>
                      <ItemContent className="flex-none text-center">
                        <ItemDescription>
                          <p className="text-xs">
                            {((s) => s[0].toUpperCase() + s.slice(1))(
                              formatRelative(lastMessageAt, new Date())
                            )}
                          </p>
                          <p>{!read && "New message"}</p>
                        </ItemDescription>
                      </ItemContent>
                    </Link>
                  }
                />
              )
            }
          )}
        </ItemGroup>
      </ScrollArea>
    </main>
  )
}
