import { jwtHeaders } from "~/lib/httpHeaders"
import { fetchWithRetry } from "./fetchWithRetry"
import throwError from "./throwError"

const usersUrl = import.meta.env.VITE_API_ROOT_URL + "/users/"

async function getUsers() {
  const response = await fetchWithRetry(usersUrl)
  if (!response.ok) await throwError(response)
  return await response.json()
}

async function getSpecificUser(userId: any) {
  const response = await fetchWithRetry(usersUrl + userId)
  if (!response.ok) await throwError(response)
  return await response.json()
}

async function patchMePicture(image: any) {
  const headers = jwtHeaders(new Headers())
  const body = new FormData()
  body.append("image", image)
  const response = await fetchWithRetry(usersUrl + "/me/picture", {
    method: "PATCH",
    headers,
    body,
  })
  if (!response.ok) await throwError(response)
  return await response.json()
}

async function patchMeOnline() {
  const headers = jwtHeaders(new Headers())
  const response = await fetchWithRetry(usersUrl + "/me/online", {
    method: "PATCH",
    headers,
  })
  if (!response.ok) await throwError(response)
  return await response.json()
}

export { getUsers, getSpecificUser, patchMePicture, patchMeOnline }
