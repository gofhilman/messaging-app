import { format } from "date-fns"
import { MessageSquareMore } from "lucide-react"
import { Link, Outlet } from "react-router"
import { ThemeToggle } from "~/components/theme-toggle"

export default function AuthLayout() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-10 p-5">
      <header className="flex items-center justify-between">
        <Link to="/" viewTransition>
          <div className="flex items-center gap-3">
            <MessageSquareMore size={28} strokeWidth={3} color="var(--primary)" />
            <h1 className="text-2xl font-extrabold">SecreChat</h1>
          </div>
        </Link>
        <ThemeToggle />
      </header>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold">Enter SecreChat.</h2>
        <p className="text-2xl font-semibold">
          A secretly private, group, and global chat app.
        </p>
      </div>
      <Outlet />
      <footer className="mt-auto">
        <p>&copy; {format(new Date(), "y")} SecreChat. All right reserved.</p>
      </footer>
    </div>
  )
}
