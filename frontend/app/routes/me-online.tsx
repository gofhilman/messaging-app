import { patchMeOnline } from "~/api/usersApi"

export async function clientAction() {
  return await patchMeOnline()
}
