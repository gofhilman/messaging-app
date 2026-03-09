import { jsonContentHeaders, jwtHeaders } from "~/lib/httpHeaders"
import { fetchWithRetry } from "./fetchWithRetry"
import throwError from "./throwError"

const authUrl = import.meta.env.VITE_API_ROOT_URL + "/auth/"

async function getMe() {
  const headers = jwtHeaders(new Headers())
  const response = await fetchWithRetry(authUrl + "me", { headers })
  if (!response.ok) await throwError(response)
  return await response.json()
}

async function postSignup(user: any) {
  await postAuth("signup", user)
  await postLogin(user)
}

async function postLogin(user: any) {
  const { token } = await postAuth("login", user)
  localStorage.setItem("JWT", token)
}

function postLogout() {
  localStorage.removeItem("JWT")
}

async function postAuth(type: any, user: any) {
  const headers = jsonContentHeaders(new Headers())
  const response = await fetchWithRetry(authUrl + type, {
    method: "POST",
    headers,
    body: JSON.stringify(user),
  })
  if (!response.ok) await throwError(response)
  return await response.json()
}

export { getMe, postSignup, postLogin, postLogout }
