import { getMe } from "~/api/authApi"
import type { Route } from "./+types/me"
import { useFetcher } from "react-router"
import { useRef } from "react"
import { toast } from "sonner"
import FormErrors from "~/components/form-errors"
import { Button } from "~/components/ui/button"

export async function clientLoader() {
  return await getMe()
}

export default function Me({ loaderData }: Route.ComponentProps) {
  const { me } = loaderData
  const fetcher = useFetcher()
  const loadingToast = useRef<any>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  if (fetcher.state === "idle") {
    const id = loadingToast.current
    if (id) {
      loadingToast.current = null
      if (fetcher.data.errors) {
        toast.error("Failed to update picture", { id })
      } else {
        toast.success("Picture has been updated", { id })
      }
    }
  }

  return (
    <main className="flex h-full flex-col items-center justify-center gap-6">
      <title>Me &mdash; SecreChat</title>
      <img
        src={me.picture}
        alt="Profile picture"
        className="h-60 w-60 rounded-full object-cover ring-2 ring-border"
      />
      <h2 className="text-3xl font-bold">{me.username}</h2>
      <fetcher.Form
        ref={formRef}
        encType="multipart/form-data"
        action="/me/picture"
        method="post"
        onSubmit={() => {
          const id = toast.loading("Updating picture...")
          loadingToast.current = id
        }}
      >
        <FormErrors errors={fetcher.data?.errors} />
        <input
          ref={inputRef}
          name="image"
          type="file"
          className="hidden"
          onChange={() => formRef.current?.requestSubmit()}
        />
        <Button
          type="button"
          size="lg"
          onClick={() => inputRef.current?.click()}
          className="text-lg"
        >
          Update picture
        </Button>
      </fetcher.Form>
    </main>
  )
}
