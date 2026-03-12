import { useFetcher } from "react-router"
import { Button } from "./ui/button"
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
import { Field, FieldGroup } from "./ui/field"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { ComboboxMultiple } from "./combobox-multiple"
import { useRef } from "react"
import { toast } from "sonner"
import FormErrors from "./form-errors"

export default function CreateGroupDialog({ users }: any) {
  const fetcher = useFetcher()
  const loadingToast = useRef<any>(null)

  if (fetcher.data?.errors && fetcher.state === "idle") {
    const id = loadingToast.current
    if (id) {
      loadingToast.current = null
      toast.error("Failed to create group", { id })
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="lg"
            className="mx-4 self-start text-lg"
          >
            Create group
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Set up your group</DialogTitle>
          <DialogDescription>
            Enter a group name and add members to get started.
          </DialogDescription>
        </DialogHeader>
        <fetcher.Form
          id="chats"
          action="/chats"
          method="post"
          onSubmit={() => {
            const id = toast.loading("Creating group...")
            loadingToast.current = id
          }}
        >
          <FormErrors errors={fetcher.data?.errors} />
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" />
            </Field>
            <Field>
              <Label htmlFor="userIds">Members</Label>
              <ComboboxMultiple id="userIds" name="userIds" users={users} />
            </Field>
            <Input type="hidden" name="type" value="GROUP" />
          </FieldGroup>
        </fetcher.Form>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button form="chats" type="submit">
            Create group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
