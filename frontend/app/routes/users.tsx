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

export async function clientLoader() {
  return await getUsers()
}

export default function Users({ loaderData }: Route.ComponentProps) {
  const { users } = loaderData
  const [search, setSearch] = useState("")

  const filteredUsers = users.filter(({ username }: any) =>
    username.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="flex h-full min-h-0 flex-col gap-5">
      <title>People &mdash; SecreChat</title>
      <CreateGroupDialog users={users} />
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
        <ItemGroup className="px-4">
          {filteredUsers.map(({ id, username, picture, online }: any) => (
            <Item key={id} variant="outline">
              <ItemMedia>
                <Avatar>
                  <AvatarImage src={picture} />
                  <AvatarBadge
                    className={online ? "bg-chart-2" : "bg-muted-foreground"}
                  />
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>{username}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MessagesSquare />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </ScrollArea>
    </main>
  )
}
