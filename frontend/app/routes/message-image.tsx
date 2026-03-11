import { postImage } from "~/api/chatsApi"
import type { Route } from "./+types/message-image"
import { data } from "react-router"

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const formData = await request.formData()
  try {
    return await postImage(params.chatId, formData.get("image"))
  } catch (error: any) {
    const errors = await error.json()
    return data({ errors }, { status: error.status })
  }
}
