import { getSpecificUser } from "~/api/usersApi"
import type { Route } from "./+types/user-specific"
import { Form } from "react-router"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { MessagesSquare } from "lucide-react"

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await getSpecificUser(params.username)
}

export default function UserSpecific({ loaderData }: Route.ComponentProps) {
  const {
    user: { id, username, picture, online },
  } = loaderData

  return (
    <main className="flex h-full flex-col items-center justify-center gap-6">
      <title>{`${username} \u2014 SecreChat`}</title>
      <img
        src={picture}
        alt="Profile picture"
        className="h-60 w-60 rounded-full object-cover ring-2 ring-border"
      />
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-3xl font-bold">{username}</h2>
        <p className={online ? "text-chart-2" : "text-muted-foreground"}>
          {online ? "Online" : "Offline"}
        </p>
      </div>
      <Form action="/chats" method="post">
        <Input type="hidden" name="type" value="PRIVATE" />
        <Input type="hidden" name="userIds" value={id} />
        <Button type="submit" size="lg" className="text-lg">
          <MessagesSquare /> Chat
        </Button>
      </Form>
    </main>
  )
}
