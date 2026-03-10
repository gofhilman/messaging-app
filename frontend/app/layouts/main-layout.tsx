import {
  Earth,
  MessageSquareMore,
  MessagesSquare,
  SquareUser,
  Users,
} from "lucide-react"
import { useRef } from "react"
import { Form, Link, NavLink, Outlet, useSubmit } from "react-router"
import { toast } from "sonner"
import { ThemeToggle } from "~/components/theme-toggle"
import { Button } from "~/components/ui/button"

export default function MainLayout() {
  const loadingToast = useRef<any>(null)
  const submit = useSubmit()

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-10 p-5">
      <header className="flex items-center gap-5">
        <Link to="/" viewTransition className="mr-auto">
          <div className="flex items-center gap-3">
            <MessageSquareMore
              size={28}
              strokeWidth={3}
              color="var(--primary)"
            />
            <h1 className="text-2xl font-extrabold">SecreChat</h1>
          </div>
        </Link>
        <ThemeToggle />
        <Form
          action="/logout"
          method="post"
          onSubmit={(event) => {
            event.preventDefault()
            const id = toast.loading("Logging out...")
            loadingToast.current = id
            const formData: any = new FormData(event.currentTarget)
            formData.set("toastId", id)
            submit(formData, { action: "/logout", method: "post" })
          }}
        >
          <Button type="submit" variant="outline">
            Log out
          </Button>
        </Form>
      </header>
      <Outlet />
      <nav className="fixed inset-x-0 bottom-0 z-10 border-t md:top-0 md:right-auto md:h-screen md:w-24 md:border-t-0 md:border-r">
        <ul className="flex justify-around md:flex-col md:items-center md:gap-6 md:pt-24">
          <li>
            <NavLink to="/chats">
              <MessagesSquare />
            </NavLink>
          </li>
          <li>
            <NavLink to="/users">
              <Users />
            </NavLink>
          </li>
          <li>
            <NavLink to="/chats/global">
              <Earth />
            </NavLink>
          </li>
          <li>
            <NavLink to="/me">
              <SquareUser />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
