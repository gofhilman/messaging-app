import { useEffect, useRef, useState } from "react"
import { useFetcher } from "react-router"
import { toast } from "sonner"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { SquarePen } from "lucide-react"
import FormErrors from "./form-errors"
import { Field, FieldGroup } from "./ui/field"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

export default function EditGroupDialog() {
  const fetcher = useFetcher()
  const loadingToast = useRef<any>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (fetcher.data && !fetcher.data?.errors) {
      formRef.current?.reset()
      setOpen(false)
    }
  }, [fetcher.data])

  if (fetcher.state === "idle") {
    const id = loadingToast.current
    if (id) {
      loadingToast.current = null
      if (fetcher.data?.errors) {
        toast.error("Failed to edit group name", { id })
      } else {
        toast.success("Group name has been edited", { id })
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon-lg">
            <SquarePen />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit group</DialogTitle>
          <DialogDescription>
            Edit the group name here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <fetcher.Form
          id="chat-name"
          action="name"
          method="post"
          onSubmit={() => {
            const id = toast.loading("Editing group...")
            loadingToast.current = id
          }}
        >
          <FormErrors errors={fetcher.data?.errors} />
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" />
            </Field>
            <Input type="hidden" name="type" value="GROUP" />
          </FieldGroup>
        </fetcher.Form>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button form="chat-name" type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
