import { jsonContentJwtHeaders, jwtHeaders } from "~/lib/httpHeaders"
import { fetchWithRetry } from "./fetchWithRetry"
import throwError from "./throwError"

const chatsUrl = import.meta.env.VITE_API_ROOT_URL + "/chats/"

async function getChats() {
  const response = await fetchWithRetry(chatsUrl)
  if (!response.ok) await throwError(response)
  return await response.json()
}

async function getGlobalChat() {
  const response = await fetchWithRetry(chatsUrl + "global")
  if (!response.ok) await throwError(response)
  return await response.json()
}

async function getSpecificChat(chatId: any) {
  const response = await fetchWithRetry(chatsUrl + chatId)
  if (!response.ok) await throwError(response)
  return await response.json()
}

async function postChat(chat: any) {
  const headers = jsonContentJwtHeaders(new Headers())
  const response = await fetchWithRetry(chatsUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(chat),
  })
  if (!response.ok) await throwError(response)
  return await response.json()
}

async function postText(chatId: any, text: any) {
  const headers = jsonContentJwtHeaders(new Headers())
  const response = await fetchWithRetry(chatsUrl + chatId + "/messages/text", {
    method: "POST",
    headers,
    body: JSON.stringify({ text }),
  })
  if (!response.ok) await throwError(response)
  return await response.json()
}

async function postImage(chatId: any, image: any) {
  const headers = jwtHeaders(new Headers())
  const body = new FormData()
  body.append("image", image)
  const response = await fetchWithRetry(chatsUrl + chatId + "/messages/image", {
    method: "POST",
    headers,
    body,
  })
  if (!response.ok) await throwError(response)
  return await response.json()
}

async function patchChatName(chatId: any, chat: any) {
  const headers = jsonContentJwtHeaders(new Headers())
  const response = await fetchWithRetry(chatsUrl + chatId + "/name", {
    method: "PATCH",
    headers,
    body: JSON.stringify(chat),
  })
  if (!response.ok) await throwError(response)
  return await response.json()
}

async function patchChatRead(chatId: any) {
  const headers = jwtHeaders(new Headers())
  const response = await fetchWithRetry(chatsUrl + chatId + "/read", {
    method: "PATCH",
    headers,
  })
  if (!response.ok) await throwError(response)
  return await response.json()
}

export {
  getChats,
  getGlobalChat,
  getSpecificChat,
  postChat,
  postText,
  postImage,
  patchChatName,
  patchChatRead,
}
