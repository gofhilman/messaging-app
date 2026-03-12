import { MessageSquareMore } from "lucide-react"
import { useRef } from "react"
import { Form, Link, Outlet, useNavigation, useSubmit } from "react-router"
import { toast } from "sonner"
import LoadingAnimation from "~/components/loading-animation"
import Navigation from "~/components/navigation"
import { ThemeToggle } from "~/components/theme-toggle"
import { Button } from "~/components/ui/button"

export default function MainLayout() {
  const loadingToast = useRef<any>(null)
  const submit = useSubmit()
  const navigation = useNavigation()

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col gap-5">
      <header className="flex items-center gap-5 px-5 pt-5">
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
      {navigation.state === "loading" ? (
        <>
          <LoadingAnimation />
          <div className="flex-1" />
        </>
      ) : (
        <div className="min-h-0 flex-1 overflow-hidden px-5 pb-5">
          <Outlet />
        </div>
      )}
      <Navigation />
    </div>
  )
}
