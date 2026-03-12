import { getUsers } from "~/api/usersApi"
import type { Route } from "./+types/users"
import CreateGroupDialog from "~/components/create-group-dialog"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group"
import { MessagesSquare, Search } from "lucide-react"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "~/components/ui/item"
import { Avatar, AvatarBadge, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { ScrollArea } from "~/components/ui/scroll-area"
import { useState } from "react"
import { Form, Link, useNavigate } from "react-router"
import { Input } from "~/components/ui/input"
import { getMe } from "~/api/authApi"

export async function clientLoader() {
  const { users } = await getUsers()
  const { me } = await getMe()
  return { users, me }
}

export default function Users({ loaderData }: Route.ComponentProps) {
  const { users, me } = loaderData
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const filteredUsers = users.filter(({ username }: any) =>
    username.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="flex h-full min-h-0 flex-col gap-5">
      <title>People &mdash; SecreChat</title>
      <CreateGroupDialog users={users} myUsername={me.username} />
      <div className="px-4">
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {filteredUsers.length} people
          </InputGroupAddon>
        </InputGroup>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <ItemGroup className="gap-2 px-3">
          {filteredUsers.map(({ id, username, picture, online }: any) => (
            <Item key={id} variant="outline">
              <ItemMedia>
                <Link to={"/users/" + username} viewTransition>
                  <Avatar>
                    <AvatarImage src={picture} />
                    <AvatarBadge
                      className={online ? "bg-chart-2" : "bg-muted-foreground"}
                    />
                  </Avatar>
                </Link>
              </ItemMedia>
              <ItemContent className="gap-1">
                <Link to={"/users/" + username} viewTransition>
                  <ItemTitle>{username}</ItemTitle>
                </Link>
              </ItemContent>
              <ItemActions>
                <Form action="/chats" method="post">
                  <Input type="hidden" name="type" value="PRIVATE" />
                  <Input type="hidden" name="userIds" value={id} />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={(event) => {
                      if (me.username === "guest") {
                        event.preventDefault()
                        return navigate("/")
                      }
                    }}
                  >
                    <MessagesSquare />
                  </Button>
                </Form>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </ScrollArea>
    </main>
  )
}
