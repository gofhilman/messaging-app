import { patchChatRead } from "~/api/chatsApi"
import type { Route } from "./+types/chat-read"

export async function clientAction({ params }: Route.ClientActionArgs) {
  return await patchChatRead(params.chatId)
}
