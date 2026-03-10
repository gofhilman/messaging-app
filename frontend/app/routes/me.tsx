import { getMe } from "~/api/authApi"

export async function clientLoader() {
  return await getMe()
}
