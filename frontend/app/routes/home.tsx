import { redirect } from "react-router"
import { getMe } from "~/api/authApi"

export async function clientLoader() {
  const { me } = await getMe()
  return redirect(me.username === "guest" ? "login" : "chats/global")
}
