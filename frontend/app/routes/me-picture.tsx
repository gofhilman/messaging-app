import { patchMePicture } from "~/api/usersApi"
import type { Route } from "./+types/me-picture"
import { data } from "react-router"

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData()
  const image = formData.get("image")
  try {
    return await patchMePicture(image)
  } catch (error: any) {
    const errors = await error.json()
    return data({ errors }, { status: error.status })
  }
}
