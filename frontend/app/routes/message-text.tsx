import { postText } from "~/api/chatsApi"
import type { Route } from "./+types/message-text"
import { data } from "react-router"

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const formData = await request.formData()
  try {
    return await postText(params.chatId, formData.get("text"))
  } catch (error: any) {
    const errors = await error.json()
    return data({ errors }, { status: error.status })
  }
}
