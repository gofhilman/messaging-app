import { postChat } from "~/api/chatsApi"
import type { Route } from "./+types/chats"
import { data, redirect } from "react-router"

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
