import { data } from "react-router"
import type { Route } from "./+types/chat-name"
import { patchChatName } from "~/api/chatsApi"

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const formData = await request.formData()
  const chat = Object.fromEntries(formData)
  try {
    return await patchChatName(params.chatId, chat)
  } catch (error: any) {
    const errors = await error.json()
    return data({ errors }, { status: error.status })
  }
}
