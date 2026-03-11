import { Form, useFetcher } from "react-router"
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

export default function CreateGroupDialog({ users }: any) {
  const fetcher = useFetcher()

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
        <fetcher.Form>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" />
            </Field>
            <Field>
              <Label htmlFor="userIds">Members</Label>
              <ComboboxMultiple id="userIds" name="userIds" users={users} />
            </Field>
          </FieldGroup>
        </fetcher.Form>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit">Create group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
