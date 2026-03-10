import { getMe } from "~/api/authApi"
import type { Route } from "./+types/me"
import { useNavigation } from "react-router"

export async function clientLoader() {
  return await getMe()
}

export default function Me({ loaderData }: Route.ComponentProps) {
  const { me } = loaderData

  return (
    <main>
      <title>Me &mdash; SecreChat</title>
      
    </main>
  )
}
