import { getSpecificUser } from "~/api/usersApi"
import type { Route } from "./+types/user-specific"
import { Form } from "react-router"

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
      <div className="flex flex-col gap-3 items-center">
        <h2 className="text-3xl font-bold">{username}</h2>
        <p className={online ? "text-chart-2" : "text-muted-foreground"}>
          {online ? "Online" : "Offline"}
        </p>
      </div>
      <Form>
        
      </Form>
    </main>
  )
}
