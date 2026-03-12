import { useFetcher, useNavigate } from "react-router"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Image, SendHorizonal } from "lucide-react"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import FormErrors from "./form-errors"

export default function Composer({ chatId, myUsername }: any) {
  const textFetcher = useFetcher()
  const imageFetcher = useFetcher()
  const loadingToasts = useRef(new Map())
  const textFormRef = useRef<HTMLFormElement>(null)
  const imageformRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (textFetcher.data && !textFetcher.data.errors) {
      textFormRef.current?.reset()
    }
  }, [textFetcher.data])

  if (textFetcher.state === "idle") {
    const id = loadingToasts.current.get("text")
    if (id) {
      loadingToasts.current.delete("text")
      if (textFetcher.data.errors) {
        toast.error("Failed to send text", { id })
      } else {
        toast.success("Text has been sent", { id })
      }
    }
  }

  if (imageFetcher.state === "idle") {
    const id = loadingToasts.current.get("image")
    if (id) {
      loadingToasts.current.delete("image")
      if (imageFetcher.data.errors) {
        toast.error("Failed to send picture", { id })
      } else {
        toast.success("Picture has been sent", { id })
      }
    }
  }

  return (
    <div className="flex items-end gap-2.5">
      <textFetcher.Form
        ref={textFormRef}
        id="text"
        action={"/chats/" + chatId + "/messages/text"}
        method="post"
        onSubmit={() => {
          const id = toast.loading("Sending text...")
          loadingToasts.current.set("text", id)
        }}
        className="flex min-w-0 flex-1 flex-col-reverse"
      >
        <Textarea
          name="text"
          placeholder="Message"
          className="min-h-0 resize-none"
        />
        <FormErrors errors={textFetcher.data?.errors} />
        <FormErrors errors={imageFetcher.data?.errors} />
      </textFetcher.Form>
      <imageFetcher.Form
        ref={imageformRef}
        encType="multipart/form-data"
        action={"/chats/" + chatId + "/messages/image"}
        method="post"
        onSubmit={() => {
          const id = toast.loading("Sending picture...")
          loadingToasts.current.set("image", id)
        }}
      >
        <input
          ref={inputRef}
          name="image"
          type="file"
          className="hidden"
          onChange={() => imageformRef.current?.requestSubmit()}
        />
        <Button
          size="icon-lg"
          onClick={() => {
            if (myUsername === "guest") return navigate("/")
            inputRef.current?.click()
          }}
        >
          <Image />
        </Button>
      </imageFetcher.Form>
      <Button
        size="icon-lg"
        type="submit"
        form="text"
        onClick={(event) => {
          if (myUsername === "guest") {
            event.preventDefault()
            return navigate("/")
          }
        }}
      >
        <SendHorizonal />
      </Button>
    </div>
  )
}
