import { Form, Link, useFetcher, useSearchParams } from "react-router"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import FormErrors from "~/components/form-errors"
import { Field, FieldDescription, FieldLabel } from "~/components/ui/field"
import { Button } from "~/components/ui/button"

export default function Welcome() {
  const meFetcher = useFetcher()
  const pictureFetcher = useFetcher()
  const [searchParams, setSearchParams] = useSearchParams()
  const loadingToast = useRef<any>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    meFetcher.load("/me")
  }, [])
  useEffect(() => {
    const login = searchParams.get("login")
    if (login) {
      toast.success("You're now logged in", { id: +login })
      searchParams.delete("login")
      setSearchParams(searchParams)
    }
  }, [searchParams, setSearchParams])
  useEffect(() => {
    if (
      pictureFetcher.state === "idle" &&
      pictureFetcher.data &&
      !pictureFetcher.data.errors
    ) {
      setHasSubmitted(true)
    }
  }, [pictureFetcher.state, pictureFetcher.data])

  let username, picture
  if (meFetcher.data) {
    ;({ username, picture } = meFetcher.data.me)
  }
  if (pictureFetcher.state === "idle") {
    const id = loadingToast.current
    if (id) {
      loadingToast.current = null
      if (pictureFetcher.data.errors) {
        toast.error("Failed to upload picture", { id })
      } else {
        toast.success("Picture has been updated", { id })
      }
    }
  }

  return (
    <main className="flex flex-col gap-10">
      <title>{`Welcome${username ? `, ${username}` : ""}! \u2014 SecreChat`}</title>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Welcome{username ? `, ${username}` : ""}!</CardTitle>
          <CardDescription>
            Personalize your profile with a picture that speaks for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-6">
            {picture && (
              <img
                src={picture}
                alt="Profile picture"
                className="h-50 w-50 rounded-full object-cover ring-2 ring-border"
              />
            )}
            <pictureFetcher.Form
              ref={formRef}
              encType="multipart/form-data"
              action="/me/picture"
              method="post"
              onSubmit={() => {
                const id = toast.loading("Updating picture...")
                loadingToast.current = id
              }}
            >
              <FormErrors errors={pictureFetcher.data?.errors} />
              <input
                ref={inputRef}
                name="image"
                type="file"
                className="hidden"
                onChange={() => formRef.current?.requestSubmit()}
              />
              <Button type="button" onClick={() => inputRef.current?.click()}>
                Select a picture to upload
              </Button>
            </pictureFetcher.Form>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Form action="/global" viewTransition>
            <Button disabled={!hasSubmitted} type="submit">
              Let's go!
            </Button>
          </Form>
          <Link to="/global" viewTransition>
            <Button variant="outline">Skip</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}
